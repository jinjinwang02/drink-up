import React from 'react';
import { NextSeo } from 'next-seo';
import { NextPage } from 'next';
import { Layout } from '../components/layout';
import { Box } from '../components/box/box';

const Index: NextPage = () => {
  return (
    <Layout>
      <NextSeo title="Drink up | Dashboard" description="" canonical="" />
      <Box height="80vh" />
    </Layout>
  );
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
