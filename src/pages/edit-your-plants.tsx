import React from 'react';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { Box } from '../components/box/box';
import { usePlantContext } from '../context/plant-context';
import { EditPlantBox, BOX_WIDTH_MD } from '../components/edit-plant-box';
import { Layout } from '../components/layout';
import { PageTitleWithBody } from '../components/page-title-with-body';
import { BoxyButton } from '../components/button/boxy-button';
import { useRouter } from 'next/router';
import { theme } from '../styles/theme';

const Index: NextPage = () => {
  const router = useRouter();
  const { plantCollection, handleEditPlantSubmit } = usePlantContext();
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
        transition={theme.transitions.medium}
        display="grid"
        gridTemplateColumns={[
          '1fr',
          `repeat(auto-fill, minmax(${BOX_WIDTH_MD}px, 1fr))`,
        ]}
        gridRowGap="four"
        alignItems="flex-start"
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
      <BoxyButton onBack={() => router.back()} onNext={handleEditPlantSubmit} />
    </Layout>
  );
};

export default Index;
