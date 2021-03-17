import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {
  BoxWithCloud as BoxWithCloudComponent,
  BoxWithCloudProps,
} from '../components/box/box-with-cloud';
import { Box } from '../components/box/box';

export default {
  title: 'Components/Box With Cloud',
  component: BoxWithCloudComponent,
} as Meta;

const Template: Story<BoxWithCloudProps> = (args) => (
  <Box>
    <BoxWithCloudComponent {...args} />
  </Box>
);

export const BoxWithCloud = Template.bind({});
BoxWithCloud.args = {
  topAccessory: '',
  bottomAccessory: <Box height={225} width="100%" />,
};
