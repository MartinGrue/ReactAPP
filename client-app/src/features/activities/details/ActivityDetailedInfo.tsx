import React from 'react';
import { Segment, Grid, Icon } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/IActivity';
import format from 'date-fns/esm/format';
import SimpleMap from '../../../app/common/maps/SimpleMap';

const ActivityDetailedInfo: React.FC<{ activity: IActivity }> = ({
  activity
}) => {
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={11}>
            <p>{activity.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {format(activity.date!, 'eeee do MMMM')} at{' '}
              {format(activity.date!, 'HH:mm')}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached>

        <Grid verticalAlign='middle'>
          <SimpleMap
            lat={activity.latitute}
            lng={activity.longitute}
            opt={{ style: { width: '100%', height: 300 } }}>
          </SimpleMap>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {activity.venue}, {activity.city}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default ActivityDetailedInfo;
