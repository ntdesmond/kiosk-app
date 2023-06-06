import { useInterval, VStack, Heading, Text, Box } from '@chakra-ui/react';
import { useState, useCallback, useEffect } from 'react';

const Clock = () => {
  const [date, setDate] = useState<Date>();

  const updateDate = useCallback(() => {
    const newDate = new Date();
    if (newDate.getMinutes() !== date?.getMinutes()) {
      setDate(newDate);
    }
  }, [date]);

  useEffect(updateDate, [updateDate]);
  useInterval(updateDate, 1000);

  if (!date) {
    return <Box />;
  }

  return (
    <VStack>
      <Heading size={['xl', null, null, '2xl', '4xl']}>
        {date.toLocaleString('en', { timeStyle: 'short' })}
      </Heading>
      <Text fontSize={['md', null, null, 'xl']}>
        {date.toLocaleString('en', { dateStyle: 'full' })}
      </Text>
    </VStack>
  );
};

export default Clock;
