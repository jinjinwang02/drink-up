import React, { useCallback, useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { firebaseClient } from '../utils/firebase/firebase-client';
import { Box } from '../components/box/box';
import { SelectableBoxWithImage } from '../components/box/selectable-box-with-image';
import { Collection } from '../utils/interfaces';
import { Arrow } from '../components/icon/arrow';
import { useAuth } from '../utils/context/auth';

interface Props {
  collection: Collection[];
}

const Index: NextPage<Props> = ({ collection }: Props) => {
  const { user } = useAuth();
  const router = useRouter();
  // Todo: use HOC for this logic
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [router, user]);
  const { firestore, firestoreFieldValue } = firebaseClient();
  const [selectedPlants, setSelctedPlants] = useState<string[]>([]);

  const handlePressPlant = useCallback(
    (id: string) => {
      if (selectedPlants.includes(id)) {
        setSelctedPlants(selectedPlants.filter((el) => el !== id));
      } else {
        setSelctedPlants((prev) => [...prev, id]);
      }
    },
    [selectedPlants]
  );

  const handlePressNext = useCallback(async () => {
    const plants = await Promise.all(
      selectedPlants.map(
        async (plant) =>
          await firestore
            .collection('plants')
            .doc(plant)
            .get()
            .then((data) => ({
              id: plant,
              ...data.data(),
            }))
      )
    );
    await firestore
      .collection('users')
      .doc(user?.uid)
      .update({
        plants: firestoreFieldValue.arrayUnion(...plants),
      });
  }, [firestore, firestoreFieldValue, selectedPlants, user?.uid]);

  return (
    <Box width="100%" px="eight" flexWrap="wrap">
      {collection?.map((plant) => (
        <Box key={plant.id} onClick={() => handlePressPlant(plant.id)}>
          <SelectableBoxWithImage
            key={plant.id}
            imageUrl={plant.imageUrl}
            alt={plant.commonName}
            bottomText={plant.commonName}
            selected={selectedPlants.includes(plant.id)}
          />
        </Box>
      ))}
      <Box
        zIndex={1}
        onClick={handlePressNext}
        position="absolute"
        top="two"
        left="35%"
      >
        <Arrow size="large" />
      </Box>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { firestore } = firebaseClient();
  const collectionRef = firestore.collection('plants');
  const collection: Collection[] = [];
  await collectionRef.get().then((data) =>
    data.forEach((doc) =>
      collection.push({
        id: doc.id,
        ...(doc.data() as { commonName: string; imageUrl: string }),
      })
    )
  );

  return {
    props: { collection: collection },
  };
};

export default Index;
