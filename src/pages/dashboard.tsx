import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as admin from 'firebase-admin';
import { useSpring, useTrail } from 'react-spring';
import nookies from 'nookies';
import { NextSeo } from 'next-seo';
import { GetServerSideProps, NextPage } from 'next';
import { Layout } from '../components/layout';
import { Box } from '../components/box/box';
import { DisplayBox, EmptyDisplayBox } from '../components/display-box';
import { Underline } from '../components/icon/underline';
import { verifyIdToken } from '../firebase/firebase-admin';
import { CollectionFromDB } from '../interfaces';
import { getWateringCountdown, sortCollectionByCommonName } from '../utils';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { DashboardTitle } from '../components/dashboard-title';
import { PlantsList } from '../components/plants-list';
import { AnimatedBox } from '../components/box/animatedBox';
import dayjs from 'dayjs';
import { DATE_DISPLAY_FORMAT } from '../components/calendar';
import { usePlantContext } from '../context/plant-context';
import { useAuthContext, UserDoc } from '../context/auth-context';
import { firebaseClient } from '../firebase/firebase-client';

interface Props {
  userDoc: UserDoc;
  plantDoc: CollectionFromDB[];
}

const Index: NextPage<Props> = ({ userDoc, plantDoc }: Props) => {
  const { firestore } = firebaseClient();
  const { isXS, isSM, isLG } = useMediaQuery();
  const { user } = useAuthContext();
  const { handleEditPlants } = usePlantContext();
  const [currentPlant, setCurrentPlant] = useState<CollectionFromDB>(
    plantDoc[0]
  );
  const [allPlants, setAllPlants] = useState<CollectionFromDB[]>(plantDoc);
  const [showXSDisplayBox, setShowXSDisplayBox] = useState<boolean>(false);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const plantsDueTomorrow = useMemo(
    () =>
      plantDoc.filter(
        (el) => getWateringCountdown(el.lastWateredOn, el.schedule) === 1
      ),
    [plantDoc]
  );
  const plantNameList = useMemo(() => allPlants.map((el) => el.commonName), [
    allPlants,
  ]);

  const handleClickTitle = useCallback(
    (id: string) => {
      setCurrentPlant(
        allPlants.filter((el: CollectionFromDB) => el.id === id)[0]
      );
      setShowXSDisplayBox(true);
    },
    [allPlants, setShowXSDisplayBox]
  );

  const handleDismissDisplayBox = useCallback(
    (event: any) => {
      const box = document?.getElementById(currentPlant.id);
      if (event.target === box || box?.contains(event.target)) return;
      setShowXSDisplayBox(false);
    },
    [currentPlant?.id]
  );

  const handleClickWatered = useCallback(
    async (plant: CollectionFromDB) => {
      const updatedEntry = {
        ...plant,
        lastWateredOn: dayjs().format(DATE_DISPLAY_FORMAT),
      };
      setSubmitting(true);
      handleEditPlants([updatedEntry]);
      try {
        await firestore
          .doc(`users/${user?.uid}`)
          .get()
          .then((res) => res.data())
          .then((data) => {
            setTimeout(() => {
              setCurrentPlant(data?.plants[plant.id]);
              setAllPlants((prev) => {
                const rest = prev.filter((el) => el.id !== plant.id);
                const updatedPlants = [
                  ...rest,
                  data?.plants[plant.id],
                ].sort((a, b) => sortCollectionByCommonName(a, b));
                return updatedPlants;
              });
              setSubmitting(false);
            }, 1000);
          });
      } catch (err) {
        console.log(err);
      }
    },
    [firestore, handleEditPlants, user?.uid]
  );

  const userPlantListTrails = useTrail(plantNameList.length, {
    from: { opacity: 0, y: -10, x: 40 },
    to: { opacity: 1, y: 0, x: 0 },
    delay: isLG ? 1600 : 900,
  });
  const plantListTransformProps = useSpring({
    to: {
      transform: `translateY(${
        ((plantNameList.length - 1) / 2) * (isSM ? 66 : 75) -
        plantNameList.indexOf(currentPlant.commonName) * (isSM ? 66 : 76)
      }px)`,
    },
  });
  const xsDisplayBoxOpacityProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: showXSDisplayBox || !currentPlant ? 1 : 0 },
  });

  useEffect(() => {
    if (isXS && currentPlant) {
      document.addEventListener('mouseup', handleDismissDisplayBox);
    }
    return () => {
      document.removeEventListener('mouseup', handleDismissDisplayBox);
    };
  }, [handleDismissDisplayBox, isXS, currentPlant]);

  return (
    <Layout
      maxWidth="dashboard"
      pt={isXS ? 'four' : 'zero'}
      pb={isXS ? 'five' : 'zero'}
      height={isXS ? '100%' : '100vh'}
      pageFlexDirection={['column', 'row']}
      justifyContent={['flex-start', 'center']}
      wrapPage={isXS ? true : false}
      bg={isXS && showXSDisplayBox ? 'pureBlackTen' : 'pureWhite'}
    >
      <NextSeo title="Drink up | Dashboard" description="" canonical="" />
      <Box
        flexGrow={[0, currentPlant ? 2 : 1]}
        flexShrink={1}
        flexDirection="column"
        alignItems={['center', 'flex-start']}
        display={currentPlant ? ['flex', 'none', 'none', 'flex'] : 'flex'}
        mb={['four', 'zero']}
        maxWidth={currentPlant ? '520px' : '100%'}
      >
        <DashboardTitle
          displayName={userDoc?.displayName}
          plantsDueTomorrow={plantsDueTomorrow}
          plantAmount={plantNameList.length}
        />
      </Box>

      <AnimatedBox
        mx="two"
        height={isXS ? '100vh' : '100%'}
        flexGrow={1}
        position={['fixed', 'relative']}
        top={isXS ? '50%' : 0}
        left={isXS ? '50%' : 0}
        zIndex={isXS && showXSDisplayBox ? 1 : 0}
        style={
          isXS
            ? {
                ...xsDisplayBoxOpacityProps,
                transform: 'translate(-53%, -50%)',
              }
            : undefined
        }
      >
        {currentPlant ? (
          <DisplayBox
            id={currentPlant.id}
            commonName={currentPlant.commonName}
            lastWateredOn={currentPlant.lastWateredOn}
            schedule={currentPlant.schedule}
            imageUrl={currentPlant.imageUrl}
            notes={currentPlant.notes}
            isSubmitting={isSubmitting}
            onClickWatered={() => handleClickWatered(currentPlant)}
          />
        ) : (
          <EmptyDisplayBox />
        )}
      </AnimatedBox>

      <Box
        flexGrow={1}
        flexShrink={0}
        ml={['zero', 'zero', 'one', 'two']}
        mr={['zero', 'zero', 'one', 'threePointFive']}
        display={currentPlant ? ['none', 'flex'] : 'none'}
      >
        <Underline variant="tertiary" />
      </Box>

      <AnimatedBox
        flexGrow={[0, 1]}
        flexShrink={0}
        alignItems={['center', 'flex-start']}
        flexDirection="column"
        mt={isXS ? 'one' : 'zero'}
        style={!isXS ? plantListTransformProps : undefined}
      >
        {userPlantListTrails.map((props, index) => (
          <AnimatedBox style={props} key={plantDoc[index].id}>
            <PlantsList
              plant={plantDoc[index]}
              indexDifference={
                plantNameList.indexOf(currentPlant.commonName) - index
              }
              isCurrentPlant={currentPlant.id === plantDoc[index].id}
              onClickTitle={handleClickTitle}
            />
          </AnimatedBox>
        ))}
      </AnimatedBox>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await verifyIdToken(cookies.token);
    const userDoc = await admin
      .firestore()
      .doc(`users/${token.uid}`)
      .get()
      .then((res) => res.data());
    const plantDoc = (Object.values(
      JSON.parse(JSON.stringify(userDoc?.plants))
    ) as CollectionFromDB[]).sort((a, b) => sortCollectionByCommonName(a, b));
    return {
      props: {
        userDoc: JSON.parse(JSON.stringify(userDoc)),
        plantDoc: plantDoc,
      },
    };
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
