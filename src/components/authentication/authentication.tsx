import React, { useState } from 'react';
import { BoxWithCloud } from '../box/box-with-cloud';
import { Typography } from '../typography';
import { TextWithAnimatedUnderline } from '../text-with-animated-underline';
import { LogIn } from './login';
import { SignUp } from './sign-up';
import { useAuthContext } from '../../context/auth-context';

const Authentication: React.FC = () => {
  const { isLogIn, setLogIn } = useAuthContext();
  const [logInStep, setLogInStep] = useState<number>(1);
  const [signUpStep, setSignUpStep] = useState<number>(1);
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
            onPressNext={() => setLogInStep((prev) => prev + 1)}
            onPressBack={() => setLogInStep((prev) => prev - 1)}
          />
        ) : (
          <SignUp
            step={signUpStep}
            onPressNext={() => setSignUpStep((prev) => prev + 1)}
            onPressBack={() => setSignUpStep((prev) => prev - 1)}
          />
        )
      }
    />
  );
};

export { Authentication };
