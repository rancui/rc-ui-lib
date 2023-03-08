/* eslint-disable no-template-curly-in-string */
import releaseIt from 'release-it';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLUGIN_PATH = join(__dirname, '../compiler/rc-cli-release-plugin.js');

export async function release(command: { tag?: string }) {
  await releaseIt({
    plugins: {
      [PLUGIN_PATH]: {},
    },
    npm: {
      tag: command.tag,
    },
    git: {
      requireCleanWorkingDir: false,
      requireBranch: 'main',
      requireUpstream: false,
      tagName: 'v${version}',
      commitMessage: 'chore: release ${version}',
    },
  });
}
