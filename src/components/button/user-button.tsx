import React from 'react';
import { ButtonProps } from '../../interfaces';
import { User } from '../icon/user';
import { ButtonContainer } from './button-container';

const UserButton: React.FC<ButtonProps> = (props: ButtonProps) => (
  <ButtonContainer {...props}>
    <User />
  </ButtonContainer>
);

export { UserButton };
