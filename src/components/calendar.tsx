import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import en from 'dayjs/locale/en';
import { Box } from './box/box';
import { Typography } from './typography';
import { ArrowButton } from './button/arrow-button';

dayjs.locale({
  ...en,
  weekStart: 1,
});

const CELL_WIDTH = '35px';
const DATE_FORMAT = 'D / M';
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface CalendarProps {
  allowFutureDates?: boolean;
}

const Calendar: React.FC<CalendarProps> = () => {
  const today = dayjs();
  const formatedToday = dayjs().format(DATE_FORMAT);

  const [now, setNow] = useState<dayjs.Dayjs>(today);
  const currentMonthIndex = (now.month() + 1).toString();
  const startDayOfCurrentMonth = now.startOf('month').startOf('week');
  const endDayOfCurrentMonth = now.endOf('month').endOf('week');
  const endDayOfPreviousMonth = startDayOfCurrentMonth.subtract(1, 'day');
  const calendar: string[][] = [];

  const numberOfRows =
    endDayOfCurrentMonth.diff(endDayOfPreviousMonth, 'day') / 7;
  for (let currentRow = 0; currentRow < numberOfRows; currentRow += 1) {
    calendar.push(
      Array(7)
        .fill(0)
        .map((_el, index) =>
          endDayOfPreviousMonth
            .add(index + 1 + 7 * currentRow, 'day')
            .format(DATE_FORMAT)
        )
    );
  }

  const handleBack = useCallback(() => {
    setNow(now.subtract(1, 'month'));
  }, [now]);
  const handleNext = useCallback(() => {
    setNow(now.add(1, 'month'));
  }, [now]);

  return (
    <Box flexDirection="column">
      <Box
        width="100%"
        height={35}
        border="regularBlack"
        borderBottomWidth={0}
        px="one"
        justifyContent="space-between"
      >
        <ArrowButton size="small" direction="left" onClick={handleBack} />
        <Typography textStyle="copyXS">
          {now.format('MMMM') + ' ' + now.format('YYYY')}
        </Typography>
        <ArrowButton size="small" onClick={handleNext} />
      </Box>
      <Box flexDirection="column" py="onePointSix" border="regularBlack">
        <Box mb="zeroPointFour">
          {WEEKDAYS.map((weekday) => (
            <Box width={CELL_WIDTH} key={weekday} px="zeroPointFour">
              <Typography textAlign="center" textStyle="bodyS">
                {weekday}
              </Typography>
            </Box>
          ))}
        </Box>
        {calendar.map((week, weekIndex) => (
          <Box key={week[0][0] + weekIndex} px="zeroPointFour">
            {week.map((dayWithMonth, dayIndex) => {
              const day = dayWithMonth.split('/')[0];
              const month = dayWithMonth.split('/')[1].trim();
              return (
                <Box
                  width={CELL_WIDTH}
                  key={day + dayIndex}
                  py="zeroPointEight"
                >
                  <Typography
                    textAlign="center"
                    textStyle={
                      dayWithMonth === formatedToday ? 'bodySBold' : 'bodyS'
                    }
                    color={
                      month === currentMonthIndex ? 'pureBlack' : 'mediumGrey'
                    }
                  >
                    {day}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export { Calendar };
