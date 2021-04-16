import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { CollectionWithInputs } from '../interfaces';
import { Box } from './box/box';
import { CalendarInput } from './input/calendar-input';
import { Input } from './input/input';
import { InputWithLabel } from './input/input-with-label';
import { NumberInput } from './input/number-input';

export interface PlantInfoProps {
  plantId: string;
  labelTextStyle?: string | string[];
  placeholderSize?: number;
  plantInfo?: Omit<CollectionWithInputs, 'id'>;
}

const PlantInfo: React.FC<PlantInfoProps> = ({
  plantId,
  labelTextStyle,
  plantInfo,
  placeholderSize,
}: PlantInfoProps) => {
  const formik = useFormik({
    initialValues: {
      imageUrl: plantInfo?.imageUrl || '',
      commonName: plantInfo?.commonName || '',
      schedule: plantInfo?.schedule || '',
      notes: plantInfo?.notes || '',
      lastWateredOn: plantInfo?.lastWateredOn || '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: () => undefined,
  });

  return (
    <Box
      width="100%"
      height="100%"
      px="onePointSix"
      py="one"
      flexDirection="column"
    >
      <FormikProvider value={formik}>
        <InputWithLabel
          plantId={plantId}
          name="imageUrl"
          label="Image url:"
          labelTextStyle={labelTextStyle}
          Input={
            <Input
              plantId={plantId}
              name="imageUrl"
              inputTextAlign="left"
              placeholder="https://"
              placeholderSize={placeholderSize}
            />
          }
        />
        <InputWithLabel
          plantId={plantId}
          name="commonName"
          label="Common name:"
          labelTextStyle={labelTextStyle}
          Input={
            <Input
              plantId={plantId}
              name="commonName"
              placeholder="e.g. Devils ivy"
              inputTextAlign="left"
              placeholderSize={placeholderSize}
            />
          }
        />
        <InputWithLabel
          plantId={plantId}
          name="schedule"
          label="Schedule:"
          labelTextStyle={labelTextStyle}
          Input={
            <NumberInput
              plantId={plantId}
              name="schedule"
              startText="Every"
              endText="Day(s)"
              placeholder="e.g. 7"
              inputTextAlign="left"
              placeholderSize={placeholderSize}
            />
          }
        />
        <InputWithLabel
          plantId={plantId}
          name="lastWateredOn"
          label="Last watered on:"
          labelTextStyle={labelTextStyle}
          Input={
            <CalendarInput
              plantId={plantId}
              name="lastWateredOn"
              placeholder="Click to select date"
              placeholderSize={placeholderSize}
            />
          }
        />
        <InputWithLabel
          plantId={plantId}
          name="notes"
          label="You notes:"
          labelTextStyle={labelTextStyle}
          Input={
            <Input
              plantId={plantId}
              name="notes"
              placeholder="e.g. likes soil to be gently moist"
              inputTextAlign="left"
              placeholderSize={placeholderSize}
            />
          }
        />
      </FormikProvider>
    </Box>
  );
};

export { PlantInfo };
