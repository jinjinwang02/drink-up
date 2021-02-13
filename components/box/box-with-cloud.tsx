import React from 'react';
import { Box } from './box';
import { Cloud } from '../cloud';

const BOX_MIN_WIDTH = 325;
const TOP_BOX_HEIGHT = 50;
const BOTTOM_BOX_MIN_HEIGHT = 235;
const CLOUD_Y_OFFSET = -11;

export interface BoxWithCloudProps {
  topAccessory: React.ReactNode;
  bottomAccessory: React.ReactNode;
}
const BoxWithCloud = ({ topAccessory, bottomAccessory }: BoxWithCloudProps) => {
  return (
    <Box flexDirection="column" minWidth={BOX_MIN_WIDTH}>
      <Box position="absolute" zIndex={-1} width="120%" top={CLOUD_Y_OFFSET}>
        <Cloud />
      </Box>
      <Box
        width="95%"
        height={TOP_BOX_HEIGHT}
        border="regularBlack"
        borderBottomWidth={0}
      >
        {topAccessory}
      </Box>
      <Box width="95%" minHeight={BOTTOM_BOX_MIN_HEIGHT} border="regularBlack">
        {bottomAccessory}
      </Box>
    </Box>
  );
};

export { BoxWithCloud };
