import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { Grid, Header, Button, Confirm } from "semantic-ui-react";
import PhotoUploaderDropZone from "./PhotoUploaderDropZone";
import PhotoUploaderCropper from "./PhotoUploaderCropper";
import { RootStoreContext } from "../../stores/rootStore";
import { observer } from "mobx-react-lite";

interface iProps {
  loading: boolean;
}
export interface FileWithPreview extends File {
  preview: string;
}
export const PhotoUploader: React.FC<iProps> = ({ loading }) => {
  const [files, setfiles] = useState<FileWithPreview[]>([]);
  const [image, setimage] = useState<Blob | null>(null);
  // const inputEl = useRef<HTMLInputElement | null>(null);
  const [refFiles, setrefFiles] = useState<FileList | null | undefined>(
    undefined
  );
  const rootStore = useContext(RootStoreContext);
  const {
    uploadImage,
    setLoadingPhoto,
    uploadImageDirect,
  } = rootStore.profileStore;

  //Component will unmount
  //Remove image from memory

  const submitForm = () => {
    uploadImageDirect(refFiles);
  };

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
          <PhotoUploaderDropZone
            setfiles={setfiles}
            setrefFiles={setrefFiles}
          ></PhotoUploaderDropZone>
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
                  positive
                  icon="check"
                  disabled={loading}
                  loading={loading}
                  onClick={() => {
                    setLoadingPhoto();
                    submitForm();
                    // uploadImage(image!);
                  }}
                ></Button>

                <Button
                  icon="close"
                  disabled={loading}
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
