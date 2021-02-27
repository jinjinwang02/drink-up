import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { Box } from './box/box';
import { InputWithLabel } from './input-with-label';

export interface PlantInfoProps {
  textStyle?: string | string[];
}

const PlantInfo = () => {
  const formik = useFormik({
    initialValues: {
      imageUrl: '',
      commonName: '',
      scientificName: '',
      habit: '',
      notes: '',
      date: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (value) => {
      console.log(value);
    },
  });
  return (
    <Box width="100%" height="100%" p="onePointSix" flexDirection="column">
      <FormikProvider value={formik}>
        <InputWithLabel
          name="imageUrl"
          label="Image url:"
          placeholder="https://"
          formik={formik}
        />
        <InputWithLabel
          name="commonName"
          label="Common name:"
          placeholder="e.g. Devils ivy"
          formik={formik}
        />
        <InputWithLabel
          name="scientificName"
          label="Scientific name:"
          placeholder="e.g. Epipremnum aureum"
          formik={formik}
        />
        <InputWithLabel
          name="habit"
          label="Watering habit:"
          placeholder="e.g. once a week"
          formik={formik}
        />
        <InputWithLabel
          name="notes"
          label="You notes:"
          placeholder="e.g. likes soil to be gently moist"
          formik={formik}
        />
        <InputWithLabel
          name="date"
          label="Last watered on:"
          placeholder="e.g. 27/02/2020"
          formik={formik}
        />
      </FormikProvider>
    </Box>
  );
};

export { PlantInfo };
