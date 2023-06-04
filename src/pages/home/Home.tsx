import { Box, Card, CardBody, Flex, Heading, Link, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import ViteIcon from './vite.svg';

const MotionBox = motion(Box);

const Home = () => (
  <Flex alignItems="center" direction="column" height="100%">
    <Box as="header" padding="4" alignSelf="start">
      Web application template
    </Box>
    <VStack flex="1" justifyContent="center" gap="10">
      <Card borderRadius="xl">
        <CardBody>
          <Heading>Hello world!</Heading>
        </CardBody>
      </Card>
      <MotionBox
        animate={{
          x: ['-100%', '-100%', '100%', '100%', '-100%'],
          rotateY: [0, 180, 180, 0, 0],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Box fontSize="8xl" lineHeight="1" position="relative">
          <Box fontFamily="'Noto Color Emoji', sans-serif">🐳</Box>
          <Box
            position="absolute"
            bottom="0"
            right="0"
            width="0.5em"
            height="0.5em"
            background={`url(${ViteIcon}) center/cover no-repeat`}
          />
        </Box>
      </MotionBox>
    </VStack>
    <Box as="footer">
      Source code is available at{' '}
      <Link color="teal.400" href="https://github.com/ntdesmond/chakra-react-ts-vite">
        GitHub
      </Link>
      !
    </Box>
  </Flex>
);

export default Home;
