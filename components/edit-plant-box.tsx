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
  imageUrl?: string;
  commonName: string;
  scientificName?: string;
  habit: string;
  notes?: string;
  date: string;
}

const EditPlantBox = ({
  commonName,
  imageUrl = 'http://placeimg.com/640/360/any',
  scientificName,
  habit,
  notes,
  date,
}: EditPlantBoxProps) => (
  <Box flexDirection="column">
    <BoxWithImage
      width={[BOX_WIDTH_XS, BOX_WIDTH_MD]}
      topBoxHeight={[TOP_BOX_HEIGHT_XS, TOP_BOX_HEIGHT_MD]}
      imageUrl={imageUrl}
      imageText={`About the ${commonName}...`}
      bottomAccessory={
        <PlantInfo
          plantInfo={{ commonName, scientificName, habit, notes, date }}
          labelTextStyle="copyS"
          placeholderSize={theme.textStyles.copyS.fontSize - 1}
        />
      }
    />
    <Box mt="five" width="100%" justifyContent="space-between">
      <Cross /> <Bin /> <Arrow size="large" />
    </Box>
  </Box>
);

export { EditPlantBox };
