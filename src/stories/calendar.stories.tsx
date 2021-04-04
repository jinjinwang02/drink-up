import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
  Calendar as CalendarComponent,
  CalendarProps,
} from '../components/calendar';
import { Box } from '../components/box/box';

export default {
  title: 'Components/Calendar',
  component: CalendarComponent,
  args: {
    futureMonthLimit: undefined,
    previousMonthLimit: undefined,
    onSelectDate: () => null,
  },
} as Meta;

export const Calendar: Story<CalendarProps> = (args) => (
  <Box>
    <CalendarComponent {...args} />
  </Box>
);
