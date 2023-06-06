import { HStack, Text, VStack } from '@chakra-ui/react';
import BotQR from './BotQR';
import Clock from './Clock';
import LanguageMenu from './LanguageMenu';

const Footer = () => (
  <HStack justify="space-between">
    <VStack>
      <BotQR />
      <Text fontFamily="mono">@ITHelpFAQ_bot</Text>
    </VStack>
    <Clock />
    <LanguageMenu />
  </HStack>
);

export default Footer;
