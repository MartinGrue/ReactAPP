import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Grid, Header, Image, Button } from 'semantic-ui-react';
import PhotoUploaderDropZone from './PhotoUploaderDropZone';
import PhotoUploaderCropper from './PhotoUploaderCropper';
import { RootStoreContext } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';

interface iProps{
  loading:boolean
}
export const PhotoUploader:React.FC<iProps> = ({loading}) => {
  const [files, setfiles] = useState<any[]>([]);
  const [image, setimage] = useState<Blob | null>(null);

  const rootStore = useContext(RootStoreContext);
  const {uploadImage, loadingPhoto, setLoadingPhoto} = rootStore.profileStore;

  //Component will unmount
  //Remove image from memory
  useEffect(() => {
    return () => {
      // files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  });
  return (
    <Fragment>
      <Grid>
        <Grid.Column width={4}>
          <Header color='teal' sub content='Step 1 - Add Photo' />
          <PhotoUploaderDropZone setfiles={setfiles}></PhotoUploaderDropZone>
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 2 - Resize image' />
          {files.length > 0 && (
            <PhotoUploaderCropper
              setimage={setimage}
              imagePreview={files[0].preview}
            ></PhotoUploaderCropper>
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 3 - Preview & Upload' />
          {files.length > 0 && 
            <Fragment>
            {/* <div
              className='img-preview'
              style={{ minHeight: '200px', overflow: 'hidden' }}
            ></div> */}
            <Button.Group>
            <Button  positive icon='check' disabled={loading} loading={loading} onClick={() => {
              console.log(rootStore.profileStore.loadingPhoto);
              setLoadingPhoto();
              console.log(rootStore.profileStore.loadingPhoto);
              uploadImage(image!)
              }}></Button>
              </Button.Group>
            </Fragment>
          }
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};
export default observer(PhotoUploader);
