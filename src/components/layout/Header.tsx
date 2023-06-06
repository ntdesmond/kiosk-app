import { HStack, Heading, Icon, IconButton } from '@chakra-ui/react';
import { useCallback } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Header = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  const goBack = useCallback(() => navigate(-1), [navigate]);

  return (
    <HStack width="100%">
      <IconButton
        aspectRatio="1"
        height="fit-content"
        onClick={goBack}
        icon={<Icon as={MdArrowBack} boxSize={[8, null, null, 16, 20, 24]} />}
        aria-label="Go Back"
      />
      <Heading flex="1" textAlign="center" size={['md', null, null, 'lg', 'xl']}>
        {title}
      </Heading>
    </HStack>
  );
};

export default Header;
