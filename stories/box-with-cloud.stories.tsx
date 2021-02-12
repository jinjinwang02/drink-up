import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {
  BoxWithCloud,
  BoxWithCloudProps,
} from '../components/box/box-with-cloud';
import { Typography } from '../components/typography';
import { Box } from '../components/box/box';

export default {
  title: 'Box with cloud',
  component: BoxWithCloud,
} as Meta;

const Template: Story<BoxWithCloudProps> = (args) => (
  <Box>
    <BoxWithCloud {...args} />
  </Box>
);

export const Basic = Template.bind({});
Basic.args = {
  topAccessory: '',
  bottomAccessory: '',
};

export const WithAccessories = Template.bind({});
WithAccessories.args = {
  topAccessory: <Typography textStyle="copyL">Hello</Typography>,
  bottomAccessory: <Typography textStyle="copyL">Hello</Typography>,
};
