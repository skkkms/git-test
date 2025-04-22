<template>
  <div class="sui-tab-box-type sui-tab-step-type">
    <div class="-process-tab-items">
      <ul class="-process-tab-item__wrapper">
        <li
          v-for="(item, idx) in tabItems"
          :key="idx"
          :class="{'-process-tab-items__active':currentTabIndex === idx}"
          class="-process-tab-item"
          :title="item.tabTitle"
          @click="changeIdx(idx)"
        >
          <strong class="-process-tab-item__title">{{ item.tabTitle }}</strong>
          <span class="-process-tab-item__count">{{ item.count }}</span>
          <span
            v-show="idx < (tabItems.length - 1)"
            class="-process-tab-item__image"
          />
        </li>
      </ul>
    </div>
    <div v-if="currentTabIndex !==-1" class="sui-tab-box-type__cont sui-tab-step-type__cont">
      <keep-alive>
        <slot></slot>
      </keep-alive>
    </div>
  </div>
</template>

<script>
/**
 * 이름 : SuiPageTabStepType
 * 설명 : 스텝모양으로 인덱스를 가지는tab 으로, 내부 내용에 대해 체크가 완료되면 인덱스에 완료표기가 된다.
 */
export default {
  name: 'SuiPageTabStepType',
  props: {
    defaultTabIndex: {
      type: Number,
      default: -1
    }, // 최초 선택된 탭 인덱스 번호 (default: -1 미선택)
    tabItems: {
      type: Array,
      required: true
    }, // tabTitle: 탭 제목, tabSubTitle: 탭 부제목, checked: 탭 체크 상태 , component: 탭 컨텐츠 컴포넌트
    setCurrentTabComponent: {
      type: Function,
    }, // 현재 선택될 component를 설정하는 함수, slot 내부에 접근이 불가하기 때문에 외부에서 넘겨줘야 함
    stopTabMove: {
      type: Object,
      default: () => ({
        status: false,
        message: '',
      })
    },
  },
  data: function() {
    return {
      currentTabIndex: -1
    }
  },
  mounted() {
    if (this.defaultTabIndex >= 0) {
      this.changeIdx(this.defaultTabIndex);
    }
  },
  methods: {
    loadTabComponent(component) {
      if (!component) {
        return;
      }
      if (this.isPageComponent(component)) {
        utils.loadPageMeta(component).then(meta=> {
          this.setCurrentTabComponent(component);
        }).catch(error => {

        })
      } else {
        this.setCurrentTabComponent(component);
      }
    },
    changeIdx(idx) {
      if (this.stopTabMove.status) {
        utils.messageBox('warning', this.stopTabMove.message, null, null);
        return false;
      }
      if (this.currentTabIndex !== idx && idx < this.tabItems.length) {
        this.currentTabIndex = idx;
        if (idx >= 0) {
          this.loadTabComponent(this.tabItems[this.currentTabIndex].component);
        }
        this.$emit('change-tab-idx', idx);
      }
    },
    isPageComponent(component) {
      if (typeof component === 'string' && component.length === 13) {
        const splittedStr = component.split('_');
        if (splittedStr.length === 3 && splittedStr[0] === 'PGE') {
          return true;
        }
      } else {
        // console.log(component);
      }
      return false;
    },
    getSelectedIndex() {
      return this.currentTabIndex;
    },
  }
}
</script>
<style scoped>
</style>
