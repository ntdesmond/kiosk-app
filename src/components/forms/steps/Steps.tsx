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
  VStack,
  useSteps,
} from '@chakra-ui/react';
import { ReactElement, useCallback, useMemo } from 'react';
import { StepProps } from './Step';
import StepsContext from './StepsContext';

interface StepsProps {
  children: ReactElement<StepProps>[];
}

const Steps = ({ children }: StepsProps) => {
  const { activeStep, setActiveStep } = useSteps({
    count: children.length,
  });

  // Avoid unnecessary re-renders on input
  const goToNext = useCallback(() => setActiveStep((step) => step + 1), [setActiveStep]);

  const contextValue = useMemo(
    () => ({ activeStepTitle: children[activeStep].props.title, setActiveStep, goToNext }),
    [activeStep, children, goToNext, setActiveStep],
  );

  return (
    <VStack align="stretch" spacing={10} height="100%">
      <StepsContext.Provider value={contextValue}>
        <Stepper index={activeStep}>
          {children.map((step, index) => (
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
        {children}
      </StepsContext.Provider>
    </VStack>
  );
};

export default Steps;
