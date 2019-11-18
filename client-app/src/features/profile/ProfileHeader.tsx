import React, { useContext, useEffect } from 'react';
import { Segment, Item, Header, Button, Grid, Statistic, Divider, Reveal } from 'semantic-ui-react';
import { IProfile } from '../../app/models/IProfile';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../app/stores/rootStore';

interface IProps{
  profile: IProfile;
}

const ProfileHeader: React.FC<IProps> = ({
  profile
}) => {
  const rootContext = useContext(RootStoreContext);
  const {loadingFollow, unfollowUser, followUser} = rootContext.profileStore;

  useEffect(() => {
    console.log(profile)
  }, [])
  return (
    <Segment padded>
      <Grid relaxed stackable container >
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
            {profile && (
              <Item.Image
                className='responsive'
                avatar
                size='small'
                src={profile.image || '/assets/user.png'}
              />)}
              <Item.Content verticalAlign='middle'>
                <Header as='h1' content={profile.displayName}></Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4} >
          <Statistic.Group widths={2}>
            <Statistic label='Followers' value={profile.followersCount}/>
            <Statistic label='Following' value={profile.followingCount}/>
          </Statistic.Group>
          <Divider/>
          <Reveal animated='move'>
            <Reveal.Content visible style={{ width: '100%' }}>
              <Button
                fluid
                content={profile.isFollowed ? 'Unfollow' : 'Follow'}
                color={profile.isFollowed ? 'red' : 'green'}
                loading={loadingFollow}
              />
            </Reveal.Content>
            <Reveal.Content hidden>
              <Button
                fluid
                basic
                color={profile.isFollowed ? 'red' : 'green'}
                content={profile.isFollowed ? 'Unfollow' : 'Follow'}
                onClick={profile.isFollowed ? () => unfollowUser() : () => followUser()}
                loading={loadingFollow}
              />
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
