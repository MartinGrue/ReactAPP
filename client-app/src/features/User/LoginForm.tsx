import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../../app/common/form/ErrorMessage';

const validate = combineValidators({
  email: isRequired('email'),
  password: isRequired('password')
});

const LoginForm: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as='h2'
            content='Login to Reactivities'
            color='teal'
            textAlign='center'
          ></Header>
          <Field name='email' component={TextInput} placeholder='email'></Field>
          <Field
            name='password'
            component={TextInput}
            placeholder='Passord'
            type='password'
          ></Field>
          {submitError && !dirtySinceLastSubmit && (
            // <Label color='red' basic content={submitError.statusText}></Label>
            <ErrorMessage
              error={submitError}
              text='Invalid email or password'
            ></ErrorMessage>
          )}
          {/* <br></br> */}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            positive
            content='Login'
            loading={submitting}
            fluid
          ></Button>
          {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
        </Form>
      )}
    ></FinalForm>
  );
};

export default LoginForm;
