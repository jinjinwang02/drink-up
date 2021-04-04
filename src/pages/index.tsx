import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { Authentication } from '../components/authentication/authentication';
import { Layout } from '../components/layout';
import { useAuthContext } from '../context/auth-context';
import { useRouter } from 'next/router';
import { TitleWithUnderline } from '../components/title-with-underline';
import { Box } from '../components/box/box';
import { Typography } from '../components/typography';
import { Logo } from '../components/icon/logo';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { CloudButton } from '../components/button/cloud-button';
import { theme } from '../styles/theme';
import { NAVBAR_HEIGHT_MD, NAVBAR_HEIGHT_XS } from '../components/navbar';

const Index: React.FC = () => {
  const { user, setLogIn } = useAuthContext();
  const router = useRouter();
  const isXS = useMediaQuery();
  const [showAuthentication, setShowAuthentication] = useState<boolean>(false);
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [router, user]);
  return (
    <Layout>
      <NextSeo title="Drink up | Homepage" description="" canonical="" />
      <Box
        width="100%"
        height={['100%', '100vh']}
        mt={[-NAVBAR_HEIGHT_XS, -NAVBAR_HEIGHT_MD]}
        flexDirection={['column', 'column', 'column', 'row']}
        justifyContent={['center', 'center', 'center', 'space-around']}
        mb={['eight', 'zero']}
        style={
          isXS
            ? {
                transform: showAuthentication
                  ? 'translateY(15%)'
                  : 'translateY(65%)',
              }
            : null
        }
        transition={theme.transitions.slow}
      >
        <Box
          flexDirection="column"
          alignItems={['flex-start', 'center', 'center', 'flex-start']}
          mb={['zero', 'eight', 'eight', 'zero']}
        >
          <Box mb="zeroPointFour">
            <Typography
              textStyle={['h2Brand', 'h2Brand', 'h1Brand']}
              mr={['two', 'three']}
            >
              DRINK UP
            </Typography>
            <Box mb={['zeroPointFour', 'one']}>
              <Logo size={isXS ? 'small' : 'medium'} />
            </Box>
          </Box>
          <TitleWithUnderline variant="secondary">
            A water reminder for your plants.
          </TitleWithUnderline>
        </Box>
        {isXS && !showAuthentication ? (
          <Box
            position="absolute"
            width="100%"
            justifyContent="space-around"
            top="35%"
          >
            <CloudButton
              borderless
              onClick={() => {
                setLogIn(true);
                setShowAuthentication(true);
              }}
            >
              Log in
            </CloudButton>
            <CloudButton
              borderless
              onClick={() => {
                setLogIn(false);
                setShowAuthentication(true);
              }}
            >
              Sign up
            </CloudButton>
          </Box>
        ) : null}
        {isXS ? (
          <Box
            style={{
              opacity: showAuthentication ? 1 : 0,
            }}
            mt="eight"
            transition={theme.transitions.slow}
            zIndex={showAuthentication ? 1 : -1}
          >
            <Authentication />
          </Box>
        ) : (
          <Authentication />
        )}
        {/* <Box> {isLogIn ? 'Log in' : 'Sign up'}</Box> */}
      </Box>
    </Layout>
  );
};

export default Index;
