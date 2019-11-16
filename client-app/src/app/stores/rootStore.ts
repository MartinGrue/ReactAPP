import ActivityStore from './ActivityStore'
import UserStore from './UserStore';
import { createContext } from 'react';
import { configure } from 'mobx';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import ProfileStore from './ProfileStore';
import FollowersStore from './FollowersStore';

configure({ enforceActions: 'always' });
export class RootStore{
    activityStore: ActivityStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    followersStore: FollowersStore;

    constructor() {
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);        
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.profileStore = new ProfileStore(this);
        this.followersStore = new FollowersStore(this);
    }
}
export const RootStoreContext = createContext(new RootStore());