import { useContext, useEffect, useState } from "react";
import * as React from "react";
import { Grid, Loader } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
// import InfiniteScroll from "react-infinite-scroller";
import ActivityFilters from "./ActivityFilters";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";
import InfiniteScroll from "react-infinite-scroll-component";
const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadActivities, loadingInitial, setPage, page, totalPages } =
    rootStore.activityStore;
  const [loadingnext, setLoadingnext] = useState(false);

  const handleGetNext = () => {
    setLoadingnext(true);
    setPage(page + 1);
    loadActivities().then(() => setLoadingnext(false));
    console.log("loadingnext: ", loadingnext);
  };
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);
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
            dataLength={0}
            next={handleGetNext}
            hasMore={!loadingnext && page + 1 < totalPages}
            loader={loadingnext && <h4>Loading...</h4>}
          >
            <ActivityList></ActivityList>
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width={16}>
        <Loader active={loadingnext}></Loader>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
