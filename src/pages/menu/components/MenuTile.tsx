import {
  Card,
  CardBody,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  SystemStyleObject,
  VStack,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Link as RouteLink } from 'react-router-dom';

export interface MenuTileProps {
  caption: string;
  icon: IconType;
  target: string;
  isDisabled?: boolean;
  isLarge?: boolean;
}

const disabledOverlay: SystemStyleObject = {
  content: `""`,
  position: 'absolute',
  inset: '0',
  zIndex: '1',
  bgColor: 'rgba(255, 255, 255, 0.5)',
};

const MenuTile = ({ caption, icon, target, isDisabled, isLarge }: MenuTileProps) => (
  <LinkBox height="100%" _before={isDisabled ? disabledOverlay : undefined}>
    <Card size="lg" variant="filled" bgColor="green.main" color="white" height="100%">
      <CardBody>
        <VStack justify="center" height="100%">
          <Icon as={icon} boxSize={{ base: 24, lg: 72 }} maxWidth="50%" />
          <LinkOverlay as={RouteLink} to={target} draggable={false}>
            <Heading
              size={{ base: 'md', lg: isLarge ? '2xl' : 'xl' }}
              textTransform="uppercase"
              textAlign="center"
            >
              {caption}
            </Heading>
          </LinkOverlay>
        </VStack>
      </CardBody>
    </Card>
  </LinkBox>
);

export default MenuTile;
