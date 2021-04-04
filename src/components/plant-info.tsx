import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { CollectionWithInputs } from '../interfaces';
import { Box } from './box/box';
import { CalendarInput } from './input/calendar-input';
import { Input } from './input/input';
import { InputWithLabel } from './input/input-with-label';

export interface PlantInfoProps {
  plantId: string;
  labelTextStyle?: string | string[];
  inputTextStyle?: string | string[];
  placeholderSize?: number;
  plantInfo?: Omit<CollectionWithInputs, 'id'>;
}

const PlantInfo: React.FC<PlantInfoProps> = ({
  plantId,
  inputTextStyle,
  labelTextStyle,
  plantInfo,
  placeholderSize,
}: PlantInfoProps) => {
  const formik = useFormik({
    initialValues: {
      imageUrl: plantInfo?.imageUrl || '',
      commonName: plantInfo?.commonName || '',
      habit: plantInfo?.habit || '',
      notes: plantInfo?.notes || '',
      lastWateredOn: plantInfo?.lastWateredOn || '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);
    },
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
              formik={formik}
              inputTextAlign="left"
              placeholder="https://"
              placeholderSize={placeholderSize}
              inputTextStyle={inputTextStyle}
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
              formik={formik}
              placeholder="e.g. Devils ivy"
              inputTextAlign="left"
              placeholderSize={placeholderSize}
              inputTextStyle={inputTextStyle}
            />
          }
        />
        <InputWithLabel
          plantId={plantId}
          name="habit"
          label="Watering habit:"
          labelTextStyle={labelTextStyle}
          Input={
            <Input
              plantId={plantId}
              name="habit"
              formik={formik}
              placeholder="e.g. 7"
              inputTextAlign="left"
              placeholderSize={placeholderSize}
              inputTextStyle={inputTextStyle}
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
              formik={formik}
              placeholder="e.g. likes soil to be gently moist"
              inputTextAlign="left"
              placeholderSize={placeholderSize}
              inputTextStyle={inputTextStyle}
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
              formik={formik}
              placeholder="Click to select date"
              inputTextAlign="left"
              placeholderSize={placeholderSize}
              inputTextStyle={inputTextStyle}
            />
          }
        />
      </FormikProvider>
    </Box>
  );
};

export { PlantInfo };
