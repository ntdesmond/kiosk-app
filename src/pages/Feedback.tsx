import { useCallback, useState } from 'react';
import { Box, VStack, useBoolean } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import Header from '../components/layout/Header';
import ErrorModal from '../components/layout/ErrorModal';
import SuccessModal from '../components/layout/SuccessModal';
import Review from '../components/forms/review/Review';
import ReviewSection from '../components/forms/review/ReviewSection';
import Steps from '../components/forms/steps/Steps';
import Step from '../components/forms/steps/Step';
import { TelegramInput, FeedbackInput } from '../components/forms/TypedFormInput';

interface FeedbackForm {
  telegram: string;
  feedback: string;
}

const Feedback = () => {
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
  } = useForm<FeedbackForm>({ mode: 'onChange' });

  const onSend = useCallback<SubmitHandler<FeedbackForm>>(
    ({ telegram, feedback }) => {
      showLoading();
      window.electronAPI.sendFeedback(telegram, feedback).then((result) => {
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
      <SuccessModal isOpen={isSuccess} i18nPrefix="feedback" />
      <ErrorModal
        isOpen={error !== ''}
        error={error}
        onClose={() => setError('')}
        i18nPrefix="feedback"
      />
      <VStack spacing="8" height="100%">
        <Header title={t('feedbackTitle')} />
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
            <Step title={t('stepFeedback')}>
              {({ goToNext }) => (
                <FeedbackInput
                  onDone={goToNext}
                  name="feedback"
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
                    prependText="@"
                    onEdit={() => goTo(0)}
                    text={formData.telegram}
                  />
                  <ReviewSection
                    i18nPrefix="feedback"
                    onEdit={() => goTo(1)}
                    text={formData.feedback}
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

export default Feedback;
