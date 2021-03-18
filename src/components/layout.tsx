import React from 'react';
import { useAuthContext } from '../context/auth-context';
import { Box, BoxProps } from './box/box';
import { Navbar, NAVBAR_HEIGHT_MD, NAVBAR_HEIGHT_XS } from './navbar';

interface LayoutProps extends BoxProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, ...rest }: LayoutProps) => {
  const { user } = useAuthContext();
  return (
    <Box
      width="100vw"
      position="relative"
      overflow="hidden"
      px={['two', 'four', 'six', 'twelve']}
      {...rest}
    >
      <Navbar isUserLoggedIn={!!user} />
      <Box
        mt={[NAVBAR_HEIGHT_XS, NAVBAR_HEIGHT_MD]}
        width="100%"
        flexWrap="wrap"
      >
        {children}
      </Box>
    </Box>
  );
};

export { Layout };
