import dayjs from 'dayjs';
import { CollectionWithInputs } from './interfaces';

export const getPlantInputErrorMessage: (
  field: keyof CollectionWithInputs
) => any = (field: keyof CollectionWithInputs) => {
  switch (field) {
    case 'commonName':
      return 'Please give your plant a name.';
    case 'lastWateredOn':
      return 'Please choose a date to help us calculate the next watering date.';
    case 'schedule':
      return 'Please specify how often you want to water this plant.';
  }
};

export const blockInvalidChar: (e: KeyboardEvent, type: string) => void = (
  e,
  type
) => {
  if (type === 'number' && ['e', 'E', '+', '-'].includes(e.key))
    e.preventDefault();
};

export const transformDateForDiff: (date: string) => string = (
  date: string
) => {
  // date stored in Firebase is in format DD/MM/YYYY
  // for diff, it needs to be in format YYYY-MM-DD
  return date.split('/').reverse().join('-');
};

export const generateId: () => string = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

export const getWateringCountdown: (
  lastWateredOn: string,
  schedule: string
) => number = (lastWateredOn: string, schedule: string) => {
  const nextWateringDate = dayjs(transformDateForDiff(lastWateredOn)).add(
    parseInt(schedule, 10),
    'day'
  );
  return dayjs(nextWateringDate).diff(dayjs(), 'day') + 1;
};
