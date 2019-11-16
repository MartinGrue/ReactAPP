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
      <Segment>
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
            <Grid>
              <Grid.Column width={16}>
                <Tab.Pane loading={true}> </Tab.Pane>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
  return (
    <Segment>
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
          />
          <Grid>
            <Grid.Column width={16}>
              <Tab.Pane loading={loading}>
                <Card.Group itemsPerRow={5}>
                  {followings &&
                    followings.map(profile => (
                      <ProfileCard key={profile.userName} profile={profile} />
                    ))}
                </Card.Group>
              </Tab.Pane>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileFollowings);
