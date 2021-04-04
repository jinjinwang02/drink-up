import React from 'react';
import { theme } from '../styles/theme';
import { Box } from './box/box';
import { BoxWithImage } from './box/box-with-image';
import { PlantInfo } from './plant-info';
import { ArrowButton } from './button/arrow-button';
import { CrossButton } from './button/cross-button';
import { BinButton } from './button/bin-button';
import { Typography } from './typography';
import { usePlantContext } from '../context/plant-context';

export const BOX_WIDTH_MD = 342;
const BOX_WIDTH_XS = 275;

const TOP_BOX_HEIGHT_MD = 370;
const TOP_BOX_HEIGHT_XS = 297;

export interface EditPlantBoxProps {
  id: string;
  commonName: string;
  schedule: string;
  lastWateredOn: string;
  imageUrl?: string;
  notes?: string;
  showControl?: boolean;
  onCancel?: () => void;
  onDelete?: () => void;
  onSubmit?: () => void;
}

const EditPlantBox: React.FC<EditPlantBoxProps> = ({
  id,
  commonName,
  imageUrl,
  schedule,
  notes,
  lastWateredOn,
  showControl,
  onCancel = () => null,
  onDelete = () => null,
  onSubmit = () => null,
}: EditPlantBoxProps) => {
  const { inputErrors } = usePlantContext();
  const errorFields = inputErrors && inputErrors[id];

  return (
    <Box flexDirection="column">
      <BoxWithImage
        width={[BOX_WIDTH_XS, BOX_WIDTH_MD]}
        topBoxHeight={[TOP_BOX_HEIGHT_XS, TOP_BOX_HEIGHT_MD]}
        imageUrl={imageUrl}
        imageText={`About the ${commonName}...`}
        bottomAccessory={
          <Box
            width="100%"
            mb={[showControl ? 'fourPointFive' : 'zero', 'zero']}
          >
            <PlantInfo
              plantId={id}
              plantInfo={{
                commonName,
                imageUrl,
                schedule,
                notes,
                lastWateredOn,
              }}
              placeholderSize={theme.textStyles.copyS.fontSize - 1}
            />
          </Box>
        }
      />
      {showControl ? (
        <Box
          position={['absolute', 'relative']}
          px={['two', 'zero']}
          width="100%"
          mt={['zero', 'five']}
          bottom={['twoPointTwo', 'zero']}
          justifyContent="space-between"
        >
          <CrossButton onClick={onCancel} /> <BinButton onClick={onDelete} />
          <ArrowButton size="large" onClick={onSubmit} />
        </Box>
      ) : null}
      <Box width="100%" flexDirection="column" mt="one" alignItems="flex-start">
        {Array.isArray(errorFields) &&
          errorFields?.map((el) => (
            <Typography key={el.name} textStyle="bodyM" color="warningRed">
              {el.errorMessage}
            </Typography>
          ))}
      </Box>
    </Box>
  );
};

export { EditPlantBox };
