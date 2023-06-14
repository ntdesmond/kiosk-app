import {
  Box,
  Collapse,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useDisclosure,
} from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import { MdClear, MdSearch } from 'react-icons/md';
import Keyboard from '../../../components/forms/keyboard/Keyboard';

const SearchBar = ({ onChange: changeCallback }: { onChange: (value: string) => void }) => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [canClear, setCanClear] = useState(false);

  useOnClickOutside(ref, onClose);

  const onChange = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    changeCallback(inputRef.current.value);
    setCanClear(inputRef.current.value !== '');
  }, [changeCallback]);

  const clear = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.value = '';
    onChange();
  }, [onChange]);

  return (
    <Box ref={ref}>
      <InputGroup marginBottom="8">
        <InputLeftElement>
          <MdSearch />
        </InputLeftElement>
        <Input
          placeholder={t('search') as string}
          ref={inputRef}
          onClick={onOpen}
          onChange={onChange}
        />
        {canClear && (
          <InputRightElement>
            <IconButton
              colorScheme="gray"
              size="sm"
              variant="ghost"
              aria-label="Clear search bar"
              icon={<MdClear />}
              onClick={clear}
            />
          </InputRightElement>
        )}
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
