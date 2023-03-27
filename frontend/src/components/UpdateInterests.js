import React from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    useDisclosure
  } from '@chakra-ui/react'

function UpdateInterests() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
          <button onClick={onOpen} className="bg-[rgb(243,145,46)] px-8 rounded-lg py-[3px]">Edit</button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Interests</ModalHeader>
            <ModalCloseButton />
          
        </ModalContent>
        </Modal>
    </div>
  )
}

export default UpdateInterests