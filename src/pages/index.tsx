import React, { useState } from 'react';
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

const Index: React.FC = () => {
  const { setLogIn } = useAuthContext();
  const { isXS, isLG } = useMediaQuery();
  const [showAuthentication, setShowAuthentication] = useState<boolean>(false);

  const handleClickLogIn = () => {
    setLogIn(true);
    setShowAuthentication(true);
  };

  const handleClickSignUp = () => {
    setLogIn(false);
    setShowAuthentication(true);
  };

  const authenticationBoxXSFadeInProps = useSpring({
    from: { opacity: 0, y: 100 },
    to: {
      opacity: showAuthentication ? 1 : 0,
      y: showAuthentication ? 40 : 100,
    },
  });

  const authenticationBoxLGFadeInProps = useSpring({
    from: { opacity: 0, x: '14vw' },
    to: { opacity: 1, x: '0' },
    delay: 800,
  });
  const authenticationBoxSMFadeInProps = useSpring({
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 500,
  });

  const containerXSProps = useSpring({
    from: { y: 200 },
    to: { y: showAuthentication ? 0 : 200 },
  });

  return (
    <Layout hasMinHeight={!isXS} showNavbar={false}>
      <NextSeo title="Drink up | Homepage" description="" canonical="" />
      <AnimatedBox
        width="100%"
        height={isXS ? '70vh' : 'auto'}
        flexDirection={isLG ? 'row' : 'column'}
        justifyContent={isLG ? 'space-around' : 'center'}
        style={
          isXS
            ? { ...containerXSProps }
            : { transform: isLG ? 'translateY(80%)' : 'translateY(20%)' }
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
          <AnimatedBox
            style={
              isLG
                ? authenticationBoxLGFadeInProps
                : authenticationBoxSMFadeInProps
            }
          >
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
