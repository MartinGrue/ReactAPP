import { AppProps } from "next/app";
import React from "react";
import { Router as ReactRouter } from "react-router-dom";
import { createBrowserHistory, BrowserHistory } from "history";

import "../app/layout/styles.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-widgets/styles.css";

export let history = {} as BrowserHistory;
if (typeof window !== "undefined") {
  history = createBrowserHistory();
}

const SafeHydrate: React.FC = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};

const Router: React.FC = ({ children }) => {
  let [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });
  React.useLayoutEffect(() => history.listen(setState), [history]);
  return (
    <ReactRouter
      location={history.location}
      navigator={history}
      navigationType={history.action}
    >
      {children}
    </ReactRouter>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  if (typeof window !== "undefined") {
    return (
      <SafeHydrate>
        <Router>
          <Component {...pageProps} />
        </Router>
      </SafeHydrate>
    );
  }
  return <div>HI from next!</div>;
};
export default MyApp;
