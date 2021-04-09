import React, { useMemo } from 'react';
import { useAuthContext } from '../context/auth-context';
import { Box, BoxProps } from './box/box';
import { Navbar } from './navbar';

interface LayoutProps extends BoxProps {
  children: React.ReactNode;
  hasMinHeight?: boolean;
  maxWidth?: 'default' | 'dashboard';
  wrapPage?: boolean;
  pageFlexDirection?: 'column' | 'row' | ('column' | 'row')[];
}

const Layout: React.FC<LayoutProps> = ({
  children,
  hasMinHeight = true,
  maxWidth = 'default',
  wrapPage = true,
  pageFlexDirection = 'column',
  ...rest
}: LayoutProps) => {
  const { user } = useAuthContext();
  const spacing = useMemo(
    () =>
      maxWidth === 'default'
        ? ['two', 'four', 'six', 'twelve']
        : ['two', 'four', 'five', 'seven', 'ten'],
    [maxWidth]
  );
  return (
    <Box
      width="100vw"
      minHeight="100vh"
      position="relative"
      overflow="hidden"
      px={spacing}
      {...rest}
    >
      <Navbar isUserLoggedIn={!!user} right={spacing} />
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
