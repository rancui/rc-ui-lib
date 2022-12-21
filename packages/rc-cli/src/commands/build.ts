import execa from 'execa';
import { join, relative } from 'path';
import fse from 'fs-extra';
import { ora, consola } from '../common/logger.js';
import {
  isAsset,
  isDemoDir,
  isDir,
  isScript,
  isStyle,
  isTestDir,
  setBuildTarget,
  setModuleEnv,
  setNodeEnv,
} from '../common/index.js';
import { clean } from './clean.js';
import { LIB_DIR, ES_DIR, SRC_DIR } from '../common/constant.js';
import { genStyleDepsMap } from '../compiler/gen-style-deps-map.js';
import { genComponentStyle } from '../compiler/gen-component-style.js';
import { genPackageEntry } from '../compiler/gen-package-entry.js';
import { genPackageStyle } from '../compiler/gen-package-style.js';
import { CSS_LANG } from '../common/css.js';
import { compileScript } from '../compiler/compile-js.js';
// import { compilePackage } from '../compiler/compile-package';
import { compileStyle } from '../compiler/compile-style.js';
import { installDependencies } from '../common/manager.js';

import type { Format } from 'esbuild';

const { remove, copy, readdirSync, existsSync } = fse;

async function compileFile(filePath: string, format: Format) {
  if (isScript(filePath)) {
    return compileScript(filePath, format);
  }

  if (isStyle(filePath)) {
    return compileStyle(filePath);
  }

  if (isAsset(filePath)) {
    return Promise.resolve();
  }

  // return remove(filePath);
  return Promise.resolve();
}

async function compileDir(dir: string, format: Format) {
  const files = readdirSync(dir);

  await Promise.all(
    files.map((filename) => {
      const filePath = join(dir, filename);
      if (isDemoDir(filePath) || isTestDir(filePath)) {
        return remove(filePath);
      }

      if (isDir(filePath)) {
        return compileDir(filePath, format);
      }

      return compileFile(filePath, format);
    }),
  );
}

async function copySourceCode() {
  await copy(SRC_DIR, ES_DIR);
  await copy(SRC_DIR, LIB_DIR);
}

async function buildPackageScriptEntry() {
  const esEntryFile = join(ES_DIR, 'index.js');
  const libEntryFile = join(LIB_DIR, 'index.js');

  genPackageEntry({
    outputPath: esEntryFile,
    pathResolver: (path: string) => `./${relative(SRC_DIR, path)}`,
  });

  await copy(esEntryFile, libEntryFile);
}

async function buildStyleEntry() {
  await genStyleDepsMap();
  genComponentStyle();
}

async function buildPackageStyleEntry() {
  const styleEntryFile = join(LIB_DIR, `index.${CSS_LANG}`);

  genPackageStyle({
    outputPath: styleEntryFile,
    pathResolver: (path: string) => path.replace(SRC_DIR, '.'),
  });
}

async function buildTypeDeclarations() {
  const tsConfig = join(process.cwd(), 'tsconfig.declaration.json');

  if (existsSync(tsConfig)) {
    await execa('tsc', ['-p', tsConfig]);
  }
}

async function buildESMOutputs() {
  setModuleEnv('esmodule');
  setBuildTarget('package');
  await compileDir(ES_DIR, 'esm');
}

async function buildCJSOutputs() {
  setModuleEnv('commonjs');
  setBuildTarget('package');
  await compileDir(LIB_DIR, 'cjs');
}

async function buildBundledOutputs() {
  setModuleEnv('esmodule');
  // await compilePackage(false);
  // await compilePackage(true);
}

const tasks = [
  {
    text: 'Copy Source Code',
    task: copySourceCode,
  },
  {
    text: 'Build Package Script Entry',
    task: buildPackageScriptEntry,
  },
  {
    text: 'Build Component Style Entry',
    task: buildStyleEntry,
  },
  {
    text: 'Build Package Style Entry',
    task: buildPackageStyleEntry,
  },
  {
    text: 'Build Type Declarations',
    task: buildTypeDeclarations,
  },
  {
    text: 'Build ESModule Outputs',
    task: buildESMOutputs,
  },
  {
    text: 'Build CommonJS Outputs',
    task: buildCJSOutputs,
  },
  {
    text: 'Build Bundled Outputs',
    task: buildBundledOutputs,
  },
];

async function runBuildTasks() {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < tasks.length; i++) {
    const { task, text } = tasks[i];
    const spinner = ora(text).start();

    try {
      /* eslint-disable no-await-in-loop */
      await task();
      spinner.succeed(text);
    } catch (err) {
      spinner.fail(text);
      console.log(err);
      throw err;
    }
  }

  consola.success('Compile successfully');
}

export async function build() {
  setNodeEnv('production');

  try {
    await clean();
    await installDependencies();
    await runBuildTasks();
  } catch (err) {
    consola.error('Build failed');
    process.exit(1);
  }
}
