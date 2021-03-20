import css from '@styled-system/css';
import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { theme } from '../../styles/theme';
import { Box } from '../box/box';
import { ArrowButton } from './arrow-button';

const BUTTON_HEIGHT = 60;

interface BoxyButtonProps {
  onNext?: () => void;
  onBack?: () => void;
}

const BoxyButton: React.FC<BoxyButtonProps> = ({
  onNext,
  onBack,
}: BoxyButtonProps) => {
  const isXS = useMediaQuery();
  return (
    <Box
      position="fixed"
      bottom={0}
      width="100%"
      height={BUTTON_HEIGHT}
      justifyContent={onBack ? 'space-around' : 'center'}
      backgroundColor="pureWhite"
      border="regularBlack"
      px="four"
      transition={theme.transitions.quick}
      css={css({
        ' &:hover': {
          height: BUTTON_HEIGHT + 5,
        },
      })}
    >
      {onBack ? (
        <ArrowButton
          direction="left"
          size={isXS ? 'small' : 'large'}
          onClick={onBack}
        />
      ) : null}
      <ArrowButton
        direction="right"
        size={isXS ? 'small' : 'large'}
        onClick={onNext}
      />
    </Box>
  );
};

export { BoxyButton };
