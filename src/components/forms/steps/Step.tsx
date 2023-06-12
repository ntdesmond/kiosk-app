import { Box } from '@chakra-ui/react';
import { ReactNode, memo } from 'react';

export interface StepProps {
  // title is used by parent <Steps> component
  // eslint-disable-next-line react/no-unused-prop-types
  title: string;
  isShown: boolean;
  children: ReactNode;
}

const Step = memo(({ children, isShown }: StepProps) => (
  <Box display={isShown ? 'block' : 'none'}>{children}</Box>
));

export default Step;
