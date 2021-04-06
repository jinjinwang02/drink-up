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
import { NAVBAR_HEIGHT_XS } from '../components/navbar';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { TitleWithUnderline } from '../components/title-with-underline';

interface Props {
  userDoc?: UserDoc;
}

const Index: NextPage<any> = ({ userDoc }: Props) => {
  const isXS = useMediaQuery();
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
  return (
    <Layout
      justifyContent={['flex-start', 'space-between']}
      maxWidth="dashboard"
      flexDirection={['column', 'row']}
      mt={[NAVBAR_HEIGHT_XS, 0]}
      hasMinHeight={!isXS}
      wrapPage={false}
    >
      <NextSeo title="Drink up | Dashboard" description="" canonical="" />
      <Box
        flexGrow={[0, 2]}
        flexShrink={1}
        flexDirection="column"
        alignItems={['center', 'flex-start']}
        display={['flex', 'none', 'none', 'flex']}
        mb={['four', 'zero']}
      >
        <Typography textStyle={['h2', 'h2', 'h2', 'h1']}>
          Hi {userDoc?.displayName},
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
        {plantsDueTomorrow.length ? (
          <Box
            mt={['four', 'three']}
            justifyContent={['center', 'flex-start']}
            flexWrap="wrap"
          >
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
          </Box>
        ) : null}
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
      <Box
        flexGrow={[0, 1]}
        flexShrink={0}
        flexDirection="column"
        alignItems={['center', 'flex-start']}
      >
        {plants.map((el: CollectionFromDB) => (
          <Box key={el.id} mb="twoPointTwo">
            <ButtonContainer onClick={() => handleClickTitle(el.id)}>
              <Typography
                textStyle={['h3', 'h5', 'h3']}
                color={currentPlant?.id === el.id ? 'pureBlack' : 'mediumGrey'}
              >
                {el.commonName}
              </Typography>
            </ButtonContainer>
          </Box>
        ))}
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
};

// export const getServerSideProps: GetServerSideProps = async (context: any) => {
//   try {
//     const cookies = nookies.get(context);
//     const token = await verifyIdToken(cookies.token);
//     return {
//       props: { session: token },
//     };
//   } catch (error) {
//     context.res.writeHead(302, { location: '/' });
//     context.res.end();
//     return { props: {} };
//   }
// };

export default Index;
