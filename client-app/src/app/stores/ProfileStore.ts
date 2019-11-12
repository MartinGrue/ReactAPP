import { RootStore } from './rootStore';
import { observable, action, runInAction } from 'mobx';
import { IProfile } from '../models/IProfile';
import agent from '../api/agent';

export default class ProfileStore {
  /**
   *
   */
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  rootStore: RootStore;

  @observable profile: IProfile | null = null;
  @observable loadingProfile: boolean = true;

  @action getProfile = async (userName: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profile.get(userName);
      runInAction('loginAction', () => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      runInAction('loadingProfileAction', () => {
        this.loadingProfile = false;
      });
      console.log(error);
    }
  };
}
