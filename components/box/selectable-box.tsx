import React from 'react';
import { Typography } from '../typography';
import { Box } from './box';

const BOX_WIDTH_MD = 213;
const BOX_HEIGHT_MD = 246;

const BOX_WIDTH_XS = 275;
const BOX_HEIGHT_XS = 319;

const TOP_BOX_HEIGHT_MD = 212;
const TOP_BOX_HEIGHT_XS = 272;

export interface BoxWithCloudProps {
  imageUrl: string;
  alt?: string;
  selected?: boolean;
  bottomText: string;
  setSelected: (prev: boolean) => void;
}
const SelectableBox = ({
  imageUrl,
  alt,
  bottomText,
  selected,
  setSelected,
}: BoxWithCloudProps) => {
  return (
    <Box
      ml={50}
      mt={50}
      flexDirection="column"
      height={[BOX_HEIGHT_XS, BOX_HEIGHT_MD]}
      width={[BOX_WIDTH_XS, BOX_WIDTH_MD]}
      onClick={() => setSelected(!selected)}
    >
      <Box
        wwidth="100%"
        height={[TOP_BOX_HEIGHT_XS, TOP_BOX_HEIGHT_MD]}
        border={selected ? 'regularBlack' : 'inactiveGrey'}
        borderBottomWidth={0}
        p={[16, 12]}
      >
        <Box
          height="100%"
          width="100%"
          backgroundColor={selected ? 'none' : 'pureWhiteThirty'}
          position="absolute"
          top={0}
          left={0}
        />
        <img src={imageUrl} alt={alt} width="100%" height="100%" />
      </Box>
      <Box
        width="100%"
        border={selected ? 'regularBlack' : 'inactiveGrey'}
        height="100%"
      >
        <Typography textStyle={['copyXL', 'copyM', 'copyM', 'copyM']}>
          {bottomText.toUpperCase()}
        </Typography>
      </Box>
    </Box>
  );
};

export { SelectableBox };
