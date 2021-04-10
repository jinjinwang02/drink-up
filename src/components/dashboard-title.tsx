import React from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { CollectionFromDB } from '../interfaces';
import { Box } from './box/box';
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
  return (
    <>
      <Typography textStyle={['h2', 'h2', 'h2', 'h1']}>
        Hi {displayName ?? 'there'},
      </Typography>
      {!isXS ? (
        <Typography
          textStyle={['h2', 'h2', 'h2', 'h1']}
          mt={['one', 'one', 'two', 'two']}
        >
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
      <Box
        mt={['one', 'three']}
        mb={['zero', 'four']}
        justifyContent={['center', 'flex-start']}
        flexWrap="wrap"
      >
        {plantsDueTomorrow.length ? (
          <>
            {plantsDueTomorrow.map((el) => (
              <Typography key={el.id} textStyle="bodyL">
                {el.commonName},&nbsp;
              </Typography>
            ))}
            <Typography textStyle="bodyL">
              {plantsDueTomorrow.length > 1 ? 'need' : 'needs'} to be
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
