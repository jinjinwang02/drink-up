import React, { useState } from 'react';
import { Arrow, ArrowProps } from '../icon/arrow';
import { theme } from '../../styles/theme';
import { ButtonProps } from '../../interfaces';
import { ButtonContainer } from './button-container';

type ArrowButtonProps = ArrowProps & ButtonProps;

const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction = 'right',
  size = 'medium',
  ...props
}: ArrowButtonProps) => {
  const [isHovered, setHovered] = useState<boolean>(false);
  const getTranslate = () => {
    if (isHovered) {
      if (size === 'small') {
        return direction === 'right' ? 'translateX(20%)' : 'translateX(-20%)';
      } else if (size === 'medium') {
        return direction === 'right' ? 'translateX(25%)' : 'translateX(-25%)';
      } else if (size === 'large' || size === 'extraLarge') {
        return direction === 'right' ? 'translateX(15%)' : 'translateX(-15%)';
      }
    }
    return 'translateX(0)';
  };
  return (
    <ButtonContainer
      {...props}
      type={props.type || 'submit'}
      additionalStyles={{
        transform: props.disabled ? undefined : getTranslate(),
        transition: theme.transitions.basic.medium,
      }}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <Arrow
        direction={direction}
        color={
          props.disabled ? theme.colors.mediumGrey : theme.colors.pureBlack
        }
        size={size}
      />
    </ButtonContainer>
  );
};

export { ArrowButton };
