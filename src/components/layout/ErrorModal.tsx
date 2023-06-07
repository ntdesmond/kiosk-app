import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Code,
} from '@chakra-ui/react';

const ErrorModal = ({
  isOpen,
  onClose,
  error,
}: {
  isOpen: boolean;
  onClose: () => void;
  error: string;
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Error</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text marginBottom="2">An error occurred while trying to submit your request.</Text>
        {error && (
          <>
            <Text>Technical details:</Text>
            <Code>{error}</Code>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="gray" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ErrorModal;
