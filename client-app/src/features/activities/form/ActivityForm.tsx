import { useState, useContext, useEffect } from "react";
import * as React from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import {
  IActivityFormValues,
  ActivityFormValues,
  IActivity,
} from "../../../app/models/IActivity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";

import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
} from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";

import { SimpleMap } from "../../../app/common/maps/SimpleMap";
import { ActivityFormPlacesAutocomplete } from "./ActivityFormPlacesAutocomplete";
import TimeInput from "../../../app/common/form/TimeInput";

interface DetailsParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailsParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createActivity,
    editActivity,
    submitting,
    cancelFormOpen,
    loadActivity,
    deleteActivity,
    selectedActivity,
  } = rootStore.activityStore;

  const [activity, setActivity] = useState<IActivityFormValues>(
    new ActivityFormValues()
  );

  const [loading, setloading] = useState(false);
  const [latlng, setLatlng] = useState<google.maps.LatLngLiteral>({
    lat: 52.3758916,
    lng: 9.732010400000002,
  });
  const [done, setdone] = useState(false);
  useEffect(() => {
    if (match.params.id) {
      setloading(true);
      loadActivity(match.params.id)
        .then((activity) => {
          setActivity(new ActivityFormValues(activity));
          setLatlng({
            lat: activity!.latitute,
            lng: activity!.longitute,
          });
        })
        .finally(() => setloading(false));
    } else {
      setActivity(new ActivityFormValues(undefined));
    }
  }, []);

  const handleFinalFormSubmit = (values: IActivityFormValues) => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    if (latlng) {
      values.longitute = latlng.lng;
      values.latitute = latlng.lat;
    }

    if (match.params.id) {
      const editedActivity: IActivity = {
        ...selectedActivity!,
        ...values,
        date: dateAndTime,
      };
      editActivity(editedActivity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    } else {
      const newActivity: IActivity = {
        ...selectedActivity!,
        ...values,
        id: uuid(),
        isHost: true,
        isGoing: true,
        date: dateAndTime,
      };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    }
  };
  useEffect(() => {
    if (done) {
      if (match.params.id) {
        history.push(`/activities/${activity.id}`);
      } else {
        history.push("/");
      }
    }

    return () => {}
  }, [match.params.id, done]);
  const handleCancel = () => {
    setdone(true);
  };
  const validate = combineValidators({
    title: isRequired({ message: "The title is required" }),
    category: isRequired("category"),
    description: composeValidators(
      isRequired("Description"),
      hasLengthGreaterThan(4)({
        message: "Description needs to be at least 5 characters",
      })
    )(),
    city: isRequired("City"),
    venue: isRequired("Venue"),
    date: isRequired("Date"),
    time: isRequired("Time"),
  });
  return (
    <Segment>
      <Grid stackable>
        <Grid.Column width={8}>
          <Segment clearing>
            <FinalForm
              validate={validate}
              initialValues={activity}
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form loading={loading} onSubmit={handleSubmit}>
                  <Field
                    name="title"
                    placeholder="title"
                    value={activity.title}
                    component={TextInput}
                  ></Field>
                  <Field
                    component={TextAreaInput}
                    name="description"
                    rows={2}
                    placeholder="description"
                    value={activity.description}
                  ></Field>
                  <Field
                    component={SelectInput}
                    options={category}
                    name="category"
                    placeholder="category"
                    value={activity.category}
                  ></Field>
                  <Form.Group widths="equal">
                    <Field
                      component={DateInput}
                      date={true}
                      name="date"
                      placeholder="date"
                      value={activity.date}
                    ></Field>
                    <Field
                      component={TimeInput}
                      time={true}
                      name="time"
                      placeholder="time"
                      value={activity.time}
                      // format(activity.date!,'hh:mm')}
                    ></Field>
                  </Form.Group>
                  <Field
                    name="city"
                    key="city"
                    render={({ input, meta }) => (
                      <ActivityFormPlacesAutocomplete
                        {...{ input, meta, setLatlng }}
                        placeholder="city"
                        Options={{
                          types: ["(regions)"],
                        }}
                      ></ActivityFormPlacesAutocomplete>
                    )}
                  ></Field>
                  <Field
                    key="venue"
                    name="venue"
                    render={({ input, meta }) => (
                      <ActivityFormPlacesAutocomplete
                        {...{ input, meta, setLatlng }}
                        placeholder={"venue"}
                        Options={{
                          types: ["address"],
                        }}
                      ></ActivityFormPlacesAutocomplete>
                    )}
                  ></Field>
                  <Button
                    data-cy="submit"
                    disabled={loading || invalid || pristine}
                    loading={submitting}
                    floated="right"
                    positive
                    type="submit"
                    content="submit"
                  ></Button>
                  {match.params.id && (
                    <Button
                      disabled={loading}
                      loading={submitting}
                      floated="right"
                      negative
                      content="Delete"
                      onClick={() => {
                        history.push(`/activities`);
                        deleteActivity(selectedActivity!.id);
                      }}
                    ></Button>
                  )}
                  <Button
                    data-cy="cancel"
                    disabled={loading}
                    floated="right"
                    content="Cancel"
                    onClick={() => {
                      // cancelFormOpen();
                      handleCancel();
                    }}
                  ></Button>
                </Form>
              )}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column width={8}>
          <SimpleMap
            lat={latlng.lat}
            lng={latlng.lng}
            opt={{ style: { width: "100%", height: 400 } }}
          ></SimpleMap>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ActivityForm);
