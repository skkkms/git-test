const uidev_tools = require("./uidev_tools/ide/config/index");

// Vue CLI Configs
module.exports = {
  // Setup Alias
  configureWebpack: uidev_tools.getConfigureWebpack(process.env.IDE_PAGE),

  // devServer: {
  //   overlay: false,
  // },

  outputDir: process.env.NODE_ENV === 'production' ?
      'dist/stage' : 'dist',
  publicPath: process.env.NODE_ENV === 'production' ?
      '/LEUIU/' : '/',

  // Use gzip in devServer
  devServer: {
    host: 'localhost',
    compress: true,
  },
  pages: uidev_tools.appPages,

  // Don't need to create source-map
  productionSourceMap: process.env.IDE_PAGE ? true : false,

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
        additionalData: `@use "~@/assets/css/THEME-1/UR-STYLES/variables.scss" as var;`,
        implementation: require('sass'),
      },
    },
  },

  runtimeCompiler: uidev_tools.runtimeCompiler,
  transpileDependencies: ['uidev-component'],
};
