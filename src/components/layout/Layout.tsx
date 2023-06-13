import { useCallback, useEffect, useRef } from 'react';
import { Box, VStack, useDisclosure } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from './footer/Footer';
import InactivityModal from './InactivityModal';

const inactiveTimeout = 120 * 1000;

const Layout = () => {
  const { pathname } = useLocation();
  const {
    isOpen: isInactive,
    onOpen: showInactivityModal,
    onClose: closeInactivityModal,
  } = useDisclosure();
  const timeoutId = useRef<NodeJS.Timeout>();

  const enableTimeout = useCallback(() => {
    timeoutId.current = setTimeout(showInactivityModal, inactiveTimeout);
  }, [showInactivityModal]);

  const disableTimeout = useCallback(() => {
    clearTimeout(timeoutId.current);
  }, []);

  useEffect(() => {
    if (!isInactive && pathname !== '/') {
      enableTimeout();
    }
    return disableTimeout;
  }, [disableTimeout, enableTimeout, isInactive, pathname]);

  const resetTimeout = useCallback(() => {
    disableTimeout();
    enableTimeout();
  }, [disableTimeout, enableTimeout]);

  return (
    <>
      <InactivityModal isOpen={isInactive} onClose={closeInactivityModal} />
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
    </>
  );
};

export default Layout;
