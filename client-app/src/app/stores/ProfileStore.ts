import { RootStore } from './rootStore';
import { observable, action, runInAction, computed } from 'mobx';
import { IProfile } from '../models/IProfile';
import agent from '../api/agent';
import { history } from '../..';

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
  @observable loadingProfile: boolean = true;
  @observable loadingPhoto: boolean = false;

  @computed get isLoggedIn() {
    if (this.rootStore.userStore.user && this.profile) {
      return this.rootStore.userStore.user.userName === this.profile.userName;
    }
    else{
      return false
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
      });
      console.log(error);
    }
  };
  @action setLoadingPhoto = () => {
    console.log(this.loadingPhoto + "in set before");
    runInAction('UploadPhotoAction', () => {
      this.loadingPhoto = true;
      console.log(this.loadingPhoto + "in set after");
    });
  };
  @action uploadImage = async (file: Blob) => {
    this.loadingPhoto = true;
    try {
      const photo = await agent.Profile.uploadImage(file);
      console.log(photo);
      console.log(this.loadingPhoto);
      runInAction('UploadPhotoAction', () => {
        this.profile!.photos.push(photo);
        this.loadingPhoto = false;
        console.log(this.loadingPhoto);
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
    try {
      await agent.Profile.deleteImage(id);
      runInAction('deletePhotoAction', () => {
        this.profile!.photos = this.profile!.photos.filter(p => p.id !== id);
      });
    } catch (error) {
      runInAction('DeleteImageInProfileStoreActionError', () => {
        // this.loadingProfile = false;
      });
      console.log(error);
    }
  };
}
