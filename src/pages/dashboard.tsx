import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as admin from 'firebase-admin';
import { useSpring, useTrail } from 'react-spring';
import nookies from 'nookies';
import { NextSeo } from 'next-seo';
import { GetServerSideProps, NextPage } from 'next';
import { Layout } from '../components/layout';
import { Box } from '../components/box/box';
import { UserDoc } from '../context/auth-context';
import { DisplayBox, EmptyDisplayBox } from '../components/display-box';
import { Underline } from '../components/icon/underline';
import { verifyIdToken } from '../firebase/firebase-admin';
import { CollectionFromDB } from '../interfaces';
import { getWateringCountdown } from '../utils';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { DashboardTitle } from '../components/dashboard-title';
import { PlantsList } from '../components/plants-list';
import { AnimatedBox } from '../components/box/animatedBox';

interface Props {
  userDoc?: UserDoc;
}

const Index: NextPage<Props> = ({ userDoc }: Props) => {
  const { isXS, isSM, isLG } = useMediaQuery();
  const plants = useMemo(() => (userDoc?.plants || []) as CollectionFromDB[], [
    userDoc?.plants,
  ]);
  const [currentPlant, setCurrentPlant] = useState<CollectionFromDB>(plants[0]);
  const [disableTitleAnimation, setDisableTitleAnimation] = useState<boolean>(
    false
  );
  const [showXSDisplayBox, setShowXSDisplayBox] = useState<boolean>(false);
  const plantsDueTomorrow = useMemo(
    () =>
      plants.filter(
        (el) => getWateringCountdown(el.lastWateredOn, el.schedule) === 1
      ),
    [plants]
  );

  const handleClickTitle = useCallback(
    (id: string) => {
      setDisableTitleAnimation(true);
      setCurrentPlant(plants.filter((el: CollectionFromDB) => el.id === id)[0]);
      setShowXSDisplayBox(true);
    },
    [plants, setShowXSDisplayBox]
  );

  const handleDismissDisplayBox = useCallback(
    (event: any) => {
      const box = document?.getElementById(currentPlant.id);
      if (event.target === box || box?.contains(event.target)) return;
      setShowXSDisplayBox(false);
    },
    [currentPlant?.id]
  );

  const userPlantListTrails = useTrail(plants.length, {
    from: { opacity: 0, y: -10, x: 40 },
    to: { opacity: 1, y: 0, x: 0 },
    delay: isLG ? 1600 : 900,
  });

  const plantListTransformProps = useSpring({
    to: {
      transform: `translateY(calc(50vh - ${plants.indexOf(currentPlant)} * ${
        isSM ? '66px' : '76px'
      }))`,
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
  }, [
    handleDismissDisplayBox,
    plants,
    isXS,
    disableTitleAnimation,
    currentPlant,
  ]);

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
          plantAmount={plants.length}
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
            onClickWatered={() => null}
          />
        ) : (
          <EmptyDisplayBox />
        )}
      </AnimatedBox>

      <Box
        flexGrow={1}
        flexShrink={0}
        mx={['zero', 'zero', 'one', 'two']}
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
          <AnimatedBox style={props} key={plants[index].id}>
            <PlantsList
              plant={plants[index]}
              indexDifference={plants.indexOf(currentPlant) - index}
              isCurrentPlant={currentPlant === plants[index]}
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

    return {
      props: {
        userDoc: JSON.parse(JSON.stringify(userDoc)),
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
