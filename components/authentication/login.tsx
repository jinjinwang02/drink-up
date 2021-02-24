import { FormikContextType, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { Content } from './content';
import * as Yup from 'yup';
import { Box } from '../box/box';
import { Arrow } from '../arrow';
import { ArrowButton } from '../button';

export interface LogInCredentials {
  email: string;
  password: string;
}

interface LogInProps {
  step: number;
  values: LogInCredentials;
  setValues: (values: LogInCredentials) => void;
  onPressNext: () => void;
  onPressBack?: () => void;
}

export const EmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required field :)'),
});
const PasswordSchema = Yup.object().shape({
  password: Yup.string().required('Required field :)'),
});

const LogIn = ({
  step,
  values,
  setValues,
  onPressBack,
  onPressNext,
}: LogInProps) => {
  const emailFormik = useFormik({
    initialValues: {
      email: values.email,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: EmailSchema,
    onSubmit: () => {
      setValues({
        email: emailFormik.values.email,
        password: passwordFormik.values.password,
      });
      onPressNext();
    },
  });
  const passwordFormik = useFormik({
    initialValues: {
      password: values.password,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: PasswordSchema,
    onSubmit: () => {
      setValues({
        email: emailFormik.values.email,
        password: passwordFormik.values.password,
      });
    },
  });

  const getCurrentFormik = () => {
    if (step === 1) {
      return emailFormik;
    } else if (step === 2) {
      return passwordFormik;
    }
  };

  const getSubmit = () => {
    if (step === 1) {
      return emailFormik.handleSubmit;
    } else if (step === 2) {
      return passwordFormik.handleSubmit;
    }
  };

  return (
    <FormikProvider value={getCurrentFormik() as FormikContextType<any>}>
      <form onSubmit={getSubmit()}>
        <Box position="relative" height="100%" width="100%">
          {step !== 1 ? (
            <Box
              zIndex={1}
              onClick={onPressBack}
              position="absolute"
              top="two"
              left="20%"
            >
              <Arrow size="small" direction="left" />
            </Box>
          ) : null}
          <Content
            text="Log in to check on your plants"
            name="email"
            label="Email"
            formik={emailFormik}
            step={step}
            isLogin
            isCurrentStep={step === 1}
            zIndex={step === 1 ? 1 : 0}
          />
          <Content
            text="Password?"
            name="password"
            label="Password"
            type="password"
            formik={passwordFormik}
            step={step}
            isLogin
            isCurrentStep={step === 2}
            zIndex={step === 2 ? 1 : 0}
          />
          <Box position="absolute" bottom="twoPointEight" zIndex={10}>
            <ArrowButton />
          </Box>
        </Box>
      </form>
    </FormikProvider>
  );
};

export { LogIn };
