import React, { useContext, useEffect } from 'react';
import { Tab, Grid, Header, Card, Container, Loader } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';
import ProfileCard from './ProfileCard';
import { IProfileForFollowerOrFollowing } from '../../app/models/IProfile';
import LoadingComponent from '../../app/layout/LoadingComponent';

export const ProfileFollowingOrFollower: React.FC<{
  kindOfProfiles: string;
}> = ({kindOfProfiles}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    getFollowersOrFollowing,
    loadingGetFollowers,
    followingsOrFollower
  } = rootStore.profileStore;

  useEffect(() => {
    getFollowersOrFollowing(kindOfProfiles);
  }, [getFollowersOrFollowing]);


  return (

     <Tab.Pane  loading={loadingGetFollowers}>
      <Grid >
        <Grid.Column width={16} >
          <Header
            floated='left'
            icon='user'
            content={
              kindOfProfiles === 'followers'
                ? `People following ${profile!.displayName}`
                : `People ${profile!.displayName} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
          {followingsOrFollower && followingsOrFollower!.map((member: IProfileForFollowerOrFollowing) => (
                <ProfileCard
                member={member}
                  key={member.userName}
                />
              ))}

          </Card.Group>
        </Grid.Column>
      </Grid>

    </Tab.Pane>

  );
};
export default observer(ProfileFollowingOrFollower);
