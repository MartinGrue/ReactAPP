import React from 'react';
import { Tab, Header, Grid, GridColumn } from 'semantic-ui-react';
import ProfileEditForm from './ProfileEditForm';

export const ProfileDescription = () => {
  return (
    <Tab.Pane>
      <Grid>
        <GridColumn width={16}>
      <Header floated='left' icon='address card' content='Photos'></Header>
      </GridColumn>
      </Grid>
        {/* <ProfileEditForm></ProfileEditForm> */}
    </Tab.Pane>
  );
};

export default ProfileDescription;
