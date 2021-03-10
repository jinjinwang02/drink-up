import React from 'react';
import nookies from 'nookies';
import Head from 'next/head';
import { Box } from '../components/box/box';
import { Favicon } from '../components/favicon';
import { FontHead } from '../styles/font-head';
import { verifyIdToken } from '../utils/firebase/firebase-admin';
import { Authentication } from '../components/authentication';

const Index: React.FunctionComponent = () => (
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

export const getServerSideProps: (
  context: any
) => Promise<{
  redirect?: {
    permanent: boolean;
    destination: string;
  };
  props?: any;
}> = async (context: any) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    if (token) {
      context.res.writeHead(302, { location: '/dashboard' });
      context.res.end();
    }
    return { props: {} };
  } catch (error) {
    return { props: {} };
  }
};

export default Index;
