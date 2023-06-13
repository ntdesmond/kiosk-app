import { Button, ButtonProps, GridItem, GridItemProps, forwardRef } from '@chakra-ui/react';

export type KeyProps = GridItemProps & ButtonProps;

const Key = forwardRef<KeyProps, 'div'>(
  ({ colorScheme, children, onClick, bgColor, ...props }, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <GridItem minHeight={[10, null, null, 16]} {...props} ref={ref}>
      <Button
        // remove hover effect
        _hover={{ bg: '' }}
        // clickable overlay over corners
        _before={{ content: `""`, position: 'absolute', inset: 0 }}
        width="100%"
        height="100%"
        fontSize={['xl', null, null, '4xl']}
        outline="0.15em solid"
        outlineColor="white"
        outlineOffset="-0.1em"
        borderRadius="xl"
        {...{ onClick, colorScheme, bgColor }}
      >
        {children}
      </Button>
    </GridItem>
  ),
);

export default Key;
