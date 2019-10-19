import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/ActivityStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const ActivityDashboard: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const { loadActivities, loadingInitial } = activityStore;
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);
  if (loadingInitial) {
    return <LoadingComponent content='Fetching Activity...'></LoadingComponent>;
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList></ActivityList>
      </Grid.Column>
      <Grid.Column width={6}>
        <h1>Filter will go here</h1>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
