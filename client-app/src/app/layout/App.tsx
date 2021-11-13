import React, { Fragment, useContext, useEffect } from "react";
import Nav from "../../features/nav/Nav";
import { observer } from "mobx-react-lite";
import {
  Route,
  RouteObject,
  Routes as RouterRoutes,
  useRoutes,
} from "react-router-dom";
import HomePage from "../../features/home/homepage";
import { ToastContainer } from "react-toastify";
import { RootStore, RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/modalContainer";
import Routes from "./Routes";
import ActivityDashboard from "../../features/activities/dashbord/ActivityDashboard";
// import ActivityDashboard from "../../features/activities/dashbord/ActivityDashboard";

const Layout = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { setApploaded, isLogedIn, appLoaded, mobilePusherOpen } =
    rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  const routes = useRoutes(Routes);

  useEffect(() => {
    if (isLogedIn) {
      getUser().then(() => {
        setApploaded();
      });
    } else {
      setApploaded();
    }
  }, [isLogedIn, setApploaded, getUser]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", mobilePusherOpen);
    return () => {};
  }, [mobilePusherOpen]);

  if (!appLoaded) {
    return <LoadingComponent content="Loading app"></LoadingComponent>;
  }
  return (
    <Fragment>
      <ModalContainer></ModalContainer>
      <ToastContainer position="bottom-right"></ToastContainer>
      {routes}
    </Fragment>
  );
});
const App = () => {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <Layout></Layout>
    </RootStoreContext.Provider>
  );
};
export default observer(App);
