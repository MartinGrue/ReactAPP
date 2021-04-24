import {
  observable,
  action,
  computed,
  runInAction,
  reaction,
  toJS,
} from "mobx";
import { IActivity, IAttendee } from "../models/IActivity";
import agent from "../api/agent";
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";
import { FillActivityProps } from "../common/util/util";
import * as signalR from "@microsoft/signalr";

const PagingLimit = 2;
// class ActivityStore {
export default class ActivityStore {
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    reaction(
      () => this.predicate.keys(),
      () => {
        this.page = 0;
        this.activityRegistry.clear();
        this.loadActivities();
      }
    );
  }
  rootStore: RootStore;

  @observable selectedActivity: IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";
  @observable loading = false;
  /*
    get: /activities
   */
  @observable activityRegistry = new Map(); // um die activities als eine observableMap darzustellen
  @observable activityRegistryHasNotChanged: boolean = true;
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  /*
    get: /activities with params
  */
  @observable activityCount = 0;
  @observable page = 0;
  @observable predicate = new Map();

  /*
   SignalR
  */
  @observable.ref hubConnection: signalR.HubConnection | null = null;

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append("limit", String(PagingLimit));
    params.append("offset", `${this.page ? this.page * PagingLimit : 0}`);
    this.predicate.forEach((value, key) => {
      if (key === "startDate") {
        params.append(key, value.toISOString());
      } else {
        params.append(key, value);
      }
    });
    return params;
  }

  @computed get totalPages() {
    return Math.ceil(this.activityCount / PagingLimit);
  }

  @action setPage = (page: number) => {
    this.page = page;
  };

  @action setloadinginitial = () => {
    this.loadingInitial = true;
  };

  @action connectToSignalRHub = () => {
    var hubConnectionBuilder = new signalR.HubConnectionBuilder();
    this.hubConnection = hubConnectionBuilder
      .withUrl(process.env.REACT_APP_CHAT_URL!, {
        accessTokenFactory: (): string => {
          return this.rootStore.commonStore.token!;
        },
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.hubConnection.start();
    // .then(() => console.log(this.hubConnection!.state));

    this.hubConnection.on("ReceiveComment", (comment) => {
      runInAction("connectToSignalRHubAction", () => {
        this.selectedActivity!.comments.push(comment);
      });
    });
  };

  @action stopSignalRHub = () => {
    this.hubConnection!.stop();
  };

  @action addComment = async (values: any) => {
    values.activityId = this.selectedActivity!.id;
    try {
      await this.hubConnection!.invoke("SendComment", values);
    } catch (error) {
      console.log(error);
    }
  };

  @computed get activitiesByDate() {
    //um die anzeige zu sortieren (clientseitig)
    // return this.activities.sort(
    //   (a, b) => Date.parse(a.date) - Date.parse(b.date)
    // );
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }
  groupActivitiesByDate(activities: IActivity[]) {
    const sorted = activities.sort(
      (a, b) => b.date!.getTime() - a.date!.getTime()
    );
    // console.log(Object.entries(sorted));

    // console.log(Object.entries(sorted.reduce((a,b)=>{return a}, {})));
    return Object.entries(
      sorted.reduce((activities, activity) => {
        // console.log(activity.date!);
        const key: string = activity.date!.toISOString();
        // // console.log(activities);
        // activities[key] = activities[key]
        //   ? [...activities[key], activity]
        //   : [activity];
        key in activities
          ? (activities[key] = [...activities[key], activity])
          : (activities[key] = [activity]);
        // if (key in activities) {
        //   activities[key] = [...activities[key], activity];
        // } else {
        //   activities[key] = [activity];
        // }
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  }

  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction("UpdateActivityAction", () => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.submitting = false;
        this.editMode = false;
        toast.success("Activity Updated");
      });
    } catch (error) {
      runInAction("UpdateActivityError", () => {
        toast.error("Problem submitting data");
        console.log(error.response);
        this.submitting = false;
      });
    }
  };

  @action loadActivities = async () => {
    //implicity returning a promise
    this.loadingInitial = true;
    // let activities = this.activityRegistry;
    try {
      const activitiesEnvelope = await agent.Activities.list(this.axiosParams);
      const { activities, activityCount } = activitiesEnvelope;
      // Object.entries(
      //   activities.reduce(
      //     (multi, single) => {
      //       // console.log(JSON.stringify(multi));
      //       single.date = new Date(single.date!);
      //       const key: string = single.date!.toISOString().split('T')[0];
      //       // console.log(single.date);
      //       // multi[key] = [single];
      //       if (key in multi) {
      //         console.log(key + 'gabs schon');
      //         multi[key] = [...multi[key],single];
      //       } else {
      //         console.log(key + 'ist neu');
      //         multi[key] = [single];
      //       }
      //       return multi;
      //     },
      //     {} as { [key: string]: IActivity[] }
      //   )
      // );
      runInAction("loadingActivities", () => {
        activities.forEach((activity) => {
          FillActivityProps(activity, this.rootStore.userStore.user!);
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
        this.activityRegistryHasNotChanged = true;
        this.activityCount = activityCount;
        console.log(this.activityRegistry);
      });
    } catch (error) {
      runInAction("loadingActivitiesError", () => {
        console.log(error);
        this.loadingInitial = false;
        this.activityRegistryHasNotChanged = true;
      });
    }
  };

  @action loadActivity = async (id: string): Promise<IActivity | undefined> => {
    this.loadingInitial = true;
    let activity: IActivity = this.activityRegistry.get(id);

    if (activity) {
      this.selectedActivity = activity;
      this.loadingInitial = false;
      return toJS(activity);
    } else {
      try {
        activity = await agent.Activities.details(id);
        runInAction("loadingActivity", () => {
          FillActivityProps(activity, this.rootStore.userStore.user!);
          this.activityRegistry.set(activity.id, activity);
          this.selectedActivity = activity;
          this.loadingInitial = false;
        });
        return activity;
      } catch (error) {
        runInAction("loadingActivityError", () => {
          console.log(error);
          this.loadingInitial = false;
        });
      }
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    if (activity.date === null) {
      activity.date = new Date();
    }
    try {
      await agent.Activities.create(activity);

      const NewAttendee: IAttendee = {
        userName: this.rootStore.userStore.user!.userName,
        displayName: this.rootStore.userStore.user!.displayName,
        isHost: true,
        image: null,
      };
      let attendees = [];
      attendees.push(NewAttendee);
      activity.userActivities = attendees;
      activity.comments = [];
      runInAction("createActivity", () => {
        // this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
        toast.success("Activity Created");
      });
    } catch (error) {
      runInAction("createActivityError", () => {
        this.submitting = false;
        toast.error("Problem submitting data");
        console.log(error.response);
      });
    }
  };

  @action deleteActivity = async (
    // event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    // this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction("DeleteActivity", () => {
        this.activityRegistry.delete(id);
        this.selectedActivity = undefined;
        this.submitting = false;
      });
    } catch (error) {
      runInAction("DeleteActivityError", () => {
        this.submitting = false;
        // this.target = '';
        console.log(error);
      });
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };

  @action selectActivity = (id: string) => {
    // this.selectedActivity = this.activities.find(p => p.id === id);
    this.selectedActivity = this.activityRegistry.get(id);
    this.editMode = false;
  };

  @action joinActivity = async () => {
    const NewAttendee: IAttendee = {
      userName: this.rootStore.userStore.user!.userName,
      displayName: this.rootStore.userStore.user!.displayName,
      isHost: false,
      image: this.rootStore.userStore.user!.image,
    };
    this.loading = true;
    try {
      await agent.Activities.join(this.selectedActivity!.id);
      runInAction("JoinActivity", () => {
        this.selectedActivity!.userActivities.push(NewAttendee);
        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
        this.selectedActivity!.isGoing = true;
        this.loading = false;
      });
    } catch (error) {
      runInAction("JoinActivityError", () => {
        this.loading = false;
      });
    }
  };

  @action unjoinActivity = async () => {
    this.loading = true;
    try {
      await agent.Activities.unjoin(this.selectedActivity!.id);
      runInAction("UnJoinActivity", () => {
        this.selectedActivity!.userActivities = this.selectedActivity!.userActivities.filter(
          (at) => at.userName !== this.rootStore.userStore.user!.userName
        );
        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
        this.selectedActivity!.isGoing = false;
        this.loading = false;
      });
    } catch (error) {
      runInAction("JoinActivityError", () => {
        this.loading = false;
        console.log(error);
      });
    }
  };

  @action setPredicate = (predicate: string, value: string | Date) => {
    this.predicate.clear();
    if (predicate !== "all") {
      this.predicate.set(predicate, value);
    }
  };
}

// export default createContext(new ActivityStore());
