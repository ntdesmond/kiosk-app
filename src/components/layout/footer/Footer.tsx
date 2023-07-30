import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import BotQR from './BotQR';
import Clock from './Clock';
import LanguageMenu from './LanguageMenu';
import Version from './Version';

const Footer = () => (
  <HStack justify="space-between">
    <VStack>
      <BotQR />
      <Text fontFamily="mono">@ITHelpFAQ_bot</Text>
    </VStack>
    <Clock />
    <LanguageMenu />
    <Box position="absolute" bottom="0" right="0">
      <Version />
    </Box>
  </HStack>
);

export default Footer;
