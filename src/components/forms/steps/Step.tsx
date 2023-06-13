import { Box } from '@chakra-ui/react';
import { ReactNode, memo, useContext, useMemo } from 'react';
import StepsContext from './StepsContext';

export interface StepRenderProps {
  goToNext: () => void;
  goTo: (step: number) => void;
}

export interface StepProps {
  title: string;
  children: ((props: StepRenderProps) => ReactNode) | ReactNode;
}

const Step = memo(({ children, title }: StepProps) => {
  const { goToNext, setActiveStep, activeStepTitle } = useContext(StepsContext);

  const content = useMemo(() => {
    if (typeof children === 'function') {
      return children({ goToNext, goTo: setActiveStep });
    }
    return children;
  }, [children, goToNext, setActiveStep]);

  return (
    <Box display={activeStepTitle === title ? 'block' : 'none'} minHeight="0">
      {content}
    </Box>
  );
});

export default Step;
