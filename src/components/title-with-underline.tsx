import React, { useEffect, useRef, useState } from 'react';
import { Box } from './box/box';
import { Typography } from './typography';
import { Underline } from './icon/underline';

export interface TitleWithUnderlineProps {
  children: string;
  widthRatio?: number;
  variant?: 'primary' | 'secondary';
}

const TitleWithUnderline: React.FC<TitleWithUnderlineProps> = ({
  children,
  widthRatio = 1.05,
  variant = 'primary',
}: TitleWithUnderlineProps) => {
  const targetRef = useRef<any>();
  const [textWidth, setWidth] = useState<number>(0);
  useEffect(() => {
    if (targetRef.current) {
      setWidth(targetRef.current.offsetWidth);
    }
  }, []);
  return (
    <Box flexDirection="column">
      <Typography
        ref={targetRef}
        textStyle={
          variant === 'primary'
            ? ['h2', 'h1', 'h1', 'h1']
            : ['copyXL', 'h4', 'h2', 'h2']
        }
      >
        {children}
      </Typography>
      <Box
        position="absolute"
        top={variant === 'primary' ? ['four', 'fourPointFive'] : 'three'}
        left="50%"
        style={{ transform: 'translateX(-50%)' }}
      >
        <Underline variant={variant} width={textWidth * widthRatio} />
      </Box>
    </Box>
  );
};

export { TitleWithUnderline };
