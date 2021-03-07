import React from 'react';
import nookies from 'nookies';
import Head from 'next/head';
import { Box } from '../components/box/box';
import { Favicon } from '../components/favicon';
import { FontHead } from '../styles/font-head';
import { verifyIdToken } from '../utils/firebase/firebase-admin';
import { Logo } from '../components/icon/logo';

const Index = () => {
  return (
    <>
      <Head>
        <title>Drink up | A water reminder for your plants</title>
        <Favicon />
        <FontHead />
      </Head>

      <Box m={10}>
        <Logo width={20} height={20} />
      </Box>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    if (token) {
      return {
        redirect: {
          permanent: false,
          destination: '/authenticated',
        },
      };
    }
    return { props: {} };
  } catch (error) {
    return { props: {} };
  }
};

export default Index;
