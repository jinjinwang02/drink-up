import React from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { CollectionFromDB } from '../interfaces';
import { theme } from '../theme';
import { Box } from './box/box';
import { ButtonContainer } from './button/button-container';
import { Typography } from './typography';

interface PlantsListProps {
  plant: CollectionFromDB;
  indexDifference: number;
  isCurrentPlant: boolean;
  onClickTitle: (id: string) => void;
}

const PlantsList: React.FC<PlantsListProps> = ({
  plant,
  indexDifference,
  isCurrentPlant,
  onClickTitle,
}: PlantsListProps) => {
  const { isXS } = useMediaQuery();
  const getGradientProps = (difference: number) => {
    if (isXS) return undefined;
    const sharedProps = {
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      transition: theme.transitions.basic.slow,
    };
    if (difference === 3) {
      return {
        background: `-webkit-linear-gradient(${theme.colors.lightestGrey}, ${theme.colors.mediumGrey})`,
        ...sharedProps,
      };
    } else if (difference === -3) {
      return {
        background: `-webkit-linear-gradient(${theme.colors.mediumGrey}, ${theme.colors.lightestGrey})`,
        ...sharedProps,
      };
    }
  };

  return (
    <Box id="title" mb={['two', 'twoPointTwo']}>
      <ButtonContainer onClick={() => onClickTitle(plant.id)}>
        <Typography
          textStyle={['h5', 'h5', 'h3']}
          style={getGradientProps(indexDifference)}
          color={
            isCurrentPlant
              ? 'pureBlack'
              : (indexDifference > 3 || indexDifference < -3) && !isXS
              ? 'lightestGrey'
              : 'mediumGrey'
          }
        >
          {plant.commonName.length > 18
            ? plant.commonName.slice(0, 18) + '...'
            : plant.commonName}
        </Typography>
      </ButtonContainer>
    </Box>
  );
};

export { PlantsList };
