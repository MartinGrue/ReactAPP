import React from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';

const ActivityDashboard: React.FC = () => {

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList></ActivityList>
      </Grid.Column>
      <Grid.Column width={6}>
        <p>Filter will go here</p>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
