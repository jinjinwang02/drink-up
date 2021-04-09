import React, { useCallback } from 'react';
import { NextPage } from 'next';
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
import { theme } from '../styles/theme';
import { NAVBAR_HEIGHT_MD, NAVBAR_HEIGHT_XS } from '../components/navbar';

const Index: NextPage = () => {
  const router = useRouter();
  const {
    plantCollection,
    plantCollectionWithInputs,
    handleAddOrEditPlants,
  } = usePlantContext();

  const handleSubmit = useCallback(() => {
    handleAddOrEditPlants(plantCollectionWithInputs, 'add-your-plants');
  }, [handleAddOrEditPlants, plantCollectionWithInputs]);

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
        transition={theme.transitions.medium}
        mt="two"
        pb="five"
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

export default Index;
