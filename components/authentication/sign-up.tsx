import { FormikContextType, FormikProvider, useFormik } from 'formik';
import React from 'react';
import { Content } from './content';
import * as Yup from 'yup';
import { EmailSchema, LogInCredentials } from './login';
import { Box } from '../box/box';
import { Arrow } from '../arrow';
import { ArrowButton } from '../button';

export interface SignUpCredentials extends LogInCredentials {
  displayName: string;
  passwordConfirmation: string;
}

interface SignUpProps {
  step: number;
  values: SignUpCredentials;
  setValues: (values: SignUpCredentials) => void;
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
const SignUp = ({
  step,
  values,
  setValues,
  onPressBack,
  onPressNext,
}: SignUpProps) => {
  const emailFormik = useFormik({
    initialValues: {
      email: values.email,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: EmailSchema,
    onSubmit: () => {
      handleSubmit();
      onPressNext();
    },
  });
  const displayNameFormik = useFormik({
    initialValues: {
      displayName: values.displayName,
    },
    onSubmit: () => {
      handleSubmit();
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
      handleSubmit();
      onPressNext();
    },
  });
  const passwordConfirmationFormik = useFormik({
    initialValues: {
      passwordConfirmation: values.passwordConfirmation,
    },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (value) => {
      if (value.passwordConfirmation === passwordFormik.values.password) {
        handleSubmit();
      } else {
        passwordConfirmationFormik.setFieldError(
          'passwordConfirmation',
          "Oops, passwords didn't match"
        );
      }
    },
  });
  const handleSubmit = () => {
    setValues({
      email: emailFormik.values.email,
      displayName: displayNameFormik.values.displayName,
      password: passwordFormik.values.password,
      passwordConfirmation:
        passwordConfirmationFormik.values.passwordConfirmation,
    });
  };
  const getCurrentFormik = () => {
    if (step === 1) {
      return emailFormik;
    } else if (step === 2) {
      return displayNameFormik;
    } else if (step === 3) {
      return passwordFormik;
    } else if (step === 4) {
      return passwordConfirmationFormik;
    }
  };

  const getSubmit = () => {
    if (step === 1) {
      return emailFormik.handleSubmit;
    } else if (step === 2) {
      return displayNameFormik.handleSubmit;
    } else if (step === 3) {
      return passwordFormik.handleSubmit;
    } else if (step === 4) {
      return passwordConfirmationFormik.handleSubmit;
    }
  };

  return (
    <FormikProvider value={getCurrentFormik() as FormikContextType<any>}>
      <form onSubmit={getSubmit()} autoComplete="off">
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
            isLogin={false}
          />
          <Content
            text="How would you like to called?"
            name="displayName"
            label="Display Name"
            formik={displayNameFormik}
            step={step}
            isCurrentStep={step === 2}
            isLogin={false}
          />
          <Content
            text="Make it nice and secure"
            name="password"
            label="Password"
            type="password"
            formik={passwordFormik}
            step={step}
            isCurrentStep={step === 3}
            isLogin={false}
          />
          <Content
            text="And again..."
            name="passwordConfirmation"
            label="Confirm Password"
            type="password"
            formik={passwordConfirmationFormik}
            step={step}
            isCurrentStep={step === 4}
            isLogin={false}
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
