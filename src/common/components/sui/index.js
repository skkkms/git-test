import suiButton from './SuiButton/SuiButton';
import suiCheckbox from './SuiCheckbox/SuiCheckbox';
import suiCodeSelect from './SuiCodeSelect/SuiCodeSelect';
import suiSelectBox from './SuiSelectBox/SuiSelectBox';
import suiFileUploader from './SuiFileUploader/SuiFileUploader';
import suiInputLabel from './SuiInputLabel/SuiInputLabel';
import suiLabel from './SuiLabel/SuiLabel';
import suiLangSelect from './SuiLangSelect/SuiLangSelect';
import suiModuleSubmoduleSelect from './SuiModuleSubmoduleSelect/SuiModuleSubmoduleSelect';
import suiMultiSelect from './SuiMultiSelect/SuiMultiSelect';
import suiPageTabBoxType from './SuiPageTabBoxType/SuiPageTabBoxType';
import suiPageTabStepType from './SuiPageTabStepType/SuiPageTabStepType';
import suiTabNavigator from './SuiTabNavigator/SuiTabNavigator';
import suiRadio from './SuiRadio/SuiRadio';
import suiTextarea from './SuiTextarea/SuiTextarea';
import suiTextField from './SuiTextField/SuiTextField';
import suiWebEditor from './SuiWebEditor/SuiWebEditor';
import suiYNSelect from './SuiYNSelect/SuiYNSelect';
import suiSGrid from './SuiSGrid/SuiSGrid';


export default {
  install(Vue) {
    Vue.component('sui-button', suiButton);
    Vue.component('sui-checkbox', suiCheckbox);
    Vue.component('sui-code-select', suiCodeSelect);
    Vue.component('sui-select-box', suiSelectBox);
    Vue.component('sui-file-uploader', suiFileUploader);
    Vue.component('sui-input-label', suiInputLabel);
    Vue.component('sui-label', suiLabel);
    Vue.component('sui-lang-select', suiLangSelect);
    Vue.component('sui-module-submodule-select', suiModuleSubmoduleSelect);
    Vue.component('sui-multi-select', suiMultiSelect);
    Vue.component('sui-page-tab-box-type', suiPageTabBoxType);
    Vue.component('sui-page-tab-step-type', suiPageTabStepType);
    Vue.component('sui-tab-navigator', suiTabNavigator);
    Vue.component('sui-radio', suiRadio);
    Vue.component('sui-textarea', suiTextarea);
    Vue.component('sui-text-field', suiTextField);
    Vue.component('sui-web-editor', suiWebEditor);
    Vue.component('sui-yn-select', suiYNSelect);
    Vue.component('sui-s-grid', suiSGrid);    
  },
};
