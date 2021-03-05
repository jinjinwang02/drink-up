import React from 'react';
import { Box } from './box';
import { Cloud } from '../icon/cloud';

const TOP_BOX_HEIGHT = 50;
const CLOUD_Y_OFFSET = -11;

export interface BoxWithCloudProps {
  topAccessory: React.ReactNode;
  bottomAccessory: React.ReactNode;
  width?: number | number[];
}
const BoxWithCloud = ({
  width = 325,
  topAccessory,
  bottomAccessory,
}: BoxWithCloudProps) => (
  <Box flexDirection="column" width={width}>
    <Box position="absolute" zIndex={-1} top={CLOUD_Y_OFFSET}>
      <Cloud width={width} allowXS={false} />
    </Box>
    <Box
      width="95%"
      height={TOP_BOX_HEIGHT}
      border="regularBlack"
      borderBottomWidth={0}
    >
      {topAccessory}
    </Box>
    <Box width="95%" border="regularBlack">
      {bottomAccessory}
    </Box>
  </Box>
);

export { BoxWithCloud };
