import { Fragment, useState } from "react";
import React from "react";
import { Menu, Sidebar, Icon } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import NavLeftMenuItems from "./NavLeftMenuItems";
import NavRightMenuItems from "./NavRightMenuItems";
import { useMediaQuery } from "react-responsive";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBarMobile: React.FC = () => {
  const rootStore = React.useContext(RootStoreContext);

  const { setmobilePusherOpen } = rootStore.commonStore;

  const [visible, setvisible] = useState(false);

  const onPusherClick = () => {
    if (visible) {
      setvisible(false);
      setmobilePusherOpen(false);
    }
  };

  const handleToggle = () => {
    setmobilePusherOpen(!visible);
    setvisible(!visible);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 1000,
      }}
    >
      <div style={{ height: "5rem" }}>
        <Menu inverted>
          <Menu.Item onClick={() => handleToggle()}>
            <Icon name="sidebar" size="large" />
          </Menu.Item>
          <Menu.Item position="right">
            <NavRightMenuItems></NavRightMenuItems>
          </Menu.Item>
        </Menu>
      </div>
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
          dimmed={visible ? true : false}
          onClick={() => {
            onPusherClick();
          }}
        ></Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

const NavBarDesktop: React.FC = () => {
  return (
    <div style={{ height: "5rem" }}>
      <Menu fixed="top" inverted>
        <NavLeftMenuItems></NavLeftMenuItems>
        <Menu.Item position="right">
          <NavRightMenuItems></NavRightMenuItems>
        </Menu.Item>
      </Menu>
    </div>
  );
};

const Nav: React.FC = () => {
  const isDesktopOrtablet = useMediaQuery({
    query: "(min-device-width: 600px)",
  });
  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 600px)",
  });

  return (
    <Fragment>
      {isDesktopOrtablet && <NavBarDesktop />}
      {isMobileDevice && <NavBarMobile />}
    </Fragment>
  );
};

export default observer(Nav);
