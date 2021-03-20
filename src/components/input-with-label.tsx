import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { usePlantContext } from '../context/plant-context';
import { theme } from '../styles/theme';
import { Box } from './box/box';
import { Calendar, DATE_DISPLAY_FORMAT, DATE_DIFF_FORMAT } from './calendar';
import { Input } from './input';
import { PlantInfoProps } from './plant-info';
import { Typography } from './typography';

export interface InputWithLabelProps extends Omit<PlantInfoProps, 'plantInfo'> {
  formik: any;
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  placeholderSize?: number;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  formik,
  id,
  name,
  label,
  placeholder,
  inputTextStyle,
  labelTextStyle = ['copyS', 'copyM', 'copyM', 'copyM'],
  placeholderSize,
}: InputWithLabelProps) => {
  const [dateValue, setDateValue] = useState<string>('');
  const {
    currentCalendar,
    plantCollection,
    plantCollectionWithInputs,
    setCurrentCalendar,
    setPlantCollectionWithInputs,
  } = usePlantContext();

  const handleOpenCalendar = useCallback(
    (id: string) => {
      setCurrentCalendar(id);
    },
    [setCurrentCalendar]
  );

  const handleCloseCalendar = useCallback(
    (event: any) => {
      const calendar = document?.getElementById(`calendar-${currentCalendar}`);
      if (event.target === calendar || calendar?.contains(event.target)) return;
      setCurrentCalendar('');
    },
    [currentCalendar, setCurrentCalendar]
  );

  useEffect(() => {
    document.addEventListener('mouseup', handleCloseCalendar);
    return () => {
      document.removeEventListener('mouseup', handleCloseCalendar);
    };
  }, [handleCloseCalendar]);

  const handleSelectDate = useCallback(
    (lastWateredOn: dayjs.Dayjs) => {
      setDateValue(lastWateredOn.format(DATE_DISPLAY_FORMAT));
      // find the plant in edit in collection
      // and add the input to the plant object
      if (plantCollection.map((el) => el.id).includes(id)) {
        const currentPlant = plantCollectionWithInputs.filter(
          (el) => el.id === id
        )[0];
        setPlantCollectionWithInputs((prev) => [
          ...prev.filter((el) => el !== currentPlant),
          {
            ...currentPlant,
            lastWateredOn: lastWateredOn.format(DATE_DIFF_FORMAT),
          },
        ]);
      }
    },
    [
      id,
      plantCollection,
      plantCollectionWithInputs,
      setPlantCollectionWithInputs,
    ]
  );
  return (
    <Box my={['zeroPointEight', 'one']} width="100%">
      <Box flex={3} flexDirection="column" alignItems="flex-start">
        <Typography textStyle={labelTextStyle}>{label}</Typography>
      </Box>
      <Box flex={5}>
        {name === 'lastWateredOn' ? (
          <>
            <Box
              width="100%"
              style={{ cursor: 'pointer' }}
              onClick={() => handleOpenCalendar(id)}
            >
              <Input
                id={id}
                name={name}
                formik={formik}
                dateValue={dateValue}
                inputTextAlign="left"
                placeholder={placeholder}
                placeholderSize={placeholderSize}
                inputTextStyle={inputTextStyle}
              />
            </Box>
            <Box
              id={`calendar-${id}`}
              position="absolute"
              zIndex={99}
              top="three"
              left={-theme.space.onePointSix}
              style={{
                transform:
                  currentCalendar === id ? 'translateY(0)' : 'translateY(-5%)',
                opacity: currentCalendar === id ? 1 : 0,
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
        ) : (
          <Input
            id={id}
            name={name}
            formik={formik}
            inputTextAlign="left"
            placeholder={placeholder}
            placeholderSize={placeholderSize}
            inputTextStyle={inputTextStyle}
          />
        )}
      </Box>
    </Box>
  );
};

export { InputWithLabel };
