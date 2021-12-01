import { useEffect } from 'react';

const usePassiveHandler = () => {
  return useEffect(() => {
    const cancelTouchmove = (event) => event.preventDefault();
    document.body.addEventListener('touchmove', cancelTouchmove, { passive: false });
    return () => {
      document.body.removeEventListener('touchmove', cancelTouchmove);
    };
  }, []);
};

export default usePassiveHandler;
