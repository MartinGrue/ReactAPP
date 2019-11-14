import React, { useContext, useState } from 'react';
import {
  Tab,
  Header,
  Card,
  Image,
  Button,
  Grid,
  GridColumn
} from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { PhotoUploader } from '../../app/common/photoUploader/PhotoUploader';
import { observer } from 'mobx-react-lite';
import { id } from 'date-fns/esm/locale';

const ProfilePhotos = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isLoggedIn,
    deleteImage,
    loadingDeletePhoto,
    loadingPhoto,
    loadingSetMain,
    setMainPhoto
  } = rootStore.profileStore;

  const [addPhotoToggle, setaddPhotoToggle] = useState(false);
  const [target, settarget] = useState<string | undefined>(undefined);

  let className = 'isNotMainButton';
  return (
    <Tab.Pane>
      <Grid>
        <GridColumn width={16}>
          <Header floated='left' icon='image' content='Photos'></Header>
          {isLoggedIn && (
            <Button
              floated='right'
              basic
              content={addPhotoToggle ? 'Cancel' : 'AddPhoto'}
              color={addPhotoToggle ? 'red' : 'green'}
              onClick={() => setaddPhotoToggle(!addPhotoToggle)}
            ></Button>
          )}
        </GridColumn>
      </Grid>
      <GridColumn width={16}>
        {addPhotoToggle ? (
          <PhotoUploader loading={loadingPhoto}></PhotoUploader>
        ) : (
          <Card.Group itemsPerRow={5} stackable doubling>
            {profile &&
              profile.photos.map(photo => (
                <Card key={photo.id}>
                  <Image src={photo.url}></Image>
                  {isLoggedIn && (
                    <Button.Group fluid>
                      <Button
                        color='red'
                        content='Trash'
                        icon='trash'
                        onClick={() => {
                          deleteImage(photo.id);
                        }}
                        loading={loadingDeletePhoto}
                      ></Button>
                      {photo.isMain
                        ? (className = 'isMainButton')
                        : (className = 'isNotMainButton')}
                      <Button
                        name={photo.id}
                        color='teal'
                        content='Main'
                        icon='star'
                        className={className}
                        onClick={e => {
                          setMainPhoto(photo.id);
                          settarget(e.currentTarget.name);
                        }}
                        loading={loadingSetMain && target === photo.id}
                      ></Button>
                    </Button.Group>
                  )}
                </Card>
              ))}
          </Card.Group>
        )}
      </GridColumn>
    </Tab.Pane>
  );
};
export default observer(ProfilePhotos);
