import React from 'react';
import nookies from 'nookies';
import { NextSeo } from 'next-seo';
import { verifyIdToken } from '../firebase/firebase-admin';
import { GetServerSideProps, NextPage } from 'next';
import { Layout } from '../components/layout';

const Index: NextPage = () => {
  return (
    <Layout>
      <NextSeo title="Drink up | Dashboard" description="" canonical="" />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    return {
      props: { session: token },
    };
  } catch (error) {
    context.res.writeHead(302, { location: '/' });
    context.res.end();
    return { props: {} };
  }
};

export default Index;
