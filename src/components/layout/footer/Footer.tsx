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
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import BotQR from './BotQR';

const Footer = () => (
  <HStack justify="space-between">
    <VStack>
      <BotQR />
      <Text fontFamily="mono">@ITHelpFAQ_bot</Text>
    </VStack>
    <VStack>
      <Heading size="4xl">12:34</Heading>
      <Text fontSize="xl">Friday, 12 May</Text>
    </VStack>
    <Menu>
      <MenuButton as={Button} variant="outline" rightIcon={<Icon boxSize="5" as={BiChevronDown} />}>
        Language
      </MenuButton>
      <MenuList>
        <MenuItem>English</MenuItem>
        <MenuItem>Russian</MenuItem>
      </MenuList>
    </Menu>
  </HStack>
);

export default Footer;
