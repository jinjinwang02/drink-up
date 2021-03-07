import React from 'react';
import nookies from 'nookies';
import { useRouter } from 'next/router';
import { auth } from 'firebase-admin';
import { verifyIdToken } from '../utils/firebase/firebase-admin';
import { firebaseClient } from '../utils/firebase/firebase-client';
import firebase from 'firebase/app';
import { Box } from '../components/box/box';
import { Button } from '../components/button';

interface Props {
  session?: auth.DecodedIdToken;
}

const Index = ({ session }: Props) => {
  firebaseClient();
  const router = useRouter();
  if (session) {
    return (
      <Box width="100vw" height="100vh">
        <Button
          onClick={async () => {
            await firebase.auth().signOut();
            router.push('/');
          }}
        >
          Sign out
        </Button>
      </Box>
    );
  } else {
    return <Box>Loading</Box>;
  }
};

export const getServerSideProps = async (context: any) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    return {
      props: {
        session: token,
      },
    };
  } catch (error) {
    context.res.writeHead(302, { location: '/' });
    context.res.end();
    return {
      props: {},
    };
  }
};

export default Index;
