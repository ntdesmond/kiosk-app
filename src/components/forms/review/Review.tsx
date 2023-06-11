import { Button, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdSend } from 'react-icons/md';
import ReviewSection, { ReviewSectionProps } from './ReviewSection';

interface ReviewProps {
  entries: ReviewSectionProps[];
  onSend: () => void;
  isSending: boolean;
  isSendDisabled: boolean;
}

const Review = ({ entries, onSend, isSendDisabled, isSending }: ReviewProps) => {
  const { t } = useTranslation();
  return (
    <VStack align="stretch" spacing="10">
      {entries.map((entry) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <ReviewSection key={entry.i18nPrefix} {...entry} />
      ))}

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
