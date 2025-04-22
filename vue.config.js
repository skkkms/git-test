const uidev_tools = require("./uidev_tools/ide/config/index");
const path = require('path')
const modulegenerator = require('./build/module-generator')
const pagemapgenerator = require('./build/pagemap-generator')
var webpack = require('webpack')
const currentTheme = (process.env.THEME === '' || process.env.THEME === undefined) ? '' : `_${process.env.THEME}`;
const wasEndPoint = require('./src/config/wasEndPoint.json')

// Vue CLI Configs
module.exports = {
  productionSourceMap: true,
  // runtimeCompiler: true,
  // Setup Alias
  configureWebpack: uidev_tools.getConfigureWebpack(process.env.IDE_PAGE),

  // devServer: {
  //   overlay: false,
  // },
  

  outputDir: process.env.NODE_ENV === 'production' ?
      'dist/stage' : 'dist',
  publicPath: '/',

  // Use gzip in devServer
  devServer: {
    host: 'localhost',
    compress: true,
    https: false,
    port: 8090,
    proxy: {
      '/api/v1': {
        target: wasEndPoint[process.env.VUE_APP_WAS_ENV],
        changeOrigin: true
      },
      '/certification': {
        target: wasEndPoint[process.env.VUE_APP_WAS_ENV],
        changeOrigin: true
      },
      '/resources': {
        target: wasEndPoint[process.env.VUE_APP_WAS_ENV],
        changeOrigin: true
      },
      '/swagger-ui': {
        target: wasEndPoint[process.env.VUE_APP_WAS_ENV],
        changeOrigin: true
      }
    }
  },
  pages: uidev_tools.appPages,

  // Don't need to create source-map
  //productionSourceMap: process.env.IDE_PAGE ? true : false,

  chainWebpack: config => {
    config.module.rules.delete('eslint');
    config.module.rule('js').exclude.store.clear();
	// Web Fonts file have to be cached (Fixed resource name)
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.fallback.options.name = 'fonts/[name].[ext]';
        return options;
      });

    // Image file have to be cached (Fixed resource name)
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
      .loader('file-loader')
      .tap(options => {
        options.name = 'img/[name].[ext]';
        return options;
      });
    config.module
      .rule('js')
      .test(/\.js$/)
      .exclude
      .add(filepath => {

          // always transpile js in vue files
          if (/\.vue\.jsx?$/.test(filepath)) {
              return false
          }
          return false;
      })
      .add(path.join(__dirname, 'src/apps/classList.min'))
      .add(path.join(__dirname, 'src/common/components/WebEditor/tui-editor'))
      .end()
      // 191115 include를 위한 구문
      .include
      .add(path.join(__dirname, 'src'))
      .add(path.join(__dirname, 'node_modules/@vuese/parser/dist/index.js'))
      .add(path.join(__dirname, 'node_modules/@babel/types'))
      .add(path.join(__dirname, 'node_modules/@babel/traverse'))
      .add(path.join(__dirname, 'node_modules/@babel/template'))
      .add(path.join(__dirname, 'node_modules/@babel/generator'))
      .add(path.join(__dirname, 'node_modules/@babel/code-frame'))
      .add(path.join(__dirname, 'node_modules/@babel/parser'))
      .add(path.join(__dirname, 'node_modules/@babel/helper-split-export-declaration'))
      .add(path.join(__dirname, 'node_modules/@babel/highlight'))
      .add(path.join(__dirname, 'node_modules/@babel/helper-function-name'))
      .add(path.join(__dirname, 'node_modules/jsesc'))
      .add(path.join(__dirname, 'node_modules/chalk'))
      .add(path.join(__dirname, 'node_modules/ansi-styles'))
      // 200819 uidev IE webpack 설정 추가
      .add(path.join(__dirname, 'node_modules/uidev-component'))
      .add(path.join(__dirname, 'node_modules/vue-grid-layout'))
      .end();
    if (process.env.IDE_PAGE) {
      const webpack = require('webpack');
      config.plugins.delete('hash-module-ids');
      config.plugin('named-modules').use(webpack.NamedModulesPlugin);
      config.optimization.usedExports(false);
    }
  },

  //For SASS Variable Import
  css: {
    // requireModuleExtension: false,
    sourceMap: process.env.NODE_ENV === 'production' ? false : true,
    extract: {
      filename: `[name].css`,
      chunkFilename: `[id].css`,
    },
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/assets/css/THEME-1/UR-STYLES/variables.scss";`,
        implementation: require('sass'),
      },
    },
  },

  runtimeCompiler: uidev_tools.runtimeCompiler,
  transpileDependencies: ['uidev-component'],
};
