import React, { useCallback } from 'react';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { firebaseClient } from '../firebase/firebase-client';
import { Box } from '../components/box/box';
import { Arrow } from '../components/icon/arrow';
import { useAuthContext } from '../context/auth-context';
import { usePlantContext } from '../context/plant-context';
import {
  EditPlantBox,
  BOX_WIDTH_XS,
  BOX_WIDTH_MD,
} from '../components/edit-plant-box';
import { Layout } from '../components/layout';
import { PageTitleWithBody } from '../components/page-title-with-body';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { BoxyButton } from '../components/button/boxy-button';
import { useRouter } from 'next/router';

const Index: NextPage = () => {
  const isXS = useMediaQuery();
  const { user } = useAuthContext();
  const { firestore, firestoreFieldValue } = firebaseClient();
  const router = useRouter();
  const { plantCollection, plantCollectionWithInputs } = usePlantContext();

  const handlePressBack = useCallback(() => {
    router.push('/find-your-plants');
  }, [router]);

  const handleSubmit = useCallback(async () => {
    await firestore
      .collection('users')
      .doc(user?.uid)
      .update({
        // add new plants to the array
        // without creating duplicates
        plants: firestoreFieldValue.arrayUnion(...plantCollectionWithInputs),
      });
  }, [firestore, firestoreFieldValue, plantCollectionWithInputs, user?.uid]);

  return (
    <Layout mb={['four', 'eight', 'ten']}>
      <NextSeo
        title="Drink up | Edit The Details"
        description=""
        canonical=""
      />
      {!isXS ? (
        <Box width="100%">
          <Box mr="four" mb="seven" onClick={handlePressBack}>
            <Arrow size="extraLarge" direction="left" />
          </Box>
          <PageTitleWithBody title="Edit the details" />
        </Box>
      ) : (
        <PageTitleWithBody title="Edit the details" />
      )}
      <Box
        width="100%"
        display="grid"
        gridTemplateColumns={[
          `repeat(auto-fit, minmax(${BOX_WIDTH_XS}px, 1fr))`,
          `repeat(auto-fit, minmax(${BOX_WIDTH_MD}px, 1fr))`,
        ]}
        gridRowGap="four"
      >
        {plantCollection.map((plant) => (
          <EditPlantBox
            key={plant.id}
            id={plant.id}
            imageUrl={plant.imageUrl}
            commonName={plant.commonName}
          />
        ))}
      </Box>
      {!isXS ? (
        <Box
          width="100%"
          mr="two"
          justifyContent="flex-end"
          onClick={handleSubmit}
        >
          <Arrow size="extraLarge" />
        </Box>
      ) : (
        <BoxyButton onBack={handlePressBack} onNext={handleSubmit} />
      )}
    </Layout>
  );
};

export default Index;
