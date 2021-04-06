import React, { useCallback, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { firebaseClient } from '../firebase/firebase-client';
import { Box } from '../components/box/box';
import {
  BOX_WIDTH_MD,
  SelectableBoxWithImage,
} from '../components/box/selectable-box-with-image';
import { Collection } from '../interfaces';
import { usePlantContext } from '../context/plant-context';
import { useRouter } from 'next/router';
import { Layout } from '../components/layout';
import { PageTitleWithBody } from '../components/page-title-with-body';
import { Typography } from '../components/typography';
import { BoxyButton } from '../components/button/boxy-button';
import { NAVBAR_HEIGHT_MD, NAVBAR_HEIGHT_XS } from '../components/navbar';

interface Props {
  collection: Collection[];
}

const Index: NextPage<Props> = ({ collection }: Props) => {
  const router = useRouter();
  const {
    plantCollection,
    setPlantCollection,
    setPlantCollectionWithInputs,
  } = usePlantContext();
  const [selectedPlants, setSelctedPlants] = useState<Collection[]>([
    ...plantCollection,
  ]);

  const handlePressPlant = useCallback(
    (plant: Collection) => {
      if (selectedPlants.map((el) => el.id).includes(plant.id)) {
        setSelctedPlants(selectedPlants.filter((el) => el.id !== plant.id));
      } else {
        setSelctedPlants((prev) => [...prev, plant]);
      }
    },
    [selectedPlants]
  );

  const handlePressNext = useCallback(() => {
    if (selectedPlants.length) {
      setPlantCollection(selectedPlants);
      setPlantCollectionWithInputs(selectedPlants);
      router.push('/edit-your-plants');
    } else {
      router.push('/add-your-plants');
    }
  }, [
    router,
    selectedPlants,
    setPlantCollection,
    setPlantCollectionWithInputs,
  ]);

  return (
    <Layout
      pt={[NAVBAR_HEIGHT_XS, NAVBAR_HEIGHT_MD]}
      mb={['four', 'eight', 'ten']}
    >
      <NextSeo
        title="Drink up | Find Your Plants"
        description=""
        canonical=""
      />
      <Box mb="three" width="100%">
        <PageTitleWithBody
          title="Find your plants"
          body="Can't find your plants? Don't worry, you can add them later."
        />
      </Box>
      <Box
        width="100%"
        display="grid"
        gridTemplateColumns={[
          '1fr',
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
              selected={selectedPlants.map((el) => el.id).includes(plant.id)}
            />
          </Box>
        ))}
      </Box>
      <Typography textStyle="bodyL" mt="four" mb={['five', 'zero']}>
        End of list :)
      </Typography>
      <BoxyButton onNext={handlePressNext} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
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
