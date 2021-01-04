import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon, Header } from "semantic-ui-react";
import { FileWithPreview } from "./PhotoUploader";
import { fileURLToPath } from "url";

interface IProps {
  setfiles: (files: FileWithPreview[]) => void;
  setrefFiles: React.Dispatch<
    React.SetStateAction<FileList | null | undefined>
  >;
}
export const PhotoUploaderDropZone: React.FC<IProps> = ({
  setfiles,
  setrefFiles,
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
  const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
    onDrop,
  });
  setrefFiles(inputRef.current?.files);
  return (
    <div
      {...getRootProps()}
      style={
        isDragActive
          ? { ...dropZoneStyles, ...dropZoneActiveSytels }
          : dropZoneStyles
      }
    >
      <input {...getInputProps()} ref={inputRef} />
      <Icon name="upload" size="huge"></Icon>
      <Header content="Drop Image here"></Header>
    </div>
  );
};
export default PhotoUploaderDropZone;
