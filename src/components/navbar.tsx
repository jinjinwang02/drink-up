import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { firebaseClient } from '../firebase/firebase-client';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { theme } from '../styles/theme';
import { Box } from './box/box';
import { UserButton } from './button/user-button';
import { Cross } from './icon/cross';
import { Logo } from './icon/logo';
import { Typography } from './typography';

export const NAVBAR_HEIGHT_MD = 78;
export const NAVBAR_HEIGHT_XS = 58;
const ICON_HEIGHT = 28;
const NAV_DROPDOWN_HEIGHT_MD = 130;
const NAV_DROPDOWN_WIDTH_MD = 125;

interface NavbarProps {
  isUserLoggedIn?: boolean;
  right: string[];
}

interface NavDropdownProps {
  showDropdown?: boolean;
  onCloseDropdown: (e: any) => void;
  isXS?: boolean;
}
const NavDropdown: React.FC<NavDropdownProps> = ({
  showDropdown,
  onCloseDropdown,
  isXS,
}: NavDropdownProps) => {
  const { auth } = firebaseClient();
  const router = useRouter();
  return (
    <Box
      flexDirection="column"
      width="100%"
      height={['100%', NAV_DROPDOWN_HEIGHT_MD]}
      position={['fixed', 'relative']}
      backgroundColor="pureWhite"
      justifyContent="space-evenly"
      mt={[NAVBAR_HEIGHT_XS, 'two']}
      border={['none', 'regularBlack']}
      top={[-`${NAVBAR_HEIGHT_XS}`, 'zero']}
      right={0}
      style={{
        transform: !isXS
          ? showDropdown
            ? `translateY(0%)`
            : `translateY(-15%)`
          : undefined,
        opacity: showDropdown ? 1 : 0,
        visibility: showDropdown ? 'visible' : 'hidden',
        cursor: showDropdown ? 'pointer' : 'auto',
      }}
      transition={theme.transitions.medium}
      zIndex={showDropdown ? 'dropdown' : 0}
    >
      {showDropdown && isXS ? (
        <Box
          position="fixed"
          onClick={(e: any) => onCloseDropdown(e)}
          top="four"
          right="four"
        >
          <Cross />
        </Box>
      ) : null}
      <Box onClick={() => router.push('/dashboard')}>
        <Typography textStyle="bodyL">Dashboard</Typography>
      </Box>
      <Box onClick={() => router.push('/browse')}>
        <Typography textStyle="bodyL">Browse all plants</Typography>
      </Box>
      <Box onClick={() => router.push('/find-your-plants')}>
        <Typography textStyle="bodyL">Add plants</Typography>
      </Box>
      <Box
        onClick={async () => {
          await auth.signOut();
          router.push('/');
        }}
      >
        <Typography textStyle="bodyL">Log out</Typography>
      </Box>
    </Box>
  );
};

const Navbar: React.FC<NavbarProps> = ({
  isUserLoggedIn,
  right,
}: NavbarProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { isXS } = useMediaQuery();
  const handleCloseDropdown = useCallback((event: any) => {
    const icon = document?.getElementById('userIcon');
    if (event.target === icon || icon?.contains(event.target)) return;
    setShowDropdown(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', handleCloseDropdown);
    return () => {
      document.removeEventListener('mouseup', handleCloseDropdown);
    };
  }, [handleCloseDropdown]);
  return (
    <Box
      width="100%"
      position="fixed"
      top={[NAVBAR_HEIGHT_XS - ICON_HEIGHT, NAVBAR_HEIGHT_MD - ICON_HEIGHT]}
      right={right}
      pr={isXS ? 'onePointSix' : 'zero'}
      justifyContent="flex-end"
      zIndex="navbar"
    >
      {isUserLoggedIn ? (
        <>
          <Box
            flexDirection="column"
            width={isXS ? 'auto' : NAV_DROPDOWN_WIDTH_MD}
          >
            <UserButton
              id="userIcon"
              onClick={() => setShowDropdown((prev) => !prev)}
              zIndex={1}
              mr={-`${theme.space.two}`}
            />
            <NavDropdown
              showDropdown={showDropdown}
              onCloseDropdown={handleCloseDropdown}
              isXS={isXS}
            />
          </Box>
          {!isXS ? (
            <Box
              position="absolute"
              right="zero"
              top={-`${theme.space.zeroPointFour}`}
            >
              <Logo strokeWidth={2} />
            </Box>
          ) : null}
        </>
      ) : null}
    </Box>
  );
};

export { Navbar };
