import React, { useCallback } from 'react';
import { NextSeo } from 'next-seo';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '../components/layout';
import { AddPlantBox } from '../components/add-plant-box';
import { PageTitleWithBody } from '../components/page-title-with-body';
import { Box } from '../components/box/box';
import { BoxyButton } from '../components/button/boxy-button';
import { useAuthContext } from '../context/auth-context';
import { firebaseClient } from '../firebase/firebase-client';

const Index: NextPage = () => {
  const { user } = useAuthContext();
  const { firestore } = firebaseClient();
  const router = useRouter();
  const handleSubmit = useCallback(async () => {
    await firestore.collection('users').doc(user?.uid).update({
      // add new plants to the array
      // without creating duplicates
      plants: 'bla',
    });
  }, [firestore, user?.uid]);
  return (
    <Layout mb={['four', 'eight', 'ten']}>
      <NextSeo
        title="Drink up | Find Your Plants"
        description=""
        canonical=""
      />
      <PageTitleWithBody
        title="Add your plants"
        body="If you didn't find your plants, add them here!"
        centered
      />
      <Box mt="two">
        <AddPlantBox />
      </Box>
      <BoxyButton onBack={() => router.back()} onNext={handleSubmit} />
    </Layout>
  );
};

export default Index;
