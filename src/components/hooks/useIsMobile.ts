import { useEffect, useState } from 'react';

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= breakpoint);

  const handleCheckSize = () => {
    if (window.innerWidth <= breakpoint) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleCheckSize);

    return () => {
      window.removeEventListener('resize', handleCheckSize);
    };
  }, [handleCheckSize]);

  return isMobile;
};

export default useIsMobile;
