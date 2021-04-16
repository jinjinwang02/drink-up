import React from 'react';
import { useAuthContext } from '../context/auth-context';
import { Box, BoxProps } from './box/box';
import { Navbar } from './navbar';

interface LayoutProps extends BoxProps {
  children: React.ReactNode;
  hasMinHeight?: boolean;
  maxWidth?: 'default' | 'dashboard';
  wrapPage?: boolean;
  pageFlexDirection?: 'column' | 'row' | ('column' | 'row')[];
  showNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  hasMinHeight = true,
  maxWidth = 'default',
  wrapPage = true,
  pageFlexDirection = 'column',
  showNavbar = true,
  ...rest
}: LayoutProps) => {
  ////
  const { user } = useAuthContext();
  const defaultPx = ['two', 'four', 'six', 'twelve'];
  const dashboardPx = ['two', 'four', 'five', 'seven', 'nine'];
  const spacing = maxWidth === 'default' ? defaultPx : dashboardPx;

  return (
    <Box
      width="100vw"
      position="relative"
      overflow="hidden"
      px={spacing}
      {...rest}
    >
      {showNavbar ? <Navbar isUserLoggedIn={!!user} right={defaultPx} /> : null}
      <Box
        width="100%"
        flexDirection={pageFlexDirection}
        justifyContent="flex-start"
        minHeight={hasMinHeight ? '100vh' : 0}
        flexWrap={wrapPage ? 'wrap' : 'noWrap'}
      >
        {children}
      </Box>
    </Box>
  );
};

export { Layout };
