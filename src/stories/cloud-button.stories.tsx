import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Box } from '../components/box/box';
import {
  CloudButton,
  CloudButtonProps,
} from '../components/button/cloud-button';

export default {
  title: 'Cloud Button',
  component: CloudButton,
} as Meta;

const Template: Story<CloudButtonProps> = (args) => (
  <Box>
    <CloudButton {...args} />
  </Box>
);

export const WithBorder = Template.bind({});
WithBorder.args = {
  children: 'Browse all plants',
};

export const WithoutBorder = Template.bind({});
WithoutBorder.args = {
  borderless: true,
  children: 'Log in',
};
