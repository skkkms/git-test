<template>
  <div
    class="sui-panel"
    :class="classes"
    v-show="isShow"
  >
    <div class="sui-panel__header-wrapper" >
      <div class="sui-panel__header-title-wrapper" @click="onClickCollapsedToggleButton()" >
        <span
          v-if="required"
          class="sui-panel__header-required-icon"
        />
        <h1 class="sui-panel__header-title">
          {{ title }}
        </h1>
      </div>
      <div
        v-if="hasCustomTitle"
        class="sui-panel__header-title-custom"
      >
        <slot name="custom" />
      </div>
      <div class="sui-panel__header-button-wrapper"  @click.self="onClickCollapsedToggleButton()">
        <button
          type="button"
          :class="['sui-panel__header-button',
                   isCollapsed ? 'sui-panel-navigation__button-collapsed' : 'sui-panel-navigation__button-expanded']"
          @click.stop="onClickCollapsedToggleButton()"
        />
      </div>
    </div>
    <div
      v-show="!isCollapsed"
      class="sui-panel__contents-wrapper"
    >
      <slot />
    </div>
  </div>
</template>

<script>
// 컴포넌트 태그 이름
const COMPONENT_TAG_NAME_PAGE = 'sui-page';
const COMPONENT_TAG_NAME_PAGE_CONTENTS = 'sui-page-contents';
const COMPONENT_TAG_NAME_PAGE_FOOTER = 'sui-page-footer';

// 패널 박스 타입.
const PANEL_BOX_TYPE_RED = 'red';
const PANEL_BOX_TYPE_BLACK = 'black';

export default {
  name: 'SuiPanel',

  props: {
    title: {
      type: String,
      required: true,
    },

    // eslint-disable-next-line max-len
    // 별도 패널 테두리 박스에 대한 타입: ['red', 'black']
    panelBoxType: {
      type: String,
      default: null,
    },

    sticky: {
      type: Boolean,
      default: false,
    },

    required: { // NOTE: S-EHS용. 필수 입력 패널에 대한 구분.
      type: Boolean,
      default: false,
    },

    isShow: {
      type: Boolean,
      default: true,
    },

    isClosed: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isCollapsed: false,

      // page component
      pageComponent: null,

      // page contents component
      pageContentsComponent: null,

      // page footer component
      pageFooterComponent: null,

      // Title String 외 다른 표현할 것들이 있는지.
      hasCustomTitle: null,
    };
  },

  computed: {
    classes() {
      return [
        { 'sui-panel-box-type--red': this.panelBoxType === PANEL_BOX_TYPE_RED },
        { 'sui-panel-box-type--black': this.panelBoxType === PANEL_BOX_TYPE_BLACK },
        { 'sui-panel-required': this.required },
      ];
    },
  },

  watch: {
    isShow() {
      if (this.isShow) {
        this.show();
      } else {
        this.hide();
      }
    }
  },

  mounted() {
    if (this.isClosed === true) {
      this.isCollapsed = true;
    }
    this.setHasCustomTitle();
    this.setPageLayoutComponent();
    this.registerPageContent();
    this.registerNavigationButton();
    if (this.sticky) {
      this.registerStickyFooterButton();
    }
  },

  methods: {
    setHasCustomTitle() {
      this.hasCustomTitle = !_.isEmpty(this.$slots.custom);
    },

    _findComponent() {
      let currentComponent = this;
      while (currentComponent) {
        if (currentComponent.$options._componentTag === COMPONENT_TAG_NAME_PAGE) {
          return currentComponent;
        }
        currentComponent = currentComponent.$parent;
      }
      return null;
    },

    onClickCollapsedToggleButton() {
      if (this.isClosed !== true) {
        this.isCollapsed = !this.isCollapsed;
      }
    },

    setPageLayoutComponent() {
      // page component
      this.pageComponent = this._findComponent();

      // page contents
      const pageContentsComponent = _.filter(this.pageComponent.$children, component => {
        if (component.$options._componentTag === COMPONENT_TAG_NAME_PAGE_CONTENTS) {
          return component;
        }
        return null;
      });
      [this.pageContentsComponent] = pageContentsComponent;

      // page footer
      const pageFooterComponent = _.filter(this.pageComponent.$children, component => {
        if (component.$options._componentTag === COMPONENT_TAG_NAME_PAGE_FOOTER) {
          return component;
        }
        return null;
      });
      [this.pageFooterComponent] = pageFooterComponent;
    },

    registerNavigationButton() {
      this.pageContentsComponent.$refs.navigation.register(this.title, this.panelBoxType, this.reveal, this.isShow);
    },

    show() {
      this.pageContentsComponent.$refs.navigation.show(this.reveal);
    },

    hide() {
      this.pageContentsComponent.$refs.navigation.hide(this.reveal);
    },

    registerStickyFooterButton() {
      // FIXME: sticky 버튼 사용 안함.
      // register
      // this.pageFooterComponent.register(this.title, this.reveal);
    },

    registerPageContent() {
      // register
      this.pageContentsComponent.registerPanelItems(this);
    },

    reveal() {
      const el = this.$el;
      if (el && el.parentElement && el.parentElement.parentElement) {
        const bounds = this.$el.getBoundingClientRect();
        const parentBounds = this.$el.parentElement.getBoundingClientRect();
        const ppElem = el.parentElement.parentElement;
        ppElem.style.scrollBehavior = 'smooth';
        ppElem.scrollTop = bounds.top - parentBounds.top;
      }
    },
  },
};
</script>

<style scoped>
</style>
