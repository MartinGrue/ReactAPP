import React, { useState, Fragment, ReactNode } from "react";
import { Menu, Responsive, Sidebar, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import NavLeftMenuItems from "./NavLeftMenuItems";
import NavRightMenuItems from "./NavRightMenuItems";

const NavBarMobile: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [visible, setvisible] = useState(false);

  const onPusherClick = () => {
    if (visible) setvisible(false);
  };

  const handleToggle = () => setvisible(!visible);

  const sidebarPusherStyle = {
    minHeight: "100vh",
  };
  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
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
        {children}
        <Menu fixed="top" inverted>
          <Menu.Item onClick={() => handleToggle()}>
            <Icon name="sidebar" size="large" />
          </Menu.Item>
          <Menu.Menu position="right">
            <NavRightMenuItems></NavRightMenuItems>
          </Menu.Menu>
        </Menu>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

const NavBarDesktop: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Fragment>
      <Menu fixed="top" inverted>
        <NavLeftMenuItems></NavLeftMenuItems>
        <Menu.Menu position="right">
          <NavRightMenuItems></NavRightMenuItems>
        </Menu.Menu>
      </Menu>
      {children}
    </Fragment>
  );
};

const Nav: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <Responsive {...Responsive.onlyMobile}>
        <NavBarMobile>{children}</NavBarMobile>
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <NavBarDesktop>{children}</NavBarDesktop>
      </Responsive>
    </div>
  );
};

export default observer(Nav);
