import type { Plugin } from 'vite';
import { createFilter, FilterPattern } from '@rollup/pluginutils';
import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import { slugify } from 'transliteration';
import hljs from 'highlight.js';
import cardWrapper from './card-wrapper.js';

interface Options {
  include?: FilterPattern;
  exclude?: FilterPattern;
}

function highlight(str: string, lang: string) {
  if (lang && hljs.getLanguage(lang)) {
    // https://github.com/highlightjs/highlight.js/issues/2277
    return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value;
  }
  return '';
}

function wrapper(content: string) {
  content = cardWrapper(content);
  content = escape(content);

  return `
  /* @jsxRuntime classic */
  import React from 'react';

  const data = unescape(\`${content}\`);
  export default () => (<section dangerouslySetInnerHTML={{ __html: data }}></section>)
`;
}

const parser = new MarkdownIt({
  html: true,
  highlight,
}).use(markdownItAnchor, {
  level: 2,
  slugify,
});

const mdjsx = (options: Options = {}): Plugin => {
  return {
    name: 'markdown-plugin',
    enforce: 'pre',
    config() {
      return {
        esbuild: {
          include: /\.(mdx?|[jt]sx?)/,
          loader: 'tsx',
        },
      };
    },
    transform(code, id) {
      const { include = /\.mdx?/, exclude } = options;
      const filter = createFilter(include, exclude);

      if (filter(id)) {
        const result = wrapper(parser.render(code));
        return {
          code: result,
        };
      }
      return code;
    },
  };
};

export default mdjsx;
