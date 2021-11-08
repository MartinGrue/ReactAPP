import App from "../app/layout/App";
import { Router } from "react-router-dom";
import { history } from "../index";
import "semantic-ui-css/semantic.min.css";
import { Container, Message, Icon } from "semantic-ui-react";
const NextApp = () => {
  if (typeof window !== "undefined") {
    return (
      <Router history={history as any}>
        <App />
      </Router>
    );
  }
  return <div>HI from next!</div>;
};

export default NextApp;
