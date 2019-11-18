import React, { useContext, useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityFilters from './ActivityFilters';

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const {
    loadActivities,
    loadingInitial,
    setPage,
    page,
    totalPages
  } = rootStore.activityStore;
  const [loadingnext, setLoadingnext] = useState(false);

  const handleGetNext = () => {
    setLoadingnext(true);
    setPage(page + 1);
    loadActivities().then(() => setLoadingnext(false));
  };
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);
  if (loadingInitial && page === 0) {
    return <LoadingComponent content='Fetching Activity...'></LoadingComponent>;
  }
  return (
    <Grid stackable>
      <Grid.Column width={6}>
        <ActivityFilters></ActivityFilters>
      </Grid.Column>
      <Grid.Column width={10}>
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={!loadingnext && page + 1 < totalPages}
          initialLoad={false}
        >
          <ActivityList></ActivityList>
        </InfiniteScroll>
      </Grid.Column>

      <Grid.Column width={16}>
        <Loader active={loadingnext}></Loader>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
