import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Arrow } from '../components/arrow';
import { Box } from '../components/box/box';

export default {
  title: 'Arrow',
  component: Arrow,
} as Meta;

export const Arrows = () => (
  <Box flexDirection="column" height={200} justifyContent="space-around">
    <Arrow />
    <Arrow direction="left" />
    <Arrow size="big" />
    <Arrow size="big" direction="left" />
  </Box>
);
