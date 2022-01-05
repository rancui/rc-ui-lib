import React, { forwardRef } from 'react';
import './index.less';

const DemoBlock = (props, ref) => {
  const { title, card } = props;
  return (
    <div className="vant-doc-demo-block" ref={ref}>
      {title && <h2 className="vant-doc-demo-block__title">{title}</h2>}
      {card ? (
        <div className="vant-doc-demo-block__card">{props.children}</div>
      ) : (
        <>{props.children}</>
      )}
    </div>
  );
};

export default forwardRef(DemoBlock);
