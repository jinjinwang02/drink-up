import React from 'react';
import { Typography } from '../typography';
import { Box } from './box';
import { Image } from '../image';

export interface BoxWithImageProps {
  imageUrl: string;
  imageText?: string;
  width: number[];
  topBoxHeight: number[];
  alt?: string;
  bottomAccessory?: React.ReactNode;
  invertible?: boolean;
}
const BoxWithImage = ({
  imageUrl,
  width,
  topBoxHeight,
  alt,
  imageText,
  bottomAccessory,
  invertible,
}: BoxWithImageProps) => {
  return (
    <Box
      flexDirection={[invertible ? 'row' : 'column', 'column']}
      width={width}
    >
      <Box
        flexDirection="column"
        width="100%"
        height={topBoxHeight}
        border={[invertible ? undefined : 'regularBlack', 'regularBlack']}
        pt={[invertible ? 'zero' : 'onePointTwo', 'onePointSix']}
        pb={invertible ? ['zero', 'onePointSix'] : ['zeroPointEight', 'one']}
        px={[invertible ? 'zero' : 'onePointTwo', 'onePointSix']}
      >
        <Image url={imageUrl} alt={alt} />
        {imageText ? (
          <Typography
            textStyle={['copyS', 'copyL', 'copyL', 'copyL']}
            pt={['one', 'zeroPointSix']}
          >
            {imageText}
          </Typography>
        ) : null}
      </Box>
      <Box
        width="100%"
        height={[invertible ? topBoxHeight[0] : '100%', '100%']}
        border="regularBlack"
        borderTopWidth={[invertible ? 1 : 0, 0]}
        pt={['onePointTwo', 'onePointSix']}
        pb={['one', 'twoPointFour']}
        px={['onePointTwo', 'onePointSix']}
      >
        {bottomAccessory}
      </Box>
    </Box>
  );
};

export { BoxWithImage };
