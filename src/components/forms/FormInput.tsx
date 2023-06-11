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
  onDone: () => void;
} & Pick<TextareaProps & InputProps, 'minLength' | 'maxLength' | 'pattern' | 'defaultValue'>;

interface TypedInputProps {
  onDone: () => void;
  onChange: (value: string) => void;
  defaultValue: string;
}

const inputFontSize: TypographyProps['fontSize'] = ['sm', null, null, '2xl', '3xl'];

const FormInput = ({
  i18nPrefix,
  isMultiline,
  leftElement,
  pattern,
  minLength,
  maxLength,
  onChange: changeCallback,
  defaultValue,
  onDone,
}: FormInputProps) => {
  const { t } = useTranslation();
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
    <VStack spacing="10" align="stretch" overflow="visible" marginX="-10">
      <FormControl isInvalid={isInvalid} isRequired paddingX="16">
        <FormLabel fontSize={['md', null, null, '3xl', '5xl']}>{label}</FormLabel>
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
            minHeight={isMultiline ? '3xs' : '0'}
            autoFocus
            {...{ onChange, pattern, minLength, maxLength, defaultValue, onDone }}
          />
        </InputGroup>
        {isInvalid ? (
          <FormErrorMessage fontSize={inputFontSize}>{errorText}</FormErrorMessage>
        ) : (
          <FormHelperText fontSize={inputFontSize}>{hint}</FormHelperText>
        )}
      </FormControl>
      <Keyboard onDone={onDone} />
    </VStack>
  );
};

export default FormInput;

export const FeedbackInput = ({ onChange, defaultValue, onDone }: TypedInputProps) => (
  <FormInput
    i18nPrefix="feedback"
    isMultiline
    minLength={10}
    {...{ onChange, defaultValue, onDone }}
  />
);

export const RequestBodyInput = ({ onChange, defaultValue, onDone }: TypedInputProps) => (
  <FormInput
    i18nPrefix="request"
    isMultiline
    minLength={10}
    {...{ onChange, defaultValue, onDone }}
  />
);

export const RequestSubjectInput = ({ onChange, defaultValue, onDone }: TypedInputProps) => (
  <FormInput
    i18nPrefix="subject"
    minLength={3}
    maxLength={40}
    {...{ onChange, defaultValue, onDone }}
  />
);

export const TelegramInput = ({ onChange, defaultValue, onDone }: TypedInputProps) => (
  <FormInput
    i18nPrefix="telegram"
    leftElement="@"
    minLength={4}
    maxLength={32}
    pattern="[A-Za-z0-9_]{4,32}"
    {...{ onChange, defaultValue, onDone }}
  />
);
