import * as React from "react";
import { Navigate, Route, Routes as ReactRoutes } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashbord/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import Nav from "../../features/nav/Nav";
import { Container } from "semantic-ui-react";
import { useContext } from "react";
import { RootStoreContext } from "../stores/rootStore";
import { observer } from "mobx-react-lite";
import HomePage from "../../features/home/homepage";
import ProfilePage from "../../features/profile/ProfilePage";
import NotFound from "./NotFound";

const WithNav: React.FC = ({ children }) => {
  document.body.classList.add("show-scroll");
  return (
    <React.Fragment>
      <Nav></Nav>
      <Container style={{ marginTop: "6rem" }}>{children}</Container>
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
      <Route path="*" element={<NotFound />}>
      </Route>
    </ReactRoutes>
  );
};

export default observer(Routes);
