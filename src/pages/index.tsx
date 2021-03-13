import React from 'react';
import nookies from 'nookies';
import { NextSeo } from 'next-seo';
import { verifyIdToken } from '../firebase/firebase-admin';
import { Authentication } from '../components/authentication';
import { Layout } from '../components/layout';

const Index: React.FC = () => (
  <>
    <Layout>
      <NextSeo title="Drink up | Homepage" description="" canonical="" />
      <Authentication />
    </Layout>
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
