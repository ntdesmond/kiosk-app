import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import { ReactElement, useCallback, useMemo } from 'react';
import { StepProps } from './Step';

interface StepsRenderProps {
  goToNext: () => void;
  goTo: (step: number) => void;
  isShown: boolean;
}

interface StepsProps {
  children: ((props: StepsRenderProps) => ReactElement<StepProps>)[];
}

const Steps = ({ children }: StepsProps) => {
  const { activeStep, setActiveStep } = useSteps({
    count: children.length,
  });

  // Avoid unnecessary re-renders on input
  const goToNext = useCallback(() => setActiveStep((step) => step + 1), [setActiveStep]);

  const steps = useMemo(
    () =>
      children.map((child, index) =>
        child({ goToNext, goTo: setActiveStep, isShown: index === activeStep }),
      ),
    [children, goToNext, setActiveStep, activeStep],
  );

  return (
    <>
      <Stepper index={activeStep} marginBottom="10">
        {steps.map((step, index) => (
          <Step key={step.props.title} onClick={() => setActiveStep(index)}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>{step.props.title}</StepTitle>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      {steps}
    </>
  );
};

export default Steps;
