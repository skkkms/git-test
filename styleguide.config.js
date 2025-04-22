const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const vueLoader = require('vue-loader')
const path = require('path')

module.exports = {
  require: [path.join(__dirname, 'styleguide.requires.js')],
  ignore: [
    // 관리여부 X
    '**/components/form/SuiCustomSelectBase/SuiCustomSelectBase.vue',
    '**/components/form/SuiLayerPopup/SuiLayerPopup.vue',
    '**/components/form/SuiLnbTreeItem/SuiLnbTreeItem.vue',
    '**/components/form/SuiMultiSelectBox/SuiMultiSelectBox.vue',
    '**/components/form/SuiPopupMixin/SuiPopupMixin.vue',
    '**/components/form/SuiProcessTabItems/SuiProcessTabItems.vue',
    '**/components/form/SuiQuickLinkItem/SuiQuickLinkItem.vue',
    '**/components/form/SuiSelectBase/SuiSelectBase.vue',
    '**/components/form/SuiSelectBoxPortal/SuiSelectBoxPortal.vue',
    '**/components/form/SuiTextareaPopup/SuiTextareaPopup.vue',
    '**/components/form/SuiTreeItem/SuiTreeItem.vue',
    '**/components/form/SuiTree/SuiTreeViewItem.vue',
    '**/components/layout/SuiGnb/SuiGnb.vue',
    '**/components/layout/SuiGnbMenu/SuiGnbMenu.vue',
    '**/components/layout/SuiLnb/SuiLnb.vue',
    '**/components/layout/SuiLnbMenu/SuiLnbMenu.vue',
    '**/components/layout/SuiLnbMenuItem/SuiLnbMenuItem.vue',
    '**/components/layout/SuiLnbMenuTree/SuiLnbMenuTree.vue',
    '**/components/layout/SuiPanelNavigation/SuiPanelNavigation.vue',
    '**/components/layout/SuiPanelStickyButton/SuiPanelStickyButton.vue',

    // import
    '**/components/form/SuiComponentPortal/SuiComponentPortal.vue',
    '**/components/form/SuiDatasetBase/SuiDatasetBase.vue',
    '**/components/form/SuiDropdown/SuiDropdown.vue',
    '**/components/form/SuiGrid/SuiGridColumnListControl.vue',
    '**/components/form/SuiGridPager/SuiGridPager.vue',
    '**/components/form/SuiShowcaseBox/SuiShowcaseBox.vue',
    '**/components/form/SuiShowcaseManualBox/SuiShowcaseManualBox.vue',
    '**/components/form/SuiShowcaseTip/SuiShowcaseTip.vue',
    '**/components/form/SuiSimpleTree/SuiJqxTree.vue',  // simpleTree
    '**/components/form/SuiTreeItem/SuiTreeItem.vue',
  ],
  title: 'SUI Components Docs',
  defaultExample: false,
  displayOrigins: false,
  // ribbon: {
  //     text: 'Back to examples',
  //     url: `Examples.html`
  // },
  pagePerSection: true,
  assetsDir: './src/assets/',
  version: '20.03.24',
  copyCodeButton: true,
  usageMode: 'expand',
  exampleMode: 'expand',
  tocMode: 'collapse',
  compilerConfig: {
      target: { ie: 11 }
  },
  styleguideDir: 'dist',
  sections: [
      // {
      //     name: 'SUI Components',
      //     // content: 'docs/ui.md',
      //     // components: 'src/common/components/**/SuiHtmlSelect.vue'
      //     components: 'src/common/components/form/Sui*/Sui[A-T]*.vue'
      // },
      // // {
      // //     name: 'Grid Cell Components',
      // //     components: 'src/common/components/gridCell/Cell*/Cell[A-T]*.vue'
      // // },
      {
        name: "SUI Components",
        sections: [
          {
            name: "Form",
            exclude: /SuiCodeSelect/,
            components: ['src/common/components/form/Sui*/Sui*.vue'],    
          },
          {
            name: "Layout",
            components: ['src/common/components/layout/Sui*/Sui*.vue'],    
          },
          {
            name: "GridCell",
            components: ['src/common/components/gridCell/Cell*/Cell*.vue'],
          }
        ],
        sectionDepth: 2,      
      },
  ]
}
