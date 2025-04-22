<template>
  <sui-modal
    ref="modal"
    v-model="isModalShow"
    :prevent-outside-close="preventOutsideClose"
    modal-type="popup"
  >
    <div class="sui-popup__wrapper">
      <div class="sui-popup__title-area">
        <span class="sui-popup__title" @mousedown="onHeaderMouseDown" >{{title}}</span>
        <div class="sui-popup__close" v-if="!removeCloseButton">
          <button type="button" class="sui-popup__close-button" @click="onClose"></button>
        </div>
      </div>
      <div class="sui-popup__body-area popup-body-wrapper">
        <slot></slot>
      </div>
    </div>
  </sui-modal>
</template>

<script>
/**
 * 이름 : SuiPopup
 * 설명 : SuiModal을 기반으로 만든 팝업창 컴포넌트
 * 최종 수정 일시 : 2019 - 01 - 03
 */

import popupBase from '../SuiPopupMixin/SuiPopupMixin';

export default {
  name: 'SuiPopup',
  extends: popupBase,
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    preventOutsideClose: {
      type: Boolean,
      default: false
    },
    removeCloseButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isModalShow: this.value
    }
  },
  watch: {
    isModalShow (newValue) {
      this.$emit('input', newValue)
    },
    value () {
      this.isModalShow = this.value
    }
  },
  methods: {
    onClose () {
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped>

</style>
