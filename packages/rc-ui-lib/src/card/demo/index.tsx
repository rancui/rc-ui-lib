import React from 'react'
// import { Arrow, Like } from '@vant/icons'
import { Image, Button, Toast } from '../..'
import { Card } from '..'
import { components } from 'site-mobile-demo';
import coverDemoImg from './cover_demo_img.png';
import '../style/index.less'

export default (): React.ReactNode => {
  const { DemoSection, DemoBlock } = components;
  return (
    <DemoSection>
      <DemoBlock title='基础用法'>
        <Card style={{ margin: 10 }}>
          <Card.Header>卡片标题</Card.Header>
          <Card.Body>卡片内容区域</Card.Body>
        </Card>
      </DemoBlock>
      <DemoBlock title='圆角卡片'>
        <Card round style={{ margin: 10 }}>
          <Card.Header>卡片标题</Card.Header>
          <Card.Body>卡片内容区域</Card.Body>
        </Card>
      </DemoBlock>
      <DemoBlock title='底部内容'>
        <Card round style={{ margin: 10 }}>
          <Card.Header>卡片标题</Card.Header>
      <Card.Body>
        rc-ui-lib 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用。
      </Card.Body>
      <Card.Footer>
        <Button type="primary" round block size="small">
          查看更多
        </Button>
      </Card.Footer>
        </Card>
      </DemoBlock>
      <DemoBlock title='封面展示'>
        <Card round style={{ margin: 10 }}>
        <Card.Cover onClick={() => Toast.info('点击了Cover区域')}>
          <Image src={coverDemoImg} />
        </Card.Cover>
        <Card.Header onClick={() => Toast.info('点击了Header区域')}>
          封面展示
        </Card.Header>
        <Card.Body onClick={() => Toast.info('点击了Body区域')}>
          卡片内容区域
        </Card.Body>
         <Card.Footer>
            <Button round size='small'>
              更多
            </Button>
             <Button
              //icon={<Like />}
               round
              color='linear-gradient(to right, #ff6034, #ee0a24)'
               size='small'
             >
              Like
            </Button>
        </Card.Footer>
      </Card>
      </DemoBlock>
      <DemoBlock title='展示边框'>
        <Card round style={{margin: 10}}>
          <Card.Header border>卡片标题</Card.Header>
          <Card.Body
            style={{
              height: '20vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            卡片内容区域
          </Card.Body>
          <Card.Footer border>
            <Button type="primary" round block size="mini">
              查看更多
            </Button>
          </Card.Footer>
        </Card>
      </DemoBlock>
      <DemoBlock title='自定义卡片样式'>
        <Card round style={{ margin: 10, backgroundColor: '#ccc', color: 'white' }}>
          <Card.Header>自定义卡片标题</Card.Header>
          <Card.Body
            style={{
              height: '20vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            自定义卡片内容区域
          </Card.Body>
          <Card.Footer>
            <div style={{ textAlign: 'center' }}>我是自定义的底部</div>
          </Card.Footer>
        </Card>
      </DemoBlock>
    </DemoSection>
  )
}