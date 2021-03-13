import React from 'react';
import { theme } from '../styles/theme';
import { Arrow } from './icon/arrow';
import { Box } from './box/box';
import { BoxWithImage } from './box/box-with-image';
import { Cross } from './icon/cross';
import { PlantInfo } from './plant-info';
import { Bin } from './icon/bin';

const BOX_WIDTH_MD = 342;
const BOX_WIDTH_XS = 275;

const TOP_BOX_HEIGHT_MD = 370;
const TOP_BOX_HEIGHT_XS = 297;

export interface EditPlantBoxProps {
  id: string;
  commonName: string;
  habit?: string;
  notes?: string;
  date?: string;
  imageUrl?: string;
  showControl?: boolean;
}

const EditPlantBox: React.FC<EditPlantBoxProps> = ({
  id,
  commonName,
  imageUrl = 'http://placeimg.com/640/360/any',
  habit,
  notes,
  date,
  showControl,
}: EditPlantBoxProps) => (
  <Box flexDirection="column">
    <BoxWithImage
      width={[BOX_WIDTH_XS, BOX_WIDTH_MD]}
      topBoxHeight={[TOP_BOX_HEIGHT_XS, TOP_BOX_HEIGHT_MD]}
      imageUrl={imageUrl}
      imageText={`About the ${commonName}...`}
      bottomAccessory={
        <Box width="100%" mb={['fourPointFive', 'zero']}>
          <PlantInfo
            id={id}
            plantInfo={{ commonName, imageUrl, habit, notes, date }}
            inputTextStyle={['bodyXS', 'bodyS', 'bodyS', 'bodyS']}
            labelTextStyle={['copyXS', 'copyS', 'copyS', 'copyS']}
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
        <Cross /> <Bin /> <Arrow size="large" />
      </Box>
    ) : null}
  </Box>
);

export { EditPlantBox };
