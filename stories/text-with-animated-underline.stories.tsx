import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {
  TextWithAnimatedUnderline,
  TextWithAnimatedUnderlineProps,
} from '../components/text-with-animated-underline';
import { Box } from '../components/box/box';

export default {
  title: 'Text with animated underline',
  component: TextWithAnimatedUnderline,
} as Meta;

const Template: Story<TextWithAnimatedUnderlineProps> = (args) => (
  <Box>
    <TextWithAnimatedUnderline {...args} />
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'Sign up',
  backgroundColor: 'lightGrey',
};
