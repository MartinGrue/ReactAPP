import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid, GridColumn } from 'semantic-ui-react';
import {
  IActivityFormValues,
  ActivityFormValues
} from '../../../app/models/IActivity';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';

import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';

interface DetailsParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    setloadinginitial,
    createActivity,
    editActivity,
    submitting,
    cancelFormOpen,
    loadActivity,
    deleteActivity
  } = rootStore.activityStore;

  const [activity, setActivity] = useState<IActivityFormValues>(
    new ActivityFormValues()
  );
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setloading(true);
      if (rootStore.activityStore.selectedActivity === undefined) {
        loadActivity(match.params.id)
          .then(() => {
            rootStore.activityStore.selectedActivity &&
              setActivity(
                new ActivityFormValues(rootStore.activityStore.selectedActivity)
              );
          })
          .finally(() => {
            setloading(false);
          });
      } else {
        rootStore.activityStore.selectedActivity &&
          setActivity(
            new ActivityFormValues(rootStore.activityStore.selectedActivity)
          );
        setloading(false);
      }
    } else {
      setActivity({
        id: '',
        title: '',
        description: '',
        category: '',
        date: undefined,
        venue: '',
        city: ''
      });
    }
    return () => {
      setloadinginitial();
    };
  }
, [match.params.id, loadActivity, rootStore.activityStore.selectedActivity]);

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
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (rootStore.activityStore.selectedActivity && match.params.id) {
      console.log('here');
      history.push(`/activities/`);
    } else {
      if (!activity.id) {
        let newActivity = { ...activity, id: uuid() };
        console.log(newActivity);
        createActivity(newActivity).then(() =>
          history.push(`/activities/${newActivity.id}`)
        );
      } else {
        editActivity(activity).then(() =>
          history.push(`/activities/${activity.id}`)
        );
      }
    }
  };
  const handleCancel = () => {
    if (match.params.id) {
      history.push(`/activities/${activity.id}`);
    } else {
      history.push('/');
    }
  };
  const validate = combineValidators({
    title: isRequired({ message: 'The title is required' }),
    category: isRequired('category'),
    description: composeValidators(
      isRequired('Description'),
      hasLengthGreaterThan(4)({
        message: 'Description needs to be at least 5 characters'
      })
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
  });

  return (
    <Grid>
      <GridColumn width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form loading={loading} onSubmit={handleSubmit}>
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
                <Form.Group widths='equal'>
                  <Field
                    component={DateInput}
                    date={true}
                    name='date'
                    placeholder='date'
                    value={activity.date}
                  ></Field>
                  <Field
                    component={DateInput}
                    time={true}
                    name='time'
                    placeholder='time'
                    value={activity.time}
                    // format(activity.date!,'hh:mm')}
                  ></Field>
                </Form.Group>

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
                  disabled={loading || invalid || pristine}
                  loading={submitting}
                  floated='right'
                  positive
                  type='submit'
                  content='submit'
                ></Button>
                {match.params.id && (
                  <Button
                    disabled={loading}
                    loading={submitting}
                    floated='right'
                    negative
                    content='Delete'
                    onClick={() => {
                      deleteActivity(
                        rootStore.activityStore.selectedActivity!.id
                      );
                    }}
                  ></Button>
                )}
                <Button
                  disabled={loading}
                  floated='right'
                  content='Cancel'
                  onClick={() => {
                    cancelFormOpen();
                    handleCancel();
                  }}
                ></Button>
              </Form>
            )}
          />
        </Segment>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityForm);
