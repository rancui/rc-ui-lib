# Form 表单

### 介绍

用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型，需要与 [rc-field-form](https://github.com/react-component/field-form) 搭配使用。

### 引入

`rc-field-form` 是 Form 组件的前置依赖

```bash
# 添加 rc-field-form包
npm install rc-field-form
```

```js
import { Form } from 'rc-ui-lib';
```

## 代码演示

### 基础用法

在表单中，每个 Form.Item 组件代表一个表单项，使用 Form.Item 的 `rules` 属性定义校验规则。

> Form.Item 是基于 Field 和 [RcField](https://github.com/react-component/field-form#field) 的封装

```jsx
import React from 'react';
import { Form, Field } from 'rc-ui-lib';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('form submit', values);
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item name="username" label="用户名">
        <Field />
      </Form.Item>
    </Form>
  );
};
```

### 校验规则

通过 `rules` 定义表单校验规则，`validateTrigger`修改校验触发时机，点击此处查看文档[rule](https://github.com/react-component/field-form#rule)。

```jsx
import React from 'react';
import { Form, Button, Field } from 'rc-ui-lib';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('form submit', values);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      validateTrigger="onSubmit"
      footer={
        <div style={{ margin: '16px 16px 0' }}>
          <Button round nativeType="submit" type="primary" block>
            提交
          </Button>
        </div>
      }
    >
      <Form.Item
        name="text1"
        label="正则校验"
        rules={[{ pattern: /\d{6}/, message: '请输入6位数字' }]}
      >
        <Field placeholder="正则校验" />
      </Form.Item>
      <Form.Item
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
      </Form.Item>
      <Form.Item
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
      </Form.Item>
    </Form>
  );
};
```

### 表单项类型 - 开关

在表单中使用 [Switch 组件](#/zh-CN/switch)。

```jsx
import React from 'react';
import { Form, Switch } from 'rc-ui-lib';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('form submit', values);
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item name="switch" label="开关" valuePropName="checked">
        <Switch />
      </Form.Item>
    </Form>
  );
};
```

### 表单项类型 - 复选框

在表单中使用 [Checkbox 组件](#/zh-CN/checkbox)。

```jsx
import React from 'react';
import { Form, Checkbox } from 'rc-ui-lib';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('form submit', values);
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item name="checkbox" label="复选框" valuePropName="checked">
        <Checkbox shape="square" />
      </Form.Item>
      <Form.Item name="checkbox_group" label="复选框组">
        <Checkbox.Group direction="horizontal">
          <Checkbox shape="square" name="c1">
            复选框1
          </Checkbox>
          <Checkbox shape="square" name="c2">
            复选框2
          </Checkbox>
        </Checkbox.Group>
      </Form.Item>
    </Form>
  );
};
```

### 表单项类型 - 单选框

在表单中使用 [Radio 组件](#/zh-CN/radio)。

```jsx
import React from 'react';
import { Form, Radio } from 'rc-ui-lib';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('form submit', values);
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item name="radio" label="单选框">
        <Radio.Group direction="horizontal">
          <Radio name="r1">单选框1</Radio>
          <Radio name="r2">单选框2</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};
```

### 表单项类型 - 评分

在表单中使用 [Rate 组件](#/zh-CN/rate)。

```jsx
import React from 'react';
import { Form, Rate } from 'rc-ui-lib';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('form submit', values);
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item name="rate" label="评分" initialValue={3}>
        <Rate />
      </Form.Item>
    </Form>
  );
};
```

### 表单项类型 - 文件上传

在表单中使用 [Uploader 组件](#/zh-CN/uploader)。

```jsx
import React from 'react';
import { Form, Uploader } from 'rc-ui-lib';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('form submit', values);
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item
        name="uploader"
        label="文件上传"
        initialValue={[
          {
            url: 'https://img.yzcdn.cn/vant/sand.jpg',
            status: 'done',
            name: '图片名称',
          },
        ]}
      >
        <Uploader />
      </Form.Item>
    </Form>
  );
};
```

### 表单项类型 - TeaxtArea

```js
<Form.Item name="textarea" label="详细地址">
  <Field rows={3} autosize type="textarea" maxlength={140} showWordLimit />
</Form.Item>
```

## API

### Form Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| layout | 表单布局 | _horizontal \| vertical_ | `horizontal` |
| colon | 配置 Form.Item 的 colon 的默认值。表示是否显示 label 后面的冒号 | _boolean_ | `false` |
| showValidateMessage | 是否显示验证错误信息 | _boolean_ | `true` |
| inset | 是否展示为圆角卡片风格 | _boolean_ | `false` |
| border | 是否显示外边框 | _boolean_ | `false` |
| footer | 表单底部内容 | _ReactNode_ | - |
| validateTrigger | 表单校验触发时机，可选值为 `onChange`、`onSubmit`，具体用法见下方表格 | _strting_ | `onChange` |

> 更多 Form API 参见：[rc-field-form](https://github.com/react-component/field-form#form)

### Form.Item Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colon | 配合 label 属性使用，表示是否显示 label 后面的冒号 | _boolean_ | `false` |
| showValidateMessage | 是否显示验证信息 | _boolean_ | `true` |
| intro | 额外的提示信息 | _ReactNode_ | - |
| required | 必填样式设置。如不设置，则会根据校验规则自动生成 | _boolean_ | `false` |
| tooltip | 字段提示信息 | _ReactNode \|_ [DialogProps & { icon: ReactNode }](/#/zh-CN/dialog#props) |
| customField | 自定义 item，此时不会渲染内置的 field，通常用于自定义表单项 | _boolean_ | `false` |
| disabled | 是否禁用表单项 | _boolean_ | `false` |
| labelClass | 左侧文本额外类名 | _any_ | - |
| labelWidth | 左侧文本宽度，默认单位为`px` | _number \| string_ | `6.2em` |
| labelAlign | 左侧文本对齐方式，可选值为 `center` `right` | _string_ | `left` |
| validateTrigger | 表单校验触发时机，优先级高于`Form`设置的值，可选值为 `onChange`、`onSubmit`，具体用法见下方表格 | _strting_ | `onChange` |

> 更多 Form.ItemAPI 参见：[rc-field-form](https://github.com/react-component/field-form#field)

### Form.List Props

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| children | 渲染函数 | _(fields: Field[], operation: { add, remove, move }, meta: { errors }) => React.ReactNode_ |
| initialValue | 设置子元素默认值，如果与 Form 的 initialValues 冲突则以 Form 为准 | _any[]_ |
| name | 字段名，支持数组 | _string \| number \| (string \| number)[]_ |

#### operation

| 参数   | 说明       | 类型                                                 |
| ------ | ---------- | ---------------------------------------------------- |
| add    | 新增表单项 | _(defaultValue?: any, insertIndex?: number) => void_ |
| move   | 移动表单项 | _(from: number, to: number) => void_                 |
| remove | 删除表单项 | _(index: number \| number[]) => void_                |

### Rule 数据结构

使用 Field 的`rules`属性可以定义校验规则，可选属性如下:

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| type | 类型，常见有 `string` `number` `boolean` `url` `email`。更多请参考[此处](https://github.com/yiminghe/async-validator#type) | _string_ |
| enum | 是否匹配枚举中的值（需要将 `type` 设置为 `enum`） | _any[]_ |
| len | string 类型时为字符串长度；number 类型时为确定数字； array 类型时为数组长度 | _number_ |
| max | 必须设置 type：string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度 | _number_ |
| min | 必须设置 type：string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度 | _number_ |
| transform | 将字段值转换成目标值后进行校验 | _(value) => any_ |
| whitespace | 如果字段仅包含空格则校验不通过，只在 type: 'string' 时生效 | _boolean_ |
| required | 是否为必选字段 | _boolean_ |
| message | 错误提示文案 | _string_ |
| validator | 自定义校验，接收 Promise 作为返回值 | _(rule, value, callback: (error?: string) => void, form) => Promise \| void_ |
| pattern | 正则表达式匹配 | _RegExp_ |
| validateTrigger | 设置触发验证时机，必须是 Form.Item 的 validateTrigger 的子集 | _string_ |

### validateTrigger 可选值

通过 `validateTrigger` 属性可以自定义表单校验的触发时机。

| 值       | 描述                                 |
| -------- | ------------------------------------ |
| onSubmit | 仅在提交表单时触发校验               |
| onBlur   | 在提交表单和输入框失焦时触发校验     |
| onChange | 在提交表单和输入框内容变化时触发校验 |
