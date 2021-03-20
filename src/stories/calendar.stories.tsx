import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
  Calendar as CalendarComponent,
  CalendarProps,
} from '../components/calendar';

export default {
  title: 'Components/Calendar',
  component: CalendarComponent,
} as Meta;

const Template: Story<CalendarProps> = (args) => (
  <CalendarComponent {...args} />
);

export const Calendar = Template.bind({});
Calendar.args = {
  futureMonthLimit: undefined,
  previousMonthLimit: undefined,
};
