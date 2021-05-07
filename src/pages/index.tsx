import React, { useCallback, useState } from 'react';
import { useSpring } from 'react-spring';
import nookies from 'nookies';
import { NextSeo } from 'next-seo';
import { Authentication } from '../components/authentication/authentication';
import { Layout } from '../components/layout';
import { useAuthContext } from '../context/auth-context';
import { Box } from '../components/box/box';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { CloudButton } from '../components/button/cloud-button';
import { LandingTitle } from '../components/landing-title';
import { GetServerSideProps } from 'next';
import { verifyIdToken } from '../firebase/firebase-admin';
import { AnimatedBox } from '../components/box/animatedBox';
import { theme } from '../theme';

const Index: React.FC = () => {
  const { setLogIn } = useAuthContext();
  const { isXS, isLG } = useMediaQuery();
  const [showAuthentication, setShowAuthentication] = useState<boolean>(false);

  const handleClickLogIn = useCallback(() => {
    setLogIn(true);
    setShowAuthentication(true);
  }, [setLogIn]);

  const handleClickSignUp = useCallback(() => {
    setLogIn(false);
    setShowAuthentication(true);
  }, [setLogIn]);

  const authenticationBoxXSFadeInProps = useSpring({
    from: { opacity: 0, y: 100 },
    to: {
      opacity: showAuthentication ? 1 : 0,
      y: showAuthentication ? 40 : 100,
    },
  });
  const authenticationBoxSMFadeInProps = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    delay: 800,
  });
  const containerProps = useSpring({
    from: { y: 200 },
    to: { y: showAuthentication ? 0 : 200 },
  });
  const pageBorderBoxProps = useSpring({
    from: {
      height: '100vh',
      width: '100vw',
      border: theme.borders.transparent,
    },
    to: { height: '94vh', width: '97vw', border: theme.borders.regularBlack },
    delay: 2500,
  });

  return (
    <Layout hasMinHeight={!isXS} showNavbar={false}>
      <NextSeo title="Drink up | Homepage" description="" canonical="" />
      <AnimatedBox
        display={['none', 'block']}
        height="94vh"
        width="97vw"
        position="absolute"
        top="50%"
        left="50%"
        style={{ ...pageBorderBoxProps, transform: 'translate(-50%, -50%)' }}
      />
      <AnimatedBox
        width="100%"
        height={isXS ? '70vh' : 'auto'}
        flexDirection={isLG ? 'row' : 'column'}
        justifyContent={isLG ? 'space-around' : 'center'}
        style={
          isXS
            ? { ...containerProps }
            : { transform: isLG ? 'translateY(80%)' : 'translateY(30%)' }
        }
      >
        <LandingTitle />
        {isXS && !showAuthentication ? (
          <Box
            position="absolute"
            width="100%"
            top="45%"
            justifyContent="space-around"
          >
            <CloudButton borderless onClick={handleClickLogIn}>
              Log in
            </CloudButton>
            <CloudButton borderless onClick={handleClickSignUp}>
              Sign up
            </CloudButton>
          </Box>
        ) : null}
        {isXS ? (
          <AnimatedBox
            style={authenticationBoxXSFadeInProps}
            zIndex={showAuthentication ? 1 : -1}
          >
            <Authentication />
          </AnimatedBox>
        ) : (
          <AnimatedBox style={authenticationBoxSMFadeInProps}>
            <Authentication />
          </AnimatedBox>
        )}
      </AnimatedBox>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await verifyIdToken(cookies.token);
    if (token) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }
    return { props: {} };
  } catch (error) {
    return { props: {} };
  }
};

export default Index;
