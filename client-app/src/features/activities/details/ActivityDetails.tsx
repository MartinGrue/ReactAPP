import { useContext, useEffect } from "react";
import * as React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSideBar from "./ActivityDetailedSideBar";
import NotFound from "../../../app/layout/NotFound";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ActivityDetails: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { selectedActivity, loadActivity, loadingInitial } =
    rootStore.activityStore;

  const { id } = useParams();
  useEffect(() => {
    loadActivity(id!);
    window.scrollTo(0, 0);
  }, [id, loadActivity]);

  if (loadingInitial || !selectedActivity) {
    return <LoadingComponent content="Fetching Activity..."></LoadingComponent>;
  }
  if (!selectedActivity) {
    return <NotFound></NotFound>;
  }
  return (
    <Grid>
      <GridColumn mobile={16} tablet={14} computer={8} floated="left">
        <ActivityDetailedHeader
          activity={selectedActivity}
        ></ActivityDetailedHeader>
        <ActivityDetailedInfo
          activity={selectedActivity}
        ></ActivityDetailedInfo>
        <ActivityDetailedChat></ActivityDetailedChat>
      </GridColumn>
      <GridColumn mobile={16} tablet={14} computer={8} floated="left">
        <ActivityDetailedSideBar
          attendees={selectedActivity.userActivities}
        ></ActivityDetailedSideBar>
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDetails);
