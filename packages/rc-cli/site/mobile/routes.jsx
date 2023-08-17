import { lazy } from 'react';
import { demos, config } from 'site-mobile-shared';
import { decamelize } from '../common';
import { getLang, setDefaultLang } from '../common/locales';
import DemoHome from './components/DemoHome';

const { locales, defaultLang } = config.site;

setDefaultLang(defaultLang);

export function getLangFromRoute(pathname) {
  const lang = pathname.split('/')[1];
  const langs = Object.keys(locales);

  if (langs.indexOf(lang) !== -1) {
    return lang;
  }
  return getLang();
}

function getRoutes() {
  const routes = [];
  const names = Object.keys(demos);
  const langs = locales ? Object.keys(locales) : [];

  if (langs.length) {
    langs.forEach((lang) => {
      routes.push({
        path: `/${lang}`,
        exact: true,
        component: <DemoHome />,
        meta: { lang },
      });
    });
  } else {
    routes.push({
      path: '/',
      exact: true,
      component: <DemoHome />,
      meta: {},
    });
  }

  names.forEach((name) => {
    const component = decamelize(name);

    if (langs.length) {
      langs.forEach((lang) => {
        const Component = lazy(demos[name]);
        routes.push({
          name: `${lang}/${component}`,
          path: `/${lang}/${component}`,
          component: <Component />,
          meta: {
            name,
            lang,
          },
        });
      });
    } else {
      const Component = lazy(demos[name]);
      routes.push({
        name,
        path: `/${component}`,
        component: <Component />,
        meta: {
          name,
        },
      });
    }
  });

  if (locales) {
    routes.push({
      path: '*',
      redirect: (pathname) => `/${getLangFromRoute(pathname)}/`,
      meta: {},
    });
  } else {
    routes.push({
      path: '*',
      redirect: () => '/',
      meta: {},
    });
  }

  return routes;
}

export default getRoutes();
