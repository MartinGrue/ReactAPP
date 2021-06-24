import { useContext } from 'react';
import { Modal } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const ModalContainer = () => {

    const rootStore = useContext(RootStoreContext);
    const {modal:{open, body}, closeModal} = rootStore.modalStore;
    useEffect(() => {
        console.log("modalopen: ", open)
            }, [open])
    return (
        <Modal open={open} onClose={closeModal} size='tiny' dimmer={true}>
        <Modal.Content>
            {body}
        </Modal.Content>
      </Modal>
    )
}

export default observer(ModalContainer)
