import { RootStore } from "./rootStore";
import { observable, action, makeObservable } from "mobx";
import { ReactNode } from "react";

export default class ModalStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }
  @observable.shallow modal: { open: boolean; body: ReactNode } = {
    open: false,
    body: null,
  };
  @action openModal = (content: ReactNode) => {
    this.modal.open = true;
    this.modal.body = content;
  };
  @action closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}
