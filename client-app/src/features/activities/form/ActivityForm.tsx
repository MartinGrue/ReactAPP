import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, FormInput, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/IActivity';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/ActivityStore';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';

interface DetailsParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    cancelFormOpen,
    loadActivity,
    loadingInitial
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    city: '',
    venue: ''
  });

  useEffect(() => {
    if (match.params.id) {
      if(activityStore.selectedActivity === undefined){
        loadActivity(match.params.id).then(() => {
          console.log(activityStore.selectedActivity);
          activityStore.selectedActivity &&
            setActivity(activityStore.selectedActivity);
        });
      }
      activityStore.selectedActivity &&
      setActivity(activityStore.selectedActivity);
    } else {
      setActivity({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
      });
    }
  }, [match.params.id, loadActivity, activityStore.selectedActivity]);


  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //   setActivity({...activity, title: event.target.value})
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity).then( () => history.push(`/activities/${newActivity.id}`));
    } else {
      editActivity(activity).then( () => history.push(`/activities/${activity.id}`));
    }

    console.log(activity);
  };
  const handleCancel = () => {
    if(match.params.id){
      history.push(`/activities/${activity.id}`);
    }
    else{
      history.push('/');
    }
  }
  if (loadingInitial) {
    return <LoadingComponent content='Fetching Activity...'></LoadingComponent>;
  }
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <FormInput
          onChange={handleInputChange}
          name='title'
          placeholder='title'
          value={activity.title}
        ></FormInput>
        <Form.TextArea
          onChange={handleInputChange}
          name='description'
          rows={2}
          placeholder='description'
          value={activity.description}
        ></Form.TextArea>
        <FormInput
          onChange={handleInputChange}
          name='category'
          placeholder='category'
          value={activity.category}
        ></FormInput>
        <FormInput
          onChange={handleInputChange}
          name='date'
          type='datetime-local'
          placeholder='date'
          value={activity.date}
        ></FormInput>
        <FormInput
          onChange={handleInputChange}
          name='city'
          placeholder='city'
          value={activity.city}
        ></FormInput>
        <FormInput
          onChange={handleInputChange}
          name='venue'
          placeholder='venue'
          value={activity.venue}
        ></FormInput>
        <Button
          loading={submitting}
          floated='right'
          positive
          type='submit'
          content='submit'
        ></Button>
      </Form>
      <Button
          floated='right'
          content='Cancel'
          onClick={() =>{cancelFormOpen();
            handleCancel();
          }}
        ></Button>
    </Segment>
  );
};

export default observer(ActivityForm);
