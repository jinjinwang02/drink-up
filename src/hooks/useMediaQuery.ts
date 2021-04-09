import { useEffect, useState } from 'react';
import { theme } from '../styles/theme';

const useMediaQuery: () => {
  isXS: boolean;
  isSM: boolean;
  isMD: boolean;
} = () => {
  const [isXS, setXS] = useState<boolean>(false);
  const [isSM, setSM] = useState<boolean>(false);
  const [isMD, setMD] = useState<boolean>(true);
  useEffect(() => {
    if (window.matchMedia(theme.device.mobile).matches) {
      setXS(true);
      setSM(false);
      setMD(false);
    } else if (window.matchMedia(theme.device.tablet).matches) {
      setXS(false);
      setSM(true);
      setMD(false);
    } else if (
      window.matchMedia(theme.device.desktop).matches ||
      window.matchMedia(theme.device.desktopL).matches
    ) {
      setXS(false);
      setSM(false);
      setMD(true);
    }
  }, []);
  return { isXS, isSM, isMD };
};

export { useMediaQuery };
