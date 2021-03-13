import React, { useCallback, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { firebaseClient } from '../firebase/firebase-client';
import { Box } from '../components/box/box';
import { SelectableBoxWithImage } from '../components/box/selectable-box-with-image';
import { Collection } from '../interfaces';
import { Arrow } from '../components/icon/arrow';
import { usePlantContext } from '../context/plant-context';
import { useRouter } from 'next/router';
import { Layout } from '../components/layout';
import { TitleWithUnderline } from '../components/title-with-underline';
import { Typography } from '../components/typography';

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
    <Layout>
      <NextSeo title="Drink up | Find Your Plant" description="" canonical="" />
      <Box width="100%" flexDirection="column" mb="three">
        <Box alignSelf="flex-start">
          <TitleWithUnderline>Find your plants</TitleWithUnderline>
        </Box>
        <Box alignSelf="flex-end" mt="four">
          <Typography textStyle="bodyL">
            Can&apos;t find your plants? Don&apos;t worry, you can add them
            manually later.
          </Typography>
        </Box>
      </Box>
      <Box width="100%" flexWrap="wrap">
        {collection?.map((plant) => (
          <Box
            key={plant.id}
            pb="two"
            flex={1}
            onClick={() => handlePressPlant(plant)}
          >
            <SelectableBoxWithImage
              key={plant.id}
              imageUrl={plant.imageUrl}
              alt={plant.commonName}
              bottomText={plant.commonName}
              selected={selectedPlants.includes(plant)}
            />
          </Box>
        ))}
      </Box>
      <Box width="100%" justifyContent="flex-end" onClick={handlePressNext}>
        <Arrow size="extraLarge" />
      </Box>
    </Layout>
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
