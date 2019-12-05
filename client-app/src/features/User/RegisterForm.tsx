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
  username: isRequired('username'),
  displayname: isRequired('displayname'),
  email: isRequired('email'),
  password: isRequired('password')
});

const RegisterForm: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch(error => ({
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
        <Form onSubmit={handleSubmit} error>
          <Header
            as='h2'
            content='Sign up to Social Groups'
            color='teal'
            textAlign='center'
          ></Header>
          <Field
            name='username'
            component={TextInput}
            placeholder='Username'
          ></Field>
          <Field
            name='displayname'
            component={TextInput}
            placeholder='Displayname'
          ></Field>
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
            ></ErrorMessage>
          )}
          {/* <br></br> */}
          <Button
            disabled={ pristine}
            positive
            content='Register'
            loading={submitting}
            fluid
          ></Button>
          {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
        </Form>
      )}
    ></FinalForm>
  );
};

export default RegisterForm;
