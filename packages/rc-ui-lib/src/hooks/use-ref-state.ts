// import { useCallback, useRef, useState } from 'react';
// import type { Dispatch, SetStateAction, MutableRefObject } from 'react';
// import { isFunction } from '../utils';

// type StateType<T> = T | (() => T);

// export default useRefState;

import React, { useCallback, useRef, useState } from 'react';
import { isFunction } from '../utils';

type StateType<T> = T | (() => T);

const useRefState = <T>(
  initialState: StateType<T>,
): [T, React.Dispatch<React.SetStateAction<T>>, React.MutableRefObject<T>] => {
  const [state, setState] = useState<T>(initialState);
  const ref = useRef(state);
  const setRefState = useCallback(
    (patch) => {
      setState((prevState) => {
        // eslint-disable-next-line no-return-assign
        return (ref.current = isFunction(patch) ? patch(prevState) : patch);
      });
    },
    [state],
  );
  return [state, setRefState, ref];
};

export default useRefState;
