import { useCallback } from "react";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { Icon, Header } from "semantic-ui-react";
import { FileWithPreview } from "./PhotoUploader";

interface IProps {
  setfiles: (files: FileWithPreview[]) => void;

}
export const PhotoUploaderDropZone: React.FC<IProps> = ({
  setfiles,
}) => {
  const dropZoneStyles = {
    border: "dashed 3px",
    borderColor: "#eee",
    borderRadius: "5px",
    paddingTop: "30px",
    textAlign: "center" as "center",
    height: "200px",
  };
  const dropZoneActiveSytels = {
    borderColor: "green",
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setfiles(
        acceptedFiles.map((file: File) => {
          // return Object.assign(file, { preview: URL.createObjectURL(file) });
          return { ...file, preview: URL.createObjectURL(file) };
        })
      );
    },
    [setfiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div
      {...getRootProps()}
      style={
        isDragActive
          ? { ...dropZoneStyles, ...dropZoneActiveSytels }
          : dropZoneStyles
      }
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge"></Icon>
      <Header content="Drop Image here"></Header>
    </div>
  );
};
export default PhotoUploaderDropZone;
