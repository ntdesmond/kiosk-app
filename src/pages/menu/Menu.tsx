import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, GridItem } from '@chakra-ui/react';
import { MdCreate, MdFeedback, MdOutlineContactPage, MdQuestionAnswer } from 'react-icons/md';
import MenuTile from './components/MenuTile';
import InactivityContext from '../../components/inactivity/InactivityContext';

const Menu = () => {
  const { t } = useTranslation();
  const { resetInactivityTimeout, disableInactivityTimeout } = useContext(InactivityContext);

  useEffect(() => {
    disableInactivityTimeout();
    return resetInactivityTimeout;
  }, [disableInactivityTimeout, resetInactivityTimeout]);

  return (
    <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(2, 1fr)" gap="10" height="100%">
      <GridItem colSpan={2}>
        <MenuTile caption={t('manuals')} icon={MdQuestionAnswer} target="/manuals" isLarge />
      </GridItem>
      <GridItem colSpan={2}>
        <MenuTile caption={t('newRequest')} icon={MdCreate} target="/request" isLarge />
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
