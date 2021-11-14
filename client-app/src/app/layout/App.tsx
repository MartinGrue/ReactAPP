import React, { Fragment, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import { RootStore, RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/modalContainer";
import Routes from "./Routes";

const Layout = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { setApploaded, isLogedIn, appLoaded, mobilePusherOpen } =
    rootStore.commonStore;
  const { getUser } = rootStore.userStore;

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
      <Routes></Routes>
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
