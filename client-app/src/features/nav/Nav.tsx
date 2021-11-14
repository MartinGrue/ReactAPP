import { Fragment, useState } from "react";
import React from "react";
import { Menu, Sidebar, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import NavLeftMenuItems from "./NavLeftMenuItems";
import NavRightMenuItems from "./NavRightMenuItems";
import { useMediaQuery } from "react-responsive";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBarMobile: React.FC = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const onPusherClick = () => {
    if (visible) setVisible(false);
  };

  const handleToggle = () => setVisible(!visible);

  return (
    <Sidebar.Pushable
      style={
        visible
          ? {
              overflowY: "hidden",
              position: "fixed",
              width: "100%",
            }
          : {}
      }
    >
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
        dimmed={visible ? true : false}
        onClick={() => {
          onPusherClick();
        }}
      >
        {children}
        <div style={{ height: "5rem" }}>
          <Menu fixed="top" inverted>
            <Menu.Item onClick={() => handleToggle()}>
              <Icon name="sidebar" size="large" />
            </Menu.Item>
            <Menu.Item position="right">
              <NavRightMenuItems></NavRightMenuItems>
            </Menu.Item>
          </Menu>
        </div>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

const NavBarDesktop: React.FC = ({ children }) => {
  return (
    <Fragment>
      <Menu fixed="top" inverted>
        <NavLeftMenuItems></NavLeftMenuItems>
        <Menu.Item position="right">
          <NavRightMenuItems></NavRightMenuItems>
        </Menu.Item>
      </Menu>
      {children}
    </Fragment>
  );
};

const Nav: React.FC = ({ children }) => {
  const isDesktopOrtablet = useMediaQuery({
    query: "(min-device-width: 600px)",
  });
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 600px)",
  });

  return (
    <Fragment>
      {isDesktopOrtablet && <NavBarDesktop>{children}</NavBarDesktop>}
      {isMobileDevice && <NavBarMobile>{children}</NavBarMobile>}
    </Fragment>
  );
};

export default observer(Nav);
