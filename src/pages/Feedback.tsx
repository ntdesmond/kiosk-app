import { useCallback, useMemo, useState } from 'react';
import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  VStack,
  useBoolean,
  useSteps,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import Header from '../components/layout/Header';
import ErrorModal from '../components/layout/ErrorModal';
import SuccessModal from '../components/layout/SuccessModal';
import { TelegramInput, FeedbackInput } from '../components/forms/FormInput';
import Review from '../components/forms/review/Review';
import ReviewSection from '../components/forms/review/ReviewSection';

interface FeedbackForm {
  telegram: string;
  feedback: string;
}

const Feedback = () => {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [isSuccess, { on: onSuccess }] = useBoolean();
  const [isLoading, { on: showLoading, off: hideLoading }] = useBoolean();

  const { register, handleSubmit, watch, formState } = useForm<FeedbackForm>({ mode: 'onChange' });

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

  const { activeStep, setActiveStep } = useSteps({
    count: 3,
  });

  // Avoid unnecessary re-renders on input
  const goToNext = useCallback(() => setActiveStep((step) => step + 1), [setActiveStep]);

  const formData = watch();

  const steps = useMemo(() => [t('stepTelegram'), t('stepFeedback'), t('stepReview')], [t]);

  return (
    <>
      <SuccessModal isOpen={isSuccess} i18nPrefix="feedback" />
      <ErrorModal
        isOpen={error !== ''}
        error={error}
        onClose={() => setError('')}
        i18nPrefix="feedback"
      />
      <VStack spacing="8">
        <Header title={t('feedbackTitle')} />
        <Box alignSelf="stretch">
          <Stepper index={activeStep} marginBottom="10">
            {steps.map((step, index) => (
              <Step key={step} onClick={() => setActiveStep(index)}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink="0">
                  <StepTitle>{step}</StepTitle>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>

          <Box display={activeStep === 0 ? 'block' : 'none'}>
            <TelegramInput
              errors={formState.errors}
              onDone={goToNext}
              register={register}
              name="telegram"
            />
          </Box>

          <Box display={activeStep === 1 ? 'block' : 'none'}>
            <FeedbackInput
              errors={formState.errors}
              onDone={goToNext}
              register={register}
              name="feedback"
            />
          </Box>
          <Box display={activeStep === 2 ? 'block' : 'none'}>
            <Review
              onSend={handleSubmit(onSend)}
              isSending={isLoading}
              isSendDisabled={!formState.isValid}
            >
              <ReviewSection
                i18nPrefix="telegram"
                prependText="@"
                onEdit={() => setActiveStep(0)}
                text={formData.telegram}
              />
              <ReviewSection
                i18nPrefix="feedback"
                onEdit={() => setActiveStep(1)}
                text={formData.feedback}
              />
            </Review>
          </Box>
        </Box>
      </VStack>
    </>
  );
};

export default Feedback;
