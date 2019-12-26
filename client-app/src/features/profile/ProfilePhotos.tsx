import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  Tab,
  Header,
  Card,
  Image,
  Button,
  Grid,
  GridColumn,
  Segment
} from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { PhotoUploader } from '../../app/common/photoUploader/PhotoUploader';
import { observer } from 'mobx-react-lite';

const OutSideClickDetector = (
  ref: React.MutableRefObject<any>,
  setimgSelected: React.Dispatch<any>
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setimgSelected(false);
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
};

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

  const [windowsWidth, setwindowsWidth] = useState();
  const handleWindowSizeChange = () => {
    setwindowsWidth(window.innerWidth);
  };

  const [addPhotoToggle, setaddPhotoToggle] = useState(false);
  const [target, settarget] = useState<string | undefined>(undefined);

  const [isbig, setisbig] = useState();

  const wrapperRef = useRef(null);
  OutSideClickDetector(wrapperRef, setisbig);

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
  }, []);

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
          <Segment>
            {profile && isbig && !(windowsWidth < 600) && (
              <Card.Group itemsPerRow={2} centered>
                <Card>
                  <div ref={wrapperRef}>
                    <Image src={isbig.url} size='huge'></Image>
                  </div>
                </Card>
              </Card.Group>
            )}
            <Card.Group itemsPerRow={5} stackable doubling>
              {profile &&
                profile.photos.map(photo => (
                  <Card key={photo.id}>
                    <Image
                      src={photo.url}
                      onClick={() => {
                        setisbig(photo);
                      }}
                      className='imageWithpointer'
                    ></Image>
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
          </Segment>
        )}
      </GridColumn>
    </Tab.Pane>
  );
};
export default observer(ProfilePhotos);
