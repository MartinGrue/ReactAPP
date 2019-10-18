// import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import React, { Fragment } from 'react';
import Nav from '../../features/nav/Nav';
import ActivityDashboard from '../../features/activities/dashbord/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import homepage from '../../features/home/homepage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

const App = () => {
  return (
    <Fragment>
      <Route exact path='/' component={homepage}></Route>
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <Nav />
            <Container style={{ marginTop: '7em' }}>
              <Route
                exact
                path='/activities'
                component={ActivityDashboard}
              ></Route>
              <Route
                exact
                path={['/createActivity', '/manage/:id']}
                component={ActivityForm}
              ></Route>
              <Route
                exact
                path='/activities/:id'
                component={ActivityDetails}
              ></Route>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default observer(App);
