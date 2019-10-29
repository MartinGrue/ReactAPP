// import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import React, { Fragment } from 'react';
import Nav from '../../features/nav/Nav';
import ActivityDashboard from '../../features/activities/dashbord/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router-dom';
import homepage from '../../features/home/homepage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
import LoginForm from '../../features/User/LoginForm';

const App = () => {
  return (
    <Fragment>
      <ToastContainer position='bottom-right'></ToastContainer>
      <Route exact path='/' component={homepage}></Route>
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <Nav />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
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
                <Route path='/login' component={LoginForm}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default observer(App);
