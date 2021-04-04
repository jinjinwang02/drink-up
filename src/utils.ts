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
    case 'habit':
      return 'Please specify how often you want to water this plant.';
  }
};
