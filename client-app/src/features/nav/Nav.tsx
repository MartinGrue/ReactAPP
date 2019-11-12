import React, { useContext, useState } from 'react';
import {
  Menu,
  Container,
  Button,
  Dropdown,
  Image,
  Responsive,
  Sidebar,
  Icon
} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink, Link, Switch, Route } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import ActivityDashboard from '../activities/dashbord/ActivityDashboard';
import ActivityForm from '../activities/form/ActivityForm';
import ActivityDetails from '../activities/details/ActivityDetails';
import ProfilePage from '../profile/ProfilePage';
import LoginForm from '../User/LoginForm';
import NotFound from '../../app/layout/NotFound';

const NavBarMobile: React.FC<{
  leftItems: any;
  onPusherClick: any;
  onToggle: any;
  rightItems: any;
  visible: any;
}> = ({
  children,
  leftItems,
  onPusherClick,
  onToggle,
  rightItems,
  visible
}) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      items={leftItems}
      vertical
      visible={visible}
    >
      {leftItems.map((item: any) => (
        <Menu.Item {...item} />
      ))}
      {/* <Menu.Item as='a'>
        <Icon name='home' />
        Home
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='gamepad' />
        Games
      </Menu.Item>
      <Menu.Item as='a'>
        <Icon name='camera' />
        Channels
      </Menu.Item> */}
    </Sidebar>
    <Sidebar.Pusher
      dimmed={visible}
      onClick={() => onPusherClick()}
      style={{ minHeight: '100vh' }}
    >
      <Routes></Routes>
      <Menu fixed='top' inverted>
        <Menu.Item>
          <Image size='mini' src='https://react.semantic-ui.com/logo.png' />
        </Menu.Item>
        <Menu.Item onClick={() => onToggle()}>
          <Icon name='sidebar' />
        </Menu.Item>
        <Menu.Menu position='right'>
          {rightItems.map((item: any) => (
            <Menu.Item {...item} />
          ))}
        </Menu.Menu>
      </Menu>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop: React.FC<{ leftItems: any; rightItems: any }> = ({
  leftItems,
  rightItems
}) => (
  <Menu fixed='top' inverted>
    <Menu.Item>
      <Image size='mini' src='https://react.semantic-ui.com/logo.png' />
    </Menu.Item>
    {leftItems.map((item: any) => (
      <Menu.Item {...item} />
    ))}
    <Menu.Menu position='right'>
      {rightItems.map((item: any) => (
        <Menu.Item {...item} />
      ))}
    </Menu.Menu>
  </Menu>
);

const NavBarChildren: React.FC = ({ children }) => (
  <Container style={{ marginTop: '5em' }}>{children}</Container>
);

const Routes: React.FC = () => (
  <Container style={{ marginTop: '7em' }}>
    <Switch>
      <Route exact path='/activities' component={ActivityDashboard}></Route>
      <Route
        exact
        path={['/createActivity', '/manage/:id']}
        component={ActivityForm}
      ></Route>
      <Route exact path='/activities/:id' component={ActivityDetails}></Route>
      <Route path='/profiles/:userName' component={ProfilePage}></Route>
      <Route path='/login' component={LoginForm}></Route>
      <Route component={NotFound}></Route>
    </Switch>
  </Container>
);

const Nav: React.FC = ({ children }) => {
  const leftItems = [
    { as: 'a', content: 'Home', key: 'home' },
    { as: 'a', content: 'Users', key: 'users' }
  ];
  const rightItems = [
    { as: 'a', content: 'Login', key: 'login' },
    { as: 'a', content: 'Register', key: 'register' }
  ];

  const [visible, setvisible] = useState(false);

  const handlePusher = () => {
    if (visible) setvisible(false);
  };

  const handleToggle = () => setvisible(!visible);

  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <div>
      <Responsive {...Responsive.onlyMobile}>
        <NavBarMobile
          leftItems={leftItems}
          onPusherClick={handlePusher}
          onToggle={handleToggle}
          rightItems={rightItems}
          visible={visible}
        >
          <NavBarChildren>{children}</NavBarChildren>
        </NavBarMobile>
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
        <NavBarChildren>{children}</NavBarChildren>
        <Routes></Routes>
      </Responsive>
    </div>
    // <div>
    //   <Menu fixed='top' inverted stackable >
    //     <Container>
    //       <Menu.Item header exact as={NavLink} to='/'>
    //         <img
    //           src='/assets/logo.png'
    //           alt='logo'
    //           style={{ marginRight: '10px' }}
    //         ></img>
    //         React Demo
    //       </Menu.Item>
    //       <Menu.Item name='Activities' as={NavLink} to='/activities' />
    //       <Menu.Item>
    //         <Button
    //           positive
    //           content='Create Activity'
    //           as={NavLink}
    //           to='/createactivity'
    //         ></Button>
    //       </Menu.Item>
    //       {user && (
    //         <Menu.Item position='right'>
    //           <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
    //           <Dropdown pointing='top left' text={user.userName}>
    //             <Dropdown.Menu>
    //               <Dropdown.Item
    //                 as={Link}
    //                 to={`/profiles/${user.userName}`}
    //                 text='My profile'
    //                 icon='user'
    //               />
    //               <Dropdown.Item text='Logout' onClick={logout} icon='power' />
    //             </Dropdown.Menu>
    //           </Dropdown>
    //         </Menu.Item>
    //       )}
    //     </Container>
    //   </Menu>
    // </div>
  );
};

export default observer(Nav);
