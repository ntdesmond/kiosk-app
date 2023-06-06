import { useTranslation } from 'react-i18next';
import { Grid, GridItem } from '@chakra-ui/react';
import { MdCreate, MdFeedback, MdOutlineContactPage, MdQuestionAnswer } from 'react-icons/md';
import MenuTile from './components/MenuTile';

const Menu = () => {
  const { t } = useTranslation();

  return (
    <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(2, 1fr)" gap="10" height="100%">
      <GridItem colSpan={2}>
        <MenuTile caption={t('faq')} icon={MdQuestionAnswer} target="/faq" />
      </GridItem>
      <GridItem colSpan={2}>
        <MenuTile caption={t('newRequest')} icon={MdCreate} target="/request" />
      </GridItem>
      <GridItem>
        <MenuTile caption={t('contact')} icon={MdOutlineContactPage} target="/contact" />
      </GridItem>
      <GridItem>
        <MenuTile caption={t('feedback')} icon={MdFeedback} target="/feedback" />
      </GridItem>
    </Grid>
  );
};

export default Menu;
