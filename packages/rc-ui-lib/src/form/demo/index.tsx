/* eslint-disable no-console */
import React from 'react';
import {
  Field,
  Rate,
  Checkbox,
  CheckboxGroup,
  Radio,
  Switch,
  Toast,
  Button,
  Uploader,
  Icon,
} from 'rc-ui-lib';
import { components } from 'site-mobile-demo';
import Form, { FormItem } from '..';
import './style.less';

export default (): React.ReactNode => {
  const { DemoBlock, DemoSection } = components;
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <DemoSection>
      <DemoBlock title="基础用法">
        <Form
          showValidateMessage={false}
          onFinish={onFinish}
          footer={
            <div style={{ margin: '16px 16px 0' }}>
              <Button round nativeType="submit" type="primary" block>
                提交
              </Button>
            </div>
          }
        >
          <FormItem
            tooltip={{
              message:
                'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.',
            }}
            intro="确保这是唯一的用户名"
            rules={[{ required: true, message: '请填写用户名' }]}
            name="username"
            label="用户名"
          >
            <Field placeholder="请输入用户名" />
          </FormItem>
          <FormItem
            rules={[{ required: true, message: '请填写密码' }]}
            name="password"
            label="密码"
          >
            <Field placeholder="请输入密码" />
          </FormItem>
        </Form>
      </DemoBlock>

      <DemoBlock title="校验规则">
        <Form
          onFinish={onFinish}
          footer={
            <div style={{ margin: '16px 16px 0' }}>
              <Button round nativeType="submit" type="primary" block>
                提交
              </Button>
            </div>
          }
        >
          <FormItem
            name="text1"
            label="正则校验"
            rules={[{ pattern: /\d{6}/, message: '请输入6位数字' }]}
          >
            <Field placeholder="正则校验" />
          </FormItem>
          <FormItem
            name="text2"
            label="函数校验"
            rules={[
              {
                validator: (_, value) => {
                  if (/1\d{10}/.test(value)) {
                    return Promise.resolve(true);
                  }
                  return Promise.reject(new Error('请输入正确的手机号码'));
                },
              },
            ]}
          >
            <Field placeholder="函数校验" />
          </FormItem>
          <FormItem
            label="异步函数校验"
            name="text3"
            rules={[
              {
                validator: (_, value) => {
                  return new Promise((resolve, reject) => {
                    Toast.loading('验证中...');

                    setTimeout(() => {
                      if (/\d{6}/.test(value)) {
                        resolve(true);
                      } else {
                        reject(new Error('请输入正确内容'));
                      }
                      Toast.clear();
                    }, 1000);
                  });
                },
              },
            ]}
          >
            <Field placeholder="异步函数校验" />
          </FormItem>
        </Form>
      </DemoBlock>

      <DemoBlock title="表单类型">
        <Form
          inset
          form={form}
          onFinish={onFinish}
          footer={
            <div style={{ margin: '16px 16px 0' }}>
              <Button round nativeType="submit" type="primary" block>
                提交
              </Button>
            </div>
          }
        >
          <FormItem name="switch" label="开关" valuePropName="checked">
            <Switch size={20} />
          </FormItem>
          <FormItem name="checkbox" label="复选框" valuePropName="checked">
            <Checkbox shape="square" />
          </FormItem>
          <FormItem name="checkbox_group" label="复选框组">
            <CheckboxGroup direction="horizontal">
              <Checkbox shape="square" name="c1">
                复选框1
              </Checkbox>
              <Checkbox shape="square" name="c2">
                复选框2
              </Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem name="radio" label="单选框" initialValue="r1">
            <Radio.Group direction="horizontal">
              <Radio name="r1">单选框1</Radio>
              <Radio name="r2">单选框2</Radio>
            </Radio.Group>
          </FormItem>
          <FormItem name="rate" label="评分" initialValue={3}>
            <Rate />
          </FormItem>
          <FormItem
            name="uploader"
            label="上传文件"
            rules={[{ required: true, message: '请选择文件' }]}
            initialValue={[
              {
                url: 'https://img.yzcdn.cn/vant/sand.jpg',
                status: 'done',
                name: '图片名称',
              },
            ]}
          >
            <Uploader />
          </FormItem>
          <FormItem name="textarea" label="详细地址">
            <Field rows={3} autosize type="textarea" maxlength={140} showWordLimit />
          </FormItem>
        </Form>
      </DemoBlock>
      {/* <DemoBlock title="动态增减表单项">
        <Form
          onFinish={onFinish}
          footer={
            <div style={{ margin: '16px 16px 0' }}>
              <Button round nativeType="submit" type="primary" block>
                提交
              </Button>
            </div>
          }
        >
          <Form.List name="users" initialValue={[{ name: 'rc-ui-lib', age: '1' }]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, idx) => (
                  <div className="form-list-item" key={field.key}>
                    <h6>用户{idx + 1}:</h6>
                    <div className="form-list-item__control">
                      <FormItem
                        label="姓名"
                        name={[field.name, 'name']}
                        rules={[
                          { type: 'string', min: 2, max: 6, message: '姓名最少两个字，最多6个字' },
                        ]}
                      >
                        <Field placeholder="请输入用户姓名" />
                      </FormItem>
                      <FormItem
                        label="年龄"
                        name={[field.name, 'age']}
                        rules={[
                          { type: 'number', message: '请输入数字', transform: (v) => Number(v) },
                        ]}
                      >
                        <Field
                          placeholder="请输入用户年龄"
                          rightIcon={<Icon name="delete" onClick={() => remove(idx)} />}
                        />
                      </FormItem>
                    </div>
                  </div>
                ))}
                <div style={{ padding: 10 }}>
                  <Button round block plain icon="add-o" size="small" onClick={() => add()}>
                    新增用户
                  </Button>
                </div>
              </>
            )}
          </Form.List>
        </Form>
      </DemoBlock> */}
    </DemoSection>
  );
};
