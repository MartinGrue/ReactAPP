import { RootStore } from "./rootStore";
import {
  reaction,
  observable,
  action,
  runInAction,
  makeObservable,
} from "mobx";
import { IProfile } from "../models/IProfile";
import agent from "../api/agent";

export default class FollowersStore {
  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
    reaction(
      () => this.activeTab,
      (activeTab) => {
        if (activeTab === 3 || activeTab === 4) {
          this.followings = undefined;
          const predicate = activeTab === 3 ? "followers" : "following";
          this.loadFollowings(predicate);
          runInAction(() => {
            this.setLoading();
          });
        } else {
        }
      }
    );
  }
  rootStore: RootStore;
  @observable activeTab: string | number | undefined = 0;
  @observable loading = true;
  @observable followings: IProfile[] | undefined = undefined;

  @action resetFollowings = () => {
    this.followings = [];
    this.activeTab = undefined;
  };
  @action setLoading = () => {
    this.loading = false;
  };

  @action loadFollowings = async (predicate: string) => {
    this.loading = true;
    try {
      const profiles: IProfile[] = await agent.Profile.getFollowersOrFollowing(
        this.rootStore.profileStore.profile!.userName,
        predicate
      );
      runInAction(() => {
        this.followings = profiles;
        this.loading = false;
        // this.activeTab = undefined;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  @action setActiveTab = (activeIndex: string | number | undefined) => {
    this.activeTab = activeIndex;
  };
}
