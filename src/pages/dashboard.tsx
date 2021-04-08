import React, { useCallback, useMemo, useState } from 'react';
import * as admin from 'firebase-admin';
import nookies from 'nookies';
import { NextSeo } from 'next-seo';
import { GetServerSideProps, NextPage } from 'next';
import { Layout } from '../components/layout';
import { Box } from '../components/box/box';
import { UserDoc } from '../context/auth-context';
import { Typography } from '../components/typography';
import { DisplayBox } from '../components/display-box';
import { Underline } from '../components/icon/underline';
import { verifyIdToken } from '../firebase/firebase-admin';
import { ButtonContainer } from '../components/button/button-container';

import { CollectionFromDB } from '../interfaces';
import { getWateringCountdown } from '../utils';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { TitleWithUnderline } from '../components/title-with-underline';
import { theme } from '../styles/theme';

interface Props {
  userDoc?: UserDoc;
}

const Index: NextPage<any> = ({ userDoc }: Props) => {
  const { isXS, isSM } = useMediaQuery();
  const plants = useMemo(() => (userDoc?.plants || []) as CollectionFromDB[], [
    userDoc?.plants,
  ]);
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
    },
    [plants]
  );

  const getGradientProps = useCallback((difference) => {
    const sharedProps = {
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    };
    if (difference === 3) {
      return {
        background: `-webkit-linear-gradient(${theme.colors.lightestGrey}, ${theme.colors.mediumGrey})`,
        ...sharedProps,
      };
    } else if (difference === -3) {
      return {
        background: `-webkit-linear-gradient(${theme.colors.mediumGrey}, ${theme.colors.lightestGrey})`,
        ...sharedProps,
      };
    }
  }, []);

  return (
    <Layout
      flexDirection={['column', 'row']}
      justifyContent={['flex-start', 'space-between']}
      maxWidth="dashboard"
      hasMinHeight={!isXS}
      height={isXS ? '100%' : '100vh'}
      wrapPage={isXS ? true : false}
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
        <Typography textStyle={['h2', 'h2', 'h2', 'h1']}>
          Hi {userDoc?.displayName ?? 'there'},
        </Typography>
        {!isXS ? (
          <Typography
            textStyle={['h2', 'h2', 'h2', 'h1']}
            mt={['one', 'one', 'two', 'two']}
          >
            {plants.length
              ? `You have ${plants.length} plants.`
              : `You haven't added any plants.`}
          </Typography>
        ) : (
          <TitleWithUnderline>
            {plants.length
              ? `You have ${plants.length} plants.`
              : `You haven't added any plants.`}
          </TitleWithUnderline>
        )}
        <Box
          mt={['four', 'three']}
          mb={['zero', 'four']}
          justifyContent={['center', 'flex-start']}
          flexWrap="wrap"
        >
          {plantsDueTomorrow.length ? (
            <>
              {plantsDueTomorrow.map((el) => (
                <Typography key={el.id} textStyle="bodyL">
                  {el.commonName},&nbsp;
                </Typography>
              ))}
              <Typography textStyle="bodyL">
                {plantsDueTomorrow.length > 1 ? 'need' : 'needs'} to be
                watered&nbsp;
              </Typography>
              <Typography textStyle="bodyLBold">tomorrow.</Typography>
            </>
          ) : plants.length ? (
            <Typography textStyle="bodyL">
              All sufficently hydrated :)
            </Typography>
          ) : (
            <Typography textStyle="bodyL">Why not adding some?</Typography>
          )}
        </Box>
      </Box>
      {currentPlant ? (
        <Box mx="one" flexGrow={1} display={['none', 'flex']}>
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
      {isXS ? (
        <Box flexGrow={0} flexShrink={0} flexDirection="column">
          {plants.map((el: CollectionFromDB) => (
            <Box key={el.id} id="title" mb="twoPointTwo">
              <ButtonContainer onClick={() => handleClickTitle(el.id)}>
                <Typography
                  textStyle="h3"
                  color={
                    currentPlant?.id === el.id ? 'pureBlack' : 'mediumGrey'
                  }
                >
                  {el.commonName.length}
                </Typography>
              </ButtonContainer>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          flexGrow={1}
          flexShrink={0}
          alignItems="flex-start"
          position="relative"
          flexDirection="column"
          transition={theme.transitions.medium}
          style={{
            transform: `translateY(calc(${
              isSM ? '40vh' : '45vh'
            } - ${plants.indexOf(currentPlant)} * ${isSM ? '66px' : '76px'}))`,
          }}
        >
          {plants.map((el: CollectionFromDB) => (
            <Box key={el.id} mb="twoPointTwo">
              <ButtonContainer onClick={() => handleClickTitle(el.id)}>
                <Typography
                  textStyle={['h3', 'h5', 'h3']}
                  style={getGradientProps(
                    plants.indexOf(currentPlant) - plants.indexOf(el)
                  )}
                  color={
                    currentPlant?.id === el.id
                      ? 'pureBlack'
                      : plants.indexOf(currentPlant) - plants.indexOf(el) > 3 ||
                        plants.indexOf(currentPlant) - plants.indexOf(el) < -3
                      ? 'lightestGrey'
                      : 'mediumGrey'
                  }
                >
                  {el.commonName.length > 20
                    ? el.commonName.slice(0, 20) + '...'
                    : el.commonName}
                </Typography>
              </ButtonContainer>
            </Box>
          ))}
        </Box>
      )}
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
    console.log(error);
    return { props: {} };
  }
};

export default Index;
