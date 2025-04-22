<template>
<div class="sui-tab-box-type">
  <ul ref="scrollContainer" class="sui-tab-box-type__header">
    <div class="sui-tab-box-type__header__wrap">
      <div ref="scrollContent" class='sui-tab-box-type__header__container' :style="translateXStyle">
        
         <li v-for="(item,idx) in tabItems" :key="idx" @click="changeIdx(idx)" :class="{'sui-tab-box-type--active':currentTabIndex == idx, 'sui-tab-box-type--checked':item.checked}" :title="item.tabTitle" class="sui-tab-box-type__header-item">
           <span class="sui-tab-box-type__header-item__title">{{item.tabTitle}}</span>
         </li>
       
      </div>
    </div>
    <sui-tab-navigator ref="navigator" 
      v-model="translateX"
      :containerWidth="containerWidth"
      :contentWidth="contentWidth"
      :contentElement="contentElement"
      :controllerWidth="controllerWidth"
      :refresh="refresh"
    >
    </sui-tab-navigator>
  </ul>
  <div v-if="currentTabIndex !==-1" class="sui-tab-box-type__cont">
    <keep-alive>
      <slot></slot>
    </keep-alive>
  </div>
</div>
</template>

<script>
import utils from '../util';
/**
 * 이름 : SuiPageTabBoxType
 * 설명 : 박스모양으로 인덱스를 가지는tab 으로, 내부 내용에 대해 체크가 완료되면 인덱스에 완료표기가 된다.
 */
export default {
  name: 'SuiPageTabBoxType',
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
      currentTabIndex: -1,
      translateX: 0,
      containerWidth: 1,
      contentWidth: 1,
      contentElement: null,
      controllerWidth: 72,
    }
  },
  computed: {
    translateXStyle() {
      if (this.translateX === 0) {
        return `transform: translateX(${this.translateX}px)`;
      }
      return `transform: translateX(${this.translateX + 1}px)`;
    },
  },
  watch: {
    tabItems() {
      this.refresh();
    }
  },
  mounted() {
    if (this.defaultTabIndex >= 0) {
      this.changeIdx(this.defaultTabIndex);
    }
    this.refresh();
    this.$root.$on('frame-resize', this.refresh);
    this.contentElement = this.$refs.scrollContent;
  },
  methods: {
    loadTabComponent(component) {
      if (!component) {
        return;
      }
      if (this.isPageComponent(component)) {
        //utils.loadPageMeta(component).then(meta=> {
          this.setCurrentTabComponent(component);
          this.$nextTick(()=>{
            this.$emit('component-changed', component);
          })
        //}).catch(error => {

        //})
      } else {
        this.setCurrentTabComponent(component);
        this.$nextTick(()=>{
          this.$emit('component-changed', component);
        })
      }
    },
    changeIdx(idx) {
      if (this.stopTabMove.status) {
        //utils.messageBox('warning', this.stopTabMove.message, null, null);
        return false;
      }
      if (this.currentTabIndex !== idx && idx < this.tabItems.length) {
        this.currentTabIndex = idx;
        if (idx >= 0) {
          this.loadTabComponent(this.tabItems[this.currentTabIndex].component);
          this.$emit('change-tab-idx', idx);
          this.refresh(true);
          this.$refs.navigator.reveal(idx);
        }        
      }
    },
    select(idx) {
      this.changeIdx(idx);
    },
    isPageComponent(component) {
      if (typeof component === 'string' && component.length === 13) {
        const splittedStr = component.split('_');
        if (splittedStr.length === 3 && splittedStr[0] === 'PGE') {
           return true;
        }
      }
      return false;
    },
    getSelectedIndex() {
      return this.currentTabIndex;
    },
    refresh(force = false) {
      if (force) {
        this.containerWidth = parseInt(this.$refs.scrollContainer.getBoundingClientRect().width, 10);
        this.contentWidth = parseInt(this.$refs.scrollContent.getBoundingClientRect().width, 10);
      } else {
        this.$nextTick(() =>{
          this.containerWidth = parseInt(this.$refs.scrollContainer.getBoundingClientRect().width, 10);
          this.contentWidth = parseInt(this.$refs.scrollContent.getBoundingClientRect().width, 10);
        });
      }
    },    
  },
  beforeDestroy() {
    this.$root.$off('frame-resize', this.onFrameResize);
  },
}
</script>

<style>
</style>
