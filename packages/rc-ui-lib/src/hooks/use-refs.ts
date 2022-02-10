/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useRef } from 'react';

export default function useRefs<T>() {
  const refs = useRef<T[]>([]);

  const setRefs = (index: number) => (el: T) => {
    refs.current[index] = el;
  };

  return [refs.current, setRefs as any];
}
