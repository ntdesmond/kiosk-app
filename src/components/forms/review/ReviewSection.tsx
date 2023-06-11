import { Button, HStack, Heading, Text, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MdEdit } from 'react-icons/md';

export interface ReviewSectionProps {
  i18nPrefix: string;
  text: string;
  onEdit: () => void;
}

const ReviewSection = ({ text, i18nPrefix, onEdit }: ReviewSectionProps) => {
  const { t } = useTranslation();
  const label = useMemo(() => t(`${i18nPrefix}Input`), [i18nPrefix, t]);

  return (
    <VStack align="stretch">
      <HStack>
        <Heading size="md">{label}</Heading>
        <Button leftIcon={<MdEdit />} onClick={onEdit}>
          {t('reviewEdit')}
        </Button>
      </HStack>
      {text ? <Text>{text}</Text> : <Text color="red">{t('reviewFieldEmpty')}</Text>}
    </VStack>
  );
};

export default ReviewSection;
