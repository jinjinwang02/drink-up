import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
  SelectableBoxWithImage as SelectableBoxWithImageComponent,
  SelectableBoxWithImageProps,
} from '../components/box/selectable-box-with-image';
import { Box } from '../components/box/box';

export default {
  title: 'Components/Box/Selectable Box With Image',
  component: SelectableBoxWithImageComponent,
  args: {
    imageUrl: 'http://placeimg.com/640/360/any',
    bottomText: 'random image',
    selected: true,
  },
} as Meta;

export const SelectableBoxWithImage: Story<SelectableBoxWithImageProps> = (
  args
) => {
  return (
    <Box>
      <SelectableBoxWithImageComponent {...args} />
    </Box>
  );
};
