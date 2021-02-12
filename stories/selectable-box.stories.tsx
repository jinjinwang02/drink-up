import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {
  SelectableBox,
  SelectableBoxProps,
} from '../components/box/selectable-box';
import { Box } from '../components/box/box';

export default {
  title: 'Selectable Box',
  component: SelectableBox,
} as Meta;

export const Basic = () => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <Box>
      <SelectableBox
        imageUrl="http://placeimg.com/640/360/any"
        bottomText="random image"
        setSelected={setSelected}
        selected={selected}
      />
    </Box>
  );
};
