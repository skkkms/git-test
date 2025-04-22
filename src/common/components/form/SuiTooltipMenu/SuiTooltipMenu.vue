<template>
  <div :class="['sui-tooltip-menu', classes]" v-dropdown-click-outside="() => {tooltipStatus = false}">
    <button v-if="showButton" type="button" @click="tooltipClick" class="sui-tooltip-menu__activator">
      <slot></slot>
    </button>
    <div ref="menubox" class="sui-tooltip-menu__menubox" v-show="tooltipStatus">
      <ul class="sui-tooltip-menu__menu-list">
        <li v-for="menu in menuList" :key="menu.key" @click="menuClick(menu)" class="sui-tooltip-menu__menu-item">{{ menu.label }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * 이름 : suiTooltipMenu
 * 설명 : ul,li형으로 커스터마이즈 가능한 툴팁형 메뉴
 * 최종 수정 일시 : 2018 - 10 - 15
 */
export default {
  name: 'SuiTooltipMenu',
  directives: {
    // 툴팁 메뉴 외부를 선택하면 달력 끄는 동작 directive 연결
    'dropdown-click-outside': {
      bind: function (el, binding) {
        // Define Handler and cache it on the element
        const handler = (e) => {
          if ((!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
      },

      unbind: function (el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      }
    }
  },
  props: {
    value: { // 현재 선택된 메뉴 값
      type: String,
      default: ''
    },
    menuList: { // 선택 가능한 메뉴 목록
      type: Array,
      default: () => []
    },
    blue: { // blue컬러스타일 적용 여부
      type: Boolean,
      default: false
    },
    up: { // 위로펼침 여부
      type: Boolean,
      default: false
    },
    button: { // 버튼형 스타일 적용 여부
      type: Boolean,
      default: false
    },
    disabled: { // 선택 불가형 여부
      type: Boolean,
      default: false
    },
    showButton: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tooltipStatus: false // 툴팁 메뉴 목록 펼침 상태
    }
  },
  computed: {
    classes () { // 최상단 div에 적용될 스타일을 옵션에 따라 지정
      return {
        'sui-tooltip-menu--blue': this.blue,
        'sui-tooltip-menu--up': this.up,
        'sui-tooltip-menu--button': this.button,
        'sui-tooltip-manu--disabled': this.disabled
      }
    }
  },
  methods: {
    setStatus(status) {
      this.tooltipStatus = status;
      if (!status) {
        this.$emit('close');
      } else{
        this.$emit('open');
      }
    },
    tooltipClick () { // 툴팁영역 클릭 이벤트 발생시 선택불가형 여부에 따라 펼침 동작
      if (this.disabled) {
        return
      }
      this.setStatus(!this.tooltipStatus);
    },
    menuClick (menu) { // 메뉴 목록에서 항목 클릭 이벤트 발생시 현재 선택된 메뉴 값 변경 후 목록 닫힘 동작
      this.setStatus(!this.tooltipStatus);
      this.$emit('input', menu.key)      
    },
    activate() {
      this.setStatus(true);
    },
    deactivate() {
      this.setStatus(false);
    },
    getContentsHeight() {
      return this.menuList.length * 34 + 8; // TODO fix me
    }
  }
}

</script>

<style scoped>
</style>
