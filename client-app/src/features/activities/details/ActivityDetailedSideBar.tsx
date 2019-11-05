import React, { Fragment } from 'react';
import { Segment, List, Item, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IAtendee } from '../../../app/models/IActivity';

interface IProps {
  attendees: IAtendee[];
}
const isHost = true;
const ActivityDetailedSidebar: React.FC<IProps> = ({ attendees }) => {
  return (
    <Fragment>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {attendees.length}{' '}
        {attendees.length === 1 ? 'Person is going' : 'People are going'}
      </Segment>

      <Segment attached>
        <List relaxed divided>
          {attendees.map(attendee => (
            <Item key={attendee.displayName} style={{ position: 'relative' }}>
              {attendee.isHost &&
              <Item.Description>
              <Label ribbon='right' color='orange' sytle={{position: 'absolute'}}> </Label>
              </Item.Description>}
              <Image size='tiny' src={'/assets/user.png'} />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <Link to={`#`}>{attendee.displayName}</Link>
                </Item.Header>
                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </Fragment>
  );
};

export default ActivityDetailedSidebar;
