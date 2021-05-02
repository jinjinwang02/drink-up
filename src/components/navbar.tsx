import { useSpring } from 'react-spring';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { firebaseClient } from '../firebase/firebase-client';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { theme } from '../styles/theme';
import { AnimatedBox } from './box/animatedBox';
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

interface NavDropdownItemProps {
  children: string;
  cursorStyle: string;
  onClick: () => void;
}

const NavDropdownItem = ({
  children,
  cursorStyle,
  onClick,
}: NavDropdownItemProps) => (
  <Box style={{ cursor: cursorStyle }} onClick={onClick}>
    <Typography textStyle="bodyL">{children}</Typography>
  </Box>
);

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
  const xsTransformProps = useSpring({
    from: {
      x: 500,
      opacity: 0,
    },
    to: {
      transformOrigin: 'bottom',
      x: showDropdown ? 0 : 500,
      opacity: showDropdown ? 1 : 0,
    },
  });
  const smTransformProps = useSpring({
    from: {
      transform: 'scaleY(0.3)',
      y: -20,
      opacity: 0,
    },
    to: {
      transformOrigin: 'top',
      transform: 'scaleY(1)',
      y: showDropdown ? 0 : -20,
      opacity: showDropdown ? 1 : 0,
    },
  });
  const cursorStyle = showDropdown ? 'pointer' : 'default';
  return (
    <AnimatedBox
      flexDirection="column"
      width={isXS ? '100%' : NAV_DROPDOWN_WIDTH_MD}
      height={['100%', NAV_DROPDOWN_HEIGHT_MD]}
      position={['fixed', 'relative']}
      backgroundColor="pureWhite"
      justifyContent="space-evenly"
      mt={[NAVBAR_HEIGHT_XS, 'two']}
      border={['none', 'regularBlack']}
      top={[-`${NAVBAR_HEIGHT_XS}`, 'zero']}
      right={0}
      style={isXS ? xsTransformProps : smTransformProps}
      zIndex="dropdown"
    >
      {isXS ? (
        <Box
          position="fixed"
          onClick={(e: any) => onCloseDropdown(e)}
          top="four"
          right="four"
          style={{ cursor: cursorStyle }}
        >
          <Cross />
        </Box>
      ) : null}
      <NavDropdownItem
        cursorStyle={cursorStyle}
        onClick={() => router.push('/dashboard')}
      >
        Dashboard
      </NavDropdownItem>
      <NavDropdownItem
        cursorStyle={cursorStyle}
        onClick={() => router.push('/browse')}
      >
        Browse all plants
      </NavDropdownItem>
      <NavDropdownItem
        cursorStyle={cursorStyle}
        onClick={() => router.push('/find-your-plants')}
      >
        Add plants
      </NavDropdownItem>
      <NavDropdownItem
        cursorStyle={cursorStyle}
        onClick={async () => {
          await auth.signOut();
          router.push('/');
        }}
      >
        Log out
      </NavDropdownItem>
    </AnimatedBox>
  );
};

const Navbar: React.FC<NavbarProps> = ({ right }: NavbarProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { isXS } = useMediaQuery();
  const handleCloseDropdown = useCallback((event: any) => {
    const icon = document?.getElementById('userIcon');
    if (event.target === icon || icon?.contains(event.target)) return;
    setShowDropdown(false);
  }, []);

  useEffect(() => {
    if (!isXS) {
      document.addEventListener('mouseup', handleCloseDropdown);
    }
    return () => {
      document.removeEventListener('mouseup', handleCloseDropdown);
    };
  }, [isXS, handleCloseDropdown]);
  return (
    <Box
      position={['fixed', 'absolute']}
      top={[NAVBAR_HEIGHT_XS - ICON_HEIGHT, NAVBAR_HEIGHT_MD - ICON_HEIGHT]}
      right={right}
      pr={isXS ? 'onePointSix' : 'zero'}
      justifyContent="flex-end"
      zIndex="navbar"
    >
      <Box flexDirection="column">
        <UserButton
          id="userIcon"
          onClick={() => setShowDropdown((prev) => !prev)}
          zIndex={1}
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
    </Box>
  );
};

export { Navbar };
