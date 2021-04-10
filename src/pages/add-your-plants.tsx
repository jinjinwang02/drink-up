import React, { useCallback, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '../components/layout';
import { AddPlantBox } from '../components/add-plant-box';
import { PageTitleWithBody } from '../components/page-title-with-body';
import { Box } from '../components/box/box';
import { BoxyButton } from '../components/button/boxy-button';
import { AddButton } from '../components/button/add-button';
import { CloudButton } from '../components/button/cloud-button';
import { theme } from '../styles/theme';
import { CrossButton } from '../components/button/cross-button';
import { generateId } from '../utils';
import { usePlantContext } from '../context/plant-context';
import { CollectionWithInputs } from '../interfaces';

const Index: NextPage = () => {
  const router = useRouter();
  const {
    customCollectionWithInputs,
    setCustomCollectionWithInputs,
    handleAddOrEditPlants,
  } = usePlantContext();

  const handleAddBox = useCallback(() => {
    setCustomCollectionWithInputs((prev) => [...prev, { id: generateId() }]);
  }, [setCustomCollectionWithInputs]);

  const handleDeleteBox = useCallback(() => {
    setCustomCollectionWithInputs((prev) =>
      prev.slice(0, customCollectionWithInputs.length - 1)
    );
  }, [customCollectionWithInputs.length, setCustomCollectionWithInputs]);

  const handleSubmit = useCallback(async () => {
    if (!customCollectionWithInputs.length) {
      router.push('/dashboard');
      return;
    }
    handleAddOrEditPlants(
      customCollectionWithInputs as CollectionWithInputs[],
      '/dashboard'
    );
  }, [customCollectionWithInputs, handleAddOrEditPlants, router]);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [customCollectionWithInputs]);

  return (
    <Layout>
      <NextSeo title="Drink up | Add Your Plants" description="" canonical="" />
      <Box
        flexDirection="column"
        pt={customCollectionWithInputs.length ? 'seven' : 'fourteen'}
        pb="twelve"
        transition={theme.transitions.basic.medium}
      >
        <PageTitleWithBody
          title="Add your plants"
          body="If you didn't find your plants, add them here."
          centered
        />
        <Box flexDirection="column">
          {customCollectionWithInputs.map((el) => (
            <Box key={el.id} mt="five">
              <AddPlantBox plantId={el.id} />
            </Box>
          ))}
          {customCollectionWithInputs.length ? (
            <Box width="100%" justifyContent="space-around" mt="four">
              <AddButton onClick={handleAddBox} />
              <CrossButton onClick={handleDeleteBox} />
            </Box>
          ) : (
            <>
              <Box height="250px" width="200px" />
              <Box flexDirection="column" position="absolute" width="200px">
                <CloudButton my="three" borderless onClick={handleAddBox}>
                  Start!
                </CloudButton>
                <CloudButton my="three" borderless onClick={handleSubmit}>
                  Nope I&apos;m done
                </CloudButton>
              </Box>
            </>
          )}
        </Box>
      </Box>
      <BoxyButton onBack={() => router.back()} onNext={handleSubmit} />
    </Layout>
  );
};

export default Index;
