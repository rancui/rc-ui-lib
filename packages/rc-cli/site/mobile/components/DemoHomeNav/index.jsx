import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from '../../../common/index.js';
import ArrowRight from '../ArrowRight';
import './index.less';

const DemoHomeNav = (props) => {
  const { lang, group } = props;

  const navigate = useNavigate();

  const base = useMemo(() => {
    return lang ? `/${lang}` : '';
  }, [lang]);

  return (
    <div className="demo-home-nav">
      <div className="demo-home-nav__title">{group.title}</div>
      <div className="demo-home-nav__group">
        {group.items.map((navItem) => (
          <div
            className="demo-home-nav__block"
            key={navItem.path}
            onClick={() => {
              navigate(`${base}/${navItem.path}`);
              if (!isMobile && window !== window.top) {
                window.top.postMessage({ pathname: `${base}/${navItem.path}` }, window.top);
              }
            }}
          >
            {navItem.title}
            <ArrowRight className="demo-home-nav__icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoHomeNav;
