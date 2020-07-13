import React, { useEffect, useContext } from 'react';
import ProfileHeader from './ProfileHeader';
import { ProfileContent } from './ProfileContent';
import { Grid, GridColumn } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';

interface ProfileParams {
  userName: string;
}

const ProfilePage: React.FC<RouteComponentProps<ProfileParams>> = ({
  match
}) => {
  const rootStore = useContext(RootStoreContext);
  const { getProfile, profile, loadingProfile } = rootStore.profileStore;
  const { setActiveTab } = rootStore.followersStore;

  useEffect(() => {
    window.scrollTo(0, 0);
      getProfile(match.params.userName);

  }, [getProfile, match]);

  if (loadingProfile) {
    return <LoadingComponent content='Loading Component'></LoadingComponent>;
  }

  return (
    <Grid>
      <GridColumn width={16} floated='left'>
        <ProfileHeader profile={profile!}></ProfileHeader>
        <ProfileContent setActiveTab={setActiveTab}></ProfileContent>
      </GridColumn>
    </Grid>
  );
};
export default observer(ProfilePage);
