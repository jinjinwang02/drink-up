import React, { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { Authentication } from '../components/authentication';
import { Layout } from '../components/layout';
import { useAuthContext } from '../context/auth-context';
import { useRouter } from 'next/router';
import { TitleWithUnderline } from '../components/title-with-underline';
import { Box } from '../components/box/box';
import { Typography } from '../components/typography';
import { Logo } from '../components/icon/logo';

const Index: React.FC = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [router, user]);
  return (
    <>
      <Layout>
        <NextSeo title="Drink up | Homepage" description="" canonical="" />
        <Box
          flexDirection={['column', 'column', 'column', 'row']}
          width="100%"
          justifyContent="space-around"
          mb="five"
        >
          <Box
            flexDirection="column"
            alignItems={['center', 'center', 'center', 'flex-start']}
            mb={['zero', 'eight', 'eight', 'zero']}
          >
            <Box mb="zeroPointFour">
              <Typography
                textStyle={['h2Brand', 'h2Brand', 'h1Brand', 'h1Brand']}
                mr="three"
              >
                DRINK UP
              </Typography>
              <Box mb="one">
                <Logo size="medium" />
              </Box>
            </Box>
            <TitleWithUnderline variant="secondary">
              A water reminder for your plants.
            </TitleWithUnderline>
          </Box>
          <Authentication />
        </Box>
      </Layout>
    </>
  );
};

export default Index;
