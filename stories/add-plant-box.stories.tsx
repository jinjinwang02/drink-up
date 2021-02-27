import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { AddPlantBox } from '../components/add-plant-box';

export default {
  title: 'Add plant Box',
  component: AddPlantBox,
} as Meta;

export const Basic = () => <AddPlantBox />;
