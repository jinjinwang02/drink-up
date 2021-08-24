import React, { useEffect } from 'react';
import nookies from 'nookies';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Box } from '../components/box/box';
import { usePlantContext } from '../context/plant-context';
import {
  EditPlantBox,
  BOX_WIDTH_MD,
  BOX_WIDTH_XS,
} from '../components/edit-plant-box';
import { Layout } from '../components/layout';
import { PageTitleWithBody } from '../components/page-title-with-body';
import { BoxyButton } from '../components/button/boxy-button';
import { useRouter } from 'next/router';
import { NAVBAR_HEIGHT_MD, NAVBAR_HEIGHT_XS } from '../components/navbar';
import { verifyIdToken } from '../firebase/firebase-admin';

const Index: NextPage = () => {
  const router = useRouter();

  const {
    plantCollection,
    plantCollectionWithInputs,
    handleAddPlants,
  } = usePlantContext();

  useEffect(() => {
    if (!plantCollection.length || !plantCollectionWithInputs.length) {
      router.push('/find-your-plants');
    }
  }, [plantCollection.length, plantCollectionWithInputs.length, router]);

  const handleSubmit = async () => {
    await handleAddPlants(plantCollectionWithInputs, () =>
      router.push('/add-your-plants')
    );
  };

  return (
    <Layout
      pt={[NAVBAR_HEIGHT_XS, NAVBAR_HEIGHT_MD]}
      mb={['four', 'eight', 'ten']}
    >
      <NextSeo
        title="Drink up | Edit The Details"
        description=""
        canonical=""
      />

      <PageTitleWithBody title="Edit the details" />
      <Box
        width="100%"
        display="grid"
        alignItems="flex-start"
        gridTemplateColumns={[
          BOX_WIDTH_XS,
          `repeat(auto-fill, minmax(${BOX_WIDTH_MD}px, 1fr))`,
        ]}
        gridRowGap="four"
        mt="two"
        pb="eight"
      >
        {plantCollection.map((plant) => {
          const { id, imageUrl, commonName } = plant;
          return (
            <Box key={id} flexDirection="column">
              <EditPlantBox
                id={id}
                imageUrl={imageUrl}
                commonName={commonName}
                schedule=""
                lastWateredOn=""
              />
            </Box>
          );
        })}
      </Box>
      <BoxyButton onBack={() => router.back()} onNext={handleSubmit} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    await verifyIdToken(cookies.token);
    return { props: {} };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default Index;
