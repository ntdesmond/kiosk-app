import { Grid, GridItem } from '@chakra-ui/react';
import { MdCreate, MdFeedback, MdOutlineContactPage, MdQuestionAnswer } from 'react-icons/md';
import MenuTile from './components/MenuTile';

const Menu = () => (
  <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(2, 1fr)" gap="10" height="100%">
    <GridItem colSpan={2}>
      <MenuTile caption="Frequently asked questions" icon={MdQuestionAnswer} target="/faq" />
    </GridItem>
    <GridItem colSpan={2}>
      <MenuTile caption="New request" icon={MdCreate} target="/new" />
    </GridItem>
    <GridItem>
      <MenuTile caption="Contact us" icon={MdOutlineContactPage} target="/contact" />
    </GridItem>
    <GridItem>
      <MenuTile caption="Leave feedback" icon={MdFeedback} target="/feedback" />
    </GridItem>
  </Grid>
);

export default Menu;
