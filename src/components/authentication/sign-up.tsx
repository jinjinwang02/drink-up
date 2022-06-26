import React, { useState } from 'react';
import 'firebase/auth';
import nookies from 'nookies';
import { useRouter } from 'next/router';
import { firebaseClient } from '../../firebase/firebase-client';
import { Form, FormikContextType, FormikProvider, useFormik } from 'formik';
import { Content } from './content';
import * as Yup from 'yup';
import { EmailSchema } from './login';
import { Box } from '../box/box';
import { ArrowButton } from '../button/arrow-button';

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
const SignUp: React.FC<SignUpProps> = ({
  step,
  onPressBack,
  onPressNext,
}: SignUpProps) => {
  const { auth, firestore } = firebaseClient();
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);

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
      await handleCheckEmail(emailFormik.values.email);
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
        await handleSignUp(
          emailFormik.values.email,
          passwordConfirmationFormik.values.passwordConfirmation,
          displayNameFormik.values.displayName
        );
      } else {
        passwordConfirmationFormik.setFieldError(
          'passwordConfirmation',
          "Oops, passwords didn't match"
        );
      }
    },
  });

  const handleCheckEmail = async (email: string) => {
    const response = await auth.fetchSignInMethodsForEmail(email);
    if (response.length) {
      emailFormik.setFieldError('email', 'This Email has already registered.');
    } else {
      onPressNext();
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    displayName?: string
  ) => {
    try {
      setLoading(true);
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const result = await user?.getIdTokenResult();
      if (result?.token) {
        nookies.set(undefined, 'token', result.token, {
          maxAge: 24 * 60 * 60,
        });
      }
      const userRef = await firestore.doc(`users/${user?.uid}`).get();
      if (!userRef.exists) {
        await firestore.collection('users').doc(user?.uid).set({
          email,
          displayName,
          createdAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      setLoading(false);
      passwordConfirmationFormik.setFieldError(
        'passwordConfirmation',
        'There has been an error'
      );
    } finally {
      router.push('/find-your-plants');
    }
  };

  const getCurrentFormik = (step: number) => {
    switch (step) {
      case 1:
        return emailFormik;
      case 2:
        return displayNameFormik;
      case 3:
        return passwordFormik;
      case 4:
        return passwordConfirmationFormik;
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
              left="36%"
            >
              <ArrowButton size="small" direction="left" type="button" />
            </Box>
          ) : null}
          <Content
            text="Sign up to keep your plants well and hydrated"
            name="email"
            label="Email"
            step={step}
            isCurrentStep={step === 1}
          />
          <Content
            text="What's your name?"
            name="displayName"
            label="Display Name"
            step={step}
            isCurrentStep={step === 2}
          />
          <Content
            text="Make your password nice and secure"
            name="password"
            label="Password"
            type="password"
            step={step}
            isCurrentStep={step === 3}
          />
          <Content
            text="And again..."
            name="passwordConfirmation"
            label="Confirm Password"
            type="password"
            step={step}
            isCurrentStep={step === 4}
            isLoading={isLoading}
          />
          <Box position="absolute" bottom="twoPointEight">
            {!isLoading ? <ArrowButton /> : null}
          </Box>
        </Box>
      </Form>
    </FormikProvider>
  );
};

export { SignUp };
