import React from 'react';
import { Item, Button, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IActivity } from '../../../app/models/IActivity';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item key={activity.id}>
            <Item.Image
              size='tiny'
              circular
              src='/assets/user.png'
            ></Item.Image>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{format(activity.date!, 'hh:mm')}</Item.Meta>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='clock' />
        {format(activity.date!, 'hh:mm')}
        <Icon name='marker' />
        {activity.venue},{activity.city}
      </Segment>
      <Segment secondary>Miglieder kommen hier rein</Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          floated='right'
          content='View'
          color='blue'
          as={Link}
          to={`/activities/${activity.id}`}
        ></Button>
      </Segment>
    </Segment.Group>
  );
};
export default observer(ActivityListItem);
