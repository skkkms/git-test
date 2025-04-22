const path = require('path')
const modulegenerator = require('./build/module-generator')
const pagemapgenerator = require('./build/pagemap-generator')
var webpack = require('webpack')
const currentTheme = (process.env.THEME === '' || process.env.THEME === undefined) ? '' : `_${process.env.THEME}`;

module.exports = {
    productionSourceMap: true,
    runtimeCompiler: true,
    outputDir: process.env.NODE_ENV === 'production' ?
        'dist/stage' : 'dist',
    publicPath: process.env.NODE_ENV === 'production' ?
        '/LEUIU/' : '/',
    pages: {
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
    },
    // css: {
    //     requireModuleExtension: false,
    //     extract: {
    //         filename: `[name].css`,
    //         chunkFilename: `[id].css`,
    //     },
    // },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json', '.scss' ],
            alias: {
                'vue$': 'vue/dist/vue.esm.js', // template 사용에 필요
                "~assets": path.join(__dirname, 'src/assets'),
                "~config": path.join(__dirname, 'src/config'),
                "~common": path.join(__dirname, 'src/common'),
                "~system": path.join(__dirname, 'src/system'),
                "~modules": path.join(__dirname, 'src/modules'),
                "~cl": path.join(__dirname, 'src/modules/CL'),
                "~cm": path.join(__dirname, 'src/modules/CM'),
                "~sc": path.join(__dirname, 'src/modules/SC'),
                "~aa": path.join(__dirname, 'src/modules/AA'),
                "images": path.join(__dirname, 'src/assets/images'),
                "@uidev": path.join(__dirname, 'node_modules/uidev-component'),
            }
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.PORTAL': JSON.stringify(process.env.PORTAL)
            }),
        ],
    },
    chainWebpack: config => {
        config.module.rules.delete('eslint');
        config.module.rule('js').exclude.store.clear();

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
    },
    css: {
        sourceMap: process.env.NODE_ENV === 'production' ? false : true,
    },
};