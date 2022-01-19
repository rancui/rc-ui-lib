import { useCallback, useEffect, useState } from 'react';

const useIntersectionObserver = (
  observerOptions: IntersectionObserverInit,
  handleIntersection: IntersectionObserverCallback,
): ((node: Element) => void) => {
  const [element, setElement] = useState<Element>(null);

  const handleElement = useCallback((node: Element) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    observer.observe(element);
    // eslint-disable-next-line consistent-return
    return () => observer && observer.disconnect && observer.disconnect();
  }, [handleIntersection, observerOptions, element]);
  return handleElement;
};

export default useIntersectionObserver;
