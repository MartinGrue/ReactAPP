import React, { useContext } from 'react';
import { Container } from 'semantic-ui-react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import ActivityDashboard from '../../features/activities/dashbord/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import ProfilePage from '../../features/profile/ProfilePage';
import LoginForm from '../../features/User/LoginForm';
import NotFound from './NotFound';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';


const Routes: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn } = rootStore.userStore;

  if (isLoggedIn) {
    return (
      <Container style={{ marginTop: '7em' }}>
        <Switch>
          <Route exact path='/activities' component={ActivityDashboard}></Route>
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
          <Route path='/profiles/:userName' component={ProfilePage}></Route>
          <Route path='/login' component={LoginForm}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </Container>
    );
  } else {
    return <Route render={() => <Redirect to={'/'}></Redirect>}></Route>;
  }
};

export default observer(Routes);
