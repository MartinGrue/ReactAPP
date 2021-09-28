import { useState, ReactNode } from "react";
import * as React from "react";
import { Menu, Sidebar, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import NavLeftMenuItems from "./NavLeftMenuItems";
import NavRightMenuItems from "./NavRightMenuItems";
import { useMediaQuery } from "react-responsive";

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
    overflowY: "hidden",
  };
  return (
    <Sidebar.Pushable
      style={
        visible ? { overflowY: "hidden", position: "fixed", width: "100%" } : {}
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

const NavBarDesktop: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Menu fixed="top" inverted>
        <NavLeftMenuItems></NavLeftMenuItems>
        <Menu.Item position="right">
          <NavRightMenuItems></NavRightMenuItems>
        </Menu.Item>
      </Menu>
      {children}
    </>
  );
};

const Nav: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isDesktopOrtablet = useMediaQuery({
    query: "(min-device-width: 600px)",
  });
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 600px)",
  });

  return (
    <div className="content">
      {isDesktopOrtablet && <NavBarDesktop>{children}</NavBarDesktop>}
      {isMobileDevice && <NavBarMobile>{children}</NavBarMobile>}
    </div>
  );
};

export default observer(Nav);
