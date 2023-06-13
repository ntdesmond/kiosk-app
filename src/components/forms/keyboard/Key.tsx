import {
  Button,
  ButtonProps,
  GridItem,
  GridItemProps,
  forwardRef,
  useTimeout,
} from '@chakra-ui/react';
import { useCallback, MouseEventHandler, useState, MouseEvent, useMemo } from 'react';

export type KeyProps = GridItemProps & ButtonProps & Required<Pick<ButtonProps, 'onClick'>>;

const Key = forwardRef<KeyProps, 'div'>(
  (
    {
      colorScheme,
      children,
      onClick: clickAction,
      bgColor,
      onDoubleClick: doubleClickAction,
      ...props
    },
    ref,
  ) => {
    const [clickEvent, setClickEvent] = useState<MouseEvent | null>(null);

    const clickDelay = useMemo(() => {
      if (!clickEvent) {
        return null;
      }
      if (!doubleClickAction) {
        return 0;
      }
      return 500;
    }, [clickEvent, doubleClickAction]);

    useTimeout(() => {
      if (!clickEvent) {
        return;
      }
      setClickEvent(null);
    }, clickDelay);

    const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
      (event) => {
        if (!clickEvent || !doubleClickAction) {
          clickAction(event);
          setClickEvent(event);
          return;
        }
        doubleClickAction(event);
        setClickEvent(null);
      },
      [clickAction, clickEvent, doubleClickAction],
    );

    return (
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
    );
  },
);

export default Key;
