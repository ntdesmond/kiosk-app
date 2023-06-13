import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
  useSteps,
  Center,
  Box,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Document, Page } from 'react-pdf';
import { OnDocumentLoadSuccess } from 'react-pdf/dist/cjs/shared/types';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const FileViewModal = ({
  file,
  isOpen,
  onClose,
}: {
  file: File | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const [totalPages, setTotalPages] = useState(0);
  const { goToPrevious, goToNext, activeStep } = useSteps();

  const onLoadSuccess = useCallback<OnDocumentLoadSuccess>(({ numPages }) => {
    setTotalPages(numPages);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="100%" marginX="4">
        <ModalHeader>{t('fileViewTitle')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            {file ? (
              <Box as={Document} {...{ onLoadSuccess, file }} width="100%">
                <Page pageNumber={activeStep + 1} scale={1.5} />
              </Box>
            ) : (
              <Spinner size="xl" />
            )}
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FileViewModal;
