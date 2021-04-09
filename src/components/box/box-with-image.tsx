import React from 'react';
import { Typography } from '../typography';
import { Box } from './box';
import { Image } from '../image';

export interface BoxWithImageProps {
  id?: string;
  imageUrl?: string;
  imageText?: string;
  width: number[] | number;
  topBoxHeight: number[];
  alt?: string;
  bottomAccessory?: React.ReactNode;
  invertible?: boolean;
}
const BoxWithImage: React.FC<BoxWithImageProps> = ({
  imageUrl,
  width,
  topBoxHeight,
  alt,
  imageText,
  bottomAccessory,
  invertible,
  id,
}: BoxWithImageProps) => (
  <Box
    id={id}
    flexDirection={[invertible ? 'row' : 'column', 'column']}
    width={width}
    bg="pureWhite"
  >
    <Box
      flexDirection="column"
      width="100%"
      height={topBoxHeight}
      border={[invertible ? undefined : 'regularBlack', 'regularBlack']}
      pt={[invertible ? 'zero' : 'onePointTwo', 'onePointSix']}
      pb={
        invertible
          ? ['zero', 'onePointSix']
          : imageText
          ? 'zeroPointSix'
          : 'onePointSix'
      }
      px={[invertible ? 'zero' : 'onePointTwo', 'onePointSix']}
    >
      <Image url={imageUrl || '/image/default-plant-image.png'} alt={alt} />
      {imageText ? (
        <Typography
          textStyle={['copyS', 'copyL']}
          pt={['one', 'zeroPointEight']}
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
    >
      {bottomAccessory}
    </Box>
  </Box>
);

export { BoxWithImage };
