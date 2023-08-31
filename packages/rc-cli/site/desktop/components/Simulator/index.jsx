import React, { useMemo, useEffect, useState } from 'react';
import classnames from 'classnames';
import * as Icons from '../Icons';
import Dropdown from '../Dropdown';
import { QRCodeCanvas } from 'qrcode.react';
import './index.less';

const RCDOC_SIMULATOR_IFRAME_ID = 'rcdoc-simulator-iframe';

const Simulator = (props) => {
  const { src } = props;
  const [windowHeight, setWindowHeight] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const simulatorStyle = useMemo(() => {
    const height = Math.min(640, window.innerHeight - 90);
    return {
      height: `${height}px`,
    };
  }, [windowHeight]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollTop(window.scrollY);
    });
    window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight);
    });
  }, []);

  return (
    <div
      className={classnames('vant-doc-simulator', {
        'vant-doc-simulator-fixed': scrollTop > 60,
      })}
    >
      <iframe
        id={RCDOC_SIMULATOR_IFRAME_ID}
        title="vant-ui-iframe"
        src={src}
        style={simulatorStyle}
        frameBorder="0"
      />
      <div className="vant-doc-simulator__actions">
        <a
          className="vant-doc-simulator__actions__item"
          title="新窗口预览"
          href={src}
          target="_blank"
        >
          <Icons.HttpLinkIcon />
        </a>

        <Dropdown
          offset={['0px', '-15px']}
          arrow={false}
          width={120}
          placement="topCenter"
          overlay={[
            <QRCodeCanvas
              style={{ display: 'block' }}
              key="qrcode"
              size={100}
              value={`${window.location.origin}${src}`}
            />,
          ]}
        >
          <Icons.QrcodeIcon className="vant-doc-simulator__actions__item" alt="手机扫二维码预览" />
        </Dropdown>
        <a
          className="vant-doc-simulator__actions__item"
          title="重新加载Demo"
          onClick={() => {
            const iframe = document.querySelector(`#${RCDOC_SIMULATOR_IFRAME_ID}`);
            if (iframe) {
              iframe.contentWindow.location.reload();
            }
          }}
          target="_blank"
        >
          <Icons.ReloadIcon />
        </a>
      </div>
    </div>
  );
};

export default Simulator;
