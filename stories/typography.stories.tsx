import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Typography, TypographyProps } from '../components/typography';

export default {
  title: 'Example/Typography',
  component: Typography,
} as Meta;

const H1 = () => <Typography textStyle="h1">h1</Typography>;
const H2 = () => <Typography textStyle="h2">h2</Typography>;
const H3 = () => <Typography textStyle="h3">h3</Typography>;

export const Headings = () => (
  <>
    <H1 />
    <H2 />
    <H3 />
  </>
);
