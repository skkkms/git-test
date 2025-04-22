<template>  
    <div v-if="value" class="sui-modal" v-modal-auto-set-z-index name="sui-modal" @touchstart="getTouchEvent">
      <div class="sui-modal__background" @click="onClose('outside')"></div>
      <div class="sui-modal__container">
        <div class="sui-modal__contents">
          <slot></slot>
        </div>
      </div>
    </div>  
</template>
<script>
/**
 * 이름 : SuiModal
 * 설명 : 화면 위에 다른 화면을 띄우는 컴포넌트. SuiConfirm과 SuiPopup의 기반 컴포넌트
 * 최종 수정 일시 : 2019 - 01 - 15
 */
export default {
  name: 'SuiModal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    quit: { // X버튼 사용 여부
      type: Boolean,
      default: false
    },
    preventOutsideClose: {
      type: Boolean,
      default: false
    },
    modalType: { // SuiPopup일 때 사용하기 위한 구분자
      type: String,
      default: ''
    },
    movable: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    onClose (param) {
      if (param === 'outside' && this.preventOutsideClose) {
        return
      }
      this.$emit('input', !this.value)
    },
    getTouchEvent (e) {
      e.stopPropagation() // SuiModal에서 발생한 터치이벤트를 하위 요소(부모)에 전달하지 않기 위해.(예: fdpSwipeTab)
    }
  },
  directives: {
    'modal-auto-set-z-index': { // 동시에 뜨는 SuiModal의 z-index 정리
      bind: function (el, binding, vnode) {
        let createdModal = document.getElementsByName('sui-modal')
        let maxZIndex = 1000;
        for (var i = 0, len = createdModal.length; i < len; i++) {
          maxZIndex = (maxZIndex < createdModal[i].style.zIndex) ? createdModal[i].style.zIndex : maxZIndex
        }
        if (vnode.context.$props.modalType === 'popup') { // SuiPopup일 경우 fdpConfirm보다 아래 뜨게 하기 위해 100 낮춰서 시작
          maxZIndex = maxZIndex - 100
        }
        el.style.zIndex = Number(maxZIndex) + 2
      }
    }
  }
}
</script>

<style>
</style>
