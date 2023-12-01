import React, { useMemo, useEffect, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { config, packageVersion } from 'site-desktop-shared';

import { isMobile } from '../common';
import Doc from './components/index';
import routes, { getLangFromRoute } from './routes';

import './index.less';

const App = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleMessage = (event) => {
    if (event.data.pathname && pathname !== event.data.pathname) {
      navigate(event.data.pathname);
    }
  };

  useEffect(() => {
    if (isMobile) {
      window.location.replace(`mobile.html${window.location.hash}`);
    }
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  window.addEventListener('message', handleMessage, false);

  const path = window.location.pathname.replace(/\/index(\.html)?/, '/');
  const simulator = `${path}mobile.html${window.location.hash}`;

  const lang = useMemo(() => {
    return getLangFromRoute(pathname);
  }, [pathname]);

  const currentComponentName = useMemo(() => pathname.replace(/\/.*\//, ''), [pathname]);

  const localeConfig = useMemo(() => {
    const { locales } = config.site;
    if (locales) {
      return locales[lang];
    }
    return config.site;
  }, [lang]);

  // 文档模式
  const { hideSimulator = false } = config.site;

  // 文档语言数据
  const langConfigs = React.useMemo(() => {
    const { locales = {} } = config.site;
    return Object.keys(locales).map((key) => ({
      lang: key,
      label: locales[key].langLabel || '',
    }));
  }, [config]);

  // 更新标题
  const setTitle = () => {
    let { title } = localeConfig;

    const navItems = localeConfig.nav.reduce((result, nav) => [...result, ...nav.items], []);

    const current = navItems.find((item) => item.path === currentComponentName);

    if (current && current.title) {
      title = `${current.title} - ${title}`;
    } else if (localeConfig.description) {
      title += ` - ${localeConfig.description}`;
    }

    document.title = title;
  };

  useEffect(setTitle);

  // 文档版本数据
  const versions = React.useMemo(() => {
    if (config.site.versions) {
      return [{ label: packageVersion }, ...localeConfig.site.versions];
    }
    return [{ label: packageVersion }];
  }, []);

  return (
    <Doc
      lang={lang}
      config={localeConfig}
      langConfigs={langConfigs}
      versions={versions}
      simulator={simulator}
      hideSimulator={hideSimulator}
      currentComponentName={currentComponentName}
    >
      <Suspense fallback={<div style={{ height: '110vh' }}></div>}>
        <Routes>
          {routes.map((route) =>
            route.redirect ? (
              <Route
                key={route.path}
                path={route.path}
                element={<Navigate to={route.redirect(pathname)} replace />}
              />
            ) : (
              <Route
                key={route.path}
                exact={route.exact}
                path={route.path}
                element={route.component}
                // render={(props) => (
                //   <route.component {...props} element={route.component} routes={route.routes} />
                // )}
              />
            ),
          )}
        </Routes>
      </Suspense>
    </Doc>
  );
};

export default App;
