import React from 'react';
import { useAuthContext } from '../context/auth-context';
import { Box } from './box/box';
import { Navbar } from './navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const { user } = useAuthContext();
  return (
    <Box
      width="100vw"
      minHeight="100vh"
      alignItems="flex-start"
      overflow="hidden"
      flexWrap="wrap"
      px={['two', 'four', 'six', 'twelve']}
    >
      <Navbar isUserLoggedIn={!!user} />
      {children}
    </Box>
  );
};

export { Layout };
