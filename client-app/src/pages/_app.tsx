import { AppProps } from "next/app";
import React, { useEffect } from "react";
import { Router as ReactRouter } from "react-router-dom";
import { createBrowserHistory, BrowserHistory } from "history";

import "../app/layout/styles.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-widgets/styles.css";
import "semantic-ui-css/semantic.min.css";
import LoadingComponent from "../app/layout/LoadingComponent";

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
  
  // preloader
  useEffect(() => {
    const preloader = document.querySelector(".site-preloader");

    if (!preloader) {
      return;
    }

    setTimeout(() => {
      const onTransitionEnd = (event: Event) => {
        if (
          event instanceof TransitionEvent &&
          event.propertyName === "opacity" &&
          preloader.parentNode
        ) {
          preloader.parentNode.removeChild(preloader);
        }
      };

      preloader.addEventListener("transitionend", onTransitionEnd);
      preloader.classList.add("site-preloader__fade");

      if (getComputedStyle(preloader).opacity === "0" && preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 100);
  }, []);

  if (typeof window !== "undefined") {
    return (
      <SafeHydrate>
        <Router>
          <Component {...pageProps} />
        </Router>
      </SafeHydrate>
    );
  }
  return <div></div>;
};

export default MyApp;
