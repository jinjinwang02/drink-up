import React, { useState } from 'react';
import { BoxWithCloud } from './box/box-with-cloud';
import { Box } from './box/box';
import { Typography } from './typography';
import { TextWithAnimatedUnderline } from './text-with-animated-underline';
import { FormikProvider, useFormik } from 'formik';
import { InputWithLabel } from './input-with-label';
import { Arrow } from './arrow';

const Authentication = () => {
  const [isLogIn, setLogIn] = useState<boolean>(true);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: () => {
      console.log(formik.values.email);
    },
  });
  return (
    <BoxWithCloud
      topAccessory={
        <>
          <TextWithAnimatedUnderline
            onClick={() => setLogIn(true)}
            focused={isLogIn}
          >
            Log in
          </TextWithAnimatedUnderline>
          <Typography mx="one" textStyle="copyL">
            /
          </Typography>
          <TextWithAnimatedUnderline
            onClick={() => setLogIn(false)}
            focused={!isLogIn}
          >
            Sign up
          </TextWithAnimatedUnderline>
        </>
      }
      bottomAccessory={
        <Box
          flexDirection="column"
          height="100%"
          width="100%"
          pt="four"
          pb="three"
          px="five"
        >
          <Typography
            textStyle="copyM"
            textAlign="center"
            px="onePointFour"
            pb="twoPointSix"
          >
            {isLogIn
              ? 'Log in to check on your plants'
              : 'Sign up to keep your plants well and hydrated'}
          </Typography>
          <FormikProvider value={formik}>
            <InputWithLabel name="email" label="Email" formik={formik} />
            <Arrow />
          </FormikProvider>
        </Box>
      }
    />
  );
};

export { Authentication };
