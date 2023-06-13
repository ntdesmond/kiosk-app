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
import { useTranslation } from 'react-i18next';

const ErrorModal = ({
  isOpen,
  onClose,
  error,
  i18nPrefix,
}: {
  isOpen: boolean;
  onClose: () => void;
  error: string;
  i18nPrefix: 'newRequest' | 'feedback';
}) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('errorModalTitle')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text marginBottom="2">{t(`${i18nPrefix}ErrorMessage`)}</Text>
          {error && (
            <>
              <Text>{t('errorModalDetails')}</Text>
              <Code>{error}</Code>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" onClick={onClose}>
            {t('close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ErrorModal;
