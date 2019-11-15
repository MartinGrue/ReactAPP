import { observable, computed, action, runInAction } from 'mobx';
import { IUser, IUserFormValues } from '../models/user';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { history } from '../..';
import { IProfileFormValues } from '../models/IProfile';

export default class UserStore {
  /**
   *
   */
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  rootStore: RootStore;

  @observable user: IUser | null = null;
  @observable loadingUpdate: boolean = false;
  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction('loginAction', () => {
        this.user = user;
        console.log(user);
        history.push('/activities')
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
    } catch (error) {
      throw error;
    }
  };
  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push('/');
  };
  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };
  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push('/activities')
    } catch (error) {
      throw error;
    }
  }
  @action updateUser = async (values: IProfileFormValues) => {
    this.loadingUpdate = true;
    try {
      const user = await agent.User.update(values);
      runInAction('UpdateUserAction', () => {
        this.user = user;
        console.log(user);
        history.push(`/profiles/${user.userName}`);
        this.loadingUpdate = false;
        this.rootStore.activityStore.activityRegistryHasNotChanged = false;
      });
      this.rootStore.commonStore.setToken(user.token);
    } catch (error) {
      throw error;
    }
  };
}
