import React, { useMemo } from 'react';
import { useSpring } from 'react-spring';
import { CollectionFromDB } from '../interfaces';
import { getPlantNamesInSentence } from '../utils';
import { AnimatedBox } from './box/animatedBox';
import { Typography } from './typography';

interface DashboardTitleProps {
  displayName?: string;
  plantsDueTomorrow: CollectionFromDB[];
  plantsDueInThePast: CollectionFromDB[];
  plantAmount?: number;
}

const DashboardTitle: React.FC<DashboardTitleProps> = ({
  displayName,
  plantsDueTomorrow,
  plantsDueInThePast,
  plantAmount,
}: DashboardTitleProps) => {
  const plantDueTomorrowList = useMemo(
    () => plantsDueTomorrow.map((el) => el.commonName),
    [plantsDueTomorrow]
  );
  const plantsDueInThePastList = useMemo(
    () => plantsDueInThePast.map((el) => el.commonName),
    [plantsDueInThePast]
  );
  const primaryTitleFadeInProps = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
  });
  const secondaryTitleFadeInProps = useSpring({
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    delay: 100,
  });
  const footerFadeInProps = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 200,
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
        flexDirection={['column', 'row']}
        justifyContent={['center', 'flex-start']}
        flexWrap="wrap"
      >
        {plantDueTomorrowList.length ? (
          <>
            <Typography
              textAlign={['center', 'left']}
              textStyle="bodyL"
              mr={['zero', 'zeroPointSix']}
            >
              {getPlantNamesInSentence(plantDueTomorrowList)}
            </Typography>
            <Typography textAlign={['center', 'left']} textStyle="bodyL">
              {plantsDueTomorrow.length > 1 ? ' need' : 'needs'} to be
              watered&nbsp;
            </Typography>
            <Typography textStyle="bodyLBold">tomorrow.</Typography>
          </>
        ) : null}

        {plantsDueInThePastList.length ? (
          <>
            <Typography
              textAlign={['center', 'left']}
              textStyle="bodyL"
              mr={['zero', 'zeroPointSix']}
            >
              {getPlantNamesInSentence(plantsDueInThePastList)}
            </Typography>
            <Typography
              textAlign={['center', 'left']}
              textStyle="bodyLBold"
              color="warningRed"
            >
              missed the watering date!
            </Typography>
          </>
        ) : null}

        {!plantDueTomorrowList.length && !plantsDueInThePast.length ? (
          plantAmount ? (
            <Typography textStyle="bodyL">
              All sufficently hydrated :)
            </Typography>
          ) : (
            <Typography textStyle="bodyL">Why not adding some?</Typography>
          )
        ) : null}
      </AnimatedBox>
    </>
  );
};

export { DashboardTitle };
