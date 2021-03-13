import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Typography, TypographyProps } from '../components/typography';

export default {
  title: 'Typography',
  component: Typography,
} as Meta;

const Template: Story<TypographyProps> = (args) => <Typography {...args} />;

export const EditableTypography = Template.bind({});
EditableTypography.args = {
  textStyle: 'h1',
  children: 'h1',
  color: 'pureBlack',
};

const H1 = () => <Typography textStyle="h1">h1</Typography>;
const H2 = () => <Typography textStyle="h2">h2</Typography>;
const H3 = () => <Typography textStyle="h3">h3</Typography>;
const H1Brand = () => <Typography textStyle="h1Brand">h1 Brand</Typography>;
const H2Brand = () => <Typography textStyle="h2Brand">h2 Brand</Typography>;

const CopyXL = () => <Typography textStyle="copyXL">copyXL</Typography>;
const CopyL = () => <Typography textStyle="copyL">copyL</Typography>;
const CopyLBold = () => (
  <Typography textStyle="copyLBold">copyLBold</Typography>
);
const CopyM = () => <Typography textStyle="copyM">copyM</Typography>;
const CopyS = () => <Typography textStyle="copyS">copyS</Typography>;
const CopyXS = () => <Typography textStyle="copyXS">copyXS</Typography>;

const BodyXL = () => <Typography textStyle="bodyXL">bodyXL</Typography>;
const BodyL = () => <Typography textStyle="bodyL">bodyL</Typography>;
const BodyM = () => <Typography textStyle="bodyM">bodyM</Typography>;
const BodyS = () => <Typography textStyle="bodyS">bodyS</Typography>;
const BodySBold = () => (
  <Typography textStyle="bodySBold">bodySBold</Typography>
);
const BodyXS = () => <Typography textStyle="bodyXS">bodyXS</Typography>;

export const Heading: React.FC = () => (
  <>
    <H1 />
    <H2 />
    <H3 />
    <H1Brand />
    <H2Brand />
  </>
);

export const Copy: React.FC = () => (
  <>
    <CopyXL />
    <CopyL />
    <CopyLBold />
    <CopyM />
    <CopyS />
    <CopyXS />
  </>
);

export const Body: React.FC = () => (
  <>
    <BodyXL />
    <BodyL />
    <BodyM />
    <BodyS />
    <BodySBold />
    <BodyXS />
  </>
);
