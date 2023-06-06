import { Grid, GridItem, Icon, Text, VStack } from '@chakra-ui/react';
import { MdMail, MdMeetingRoom } from 'react-icons/md';
import { BsTelegram } from 'react-icons/bs';

const Contacts = () => (
  <VStack>
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
        <Text>Room №451</Text>
      </GridItem>
    </Grid>
  </VStack>
);

export default Contacts;
