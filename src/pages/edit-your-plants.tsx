import React, { useCallback } from 'react';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { firebaseClient } from '../firebase/firebase-client';
import { Box } from '../components/box/box';
import { Arrow } from '../components/icon/arrow';
import { useAuthContext } from '../context/auth-context';
import { usePlantContext } from '../context/plant-context';
import { EditPlantBox } from '../components/edit-plant-box';
import { Layout } from '../components/layout';

const Index: NextPage = () => {
  const { user } = useAuthContext();
  const { firestore, firestoreFieldValue } = firebaseClient();
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
    <Layout>
      <NextSeo
        title="Drink up | Edit Your Plants"
        description=""
        canonical=""
      />
      {plantCollection.map((plant) => (
        <EditPlantBox
          key={plant.id}
          id={plant.id}
          imageUrl={plant.imageUrl}
          commonName={plant.commonName}
        />
      ))}
      <Box
        zIndex={1}
        onClick={handleSubmit}
        position="absolute"
        top="two"
        left="35%"
      >
        <Arrow size="large" />
      </Box>
    </Layout>
  );
};

export default Index;
