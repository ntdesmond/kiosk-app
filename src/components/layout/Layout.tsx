import { Box, Card, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <VStack height="100%" alignItems="stretch" padding="16">
    <Box flex="1">
      <Outlet />
    </Box>
    <Card variant="filled" height="36" />
  </VStack>
);

export default Layout;
