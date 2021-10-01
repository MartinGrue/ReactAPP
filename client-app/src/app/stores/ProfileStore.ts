import { RootStore } from "./rootStore";
import {
  observable,
  action,
  runInAction,
  computed,
  makeObservable,
} from "mobx";
import { IProfile } from "../models/IProfile";
import agent from "../api/agent";
import { history } from "../..";
import { IUserActivity } from "../models/IActivity";

export default class ProfileStore {
  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  rootStore: RootStore;

  // @observable user = this!.rootStore.userStore.user;
  @computed get user() {
    return this!.rootStore.userStore.user;
  }
  @observable timeStampForUpload: number = 0;

  @observable profile: IProfile | null = null;

  @observable loadingPhoto: boolean = false;
  @observable loadingDeletePhoto: boolean = false;
  @observable loadingSetMain: boolean = false;
  @observable loadingFollow: boolean = false;

  @observable disableUpdateForm: boolean = false;
  @observable loadingProfile: boolean = true;
  @observable userActivities: IUserActivity[] = [];
  @observable loadingUserActivities: boolean = false;

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

      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingProfile = false;
        console.log(error);
      });
    }
  };
  @action setLoadingPhoto = () => {
    runInAction(() => {
      this.loadingPhoto = true;
    });
  };
  @action uploadImage = async (file: Blob) => {
    this.loadingPhoto = true;
    try {
      const photo = await agent.Profile.uploadImage(file);

      runInAction(() => {
        this.profile!.photos.push(photo);
        this.loadingPhoto = false;

        history.push(`/Profiles/${this.user!.userName}`);
      });
    } catch (error) {
      runInAction(() => {
        this.loadingPhoto = false;
      });
      console.log(error);
    }
  };
  @action uploadImageDirect = async (image: any) => {
    this.setLoadingPhoto();

    this.timeStampForUpload = Math.round(new Date().getTime() / 1000);
    const api_key = "716959181144487";
    const formData = new FormData();
    try {
      // let file = files![i];
      var reader = new FileReader();
      reader.readAsDataURL(image!);
      reader.onloadend = async () => {
        let file = reader.result as string;
        const appendData = {
          folder: "Reactivities",
        };

        formData.append("folder", "Reactivities");
        // formData.append("eager", "c_pad,h_100,w_100");

        formData.append("timestamp", this.timeStampForUpload.toString());
        formData.append("transformation", "w_500,h_500,c_fill");

        const signature = await agent.Profile.getSignature(formData);
        formData.append("file", file);
        formData.append("api_key", api_key);
        formData.append("signature", signature);
        const response = await fetch(
          "http://api.cloudinary.com/v1_1/dvzlb9xco/image/upload",
          { method: "POST", body: formData }
        );
        const data = await response.json();
        const photo = await agent.Profile.UploadResults({
          PublicId: data.public_id,
          Url: data.secure_url,
        });
        runInAction(() => {
          this.profile!.photos.push(photo);
          this.loadingPhoto = false;
          history.push(`/Profiles/${this.user!.userName}`);
        });
      };
    } catch (error) {
      runInAction(() => {
        this.loadingPhoto = false;
      });
    }
  };
  @action deleteImage = async (id: string) => {
    this.loadingDeletePhoto = true;
    try {
      await agent.Profile.deleteImage(id);
      runInAction(() => {
        this.profile!.photos = this.profile!.photos.filter((p) => p.id !== id);
        this.loadingDeletePhoto = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingDeletePhoto = false;
      });
      //console.log(error);
    }
  };
  @action setMainPhoto = async (id: string) => {
    this.loadingSetMain = true;
    try {
      await agent.Profile.setMainPhoto(id);
      runInAction(() => {
        this.profile!.photos.find((p) => p.isMain)!.isMain = false;
        this.profile!.photos.find((p) => p.id === id)!.isMain = true;

        this.user!.image = this.profile!.photos.find((p) => p.id === id)!.url;
        this.profile!.image = this.profile!.photos.find(
          (p) => p.id === id
        )!.url;
        this.loadingSetMain = false;
        this.rootStore.activityStore.activityRegistryHasNotChanged = false;
      });
    } catch (error) {
      runInAction(() => {
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
  @action unsetdisableUpdateForm = () => {
    this.disableUpdateForm = false;
  };
  @action followUser = async () => {
    this.loadingFollow = true;
    try {
      await agent.Profile.followUser(this.profile!.userName);
      runInAction(() => {
        this.profile!.followersCount += 1;
        this.profile!.isFollowed = true;
        this.loadingFollow = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingFollow = false;
      });
    }
  };
  @action unfollowUser = async () => {
    this.loadingFollow = true;
    try {
      await agent.Profile.unfollowUser(this.profile!.userName);
      runInAction(() => {
        this.profile!.followersCount -= 1;
        this.profile!.isFollowed = false;
        this.loadingFollow = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingFollow = false;
      });
    }
  };
  @action loadUserActivities = async (predicate?: string) => {
    this.loadingUserActivities = true;
    try {
      var userActivities = await agent.Profile.listActivites(
        this.profile!.userName,
        predicate!
      );
      runInAction(() => {
        this.userActivities = userActivities;
        this.loadingUserActivities = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingUserActivities = false;
      });
    }
  };
}
