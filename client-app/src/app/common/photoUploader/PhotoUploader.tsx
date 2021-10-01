import { Fragment, useState, useEffect, useContext } from "react";
import * as React from "react";
import { Grid, Header, Button } from "semantic-ui-react";
import PhotoUploaderDropZone from "./PhotoUploaderDropZone";
import PhotoUploaderCropper from "./PhotoUploaderCropper";
import { RootStoreContext } from "../../stores/rootStore";
import { observer } from "mobx-react-lite";

interface Props {
  loading: boolean;
}
export interface FileWithPreview extends File {
  preview: string;
}
export const PhotoUploader: React.FC<Props> = ({ loading }) => {
  const [files, setfiles] = useState<FileWithPreview[]>([]);
  const [image, setimage] = useState<Blob | null>(null);
  const rootStore = useContext(RootStoreContext);
  const { uploadImageDirect, setLoadingPhoto } = rootStore.profileStore;

  //Component will unmount
  //Remove image from memory

  useEffect(() => {
    return () => {
      // files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  });
  return (
    <Fragment>
      <Grid stackable>
        <Grid.Column width={4}>
          <Header color="teal" sub content="Step 1 - Add Photo" />
          <PhotoUploaderDropZone setfiles={setfiles}></PhotoUploaderDropZone>
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Step 2 - Resize image" />
          {files.length > 0 && (
            <PhotoUploaderCropper
              setimage={setimage}
              imagePreview={files[0].preview}
            ></PhotoUploaderCropper>
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4} stretched>
          <Header sub color="teal" content="Step 3 - Preview & Upload" />
          {files.length > 0 && (
            <Fragment>
              <div
                className="img-preview center"
                style={{ minHeight: "240px", overflow: "hidden" }}
              ></div>
              <Button.Group fluid>
                <Button
                  data-cy="upload-imagebtn"
                  positive
                  icon="check"
                  disabled={loading}
                  loading={loading}
                  onClick={() => {
                    setLoadingPhoto();
                    uploadImageDirect(image!);
                    // uploadImage(image!);
                  }}
                ></Button>
                <Button
                  icon="close"
                  disabled={!loading}
                  onClick={() => setfiles([])}
                ></Button>
              </Button.Group>
            </Fragment>
          )}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};
export default observer(PhotoUploader);
