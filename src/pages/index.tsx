import React, { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { Authentication } from '../components/authentication';
import { Layout } from '../components/layout';
import { useAuthContext } from '../context/auth-context';
import { useRouter } from 'next/router';

const Index: React.FC = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [router, user]);
  return (
    <>
      <Layout>
        <NextSeo title="Drink up | Homepage" description="" canonical="" />
        <Authentication />
      </Layout>
    </>
  );
};

export default Index;
