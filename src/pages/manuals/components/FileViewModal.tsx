import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Center,
  Box,
  HStack,
  IconButton,
  VStack,
  Icon,
  Text,
} from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';
import { Document, Page } from 'react-pdf';
import { OnDocumentLoadSuccess, OnPageLoadSuccess } from 'react-pdf/dist/cjs/shared/types';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { useElementSize, useStep } from 'usehooks-ts';

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
  const [
    pageNumber,
    {
      goToNextStep: showNext,
      goToPrevStep: showPrevious,
      canGoToNextStep: canShowNext,
      canGoToPrevStep: canShowPrevious,
      reset: resetPages,
    },
  ] = useStep(totalPages);

  const [pageWidth, setPageWidth] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [ref, { width: wrapperWidth, height: wrapperHeight }] = useElementSize();

  const fitHorizontal = useMemo(() => {
    const wRatio = pageWidth / wrapperWidth;
    const hRatio = pageHeight / wrapperHeight;
    return wRatio >= hRatio;
  }, [pageHeight, pageWidth, wrapperWidth, wrapperHeight]);

  const onLoadSuccess = useCallback<OnDocumentLoadSuccess>(
    ({ numPages }) => {
      setTotalPages(numPages);
      resetPages();
    },
    [resetPages],
  );

  const onPageLoaded = useCallback<OnPageLoadSuccess>((page) => {
    setPageWidth(page.width);
    setPageHeight(page.height);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="100%" marginX="4" marginY="4em" height="calc(100% - 8em)">
        <ModalHeader>{file?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody flex="1">
          <VStack height="100%" width="100%">
            {file ? (
              <>
                <HStack justify="center">
                  <IconButton
                    size="lg"
                    aria-label="Previous page"
                    icon={<Icon as={MdArrowLeft} boxSize="12" />}
                    onClick={showPrevious}
                    isDisabled={!canShowPrevious}
                  />
                  <Text marginX="4" fontSize="2xl">
                    {t('pageNumber', { this: pageNumber, total: totalPages })}
                  </Text>
                  <IconButton
                    size="lg"
                    aria-label="Next page"
                    icon={<Icon as={MdArrowRight} boxSize="12" />}
                    onClick={showNext}
                    isDisabled={!canShowNext}
                  />
                </HStack>
                <Center alignSelf="stretch" flex="1" ref={ref}>
                  <Document loading={<Spinner size="xl" />} {...{ onLoadSuccess, file }}>
                    <Box boxShadow="dark-lg">
                      <Page
                        loading={<Spinner size="xl" />}
                        pageNumber={pageNumber}
                        onLoadSuccess={onPageLoaded}
                        width={fitHorizontal ? wrapperWidth : undefined}
                        height={!fitHorizontal ? wrapperHeight : undefined}
                      />
                    </Box>
                  </Document>
                </Center>
              </>
            ) : (
              <Center height="100%">
                <Spinner size="xl" />
              </Center>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FileViewModal;
