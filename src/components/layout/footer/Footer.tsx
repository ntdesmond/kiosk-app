import {
  Button,
  HStack,
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
import Clock from './Clock';

const Footer = () => (
  <HStack justify="space-between">
    <VStack>
      <BotQR />
      <Text fontFamily="mono">@ITHelpFAQ_bot</Text>
    </VStack>
    <Clock />
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
