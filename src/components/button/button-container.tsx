import React from 'react';
import { ButtonProps } from '../../interfaces';
import { Box } from '../box/box';
import * as CSS from 'csstype';

interface ButtonContainerProps extends ButtonProps {
  children: React.ReactNode;
  additionalStyles?: CSS.Properties;
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  onClick,
  type,
  disabled,
  children,
  additionalStyles,
  ...props
}) => (
  <Box
    as="button"
    type={type}
    background="transparent"
    border="none"
    disabled={disabled}
    onClick={onClick}
    style={{
      ...additionalStyles,
      outline: 'none',
      cursor: disabled ? 'default' : 'pointer',
    }}
    {...props}
  >
    {children}
  </Box>
);

export { ButtonContainer };
