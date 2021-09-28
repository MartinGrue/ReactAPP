import { useContext } from "react";
import * as React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import { Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

const NavRightMenuItems: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;
  return (
    <div>
      {user && (
        <Menu.Item position="right" className="NavRightMenu">
          <Image
            avatar
            size="tiny"
            spaced="right"
            src={user.image || "/assets/user.png"}
          />
          <Dropdown
            data-cy="profile-dropdown"
            pointing="top right"
            text={user.displayName}
            className="NavRightMenuDropDown"
          >
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profiles/${user.userName}`}
                text="My profile"
                icon="user"
              />
              <Dropdown.Item
                data-cy="logout"
                text="Logout"
                onClick={logout}
                icon="power"
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      )}
    </div>
  );
};
export default observer(NavRightMenuItems);
