import { useState, useEffect } from 'react';

export const useHoverDevice = () => {
  const [isHoverDevice, setIsHoverDevice] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');

    setIsHoverDevice(mediaQuery.matches);

    const listener = e => setIsHoverDevice(e.matches);
    mediaQuery.addEventListener('change', listener);

    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  return isHoverDevice;
};
