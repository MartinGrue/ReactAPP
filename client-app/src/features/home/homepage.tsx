import React, { useContext, Fragment, useState } from 'react';
import {
  Container,
  Segment,
  Header,
  Button,
  Image,
  Divider,
  Transition
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../User/LoginForm';
import RegisterForm from '../User/RegisterForm';

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  const [visible, setvisible] = useState(false);
  const containerStyle = {
    padding: '5%',
    justifyContent: 'center',
    alignItems: 'center'
  };
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text style={containerStyle}>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {isLoggedIn && user ? (
          <Fragment>
            <Header
              as='h2'
              inverted
              content={`Welcome back ${user.displayName}`}
            />
            <Button as={Link} to='/activities' size='huge' inverted>
              Go to Activities!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as='h2' inverted content='Welcome to Reactivities' />
            <Button
              onClick={() => openModal(<LoginForm />)}
              size='huge'
              inverted
            >
              Login!
            </Button>
            <Button
              onClick={() => openModal(<RegisterForm />)}
              size='huge'
              inverted
            >
              Register!
            </Button>
          </Fragment>
        )}
        <Divider hidden />
        <div>
          <Button
            size='huge'
            inverted
            content={visible ? 'Hide Dev Info' : 'Show Dev Info'}
            onClick={() => setvisible(!visible)}
          />
          <Divider hidden />
          {visible && (
            <Transition animation='scale' duration={500}>
              <div>
              <strong>This is a demo single page application</strong>
              <br></br>
              <strong>Please login with email:bob@test.com Password: Pa$$w0rd Or feel free to register a new Account</strong>
              <br></br>
              <strong>You can login with any other user, the password is always : Pa$$w0rd</strong>
              </div>
            </Transition>
          )}
        </div>
      </Container>
    </Segment>
  );
};

export default HomePage;
