import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as admin from 'firebase-admin';
import { TweenLite, Power3 } from 'gsap';
import nookies from 'nookies';
import { NextSeo } from 'next-seo';
import { GetServerSideProps, NextPage } from 'next';
import { Layout } from '../components/layout';
import { Box } from '../components/box/box';
import { UserDoc } from '../context/auth-context';
import { DisplayBox } from '../components/display-box';
import { Underline } from '../components/icon/underline';
import { verifyIdToken } from '../firebase/firebase-admin';
import { CollectionFromDB } from '../interfaces';
import { getWateringCountdown } from '../utils';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { theme } from '../styles/theme';
import { DashboardTitle } from '../components/dashboard-title';
import { PlantsList } from '../components/plants-list';

interface Props {
  userDoc?: UserDoc;
}

const Index: NextPage<any> = ({ userDoc }: Props) => {
  const { isXS, isSM } = useMediaQuery();
  const nameElements = useRef<React.RefObject<HTMLDivElement>[]>([]);

  const plants = useMemo(() => (userDoc?.plants || []) as CollectionFromDB[], [
    userDoc?.plants,
  ]);
  const [showXSDisplayBox, setShowXSDisplayBox] = useState<boolean>(false);
  const [currentPlant, setCurrentPlant] = useState<CollectionFromDB>(plants[0]);
  const plantsDueTomorrow = useMemo(
    () =>
      plants.filter(
        (el) => getWateringCountdown(el.lastWateredOn, el.schedule) === 1
      ),
    [plants]
  );

  const handleClickTitle = useCallback(
    (id: string) => {
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

  useEffect(() => {
    if (!isXS) {
      Array(plants.length)
        .fill(0)
        .map((_el, index) =>
          TweenLite.from(nameElements.current[index], 0.8, {
            opacity: 0,
            y: -10,
            x: 40,
            duration: 0.5,
            ease: Power3.easeInOut,
            delay: index * 0.2 + 1,
          })
        );
    }

    if (isXS) {
      document.addEventListener('mouseup', handleDismissDisplayBox);
    }
    return () => {
      document.removeEventListener('mouseup', handleDismissDisplayBox);
    };
  }, [handleDismissDisplayBox, isXS, plants.length]);

  return (
    <Layout
      maxWidth="dashboard"
      pt={isXS ? 'four' : 'zero'}
      pb={isXS ? 'five' : 'zero'}
      height={isXS ? '100%' : '100vh'}
      pageFlexDirection={['column', 'row']}
      justifyContent={['flex-start', 'space-between']}
      wrapPage={isXS ? true : false}
      bg={isXS && showXSDisplayBox ? 'pureBlackTen' : 'pureWhite'}
    >
      <NextSeo title="Drink up | Dashboard" description="" canonical="" />
      <Box
        flexGrow={[0, 2]}
        flexShrink={1}
        flexDirection="column"
        alignItems={['center', 'flex-start']}
        display={['flex', 'none', 'none', 'flex']}
        mb={['four', 'zero']}
        maxWidth="520px"
      >
        <DashboardTitle
          displayName={userDoc?.displayName}
          plantsDueTomorrow={plantsDueTomorrow}
          plantAmount={plants.length}
        />
      </Box>

      {currentPlant ? (
        <Box
          mx="one"
          height={isXS ? '100vh' : '100%'}
          flexGrow={1}
          position={['fixed', 'relative']}
          top={isXS ? '50%' : 0}
          left={isXS ? '50%' : 0}
          zIndex={1}
          display={['flex', 'flex']}
          style={
            isXS
              ? {
                  transform: 'translate(-53%, -50%)',
                  opacity: showXSDisplayBox ? 1 : 0,
                  visibility: showXSDisplayBox ? 'visible' : 'hidden',
                }
              : undefined
          }
          transition={theme.transitions.basic.medium}
        >
          <DisplayBox
            id={currentPlant.id}
            commonName={currentPlant.commonName}
            lastWateredOn={currentPlant.lastWateredOn}
            schedule={currentPlant.schedule}
            imageUrl={currentPlant.imageUrl}
            notes={currentPlant.notes}
            onClickWatered={() => null}
          />
        </Box>
      ) : null}

      <Box
        flexGrow={1}
        flexShrink={0}
        mx={['zero', 'zero', 'one', 'two']}
        display={['none', 'flex']}
      >
        <Underline variant="tertiary" />
      </Box>

      <Box
        flexGrow={[0, 1]}
        flexShrink={0}
        alignItems={['center', 'flex-start']}
        position="relative"
        flexDirection="column"
        mt={isXS ? 'one' : 'zero'}
        transition={theme.transitions.basic.medium}
        style={
          !isXS
            ? {
                transform: `translateY(calc(${
                  isSM ? '40vh' : '45vh'
                } - ${plants.indexOf(currentPlant)} * ${
                  isSM ? '66px' : '76px'
                }))`,
              }
            : undefined
        }
      >
        {plants.map((el: CollectionFromDB) => (
          <Box
            key={el.id}
            ref={(el: React.RefObject<HTMLDivElement>) =>
              nameElements.current.push(el)
            }
          >
            <PlantsList
              plant={el}
              indexDifference={
                plants.indexOf(currentPlant) - plants.indexOf(el)
              }
              isCurrentPlant={currentPlant === el}
              onClickTitle={handleClickTitle}
            />
          </Box>
        ))}
      </Box>
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
      props: { userDoc: JSON.parse(JSON.stringify(userDoc)) },
    };
  } catch (error) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
    return { props: {} };
  }
};

export default Index;
