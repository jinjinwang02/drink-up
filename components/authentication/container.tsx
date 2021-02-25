import React, { useState } from 'react';
import { BoxWithCloud } from '../box/box-with-cloud';
import { Typography } from '../typography';
import { TextWithAnimatedUnderline } from '../text-with-animated-underline';
import { LogIn, LogInCredentials } from './login';
import { SignUp, SignUpCredentials } from './sign-up';

const Authentication = () => {
  const [logInStep, setLogInStep] = useState<number>(1);
  const [signUpStep, setSignUpStep] = useState<number>(1);
  const [isLogIn, setLogIn] = useState<boolean>(true);
  const [logInCredentials, setLogIncredentials] = useState<LogInCredentials>({
    email: '',
    password: '',
  });
  const [signUpCredentials, setSignUpcredentials] = useState<SignUpCredentials>(
    {
      email: '',
      displayName: '',
      password: '',
      passwordConfirmation: '',
    }
  );

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
        isLogIn ? (
          <LogIn
            step={logInStep}
            values={logInCredentials}
            setValues={setLogIncredentials}
            onPressNext={() => setLogInStep((prev) => prev + 1)}
            onPressBack={() => setLogInStep((prev) => prev - 1)}
          />
        ) : (
          <SignUp
            step={signUpStep}
            values={signUpCredentials}
            setValues={setSignUpcredentials}
            onPressNext={() => setSignUpStep((prev) => prev + 1)}
            onPressBack={() => setSignUpStep((prev) => prev - 1)}
          />
        )
      }
    />
  );
};

export { Authentication };
