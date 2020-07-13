import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface IProps {
  setimage: (file: Blob) => void;
  imagePreview: string;
}
export const PhotoUploaderCropper: React.FC<IProps> = ({
  setimage,
  imagePreview
}) => {
  const cropper = useRef<Cropper>(null);

  const cropImage = () => {
    if (
      cropper.current &&
      typeof cropper.current.getCroppedCanvas() === 'undefined'
    ) {
      return;
    }
    cropper &&
      cropper.current &&
      cropper.current.getCroppedCanvas().toBlob((blob: Blob | null) => {
        setimage(blob!);
      }, 'image/jpeg');
  };
  return (
    <Cropper
      ref={cropper}
      src={imagePreview}
      style={{ height: 240, width: '100%' }}
      preview='.img-preview'
      // Cropper.js options
      aspectRatio={1 / 1}
      dragMode='move'
      guides={false}
      viewMode={1}
      scalable={true}
      cropBoxResizable={true}
      cropBoxMovable={true}
      crop={cropImage}
    ></Cropper>
  );
};

export default PhotoUploaderCropper;
