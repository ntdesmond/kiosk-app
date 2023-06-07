import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  useTimeout,
  Box,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);
const autoReturnDelay = 5;

const SuccessModal = ({ isOpen }: { isOpen: boolean }) => {
  const navigate = useNavigate();
  const goToMenu = useCallback(() => navigate('/', { replace: true }), [navigate]);

  useTimeout(goToMenu, isOpen ? autoReturnDelay * 1000 : null);

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Success</ModalHeader>
        <ModalBody>
          <Text marginBottom="2">Your request has been successfully sent. Thank you!</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={goToMenu}>
            <Text zIndex={2}>Back to menu</Text>
            <MotionBox
              position="absolute"
              borderRadius="md"
              bgColor="green.600"
              inset="0"
              width="0"
              animate={{ width: '100%' }}
              transition={{ duration: autoReturnDelay }}
            />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SuccessModal;
