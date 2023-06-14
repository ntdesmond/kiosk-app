import { createContext } from 'react';

const InactivityContext = createContext({
  setInactivityTimeout: (_seconds: number) => {},
  resetInactivityTimeout: () => {},
  disableInactivityTimeout: () => {},
});

export default InactivityContext;
