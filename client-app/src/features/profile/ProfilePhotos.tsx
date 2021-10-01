import { useContext, useState } from "react";
import * as React from "react";
import {
  Tab,
  Header,
  Card,
  Image,
  Button,
  Grid,
  GridColumn,
  Segment,
} from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { PhotoUploader } from "../../app/common/photoUploader/PhotoUploader";
import { observer } from "mobx-react-lite";
import PhotoModal from "./PhotoModal";

const ProfilePhotos = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isLoggedIn,
    deleteImage,
    loadingDeletePhoto,
    loadingSetMain,
    setMainPhoto,
    loadingPhoto,
    addPhotoOpen,
    toggleaddPhotoOpen,
    closeaddPhotoOpen,
  } = rootStore.profileStore;

  const [target, settarget] = useState<string | undefined>(undefined);

  const [modalOpen, setmodalOpen] = React.useState(false);
  const [modalImage, setmodalImage] = useState<string | undefined>();

  let className = "isNotMainButton";
  return (
    <>
      <PhotoModal {...{ modalOpen, setmodalOpen, modalImage }}></PhotoModal>
      <Tab.Pane>
        <Grid>
          <GridColumn width={16}>
            <Header
              data-cy="PaneContentHeader"
              floated="left"
              icon="image"
              content="Photos"
            ></Header>
            {isLoggedIn && (
              <Button
                data-cy="addphoto-btn"
                floated="right"
                basic
                content={addPhotoOpen ? "Cancel" : "AddPhoto"}
                color={addPhotoOpen ? "red" : "green"}
                onClick={toggleaddPhotoOpen}
              ></Button>
            )}
          </GridColumn>
        </Grid>
        <GridColumn>
          {addPhotoOpen ? (
            <PhotoUploader loading={loadingPhoto}></PhotoUploader>
          ) : (
            <Segment>
              <Card.Group itemsPerRow={4} stackable doubling>
                {profile &&
                  profile.photos.map((photo) => (
                    <Card
                      key={photo.id}
                      fluid
                      className="imageWithHover"
                      data-cy="imagecard"
                    >
                      <Image
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          width: "100%",
                        }}
                        src={photo.url}
                        onClick={() => {
                          setmodalOpen(true);
                          setmodalImage(photo.url);
                        }}
                      ></Image>
                      {isLoggedIn && (
                        <Button.Group>
                          <Button
                            color="red"
                            content="Trash"
                            icon="trash"
                            onClick={() => {
                              deleteImage(photo.id);
                            }}
                            loading={loadingDeletePhoto}
                          ></Button>
                          {photo.isMain
                            ? (className = "isMainButton")
                            : (className = "isNotMainButton")}
                          <Button
                            color="teal"
                            content="Main"
                            icon="star"
                            className={className}
                            onClick={(e) => {
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
    </>
  );
};
export default observer(ProfilePhotos);
