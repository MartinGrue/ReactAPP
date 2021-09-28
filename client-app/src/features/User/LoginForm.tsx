import { useContext } from "react";
import * as React from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header, Divider } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password"),
});

const LoginForm: React.FC = () => {
  const withInitValues: boolean = true;
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;

  // const fieldstyle = {
  //   backgroundColor: "rgb(32, 167, 172)",
  // };
  return (
    <FinalForm
      initialValues={
        withInitValues
          ? { email: "bob@test.com", password: "Pa$$w0rd" }
          : { email: "", password: "" }
      }
      onSubmit={(values: IUserFormValues) =>
        login(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Login to Reactivities"
            color="teal"
            textAlign="center"
          ></Header>
          <Divider></Divider>
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
            <ErrorMessage
              error={submitError}
              text="Invalid email or password"
            ></ErrorMessage>
          )}
          {/* <br></br> */}
          <Button
            // prettier-ignore
            disabled={
                (invalid && withInitValues
                ? !dirtySinceLastSubmit 
                : dirtySinceLastSubmit)
            }
            positive
            content="Login"
            loading={submitting}
            fluid
            data-cy="login-submit"
          ></Button>
          {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
        </Form>
      )}
    ></FinalForm>
  );
};

export default LoginForm;
