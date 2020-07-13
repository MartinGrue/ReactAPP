import React, { useContext } from 'react';
import { Segment, Item, Header, Button, Image} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { IActivity } from '../../../app/models/IActivity';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { RootStoreContext } from '../../../app/stores/rootStore';

const activityImageStyle = {
  filter: 'brightness(80%)'
};


const ActivityDetailedHeader: React.FC<{ activity: IActivity }> = ({
  activity
}) => {
  const rootStore = useContext(RootStoreContext);
  const { joinActivity, unjoinActivity, loading } = rootStore.activityStore;
  const host = activity.userActivities.filter(x => x.isHost)[0];

  return (

    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment  className='activityImageTextStyle' basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                size='huge'
                  content={activity.title}
                  style={{ color: 'white' }}
                />
                <p>{format(activity.date!, 'eeee do MMMM')}</p>
                <p>
                  Hosted by
                  <Link to={`/profiles/${host.userName}`}> {host.displayName}</Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {activity.isHost ? (
          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            color='orange'
            floated='right'
          >
            Manage Event
          </Button>
        ) : activity.isGoing ? (
          <Button loading={loading} onClick={unjoinActivity} color='red'>
            Cancel attendance
          </Button>
        ) : (
          <Button loading={loading} color='teal' onClick={joinActivity}>
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>

  );
};

export default observer(ActivityDetailedHeader);
