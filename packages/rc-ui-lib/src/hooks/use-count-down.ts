import { useMemo, useEffect, useState, useRef } from 'react';
import { inBrowser } from '../utils';
import { cancelRaf, raf } from '../utils/raf';

export type CurrentTime = {
  days: number;
  hours: number;
  total: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

export type UseCountDownOptions = {
  time: number;
  millisecond?: boolean;
  onChange?: (current: CurrentTime) => void;
  onFinish?: () => void;
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function parseTime(time: number): CurrentTime {
  const days = Math.floor(time / DAY);
  const hours = Math.floor((time % DAY) / HOUR);
  const minutes = Math.floor((time % HOUR) / MINUTE);
  const seconds = Math.floor((time % MINUTE) / SECOND);
  const milliseconds = Math.floor(time % SECOND);

  return {
    total: time,
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}

function isSameSecond(time1: number, time2: number): boolean {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}

export function useCountDown(options: UseCountDownOptions): {
  start: () => void;
  pause: () => void;
  reset: (totalTime?: number) => void;
  current: CurrentTime;
} {
  const [remain, setRemain] = useState(options.time);
  const remainRef = useRef(remain);
  const rafId = useRef<number>();
  const endTime = useRef<number>();
  const counting = useRef<boolean>();
  const current = useMemo(() => parseTime(remain), [remain]);

  const pause = () => {
    counting.current = false;
    cancelRaf(rafId.current);
  };

  const getCurrentRemain = () => Math.max(endTime.current - Date.now(), 0);

  const handleRemain = (value: number) => {
    setRemain(value);
    remainRef.current = value;
    options.onChange?.(parseTime(value));

    if (value === 0) {
      pause();
      options.onFinish?.();
    }
  };

  const microTick = () => {
    rafId.current = raf(() => {
      // in case of call reset immediately after finish
      if (counting.current) {
        handleRemain(getCurrentRemain());
        if (remainRef.current > 0) {
          microTick();
        }
      }
    });
  };

  const macroTick = () => {
    rafId.current = raf(() => {
      // in case of call reset immediately after finish
      if (counting.current) {
        const remainRemain = getCurrentRemain();

        if (!isSameSecond(remainRemain, remainRef.current) || remainRemain === 0) {
          handleRemain(remainRemain);
        }

        if (remainRef.current > 0) {
          macroTick();
        }
      }
    });
  };

  const tick = () => {
    // should not start counting in server
    if (!inBrowser) {
      return;
    }

    if (options.millisecond) {
      microTick();
    } else {
      macroTick();
    }
  };

  const start = () => {
    if (!counting.current) {
      endTime.current = Date.now() + remainRef.current;
      counting.current = true;
      tick();
    }
  };

  const reset = (totalTime: number = options.time) => {
    pause();
    setRemain(totalTime);
    remainRef.current = totalTime;
  };

  useEffect(() => {
    return () => {
      pause();
    };
  }, []);

  return {
    start,
    pause,
    reset,
    current,
  };
}
