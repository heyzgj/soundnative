const fs = require('fs-extra');
const path = require('path');

async function copyBuild() {
  const buildPath = path.join(__dirname, '../build');
  const unpackedPath = path.join(__dirname, '../unpacked');

  // 确保目标目录存在
  await fs.ensureDir(unpackedPath);

  // 复制构建的内容到目标目录
  await fs.copy(buildPath, unpackedPath);

  // 获取构建生成的文件名
  const files = await fs.readdir(path.join(unpackedPath, 'static/js'));
  const runtimeMain = files.find(file => file.startsWith('runtime-main'));
  const mainChunk = files.find(file => file.startsWith('main'));
  const vendorChunk = files.find(file => file.startsWith('2.'));

  // 修改复制后的 HTML 文件，移除内联脚本并添加必要的脚本引用
  const htmlFiles = ['index.html', 'popup.html'];
  for (const htmlFile of htmlFiles) {
    const filePath = path.join(unpackedPath, htmlFile);
    if (fs.existsSync(filePath)) {
      let content = await fs.readFile(filePath, 'utf-8');

      // 移除内联脚本
      content = content.replace(/<script>[\s\S]*?<\/script>/g, '');

      // 添加必要的脚本引用
      if (htmlFile === 'popup.html') {
        content = content.replace('</body>', `
          <script src="static/js/${runtimeMain}" defer></script>
          <script src="static/js/${vendorChunk}" defer></script>
          <script src="static/js/${mainChunk}" defer></script>
        </body>`);
      }

      await fs.writeFile(filePath, content, 'utf-8');
    }
  }
}

copyBuild().catch(err => console.error('Error copying files:', err));
