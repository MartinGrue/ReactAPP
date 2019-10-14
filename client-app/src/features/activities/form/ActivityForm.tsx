import React, { useState, FormEvent, useContext } from 'react';
import { Segment, Form, FormInput, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/IActivity';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/ActivityStore';


interface IProps {
  activity: IActivity;
}
const ActivityForm: React.FC<IProps>= ({activity: initFormState}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    cancelFormOpen
  } = activityStore;
  const initForm = () => {
    if (initFormState != null) {
      return initFormState;
    } else {
      return {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
      };
    }
  };
  const [activity, setActivity] = useState<IActivity>(initForm);
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
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }

    console.log(activity);
  };
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
        <Button
          loading={submitting}
          floated='right'
          type='submit'
          content='Cancel'
          onClick={() => cancelFormOpen()}
        ></Button>
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
