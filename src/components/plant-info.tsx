import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { Box } from './box/box';
import { EditPlantBoxProps } from './edit-plant-box';
import { InputWithLabel } from './input-with-label';

export interface PlantInfoProps {
  id: string;
  labelTextStyle?: string | string[];
  inputTextStyle?: string | string[];
  placeholderSize?: number;
  plantInfo?: Omit<EditPlantBoxProps, 'id'>;
}

const PlantInfo: React.FC<PlantInfoProps> = ({
  id,
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
          id={id}
          name="imageUrl"
          label="Image url:"
          placeholder="https://"
          formik={formik}
          inputTextStyle={inputTextStyle}
          labelTextStyle={labelTextStyle}
          placeholderSize={placeholderSize}
        />
        <InputWithLabel
          id={id}
          name="commonName"
          label="Common name:"
          placeholder="e.g. Devils ivy"
          formik={formik}
          inputTextStyle={inputTextStyle}
          labelTextStyle={labelTextStyle}
          placeholderSize={placeholderSize}
        />
        <InputWithLabel
          id={id}
          name="habit"
          label="Watering habit:"
          placeholder="e.g. once a week"
          formik={formik}
          inputTextStyle={inputTextStyle}
          labelTextStyle={labelTextStyle}
          placeholderSize={placeholderSize}
        />
        <InputWithLabel
          id={id}
          name="notes"
          label="You notes:"
          placeholder="e.g. likes soil to be gently moist"
          formik={formik}
          inputTextStyle={inputTextStyle}
          labelTextStyle={labelTextStyle}
          placeholderSize={placeholderSize}
        />
        <InputWithLabel
          id={id}
          name="lastWateredOn"
          label="Last watered on:"
          placeholder="Click to select date"
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
