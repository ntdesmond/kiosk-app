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

const SuccessModal = ({
  isOpen,
  i18nPrefix,
}: {
  isOpen: boolean;
  i18nPrefix: 'newRequest' | 'feedback';
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToMenu = useCallback(() => navigate('/', { replace: true }), [navigate]);

  useTimeout(goToMenu, isOpen ? autoReturnDelay * 1000 : null);

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('successModalTitle')}</ModalHeader>
        <ModalBody>
          <Text marginBottom="2">{t(`${i18nPrefix}SuccessMessage`)}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={goToMenu}>
            <Text zIndex={2}>{t(`backToMenu`)}</Text>
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
