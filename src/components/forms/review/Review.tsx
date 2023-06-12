import { ReactElement } from 'react';
import { Button, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdSend } from 'react-icons/md';
import { ReviewSectionProps } from './ReviewSection';

interface ReviewProps {
  children: ReactElement<ReviewSectionProps>[];
  onSend: () => void;
  isSending: boolean;
  isSendDisabled: boolean;
}

const Review = ({ children, onSend, isSendDisabled, isSending }: ReviewProps) => {
  const { t } = useTranslation();
  return (
    <VStack align="stretch" spacing="10">
      {children}
      <Button
        leftIcon={<MdSend />}
        alignSelf="start"
        isLoading={isSending}
        isDisabled={isSendDisabled}
        onClick={onSend}
      >
        {t('reviewSend')}
      </Button>
    </VStack>
  );
};

export default Review;
