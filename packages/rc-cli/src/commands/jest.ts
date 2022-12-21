import jest from 'jest';
import { setNodeEnv } from '../common/index.js';
import { ROOT, JEST_CONFIG_FILE } from '../common/constant.js';

import type { Config } from '@jest/types';

export function test(command: Config.Argv) {
  setNodeEnv('test');

  const config = {
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
    updateSnapshot: command.u,
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
