const fs = require('fs');
const path = require('path');

const modulesPath = 'src/modules';
const targetFilePath = 'src/config/modules.js';

const files = fs.readdirSync(modulesPath);
let contents = '';
files.forEach(file => {
  const fullPath = path.join(modulesPath, file);
  console.log(fullPath);
  if (fs.statSync(fullPath).isDirectory()) {
    contents += `import ${file} from '~modules/${file}'\n`;
  }
});

fs.writeFileSync(targetFilePath, contents);
