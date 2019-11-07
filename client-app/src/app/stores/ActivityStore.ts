import { observable, action, computed, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { IActivity, IAttendee } from '../models/IActivity';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { FillActivityProps } from '../common/util/util';

// class ActivityStore {
export default class ActivityStore {
  /**
   *
   */
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  rootStore: RootStore;

  @observable activityRegistry = new Map(); // um die activities als eine observableMap darzustellen
  @observable activities: IActivity[] = [];
  @observable loadingInitial = false;
  @observable selectedActivity: IActivity | undefined;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = '';
  @observable loading = false;

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
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );

    // console.log(Object.entries(sorted));

    // console.log(Object.entries(sorted.reduce((a,b)=>{return a}, {})));
    return Object.entries(
      sorted.reduce(
        (activities, activity) => {
          // console.log(activity.date!);
          const key: string = activity.date!.toISOString().split('T')[0];
          // // console.log(activities);
          // activities[key] = activities[key]
          //   ? [...activities[key], activity]
          //   : [activity];
            key in activities ? activities[key] = [...activities[key], activity]
            : activities[key] = [activity];
          // if (key in activities) {
          //   activities[key] = [...activities[key], activity];
          // } else {
          //   activities[key] = [activity];
          // }
          return activities;
        },
        {} as { [key: string]: IActivity[] }
      )
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
      runInAction('UpdateActivityAction', () => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.submitting = false;
        this.editMode = false;
      });
    } catch (error) {
      runInAction('UpdateActivityError', () => {
        toast.error('Problem submitting data');
        console.log(error.response);
        this.submitting = false;
      });
    }
  };
  @action loadActivities = async () => {
    //implicity returning a promise
    this.loadingInitial = true;
    // let activities = this.activityRegistry;
    if (Array.from(this.activityRegistry.values()).length !== 0) {
      this.loadingInitial = false;
    } else {
      try {
        const activities = await agent.Activities.list();
        // console.log(Object.entries(activities));
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
        runInAction('loadingActivities', () => {
          activities.forEach(activity => {
            FillActivityProps(activity, this.rootStore.userStore.user!);
            // this.activities.push(activity);
            this.activityRegistry.set(activity.id, activity);
          });
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction('loadingActivitiesError', () => {
          console.log(error);
          this.loadingInitial = false;
        });
      }
    }
  };
  @action loadActivity = async (id: string) => {
    this.loadingInitial = true;
    let activity: IActivity = this.activityRegistry.get(id);
    if (activity) {
      console.log('Activity found in registry');
      this.selectedActivity = activity;
      this.loadingInitial = false;
    } else {
      try {
        activity = await agent.Activities.details(id);
        runInAction('loadingActivities', () => {
          FillActivityProps(activity, this.rootStore.userStore.user!);
          console.log('Activity fetched from api');
          this.selectedActivity = activity;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction('loadingActivitiesError', () => {
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
        image: null
      };
      let attendees = [];
      attendees.push(NewAttendee);
      activity.userActivities = attendees;

      runInAction('createActivity', () => {
        // this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction('createActivityError', () => {
        this.submitting = false;
        toast.error('Problem submitting data');
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
      runInAction('DeleteActivity', () => {
        this.activityRegistry.delete(id);
        this.selectedActivity = undefined;
        this.submitting = false;
      });
    } catch (error) {
      runInAction('DeleteActivityError', () => {
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
      image: null
    };
    this.loading = true;
    try {
      await agent.Activities.join(this.selectedActivity!.id);
      runInAction('JoinActivity', () => {
        this.selectedActivity!.userActivities.push(NewAttendee);
        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
        this.selectedActivity!.isGoing = true;
        this.loading = false;
      });
    } catch (error) {
      runInAction('JoinActivityError', () => {
        this.loading = false;
      });
    }
  };
  @action unjoinActivity = async () => {
    this.loading = true;
    try {
      await agent.Activities.unjoin(this.selectedActivity!.id);
      runInAction('UnJoinActivity', () => {
        this.selectedActivity!.userActivities = this.selectedActivity!.userActivities.filter(
          at => at.userName !== this.rootStore.userStore.user!.userName
        );
        this.activityRegistry.set(
          this.selectedActivity!.id,
          this.selectedActivity!
        );
        this.selectedActivity!.isGoing = false;
        this.loading = false;
      });
    } catch (error) {
      runInAction('JoinActivityError', () => {
        this.loading = false;
        console.log(error);
      });
    }
  };
}

// export default createContext(new ActivityStore());
