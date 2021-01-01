import React, { useContext, useState, useEffect } from 'react';
import { Tab, Header, Grid, GridColumn, Button } from 'semantic-ui-react';
import ProfileEditForm from './ProfileEditForm';
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';

export const ProfileDescription = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    isLoggedIn,
    setdisableUpdateForm,
    toggledisableUpdateForm
  } = rootStore.profileStore;

  const [editProfileToggle, seteditProfileToggle] = useState(false);

  useEffect(() => {
    setdisableUpdateForm();
  }, [setdisableUpdateForm]);
  return (
    <Tab.Pane>
      <Grid>
        <GridColumn width={16}>
          <Header floated='left' icon='address card' content='About'></Header>
          {isLoggedIn && (
            <Button
              floated='right'
              basic
              content={editProfileToggle ? 'Cancel' : 'Edit Profile'}
              color={editProfileToggle ? 'red' : 'green'}
              onClick={() => {
                seteditProfileToggle(!editProfileToggle);
                toggledisableUpdateForm();
              }}
            ></Button>
          )}
        </GridColumn>
      </Grid>
      <ProfileEditForm></ProfileEditForm>
    </Tab.Pane>
  );
};

export default observer(ProfileDescription);
