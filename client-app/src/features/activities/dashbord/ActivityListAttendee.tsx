import * as React from 'react';
import { List, Popup, Image } from 'semantic-ui-react';
import { IAttendee } from '../../../app/models/IActivity';
import { Link } from 'react-router-dom';

interface IProps {
  attendees: IAttendee[];
}

const styles = 'borderImage';
const ActivityListAttendee: React.FC<IProps> = ({ attendees }) => {
  return (
    <List horizontal>
      {attendees.map(attendee => (
        <List.Item key={attendee.displayName}>
          <Popup
            header={attendee.displayName}
            trigger={
              <Image
                size='mini'
                circular
                src={attendee.image || '/assets/user.png'}
                as={Link}
                to={`/profiles/${attendee.userName}`}
                bordered
                className={attendee.following ? styles : undefined}
              />
            }
          ></Popup>
        </List.Item>
      ))}
    </List>
  );
};

export default ActivityListAttendee;
