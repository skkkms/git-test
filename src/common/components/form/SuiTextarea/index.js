import SuiModule from './SuiTextArea'
SuiModule.install = function install (Vue) {
  Vue.component(SuiModule.name, SuiModule)
}
export default SuiModule
