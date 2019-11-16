import { RootStore } from './rootStore';
import { observable, action, runInAction, computed } from 'mobx';
import { IProfile, IProfileForFollowerOrFollowing } from '../models/IProfile';
import agent from '../api/agent';
import { history } from '../..';
import { async } from 'q';

export default class ProfileStore {
  /**
   *
   */
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  
  rootStore: RootStore;
  
  @observable user = this.rootStore.userStore.user;

  @observable profile: IProfile | null = null;
  @observable followingsOrFollower:
    | IProfileForFollowerOrFollowing[]
    | null = null;

  @observable loadingPhoto: boolean = false;
  @observable loadingDeletePhoto: boolean = false;
  @observable loadingSetMain: boolean = false;
  @observable loadingFollow: boolean = false;
  @observable loadingGetFollowers: boolean = true;
  // @observable activeTab: number = 0;

  @observable disableUpdateForm: boolean = false;
  @observable loadingProfile: boolean = true;

  @computed get isLoggedIn() {
    if (this.rootStore.userStore.user && this.profile) {
      return this.rootStore.userStore.user.userName === this.profile.userName;
    } else {
      return false;
    }
  }

  @action getProfile = async (userName: string) => {
    this.loadingProfile = true;

    try {
      const profile = await agent.Profile.get(userName);

      runInAction('loginAction', () => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      runInAction('loadingProfileActionError', () => {
        this.loadingProfile = false;
        console.log(error);
      });

    }
  };
  @action setLoadingPhoto = () => {
    console.log(this.loadingPhoto + 'in set before');
    runInAction('UploadPhotoAction', () => {
      this.loadingPhoto = true;
      console.log(this.loadingPhoto + 'in set after');
    });
  };
  @action uploadImage = async (file: Blob) => {
    this.loadingPhoto = true;
    try {
      const photo = await agent.Profile.uploadImage(file);

      runInAction('UploadPhotoAction', () => {
        this.profile!.photos.push(photo);
        this.loadingPhoto = false;

        history.push(`/Profiles/${this.user!.userName}`);
      });
    } catch (error) {
      runInAction('UploadImageInProfileStoreActionError', () => {
        this.loadingPhoto = false;
      });
      console.log(error);
    }
  };
  @action deleteImage = async (id: string) => {
    this.loadingDeletePhoto = true;
    try {
      await agent.Profile.deleteImage(id);
      runInAction('deletePhotoAction', () => {
        this.profile!.photos = this.profile!.photos.filter(p => p.id !== id);
        this.loadingDeletePhoto = false;
      });
    } catch (error) {
      runInAction('DeleteImageInProfileStoreActionError', () => {
        this.loadingDeletePhoto = false;
      });
      console.log(error);
    }
  };
  @action setMainPhoto = async (id: string) => {
    this.loadingSetMain = true;
    try {
      await agent.Profile.setMainPhoto(id);
      runInAction('deletePhotoAction', () => {
        this.profile!.photos.find(p => p.isMain)!.isMain = false;
        this.profile!.photos.find(p => p.id === id)!.isMain = true;

        this.user!.image = this.profile!.photos.find(p => p.id === id)!.url;
        this.profile!.image = this.profile!.photos.find(p => p.id === id)!.url;
        this.loadingSetMain = false;
        this.rootStore.activityStore.activityRegistryHasNotChanged = false;
      });
    } catch (error) {
      runInAction('DeleteImageInProfileStoreActionError', () => {
        this.loadingSetMain = false;
      });
      console.log(error);
    }
  };
  @action toggledisableUpdateForm = () => {
    this.disableUpdateForm = !this.disableUpdateForm;
  };
  @action setdisableUpdateForm = () => {
    this.disableUpdateForm = true;
  };
  @action followUser = async () => {
    this.loadingFollow = true;
    try {
      await agent.Profile.followUser(this.profile!.userName);
      runInAction('followUserAction', () => {
        this.profile!.follwersCount += 1;
        this.profile!.isFollowed = true;
        this.loadingFollow = false;
      });
    } catch (error) {
      runInAction('followUserActionError', () => {
        this.loadingFollow = false;
      });
    }
  };
  @action unfollowUser = async () => {
    this.loadingFollow = true;
    try {
      await agent.Profile.unfollowUser(this.profile!.userName);
      runInAction('unfollowUserAction', () => {
        this.profile!.follwersCount -= 1;
        this.profile!.isFollowed = false;
        this.loadingFollow = false;
      });
    } catch (error) {
      runInAction('unfollowUserActionError', () => {
        this.loadingFollow = false;
      });
    }
  };
  @action getFollowersOrFollowing = async (predicate: string) => {
    this.loadingGetFollowers = true;
    try {
      var profiles = await agent.Profile.getFollowersOrFollowing(
        this.profile!.userName,
        predicate
      );
      runInAction('getFollowersOrFollowingAction', () => {
        this.followingsOrFollower = profiles;
        console.log('fetched profiles normal');
        console.log(profiles);
        console.log('fetched profiles observable');
        console.log(this.followingsOrFollower);
        this.loadingGetFollowers = false;
        console.log(this.loadingPhoto);
      });
    } catch (error) {
      runInAction('getFollowersOrFollowingError', () => {
        this.loadingGetFollowers = false;
      });
    }
  };
  // @action setActiveTab = (activeIndex: number) => {
  //   this.activeTab = activeIndex;
  // };
}
