import { Grid, GridItem, Icon, Text, VStack } from '@chakra-ui/react';
import { MdMail, MdMeetingRoom } from 'react-icons/md';
import { BsTelegram } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import Header from '../components/layout/Header';

const Contacts = () => {
  const { t } = useTranslation();
  return (
    <VStack>
      <Header title={t('contactTitle')} />
      <Grid
        width="fit-content"
        templateColumns="2em auto"
        fontSize={['4xl', null, null, '6xl', '8xl']}
        fontFamily="mono"
      >
        <GridItem>
          <Icon color="green.600" as={BsTelegram} boxSize={[14, null, null, 24, 36]} />
        </GridItem>
        <GridItem>
          <Text>@iuithelp</Text>
        </GridItem>
        <GridItem>
          <Icon color="green.600" as={MdMail} boxSize={[14, null, null, 24, 36]} />
        </GridItem>
        <GridItem>
          <Text>it@innopolis.ru</Text>
        </GridItem>
        <GridItem>
          <Icon color="green.600" as={MdMeetingRoom} boxSize={[14, null, null, 24, 36]} />
        </GridItem>
        <GridItem>
          <Text>{t('room')} №451</Text>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Contacts;
