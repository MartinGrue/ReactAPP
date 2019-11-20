import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid, GridColumn } from 'semantic-ui-react';
import {
  IActivityFormValues,
  ActivityFormValues,
  IActivity
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

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { SimpleMap } from '../../../app/common/maps/SimpleMap';
import { ActivityFormPlacesAutocomplete } from './ActivityFormPlacesAutocomplete';

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
  // 52.372513, 9.732968
  const [loading, setloading] = useState(false);
  const [latlng, setLatlng] = useState();

  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');

  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        // cords.lat = latLng!.lat;
        // cords.lng = latLng!.lng;
        setLatlng(latLng);
        console.log('HookValues:', latLng);
        setaddress(address);
        activity.venue = address;
      })
      .catch(error => console.error('Error', error));
  };
  const handleSelectCity = (city: string) => {
    geocodeByAddress(city)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        // cords.lat = latLng!.lat;
        // cords.lng = latLng!.lng;
        setLatlng(latLng);
        console.log('HookValues:', latLng);
        setcity(city);
        console.log(city);
        activity.city = city;
        console.log(activity);
      })
      .catch(error => console.error('Error', error));
  };

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
            setcity(rootStore.activityStore.selectedActivity!.city);
            setaddress(rootStore.activityStore.selectedActivity!.venue);
            setLatlng({
              lat: rootStore.activityStore.selectedActivity!.latitute,
              lng: rootStore.activityStore.selectedActivity!.longitute
            });
          })
          .finally(() => {
            setloading(false);
          });
      } else {
        rootStore.activityStore.selectedActivity &&
          setActivity(
            new ActivityFormValues(rootStore.activityStore.selectedActivity)
          );
        setcity(rootStore.activityStore.selectedActivity!.city);
        setaddress(rootStore.activityStore.selectedActivity!.venue);
        setLatlng({
          lat: rootStore.activityStore.selectedActivity!.latitute,
          lng: rootStore.activityStore.selectedActivity!.longitute
        });
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
  }, [
    match.params.id,
    loadActivity,
    rootStore.activityStore.selectedActivity,
    setloadinginitial
  ]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (city) {
      activity.city = city;
    }
    if (address) {
      activity.venue = address;
    }

    if (latlng) {
      activity.longitute = latlng.lng;
      activity.latitute = latlng.lat;
    }

    if (rootStore.activityStore.selectedActivity && match.params.id) {
      //console.log('here');
      console.log('Edited Activity');
      console.log(activity);
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    } else {
      if (!activity.id) {
        console.log(activity);
        let newActivity: IActivity = {
          ...activity,
          id: uuid(),
          isHost: true,
          isGoing: true
        };
        console.log('newActivity');
        console.log(newActivity);
        createActivity(newActivity).then(() =>
          history.push(`/activities/${newActivity.id}`)
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
    <Segment>
      <Grid centered>
        <GridColumn mobile={16} tablet={14} computer={8} floated='left'>
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
                    name='city'
                    value={activity.city}
                    render={({ input, meta }) => (
                      <ActivityFormPlacesAutocomplete
                        key='city'
                        name='city'
                        placeholder='city'
                        validate={validate}
                        input={input}
                        meta={meta}
                        address={city}
                        setaddress={setcity}
                        handleSelect={handleSelectCity}
                        Options={{
                          types: ['(regions)']
                        }}
                      ></ActivityFormPlacesAutocomplete>
                    )}
                  ></Field>
                  <Field
                    name='venue'
                    value={activity.venue}
                    render={({ input, meta }) => (
                      <ActivityFormPlacesAutocomplete
                        key='venue'
                        name='venue'
                        placeholder='venue'
                        validate={validate}
                        input={input}
                        meta={meta}
                        address={address}
                        setaddress={setaddress}
                        handleSelect={handleSelect}
                        Options={{
                          types: ['address']
                        }}
                      ></ActivityFormPlacesAutocomplete>
                    )}
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
                        history.push(`/activities`);
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
        <GridColumn mobile={16} tablet={14} computer={8} floated='right'>
          {latlng ? (
            <SimpleMap
              lat={latlng.lat}
              lng={latlng.lng}
              opt={{ style: { width: '100%', height: 300 } }}
            ></SimpleMap>
          ) : (
            <SimpleMap
              opt={{ style: { width: '100%', height: 300 } }}
            ></SimpleMap>
          )}
        </GridColumn>
      </Grid>
    </Segment>
  );
};

export default observer(ActivityForm);
