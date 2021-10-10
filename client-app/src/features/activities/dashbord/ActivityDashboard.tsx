import { useContext, useEffect, useState } from "react";
import React, { Fragment } from "react";
import { Divider, Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ActivityFilters from "./ActivityFilters";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";
import InfiniteScroll from "react-infinite-scroll-component";
import { RouteComponentProps } from "react-router-dom";

const ActivityDashboard: React.FC<RouteComponentProps> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);

  const {
    loadActivities,
    loadingInitial,
    setPage,
    page,
    totalPages,
    activitiesByDate,
    setPredicate,
  } = rootStore.activityStore;

  const [loadingnext, setLoadingnext] = useState(false);

  const handleGetNext = () => {
    setLoadingnext(true);
    setPage(page + 1);
    loadActivities().then(() => setLoadingnext(false));
  };

  useEffect(() => {
    setPredicate("all", "true");
  }, [match.path]);


  return (
    <Grid stackable>
      <Grid.Column width={4}>
        <ActivityFilters></ActivityFilters>
      </Grid.Column>
      <Grid.Column width={12}>
        {loadingInitial && page === 0 ? (
          <ActivityListItemPlaceholder></ActivityListItemPlaceholder>
        ) : (
          <InfiniteScroll
            dataLength={activitiesByDate.length}
            next={handleGetNext}
            hasMore={!loadingnext && page + 1 < totalPages}
            loader={
              loadingnext && (
                <ActivityListItemPlaceholder></ActivityListItemPlaceholder>
              )
            }
            endMessage={
              <Fragment>
                <Divider></Divider>
                <div style={{ textAlign: "center" }}>This is the End</div>
              </Fragment>
            }
          >
            <ActivityList></ActivityList>
          </InfiniteScroll>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
