import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import { sleep } from '../../../tests/utils';
import { toArray } from '../../uploader/utils';
import Icon from '../../icon';
import Button from '../../button';
import Field from '../../field';
import Form from '..';

export type InternalNamePath = (string | number)[];
export type NamePath = string | number | InternalNamePath;
const changeValue = async (wrapper, value) => {
  wrapper.find('input').simulate('change', { target: { value } });
  await act(async () => {
    await sleep();
  });
  wrapper.update();
};

export function getNamePath(path: NamePath | null): InternalNamePath {
  return toArray(path);
}

export function matchNamePath(
  namePath: InternalNamePath,
  changedNamePath: InternalNamePath | null,
) {
  if (!namePath || !changedNamePath || namePath.length !== changedNamePath.length) {
    return false;
  }
  return namePath.every((nameUnit, i) => changedNamePath[i] === nameUnit);
}
export function getField(wrapper, index: string | number = 0) {
  if (typeof index === 'number') {
    return wrapper.find(Field).at(index);
  }

  const name = getNamePath(index);
  const fields = wrapper.find(Field);
  for (let i = 0; i < fields.length; i += 1) {
    const field = fields.at(i);
    const fieldName = getNamePath(field.props().name);

    if (matchNamePath(name, fieldName)) {
      return field;
    }
  }
  return null;
}

describe('Form', () => {
  let wrapper;
  afterEach(() => {
    wrapper.unmount();
    jest.restoreAllMocks();
  });

  it('basic usage', async () => {
    const onClick = jest.fn();
    wrapper = mount(
      <Form
        layout="horizontal"
        colon
        inset
        footer={
          <div style={{ margin: '16px 16px 0' }}>
            <Button round nativeType="submit" type="primary" block>
              提交
            </Button>
          </div>
        }
      >
        <Form.Item
          disabled
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
        </Form.Item>
        <Form.Item
          rules={[{ required: false, message: '请填写密码' }]}
          label="密码"
          className="my-password"
          colon
          labelWidth="100"
          labelAlign="center"
          labelClass="my-label-class"
          onClick={onClick}
        >
          <Field placeholder="请输入密码" />
        </Form.Item>
      </Form>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('when noStyle props is set', async () => {
    wrapper = mount(
      <Form>
        <Form.Item noStyle>
          <Field placeholder="请输入密码" />
        </Form.Item>
      </Form>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('when shouldUpdate props is set', async () => {
    wrapper = mount(
      <Form>
        <Form.Item shouldUpdate>{() => <Field placeholder="请输入密码" />}</Form.Item>
      </Form>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it("shouldn't work when shouldUpdate is set", async () => {
    const spy = jest.fn();
    wrapper = mount(
      <Form>
        <Form.Item dependencies={['field_2']} shouldUpdate={() => true}>
          {() => {
            spy();
            return 'gogogo';
          }}
        </Form.Item>
        <Form.Item name="field_1">
          <Field />
        </Form.Item>
        <Form.Item name="field_2">
          <Field />
        </Form.Item>
      </Form>,
    );
    expect(spy).toHaveBeenCalledTimes(1);
    await changeValue(getField(wrapper, 1), 'value1');
    // sync start
    //   valueUpdate -> rerender by shouldUpdate
    //   depsUpdate  -> rerender by deps
    //   [ react rerender once -> 2 ]
    // sync end
    expect(spy).toHaveBeenCalledTimes(2);

    await changeValue(getField(wrapper, 2), 'value2');
    // sync start
    //   valueUpdate -> rerender by shouldUpdate
    //   depsUpdate  -> rerender by deps
    //   [ react rerender once -> 3 ]
    // sync end
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('when rules without reqiured props is set', async () => {
    wrapper = mount(
      <Form>
        <Form.Item rules={[{ pattern: /\d{6}/, message: '请输入6位数字' }]}>
          <Field placeholder="请输入密码" />
        </Form.Item>
      </Form>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('when rules with reqiured props is set', async () => {
    wrapper = mount(
      <Form>
        <Form.Item rules={[{ pattern: /\d{6}/, message: '请输入6位数字', required: true }]}>
          <Field placeholder="请输入密码" />
        </Form.Item>
      </Form>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('when name props is set without shouldUpdate or dependencies', async () => {
    wrapper = mount(
      <Form>
        <Form.Item name="name">{() => <Field placeholder="请输入密码" />}</Form.Item>
      </Form>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('when shouldUpdate and dependencies are not set', async () => {
    wrapper = mount(
      <Form>
        <Form.Item>{() => <Field placeholder="请输入密码" />}</Form.Item>
      </Form>,
    );
    expect(toJson(wrapper.html())).toMatchSnapshot();
  });

  it('dependencies is set and name is not set ', async () => {
    let x = 0;
    wrapper = mount(
      <Form>
        <Form.Item dependencies={['field_1']}>
          {() => {
            x += 1;
            return `gogogo${x}`;
          }}
        </Form.Item>
        <Form.Item name="field_1">
          <input />
        </Form.Item>
      </Form>,
    );
  });

  it('when children is not validElement', async () => {
    const handleBlur = jest.fn();
    wrapper = mount(
      <Form>
        <Form.Item name="test" trigger="blur">
          <Field placeholder="请输入密码" onBlur={handleBlur} />
        </Form.Item>
      </Form>,
    );
    wrapper.find('input').simulate('focus');
    await sleep(20);
    await wrapper.find('input').simulate('blur');
    expect(handleBlur).toHaveBeenCalled();

    // expect(toJson(wrapper.html())).toMatchSnapshot();
  });
});
