/* eslint-disable no-param-reassign */
import { BEM, createBEM } from './bem';

type CreateNamespaceReturn = [BEM, string];

export function createNamespace(name: string): CreateNamespaceReturn {
  name = `rc-${name}`;
  return [createBEM(name), name];
}
