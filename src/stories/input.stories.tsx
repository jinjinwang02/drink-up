import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Input as InputComponent, InputProps } from '../components/input';
import { FormikProvider, useFormik } from 'formik';
import { Box } from '../components/box/box';

export default {
  title: 'Components/Input',
  component: InputComponent,
} as Meta;

const Template: Story<InputProps> = ({ name, label }) => {
  const formik = useFormik({
    initialValues: {
      [name]: '',
    },
    onSubmit: () => {
      console.log(formik.values[name]);
    },
  });

  return (
    <Box width={300}>
      <FormikProvider value={formik}>
        <InputComponent id={name} name={name} label={label} formik={formik} />
      </FormikProvider>
    </Box>
  );
};

export const Input = Template.bind({});
Input.args = {
  name: 'email',
  label: 'Email',
};
