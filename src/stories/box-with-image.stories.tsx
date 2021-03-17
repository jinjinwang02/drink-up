import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { BoxWithImage } from '../components/box/box-with-image';
import { Box } from '../components/box/box';

export default {
  title: 'Components/Box with image',
  component: BoxWithImage,
} as Meta;

export const Default: React.FC = () => {
  const BOX_WIDTH_MD = 342;
  const BOX_WIDTH_XS = 275;

  const TOP_BOX_HEIGHT_MD = 370;
  const TOP_BOX_HEIGHT_XS = 297;
  return (
    <Box>
      <BoxWithImage
        width={[BOX_WIDTH_XS, BOX_WIDTH_MD]}
        topBoxHeight={[TOP_BOX_HEIGHT_XS, TOP_BOX_HEIGHT_MD]}
        imageUrl="http://placeimg.com/640/360/any"
        imageText="random image"
        bottomAccessory="hahahahasdsdsdssdsds sdsd sds sdfdsfsdf sdsf sdshha"
      />
    </Box>
  );
};

export const Invertible: React.FC = () => {
  const BOX_WIDTH_MD = 272;
  const BOX_WIDTH_XS = 322;

  const TOP_BOX_HEIGHT_MD = 253;
  const TOP_BOX_HEIGHT_XS = 145;
  return (
    <Box>
      <BoxWithImage
        width={[BOX_WIDTH_XS, BOX_WIDTH_MD]}
        topBoxHeight={[TOP_BOX_HEIGHT_XS, TOP_BOX_HEIGHT_MD]}
        imageUrl="http://placeimg.com/640/360/any"
        bottomAccessory="hahahahasdsdsdssdsds sdsd sds sdfdsfsdf sdsf sdshha"
        invertible
      />
    </Box>
  );
};
