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
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);
const autoReturnDelay = 5;

const InactivityModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToMenu = useCallback(() => {
    navigate('/', { replace: true });
    onClose();
  }, [navigate, onClose]);

  useTimeout(goToMenu, isOpen ? autoReturnDelay * 1000 : null);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('inactivityModalTitle')}</ModalHeader>
        <ModalBody>
          <Text marginBottom="2">{t(`inactivityMessage`)}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" onClick={goToMenu} marginRight="4">
            <Text zIndex={2}>{t(`backToMenu`)}</Text>
            <MotionBox
              position="absolute"
              borderRadius="md"
              bgColor="gray.200"
              inset="0"
              width="0"
              animate={{ width: '100%' }}
              transition={{ duration: autoReturnDelay }}
            />
          </Button>
          <Button onClick={onClose}>{t('inactivityCancel')}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InactivityModal;
