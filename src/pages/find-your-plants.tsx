import React, { useCallback, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { firebaseClient } from '../firebase/firebase-client';
import { Box } from '../components/box/box';
import {
  BOX_WIDTH_MD,
  BOX_WIDTH_XS,
  SelectableBoxWithImage,
} from '../components/box/selectable-box-with-image';
import { Collection } from '../interfaces';
import { Arrow } from '../components/icon/arrow';
import { usePlantContext } from '../context/plant-context';
import { useRouter } from 'next/router';
import { Layout } from '../components/layout';
import { PageTitleWithBody } from '../components/page-title-with-body';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Typography } from '../components/typography';

interface Props {
  collection: Collection[];
}

const Index: NextPage<Props> = ({ collection }: Props) => {
  const isXS = useMediaQuery();
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
    <Layout mb={['four', 'eight', 'ten']}>
      <NextSeo title="Drink up | Find Your Plant" description="" canonical="" />
      <PageTitleWithBody
        title="Find your plants"
        body="Can't find your plants? Don't worry, you can add them later."
      />
      <Box
        width="100%"
        display="grid"
        gridTemplateColumns={[
          `repeat(auto-fit, minmax(${BOX_WIDTH_XS}px, 1fr))`,
          `repeat(auto-fit, minmax(${BOX_WIDTH_MD}px, 1fr))`,
        ]}
        gridRowGap="two"
      >
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
      </Box>
      <Typography textStyle="bodyL" mt="two">
        End of list :)
      </Typography>
      {!isXS ? (
        <Box
          width="100%"
          mr="two"
          justifyContent="flex-end"
          onClick={handlePressNext}
        >
          <Arrow size="extraLarge" />
        </Box>
      ) : null}
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
