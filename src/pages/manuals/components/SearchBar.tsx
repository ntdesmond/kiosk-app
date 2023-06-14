import {
  Box,
  Collapse,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import { MdSearch } from 'react-icons/md';
import Keyboard from '../../../components/forms/keyboard/Keyboard';

const SearchBar = ({ onChange }: { onChange: (value: string) => void }) => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(ref, onClose);

  return (
    <Box ref={ref}>
      <InputGroup marginBottom="8">
        <InputLeftElement>
          <MdSearch />
        </InputLeftElement>
        <Input placeholder={t('search') as string} ref={inputRef} onClick={onOpen} />
      </InputGroup>
      <Collapse in={isOpen}>
        <Box paddingBottom="8">
          <Keyboard inputRef={inputRef} onDone={onClose} onInputChange={onChange} />
        </Box>
      </Collapse>
    </Box>
  );
};

export default SearchBar;
