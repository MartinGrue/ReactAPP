import * as React from "react";
import { Modal, Image } from "semantic-ui-react";
interface PhotoModalProps {
  modalOpen: boolean;
  setmodalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalImage: string | undefined;
}
const PhotoModal: React.FC<PhotoModalProps> = ({
  modalOpen,
  setmodalOpen,
  modalImage,
}) => {
  return (
    <Modal
      closeOnDocumentClick={true}
      dimmer="inverted"
      basic
      onClose={() => setmodalOpen(false)}
      onOpen={() => setmodalOpen(true)}
      open={modalOpen}
    >
      <div
        onClick={() => {
          setmodalOpen(false);
        }}
      >
        <Modal.Content image>
          <Image size="huge" src={modalImage} centered />
        </Modal.Content>
      </div>
    </Modal>
  );
};

export default PhotoModal;
