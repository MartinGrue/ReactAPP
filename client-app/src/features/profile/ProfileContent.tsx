import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from './ProfilePhotos';

const panes = [
  { menuItem: 'About', render: () => <Tab.Pane>About Content</Tab.Pane> },
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
    render: () => <Tab.Pane>Followers Content</Tab.Pane>
  },
  {
    menuItem: 'Following',
    render: () => <Tab.Pane>Following Content</Tab.Pane>
  }
];
export const ProfileContent = () => {
  return (
    <Tab
      panes={panes}
      menuPosition='right'
      menu={{ fluid: true, className: 'wrapped', tabular: false }}
      activeIndex={1}
    ></Tab>
  );
};
