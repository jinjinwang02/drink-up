import { useEffect, useState } from 'react';
import { theme } from '../../styles/theme';

const useMediaQuery: () => boolean = () => {
  const [isXS, setXS] = useState<boolean>(false);
  useEffect(() => {
    if (window.matchMedia(theme.device.mobile).matches) {
      setXS(true);
    } else {
      setXS(false);
    }
  }, []);
  return isXS;
};

export { useMediaQuery };
