import React, { Fragment } from 'react';
import { Tab, Header } from 'semantic-ui-react';

const panes = [
  { menuItem: 'About', render: () => <Tab.Pane>About Content</Tab.Pane> },
  {
    menuItem: 'Photos',
    render: () => (
      <Tab.Pane>
        Photos Content
        <Fragment>
          <strong>
            Hello strong</strong>
        </Fragment>
      </Tab.Pane>
    )
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
      menu={{ fluid: true, className: "wrapped", tabular: false}}
    ></Tab>
  );
};
