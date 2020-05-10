import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from './ProfilePhotos';
import ProfileDescription from './ProfileDescription';
import { observer } from 'mobx-react-lite';
import ProfileFollowings from './ProfileFollowings';
import ProfileActivities from './ProfileActivities';


export const ProfileContent: React.FC<{
  setActiveTab: (activeIndex: string | number | undefined) => void;
}> = ({ setActiveTab }) => {

  return (
    <Tab
      panes={[
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
          render: () => <ProfileActivities></ProfileActivities>
        },
        {
          menuItem: 'Followers',
          render: () => (
            <ProfileFollowings></ProfileFollowings>
          )
        },
        {
          menuItem: 'Following',
          render: () => (
            <ProfileFollowings></ProfileFollowings>
          )
        }
      ]}
      menuPosition='right'
      menu={{ fluid: true, className: 'wrapped', tabular: false }}
      defaultActiveIndex={1}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    ></Tab>
  );
};

export default observer(ProfileContent);
