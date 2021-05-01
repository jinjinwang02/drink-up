import React, { useMemo } from 'react';
import { useSpring } from 'react-spring';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { CollectionFromDB } from '../interfaces';
import { AnimatedBox } from './box/animatedBox';
import { Typography } from './typography';

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
  const props = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
  });
  const footerProps = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 200,
  });
  return (
    <>
      <AnimatedBox style={props}>
        <Typography textStyle={['h2', 'h2', 'h2', 'h1']}>
          Hi {displayName ?? 'there'},
        </Typography>
      </AnimatedBox>
      <AnimatedBox style={props} mb="two">
        {!isXS ? (
          <Typography textStyle={['h2', 'h2', 'h2', 'h1']}>
            {plantAmount
              ? `You have ${plantAmount} plants.`
              : `You haven't added any plants.`}
          </Typography>
        ) : (
          <Typography textStyle="h3">
            {plantAmount
              ? `You have ${plantAmount} plants.`
              : `You haven't added any plants.`}
          </Typography>
        )}
      </AnimatedBox>
      <AnimatedBox
        style={footerProps}
        justifyContent={['center', 'flex-start']}
        flexWrap="wrap"
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
      </AnimatedBox>
    </>
  );
};

export { DashboardTitle };
