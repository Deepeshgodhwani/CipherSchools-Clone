import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react'

function UpdateProfile() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <div>
              <button onClick={onOpen} className="bg-[rgb(243,145,46)] px-5 rounded-lg py-[3px]">Change</button>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update Profile</ModalHeader>
                <ModalCloseButton />
              
            </ModalContent>
            </Modal>
        </div>
      )
}

export default UpdateProfile