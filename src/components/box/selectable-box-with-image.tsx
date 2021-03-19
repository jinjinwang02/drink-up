import React, { useState } from 'react';
import { Typography } from '../typography';
import { Box } from './box';
import { Image } from '../image';
import { theme } from '../../styles/theme';

export const BOX_WIDTH_MD = 220;
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
}
const SelectableBoxWithImage: React.FC<SelectableBoxWithImageProps> = ({
  imageUrl,
  alt,
  bottomText,
  selected,
}: SelectableBoxWithImageProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  return (
    <Box
      flexDirection="column"
      height={[BOX_HEIGHT_XS, BOX_HEIGHT_MD]}
      width={[BOX_WIDTH_XS, BOX_WIDTH_MD]}
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        width="100%"
        height={[TOP_BOX_HEIGHT_XS, TOP_BOX_HEIGHT_MD]}
        border={selected ? 'regularBlack' : 'inactiveGrey'}
        borderBottomWidth={0}
        p={['onePointSix', 'onePointTwo']}
      >
        <Image url={imageUrl} alt={alt} />
        <Box
          height="100%"
          width="100%"
          backgroundColor={
            selected || isHovered ? 'transparent' : 'pureWhiteThirty'
          }
          transition={theme.transitions.medium}
          position="absolute"
          top={0}
          left={0}
        />
      </Box>
      <Box
        width="100%"
        border={selected ? 'regularBlack' : 'inactiveGrey'}
        py="zeroPointFour"
      >
        <Typography textStyle={['copyXL', 'copyM', 'copyM', 'copyM']}>
          {bottomText}
        </Typography>
      </Box>
    </Box>
  );
};

export { SelectableBoxWithImage };
