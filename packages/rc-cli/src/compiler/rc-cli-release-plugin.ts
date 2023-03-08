import { Plugin } from 'release-it';
import { execSync } from 'child_process';

class RcCliReleasePlugin extends Plugin {
  async beforeRelease() {
    // log an empty line
    console.log('');

    execSync('rc-cli build', { stdio: 'inherit' });
    execSync('rc-cli changelog', { stdio: 'inherit' });
  }
}

export default RcCliReleasePlugin;
