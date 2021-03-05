import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Input, InputProps } from '../components/input';
import { FormikProvider, useFormik } from 'formik';
import { Box } from '../components/box/box';

export default {
  title: 'Input',
  component: Input,
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
        <Input name={name} label={label} formik={formik} />
      </FormikProvider>
    </Box>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  name: 'email',
  label: 'Email',
};
