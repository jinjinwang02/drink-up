import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { SelectableBoxWithImage as SelectableBoxWithImageComponent } from '../components/box/selectable-box-with-image';
import { Box } from '../components/box/box';

export default {
  title: 'Components/Selectable Box With Image',
  component: SelectableBoxWithImageComponent,
} as Meta;

export const SelectableBoxWithImage: React.FC = () => {
  return (
    <Box>
      <SelectableBoxWithImageComponent
        imageUrl="http://placeimg.com/640/360/any"
        bottomText="random image"
        selected
      />
    </Box>
  );
};
