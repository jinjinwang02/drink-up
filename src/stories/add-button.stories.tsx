import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '../components/box/box';
import { AddButton as AddButtonComponent } from '../components/button/add-button';
import { ButtonProps } from '../interfaces';

export default {
  title: 'Components/Button/Add Button',
  component: AddButtonComponent,
  args: {
    onClick: () => null,
    disabled: false,
  },
} as Meta;

export const AddButton: Story<ButtonProps> = (args) => (
  <Box>
    <AddButtonComponent {...args} />
  </Box>
);
