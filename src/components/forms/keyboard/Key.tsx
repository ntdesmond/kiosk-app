import { Button, ButtonProps, GridItem, GridItemProps, forwardRef } from '@chakra-ui/react';

export type KeyProps = GridItemProps & ButtonProps;

const Key = forwardRef<KeyProps, 'div'>(
  ({ colorScheme, children, onClick, bgColor, ...props }, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <GridItem minHeight={16} {...props} ref={ref}>
      <Button
        // remove hover effect
        _hover={{ bg: '' }}
        width="100%"
        height="100%"
        padding="0"
        fontSize="4xl"
        {...{ onClick, colorScheme, bgColor }}
      >
        {children}
      </Button>
    </GridItem>
  ),
);

export default Key;
