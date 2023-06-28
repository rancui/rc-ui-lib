import { useCallback, useRef, useState } from 'react';
import type { Dispatch, SetStateAction, MutableRefObject } from 'react';
import { isFunction } from '../utils';

type StateType<T> = T | (() => T);

export default function useRefState<T>(
  initialState: StateType<T>,
): [T, Dispatch<SetStateAction<T>>, MutableRefObject<T>] {
  const [state, setState] = useState<T>(initialState);
  const ref = useRef(state);
  const setRefState = useCallback(
    (patch) => {
      setState((prevState) => {
        // 仅判断 patch 是否是函数
        return isFunction(patch) ? patch(prevState) : patch;
      });
    },
    [state],
  );
  return [state, setRefState, ref];
}
