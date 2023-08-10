import React from 'react';
import classnames from 'classnames';
import { BEM } from '../utils/create/bem';
import useHeight from './use-height';

export function usePlaceholder(contentRef: React.MutableRefObject<HTMLDivElement>, bem: BEM) {
  const height = useHeight(contentRef);

  return (renderContent: () => React.ReactElement) => (
    <div
      className={classnames(bem('placeholder'))}
      style={{ height: height ? `${height}px` : undefined }}
    >
      {renderContent()}
    </div>
  );
}
