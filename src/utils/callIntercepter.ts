import { isPromise, noop } from './index';

export type Interceptor = (...args: any[]) => Promise<boolean> | boolean | void;

export const callIntercepter = (options: {
  interceptor?: Interceptor;
  args?: unknown[];
  done: () => void;
  canceled?: () => void;
}): any => {
  const { interceptor, args, done, canceled } = options;

  if (interceptor) {
    // eslint-disable-next-line prefer-spread
    const returnVal = interceptor.apply(null, args || []);

    if (isPromise(returnVal)) {
      returnVal
        .then((value) => {
          if (value) {
            done();
          } else if (canceled) {
            canceled();
          }
        })
        .catch(noop);
    } else if (returnVal) {
      done();
    } else if (canceled) {
      canceled();
    }
  } else {
    done();
  }
};
