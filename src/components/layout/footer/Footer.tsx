import { useState, useCallback, useEffect } from 'react';
import {
  Button,
  HStack,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useInterval,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import BotQR from './BotQR';

const Footer = () => {
  const [date, setDate] = useState<Date>();

  const updateDate = useCallback(() => {
    const newDate = new Date();
    if (newDate.getMinutes() !== date?.getMinutes()) {
      setDate(newDate);
    }
  }, [date]);

  useEffect(updateDate, [updateDate]);
  useInterval(updateDate, 1000);

  return (
    <HStack justify="space-between">
      <VStack>
        <BotQR />
        <Text fontFamily="mono">@ITHelpFAQ_bot</Text>
      </VStack>
      {date && (
        <VStack>
          <Heading size={['xl', null, null, '2xl', '4xl']}>
            {date.toLocaleString('en', { timeStyle: 'short' })}
          </Heading>
          <Text fontSize={['md', null, null, 'xl']}>
            {date.toLocaleString('en', { dateStyle: 'full' })}
          </Text>
        </VStack>
      )}
      <Menu>
        <MenuButton
          as={Button}
          variant="outline"
          rightIcon={<Icon boxSize="5" as={BiChevronDown} />}
        >
          Language
        </MenuButton>
        <MenuList>
          <MenuItem>English</MenuItem>
          <MenuItem>Russian</MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default Footer;
