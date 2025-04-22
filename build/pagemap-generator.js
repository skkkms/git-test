const fs = require('fs');
const path = require('path');
const currentPath = path.join(__dirname, '');
const conf = require("./pagemap-conf.js");
const pageMapPath = 'src/config/pageMap.js';
const modulesPath = 'src/modules';
const moduleSeparator = '/modules/';
const subModuleSeparator = '/pages/';
const CHUNK_NAMK_SAMPLE = 'SAMPLE';
const getPosixPath = (path) => {
  return path.replace(/\\/g, '/');
}

const EXT_VUE = '.vue';
const vueFiles = [];

const queue = [];

// 기본 페이지
conf.defaultPaths.forEach(path => {queue.push(path)});


// 모듈 페이지
const files = fs.readdirSync(modulesPath);
files.forEach(file => {
  const fullPath = path.join(modulesPath, file);
  if (fs.statSync(fullPath).isDirectory()) {
    queue.push(fullPath);
  }
});

const splitSubModule = conf.splitSubModule;

let importContents = '';
let routeContents = '';

while (queue.length > 0) {
  const current = queue.shift();
  if (path.extname(current) === EXT_VUE) {
    vueFiles.push(getPosixPath(path.normalize(current)));
  } else if (fs.existsSync(current) && fs.lstatSync(current).isDirectory()) {
    const children = fs.readdirSync(current);
    children.forEach(child => {
      queue.push(path.join(current, child));
    });
  }
}

const isPage = (pageName) => {
  if (pageName.indexOf('PGE') >= 0 && pageName.length === 13) {
    return true;
  }
  return false;
}

vueFiles.forEach(file => {
  let basename = path.basename(file);
  const componentName = basename.substr(0, basename.length - EXT_VUE.length);
  const relPath = getPosixPath(path.relative(path.join(pageMapPath, '../'), file));
  let chunkName = '';  
  let moduleName = null;
  let subModuleName = null;
  let idx = -1
  
  // [191114] for exclude manual sample file, 
  //     "component-guide/manual/**/sample/" 폴더 아래 있는 모든 vue file은 exclude
  const regex = /\/samples\/component-guide\/manual\/.*\/sample\/[^\/]*\.vue/;
  if(regex.test(relPath)) {return;}

  idx = relPath.indexOf(moduleSeparator);
  if (idx >= 0) {        
    moduleName = relPath.substr(idx + moduleSeparator.length, 2); 
  }
  idx = relPath.indexOf(subModuleSeparator);
  if (idx >= 0) {        
    subModuleName = relPath.substr(idx + subModuleSeparator.length, 1); 
  }

  if (moduleName) {
    if (splitSubModule) {
      chunkName = moduleName + subModuleName;
    } else {
      chunkName = moduleName;
    }
  } else {
    chunkName = CHUNK_NAMK_SAMPLE;
  }

  const importFunc = `() => import( /* webpackChunkName: "${chunkName}" */ '${relPath}')`;
  if (chunkName != CHUNK_NAMK_SAMPLE) {
    if (isPage(componentName)) {
      importContents += `const ${componentName} = ${importFunc};\n`;
      routeContents += `  { path: '/${componentName}', name: '${componentName}', component: ${componentName} },\n`;
    }
  } else {
    importContents += `const ${componentName} = ${importFunc};\n`;
    routeContents += `  { path: '/${componentName}', name: '${componentName}', component: ${componentName} },\n`;
  }
});

const fileContents = `${importContents}
export default [
${routeContents}];
`

fs.writeFileSync(pageMapPath, fileContents);
