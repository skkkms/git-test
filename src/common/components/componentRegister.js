import Vue from "vue";
import SuiPage from "~common/components/layout/SuiPage/SuiPage";
import SuiPageHeader from "~common/components/layout/SuiPageHeader/SuiPageHeader";
import SuiPageFooter from "~common/components/layout/SuiPageFooter/SuiPageFooter";
import SuiPageContents from "~common/components/layout/SuiPageContents/SuiPageContents";
import SuiPanel from "~common/components/layout/SuiPanel/SuiPanel";
import SuiPageCardHeader from "~common/components/layout/SuiPageCardHeader/SuiPageCardHeader";
import SuiPageCardFooter from "~common/components/layout/SuiPageCardFooter/SuiPageCardFooter";
import SuiPageTabBoxType from "~common/components/form/SuiPageTabBoxType/SuiPageTabBoxType";
import SuiPageTabStepType from "~common/components/form/SuiPageTabStepType/SuiPageTabStepType";
import SuiSelectBox from "~common/components/form/SuiSelectBox/SuiSelectBox";
import SuiLangSelect from "~common/components/form/SuiLangSelect/SuiLangSelect";
import SuiCodeSelect from "~common/components/form/SuiCodeSelect/SuiCodeSelect";
import SuiCustomSelect from "~common/components/form/SuiCustomSelect/SuiCustomSelect";
import SuiModuleSubmoduleSelect from "~common/components/form/SuiModuleSubmoduleSelect/SuiModuleSubmoduleSelect";
import SuiYNSelect from "~common/components/form/SuiYNSelect/SuiYNSelect";
import SuiTree from "~common/components/form/SuiTree/SuiTree";
import SuiTreeGrid from "~common/components/form/SuiTreeGrid/SuiTreeGrid";
import SuiRadio from "~common/components/form/SuiRadio/SuiRadio";
import SuiTextField from "~common/components/form/SuiTextField/SuiTextField";
import SuiDatePicker from "~common/components/form/SuiDatePicker/SuiDatePicker";
import SuiRangeDatePicker from "~common/components/form/SuiRangeDatePicker/SuiRangeDatePicker";
import SuiTimePicker from "~common/components/form/SuiTimePicker/SuiTimePicker";
import SuiCheckbox from "~common/components/form/SuiCheckbox/SuiCheckbox";
import SuiPageCardContainer from "~common/components/form/SuiPageCardContainer/SuiPageCardContainer";
import SuiPageCard from "~common/components/form/SuiPageCard/SuiPageCard";
import SuiFileUploader from "~common/components/form/SuiFileUploader/SuiFileUploader";
import SuiMultiSelect from "~common/components/form/SuiMultiSelect/SuiMultiSelect";
import SuiMultiselectPopup from "~common/components/form/SuiMultiSelectPopup/SuiMultiSelectPopup";
import SuiInputLabel from "~common/components/form/SuiInputLabel/SuiInputLabel";
import SuiConfirm from "~common/components/form/SuiConfirm/SuiConfirm";
import SuiGridHeader from "~common/components/form/SuiGridHeader/SuiGridHeader";
import SuiGrid from "~common/components/form/SuiGrid/SuiGrid";
import SuiMessageBox from "~common/components/form/SuiMessageBox/SuiMessageBox";
import SuiComponentPortal from "~common/components/form/SuiComponentPortal/SuiComponentPortal";
import SuiPager from "~common/components/form/SuiPager/SuiPager";
import SuiPrompt from "~common/components/form/SuiPrompt/SuiPrompt";
import SuiPopup from "~common/components/form/SuiPopup/SuiPopup";
import SuiTabNavigator from "~common/components/form/SuiTabNavigator/SuiTabNavigator";
import SuiLnbTree from "~common/components/form/SuiLnbTree/SuiLnbTree";
import SuiMenuTree from "~common/components/form/SuiMenuTree/SuiMenuTree";
import SuiModal from "~common/components/form/SuiModal/SuiModal";
import SuiButton from "~common/components/form/SuiButton/SuiButton";
import SuiLabel from "~common/components/form/SuiLabel/SuiLabel";
import SuiLoadingIndicator from "~common/components/form/SuiLoadingIndicator/SuiLoadingIndicator";
import SuiFilterTreeview from "~common/components/form/SuiFilterTreeview/components/SuiTreeRoot";
import SuiTooltipMenu from "~common/components/form/SuiTooltipMenu/SuiTooltipMenu";
import SuiQuickLink from "~common/components/form/SuiQuickLink/SuiQuickLink";
import SuiNoticeController from "~common/components/form/SuiNoticeController/SuiNoticeController";
import SuiJqxGrid from "~common/components/form/SuiJqxGrid/SuiJqxGrid";
import SuiJqxTreeGrid from "~common/components/form/SuiJqxTreeGrid/SuiJqxTreeGrid";
import SuiTextarea from "~common/components/form/SuiTextarea/SuiTextarea";
import SuiValidator from "~common/components/form/SuiValidator/SuiValidator";
import SuiWebEditor from "~common/components/form/SuiWebEditor/SuiWebEditor";
import SuiDeviceCheckbox from "~common/components/form/SuiDeviceCheckbox/SuiDeviceCheckbox";
import SuiSelectPopup from "~common/components/form/SuiSelectPopup/SuiSelectPopup";
import SuiSGrid from "~common/components/form/SuiSGrid/SuiSGrid";
import SuiFlowChart from "~common/components/form/SuiFlowChart/views/SuiFlowChart";
import SuiWMDFlowChart from "~common/components/form/SuiWMDFlowChart/views/SuiWMDFlowChart";
import SuiPortalStudioCard from "~common/components/form/SuiPortalStudioCard/SuiPortalStudioCard";
import urPageContainer from './uidev/containers/page/urPageContainer';
import urBoxContainer from './uidev/containers/box/urBoxContainer';
import urListContainer from './uidev/containers/list/urListContainer';
import urTabsContainer from './uidev/containers/tab/urTabsContainer';
import urTabItemContainer from './uidev/containers/tab/urTabItemContainer';
import urFormItemContainer from './uidev/containers/form/urFormItemContainer';
import urText from './uidev/elements/text/urText';
import SuiFileDnButton from "~common/components/form/SuiFileDnButton/SuiFileDnButtonView";
import CellAttachFileButton from "./form/SuiCellAttachFileBtn/SuiCellAttachFileBtnView";
import CellPermissionCheckbox from "~common/components/gridCell/CellPermissionCheckbox/CellPermissionCheckboxView";	
import CellCheckbox from "~common/components/gridCell/CellCheckbox/CellCheckboxView.vue"
import CellDateLabel from "~common/components/gridCell/CellDateLabel/CellDateLabelView.vue";
import SuiSegmentBox from "./form/SuiSegmentBox/SuiSegmentBox";
import CellButtonList from "~common/components/gridCell/CellButtonList/CellButtonListView";
import CellButton from "~common/components/gridCell/CellStateButton/CellStateButtonView";
import CellBadge from "./gridCell/CellBadge/CellBadgeView";
import CellButtonView from "./gridCell/CellButton/CellButtonView";
import SuiRadioGroup from "./form/SuiRadio/SuiRadioGroup";




class ComponentRegister {
  constructor() {
    this.componentsMap = {};
    utils.install("getComponentByName", this.getComponentByName.bind(this));
    utils.install("registComponent", this.registComponent.bind(this));
  }

  getComponentByName(componentName) {
    return this.componentsMap[componentName];
  }

  registComponent(component) {
    this.componentsMap[component.name] = component;
  }

  registCommonComponents() {
    this.componentsMap["cell-button"]=CellButtonView;
    this.componentsMap["cell-badge"]=CellBadge;
   this.componentsMap["cell-state-button"]=CellButton;
    this.componentsMap["cell-button-list"]=CellButtonList;
    this.componentsMap["sui-segment-box"]=SuiSegmentBox;
    this.componentsMap["cmp-cell-checkbox"] = CellCheckbox;	
	  this.componentsMap["cmp-cell-date"] = CellDateLabel;
    this.componentsMap["cmp-cell-permission-check"] = CellPermissionCheckbox;	
    this.componentsMap["cell-attach-file-button"]=CellAttachFileButton;
    this.componentsMap["sui-file-dn-button"]=SuiFileDnButton;
    this.componentsMap["sui-button"] = SuiButton;
    this.componentsMap["sui-checkbox"] = SuiCheckbox;
    this.componentsMap["sui-code-select"] = SuiCodeSelect;
    this.componentsMap["sui-component-portal"] = SuiComponentPortal;
    this.componentsMap["sui-confirm"] = SuiConfirm;
    this.componentsMap["sui-custom-select"] = SuiCustomSelect;
    this.componentsMap["sui-date-picker"] = SuiDatePicker;
    this.componentsMap["sui-file-uploader"] = SuiFileUploader;
    this.componentsMap["sui-filter-treeview"] = SuiFilterTreeview;
    this.componentsMap["sui-grid"] = SuiGrid;
    this.componentsMap["sui-grid-header"] = SuiGridHeader;
    this.componentsMap["sui-input-label"] = SuiInputLabel;
    this.componentsMap["sui-jqx-grid"] = SuiJqxGrid;
    this.componentsMap["sui-jqx-tree-grid"] = SuiJqxTreeGrid;
    this.componentsMap["sui-label"] = SuiLabel;
    this.componentsMap["sui-lang-select"] = SuiLangSelect;
    this.componentsMap["sui-lnb-tree"] = SuiLnbTree;
    this.componentsMap["sui-loading-indicator"] = SuiLoadingIndicator;
    this.componentsMap["sui-menu-tree"] = SuiMenuTree;
    this.componentsMap["sui-message-box"] = SuiMessageBox;
    this.componentsMap["sui-modal"] = SuiModal;
    this.componentsMap["sui-module-submodule-select"] = SuiModuleSubmoduleSelect;
    this.componentsMap["sui-multi-select"] = SuiMultiSelect;
    this.componentsMap["sui-multi-select-popup"] = SuiMultiselectPopup;
    this.componentsMap["sui-notice-controller"] = SuiNoticeController;
    this.componentsMap["sui-page-card"] = SuiPageCard;
    this.componentsMap["sui-page-card-container"] = SuiPageCardContainer;
    this.componentsMap["sui-pager"] = SuiPager;
    this.componentsMap["sui-page-tab-box-type"] = SuiPageTabBoxType;
    this.componentsMap["sui-page-tab-step-type"] = SuiPageTabStepType;
    this.componentsMap["sui-popup"] = SuiPopup;
    this.componentsMap["sui-prompt"] = SuiPrompt;
    this.componentsMap["sui-quick-link"] = SuiQuickLink;
    this.componentsMap["sui-radio"] = SuiRadio;
    this.componentsMap["sui-range-date-picker"] = SuiRangeDatePicker;
    this.componentsMap["sui-select-box"] = SuiSelectBox;
    this.componentsMap["sui-tab-navigator"] = SuiTabNavigator;
    this.componentsMap["sui-textarea"] = SuiTextarea;
    this.componentsMap["sui-text-field"] = SuiTextField;
    this.componentsMap["sui-time-picker"] = SuiTimePicker;
    this.componentsMap["sui-tooltip-menu"] = SuiTooltipMenu;
    this.componentsMap["sui-tree-grid"] = SuiTreeGrid;
    this.componentsMap["sui-tree"] = SuiTree;
    this.componentsMap["sui-web-editor"] = SuiWebEditor;
    this.componentsMap["sui-yn-select"] = SuiYNSelect;
    this.componentsMap["sui-validator"] = SuiValidator;
    this.componentsMap["sui-device-checkbox"] = SuiDeviceCheckbox;
    this.componentsMap["sui-select-popup"] = SuiSelectPopup;
    this.componentsMap["sui-s-grid"] = SuiSGrid;
    this.componentsMap["sui-flow-chart"] = SuiFlowChart;
    this.componentsMap["sui-wmd-flow-chart"] = SuiWMDFlowChart;
    this.componentsMap["sui-portal-studio-card"] = SuiPortalStudioCard;
    // layout
    this.componentsMap["sui-page"] = SuiPage;
    this.componentsMap["sui-page-header"] = SuiPageHeader;
    this.componentsMap["sui-page-footer"] = SuiPageFooter;
    this.componentsMap["sui-page-contents"] = SuiPageContents;
    this.componentsMap["sui-panel"] = SuiPanel;
    this.componentsMap["sui-page-card-header"] = SuiPageCardHeader;
    this.componentsMap["sui-page-card-footer"] = SuiPageCardFooter;
    this.componentsMap["sui-radio-group"] = SuiRadioGroup;

    // grid cell component
    // this.componentsMap["sui-grid-cell-label"] = CellLabel;
    // UI Dev IDE
        this.componentsMap["ur-page-container"] = urPageContainer;
    this.componentsMap["ur-box-container"] = urBoxContainer;
    this.componentsMap["ur-list-container"] = urListContainer;
    this.componentsMap["ur-tabs-container"] = urTabsContainer;
    this.componentsMap["ur-tab-item-container"] = urTabItemContainer;
    this.componentsMap["ur-form-item-container"] = urFormItemContainer;
    this.componentsMap["ur-text"] = urText;


    _.forEach(this.componentsMap, (component, name) => {
      Vue.component(name, component);
    });
  }
}

export default new ComponentRegister();
