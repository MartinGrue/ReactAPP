import * as React from "react";
import Cropper from "react-cropper";

interface IProps {
  setimage: (file: Blob) => void;
  imagePreview: string;
}
export const PhotoUploaderCropper: React.FC<IProps> = ({
  setimage,
  imagePreview,
}) => {
  const onCrop = (event: Cropper.CropEvent<EventTarget>) => {
    event.currentTarget?.cropper?.getCanvasData() &&
      event.currentTarget.cropper
        .getCroppedCanvas()
        .toBlob((blob: Blob | null) => {
          setimage(blob!);
        }, "image/jpeg");
  };

  return (
    <Cropper
      src={imagePreview}
      style={{ height: 240, width: "100%" }}
      preview=".img-preview"
      // Cropper.js options
      aspectRatio={1 / 1}
      dragMode="move"
      guides={false}
      viewMode={1}
      scalable={true}
      cropBoxResizable={true}
      cropBoxMovable={true}
      crop={onCrop}
    ></Cropper>
  );
};

export default PhotoUploaderCropper;
