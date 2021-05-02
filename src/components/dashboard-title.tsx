import React, { useMemo } from 'react';
import { useSpring } from 'react-spring';
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
  const plantList = useMemo(
    () => plantsDueTomorrow.map((el) => el.commonName),
    [plantsDueTomorrow]
  );
  const primaryTitleFadeInProps = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
  });
  const secondaryTitleFadeInProps = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    delay: 200,
  });
  const footerFadeInProps = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 400,
  });
  return (
    <>
      <AnimatedBox style={primaryTitleFadeInProps}>
        <Typography textStyle={['h2', 'h2', 'h2', 'h1']} mb="one">
          Hi {displayName ?? 'there'},
        </Typography>
      </AnimatedBox>
      <AnimatedBox style={secondaryTitleFadeInProps} mb="two">
        <Typography textStyle={['h3', 'h2', 'h2', 'h1']}>
          {plantAmount
            ? `You have ${plantAmount} plants.`
            : `You haven't added any plants.`}
        </Typography>
      </AnimatedBox>
      <AnimatedBox
        style={footerFadeInProps}
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
