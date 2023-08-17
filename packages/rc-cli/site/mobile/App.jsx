import React, { useMemo, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import ScrollTop from './components/ScrollTop';
import DemoNav from './components/DemoNav';
import routes from './routes';

import './index.less';

const App = () => {
  const { pathname } = useLocation();

  const title = useMemo(() => {
    const route = routes.find((o) => o.path === pathname);
    return (route && route.meta && route.meta.name) || '';
  }, [pathname]);

  return (
    <div>
      <DemoNav title={title} />
      <ScrollTop />
      <Suspense fallback={<div></div>}>
        <Routes>
          {routes.map((route) => {
            return route.redirect ? (
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
                // render={(props) => {
                //   return <route.component {...props} meta={route.meta} routes={route.routes} />;
                // }}
              />
            );
          })}
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
