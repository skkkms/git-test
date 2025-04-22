import SuiFrame from './SuiFrame/SuiFrame.vue';
import SuiGnb from './SuiGnb/SuiGnb.vue';
import SuiGnbMenu from './SuiGnbMenu/SuiGnbMenu.vue';
import SuiLnb from './SuiLnb/SuiLnb.vue';
import SuiLnbMenu from './SuiLnbMenu/SuiLnbMenu.vue';
import SuiLnbMenuItem from './SuiLnbMenuItem/SuiLnbMenuItem.vue';
import SuiPage from './SuiPage/SuiPage.vue';
import SuiPageCardFooter from './SuiPageCardFooter/SuiPageCardFooter.vue';
import SuiPageCardHeader from './SuiPageCardHeader/SuiPageCardHeader.vue';
import SuiPageContents from './SuiPageContents/SuiPageContents.vue';
import SuiPageFooter from './SuiPageFooter/SuiPageFooter.vue';
import SuiPageHeader from './SuiPageHeader/SuiPageHeader.vue';
import SuiPanel from './SuiPanel/SuiPanel.vue';
import SuiPanelNavigation from './SuiPanelNavigation/SuiPanelNavigation.vue';
import SuiPanelStickyButton from './SuiPanelStickyButton/SuiPanelStickyButton.vue';

export default {
  install(Vue) {
    Vue.component('sui-page', SuiPage);
    Vue.component('sui-page-header', SuiPageHeader);
    Vue.component('sui-page-footer', SuiPageFooter);
    Vue.component('sui-page-contents', SuiPageContents);
    Vue.component('sui-panel', SuiPanel);
    Vue.component('sui-page-card-header', SuiPageCardHeader);
    Vue.component('sui-page-card-footer', SuiPageCardFooter);
  },
};


