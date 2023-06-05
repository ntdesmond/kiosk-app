import { Box, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';

const Layout = () => (
  <VStack height="100%" alignItems="stretch" paddingX="16" paddingY="10" spacing="10">
    <Box flex="1">
      <Outlet />
    </Box>
    <Footer />
  </VStack>
);

export default Layout;
