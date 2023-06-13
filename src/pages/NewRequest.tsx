import { useCallback, useState } from 'react';
import { Box, VStack, useBoolean } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import Header from '../components/layout/Header';
import ErrorModal from '../components/forms/modals/ErrorModal';
import SuccessModal from '../components/forms/modals/SuccessModal';
import Review from '../components/forms/review/Review';
import ReviewSection from '../components/forms/review/ReviewSection';
import Steps from '../components/forms/steps/Steps';
import Step from '../components/forms/steps/Step';
import {
  TelegramInput,
  RequestSubjectInput,
  RequestBodyInput,
} from '../components/forms/TypedFormInput';

interface RequestForm {
  telegram: string;
  subject: string;
  body: string;
}

const NewRequest = () => {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [isSuccess, { on: onSuccess }] = useBoolean();
  const [isLoading, { on: showLoading, off: hideLoading }] = useBoolean();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { isValid: isFormValid, errors },
  } = useForm<RequestForm>({
    mode: 'onChange',
  });

  const onSend = useCallback<SubmitHandler<RequestForm>>(
    ({ telegram, subject, body }) => {
      showLoading();
      window.electronAPI.sendRequest(telegram, subject, body).then((result) => {
        hideLoading();
        if (result.ok) {
          onSuccess();
          return;
        }
        setError(result.error);
      });
    },
    [showLoading, hideLoading, onSuccess],
  );

  const formData = watch();

  return (
    <>
      <SuccessModal isOpen={isSuccess} i18nPrefix="newRequest" />
      <ErrorModal
        isOpen={error !== ''}
        error={error}
        onClose={() => setError('')}
        i18nPrefix="newRequest"
      />
      <VStack spacing="8" height="100%">
        <Header title={t('newRequestTitle')} />
        <Box alignSelf="stretch" minHeight="0">
          <Steps>
            <Step title={t('stepTelegram')}>
              {({ goToNext }) => (
                <TelegramInput
                  onDone={goToNext}
                  name="telegram"
                  {...{ register, trigger, setValue, errors }}
                />
              )}
            </Step>
            <Step title={t('stepRequestSubject')}>
              {({ goToNext }) => (
                <RequestSubjectInput
                  onDone={goToNext}
                  name="subject"
                  {...{ register, trigger, setValue, errors }}
                />
              )}
            </Step>
            <Step title={t('stepRequestBody')}>
              {({ goToNext }) => (
                <RequestBodyInput
                  onDone={goToNext}
                  name="body"
                  {...{ register, trigger, setValue, errors }}
                />
              )}
            </Step>
            <Step title={t('stepReview')}>
              {({ goTo }) => (
                <Review
                  onSend={handleSubmit(onSend)}
                  isSending={isLoading}
                  isSendDisabled={!isFormValid}
                >
                  <ReviewSection
                    i18nPrefix="telegram"
                    error={errors.telegram?.message}
                    prependText="@"
                    onEdit={() => goTo(0)}
                    text={formData.telegram}
                  />
                  <ReviewSection
                    i18nPrefix="subject"
                    error={errors.subject?.message}
                    onEdit={() => goTo(1)}
                    text={formData.subject}
                  />
                  <ReviewSection
                    i18nPrefix="request"
                    error={errors.body?.message}
                    onEdit={() => goTo(2)}
                    text={formData.body}
                  />
                </Review>
              )}
            </Step>
          </Steps>
        </Box>
      </VStack>
    </>
  );
};

export default NewRequest;
