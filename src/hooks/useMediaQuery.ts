import { useEffect, useState } from 'react';
import { theme } from '../styles/theme';

const useMediaQuery: () => { isXS: boolean; isSM: boolean } = () => {
  const [isXS, setXS] = useState<boolean>(false);
  const [isSM, setSM] = useState<boolean>(false);
  useEffect(() => {
    if (window.matchMedia(theme.device.mobile).matches) {
      setXS(true);
      setSM(false);
    } else if (window.matchMedia(theme.device.tablet).matches) {
      setSM(true);
      setXS(false);
    }
  }, []);
  return { isXS, isSM };
};

export { useMediaQuery };
