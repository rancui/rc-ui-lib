import type { CSSProperties } from 'react';

export interface BaseTypeProps {
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

/** 指定挂载的节点 */
export type TeleportType = HTMLElement | (() => HTMLElement) | null;
/** 带有displayName的组件 */
export type WithDisplayNameReactElement = React.ReactElement & { type: { displayName: string } };
