<template>
  <div class="sui-input-label" :class="classes" :style="widthStyle">
    <span :class="{'sui-input-label__star':required}"></span>
    <span :class="{'sui-input-label__starB':optional}"></span>
    <span>
      <label v-if="mask" ref="label" style='display: block' :title="tooltip? tooltip:realText" :class="labelClasses"> {{ realText }}</label>
      <label v-else ref="label" style='display: block' :title="tooltip? tooltip:label" :class="labelClasses"> {{ label }}</label>
    </span>
    <slot class="sui-input-label__icon"></slot>
  </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers';
import utils from '../util';
// const isMultiLine = () => { 
//   // return utils.getConfigurationValue('CFG_CMZ_LABLE_MULTI_LINE_YN') === 'Y';
//   return false;
// };
/**
 * 이름 : SuiInputLabel
 * 설명 : input 용 라벨 컴포넌트
 * 최종 수정 일시 : 2018 - 08 - 13
 */
export default {
  name: 'SuiInputLabel',
  props: {
    label: { type: String, default: '' },
    required: {type: Boolean, default: false},
    optional: {type: Boolean, default: false},
    vertical: {type: Boolean, default: false},
    width: { type: String, default: '' },
    mask: { type: String, default: ''},
    tooltip: { type: String, default: null },
  },
  computed: {
    classes () {
      return [
        {'sui-input-label--vertical': this.vertical}
      ]
    },
    widthStyle () {
      if (this.width !== '') { return {'width': this.width} }
    },
    realText () {
      if (this.mask === 'currency') {
        return utils.numberWithCommas(this.label);
      }
      return this.label;
    },
    labelClasses() {
      return [
        { 'sui-input-label__label--ellipsis': true },
      ];
    },
  },
  // watch: {
  //   realText() {
  //     if (this.isMultiLine) {
  //       this.splitLine();
  //     }
  //   },
  // },
  mounted() {
    // this.refresh();
    // this.realTextFontSize = this.$refs.label.style.fontSize;
    // if (this.isMultiLine) {
    //   this.$root.$on('frame-resize', this.splitLine);
    // }
  },
  data() {
    return {
      // isMultiLine: isMultiLine(),
      // firstLine : this.mask === 'currency' ? utils.numberWithCommas(this.label): this.label,
      // secondLine : null,
      // labelFontSize : '',
    };
  },
  // methods: {
  //   refresh() {
  //     if (this.isMultiLine) {
  //       this.$nextTick(()=>{
  //         this.initSplitLine();
  //       });
  //     }
  //   },
  //   initSplitLine() {
  //     if (this.$el.parentElement && this.$el.parentElement.clientWidth) {
  //       this.splitLine();
  //       return;
  //     }
  //     this.intervalId = setInterval(() => { // parent element가 보이는 시점까지 대기, 그리드 헤더인 경우 이렇게 하지 않으면 보이지 않음
  //       if (!this.$el.parentElement) {
  //         clearInterval(this.intervalId);
  //       }
  //       if (this.$el.parentElement && this.$el.parentElement.clientWidth) {
  //         clearInterval(this.intervalId);
  //         this.splitLine();
  //       }
  //     }, 500)
  //   },
  //   splitLine() {
  //     // const parentWidth = this.$el.parentElement.clientWidth;
  //     const parentWidth = this.$el.clientWidth;
  //     const els = [];
  //     let splitIndex = -1;
  //     const fontSize = window.getComputedStyle(this.$el).fontSize;
  //     for (let i = 1; i <= this.realText.length; i++) {
  //       const el = document.createElement('label');
  //       // el.style.fontSize = this.realTextFontSize; //TODO FIXME
  //       el.style.fontSize = fontSize;
  //       const str = this.realText.substr(0, i);
  //       document.body.append(el);
  //       el.innerText = str;
  //       if (el.getBoundingClientRect().width > parentWidth) {
  //         el.remove();
  //         break;
  //       }
  //       splitIndex = i;
  //       el.remove();
  //     }
  //     if (splitIndex < this.realText.length) {
  //       this.firstLine =  this.realText.substr(0, splitIndex);
  //       const secondCount = this.realText.length - splitIndex;
  //       const el = document.createElement('label');
  //       const str = this.realText.substr(splitIndex, secondCount);
  //       document.body.append(el);
  //       el.innerText = str;
  //       if (el.getBoundingClientRect().width > parentWidth) {
  //         const el = document.createElement('label');
  //         document.body.append(el);
  //         for (let idx = 1; idx <= secondCount; idx++) {
  //           const str = `${this.realText.substr(splitIndex, secondCount - idx)}...`
  //           el.innerText = str;
  //           if (el.getBoundingClientRect().width < parentWidth) {
  //             this.secondLine = str;
  //             break;
  //           }
  //         }
  //         el.remove();
  //       } else {
  //         this.secondLine = this.realText.substr(splitIndex, secondCount);
  //       }
  //       el.remove();
  //     } else {
  //       this.firstLine = this.realText;
  //       this.secondLine = null;
  //     }
  //   },    
  // },
  // beforeDestroy() {
  //   if (this.isMultiLine) {
  //     // this.$root.$off('frame-resize', this.splitLine);
  //   }
  // }
}
</script>
<style scoped>
</style>
