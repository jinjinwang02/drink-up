import React, { useCallback, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { firebaseClient } from '../firebase/firebase-client';
import { Box } from '../components/box/box';
import { SelectableBoxWithImage } from '../components/box/selectable-box-with-image';
import { Collection } from '../interfaces';
import { Arrow } from '../components/icon/arrow';
import { usePlantContext } from '../context/plant-context';
import { useRouter } from 'next/router';

interface Props {
  collection: Collection[];
}

const Index: NextPage<Props> = ({ collection }: Props) => {
  const {
    setPlantCollection,
    setPlantCollectionWithInputs,
  } = usePlantContext();
  const [selectedPlants, setSelctedPlants] = useState<Collection[]>([]);
  const router = useRouter();
  const handlePressPlant = useCallback(
    (plant: Collection) => {
      if (selectedPlants.map((el) => el.id).includes(plant.id)) {
        setSelctedPlants(selectedPlants.filter((el) => el !== plant));
      } else {
        setSelctedPlants((prev) => [...prev, plant]);
      }
    },
    [selectedPlants]
  );

  const handlePressNext = useCallback(() => {
    setPlantCollection(selectedPlants);
    setPlantCollectionWithInputs(selectedPlants);
    router.push('/edit-your-plants');
  }, [
    router,
    selectedPlants,
    setPlantCollection,
    setPlantCollectionWithInputs,
  ]);

  return (
    <Box width="100%" px="eight" flexWrap="wrap">
      {collection?.map((plant) => (
        <Box key={plant.id} onClick={() => handlePressPlant(plant)}>
          <SelectableBoxWithImage
            key={plant.id}
            imageUrl={plant.imageUrl}
            alt={plant.commonName}
            bottomText={plant.commonName}
            selected={selectedPlants.includes(plant)}
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
