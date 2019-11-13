import React from 'react';
import { Segment, Item, Header, Button, Grid, Statistic, Divider, Reveal } from 'semantic-ui-react';
import { IProfile } from '../../app/models/IProfile';
import { observer } from 'mobx-react-lite';

const ProfileHeader: React.FC<{ profile: IProfile }> = ({
  profile
}) => {
  console.log(profile);
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
                <Header as='h1'>DisplayName</Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4} >
          <Statistic.Group widths={2} >
            <Statistic label='Followers' value='5'/>
            <Statistic label='Following' value='42'/>
          </Statistic.Group>
          <Divider/>
          <Reveal animated='move'>
            <Reveal.Content visible style={{ width: '100%' }}>
              <Button
                fluid
                color='teal'
                content='Following'
              />
            </Reveal.Content>
            <Reveal.Content hidden>
              <Button
                fluid
                basic
                color={true ? 'red' : 'green'}
                content={true ? 'Unfollow' : 'Follow'}
              />
            </Reveal.Content>
          </Reveal>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
