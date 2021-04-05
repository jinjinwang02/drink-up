import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '../components/box/box';
import { EditButton as EditButtonComponent } from '../components/button/edit-button';
import { ButtonProps } from '../interfaces';

export default {
  title: 'Components/Button/Edit Button',
  component: EditButtonComponent,
  args: {
    onClick: () => null,
    disabled: false,
  },
} as Meta;

export const EditButton: Story<ButtonProps> = (args) => (
  <Box>
    <EditButtonComponent {...args} />
  </Box>
);
