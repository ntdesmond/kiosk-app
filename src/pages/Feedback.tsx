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
import Header from '../components/layout/Header';
import ErrorModal from '../components/layout/ErrorModal';
import SuccessModal from '../components/layout/SuccessModal';
import { TelegramInput, FeedbackInput } from '../components/forms/FormInput';
import Review from '../components/forms/review/Review';
import { ReviewSectionProps } from '../components/forms/review/ReviewSection';

const Feedback = () => {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [isSuccess, { on: onSuccess }] = useBoolean();
  const [isLoading, { on: showLoading, off: hideLoading }] = useBoolean();
  const [telegram, setTelegram] = useState('');
  const [feedback, setFeedback] = useState('');

  const onSend = useCallback(() => {
    showLoading();
    window.electronAPI.sendFeedback(telegram, feedback).then((result) => {
      hideLoading();
      if (result.ok) {
        onSuccess();
        return;
      }
      setError(result.error);
    });
  }, [showLoading, telegram, feedback, hideLoading, onSuccess]);

  const { activeStep, setActiveStep, goToNext } = useSteps({
    count: 3,
  });

  const reviewEntries = useMemo<ReviewSectionProps[]>(
    () => [
      { i18nPrefix: 'telegram', text: telegram, prependText: '@', onEdit: () => setActiveStep(0) },
      { i18nPrefix: 'feedback', text: feedback, onEdit: () => setActiveStep(1) },
    ],
    [feedback, setActiveStep, telegram],
  );

  const steps = useMemo(
    () => [
      {
        title: t('stepTelegram'),
        element: <TelegramInput onDone={goToNext} defaultValue={telegram} onChange={setTelegram} />,
      },
      {
        title: t('stepFeedback'),
        element: <FeedbackInput onDone={goToNext} defaultValue={feedback} onChange={setFeedback} />,
      },
      {
        title: t('stepReview'),
        element: (
          <Review
            entries={reviewEntries}
            onSend={onSend}
            isSending={isLoading}
            isSendDisabled={!telegram || !feedback}
          />
        ),
      },
    ],
    [feedback, goToNext, isLoading, onSend, reviewEntries, t, telegram],
  );

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
              <Step key={step.title} onClick={() => setActiveStep(index)}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
          {steps[activeStep].element}
        </Box>
      </VStack>
    </>
  );
};

export default Feedback;
