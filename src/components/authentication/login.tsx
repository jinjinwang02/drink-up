import React, { useCallback, useState } from 'react';
import 'firebase/auth';
import { firebaseClient } from '../../firebase/firebase-client';
import { FormikContextType, FormikProvider, useFormik } from 'formik';
import { Content } from './content';
import * as Yup from 'yup';
import { Box } from '../box/box';
import { Arrow } from '../icon/arrow';
import { ArrowButton } from '../button/arrow-button';

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

const LogIn: React.FC<LogInProps> = ({
  step,
  onPressBack,
  onPressNext,
}: LogInProps) => {
  const { auth } = firebaseClient();
  const [isLoading, setLoading] = useState<boolean>(false);

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
      handleCheckEmail(emailFormik.values.email);
    },
  });
  const passwordFormik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: PasswordSchema,
    onSubmit: async () => {
      handleLogIn(emailFormik.values.email, passwordFormik.values.password);
    },
  });

  const handleCheckEmail = useCallback(
    async (email: string) => {
      await auth.fetchSignInMethodsForEmail(email).then((res) => {
        if (!res.length) {
          emailFormik.setFieldError('email', 'This email is not registered.');
        } else {
          onPressNext();
        }
      });
    },
    [auth, emailFormik, onPressNext]
  );

  const handleLogIn = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        await auth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        passwordFormik.setFieldError('password', error.message);
      }
    },
    [auth, passwordFormik]
  );

  const getCurrentFormik = (step: number) => {
    switch (step) {
      case 1:
        return emailFormik;
      case 2:
        return passwordFormik;
    }
  };

  return (
    <FormikProvider value={getCurrentFormik(step) as FormikContextType<any>}>
      <form onSubmit={getCurrentFormik(step)?.handleSubmit}>
        <Box position="relative" height="100%" width="100%">
          {step !== 1 && !isLoading ? (
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
            isLoading={isLoading}
          />
          <Box position="absolute" bottom="twoPointEight" zIndex={10}>
            {!isLoading ? <ArrowButton /> : null}
          </Box>
        </Box>
      </form>
    </FormikProvider>
  );
};

export { LogIn };
