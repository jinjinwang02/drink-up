import React from 'react';
import 'firebase/auth';
import { useRouter } from 'next/router';
import { firebaseClient } from '../../utils/firebase/firebase-client';
import { FormikContextType, FormikProvider, useFormik } from 'formik';
import { Content } from './content';
import * as Yup from 'yup';
import { EmailSchema } from './login';
import { Box } from '../box/box';
import { Arrow } from '../icon/arrow';
import { ArrowButton } from '../button';

interface SignUpProps {
  step: number;
  onPressNext: () => void;
  onPressBack?: () => void;
}

export const PASSWORD_MAX_MESSAGE = 'Too much! Try less than 16 characters';
export const PASSWORD_MIN_MESSAGE = 'Not safe enough! 8 characters minimum.';

const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Required field :)')
    .min(8, PASSWORD_MIN_MESSAGE)
    .max(16, PASSWORD_MAX_MESSAGE),
});
const SignUp = ({ step, onPressBack, onPressNext }: SignUpProps) => {
  const { auth } = firebaseClient();
  const router = useRouter();
  const initialValues = {
    email: '',
    displayName: '',
    password: '',
    passwordConfirmation: '',
  };
  const emailFormik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: EmailSchema,
    onSubmit: async () => {
      await auth
        .fetchSignInMethodsForEmail(emailFormik.values.email)
        .then((res) => {
          if (res.length) {
            emailFormik.setFieldError(
              'email',
              'This Email has already registered.'
            );
          } else {
            onPressNext();
          }
        });
    },
  });
  const displayNameFormik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {
      onPressNext();
    },
  });
  const passwordFormik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: PasswordSchema,
    onSubmit: () => {
      onPressNext();
    },
  });
  const passwordConfirmationFormik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (value) => {
      if (value.passwordConfirmation === passwordFormik.values.password) {
        await auth
          .createUserWithEmailAndPassword(
            emailFormik.values.email,
            passwordConfirmationFormik.values.passwordConfirmation
          )
          .then(() => router.push('/authenticated'))
          .catch((error) => {
            passwordConfirmationFormik.setFieldError(
              'passwordConfirmation',
              error.message
            );
          });
      } else {
        passwordConfirmationFormik.setFieldError(
          'passwordConfirmation',
          "Oops, passwords didn't match"
        );
      }
    },
  });

  const getCurrentFormik = (step: number) => {
    switch (step) {
      case 1:
        return emailFormik;
      case 2:
        return displayNameFormik;
      case 3:
        return passwordFormik;
      case 4:
        passwordConfirmationFormik;
    }
  };

  const getSubmit = (step: number) => {
    switch (step) {
      case 1:
        return emailFormik.handleSubmit;
      case 2:
        return displayNameFormik.handleSubmit;
      case 3:
        return passwordFormik.handleSubmit;
      case 4:
        passwordConfirmationFormik.handleSubmit;
    }
  };

  return (
    <FormikProvider value={getCurrentFormik(step) as FormikContextType<any>}>
      <form onSubmit={getSubmit(step)}>
        <Box position="relative" height="100%" width="100%">
          {step !== 1 ? (
            <Box
              zIndex={1}
              onClick={onPressBack}
              position="absolute"
              top="two"
              left="35%"
            >
              <Arrow size="small" direction="left" />
            </Box>
          ) : null}
          <Content
            text="Sign up to keep your plants well and hydrated"
            name="email"
            label="Email"
            formik={emailFormik}
            step={step}
            isCurrentStep={step === 1}
          />
          <Content
            text="How would you like to called?"
            name="displayName"
            label="Display Name"
            formik={displayNameFormik}
            step={step}
            isCurrentStep={step === 2}
          />
          <Content
            text="Make it nice and secure"
            name="password"
            label="Password"
            type="password"
            formik={passwordFormik}
            step={step}
            isCurrentStep={step === 3}
          />
          <Content
            text="And again..."
            name="passwordConfirmation"
            label="Confirm Password"
            type="password"
            formik={passwordConfirmationFormik}
            step={step}
            isCurrentStep={step === 4}
          />
          <Box position="absolute" bottom="twoPointEight">
            <ArrowButton />
          </Box>
        </Box>
      </form>
    </FormikProvider>
  );
};

export { SignUp };
