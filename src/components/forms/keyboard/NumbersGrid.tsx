import { Grid } from '@chakra-ui/react';
import Key from './Key';

const NumbersGrid = () => (
  <Grid
    gap={2}
    templateColumns="repeat(3, 1fr)"
    templateRows="repeat(4, 1fr)"
    gridAutoFlow="row dense"
  >
    <Key rowStart={4} colSpan={2}>
      0
    </Key>
    {[...'123456789.'].map((letter) => (
      <Key key="letter">{letter}</Key>
    ))}
  </Grid>
);

export default NumbersGrid;
