import { join, dirname } from 'path';
import conventionalChangelog from 'conventional-changelog';
import fse from 'fs-extra';
import { ROOT } from '../common/constant.js';
import { ora, slimPath } from '../common/logger.js';
import { fileURLToPath } from 'url';

const { createWriteStream, readFileSync } = fse;
const __dirname = dirname(fileURLToPath(import.meta.url));

const DIST_FILE = join(ROOT, './changelog.generated.md');
const HEADER_TEMPLATE = join(__dirname, '../../template/changelog-header.hbs');
const MAIN_TEMPLATE = join(__dirname, '../../template/changelog-main.hbs');
const COMMIT_TEMPLATE = join(__dirname, '../../template/changelog-commit.hbs');
const CHANGELOG_MD = join(ROOT, './docs/markdown/changelog.zh-CN.md');

const mainTemplate = readFileSync(MAIN_TEMPLATE, 'utf-8');
const headerPartial = readFileSync(HEADER_TEMPLATE, 'utf-8');
const commitPartial = readFileSync(COMMIT_TEMPLATE, 'utf-8');

function formatType(type: string) {
  const MAP: Record<string, string> = {
    fix: 'Bug Fixes',
    feat: 'Feature',
    docs: 'Document',
    types: 'Types',
  };

  return MAP[type] || type;
}

function transform(item: any) {
  if (item.type === 'chore' || item.type === 'test') {
    return null;
  }

  item.type = formatType(item.type);

  if (item.hash) {
    item.shortHash = item.hash.slice(0, 6);
  }

  if (item.references.length) {
    item.references.forEach((ref: any) => {
      if (ref.issue && item.subject) {
        item.subject = item.subject.replace(` (#${ref.issue})`, '');
      }
    });
  }
  return item;
}

export async function changelog(): Promise<void> {
  const spinner = ora('Generating changelog...').start();

  return new Promise((resolve) => {
    conventionalChangelog(
      {
        preset: 'angular',
        releaseCount: 2,
      },
      null,
      null,
      null,
      {
        mainTemplate,
        headerPartial,
        commitPartial,
        transform,
      },
    )
      .pipe(createWriteStream(DIST_FILE))
      .on('close', async () => {
        spinner.succeed(`Changelog generated at ${slimPath(DIST_FILE)}`);
        await updateChangelog(spinner);
        resolve();
      });
  });
}

async function updateChangelog(spinner: ora.Ora) {
  fse.readFile(CHANGELOG_MD, (err, data) => {
    if (err) throw err;

    const content = data.toString();
    const regex = /## 更新内容/g;
    const match = regex.exec(content);
    if (!match) {
      console.log('未找到更新内容');
      return;
    }
    const generatedText = readFileSync(DIST_FILE);
    const insertIndex = match.index + match[0].length + 4;
    const updatedContent =
      content.slice(0, insertIndex) + generatedText + '\r\n' + content.slice(insertIndex);
    fse.writeFile(CHANGELOG_MD, updatedContent, 'utf8', (err) => {
      if (err) throw err;
      spinner.succeed(`更新日志插入成功`);
    });
  });
}
