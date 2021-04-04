import React, { useCallback, useEffect, useState } from 'react';
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
import { AddButton } from '../stories/add-button.stories';
import { CloudButton } from '../components/button/cloud-button';
import { theme } from '../styles/theme';
import { CrossButton } from '../components/button/cross-button';

const Index: NextPage = () => {
  const { user } = useAuthContext();
  const { firestore } = firebaseClient();
  const router = useRouter();
  const [boxCount, setBoxCount] = useState<number>(0);
  const handleAddBox = useCallback(() => {
    setBoxCount((prev) => prev + 1);
  }, []);

  const handleDeleteBox = useCallback(() => {
    setBoxCount((prev) => prev - 1);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (boxCount === 0) {
      router.push('/dashboard');
      return;
    }
    await firestore.collection('users').doc(user?.uid).update({
      plants: 'bla',
    });
  }, [boxCount, firestore, router, user?.uid]);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [boxCount]);

  return (
    <Layout mb={['four', 'eight', 'ten']}>
      <NextSeo title="Drink up | Add Your Plants" description="" canonical="" />
      <Box
        mt={boxCount ? 'zero' : 'ten'}
        width="100%"
        transition={theme.transitions.medium}
      >
        <PageTitleWithBody
          title="Add your plants"
          body="If you didn't find your plants, add them here."
          centered
        />
      </Box>
      <Box flexDirection="column">
        {Array(boxCount)
          .fill(boxCount)
          .map((_el, index) => (
            <Box key={index.toString()} my="two">
              <AddPlantBox />
            </Box>
          ))}
        {boxCount ? (
          <Box mt="one" width="100%" justifyContent="space-around">
            <AddButton onClick={handleAddBox} />
            <CrossButton onClick={handleDeleteBox} />
          </Box>
        ) : (
          <>
            <CloudButton my="three" borderless onClick={handleAddBox}>
              Start!
            </CloudButton>
            <CloudButton my="three" borderless onClick={handleSubmit}>
              Nope I&apos;m done
            </CloudButton>
          </>
        )}
      </Box>
      <BoxyButton onBack={() => router.back()} onNext={handleSubmit} />
    </Layout>
  );
};

export default Index;
