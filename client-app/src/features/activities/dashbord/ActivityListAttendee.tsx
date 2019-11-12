import React from 'react';
import { List, Item, Popup } from 'semantic-ui-react';
import { IAttendee } from '../../../app/models/IActivity';
import { Link } from 'react-router-dom';

interface IProps {
  attendees: IAttendee[];
}

const ActivityListAttendee: React.FC<IProps> = ({ attendees }) => {
  return (
    <List horizontal>
      {attendees.map(attendee => (
        <List.Item key={attendee.displayName}>
          <Popup
            header={attendee.displayName}
            trigger={
              <Item.Image
                size='mini'
                circular
                src={attendee.image || '/assets/user.png'}
                as={Link} to={`/profiles/${attendee.userName}`}
              ></Item.Image>
            }
          ></Popup>
        </List.Item>
      ))}
    </List>
  );
};

export default ActivityListAttendee;
