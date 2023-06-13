import { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Header from '../../components/layout/Header';
import SearchBar from './components/SearchBar';

const Manuals = () => {
  const { t } = useTranslation();
  const [_, setFilter] = useState('');

  return (
    <VStack spacing="8" height="100%">
      <Header title={t('manualsTitle')} />
      <Box alignSelf="stretch" minHeight="0">
        <SearchBar onChange={setFilter} />
      </Box>
    </VStack>
  );
};

export default Manuals;
