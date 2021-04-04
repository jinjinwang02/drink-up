import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { ArrowButton as ArrowButtonComponent } from '../components/button/arrow-button';
import { Box } from '../components/box/box';

export default {
  title: 'Components/Button/Arrow Button',
  component: ArrowButtonComponent,
} as Meta;

export const ArrowButton: Story = () => (
  <Box flexDirection="column" height={200} justifyContent="space-around">
    <ArrowButtonComponent size="small" onClick={() => null} />
    <ArrowButtonComponent size="small" direction="left" onClick={() => null} />
    <ArrowButtonComponent onClick={() => null} />
    <ArrowButtonComponent direction="left" onClick={() => null} />
    <ArrowButtonComponent size="large" onClick={() => null} />
    <ArrowButtonComponent size="large" direction="left" onClick={() => null} />
  </Box>
);
