import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { BoxWithImage } from '../components/box/box-with-image';
import { Box } from '../components/box/box';

export default {
  title: 'Components/Box/Box with image',
  component: BoxWithImage,
} as Meta;

export const Default: Story = () => {
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
        bottomAccessory="random image"
      />
    </Box>
  );
};

export const Invertible: Story = () => {
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
        bottomAccessory="Test"
        invertible
      />
    </Box>
  );
};
