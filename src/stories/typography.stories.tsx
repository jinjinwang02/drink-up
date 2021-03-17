import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import {
  Typography as TypographyComponent,
  TypographyProps,
} from '../components/typography';

export default {
  title: 'Components/Typography',
  component: TypographyComponent,
} as Meta;

const Template: Story<TypographyProps> = (args) => (
  <TypographyComponent {...args} />
);

export const Typography = Template.bind({});
Typography.args = {
  textStyle: 'h1',
  children: 'h1',
  color: 'pureBlack',
};

const H1 = () => <TypographyComponent textStyle="h1">h1</TypographyComponent>;
const H2 = () => <TypographyComponent textStyle="h2">h2</TypographyComponent>;
const H3 = () => <TypographyComponent textStyle="h3">h3</TypographyComponent>;
const H1Brand = () => (
  <TypographyComponent textStyle="h1Brand">h1 Brand</TypographyComponent>
);
const H2Brand = () => (
  <TypographyComponent textStyle="h2Brand">h2 Brand</TypographyComponent>
);

const CopyXL = () => (
  <TypographyComponent textStyle="copyXL">copyXL</TypographyComponent>
);
const CopyL = () => (
  <TypographyComponent textStyle="copyL">copyL</TypographyComponent>
);
const CopyLBold = () => (
  <TypographyComponent textStyle="copyLBold">copyLBold</TypographyComponent>
);
const CopyM = () => (
  <TypographyComponent textStyle="copyM">copyM</TypographyComponent>
);
const CopyS = () => (
  <TypographyComponent textStyle="copyS">copyS</TypographyComponent>
);
const CopyXS = () => (
  <TypographyComponent textStyle="copyXS">copyXS</TypographyComponent>
);

const BodyXL = () => (
  <TypographyComponent textStyle="bodyXL">bodyXL</TypographyComponent>
);
const BodyL = () => (
  <TypographyComponent textStyle="bodyL">bodyL</TypographyComponent>
);
const BodyM = () => (
  <TypographyComponent textStyle="bodyM">bodyM</TypographyComponent>
);
const BodyS = () => (
  <TypographyComponent textStyle="bodyS">bodyS</TypographyComponent>
);
const BodySBold = () => (
  <TypographyComponent textStyle="bodySBold">bodySBold</TypographyComponent>
);
const BodyXS = () => (
  <TypographyComponent textStyle="bodyXS">bodyXS</TypographyComponent>
);

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
