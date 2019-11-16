import React, { useContext, useEffect, Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { loadActivities, loadingInitial } = rootStore.activityStore;
  const {loading, loadFollowings} = rootStore.followersStore;
  useEffect(() => {
    loadActivities();
    loadFollowings('followers');
  }, [loadActivities,loadFollowings]);
  if (loading) {
    return <LoadingComponent content='Fetching Activity...'></LoadingComponent>;
  }
  return (
    // <Grid>
    //   <Grid.Column width={10}>
    //     <ActivityList></ActivityList>
    //   </Grid.Column>
    //   <Grid.Column width={6}>
    //     <h1>Filter will go here</h1>
    //   </Grid.Column>
    // </Grid>
    <Fragment>
      <h1>Filter will go here</h1>
      <ActivityList></ActivityList>
    </Fragment>
  );
};

export default observer(ActivityDashboard);
