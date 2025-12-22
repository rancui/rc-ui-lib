import { act } from 'react';

const globalTimeout = global.setTimeout;

export const sleep = async (timeout = 0): Promise<void> => {
  await act(async () => {
    await new Promise((resolve) => globalTimeout(resolve, timeout));
  });
};

export function mockGetBoundingClientRect(rect: Partial<DOMRect>): () => void {
  const spy = jest.spyOn(Element.prototype, 'getBoundingClientRect');
  spy.mockReturnValue(rect as DOMRect);
  return () => spy.mockRestore();
}
