import React, { useContext, useEffect, useState } from 'react';
import { Tab, Grid, Header, Card, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import ProfileCard from './ProfileCard';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../app/layout/LoadingComponent';

const ProfileFollowings = () => {
  const rootStore = useContext(RootStoreContext);
  const { profile } = rootStore.profileStore;
  const {
    followings,
    loading,
    activeTab,
    resetFollowings
  } = rootStore.followersStore;
  const localload = true;

  useEffect(() => {
    return () => {
      resetFollowings();
    };
  }, [resetFollowings]);
  if (followings === undefined) {
    return (

        <Tab.Pane loading={true}></Tab.Pane>
    );
  }
  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={
              activeTab === 3
                ? `People following ${profile!.displayName}`
                : `People ${profile!.displayName} is following`
            }
          />{' '}
        </Grid.Column>
        </Grid>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5} stackable doubling>
            {followings &&
              followings.map(profile => (
                <ProfileCard key={profile.userName} profile={profile} />
              ))}
          </Card.Group>
        </Grid.Column>

    </Tab.Pane>
  );
};

export default observer(ProfileFollowings);
