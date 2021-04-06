import React from 'react';
import { ButtonProps } from '../../interfaces';
import { Edit } from '../icon/edit';
import { ButtonContainer } from './button-container';

export interface EditButtonProps extends Omit<ButtonProps, 'width'> {
  width?: number;
}

const EditButton: React.FC<EditButtonProps> = ({
  width,
  ...props
}: EditButtonProps) => (
  <ButtonContainer {...props}>
    <Edit width={width} />
  </ButtonContainer>
);

export { EditButton };
