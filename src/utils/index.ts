import { FieldRule } from '../components/field/types';

const overflowScrollReg = /scroll|auto/i;
type ScrollElement = HTMLElement | Window;
export type ContanierType = HTMLElement | (() => HTMLElement) | Window;

export const noop = () => ({});

// 判断其参数是否是数字
export const isNumeric = (val: string): boolean => {
  return /^\d+(\.\d+)?$/.test(val);
};

// 判断其参数是否是非数字值
export const isNaN = (val: number): val is typeof NaN => {
  if (Number.isNaN) {
    return Number.isNaN(val);
  }
  return val !== val;
};

// 判断参数是否存在
export const isDef = <T>(val: T): val is NonNullable<T> => {
  return val !== undefined && val !== null;
};

// 添加单位
export const addUnit = (value?: string | number): string | undefined => {
  if (!isDef(value)) {
    return undefined;
  }
  value = String(value);
  return isNumeric(value) ? `${value}px` : value;
};
// 获取宽高
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getSizeStyle = (originSize?: string | number) => {
  if (isDef(originSize)) {
    const size = addUnit(originSize);
    return {
      width: size,
      height: size,
    };
  }
  return {};
};
// 阻止默认事件
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const preventDefault = (event: MouseEvent, isStopPropagation?: boolean) => {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }
  if (isStopPropagation) {
    event.stopPropagation();
  }
};
// 判断节点是否是元素
export const isElement = (node: Element): boolean => {
  const ELEMENT_NODE_TYPE = 1; // // 1：代表元素，详情可以搜索查看elementNode.nodeType值对应的类型。
  return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE;
};

export const getScrollParent = (el: Element, root: ScrollElement = window): Element | Window => {
  let node = el;
  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode as Element;
  }
  return root;
};
// 判断是否是浏览器环境
export const inBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

// 获取挂载的容器
export const getMountContanier = (contanier?: ContanierType): HTMLElement => {
  if (contanier) {
    if (typeof contanier === 'function') {
      return contanier();
    }
    if (typeof contanier === 'object' && contanier instanceof HTMLElement) {
      return contanier;
    }
  }
  return document.body;
};

// 将组件中传入的配置项(组件属性)对应的key/value赋给新对象。
export const pick = (prop: Record<string, any>, keys: string[]): Record<string, any> => {
  return keys.reduce((target, key) => {
    target[key] = prop[key];
    return target;
  }, {} as any);
};

export const isObject = (val: Record<string, any>): boolean => {
  return val !== null && typeof val === 'object';
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: any): val is Function => {
  return val !== null && typeof val === 'function';
};

// 判断是否是Promise函数
export const isPromise = <T = any>(val: any): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

export const isEmptyValue = (value: unknown): boolean => {
  if (Array.isArray(value)) {
    return !value.length;
  }
  if (value === 0) {
    return false;
  }
  return !value;
};

export function range(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const trimExtraChar = (value: string, char: string, regExp: RegExp) => {
  const index = value.indexOf(char);

  if (index === -1) {
    return value;
  }

  if (char === '-' && index !== 0) {
    return value.slice(0, index);
  }

  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
};

export const formatNumber = (value: string, allowDot = true, allowMinus = true): string => {
  if (allowDot) {
    value = trimExtraChar(value, '.', /\./g);
  } else {
    value = value.split('.')[0];
  }
  if (allowMinus) {
    value = trimExtraChar(value, '-', /-/g);
  } else {
    value = value.replace(/-/, '');
  }
  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;
  return value.replace(regExp, '');
};

export const trigger = (target: Element, type: string): void => {
  const inputEvent = document.createEvent('HTMLEvents');
  inputEvent.initEvent(type, true, true);
  target.dispatchEvent(inputEvent);
};

export const runSyncRule = (value: unknown, rule: FieldRule): boolean => {
  if (rule.required && isEmptyValue(value)) {
    return false;
  }
  if (rule.pattern && !rule.pattern.test(String(value))) {
    return false;
  }
  return true;
};
