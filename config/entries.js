const path = require('path');
const fs = require('fs');

function getEntries() {
    function isDir(dir) {
        return fs.lstatSync(dir).isDirectory();
    }
    const entries = {
        index: path.join(__dirname, `../src/index.tsx`)
    };
    const dir = path.join(__dirname, '../src/components');
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const absolutePath = path.join(dir, file);
        if (isDir(absolutePath)) {
            entries[file] = path.join(__dirname, `../src/components/${file}/index.tsx`);
        }
    });
    return entries;
}

const fileEntries = getEntries();

module.exports = fileEntries;
