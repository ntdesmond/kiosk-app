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
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import InactivityContext from './InactivityContext';

const MotionBox = motion(Box);
const autoReturnDelay = 5;

const InactivityModal = ({
  defaultSeconds,
  children,
}: {
  defaultSeconds: number;
  children: (resetTimeout: () => void) => ReactNode;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState<number | null>(defaultSeconds);

  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const timeoutId = useRef<NodeJS.Timeout>();

  const enableTimeout = useCallback(() => {
    if (isOpen || seconds === null) {
      return;
    }
    timeoutId.current = setTimeout(onOpen, seconds * 1000);
  }, [isOpen, onOpen, seconds]);

  const disableTimeout = useCallback(() => {
    clearTimeout(timeoutId.current);
  }, []);

  const resetTimeout = useCallback(() => {
    disableTimeout();
    enableTimeout();
  }, [disableTimeout, enableTimeout]);

  useEffect(() => {
    enableTimeout();
    return disableTimeout;
  }, [disableTimeout, enableTimeout, pathname, resetTimeout]);

  const goToMenu = useCallback(() => {
    navigate('/', { replace: true });
    onClose();
  }, [navigate, onClose]);

  useTimeout(goToMenu, isOpen ? autoReturnDelay * 1000 : null);

  const contextValue = useMemo(
    () => ({
      setInactivityTimeout: setSeconds,
      resetInactivityTimeout: () => setSeconds(defaultSeconds),
      disableInactivityTimeout: () => setSeconds(null),
    }),
    [defaultSeconds],
  );

  return (
    <InactivityContext.Provider value={contextValue}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent onClick={onClose}>
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
      {children(resetTimeout)}
    </InactivityContext.Provider>
  );
};

export default InactivityModal;
