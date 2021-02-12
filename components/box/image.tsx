import React from 'react';
import { Box, BoxProps } from './box';

interface ImageProps extends BoxProps {
  url: string;
  alt?: string;
}

const Image = ({
  url,
  alt,
  width = '100%',
  height = '100%',
  ...rest
}: ImageProps) => {
  return (
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
};

export { Image };
