import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Label } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import { RouteComponentProps } from 'react-router-dom';

const validate = combineValidators({
  email: isRequired('email'),
  password: isRequired('password')
});

interface DetailsParams {}

const LoginForm: React.FC<RouteComponentProps<DetailsParams>> = ({
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values)
          .then(() => {
            history.push(`/activities`);
          })
          .catch(error => ({
            [FORM_ERROR]: error
          }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        form,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit}>
          <Field name='email' component={TextInput} placeholder='email'></Field>
          <Field
            name='password'
            component={TextInput}
            placeholder='Passord'
            type='password'
          ></Field>
          {submitError && !dirtySinceLastSubmit && (
            <Label color='red' basic content={submitError.statusText}></Label>
          )}
          <br></br>
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            positive
            content='Login'
            loading={submitting}
          ></Button>
          <pre>{JSON.stringify(form.getState(), null, 2)}</pre>
        </Form>
      )}
    ></FinalForm>
  );
};

export default LoginForm;
