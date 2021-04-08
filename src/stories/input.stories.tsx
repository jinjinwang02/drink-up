import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Input as InputComponent, InputProps } from '../components/input/input';
import { FormikProvider, useFormik } from 'formik';
import { Box } from '../components/box/box';

export default {
  title: 'Components/Input',
  component: InputComponent,
  args: {
    name: 'email',
    label: 'Email',
  },
} as Meta;

export const Input: Story<InputProps> = ({ name, label }) => {
  const formik = useFormik({
    initialValues: {
      [name]: '',
    },
    onSubmit: () => undefined,
  });

  return (
    <Box width={300}>
      <FormikProvider value={formik}>
        <InputComponent name={name} label={label} formik={formik} />
      </FormikProvider>
    </Box>
  );
};
