import { Textarea } from '@chakra-ui/react';
import { useCallback } from 'react';
import {
  FieldPath,
  FieldValues,
  UseFormRegister,
  UseFormTrigger,
  UseFormSetValue,
  FieldErrors,
  PathValue,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormInput, { FormInputProps } from './FormInput';

type TypedFormInputProps<TName extends FieldPath<TForm>, TForm extends FieldValues> = {
  name: TName;
  register: UseFormRegister<TForm>;
  trigger: UseFormTrigger<TForm>;
  setValue: UseFormSetValue<TForm>;
  errors: FieldErrors<TForm>;
} & Pick<FormInputProps, 'onDone'>;

/* eslint-disable react/jsx-props-no-spreading */

export const FeedbackInput = <TName extends FieldPath<TForm>, TForm extends FieldValues>({
  register,
  trigger,
  setValue,
  name,
  errors,
  onDone,
}: TypedFormInputProps<TName, TForm>) => {
  const { t } = useTranslation();
  const onInputChange = useCallback(
    (value: string) => {
      setValue(name, value as PathValue<TForm, TName>);
      trigger(name);
    },
    [name, setValue, trigger],
  );

  return (
    <FormInput
      as={Textarea}
      minHeight="3xs"
      label={t('feedbackInput')}
      placeholder={t('feedbackInputPlaceholder')}
      hint={t('feedbackInputHint')}
      isInvalid={errors[name] !== undefined}
      onDone={onDone}
      onInputChange={onInputChange}
      {...register(name, {
        required: t('feedbackInputRequired') as string,
        minLength: { value: 10, message: t('feedbackInputTooShort') },
      })}
    />
  );
};

export const RequestBodyInput = <TName extends FieldPath<TForm>, TForm extends FieldValues>({
  register,
  trigger,
  setValue,
  name,
  errors,
  onDone,
}: TypedFormInputProps<TName, TForm>) => {
  const { t } = useTranslation();
  const onInputChange = useCallback(
    (value: string) => {
      setValue(name, value as PathValue<TForm, TName>);
      trigger(name);
    },
    [name, setValue, trigger],
  );

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
      onInputChange={onInputChange}
      {...register(name, {
        required: t('requestInputRequired') as string,
        minLength: { value: 10, message: t('requestInputTooShort') },
      })}
    />
  );
};

export const RequestSubjectInput = <TName extends FieldPath<TForm>, TForm extends FieldValues>({
  register,
  trigger,
  setValue,
  name,
  errors,
  onDone,
}: TypedFormInputProps<TName, TForm>) => {
  const { t } = useTranslation();
  const onInputChange = useCallback(
    (value: string) => {
      setValue(name, value as PathValue<TForm, TName>);
      trigger(name);
    },
    [name, setValue, trigger],
  );
  return (
    <FormInput
      label={t('subjectInput')}
      placeholder={t('subjectInputPlaceholder')}
      hint={t('subjectInputHint')}
      error={errors[name]?.message as string}
      isInvalid={errors[name] !== undefined}
      onDone={onDone}
      onInputChange={onInputChange}
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
  trigger,
  setValue,
  name,
  errors,
  onDone,
}: TypedFormInputProps<TName, TForm>) => {
  const { t } = useTranslation();
  const onInputChange = useCallback(
    (value: string) => {
      setValue(name, value as PathValue<TForm, TName>);
      trigger(name);
    },
    [name, setValue, trigger],
  );

  return (
    <FormInput
      label={t('telegramInput')}
      placeholder={t('telegramInputPlaceholder')}
      hint={t('telegramInputHint')}
      error={errors[name]?.message as string}
      leftElement="@"
      isInvalid={errors[name] !== undefined}
      onDone={onDone}
      onInputChange={onInputChange}
      {...register(name, {
        required: t('telegramInputRequired') as string,
        minLength: { value: 4, message: t('telegramInputTooShort') },
        maxLength: 32,
        pattern: { value: /^[A-Za-z0-9_]+$/, message: t('telegramInputInvalid') },
      })}
    />
  );
};
