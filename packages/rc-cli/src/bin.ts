#!/usr/bin/env node
import { Command } from 'commander';

import {
  dev,
  lint,
  test,
  clean,
  build,
  release,
  buildSite,
  commitLint,
  changelog,
  cliVersion,
} from './index.js';

const program = new Command();

program.version(`@rancui/cli ${cliVersion}`);

program.command('dev').description('Run vite dev server').action(dev);

program.command('lint').description('Run eslint and stylelint').action(lint);

program
  .command('test')
  .description('Run unit tests through jest')
  .option('--watch', 'Watch files for changes and rerun tests related to changed files')
  .option('--clearCache', 'Clears the configured Jest cache directory and then exits')
  .option(
    '--changedSince <changedSince>',
    'Runs tests related to the changes since the provided branch or commit hash',
  )
  .option('--logHeapUsage', 'Logs the heap usage after every test. Useful to debug memory leaks')
  .option(
    '--runInBand',
    'Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests',
  )
  .option('--debug', 'Print debugging info about your Jest config')
  .option('--colors', 'Print test coverage statistics with color')
  .option('--coverage', 'generate test coverage report')
  .option('--u, --update-snapshot', 'update snapshot')
  .action(test);

program.command('clean').description('Clean all dist files').action(clean);

program
  .command('build')
  .description('Compile components in production mode')
  .option('--watch', 'Watch file change')
  .action(build);

program
  .command('release')
  .description('Compile components and release it')
  .option('--tag <tag>', 'Release tag')
  .action(release);

program.command('build-site').description('Compile site in production mode').action(buildSite);

program.command('commit-lint').description('Lint commit message').action(commitLint);

program.command('changelog').description('Generate changelog').action(changelog);

program.parse(process.argv);
