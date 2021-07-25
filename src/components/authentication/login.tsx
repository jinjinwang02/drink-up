import React, { useCallback, useState } from 'react';
import 'firebase/auth';
import nookies from 'nookies';
import { firebaseClient } from '../../firebase/firebase-client';
import { useRouter } from 'next/router';
import { Form, FormikContextType, FormikProvider, useFormik } from 'formik';
import { Content } from './content';
import * as Yup from 'yup';
import { Box } from '../box/box';
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
  const router = useRouter();
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
    onSubmit: () => {
      handleCheckEmail(emailFormik.values.email);
    },
  });
  const passwordFormik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: PasswordSchema,
    onSubmit: () => {
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
        await auth
          .signInWithEmailAndPassword(email, password)
          .then(({ user }) => {
            user?.getIdTokenResult().then(({ token }) => {
              nookies.set(undefined, 'token', token, {
                maxAge: 24 * 60 * 60,
              });
            });
          });
      } catch (error) {
        setLoading(false);
        passwordFormik.setFieldError('password', error.message);
      } finally {
        router.push('/dashboard');
      }
    },
    [auth, router, passwordFormik]
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
      <Form onSubmit={getCurrentFormik(step)?.handleSubmit}>
        <Box position="relative" height="100%" width="100%">
          {step !== 1 && !isLoading ? (
            <Box
              zIndex={1}
              onClick={onPressBack}
              position="absolute"
              top="two"
              left="22%"
            >
              <ArrowButton size="small" direction="left" type="button" />
            </Box>
          ) : null}
          <Content
            text="Log in to check on your plants"
            name="email"
            label="Email"
            step={step}
            isLogin
            isCurrentStep={step === 1}
          />
          <Content
            text="Password?"
            name="password"
            label="Password"
            type="password"
            step={step}
            isLogin
            isCurrentStep={step === 2}
            isLoading={isLoading}
          />
          <Box position="absolute" bottom="twoPointEight" zIndex={10}>
            {!isLoading ? <ArrowButton /> : null}
          </Box>
        </Box>
      </Form>
    </FormikProvider>
  );
};

export { LogIn };
