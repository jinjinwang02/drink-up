import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useRouter } from 'next/router';
import { firebaseClient } from '../../utils/firebase/firebase-client';
import { FormikProvider, useFormik } from 'formik';
import { Content } from './content';
import * as Yup from 'yup';
import { Box } from '../box/box';
import { Arrow } from '../icon/arrow';
import { ArrowButton } from '../button';

interface LogInProps {
  step: number;
  onPressNext: () => void;
  onPressBack?: () => void;
}

export const EmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required field :)'),
});
const PasswordSchema = Yup.object().shape({
  password: Yup.string().required('Required field :)'),
});

const LogIn = ({ step, onPressBack, onPressNext }: LogInProps) => {
  firebaseClient();
  const router = useRouter();
  const initialValues = {
    email: '',
    password: '',
  };
  const emailFormik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: EmailSchema,
    onSubmit: async () => {
      await firebase
        .auth()
        .fetchSignInMethodsForEmail(emailFormik.values.email)
        .then((res) => {
          if (!res.length) {
            emailFormik.setFieldError('email', 'This email is not registered.');
          } else {
            onPressNext();
          }
        });
    },
  });
  const passwordFormik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: PasswordSchema,
    onSubmit: async () => {
      await firebase
        .auth()
        .signInWithEmailAndPassword(
          emailFormik.values.email,
          passwordFormik.values.password
        )
        .then(() => router.push('/authenticated'))
        .catch((error) => {
          passwordFormik.setFieldError('password', error.message);
        });
    },
  });

  return (
    <FormikProvider value={step === 1 ? emailFormik : passwordFormik}>
      <form
        onSubmit={
          step === 1 ? emailFormik.handleSubmit : passwordFormik.handleSubmit
        }
      >
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
