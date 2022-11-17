import React from 'react';
import { CurrentTime } from '../hooks/use-count-down';
import { BaseTypeProps } from '../utils';

export interface CountDownProps extends BaseTypeProps {
  /** 	倒计时时长，单位毫秒 */
  time?: number | string;
  /** 时间格式	 */
  format?: string;
  /**  是否自动开始倒计时 */
  autoStart?: boolean;
  /**  是否开启毫秒级渲染 */
  millisecond?: boolean;
  /**  倒计时结束时触发 */
  onFinish?: () => void;
  /**  是否开启毫秒级渲染 */
  onChange?: (value: CurrentTime) => void;
  renderChildren?: (value: CurrentTime) => React.ReactNode;
}

export type CountDownCurrentTime = CurrentTime;

export type CountDownInstance = {
  start: () => void;
  pause: () => void;
  reset: () => void;
};
