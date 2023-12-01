import React from 'react';
import { fireEvent, render, act, cleanup } from '@testing-library/react';
import { sleep } from '../../../tests/utils';
import { toArray } from '../../uploader/utils';
import Button from '../../button';
import Field from '../../field';
import Form from '..';

export type InternalNamePath = (string | number)[];
export type NamePath = string | number | InternalNamePath;
const changeValue = async (container, value) => {
  const input = container.querySelector('input');
  await fireEvent.change(input, { target: { value } });
  await act(async () => {
    await sleep();
  });
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
export function getField(container, index: string | number = 0) {
  if (typeof index === 'number') {
    return container.querySelectorAll('.rc-field')[index];
  }

  const name = getNamePath(index);
  const fields = container.querySelector(Field);
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
  let spyConsole: jest.SpyInstance;
  beforeEach(() => {
    spyConsole = jest.spyOn(console, 'warn');
    spyConsole.mockImplementation(() => {
      return null;
    });
  });

  afterEach(() => {
    cleanup();
    spyConsole.mockRestore();
    jest.restoreAllMocks();
  });

  it('basic usage', async () => {
    const onClick = jest.fn();
    const { container } = render(
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
    expect(container).toMatchSnapshot();
  });

  it('when noStyle props is set', async () => {
    const { container } = render(
      <Form>
        <Form.Item noStyle>
          <Field placeholder="请输入密码" />
        </Form.Item>
      </Form>,
    );
    expect(container).toMatchSnapshot();
  });

  it('when shouldUpdate props is set', async () => {
    const { container } = render(
      <Form>
        <Form.Item shouldUpdate>{() => <Field placeholder="请输入密码" />}</Form.Item>
      </Form>,
    );
    expect(container).toMatchSnapshot();
  });

  it("shouldn't work when shouldUpdate is set", async () => {
    const spy = jest.fn();
    const { container } = render(
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
    await changeValue(getField(container, 1), 'value1');
    // sync start
    //   valueUpdate -> rerender by shouldUpdate
    //   depsUpdate  -> rerender by deps
    //   [ react rerender once -> 2 ]
    // sync end
    expect(spy).toHaveBeenCalledTimes(2);

    await changeValue(getField(container, 2), 'value2');
    // sync start
    //   valueUpdate -> rerender by shouldUpdate
    //   depsUpdate  -> rerender by deps
    //   [ react rerender once -> 3 ]
    // sync end
    expect(spy).toHaveBeenCalledTimes(3);

    expect(spyConsole).toHaveBeenLastCalledWith(
      "[FormItem] `shouldUpdate` and `dependencies` shouldn't be used together.",
    );
  });

  it('when rules without reqiured props is set', async () => {
    const { container } = render(
      <Form>
        <Form.Item rules={[{ pattern: /\d{6}/, message: '请输入6位数字' }]}>
          <Field placeholder="请输入密码" />
        </Form.Item>
      </Form>,
    );
    expect(container).toMatchSnapshot();
  });

  it('when rules with reqiured props is set', async () => {
    const { container } = render(
      <Form>
        <Form.Item rules={[{ pattern: /\d{6}/, message: '请输入6位数字', required: true }]}>
          <Field placeholder="请输入密码" />
        </Form.Item>
      </Form>,
    );
    expect(container).toMatchSnapshot();
  });

  it('when name props is set without shouldUpdate or dependencies', async () => {
    const { container } = render(
      <Form>
        <Form.Item name="name">{() => <Field placeholder="请输入密码" />}</Form.Item>
      </Form>,
    );
    expect(container).toMatchSnapshot();
    expect(spyConsole).toHaveBeenCalledTimes(2);
  });

  it('when shouldUpdate and dependencies are not set', async () => {
    const { container } = render(
      <Form>
        <Form.Item>{() => <Field placeholder="请输入密码" />}</Form.Item>
      </Form>,
    );
    expect(container).toMatchSnapshot();
    expect(spyConsole).toHaveBeenLastCalledWith(
      '[FormItem] `children` of render props only work with `shouldUpdate` or `dependencies`.',
    );
  });

  it('dependencies is set and name is not set ', async () => {
    let x = 0;
    render(
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
    const { container } = render(
      <Form>
        <Form.Item name="test" trigger="blur">
          <Field placeholder="请输入密码" onBlur={handleBlur} />
        </Form.Item>
      </Form>,
    );
    const input = container.querySelector('input');
    await fireEvent.focus(input);
    await sleep(20);
    await fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });
});
