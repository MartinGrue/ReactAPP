import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IActivity } from '../models/IActivity';
import agent from '../api/agent';

configure({ enforceActions: 'always' });
class ActivityStore {
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
    return Array.from(this.activityRegistry.values()).sort(
      //arrayfrom weil die observableMap kein Iteratble ist
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
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
      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity = activity;
      this.submitting = false;
      this.editMode = false;
    } catch (error) {
      console.log(error);
      this.submitting = false;
    }
  };
  @action loadActivities = async () => {
    //implicity returning a promise
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction('loadingActivities', () => {
        activities.forEach(activity => {
          activity.date = activity.date.split('.')[0];
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
  };
  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
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
        console.log(error);
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

export default createContext(new ActivityStore());
