import React, { useState } from 'react';
import { Menu, Responsive, Sidebar, Icon } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import Routes from '../../app/layout/Routes';
import NavLeftMenuItems from './NavLeftMenuItems';
import NavRightMenuItems from './NavRightMenuItems';

const NavBarMobile: React.FC<{
  onPusherClick: () => void;
  handleToggle: () => void;
  visible: boolean;
}> = ({ onPusherClick, handleToggle, visible }) => {
  const sidebarPusherStyle = {
    minHeight : "100vh"
  };
  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        vertical
        visible={visible}
      >
        <NavLeftMenuItems onPusherClick={onPusherClick}></NavLeftMenuItems>
      </Sidebar>
      <Sidebar.Pusher
        dimmed={false}
        onClick={() => {
          onPusherClick();
        }}
        style={sidebarPusherStyle}
      >
        <Routes></Routes>
        <Menu fixed='top' inverted>
          <Menu.Item onClick={() => handleToggle()}>
            <Icon name='sidebar' size='large' />
          </Menu.Item>
          <Menu.Menu position='right'>
            <NavRightMenuItems></NavRightMenuItems>
          </Menu.Menu>
        </Menu>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

const NavBarDesktop: React.FC = () => (
  <Menu fixed='top' inverted>
    <NavLeftMenuItems></NavLeftMenuItems>
    <Menu.Menu position='right'>
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
          handleToggle={handleToggle}
          onPusherClick={handlePusher}
          visible={visible}
        ></NavBarMobile>
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <NavBarDesktop />
      </Responsive>
    </div>
  );
};

export default observer(Nav);
