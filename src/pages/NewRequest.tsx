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
import {
  RequestBodyInput,
  RequestSubjectInput,
  TelegramInput,
} from '../components/forms/FormInput';
import Review from '../components/forms/review/Review';
import ReviewSection from '../components/forms/review/ReviewSection';

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

  const { activeStep, setActiveStep } = useSteps({
    count: 4,
  });

  // Avoid unnecessary re-renders on input
  const goToNext = useCallback(() => setActiveStep((step) => step + 1), [setActiveStep]);

  const formData = watch();

  const steps = useMemo(
    () => [t('stepTelegram'), t('stepRequestSubject'), t('stepRequestBody'), t('stepReview')],
    [t],
  );

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
            <RequestSubjectInput
              errors={formState.errors}
              onDone={goToNext}
              register={register}
              name="subject"
            />
          </Box>

          <Box display={activeStep === 2 ? 'block' : 'none'}>
            <RequestBodyInput
              errors={formState.errors}
              onDone={goToNext}
              register={register}
              name="body"
            />
          </Box>
          <Box display={activeStep === 3 ? 'block' : 'none'}>
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
                i18nPrefix="subject"
                onEdit={() => setActiveStep(1)}
                text={formData.subject}
              />
              <ReviewSection
                i18nPrefix="request"
                onEdit={() => setActiveStep(2)}
                text={formData.body}
              />
            </Review>
          </Box>
        </Box>
      </VStack>
    </>
  );
};

export default NewRequest;
