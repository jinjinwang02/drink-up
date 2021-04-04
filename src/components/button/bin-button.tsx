import React from 'react';
import { ButtonProps } from '../../interfaces';
import { Bin } from '../icon/bin';
import { ButtonContainer } from './button-container';

const BinButton: React.FC<ButtonProps> = (props: ButtonProps) => (
  <ButtonContainer {...props}>
    <Bin />
  </ButtonContainer>
);

export { BinButton };
