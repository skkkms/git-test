const currentTheme = (process.env.THEME === '' || process.env.THEME === undefined) ? '' : `_${process.env.THEME}`;
const webpack = require('webpack');
// Pages Options : for Main Application
const mainPages = {
  index: {
    entry: [`src/apps/site/main${currentTheme}.js`],
    template: 'public/index.html',
    filename: `index${currentTheme}.html`,
    title: 'Main',
    chunks: ['chunk-vendors', 'chunk-common', 'index']
  },
  popup: {
      entry: [`src/apps/popup/main${currentTheme}.js`],
      template: 'public/index.html',
      filename: `popup${currentTheme}.html`,
      title: 'Popup',
      chunks: ['chunk-vendors', 'chunk-common', 'popup']
  },
  portal: {
      entry: [`src/apps/portal/main${currentTheme}.js`],
      template: 'public/index.html',
      filename: `portal${currentTheme}.html`,
      title: 'Portal',
      chunks: ['chunk-vendors', 'chunk-common', 'portal']
  },  
};
  
// Pages Options : for IDE Application
const idePages = {
  index: {
    entry: ['uidev_tools/ide/src/ide/ide.js'],
    template: 'public/index.html',
    filename: 'index.html',
    title: 'Ide',
  },
  preview: {
    entry: ['uidev_tools/ide/src/preview/preview.js'],
    template: 'public/index.html',
    filename: 'preview.html',
    title: 'Preview',
  },
};
  
const appPages = process.env.IDE_PAGE ? idePages : mainPages;
const runtimeCompiler = process.env.IDE_PAGE ? true : false;
const getConfigureWebpack = (isIDE) => {
  const configure = {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.scss' ],
      alias: {
        'vue$': 'vue/dist/vue.esm.js', // template 사용에 필요
        "~assets": '/src/assets',
        "~config": '/src/config',
        "~common": '/src/common',
        "~system": '/src/system',
        "~modules": '/src/modules',
        "~cm": '/src/modules/CM',
        "~aa": '/src/modules/AA',
        "images": '/src/assets/images',
        '@uidev': 'uidev-component',
      },
    },
    plugins: [
      new webpack.DefinePlugin({
          'process.env.PORTAL': JSON.stringify(process.env.PORTAL)
      }),
    ],
  }

  if (isIDE) {
    configure.output = {
      filename: 'js/[name].[hash:8].js',
      chunkFilename: 'js/[name].[hash:8].js'
    }
  }

  return configure;
}

module.exports = { appPages, runtimeCompiler, getConfigureWebpack };