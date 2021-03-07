import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { Box } from './box/box';
import { EditPlantBoxProps } from './edit-plant-box';
import { InputWithLabel } from './input-with-label';

export interface PlantInfoProps {
  labelTextStyle?: string | string[];
  inputTextStyle?: string | string[];
  placeholderSize?: number;
  plantInfo?: EditPlantBoxProps;
}

const PlantInfo: React.FunctionComponent<PlantInfoProps> = ({
  inputTextStyle,
  labelTextStyle,
  plantInfo,
  placeholderSize,
}: PlantInfoProps) => {
  const formik = useFormik({
    initialValues: {
      imageUrl: plantInfo?.imageUrl || '',
      commonName: plantInfo?.commonName || '',
      scientificName: plantInfo?.scientificName || '',
      habit: plantInfo?.habit || '',
      notes: plantInfo?.notes || '',
      date: plantInfo?.date || '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (value) => {
      console.log(value);
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
          name="imageUrl"
          label="Image url:"
          placeholder="https://"
          formik={formik}
          inputTextStyle={inputTextStyle}
          labelTextStyle={labelTextStyle}
          placeholderSize={placeholderSize}
        />
        <InputWithLabel
          name="commonName"
          label="Common name:"
          placeholder="e.g. Devils ivy"
          formik={formik}
          inputTextStyle={inputTextStyle}
          labelTextStyle={labelTextStyle}
          placeholderSize={placeholderSize}
        />
        <InputWithLabel
          name="scientificName"
          label="Scientific name:"
          placeholder="e.g. Epipremnum aureum"
          formik={formik}
          inputTextStyle={inputTextStyle}
          labelTextStyle={labelTextStyle}
          placeholderSize={placeholderSize}
        />
        <InputWithLabel
          name="habit"
          label="Watering habit:"
          placeholder="e.g. once a week"
          formik={formik}
          inputTextStyle={inputTextStyle}
          labelTextStyle={labelTextStyle}
          placeholderSize={placeholderSize}
        />
        <InputWithLabel
          name="notes"
          label="You notes:"
          placeholder="e.g. likes soil to be gently moist"
          formik={formik}
          inputTextStyle={inputTextStyle}
          labelTextStyle={labelTextStyle}
          placeholderSize={placeholderSize}
        />
        <InputWithLabel
          name="date"
          label="Last watered on:"
          placeholder="e.g. 27/02/2020"
          formik={formik}
          inputTextStyle={inputTextStyle}
          labelTextStyle={labelTextStyle}
          placeholderSize={placeholderSize}
        />
      </FormikProvider>
    </Box>
  );
};

export { PlantInfo };
