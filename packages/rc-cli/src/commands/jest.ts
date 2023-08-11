import jest from 'jest';
import { setNodeEnv } from '../common/index.js';
import { genPackageEntry } from '../compiler/gen-package-entry.js';
import { ROOT, JEST_CONFIG_FILE, PACKAGE_ENTRY_FILE } from '../common/constant.js';

import type { Config } from '@jest/types';

export async function test(command: Config.Argv) {
  setNodeEnv('test');

  genPackageEntry({
    outputPath: PACKAGE_ENTRY_FILE,
  });

  const config = {
    // showConfig: true,
    rootDir: ROOT,
    watch: command.watch,
    config: JEST_CONFIG_FILE,
    clearCache: command.clearCache,
    changedSince: command.changedSince,
    logHeapUsage: command.logHeapUsage,
    runInBand: command.runInBand,
    debug: command.debug,
    coverage: command.coverage,
    colors: command.colors,
    updateSnapshot: command.updateSnapshot,
    // make jest tests faster
    // see: https://ivantanev.com/make-jest-faster/
    maxWorkers: '50%',
  } as Config.Argv;
  jest
    .runCLI(config, [ROOT])
    .then((response) => {
      if (!response.results.success && !command.watch) {
        process.exit(1);
      }
    })
    .catch((err) => {
      console.log(err);

      if (!command.watch) {
        process.exit(1);
      }
    });
}
