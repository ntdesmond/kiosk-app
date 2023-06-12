import { createContext } from 'react';

const StepsContext = createContext({
  activeStepTitle: '',
  setActiveStep: (_step: number) => {},
  goToNext: () => {},
});

export default StepsContext;
