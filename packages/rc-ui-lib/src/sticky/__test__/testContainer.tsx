import React, { useRef } from 'react';
import Sticky from '..';

const TestContainer: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div ref={container} style={{ height: '150px', backgroundColor: '#fff' }}>
      <Sticky container={container}>指定容器</Sticky>
    </div>
  );
};

export default TestContainer;
