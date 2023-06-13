import { Alert, AlertIcon, Button, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MdEdit } from 'react-icons/md';

export interface ReviewSectionProps {
  i18nPrefix: string;
  text: string;
  error?: string;
  onEdit: () => void;
  prependText?: string;
}

const ReviewSection = ({ text, error, i18nPrefix, onEdit, prependText }: ReviewSectionProps) => {
  const { t } = useTranslation();
  const label = useMemo(() => t(`${i18nPrefix}Input`), [i18nPrefix, t]);

  const errorText = useMemo(() => {
    if (text) {
      return error;
    }
    return t(`${i18nPrefix}InputRequired`);
  }, [error, i18nPrefix, t, text]);

  return (
    <VStack align="stretch" minHeight={20}>
      <HStack>
        <Heading size="md">{label}</Heading>
        <Button leftIcon={<MdEdit />} onClick={onEdit}>
          {t('reviewEdit')}
        </Button>
      </HStack>
      {text ? (
        <Text whiteSpace="pre-line" minHeight="0" overflowY="auto">
          {prependText}
          {text}
        </Text>
      ) : (
        <Text color="gray">{t('reviewFieldEmpty')}</Text>
      )}
      {errorText && (
        <Alert variant="left-accent" status="error">
          <AlertIcon />
          {errorText}
        </Alert>
      )}
    </VStack>
  );
};

export default ReviewSection;
