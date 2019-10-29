import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/IActivity';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';

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
          const key: string = activity.date!.toISOString().split('T')[0];
          activities[key] = activities[key]
            ? [...activities[key], activity]
            : [activity];
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
    let activities = this.activityRegistry;
    if (Array.from(this.activityRegistry.values()).length !== 0) {
      this.loadingInitial = false;
    } else {
      try {
        const activities = await agent.Activities.list();
        // console.log(Object.entries(activities));
        runInAction('loadingActivities', () => {
          activities.forEach(activity => {
            activity.date = new Date(activity.date!);
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
    let activity = this.activityRegistry.get(id);
    if (activity) {
      console.log('Activity found in registry');
      this.selectedActivity = activity;
      this.loadingInitial = false;
    } else {
      try {
        activity = await agent.Activities.details(id);
        runInAction('loadingActivities', () => {
          activity.date = new Date(activity.date);
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
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction('DeleteActivity', () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
      });
    } catch (error) {
      runInAction('DeleteActivityError', () => {
        this.submitting = false;
        this.target = '';
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
}

// export default createContext(new ActivityStore());
