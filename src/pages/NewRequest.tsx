import { useCallback, useState } from 'react';
import { Box, VStack, useBoolean } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import Header from '../components/layout/Header';
import ErrorModal from '../components/layout/ErrorModal';
import SuccessModal from '../components/layout/SuccessModal';
import {
  RequestBodyInput,
  RequestSubjectInput,
  TelegramInput,
} from '../components/forms/FormInput';
import Review from '../components/forms/review/Review';
import ReviewSection from '../components/forms/review/ReviewSection';
import Steps from '../components/forms/steps/Steps';
import Step from '../components/forms/steps/Step';

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

  const { register, handleSubmit, watch, formState } = useForm<RequestForm>({ mode: 'onChange' });

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
      <VStack spacing="8">
        <Header title={t('newRequestTitle')} />
        <Box alignSelf="stretch">
          <Steps>
            {({ goToNext, isShown }) => (
              <Step isShown={isShown} title={t('stepTelegram')}>
                <TelegramInput
                  errors={formState.errors}
                  onDone={goToNext}
                  register={register}
                  name="telegram"
                />
              </Step>
            )}
            {({ goToNext, isShown }) => (
              <Step isShown={isShown} title={t('stepRequestSubject')}>
                <RequestSubjectInput
                  errors={formState.errors}
                  onDone={goToNext}
                  register={register}
                  name="subject"
                />
              </Step>
            )}
            {({ goToNext, isShown }) => (
              <Step isShown={isShown} title={t('stepRequestBody')}>
                <RequestBodyInput
                  errors={formState.errors}
                  onDone={goToNext}
                  register={register}
                  name="body"
                />
              </Step>
            )}
            {({ goTo, isShown }) => (
              <Step isShown={isShown} title={t('stepReview')}>
                <Review
                  onSend={handleSubmit(onSend)}
                  isSending={isLoading}
                  isSendDisabled={!formState.isValid}
                >
                  <ReviewSection
                    i18nPrefix="telegram"
                    prependText="@"
                    onEdit={() => goTo(0)}
                    text={formData.telegram}
                  />
                  <ReviewSection
                    i18nPrefix="subject"
                    onEdit={() => goTo(1)}
                    text={formData.subject}
                  />
                  <ReviewSection i18nPrefix="request" onEdit={() => goTo(2)} text={formData.body} />
                </Review>
              </Step>
            )}
          </Steps>
        </Box>
      </VStack>
    </>
  );
};

export default NewRequest;
