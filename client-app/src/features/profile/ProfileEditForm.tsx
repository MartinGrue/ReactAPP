import React from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { Form, Header, Button, Segment } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
export const ProfileEditForm = () => {
  return (
    <Segment clearing>
      <FinalForm
        onSubmit={
          (values: IUserFormValues) => {}
          // login(values).catch(error => ({
          //   [FORM_ERROR]: error
          // }))
        }
        render={({
          handleSubmit
          // submitting,
          // submitError,
          // invalid,
          // pristine,
          // dirtySinceLastSubmit
        }) => (
          <Form onSubmit={handleSubmit} error>
            <Field
              name='userName'
              component={TextInput}
              placeholder='username'
            ></Field>
            <Field name='Bio' component={TextInput} placeholder='Bio'></Field>
            {/* {submitError && !dirtySinceLastSubmit && (
                // <Label color='red' basic content={submitError.statusText}></Label>
                <ErrorMessage
                  error={submitError}
                  text='Invalid email or password'
                ></ErrorMessage>
              )}
              {/* <br></br> */}
            {/* <Button
                disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                positive
                content='Login'
                loading={submitting}
                fluid
              ></Button> */}
            <Button positive content='Update Profile' floated='right'></Button>
            {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
          </Form>
        )}
      ></FinalForm>
    </Segment>
  );
};

export default ProfileEditForm;
