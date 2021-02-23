import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Button, ButtonProps, ArrowButton } from '../components/button';
import { Box } from '../components/box/box';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <Box>
    <Button {...args} />
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

export const Arrow = () => (
  <Box flexDirection="column" height={200} justifyContent="space-around">
    <ArrowButton size="small" />
    <ArrowButton size="small" direction="left" />
    <ArrowButton />
    <ArrowButton direction="left" />
    <ArrowButton size="large" />
    <ArrowButton size="large" direction="left" />
  </Box>
);
