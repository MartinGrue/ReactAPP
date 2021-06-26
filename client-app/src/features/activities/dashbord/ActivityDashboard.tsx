import { useContext, useEffect, useState } from "react";
import * as React from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
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
            loader={
              loadingnext && (
                <ActivityListItemPlaceholder></ActivityListItemPlaceholder>
              )
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
