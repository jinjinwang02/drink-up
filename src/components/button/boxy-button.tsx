import React from 'react';
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
}: BoxyButtonProps) => (
  <Box
    position="fixed"
    bottom={0}
    width="100%"
    height={BUTTON_HEIGHT}
    backgroundColor="pureWhite"
    border="regularBlack"
    px="four"
    justifyContent={onBack ? 'space-between' : 'center'}
  >
    {onBack ? (
      <ArrowButton direction="left" size="small" onClick={onBack} />
    ) : null}
    <ArrowButton direction="right" size="small" onClick={onNext} />
  </Box>
);

export { BoxyButton };
