import { useCallback, useState } from 'react';
import { Button, VStack, useBoolean } from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';
import { RequestBodyInput, RequestSubjectInput, TelegramInput } from '../components/ui/FormInput';
import ErrorModal from '../components/layout/ErrorModal';
import SuccessModal from '../components/layout/SuccessModal';

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
        <VStack align="stretch" width="100%" spacing="8">
          <TelegramInput onChange={setTelegram} />
          <RequestSubjectInput onChange={setSubject} />
          <RequestBodyInput onChange={setBody} />
          <Button
            leftIcon={<MdSend />}
            alignSelf="start"
            isLoading={isLoading}
            isDisabled={!telegram || !subject || !body}
            onClick={onSend}
          >
            {t('send')}
          </Button>
        </VStack>
      </VStack>
    </>
  );
};

export default NewRequest;
