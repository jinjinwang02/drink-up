import React, { useMemo } from 'react';
import { useAuthContext } from '../context/auth-context';
import { theme } from '../styles/theme';
import { Box, BoxProps } from './box/box';
import { Navbar, NAVBAR_HEIGHT_XS } from './navbar';

interface LayoutProps extends BoxProps {
  children: React.ReactNode;
  hasMinHeight?: boolean;
  maxWidth?: 'default' | 'dashboard';
  wrapPage?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  hasMinHeight = true,
  maxWidth = 'default',
  wrapPage = true,
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
      transition={theme.transitions.medium}
      {...rest}
    >
      <Navbar isUserLoggedIn={!!user} right={spacing} />
      <Box
        width="100%"
        minHeight={hasMinHeight ? '100vh' : 0}
        flexWrap={wrapPage ? 'wrap' : 'noWrap'}
        mt={!hasMinHeight ? NAVBAR_HEIGHT_XS : 0}
      >
        {children}
      </Box>
    </Box>
  );
};

export { Layout };
