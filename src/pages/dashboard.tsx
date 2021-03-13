import React from 'react';
import nookies from 'nookies';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { auth } from 'firebase-admin';
import { verifyIdToken } from '../firebase/firebase-admin';
import { firebaseClient } from '../firebase/firebase-client';
import { Box } from '../components/box/box';
import { Button } from '../components/button';
import { GetServerSideProps, NextPage } from 'next';
import { Logo } from '../components/icon/logo';
import { Layout } from '../components/layout';

interface Props {
  session?: auth.DecodedIdToken;
}

const Index: NextPage<Props> = ({ session }: Props) => {
  const { auth } = firebaseClient();
  const router = useRouter();

  return (
    <Layout>
      <NextSeo title="Drink up | Dashboard" description="" canonical="" />
      {session ? (
        <Box flexDirection="column" justifyContent="space-evenly">
          <Button
            onClick={async () => {
              router.push('/find-your-plants');
            }}
          >
            Find your plants
          </Button>
          <Button
            onClick={async () => {
              await auth.signOut();
              router.push('/');
            }}
          >
            Sign out
          </Button>
        </Box>
      ) : (
        <Logo animated />
      )}
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
