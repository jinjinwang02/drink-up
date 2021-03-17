import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {
  TitleWithUnderline,
  TitleWithUnderlineProps,
} from '../components/title-with-underline';
import { Box } from '../components/box/box';

export default {
  title: 'Components/Title with underline',
  component: TitleWithUnderline,
} as Meta;

const Template: Story<TitleWithUnderlineProps> = (args) => (
  <Box>
    <TitleWithUnderline {...args} />
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: 'Find your plants',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: 'A water reminder for your plants',
};
