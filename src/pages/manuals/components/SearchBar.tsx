import { Collapse, Input, InputGroup, InputLeftElement, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MdSearch } from 'react-icons/md';
import Keyboard from '../../../components/forms/keyboard/Keyboard';

const SearchBar = ({ onChange }: { onChange: (value: string) => void }) => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <InputGroup marginBottom="8">
        <InputLeftElement>
          <MdSearch />
        </InputLeftElement>
        <Input placeholder={t('search') as string} ref={ref} onClick={onOpen} />
      </InputGroup>
      <Collapse in={isOpen}>
        <Keyboard inputRef={ref} onDone={onClose} onInputChange={onChange} />
      </Collapse>
    </>
  );
};

export default SearchBar;
