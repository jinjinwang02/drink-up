import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Calendar as Cl } from '../components/calendar';

export default {
  title: 'Components/Calendar',
  component: Cl,
} as Meta;

export const Calendar: React.FC = () => <Cl />;
