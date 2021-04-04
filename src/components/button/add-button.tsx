import React from 'react';
import { ButtonProps } from '../../interfaces';
import { Add } from '../icon/add';
import { ButtonContainer } from './button-container';

const AddButton: React.FC<ButtonProps> = (props: ButtonProps) => (
  <ButtonContainer {...props}>
    <Add />
  </ButtonContainer>
);

export { AddButton };
