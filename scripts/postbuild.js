const fs = require('fs-extra');
const path = require('path');

// 定义源目录和目标目录
const buildDir = path.join(__dirname, '..', 'build');
const unpackedDir = path.join(buildDir, 'unpacked');
const publicDir = path.join(__dirname, '..', 'public');
const tempDir = path.join(__dirname, '..', 'temp-unpacked');

// 创建临时目录和目标目录
fs.ensureDirSync(tempDir);
fs.ensureDirSync(unpackedDir);

// 复制 public 目录中的所有文件到临时目录
fs.copySync(publicDir, tempDir, {
  filter: (src) => {
    const basename = path.basename(src);
    // 排除 index.html，因为 React 的构建已经生成了一个
    return basename !== 'index.html';
  }
});

// 复制构建后的文件到临时目录
fs.copySync(buildDir, tempDir, {
  filter: (src) => {
    const basename = path.basename(src);
    // 仅复制构建生成的文件
    return basename !== 'unpacked' && basename !== 'index.html';
  }
});

// 复制 index.html 到临时目录并重命名为 popup.html
fs.copyFileSync(path.join(buildDir, 'index.html'), path.join(tempDir, 'popup.html'));

// 将临时目录复制到目标目录
fs.copySync(tempDir, unpackedDir);

// 删除临时目录
fs.removeSync(tempDir);

console.log('Post-build process completed.');
