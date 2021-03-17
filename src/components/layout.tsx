import React from 'react';
import { useAuthContext } from '../context/auth-context';
import { Box, BoxProps } from './box/box';
import { Navbar } from './navbar';

interface LayoutProps extends BoxProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, ...rest }: LayoutProps) => {
  const { user } = useAuthContext();
  return (
    <Box
      width="100vw"
      alignItems="flex-start"
      overflow="hidden"
      flexWrap="wrap"
      px={['two', 'four', 'six', 'twelve']}
      {...rest}
    >
      <Navbar isUserLoggedIn={!!user} />
      {children}
    </Box>
  );
};

export { Layout };
