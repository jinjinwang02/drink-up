import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import en from 'dayjs/locale/en';
import { Box } from './box/box';
import { Typography } from './typography';
import { ArrowButton } from './button/arrow-button';
import { css } from '@styled-system/css';
import { theme } from '../styles/theme';

dayjs.locale({
  ...en,
  weekStart: 1,
});

const CELL_WIDTH_AND_HEIGHT = '35px';
export const DATE_DISPLAY_FORMAT = 'DD/MM/YYYY';
export const DATE_DIFF_FORMAT = 'YYYY-MM-DD';
const DAY_FORMAT = 'D';
const MONTH_FORMAT = 'M';
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export interface CalendarProps {
  futureMonthLimit?: number;
  previousMonthLimit?: number;
  onSelectDate: (date: dayjs.Dayjs) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  futureMonthLimit,
  previousMonthLimit,
  onSelectDate,
}: CalendarProps) => {
  const calendar: dayjs.Dayjs[][] = [];
  const today = dayjs();
  const formatedToday = dayjs().format(DATE_DISPLAY_FORMAT);
  const [currentCalendarTime, setCurrentCalendarTime] = useState<dayjs.Dayjs>(
    today
  );
  const [monthDiff, setMonthDiff] = useState<number>(0);
  const currentMonth = currentCalendarTime.format(MONTH_FORMAT);

  const allowFuture =
    futureMonthLimit === undefined ||
    (futureMonthLimit >= 0 && monthDiff < futureMonthLimit);
  const allowPrevious =
    previousMonthLimit === undefined ||
    (previousMonthLimit >= 0 && -monthDiff < previousMonthLimit);

  const startDayOfCurrentMonth = currentCalendarTime
    .startOf('month')
    .startOf('week');
  const endDayOfCurrentMonth = currentCalendarTime.endOf('month').endOf('week');
  const endDayOfPreviousMonth = startDayOfCurrentMonth.subtract(1, 'day');

  const numberOfRows =
    endDayOfCurrentMonth.diff(endDayOfPreviousMonth, 'day') / 7;
  for (let currentRow = 0; currentRow < numberOfRows; currentRow += 1) {
    calendar.push(
      Array(7)
        .fill(0)
        .map((_el, index) =>
          endDayOfPreviousMonth.add(index + 1 + 7 * currentRow, 'day')
        )
    );
  }

  const handleBack = useCallback(() => {
    if (allowPrevious) {
      setCurrentCalendarTime(currentCalendarTime.subtract(1, 'month'));
      setMonthDiff((prev) => prev - 1);
    }
  }, [currentCalendarTime, allowPrevious]);

  const handleNext = useCallback(() => {
    if (allowFuture) {
      setCurrentCalendarTime(currentCalendarTime.add(1, 'month'));
      setMonthDiff((prev) => prev + 1);
    }
  }, [allowFuture, currentCalendarTime]);

  const handleSelectDate = useCallback(
    (date: dayjs.Dayjs, isFutureDate: boolean) => {
      if (allowFuture || !isFutureDate) {
        onSelectDate(date);
      }
    },
    [allowFuture, onSelectDate]
  );

  return (
    <Box backgroundColor="white">
      <Box flexDirection="column" py="onePointSix" border="regularBlack">
        <Box
          position="absolute"
          width="100%"
          top={0}
          height={CELL_WIDTH_AND_HEIGHT}
          border="none"
          borderBottom="regularBlack"
          px="one"
          justifyContent="space-between"
        >
          <ArrowButton
            size="small"
            direction="left"
            onClick={handleBack}
            disabled={!allowPrevious}
          />
          <Typography textStyle="copyS">
            {currentCalendarTime.format('MMMM YYYY')}
          </Typography>
          <ArrowButton
            size="small"
            onClick={handleNext}
            disabled={!allowFuture}
          />
        </Box>
        <Box mb="zeroPointFour" mt={CELL_WIDTH_AND_HEIGHT}>
          {WEEKDAYS.map((weekday) => (
            <Box width={CELL_WIDTH_AND_HEIGHT} key={weekday} px="zeroPointFour">
              <Typography textAlign="center" textStyle="bodyS">
                {weekday}
              </Typography>
            </Box>
          ))}
        </Box>
        {calendar.map((week, weekIndex) => (
          <Box key={weekIndex} px="zeroPointFour">
            {week.map((dayWithMonth) => {
              const formatedDayWithMonth = dayWithMonth.format(
                DATE_DISPLAY_FORMAT
              );
              const day = dayWithMonth.format(DAY_FORMAT);
              const month = dayWithMonth.format(MONTH_FORMAT);
              const isFutureDate = dayWithMonth.isAfter(today);

              return (
                <Box
                  width={CELL_WIDTH_AND_HEIGHT}
                  key={`${day}${month}`}
                  pt="zeroPointSix"
                  pb="zeroPointEight"
                  border="transparent"
                  borderRadius="100px"
                  style={{ cursor: !isFutureDate ? 'pointer' : 'not-allowed' }}
                  transition={theme.transitions.quick}
                  css={css({
                    '&:hover': {
                      border: !isFutureDate ? 'inactiveGrey' : undefined,
                    },
                    '&:active': {
                      border: !isFutureDate ? 'regularBlack' : undefined,
                    },
                  })}
                  onClick={() => handleSelectDate(dayWithMonth, isFutureDate)}
                >
                  <Typography
                    textAlign="center"
                    color={month === currentMonth ? 'pureBlack' : 'mediumGrey'}
                    textStyle={
                      formatedDayWithMonth === formatedToday
                        ? 'bodySBold'
                        : 'bodyS'
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
