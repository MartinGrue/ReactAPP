import * as React from "react";
import { Navigate, Route, Routes as ReactRoutes } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { useContext } from "react";
import { RootStoreContext } from "../stores/rootStore";
import { observer } from "mobx-react-lite";
import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("../../features/home/homepage"), {
  ssr: false,
});

const ProfilePage = dynamic(
  () => import("../../features/profile/ProfilePage"),
  {
    ssr: false,
  }
);
const Nav = dynamic(() => import("../../features/nav/Nav"), {
  ssr: false,
});

const NotFound = dynamic(() => import("./NotFound"), {
  ssr: false,
});

const ActivityDashboard = dynamic(
  () => import("../../features/activities/dashbord/ActivityDashboard"),
  {
    ssr: false,
  }
);

const ActivityDetails = dynamic(
  () => import("../../features/activities/details/ActivityDetails"),
  {
    ssr: false,
  }
);

const ActivityForm = dynamic(
  () => import("../../features/activities/form/ActivityForm"),
  {
    ssr: false,
  }
);

const WithNav: React.FC = ({ children }) => {
  document.body.classList.add("show-scroll");
  return (
    <React.Fragment>
      <Nav>
        <Container style={{ marginTop: "6rem" }}>{children}</Container>
      </Nav>
    </React.Fragment>
  );
};

const RequireAuth: React.FC = ({ children }) => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn } = rootStore.userStore;

  return isLoggedIn ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <Navigate to="/" />
  );
};

const Routes: React.FC = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<HomePage />}></Route>
      <Route
        path="/activities"
        element={
          <RequireAuth>
            <WithNav>
              <ActivityDashboard />
            </WithNav>
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/createActivity"
        element={
          <RequireAuth>
            <WithNav>
              <ActivityForm />
            </WithNav>
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/manage/:id"
        element={
          <RequireAuth>
            <WithNav>
              <ActivityForm />
            </WithNav>
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/activities/:id"
        element={
          <RequireAuth>
            <WithNav>
              <ActivityDetails />
            </WithNav>
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/profiles/:userName"
        element={
          <RequireAuth>
            <WithNav>
              <ProfilePage />
            </WithNav>
          </RequireAuth>
        }
      ></Route>
      <Route path="*" element={<NotFound />}></Route>
    </ReactRoutes>
  );
};

export default observer(Routes);
