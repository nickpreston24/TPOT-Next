import { Modal, ModalHeader, ModalOverlay, ModalFooter, ModalContent, ModalCloseButton, ModalBody } from '@chakra-ui/core/dist/Modal'
import Button from '@chakra-ui/core/dist/Button'
import Stack from '@chakra-ui/core/dist/Stack'
import { FC } from 'react'

type ConfirmProps = {
    header: string
    body?: string
    yesMessage: string
    nopeMessage: string
    isOpen: any //TODO: replace 'any' with the specific type that comes from useDisclosure().
    onClose: any //TODO: replace 'any' with the specific type that comes from useDisclosure().
    action?: () => void
}

export const Confirm: FC<ConfirmProps> = ({ header, body, isOpen, onClose, action, yesMessage, nopeMessage }) => {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{header}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{body}</ModalBody>
                <ModalFooter>
                    <Stack>
                        <Button variantColor="green" mr={30} onClick={() => {
                            action && action()
                            onClose()
                        }}>
                            {yesMessage}
                        </Button>
                        <Button variantColor="blue" onClick={onClose}>
                            On second thought...
                        </Button>
                    </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default Confirm;