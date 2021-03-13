import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { SelectableBoxWithImage } from '../components/box/selectable-box-with-image';
import { Box } from '../components/box/box';

export default {
  title: 'Selectable box with image',
  component: SelectableBoxWithImage,
} as Meta;

export const Basic: React.FC = () => {
  return (
    <Box>
      <SelectableBoxWithImage
        imageUrl="http://placeimg.com/640/360/any"
        bottomText="random image"
        selected
      />
    </Box>
  );
};
