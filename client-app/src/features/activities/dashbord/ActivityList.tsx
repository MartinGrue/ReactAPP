import React, { useContext } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import ActivityStore from '../../../app/stores/ActivityStore';
import { observer } from 'mobx-react-lite';

const ActivityList: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const {
    activitiesByDate,
    selectActivity,
    target,
    submitting,
    deleteActivity
  } = activityStore;
  return (
    <Segment clearing>
      <Item.Group devided='true'>
        {activitiesByDate.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city},{activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated='right'
                  content='View'
                  color='blue'
                  onClick={() => selectActivity(activity.id)}
                ></Button>
                <Button
                  name={activity.id}
                  loading={target === activity.id && submitting}
                  floated='right'
                  content='Delete'
                  color='red'
                  onClick={e => deleteActivity(e, activity.id)}
                ></Button>
                <Label basic content={activity.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
