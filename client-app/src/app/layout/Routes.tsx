import { PropsWithChildren, Fragment } from "react";
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
const Nav = dynamic<PropsWithChildren>(() => import("../../features/nav/Nav"), {
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

const WithNav: React.FC<PropsWithChildren> = ({ children }) => {
  document.body.classList.add("show-scroll");
  return (
    <Fragment>
      <Nav>
        <Container style={{ marginTop: "6rem" }}>{children}</Container>
      </Nav>
    </Fragment>
  );
};

const RequireAuth: React.FC<PropsWithChildren>= ({ children }) => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn } = rootStore.userStore;

  return isLoggedIn ? (
    <Fragment>{children}</Fragment>
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
