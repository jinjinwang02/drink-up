import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {
  TextWithAnimatedUnderline as TextWithAnimatedUnderlineComponent,
  TextWithAnimatedUnderlineProps,
} from '../components/text-with-animated-underline';
import { Box } from '../components/box/box';

export default {
  title: 'Components/Text With Animated Underline',
  component: TextWithAnimatedUnderlineComponent,
  args: {
    children: 'Sign up',
    backgroundColor: 'lightGrey',
  },
} as Meta;

export const TextWithAnimatedUnderline: Story<TextWithAnimatedUnderlineProps> = (
  args
) => (
  <Box>
    <TextWithAnimatedUnderlineComponent {...args} />
  </Box>
);
