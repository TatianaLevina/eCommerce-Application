import { useState, useEffect } from 'react';

const useMobile = () => {
  const query = '(max-width: 700px)';

  const [isMobile, setMobile] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== isMobile) {
      setMobile(media.matches);
    }
    const listener = () => setMobile(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [isMobile]);

  return isMobile;
};

export default useMobile;
