import React from 'react';
import { Box } from './box/box';
import { Navbar } from './navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => (
  <Box
    width="100vw"
    overflow="hidden"
    flexWrap="wrap"
    px={['two', 'four', 'six', 'twelve']}
    pb={['four', 'six', 'eight', 'ten']}
  >
    <Navbar />
    {children}
  </Box>
);

export { Layout };
