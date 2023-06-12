import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  FormHelperText,
  InputLeftElement,
  InputProps,
  FormErrorMessage,
  TypographyProps,
  VStack,
  forwardRef,
  Textarea,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { FieldErrors, FieldPath, FieldValues, UseFormRegister } from 'react-hook-form';
import Keyboard from './keyboard/Keyboard';

interface FormInputProps {
  label: string;
  hint: string;
  error?: string;
  placeholder: string;
  leftElement?: ReactNode;
  onDone: () => void;
  isInvalid: boolean;
}

type TypedFormInputProps<TName extends FieldPath<TForm>, TForm extends FieldValues> = {
  name: TName;
  register: UseFormRegister<TForm>;
  errors: FieldErrors<TForm>;
} & Pick<FormInputProps, 'onDone'>;

const inputFontSize: TypographyProps['fontSize'] = ['sm', null, null, '2xl', '3xl'];

const FormInput = forwardRef<InputProps & FormInputProps, 'input'>(
  ({ label, error, hint, leftElement, onDone, isInvalid, ...props }, ref) => (
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
          <Input
            ref={ref}
            paddingLeft={leftElement ? ['8', '8', null, null, '10'] : undefined}
            borderWidth="0.1em"
            fontSize={inputFontSize}
            size={['md', null, null, 'lg']}
            resize="none"
            autoFocus
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...props}
          />
        </InputGroup>
        {isInvalid ? (
          <FormErrorMessage fontSize={inputFontSize}>{error}</FormErrorMessage>
        ) : (
          <FormHelperText fontSize={inputFontSize}>{hint}</FormHelperText>
        )}
      </FormControl>
      <Keyboard onDone={onDone} />
    </VStack>
  ),
);

export default FormInput;

/* eslint-disable react/jsx-props-no-spreading */

export const FeedbackInput = <TName extends FieldPath<TForm>, TForm extends FieldValues>({
  register,
  name,
  errors,
  onDone,
}: TypedFormInputProps<TName, TForm>) => {
  const { t } = useTranslation();

  return (
    <FormInput
      as={Textarea}
      minHeight="3xs"
      label={t('feedbackInput')}
      placeholder={t('feedbackInputPlaceholder')}
      hint={t('feedbackInputHint')}
      isInvalid={errors[name] !== undefined}
      onDone={onDone}
      {...register(name, {
        required: t('feedbackInputRequired') as string,
        minLength: { value: 10, message: t('feedbackInputTooShort') },
      })}
    />
  );
};

export const RequestBodyInput = <TName extends FieldPath<TForm>, TForm extends FieldValues>({
  register,
  name,
  errors,
  onDone,
}: TypedFormInputProps<TName, TForm>) => {
  const { t } = useTranslation();
  return (
    <FormInput
      as={Textarea}
      minHeight="3xs"
      label={t('requestInput')}
      placeholder={t('requestInputPlaceholder')}
      hint={t('requestInputHint')}
      error={errors[name]?.message as string}
      isInvalid={errors[name] !== undefined}
      onDone={onDone}
      {...register(name, {
        required: t('requestInputRequired') as string,
        minLength: { value: 10, message: t('requestInputTooShort') },
      })}
    />
  );
};

export const RequestSubjectInput = <TName extends FieldPath<TForm>, TForm extends FieldValues>({
  register,
  name,
  errors,
  onDone,
}: TypedFormInputProps<TName, TForm>) => {
  const { t } = useTranslation();
  return (
    <FormInput
      label={t('subjectInput')}
      placeholder={t('subjectInputPlaceholder')}
      hint={t('subjectInputHint')}
      error={errors[name]?.message as string}
      isInvalid={errors[name] !== undefined}
      onDone={onDone}
      {...register(name, {
        required: t('subjectInputRequired') as string,
        minLength: { value: 3, message: t('subjectInputTooShort') },
        maxLength: 40,
      })}
    />
  );
};

export const TelegramInput = <TName extends FieldPath<TForm>, TForm extends FieldValues>({
  register,
  name,
  errors,
  onDone,
}: TypedFormInputProps<TName, TForm>) => {
  const { t } = useTranslation();

  return (
    <FormInput
      label={t('telegramInput')}
      placeholder={t('telegramInputPlaceholder')}
      hint={t('telegramInputHint')}
      error={errors[name]?.message as string}
      leftElement="@"
      isInvalid={errors[name] !== undefined}
      onDone={onDone}
      {...register(name, {
        required: t('telegramInputRequired') as string,
        minLength: { value: 4, message: t('telegramInputTooShort') },
        maxLength: 32,
        pattern: { value: /^[A-Za-z0-9_]+$/, message: t('telegramInputInvalid') },
      })}
    />
  );
};
