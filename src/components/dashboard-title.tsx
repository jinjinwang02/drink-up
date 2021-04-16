import React, { useEffect, useMemo, useRef } from 'react';
import { gsap, TweenLite, Power3 } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { CSSPlugin } from 'gsap/CSSPlugin';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { CollectionFromDB } from '../interfaces';
import { Box } from './box/box';
import { Typography } from './typography';
import { theme } from '../styles/theme';

gsap.registerPlugin(MotionPathPlugin, CSSPlugin);

interface DashboardTitleProps {
  displayName?: string;
  plantsDueTomorrow: CollectionFromDB[];
  plantAmount?: number;
}

const DashboardTitle: React.FC<DashboardTitleProps> = ({
  displayName,
  plantsDueTomorrow,
  plantAmount,
}: DashboardTitleProps) => {
  const { isXS } = useMediaQuery();
  const plantList = useMemo(
    () => plantsDueTomorrow.map((el) => el.commonName),
    [plantsDueTomorrow]
  );
  const titlePartOne = useRef(null);
  const titlePartTwo = useRef(null);
  const titleFooter = useRef(null);
  useEffect(() => {
    TweenLite.to([titlePartOne.current, titlePartTwo.current], 0.8, {
      y: -40,
      ease: Power3.easeInOut,
    });
    TweenLite.to(titleFooter.current, 0.8, {
      opacity: 1,
      ease: Power3.easeInOut,
      delay: 0.4,
    });
  }, []);
  return (
    <>
      <Typography
        mt="two"
        textStyle={['h2', 'h2', 'h2', 'h1']}
        ref={titlePartOne}
      >
        Hi {displayName ?? 'there'},
      </Typography>
      {!isXS ? (
        <Typography
          textStyle={['h2', 'h2', 'h2', 'h1']}
          mt={['one', 'one', 'two', 'two']}
          ref={titlePartTwo}
        >
          {plantAmount
            ? `You have ${plantAmount} plants.`
            : `You haven't added any plants.`}
        </Typography>
      ) : (
        <Typography textStyle="h3" ref={titlePartTwo}>
          {plantAmount
            ? `You have ${plantAmount} plants.`
            : `You haven't added any plants.`}
        </Typography>
      )}
      <Box
        ref={titleFooter}
        mt={-theme.space.one}
        mb={['zero', 'four']}
        justifyContent={['center', 'flex-start']}
        flexWrap="wrap"
        style={{ opacity: 0 }}
      >
        {plantsDueTomorrow.length ? (
          <>
            <Typography textStyle="bodyL" mr="zeroPointSix">
              {plantList.length > 2
                ? plantList.slice(0, plantList.length - 2).join(', ') +
                  ', ' +
                  plantList
                    .slice(plantList.length - 2, plantList.length)
                    .join(' and ')
                : plantList.join(' and ')}
            </Typography>

            <Typography textStyle="bodyL">
              {plantsDueTomorrow.length > 1 ? ' need' : 'needs'} to be
              watered&nbsp;
            </Typography>
            <Typography textStyle="bodyLBold">tomorrow.</Typography>
          </>
        ) : plantAmount ? (
          <Typography textStyle="bodyL">All sufficently hydrated :)</Typography>
        ) : (
          <Typography textStyle="bodyL">Why not adding some?</Typography>
        )}
      </Box>
    </>
  );
};

export { DashboardTitle };
