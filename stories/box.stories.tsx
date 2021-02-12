import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {
  BoxWithCloud,
  BoxWithCloudProps,
} from '../components/box/box-with-cloud';
import { Typography } from '../components/typography';

export default {
  title: 'Box with cloud',
  component: BoxWithCloud,
} as Meta;

const Template: Story<BoxWithCloudProps> = (args) => <BoxWithCloud {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  topAccessory: '',
  bottomAccessory: '',
};

export const WithTopAndBottomAccessories = Template.bind({});
WithTopAndBottomAccessories.args = {
  topAccessory: <Typography textStyle="copyL">Hello</Typography>,
  bottomAccessory: <Typography textStyle="copyL">Hello</Typography>,
};
