import React, { useCallback, useEffect } from 'react';
import { usePlantContext } from '../../context/plant-context';
import { theme } from '../../styles/theme';
import { Box } from '../box/box';
import { Calendar } from '../calendar';
import { Input, InputProps } from '../input/input';

export interface CalendarInputProps extends Omit<InputProps, 'plantId'> {
  plantId: string;
}

const CalendarInput: React.FC<CalendarInputProps> = ({
  formik,
  plantId,
  name,
  placeholder,
  placeholderSize,
}: CalendarInputProps) => {
  const {
    currentCalendarId,
    plantCollection,
    plantCollectionWithInputs,
    setCurrentCalendarId,
    setPlantCollectionWithInputs,
  } = usePlantContext();
  const handleOpenCalendar = useCallback(
    (id: string) => {
      setCurrentCalendarId(id);
    },
    [setCurrentCalendarId]
  );

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

  const handleSelectDate = useCallback(
    (lastWateredOn: string) => {
      formik.setFieldValue(name, lastWateredOn);
      setCurrentCalendarId(null);
      // find the plant in edit in collection
      // and add the input to the plant object
      if (plantCollection.map((el) => el.id).includes(plantId)) {
        const currentPlant = plantCollectionWithInputs.filter(
          (el) => el.id === plantId
        )[0];
        setPlantCollectionWithInputs((prev) => [
          ...prev.filter((el) => el !== currentPlant),
          {
            ...currentPlant,
            lastWateredOn,
          },
        ]);
      }
    },
    [
      formik,
      name,
      setCurrentCalendarId,
      plantCollection,
      plantId,
      plantCollectionWithInputs,
      setPlantCollectionWithInputs,
    ]
  );
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
          formik={formik}
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
        transition={theme.transitions.medium}
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
