import React from 'react';
import { Box } from './box';

interface ImageProps {
  url: string;
  alt?: string;
}

const Image = ({ url, alt }: ImageProps) => (
  <Box
    style={{
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      width: '100%',
      height: '100%',
      role: 'img',
      ariaLabel: alt,
    }}
  />
);

export { Image };
