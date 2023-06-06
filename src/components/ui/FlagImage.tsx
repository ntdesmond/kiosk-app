import { Image, ImageProps, forwardRef } from '@chakra-ui/react';
import Flag, { FlagProps } from 'react-world-flags';

const FlagImage = forwardRef<ImageProps & FlagProps, 'img'>(({ code, ...props }, ref) => (
  <Image
    ref={ref}
    as={Flag}
    width={8}
    aspectRatio="8/5"
    border="1px solid"
    borderColor="gray"
    objectFit="cover"
    objectPosition="left"
    code={code === 'en' ? 'us' : code}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));

export default FlagImage;
