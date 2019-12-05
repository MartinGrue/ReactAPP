import React, { Fragment } from 'react';
import { Segment, List, Item, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IAttendee } from '../../../app/models/IActivity';
import { observer } from 'mobx-react-lite';

interface IProps {
  attendees: IAttendee[];
}
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
            <Item key={attendee.userName} style={{ position: 'relative' }}>
              {attendee.isHost && (
                <Item.Description>
                  <Label
                    ribbon='right'
                    color='orange'
                    sytle={{ position: 'absolute' }}
                  >
                    Host
                  </Label>
                </Item.Description>
              )}
              <Image
                size='tiny'
                src={attendee.image || '/assets/user.png'}
                circular
                as={Link}
                to={`/profiles/${attendee.userName}`}
              />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <Link to={`/profiles/${attendee.userName}`}>
                    {attendee.userName}
                  </Link>
                </Item.Header>
                {attendee.following && (
                  <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                )}
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailedSidebar);
