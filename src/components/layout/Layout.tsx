import { Box, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import InactivityModal from '../inactivity/InactivityModal';

const Layout = () => (
  <InactivityModal defaultSeconds={120}>
    {(resetTimeout) => (
      <VStack
        height="100%"
        alignItems="stretch"
        paddingX="16"
        paddingY="10"
        spacing="10"
        onPointerMove={resetTimeout}
        onPointerDown={resetTimeout}
      >
        <Box flex="1" minHeight="0">
          <Outlet />
        </Box>
        <Footer />
      </VStack>
    )}
  </InactivityModal>
);

export default Layout;
