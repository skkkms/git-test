import SuiModule from './SuiModal'
SuiModule.install = function install (Vue) {
  Vue.component(SuiModule.name, SuiModule)
}
export default SuiModule
