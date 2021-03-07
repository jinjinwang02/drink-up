import React, { useEffect } from 'react';
import Head from 'next/head';
import { Box } from '../components/box/box';
import { Favicon } from '../components/favicon';
import { FontHead } from '../styles/font-head';
import { Authentication } from '../components/authentication';
import { useAuth } from '../utils/context/auth';
import { useRouter } from 'next/router';

const Index = () => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push('/authenticated');
    }
  });
  return (
    <>
      <Head>
        <title>Drink up | A water reminder for your plants</title>
        <Favicon />
        <FontHead />
      </Head>

      <Box m={10}>
        <Authentication />
      </Box>
    </>
  );
};

export default Index;
