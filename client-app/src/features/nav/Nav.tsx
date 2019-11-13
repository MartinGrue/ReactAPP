import React, { useState } from 'react';
import {
  Menu,
  Responsive,
  Sidebar,
  Icon
} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import Routes from '../../app/layout/Routes';
import NavLeftMenuItems from './NavLeftMenuItems';
import NavRightMenuItems from './NavRightMenuItems';

const NavBarMobile: React.FC<{
  onPusherClick: () => void;
  onToggle: () => void;
  handleToggle: () => void;
  visible: boolean;
}> = ({ onPusherClick, handleToggle,onToggle, visible }) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      vertical
      visible={visible}
    >
      {/* {leftItems.map((item: any) => (
        <Menu.Item {...item} />
      ))} */}
      <NavLeftMenuItems onPusherClick={onPusherClick}></NavLeftMenuItems>
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
      dimmed={false}
      onClick={() => {onPusherClick(); console.log(visible)}}
      style={{ minHeight: '100vh' }}
      
    >
      <Routes></Routes>
      <Menu fixed='top' inverted>
        {/* <Menu.Item>
          <Image size='mini' src='https://react.semantic-ui.com/logo.png' />
        </Menu.Item> */}
        <Menu.Item onClick={() => onToggle()}>
          <Icon name='sidebar' size='large' />
        </Menu.Item>
        <Menu.Menu position='right'>
          {/* {rightItems.map((item: any) => (
            <Menu.Item {...item} />
          ))} */}
          <NavRightMenuItems></NavRightMenuItems>
        </Menu.Menu>
      </Menu>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop: React.FC = () => (
  <Menu fixed='top' inverted>
    <NavLeftMenuItems></NavLeftMenuItems>
    <Menu.Menu position='right'>
      {/* {rightItems.map((item: any) => (
        <Menu.Item {...item} />
      ))} */}
      <NavRightMenuItems></NavRightMenuItems>
    </Menu.Menu>
  </Menu>
);

const Nav: React.FC = () => {
  const [visible, setvisible] = useState(false);

  const handlePusher = () => {
    if (visible) setvisible(false);
  };

  const handleToggle = () => setvisible(!visible);

  return (
    <div>
      <Responsive {...Responsive.onlyMobile}>
        <NavBarMobile
        handleToggle ={handleToggle}
          onPusherClick={handlePusher}
          onToggle={handleToggle}
          visible={visible}
        ></NavBarMobile>
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <NavBarDesktop />
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
