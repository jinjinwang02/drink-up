import { CollectionWithInputs } from './interfaces';

export const getPlantInputErrorMessage: (
  field: keyof CollectionWithInputs
) => any = (field: keyof CollectionWithInputs) => {
  switch (field) {
    case 'commonName':
      return 'Please give your plant a name.';
    case 'imageUrl':
      return 'Image link is Required.';
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
