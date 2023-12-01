import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Icon from '../../icon';
import ConfigProvider from '..';

describe('ConfigProvider', () => {
  afterEach(() => {
    cleanup();
  });

  it('when using themeVars prop', () => {
    const themeVars = {
      color: 'red',
    };
    const { container } = render(
      <ConfigProvider themeVars={themeVars}>
        <Icon name="success" />
      </ConfigProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('when using iconPrefix prop', () => {
    const { container } = render(
      <ConfigProvider iconPrefix="my-icon">
        <Icon name="success" />
      </ConfigProvider>,
    );
    expect(container.querySelector('i.my-icon-success')).toBeTruthy();
  });
});
