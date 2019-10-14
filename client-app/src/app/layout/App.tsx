// import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import React, { useEffect, Fragment, useContext } from 'react';
import Nav from '../../features/nav/Nav';
import ActivityDashboard from '../../features/activities/dashbord/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import ActivityStore from '../stores/ActivityStore';
import { observer } from 'mobx-react-lite';

const App = () => {
  const activityStore = useContext(ActivityStore);
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content='Loading new Activities...' />;
  return (
    <Fragment>
      <Nav />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard></ActivityDashboard>
      </Container>
    </Fragment>
  );
};

export default observer(App);
