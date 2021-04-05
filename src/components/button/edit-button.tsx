import React from 'react';
import { ButtonProps } from '../../interfaces';
import { Edit } from '../icon/edit';
import { ButtonContainer } from './button-container';

const EditButton: React.FC<ButtonProps> = (props: ButtonProps) => (
  <ButtonContainer {...props}>
    <Edit />
  </ButtonContainer>
);

export { EditButton };
