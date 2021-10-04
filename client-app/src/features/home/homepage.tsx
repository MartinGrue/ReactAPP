import { useContext, Fragment, useState } from "react";
import * as React from "react";
import {
  Container,
  Segment,
  Header,
  Button,
  Image,
  Divider,
  Transition,
  Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../User/LoginForm";
import RegisterForm from "../User/RegisterForm";
import { GoogleLogin } from "react-google-login";
import { IExternalLoginInfo } from "../../app/models/user";

const HomePage: React.FC = () => {
  const token = window.localStorage.getItem("jwt");
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user, loginExternal } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  const { setGoogleToken } = rootStore.commonStore;

  const [visible, setvisible] = useState(false);
  const containerStyle = {
    padding: "5%",
    justifyContent: "center",
    alignItems: "center",
  };

  const onSuccess = (response: any) => {
    setGoogleToken(response.Zi.id_token);
    const info: IExternalLoginInfo = {
      provider: "google",
      token: response.Zi.id_token,
    };
    loginExternal(info);
  };
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text style={containerStyle}>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {isLoggedIn && user && token ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back ${user.displayName}`}
            />
            <Button
              data-cy="gotoactivities"
              as={Link}
              to="/activities"
              size="huge"
              inverted
            >
              Go to Activities!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content="Welcome to Reactivities" />
            <Button
              data-cy="login"
              onClick={() => openModal(<LoginForm />)}
              size="huge"
              inverted
            >
              Login!
            </Button>
            <Button
              data-cy="register"
              onClick={() => openModal(<RegisterForm />)}
              size="huge"
              inverted
            >
              Register!
            </Button>
          </Fragment>
        )}
        <Divider hidden />
        {!isLoggedIn && (
          <GoogleLogin
            clientId="1084577743891-l4thqbo5qkbr1lo3mmple5vu0od5oktn.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={() => {}}
            prompt="select_account"
            render={(renderProps: any) => (
              <Button
                onClick={renderProps.onClick}
                type="button"
                color="google plus"
              >
                <Icon name="google" />
                Login with Google
              </Button>
            )}
          ></GoogleLogin>
        )}

        <Divider hidden />
        <div>
          <Button
            size="huge"
            inverted
            content={visible ? "Hide Dev Info" : "Show Dev Info"}
            onClick={() => setvisible(!visible)}
          />
          <Divider hidden />
          {visible && (
            <Transition animation="scale" duration={500}>
              <div>
                <strong>This is a demo single page application</strong>
                <br></br>
                <strong>
                  Please login with email:bob@test.com Password: Pa$$w0rd
                </strong>
                <br></br>
                <strong>Or feel free to register a new Account</strong>
                <br></br>
                <strong>
                  You can login with any other user, the password is always :
                  Pa$$w0rd
                </strong>
              </div>
            </Transition>
          )}
        </div>
      </Container>
    </Segment>
  );
};

export default HomePage;
