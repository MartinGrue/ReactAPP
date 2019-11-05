import React from 'react';
import { List, Item, Popup } from 'semantic-ui-react';
import { IAtendee } from '../../../app/models/IActivity';

interface IProps {
  attendees: IAtendee[];
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
                src='/assets/user.png'
              ></Item.Image>
            }
          ></Popup>
        </List.Item>
      ))}
    </List>
  );
};

export default ActivityListAttendee;
