/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import { useField } from 'formik';
import { usePlantContext } from '../../context/plant-context';
import { theme } from '../../theme';
import { Box } from '../box/box';
import { Calendar } from '../calendar';
import { Input, InputProps } from '../input/input';

export interface CalendarInputProps extends Omit<InputProps, 'plantId'> {
  plantId: string;
}

const CalendarInput: React.FC<CalendarInputProps> = ({
  plantId,
  name,
  placeholder,
  placeholderSize,
}: CalendarInputProps) => {
  const {
    currentCalendarId,
    setCurrentCalendarId,
    handleSetInput,
  } = usePlantContext();
  const [_field, _meta, helper] = useField(name);
  const handleOpenCalendar = (id: string) => {
    setCurrentCalendarId(id);
  };

  const handleCloseCalendar = useCallback(
    (event: any) => {
      const calendarElement = document?.getElementById(
        `calendar-${currentCalendarId}`
      );

      if (
        event.target === calendarElement ||
        calendarElement?.contains(event.target)
      )
        return;
      setCurrentCalendarId(null);
    },
    [currentCalendarId, setCurrentCalendarId]
  );

  useEffect(() => {
    document.addEventListener('mouseup', handleCloseCalendar);
    return () => {
      document.removeEventListener('mouseup', handleCloseCalendar);
    };
  }, [handleCloseCalendar]);

  const handleSelectDate = (lastWateredOn: string) => {
    helper.setValue(lastWateredOn);
    setCurrentCalendarId(null);
    handleSetInput(plantId, 'lastWateredOn', lastWateredOn);
  };

  return (
    <>
      <Box
        width="100%"
        style={{ cursor: 'pointer' }}
        onClick={() => handleOpenCalendar(plantId)}
      >
        <Input
          plantId={plantId}
          name={name}
          inputTextAlign="left"
          placeholder={placeholder}
          placeholderSize={placeholderSize}
        />
      </Box>
      <Box
        id={`calendar-${plantId}`}
        position="absolute"
        zIndex="calendar"
        top={-135}
        left={0}
        style={{
          transform:
            currentCalendarId === plantId ? 'translateY(0)' : 'translateY(5%)',
          opacity: currentCalendarId === plantId ? 1 : 0,
          visibility: currentCalendarId === plantId ? 'visible' : 'hidden',
        }}
        transition={theme.transitions.curve.slow}
      >
        <Calendar
          previousMonthLimit={1}
          futureMonthLimit={0}
          onSelectDate={handleSelectDate}
        />
      </Box>
    </>
  );
};

export { CalendarInput };
