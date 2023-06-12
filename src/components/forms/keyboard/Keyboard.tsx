import { Grid, GridItem, useBoolean } from '@chakra-ui/react';
import { MouseEventHandler, RefObject, memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MdBackspace,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardReturn,
  MdLanguage,
} from 'react-icons/md';
import { TbArrowBigUp, TbArrowBigUpFilled, TbArrowBigUpLineFilled } from 'react-icons/tb';
import Key from './Key';
import NumbersGrid from './NumbersGrid';

type Language = 'ru' | 'en';
type UppercaseStatus = 'off' | 'on' | 'once';

const layouts: Record<Language | 'symbols', string> = {
  en: "@1234567890!qwertyuiop-/?asdfghjkl:'zxcvbnm.,()",
  ru: 'ё1234567890!йцукенгшщзхъ?фывапролджэячсмитьбю.,',
  symbols: '@`#№&_—!^$₽%-|/\\?()<>+:;,[]{}*\'"=',
};

interface KeyboardProps {
  onInputChange: (value: string) => void;
  onDone: () => void;
  inputRef: RefObject<HTMLInputElement>;
}

const Keyboard = memo(({ onDone, inputRef, onInputChange }: KeyboardProps) => {
  const { t, i18n } = useTranslation();
  const [isShowingSymbols, { toggle: toggleSymbols }] = useBoolean();
  const [uppercase, setUppercase] = useState<UppercaseStatus>('off');
  const [language, setLanguage] = useState<Language>(i18n.language as Language);

  const shiftKeyIcon = useMemo(() => {
    switch (uppercase) {
      case 'on':
        return <TbArrowBigUpLineFilled />;
      case 'once':
        return <TbArrowBigUpFilled />;
      default:
        return <TbArrowBigUp />;
    }
  }, [uppercase]);

  const layout = useMemo(() => {
    if (isShowingSymbols) {
      return layouts.symbols;
    }
    if (uppercase !== 'off') {
      return layouts[language].toUpperCase();
    }
    return layouts[language];
  }, [isShowingSymbols, language, uppercase]);

  const erase = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    const { selectionStart, selectionEnd, value } = inputRef.current;
    if (selectionStart === null || selectionEnd === null) {
      return;
    }

    const newCursorOffset =
      selectionStart > 0 && selectionStart === selectionEnd ? selectionStart - 1 : selectionStart;
    const start = value.slice(0, newCursorOffset);
    const end = value.slice(selectionEnd);
    const newValue = `${start}${end}`;

    // eslint-disable-next-line no-param-reassign
    inputRef.current.value = newValue;
    inputRef.current.setSelectionRange(newCursorOffset, newCursorOffset);

    onInputChange(newValue);
  }, [inputRef, onInputChange]);

  const appendChar = useCallback(
    (char: string) => {
      if (!inputRef.current) {
        return;
      }
      const { selectionStart, selectionEnd, value } = inputRef.current;
      if (selectionStart === null || selectionEnd === null) {
        return;
      }
      const start = value.slice(0, selectionStart);
      const end = value.slice(selectionEnd);
      const newValue = `${start}${char}${end}`;
      const newCursorOffset = selectionStart + 1;

      // eslint-disable-next-line no-param-reassign
      inputRef.current.value = newValue;
      inputRef.current.setSelectionRange(newCursorOffset, newCursorOffset);

      onInputChange(newValue);
    },
    [inputRef, onInputChange],
  );

  const keepInputFocused = useCallback<MouseEventHandler>(
    (event) => {
      event.stopPropagation();
      inputRef.current?.focus();
    },
    [inputRef],
  );

  return (
    <Grid
      onClick={keepInputFocused}
      templateColumns="repeat(13, 1fr)"
      templateRows="repeat(5, 1fr)"
      gridAutoFlow="row dense"
    >
      <Key onClick={erase} colorScheme="gray" colStart={12} colSpan={2}>
        <MdBackspace />
      </Key>
      <Key colorScheme="gray" rowStart={3} colStart={13}>
        <MdKeyboardReturn />
      </Key>
      {!isShowingSymbols && (
        <Key
          colorScheme="gray"
          rowStart={4}
          colSpan={2}
          onClick={() => setUppercase(uppercase === 'off' ? 'once' : 'off')}
          onDoubleClick={() => setUppercase(uppercase === 'off' ? 'on' : 'off')}
          bgColor={uppercase !== 'off' ? 'gray.200' : undefined}
        >
          {shiftKeyIcon}
        </Key>
      )}
      <Key colorScheme="gray" rowStart={5} colSpan={2} onClick={toggleSymbols}>
        {isShowingSymbols ? t('lettersKeyContent', { lng: language }) : '?123'}
      </Key>
      <Key
        colorScheme="gray"
        rowStart={5}
        colStart={3}
        onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
      >
        <MdLanguage />
      </Key>
      <Key rowStart={5} colStart={4} colEnd={10}>
        {' '}
      </Key>
      <Key colorScheme="gray" rowStart={5} colStart={10}>
        <MdKeyboardArrowLeft />
      </Key>
      <Key colorScheme="gray" rowStart={5} colStart={11}>
        <MdKeyboardArrowRight />
      </Key>
      <Key colorScheme="gray" rowStart={5} colStart={12} colSpan={2} onClick={onDone}>
        {t('doneKeyContent', { lng: language })}
      </Key>
      {isShowingSymbols && (
        <GridItem marginX="12.5%" colStart={6} colSpan={4} rowSpan={4}>
          <NumbersGrid />
        </GridItem>
      )}
      {[...layout].map((letter) => (
        <Key key={letter} onClick={() => appendChar(letter)}>
          {letter}
        </Key>
      ))}
    </Grid>
  );
});

export default Keyboard;
