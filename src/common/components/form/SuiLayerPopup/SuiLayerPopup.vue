<template>
  <sui-modal
    v-model="isModalShow"
    :prevent-outside-close="preventOutsideClose"
    modal-type="popup"    
    ref="modal"
  >
    <div class="-page-popup__wrapper">
      <div class="-page-popup__title-area" >
        <h1 class="-page-popup__title" @mousedown="onHeaderMouseDown">
          {{ title }}
          <span
            v-if="getConfigValue('CFG_CMU_PAGE_ID_DISP_YN') === 'Y' && pageInitialData && pageInitialData.callingPageId"
            style="color:white"
          >
            &nbsp;&nbsp;{{ `  ${pageInitialData.callingPageId}` }}
          </span>
        </h1>
        <div
          v-if="!removeCloseButton"
          class="-page-popup__close"
        >
          <button
            type="button"
            class="-page-popup__close-button"
            @click="onClose"
          />
        </div>
      </div>
      <div
        class="-page-popup__contents popup-body-wrapper"
        :class="contentClass"
        :style="contentStyle"
        ref="container"
      >
        <component
          :is="component"
          ref="contents"
          :pageInitialData="pageInitialData"
          :closePagePopup="onClose"
        />
      </div>
    </div>
  </sui-modal>
</template>

<script>
import popupMixin from '../SuiPopupMixin/SuiPopupMixin';

export default {
  name: 'SuiLayerPopup',  
  extends: popupMixin,
  props: {
    pageComponent: {
      type: [Function, Object],
    },
    size: {
      type: String,
      default() {
        return 'lg';
      },
    },
    title: {
      type: String,
      default() {
        return '';
      },
    },
    pageInitialData: {
      type: Object,
    },
    closeCallback: {
      type: Function,
    },
    width: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      showPopup: true,
      value: false,
      preventOutsideClose: false,
      removeCloseButton: false,
      isModalShow: true,
      component: this.pageComponent,      
    };
  },
  
  computed: {
    contentClass() {
      return {
        '-page-popup__contents-small': this.size === 'sm',
        '-page-popup__contents-middle': this.size === 'md',
        '-page-popup__contents-large': this.size === 'lg',
        '-page-popup__contents-xlarge': this.size === 'xlg',
      };
    },
    contentStyle() {
      if (this.width && this.height) {
        return `width: ${this.width}; height: ${this.height}`;
      } else if (this.width) {
        return `width: ${this.width}`;
      } else if (this.height) {
        return `height: ${this.height}`;
      }
    },
  },

  methods: {
    onClose(data) {
      if (this.closeCallback) {
        this.closeCallback(data);
      }
    },
    getConfigValue(cfgId) {
      return utils.getConfigurationValue(cfgId);
    },
  },
};

</script>

<style>
</style>
