import { RootStore } from "./rootStore";
import { observable, action, reaction, makeObservable } from "mobx";

export default class CommonStore {
  rootStore: RootStore;
  /**
   *
   */
  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem("jwt", token);
        } else {
          window.localStorage.removeItem("jwt");
        }
      }
    );
  }
  @observable token: string | null = window.localStorage.getItem("jwt");
  @observable google_id_token: string | null = null;
  @observable appLoaded = false;

  @action setToken = (token: string | null) => {
    // window.localStorage.setItem('jwt', token!);
    this.token = token;
  };
  @action setApploaded = () => {
    this.appLoaded = true;
  };
  @action setGoogleToken = (id_token: string) => {
    window.localStorage.setItem("google_id_token", id_token);
  };
}
