import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Typography, TypographyProps } from '../components/typography';

export default {
  title: 'Example/Typography',
  component: Typography,
} as Meta;

const Template: Story<TypographyProps> = (args) => <Typography {...args} />;

export const H1 = Template.bind({});
H1.args = {
  textStyle: 'h1',
  children: 'H1',
};
