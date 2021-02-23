import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
  InputWithLabel,
  InputWithLabelProps,
} from '../components/input-with-label';
import { FormikProvider, useFormik } from 'formik';
import { Box } from '../components/box/box';

export default {
  title: 'Input with label',
  component: InputWithLabel,
} as Meta;

const Template: Story<InputWithLabelProps> = ({ name, label }) => {
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
        <InputWithLabel name={name} label={label} formik={formik} />
      </FormikProvider>
    </Box>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  name: 'email',
  label: 'Email',
};
