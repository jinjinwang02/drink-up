import React, { useCallback, useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { Authentication } from '../components/authentication/authentication';
import { Layout } from '../components/layout';
import { useAuthContext } from '../context/auth-context';
import { useRouter } from 'next/router';
import { Box } from '../components/box/box';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { CloudButton } from '../components/button/cloud-button';
import { theme } from '../styles/theme';
import { LandingTitle } from '../components/landing-title';

const Index: React.FC = () => {
  const router = useRouter();
  const { user, setLogIn } = useAuthContext();
  const { isXS, isMD } = useMediaQuery();
  const [showAuthentication, setShowAuthentication] = useState<boolean>(false);

  const handleClickLogIn = useCallback(() => {
    setLogIn(true);
    setShowAuthentication(true);
  }, [setLogIn]);

  const handleClickSignUp = useCallback(() => {
    setLogIn(false);
    setShowAuthentication(true);
  }, [setLogIn]);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [router, user]);

  return (
    <Layout hasMinHeight={!isXS}>
      <NextSeo title="Drink up | Homepage" description="" canonical="" />
      <Box
        width="100%"
        flexDirection={['column', 'column', 'column', 'row']}
        justifyContent={['center', 'center', 'center', 'space-around']}
        style={
          isXS
            ? {
                transform: showAuthentication
                  ? 'translateY(-20%)'
                  : 'translateY(35%)',
              }
            : {
                transform: isMD ? 'translateY(80%)' : 'translateY(30%)',
              }
        }
        transition={theme.transitions.slow}
      >
        <LandingTitle />
        {isXS && !showAuthentication ? (
          <Box
            position="absolute"
            width="100%"
            justifyContent="space-around"
            top="45%"
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
          <Box
            style={{
              opacity: showAuthentication ? 1 : 0,
            }}
            mt={showAuthentication ? 'eight' : 'zero'}
            transition={theme.transitions.slow}
            zIndex={showAuthentication ? 1 : -1}
          >
            <Authentication />
          </Box>
        ) : (
          <Authentication />
        )}
      </Box>
    </Layout>
  );
};

export default Index;
