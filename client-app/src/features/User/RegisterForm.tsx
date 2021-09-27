import { useContext } from "react";
import * as React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";
import { FORM_ERROR } from "final-form";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthBetween,
  createValidator,
} from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";

const isValidEmail = createValidator(
  (message) => (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  },
  "Invalid email address"
);

const isValidPassword = createValidator(
  (message) => (value) => {
    if (
      value &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&{}[)'""\\["`~,;:.<>]+$/.test(
        value
      )
    ) {
      return message;
    }
  },
  "Password must contain at least one uppercase letter, one lowercase letter and one number"
);

const validate = combineValidators({
  username: composeValidators(
    isRequired({ message: "Name is required" }),
    hasLengthBetween(
      3,
      10
    )({ message: "Length must be between 3 and 10 character" })
  )(),

  displayname: composeValidators(
    isRequired({ message: "Displayname is required" }),
    hasLengthBetween(
      3,
      10
    )({ message: "displayname must be between 3 and 10 character" })
  )(),
  email: composeValidators(isRequired("email is required"), isValidEmail)(),
  password: composeValidators(
    isRequired("password"),
    hasLengthBetween(
      3,20
    )({ message: "Password must be between 3 and 20 character" }),
    isValidPassword
  )(),
});

const RegisterForm: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch((error) => ({
          [FORM_ERROR]: error,
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
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Sign up to Reactivities"
            color="teal"
            textAlign="center"
          ></Header>
          <Field
            name="username"
            placeholder="Username"
            render={(props) => {
              return (
                <TextInput
                  {...props}
                  style={{ borderColor: "#2185d0" }}
                ></TextInput>
              );
            }}
          ></Field>
          <Field
            name="displayname"
            placeholder="Displayname"
            render={(props) => {
              return (
                <TextInput
                  {...props}
                  style={{ borderColor: "#2185d0" }}
                ></TextInput>
              );
            }}
          ></Field>
          <Field
            name="email"
            placeholder="email"
            render={(props) => {
              return (
                <TextInput
                  {...props}
                  style={{ borderColor: "#2185d0" }}
                ></TextInput>
              );
            }}
          ></Field>
          <Field
            name="password"
            placeholder="Passord"
            type="password"
            render={(props) => {
              return (
                <TextInput
                  {...props}
                  style={{ borderColor: "#2185d0" }}
                ></TextInput>
              );
            }}
          ></Field>
          {submitError && !dirtySinceLastSubmit && (
            // <Label color='red' basic content={submitError.statusText}></Label>
            <ErrorMessage error={submitError}></ErrorMessage>
          )}
          {/* <br></br> */}
          <Button
            disabled={pristine}
            positive
            content="Register"
            loading={submitting}
            fluid
            data-cy="register-submit"
          ></Button>
          {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
        </Form>
      )}
    ></FinalForm>
  );
};

export default RegisterForm;
