import { observable, computed, action, values, runInAction } from 'mobx';
import { IUser, IUserFormValues } from '../models/user';
import agent from '../api/agent';
import { RootStore } from './rootStore';

export default class UserStore {
  /**
   *
   */
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  rootStore: RootStore;

  @observable user: IUser | null = null;
  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction('loginAction', () => {
        this.user = user;
        console.log(user);
      });
    } catch (error) {
      throw error;
      console.log(error);
    }
  };
}
