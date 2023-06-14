import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Center, Spinner, VStack, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import SearchBar from './components/SearchBar';
import { getErrorMessage, useListFilesQuery } from '../../store/apiSlice';
import { Language } from '../../store/models';
import ErrorModal from '../../components/modals/ErrorModal';
import FileRow from './components/FileRow';
import FileViewModal from './components/FileViewModal';

const Manuals = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, data: allFiles, isError, error } = useListFilesQuery();
  const [fileError, setFileError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openedFile, setOpenedFile] = useState<File | null>(null);
  const [filter, setFilter] = useState('');

  const files = useMemo(() => {
    const filesByLanguage =
      allFiles?.filter(({ description }) => description[language as Language] !== '') || [];
    if (!filter) {
      return filesByLanguage;
    }
    return filesByLanguage.filter(({ description }) =>
      description[language as Language].includes(filter),
    );
  }, [allFiles, filter, language]);

  const errorMessage = useMemo(() => (error ? getErrorMessage(error) : ''), [error]);

  return (
    <>
      <ErrorModal
        isOpen={isError}
        onClose={() => navigate('/')}
        error={errorMessage}
        i18nPrefix="manuals"
      />
      <ErrorModal
        isOpen={fileError !== ''}
        onClose={() => setFileError('')}
        error={fileError}
        i18nPrefix="manualsFile"
      />
      <FileViewModal file={openedFile} {...{ isOpen, onClose }} />
      <VStack spacing="8" height="100%">
        <Header title={t('manualsTitle')} />
        <Box alignSelf="stretch" minHeight="0">
          <SearchBar onChange={setFilter} />
          <VStack align="stretch">
            {isLoading && (
              <Center>
                <Spinner size="xl" />
              </Center>
            )}
            {files.map(({ id, description }) => (
              <FileRow
                key={id}
                id={id}
                description={description[language as Language]}
                onError={setFileError}
                onFileLoading={onOpen}
                onFileLoaded={setOpenedFile}
              />
            ))}
          </VStack>
        </Box>
      </VStack>
    </>
  );
};

export default Manuals;
