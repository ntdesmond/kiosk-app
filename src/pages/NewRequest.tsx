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
import {
  TelegramInput,
  RequestSubjectInput,
  RequestBodyInput,
} from '../components/forms/FormInput';
import Review from '../components/forms/review/Review';
import { ReviewSectionProps } from '../components/forms/review/ReviewSection';

const NewRequest = () => {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [isSuccess, { on: onSuccess }] = useBoolean();
  const [isLoading, { on: showLoading, off: hideLoading }] = useBoolean();

  const [telegram, setTelegram] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const onSend = useCallback(() => {
    showLoading();
    window.electronAPI.sendRequest(telegram, subject, body).then((result) => {
      hideLoading();
      if (result.ok) {
        onSuccess();
        return;
      }
      setError(result.error);
    });
  }, [showLoading, telegram, subject, body, hideLoading, onSuccess]);

  const { activeStep, setActiveStep } = useSteps({
    index: 2,
    count: 4,
  });

  const reviewEntries = useMemo<ReviewSectionProps[]>(
    () => [
      { i18nPrefix: 'telegram', text: telegram, prependText: '@', onEdit: () => setActiveStep(0) },
      { i18nPrefix: 'subject', text: subject, onEdit: () => setActiveStep(1) },
      { i18nPrefix: 'request', text: body, onEdit: () => setActiveStep(2) },
    ],
    [body, setActiveStep, subject, telegram],
  );

  const steps = useMemo(
    () => [
      {
        title: 'Telegram',
        element: <TelegramInput defaultValue={telegram} onChange={setTelegram} />,
      },
      {
        title: 'Subject',
        element: <RequestSubjectInput defaultValue={subject} onChange={setSubject} />,
      },
      { title: 'Details', element: <RequestBodyInput defaultValue={body} onChange={setBody} /> },
      {
        title: 'Review and send',
        element: (
          <Review
            entries={reviewEntries}
            onSend={onSend}
            isSending={isLoading}
            isSendDisabled={!telegram || !subject || !body}
          />
        ),
      },
    ],
    [body, isLoading, onSend, reviewEntries, subject, telegram],
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

export default NewRequest;
