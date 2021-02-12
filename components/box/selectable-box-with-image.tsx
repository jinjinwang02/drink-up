import React from 'react';
import { Typography } from '../typography';
import { Box } from './box';
import { Image } from './image';

const BOX_WIDTH_MD = 213;
const BOX_HEIGHT_MD = 246;

const BOX_WIDTH_XS = 275;
const BOX_HEIGHT_XS = 319;

const TOP_BOX_HEIGHT_MD = 212;
const TOP_BOX_HEIGHT_XS = 272;

export interface SelectableBoxWithImageProps {
  imageUrl: string;
  alt?: string;
  selected?: boolean;
  bottomText: string;
  setSelected: (prev: boolean) => void;
}
const SelectableBoxWithImage = ({
  imageUrl,
  alt,
  bottomText,
  selected,
  setSelected,
}: SelectableBoxWithImageProps) => {
  return (
    <Box
      flexDirection="column"
      height={[BOX_HEIGHT_XS, BOX_HEIGHT_MD]}
      width={[BOX_WIDTH_XS, BOX_WIDTH_MD]}
      onClick={() => setSelected(!selected)}
      style={{ cursor: 'pointer' }}
    >
      <Box
        width="100%"
        height={[TOP_BOX_HEIGHT_XS, TOP_BOX_HEIGHT_MD]}
        border={selected ? 'regularBlack' : 'inactiveGrey'}
        borderBottomWidth={0}
        p={[16, 12]}
      >
        <Image url={imageUrl} alt={alt} />
        <Box
          height="100%"
          width="100%"
          backgroundColor={selected ? 'none' : 'pureWhiteThirty'}
          position="absolute"
          top={0}
          left={0}
        />
      </Box>
      <Box
        width="100%"
        border={selected ? 'regularBlack' : 'inactiveGrey'}
        height="100%"
      >
        <Typography textStyle={['copyXL', 'copyM', 'copyM', 'copyM']}>
          {bottomText}
        </Typography>
      </Box>
    </Box>
  );
};

export { SelectableBoxWithImage };
