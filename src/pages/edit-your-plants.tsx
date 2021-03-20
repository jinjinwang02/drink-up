import React, { useCallback } from 'react';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { firebaseClient } from '../firebase/firebase-client';
import { Box } from '../components/box/box';
import { useAuthContext } from '../context/auth-context';
import { usePlantContext } from '../context/plant-context';
import { EditPlantBox, BOX_WIDTH_MD } from '../components/edit-plant-box';
import { Layout } from '../components/layout';
import { PageTitleWithBody } from '../components/page-title-with-body';
import { BoxyButton } from '../components/button/boxy-button';
import { useRouter } from 'next/router';

const Index: NextPage = () => {
  const { user } = useAuthContext();
  const { firestore, firestoreFieldValue } = firebaseClient();
  const router = useRouter();
  const { plantCollection, plantCollectionWithInputs } = usePlantContext();

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
      <PageTitleWithBody title="Edit the details" />
      <Box
        width="100%"
        display="grid"
        gridTemplateColumns={[
          '1fr',
          `repeat(auto-fill, minmax(${BOX_WIDTH_MD}px, 1fr))`,
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
      <BoxyButton onBack={() => router.back()} onNext={handleSubmit} />
    </Layout>
  );
};

export default Index;
