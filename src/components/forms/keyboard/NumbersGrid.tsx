import { Grid } from '@chakra-ui/react';
import Key from './Key';

const NumbersGrid = ({ appendChar }: { appendChar: (char: string) => void }) => (
  <Grid templateColumns="repeat(3, 1fr)" templateRows="repeat(4, 1fr)" gridAutoFlow="row dense">
    <Key onClick={() => appendChar('0')} rowStart={4} colSpan={2}>
      0
    </Key>
    {[...'123456789.'].map((letter) => (
      <Key onClick={() => appendChar(letter)} key="letter">
        {letter}
      </Key>
    ))}
  </Grid>
);

export default NumbersGrid;
