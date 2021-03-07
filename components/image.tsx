import React from 'react';
import { Box, BoxProps } from './box/box';

interface ImageProps extends BoxProps {
  url: string;
  alt?: string;
}

const Image: React.FunctionComponent<ImageProps> = ({
  url,
  alt,
  ...rest
}: ImageProps) => (
  <Box
    style={{
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      role: 'img',
      ariaLabel: alt,
    }}
    height="100%"
    width="100%"
    {...rest}
  />
);

export { Image };
