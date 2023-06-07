import { useCallback, useState } from 'react';
import { Button, VStack, useBoolean } from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { FeedbackInput, TelegramInput } from '../components/ui/FormInput';
import Header from '../components/layout/Header';
import ErrorModal from '../components/layout/ErrorModal';
import SuccessModal from '../components/layout/SuccessModal';

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
        <VStack align="stretch" width="100%" spacing="8">
          <TelegramInput onChange={setTelegram} />
          <FeedbackInput onChange={setFeedback} />
          <Button
            leftIcon={<MdSend />}
            alignSelf="start"
            isLoading={isLoading}
            isDisabled={!telegram || !feedback}
            onClick={onSend}
          >
            {t('send')}
          </Button>
        </VStack>
      </VStack>
    </>
  );
};

export default Feedback;
