import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Typography as Text, TypographyProps } from '../components/typography';

export default {
  title: 'Components/Typography',
  component: Text,
} as Meta;

const Template: Story<TypographyProps> = (args) => <Text {...args} />;

export const Typography = Template.bind({});
Typography.args = {
  textStyle: 'h1',
  children: 'h1',
  color: 'pureBlack',
};

const H1 = () => <Text textStyle="h1">h1</Text>;
const H2 = () => <Text textStyle="h2">h2</Text>;
const H3 = () => <Text textStyle="h3">h3</Text>;
const H1Brand = () => <Text textStyle="h1Brand">h1 Brand</Text>;
const H2Brand = () => <Text textStyle="h2Brand">h2 Brand</Text>;

const CopyXL = () => <Text textStyle="copyXL">copyXL</Text>;
const CopyL = () => <Text textStyle="copyL">copyL</Text>;
const CopyLBold = () => <Text textStyle="copyLBold">copyLBold</Text>;
const CopyM = () => <Text textStyle="copyM">copyM</Text>;
const CopyS = () => <Text textStyle="copyS">copyS</Text>;
const CopyXS = () => <Text textStyle="copyXS">copyXS</Text>;

const BodyXL = () => <Text textStyle="bodyXL">bodyXL</Text>;
const BodyL = () => <Text textStyle="bodyL">bodyL</Text>;
const BodyM = () => <Text textStyle="bodyM">bodyM</Text>;
const BodyS = () => <Text textStyle="bodyS">bodyS</Text>;
const BodySBold = () => <Text textStyle="bodySBold">bodySBold</Text>;
const BodyXS = () => <Text textStyle="bodyXS">bodyXS</Text>;

export const Heading: Story = () => (
  <>
    <H1 />
    <H2 />
    <H3 />
    <H1Brand />
    <H2Brand />
  </>
);

export const Copy: Story = () => (
  <>
    <CopyXL />
    <CopyL />
    <CopyLBold />
    <CopyM />
    <CopyS />
    <CopyXS />
  </>
);

export const Body: Story = () => (
  <>
    <BodyXL />
    <BodyL />
    <BodyM />
    <BodyS />
    <BodySBold />
    <BodyXS />
  </>
);
