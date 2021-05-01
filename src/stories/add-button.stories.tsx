import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '../components/box/box';
import {
  AddButton as AddButtonComponent,
  AddButtonProps,
} from '../components/button/add-button';

export default {
  title: 'Components/Button/Add Button',
  component: AddButtonComponent,
  args: {
    onClick: () => null,
    disabled: false,
  },
} as Meta;

export const AddButton: Story<AddButtonProps> = (args) => (
  <Box>
    <AddButtonComponent {...args} />
  </Box>
);
