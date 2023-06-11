import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  FormHelperText,
  Textarea,
  InputLeftElement,
  TextareaProps,
  InputProps,
  useBoolean,
  FormErrorMessage,
  TypographyProps,
  useDisclosure,
  Collapse,
  Box,
  VStack,
} from '@chakra-ui/react';
import { ChangeEventHandler, ReactNode, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Keyboard from './keyboard/Keyboard';

type FormInputProps = {
  i18nPrefix: string;
  isMultiline?: boolean;
  leftElement?: ReactNode;
  onChange: (value: string) => void;
} & Pick<TextareaProps & InputProps, 'minLength' | 'maxLength' | 'pattern'>;

const inputFontSize: TypographyProps['fontSize'] = ['sm', null, null, 'xl', '2xl'];

const FormInput = ({
  i18nPrefix,
  isMultiline,
  leftElement,
  pattern,
  minLength,
  maxLength,
  onChange: changeCallback,
}: FormInputProps) => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isInvalid, { on: onInvalid, off: onValid }] = useBoolean(false);

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>>(
    ({ target }) => {
      if (target.value !== '' && !target.checkValidity()) {
        onInvalid();
        changeCallback('');
        return;
      }
      onValid();
      changeCallback(target.value);
    },
    [changeCallback, onInvalid, onValid],
  );

  const label = useMemo(() => t(`${i18nPrefix}Input`), [i18nPrefix, t]);
  const hint = useMemo(() => t(`${i18nPrefix}InputHint`), [i18nPrefix, t]);
  const placeholder = useMemo(() => t(`${i18nPrefix}InputPlaceholder`), [i18nPrefix, t]);
  const errorText = useMemo(() => t(`${i18nPrefix}InputError`), [i18nPrefix, t]);

  const TargetElement = useMemo(() => (isMultiline ? Textarea : Input), [isMultiline]);

  return (
    <VStack spacing={0} overflow="visible" marginX="-10">
      <Box as={Collapse} width="100%" in={isOpen}>
        <Keyboard onDone={onClose} />
      </Box>
      <FormControl isInvalid={isInvalid} isRequired paddingX="16">
        <FormLabel fontSize={['md', null, null, '2xl', '4xl']}>{label}</FormLabel>
        <InputGroup>
          {leftElement && (
            <InputLeftElement
              height="100%"
              justifyContent="end"
              alignItems="center"
              width={['8', null, null, null, '10']}
              fontSize={inputFontSize}
              pointerEvents="none"
              color="gray"
            >
              {leftElement}
            </InputLeftElement>
          )}
          <TargetElement
            paddingLeft={leftElement ? ['8', '8', null, null, '10'] : undefined}
            borderWidth="0.1em"
            fontSize={inputFontSize}
            size={['md', null, null, 'lg']}
            placeholder={placeholder}
            resize="none"
            onFocus={onOpen}
            {...{ onChange, pattern, minLength, maxLength }}
          />
        </InputGroup>
        {isInvalid ? (
          <FormErrorMessage fontSize={inputFontSize}>{errorText}</FormErrorMessage>
        ) : (
          <FormHelperText fontSize={inputFontSize}>{hint}</FormHelperText>
        )}
      </FormControl>
    </VStack>
  );
};

export default FormInput;

export const FeedbackInput = ({ onChange }: { onChange: (value: string) => void }) => (
  <FormInput onChange={onChange} i18nPrefix="feedback" isMultiline minLength={10} />
);

export const RequestBodyInput = ({ onChange }: { onChange: (value: string) => void }) => (
  <FormInput onChange={onChange} i18nPrefix="request" isMultiline minLength={10} />
);

export const RequestSubjectInput = ({ onChange }: { onChange: (value: string) => void }) => (
  <FormInput onChange={onChange} i18nPrefix="subject" minLength={3} maxLength={40} />
);

export const TelegramInput = ({ onChange }: { onChange: (value: string) => void }) => (
  <FormInput
    onChange={onChange}
    i18nPrefix="telegram"
    leftElement="@"
    minLength={4}
    maxLength={32}
    pattern="[A-Za-z0-9_]{4,32}"
  />
);
