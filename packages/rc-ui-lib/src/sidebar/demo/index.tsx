import React, { useState } from 'react';
import Sidebar from '..';
import { Grid, Toast } from '../..';
import './style.less';

export default (): React.ReactNode => {
  const [active1, setActive1] = useState(0);
  const [active2, setActive2] = useState(0);
  const [active3, setActive3] = useState(0);
  const [active4, setActive4] = useState(0);

  const onChange = (value: number) => {
    Toast(`点击了标签${value + 1}`);
    setActive4(value);
  };

  return (
    <Grid className="demo-sidebar" columnNum={2} border={false}>
      <Grid.Item>
        <h3 className="demo-sidebar-title">基础用法</h3>
        <Sidebar value={active1} onChange={setActive1}>
          <Sidebar.Item title="标签名" />
          <Sidebar.Item title="标签名" />
          <Sidebar.Item title="标签名" />
        </Sidebar>
      </Grid.Item>
      <Grid.Item>
        <h3 className="demo-sidebar-title">禁用选项</h3>
        <Sidebar value={active2} onChange={setActive2}>
          <Sidebar.Item title="标签名" />
          <Sidebar.Item title="标签名" disabled />
          <Sidebar.Item title="标签名" />
        </Sidebar>
      </Grid.Item>
      <Grid.Item>
        <h3 className="demo-sidebar-title">徽标提示</h3>
        <Sidebar value={active3} onChange={setActive3}>
          <Sidebar.Item dot title="标签名" />
          <Sidebar.Item badge="5" title="标签名" />
          <Sidebar.Item badge="20" title="标签名" />
        </Sidebar>
      </Grid.Item>
      <Grid.Item>
        <h3 className="demo-sidebar-title">监听切换事件</h3>
        <Sidebar value={active4} onChange={onChange}>
          <Sidebar.Item title="标签名" />
          <Sidebar.Item title="标签名" />
          <Sidebar.Item title="标签名" />
        </Sidebar>
      </Grid.Item>
    </Grid>
  );
};
