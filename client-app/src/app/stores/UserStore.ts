import { observable, computed, action, runInAction } from 'mobx';
import { IUser, IUserFormValues, IExternalLoginInfo } from '../models/user';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { history } from '../..';
import { IProfileFormValues } from '../models/IProfile';
import { toast } from 'react-toastify';

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
        //console.log(user);
        history.push('/activities');
        toast.success('login success');
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
    } catch (error) {
      toast.error('login error');
      throw error;
    }
  };
  @action loginExternal = async (info: IExternalLoginInfo) => {
    try {
      const user = await agent.User.loginExternal(info);
      runInAction('loginAction', () => {
        this.user = user;
        //console.log(user);
        history.push('/activities');
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      toast.success('login success');
    } catch (error) {
      toast.success('login error');
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
    }
  };
  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      runInAction('RegisterUserAction', () => {
        this.user = user;
        history.push('/activities');
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      toast.success('register success');
    } catch (error) {
      toast.error('register error');
      throw error;
    }
  };
  @action updateUser = async (values: IProfileFormValues) => {
    this.loadingUpdate = true;
    try {
      const user = await agent.User.update(values);
      runInAction('UpdateUserAction', () => {
        this.user = user;
        //console.log(user);
        history.push(`/profiles/${user.userName}`);

      });
      this.loadingUpdate = false;
      this.rootStore.activityStore.activityRegistryHasNotChanged = false;
      this.rootStore.commonStore.setToken(user.token);
      toast.success('update success');
    } catch (error) {
      toast.error('update error');
      throw error;
    }
  };
}
