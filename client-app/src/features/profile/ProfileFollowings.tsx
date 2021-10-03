import { useContext, useEffect } from "react";
import { Tab, Grid, Header, Card } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ProfileCard from "./ProfileCard";
import { observer } from "mobx-react-lite";

const ProfileFollowings = () => {
  const rootStore = useContext(RootStoreContext);
  const { profile } = rootStore.profileStore;
  const { followings, activeTab, resetFollowings } = rootStore.followersStore;

  useEffect(() => {
    return () => {
      resetFollowings();
    };
  }, [resetFollowings]);
  if (followings === undefined) {
    return <Tab.Pane loading={true}></Tab.Pane>;
  }
  return (
    <Grid>
      <Grid.Column width={16}>
        <Header
          data-cy="PaneContentHeader"
          floated="left"
          icon="user"
          content={
            activeTab === 3
              ? `People following ${profile!.displayName}`
              : `People ${profile!.displayName} is following`
          }
        />
      </Grid.Column>

      <Grid.Column width={16}>
        <Card.Group itemsPerRow={5} stackable doubling>
          {followings &&
            followings.map((ffprofile) => (
              <ProfileCard key={ffprofile.userName}{...{ffprofile}} />
            ))}
        </Card.Group>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProfileFollowings);
