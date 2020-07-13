import { RootStore } from "./rootStore";
import { reaction, observable, action, runInAction } from "mobx";
import { IProfile } from "../models/IProfile";
import agent from "../api/agent";

export default class FollowersStore {
    /**
     *
     */
    constructor(rootStore: RootStore) {
      this.rootStore = rootStore;

      reaction(
        () => this.activeTab,
        activeTab => {
          if (activeTab === 3 || activeTab === 4) {
            this.followings = undefined;
            const predicate = activeTab === 3 ? 'followers' : 'following';
            this.loadFollowings(predicate);
            runInAction('bla', () => {this.setLoading()})
          } else {

          }
        }
      );
    }
    rootStore: RootStore;
    @observable activeTab:  string | number | undefined = 0;
    @observable loading = true;
    @observable followings: IProfile[] | undefined = undefined;

    @action resetFollowings = () => {
      this.followings = [];
    }
    @action setLoading = () => {
      this.loading = false;
    }

    @action loadFollowings = async (predicate: string) => {
        this.loading = true;
        try {
          const profiles:IProfile[] = await agent.Profile.getFollowersOrFollowing(
            this.rootStore.profileStore.profile!.userName,
            predicate
          );
          runInAction(() => {
              this.followings = profiles;
              this.loading = false;
          })
        } catch (error) {
          runInAction(() => {
            this.loading = false;
          });
        }
      };
      @action setActiveTab = (activeIndex:  string | number | undefined) => {
        this.activeTab = activeIndex;
      };

}