import React, { useCallback, useEffect } from 'react';
import nookies from 'nookies';
import { NextSeo } from 'next-seo';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Layout } from '../components/layout';
import { AddPlantBox } from '../components/add-plant-box';
import { PageTitleWithBody } from '../components/page-title-with-body';
import { Box } from '../components/box/box';
import { BoxyButton } from '../components/button/boxy-button';
import { AddButton } from '../components/button/add-button';
import { CloudButton } from '../components/button/cloud-button';
import { CrossButton } from '../components/button/cross-button';
import { generateId } from '../utils';
import { usePlantContext } from '../context/plant-context';
import { CollectionWithInputs } from '../interfaces';
import { verifyIdToken } from '../firebase/firebase-admin';
import { AnimatedBox } from '../components/box/animatedBox';
import { useSpring } from '@react-spring/core';

const Index: NextPage = () => {
  const router = useRouter();
  const {
    customCollectionWithInputs,
    setCustomCollectionWithInputs,
    handleAddPlants,
  } = usePlantContext();

  const handleAddBox = useCallback(() => {
    setCustomCollectionWithInputs((prev) => [...prev, { id: generateId() }]);
  }, [setCustomCollectionWithInputs]);

  const handleDeleteBox = useCallback(() => {
    setCustomCollectionWithInputs((prev) =>
      prev.slice(0, customCollectionWithInputs.length - 1)
    );
  }, [customCollectionWithInputs.length, setCustomCollectionWithInputs]);

  const handleSubmit = useCallback(() => {
    if (!customCollectionWithInputs.length) {
      router.push('/dashboard');
      return;
    }
    handleAddPlants(customCollectionWithInputs as CollectionWithInputs[], () =>
      router.push('/dashboard')
    );
  }, [customCollectionWithInputs, handleAddPlants, router]);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [customCollectionWithInputs]);

  const yPositionProps = useSpring({
    from: { y: 140 },
    to: { y: customCollectionWithInputs.length ? 70 : 140 },
  });

  return (
    <Layout>
      <NextSeo title="Drink up | Add Your Plants" description="" canonical="" />
      <AnimatedBox flexDirection="column" pb="eighteen" style={yPositionProps}>
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
      </AnimatedBox>
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
