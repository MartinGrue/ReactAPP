import React, { useState, FormEvent, useContext, useEffect } from 'react';
import {
  Segment,
  Form,
  FormInput,
  Button,
  Grid,
  GridColumn
} from 'semantic-ui-react';
import { IActivity } from '../../../app/models/IActivity';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../app/stores/ActivityStore';
import { RouteComponentProps } from 'react-router';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';

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
      if (activityStore.selectedActivity === undefined) {
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
        venue: '', 
        city: '',
      });
    }
  }, [match.params.id, loadActivity, activityStore.selectedActivity]);

  // const handleSubmit = () => {
  //   if (activity.id.length === 0) {
  //     let newActivity = { ...activity, id: uuid() };
  //     createActivity(newActivity).then(() =>
  //       history.push(`/activities/${newActivity.id}`)
  //     );
  //   } else {
  //     editActivity(activity).then(() =>
  //       history.push(`/activities/${activity.id}`)
  //     );
  //   }

  //   console.log(activity);
  // };
  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
  };
  const handleCancel = () => {
    if (match.params.id) {
      history.push(`/activities/${activity.id}`);
    } else {
      history.push('/');
    }
  };
  if (loadingInitial) {
    return <LoadingComponent content='Fetching Activity...'></LoadingComponent>;
  }
  return (
    <Grid>
      <GridColumn width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name='title'
                  placeholder='title'
                  value={activity.title}
                  component={TextInput}
                ></Field>
                <Field
                  component={TextAreaInput}
                  name='description'
                  rows={2}
                  placeholder='description'
                  value={activity.description}
                ></Field>
                <Field
                  component={SelectInput}
                  options={category}
                  name='category'
                  placeholder='category'
                  value={activity.category}
                ></Field>
                <Field
                  component={TextInput}
                  name='date'
                  placeholder='date'
                  value={activity.date}
                ></Field>
                <Field
                  component={TextInput}
                  name='city'
                  placeholder='city'
                  value={activity.city}
                ></Field>
                <Field
                  component={TextInput}
                  name='venue'
                  placeholder='venue'
                  value={activity.venue}
                ></Field>
                <Button
                  loading={submitting}
                  floated='right'
                  positive
                  type='submit'
                  content='submit'
                ></Button>
              </Form>
            )}
          />
          <Button
            floated='right'
            content='Cancel'
            onClick={() => {
              cancelFormOpen();
              handleCancel();
            }}
          ></Button>
        </Segment>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityForm);
