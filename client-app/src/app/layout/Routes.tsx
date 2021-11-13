import * as React from "react";
import { RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashbord/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import dynamic from "next/dynamic";
import Nav from "../../features/nav/Nav";
import { Container } from "semantic-ui-react";

const HomePage = dynamic(() => import("../../features/home/homepage"), {
  ssr: false,
});

const ProfilePage = dynamic(
  () => import("../../features/profile/ProfilePage"),
  {
    ssr: false,
  }
);
const withNav = (ele: JSX.Element) => {
  return (
    <React.Fragment>
      <Nav></Nav>
      <Container style={{ marginTop: "6rem" }}>{ele}</Container>
    </React.Fragment>
  );
};
const Routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/activities",
    element: withNav(<ActivityDashboard />),
  },
  {
    path: "/createActivity",
    element: withNav(<ActivityForm />),
  },
  {
    path: "/manage/:id",
    element: withNav(<ActivityForm />),
  },
  {
    path: "/activities/:id",
    element: withNav(<ActivityDetails />),
  },
  {
    path: "/profiles/:userName",
    element: withNav(<ProfilePage />),
  },
];

export default Routes;
