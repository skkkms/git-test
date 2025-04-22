const fs = require('fs');
const glob = require('glob');
const path = require('path');

const getMergedContents = filePatterns => {
  const mergedContents = [];
  filePatterns.forEach(filePattern => {
    glob.sync(path.join(descriptorDirPath, filePattern)).forEach(filePath => {
      const contents = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      if (!(contents instanceof Array)) mergedContents.push(contents);
      else mergedContents.push(...contents);
    });
  });

  return mergedContents;
};

const getDataUri = imagePath => {
  try {
    const base64 = fs.readFileSync(imagePath).toString('base64');
    const ext = path.extname(imagePath).toLowerCase();
    if (ext === '.svg') {
      return 'data:image/svg+xml;base64,' + base64;
    } else {
      return 'data:image/' + ext.substr(1) + ';base64,' + base64;
    }
  } catch (err) {
    return '';
  }
};

const descriptorDirPath = path.join(
  __dirname,
  '../ide/descriptors/uidev-component',
);
const descriptorPath = path.join(descriptorDirPath, 'descriptor.json');
const descriptor = JSON.parse(fs.readFileSync(descriptorPath, 'utf-8'));
const descriptorBundlePath = path.join(
  descriptorDirPath,
  'descriptorBundle.json',
);

const categoriesPath = descriptor.categories;
const snippetsPath = descriptor.snippets;
const componentsPath = descriptor.components;
const pagesPath = descriptor.pages;
const framesPath = descriptor.frames;

const cssClassesTypePath = descriptor.cssclasses.types;
const cssClassesClassPath = descriptor.cssclasses.classes;

if (!(categoriesPath instanceof Array)) {
  throw new TypeError('categories must be array of filename condition.');
}
if (!(snippetsPath instanceof Array)) {
  throw new TypeError('snippets must be array of filename condition.');
}
if (!(componentsPath instanceof Array)) {
  throw new Error('components must be array of filename condition.');
}
if (!(pagesPath instanceof Array)) {
  throw new Error('pages must be array of filename condition.');
}
if (!(framesPath instanceof Array)) {
  throw new Error('frames must be array of filename condition.');
}

if (!(cssClassesTypePath instanceof Array)) {
  throw new Error('CSS class types must be array of filename condition.');
}
if (!(cssClassesClassPath instanceof Array)) {
  throw new Error('CSS classes must be array of filename condition.');
}

descriptor.categories = getMergedContents(categoriesPath);
descriptor.snippets = getMergedContents(snippetsPath).filter(snippet => !snippet.hidden);
descriptor.components = getMergedContents(componentsPath);
descriptor.pages = getMergedContents(pagesPath);
descriptor.frames = getMergedContents(framesPath);

descriptor.cssclasses.types = getMergedContents(cssClassesTypePath);
descriptor.cssclasses.classes = getMergedContents(cssClassesClassPath);

if (descriptor.snippets) {
  descriptor.snippets.forEach(snippet => {
    if (snippet.path) {
      const templatePath = path.join(descriptorDirPath, snippet.path);
      try {
        snippet.content = fs.readFileSync(templatePath, 'utf-8');
      } catch (err) {}
    }
    if (snippet.icon) {
      snippet.iconDataUri = getDataUri(
        path.join(descriptorDirPath, snippet.icon),
      );
    }
    if (snippet.lighticon) {
      snippet.lighticonDataUri = getDataUri(
        path.join(descriptorDirPath, snippet.lighticon),
      );
    }
  });
}

fs.writeFileSync(descriptorBundlePath, JSON.stringify(descriptor));
