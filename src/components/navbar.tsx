import React from 'react';
import { useAuthContext } from '../context/auth-context';
import { Box } from './box/box';
import { Logo } from './icon/logo';
import { User } from './icon/user';

const NAVBAR_HEIGTH = 90;

const Navbar: React.FC = () => {
  const { user } = useAuthContext();
  return (
    <Box
      width="100%"
      height={NAVBAR_HEIGTH}
      justifyContent="flex-end"
      alignItems="flex-end"
    >
      {user ? (
        <>
          <Box mr="onePointSix">
            <User />
          </Box>
          <Logo strokeWidth={2} />
        </>
      ) : null}
    </Box>
  );
};

export { Navbar };
