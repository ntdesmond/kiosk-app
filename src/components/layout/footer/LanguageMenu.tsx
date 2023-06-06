import { useTranslation } from 'react-i18next';
import { Menu, MenuItem, MenuButton, Button, Icon, MenuList, HStack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { MdDone } from 'react-icons/md';
import FlagImage from '../../ui/FlagImage';

const languages = {
  en: 'English',
  ru: 'Русский',
};

const LanguageMenu = () => {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();

  const entries = useMemo(
    () =>
      Object.entries(languages).map(([code, lang]) => (
        <MenuItem icon={<FlagImage code={code} />} key={code} onClick={() => changeLanguage(code)}>
          <HStack justify="space-between">
            <Text>{lang}</Text>
            {code === language && <Icon as={MdDone} />}
          </HStack>
        </MenuItem>
      )),
    [changeLanguage, language],
  );

  return (
    <Menu placement="top" autoSelect={false}>
      <MenuButton
        as={Button}
        variant="outline"
        leftIcon={<FlagImage code={language} />}
        rightIcon={<Icon boxSize="5" as={BiChevronDown} />}
        minWidth="40"
      >
        {languages[language as keyof typeof languages]}
      </MenuButton>
      <MenuList borderColor="currentcolor" color="green.600" minWidth="40">
        {entries}
      </MenuList>
    </Menu>
  );
};

export default LanguageMenu;
