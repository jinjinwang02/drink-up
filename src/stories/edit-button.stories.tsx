import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '../components/box/box';
import {
  EditButton as EditButtonComponent,
  EditButtonProps,
} from '../components/button/edit-button';

export default {
  title: 'Components/Button/Edit Button',
  component: EditButtonComponent,
  args: {
    onClick: () => null,
    disabled: false,
  },
} as Meta;

export const EditButton: Story<EditButtonProps> = (args) => (
  <Box>
    <EditButtonComponent {...args} />
  </Box>
);
