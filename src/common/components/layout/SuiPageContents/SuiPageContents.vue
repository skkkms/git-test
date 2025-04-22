<template>
  <div class="-page-contents">
    <div
      ref="pageContentsTop"
      class="-page-contents__top-wrapper"
    >
      <slot
        ref="pageContentsSlot"
        name="top"
      />
     
      <sui-panel-navigation
        v-show="panelItems.length >= 2"
        ref="navigation"
        class="-page-contents__navigation-wrapper"
      />
    </div>
    <div
      ref="pageContentsBody"
      class="-page-contents__wrapper"
    >
      <div class="-page-contents__scroll">
        <slot />
      </div>
      <div class="-page-contents__scroll__handle">
      </div>
    </div>
  </div>
</template>

<script>
import SuiPanelNavigation from '../SuiPanelNavigation/SuiPanelNavigation';

const PAGE_CLASS_NAME = '-page';
const PAGE_ROOT_CLASS_NAME = '-page-root-container';
const PAGE_POPUP_CONTENTS_CLASS_NAME = '-page-popup__contents';
const COMPONENT_TAG_NAME_PAGE = 'sui-page';

export default {
  name: 'SuiPageContents',

  components: {
    SuiPanelNavigation,
  },

  data() {
    return {
      // Panel Items.
      panelItems: [],

      // Process Tab Items.
      pTab: null,
      pTabItems: [],
      pTabDefaultIndex: 0,

      hasTopContents: false,

      // page component
      pageComponent: null,
    };
  },

  mounted() {
    // page component
    this.pageComponent = this._findComponent();

    this.$nextTick(() => {
      // page-contents 에서 고정 top 영역을 갖는지 여부
      this.hasTopContents = (this.panelItems.length >= 2) || this.$slots.top;
      if (this.hasTopContents) {
        this.pageComponent.toggleNavigator(true);
      }
    });
  },

  methods: {
    registerPanelItems(component) {
      if (component) {
        this.panelItems.push(component);
      }
    },

    _isPageRoot(element) {
      if (!element) {
        return false;
      }
      return _.some(element.classList, className => {
        if (className === PAGE_CLASS_NAME
          || className === PAGE_POPUP_CONTENTS_CLASS_NAME
          || className === PAGE_ROOT_CLASS_NAME
        ) {
          return true;
        }
        return false;
      });
    },

    _findComponent() {
      let currentComponent = this;
      while (currentComponent) {
        if (currentComponent.$options._componentTag === COMPONENT_TAG_NAME_PAGE
         && this._isPageRoot(currentComponent.$el)
        ) {
          return currentComponent;
        }
        currentComponent = currentComponent.$parent;
      }
      return null;
    },
  },
};
</script>

<style scoped>
</style>
