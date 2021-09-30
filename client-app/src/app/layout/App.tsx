import { Fragment, useContext, useEffect } from "react";
import Nav from "../../features/nav/Nav";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import homepage from "../../features/home/homepage";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/modalContainer";
import Routes from "./Routes";

const App = () => {
  const rootStore = useContext(RootStoreContext);
  const { setApploaded, token, appLoaded, mobilePusherOpen } =
    rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().then(() => {
        setApploaded();
      });
    } else {
      setApploaded();
    }
  }, [getUser, setApploaded, token]);

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
      <Route exact path="/" component={homepage}></Route>
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <Nav></Nav>
            <Routes />
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default observer(App);
