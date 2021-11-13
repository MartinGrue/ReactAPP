import App from "../app/layout/App";
import {
  BrowserRouter,
  Router,
  useNavigate,
  Navigator,
} from "react-router-dom";
import { history } from "../index";
import "semantic-ui-css/semantic.min.css";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("../app/layout/App"), {
  ssr: false,
});
const NextApp = () => {
  if (typeof window !== "undefined") {
    return <DynamicComponentWithNoSSR />;
  }
  return <div>HI from next!</div>;
};

export default NextApp;
