import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from './ProfilePhotos';
import ProfileDescription from './ProfileDescription';
import { ProfileFollowingOrFollower } from './ProfileFollowingOrFollower';
import { observer } from 'mobx-react-lite';

const panes = [
  {
    menuItem: 'About',
    render: () => <ProfileDescription></ProfileDescription>
  },
  {
    menuItem: 'Photos',
    render: () => <ProfilePhotos></ProfilePhotos>
  },
  {
    menuItem: 'Activities',
    render: () => <Tab.Pane>Activities Content</Tab.Pane>
  },
  {
    menuItem: 'Followers',
    render: () => (
      <ProfileFollowingOrFollower kindOfProfiles='followers'></ProfileFollowingOrFollower>
    )
  },
  {
    menuItem: 'Following',
    render: () => (
      <ProfileFollowingOrFollower kindOfProfiles='following'></ProfileFollowingOrFollower>
    )
  }
];
export const ProfileContent: React.FC<{
  setActiveTab: (activeIndex: any) => void;
}> = ({ setActiveTab }) => {
  return (
    <Tab
      panes={panes}
      menuPosition='right'
      menu={{ fluid: true, className: 'wrapped', tabular: false }}
      defaultActiveIndex={1}
      onTabChange={(e,data) => setActiveTab(data.activeIndex)}
    ></Tab>
  );
};
