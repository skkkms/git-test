<template>
  <div
    class="sui-label"
    :style="{ width: `${width}px` }"
  >
    <span :class="{ 'sui-label__star': required }" />
    <div :class="secondLine? 'sui-label__multiline' : ''">
      <span
        v-show="firstLine"
        ref="label"
        class="sui-label__firstline"
        :title="label"
      >
        {{ firstLine }}
      </span>
      <span
        v-show="secondLine"
        class="sui-label__secondline"
        :title="label"
      >
        {{ secondLine }}
      </span>
    </div>
  </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers';

/**
 * 이름 : suiLabel
 * 설명 : 라벨 컴포넌트 (format과 두 줄 표현 지원)
 * 최종 수정 일시 : 2018 - 09 - 04
 */
export default {
  name: 'SuiLabel',
  props: {
    label: { type: String, default: '' },
    width: { type: String, default: '100%' },
    format: { type: String, default: '' }, // ['currency']
    required: { type: Boolean, default: false },
  },
  data() {
    return {
      firstLine: null,
      secondLine: null,
    };
  },
  computed: {
    widthStyle() {
      return {
        width: this.width || '100%',
      };
    },
    realText() {
      if (this.format === 'currency') {
        return utils.numberFormat(this.label);
      }
      return this.label;
    },
  },
  watch: {
    realText() {
      this.splitLine();
    },
  },
  mounted() {
    // console.log(this.realText);
    this.refresh();
    this.realTextFontSize = this.$refs.label.style.fontSize;
    // this.splitLine();
    this.$root.$on('frame-resize', this.splitLine);
  },
  beforeDestroy() {
    this.$root.$off('frame-resize', this.splitLine);
  },
  methods: {
    refresh() {
      this.$nextTick(() => {
        this.initSplitLine();
      });
    },
    initSplitLine() {
      if (this.$el.parentElement && this.$el.parentElement.clientWidth) {
        this.splitLine();
        return;
      }
      this.intervalId = setInterval(() => { // parent element가 보이는 시점까지 대기, 그리드 헤더인 경우 이렇게 하지 않으면 보이지 않음
        if (!this.$el.parentElement) {
          clearInterval(this.intervalId);
        }
        if (this.$el.parentElement && this.$el.parentElement.clientWidth) {
          clearInterval(this.intervalId);
          this.splitLine();
        }
      }, 500);
    },
    splitLine() {
      // const parentWidth = this.$el.parentElement.clientWidth;
      const parentWidth = this.$el.clientWidth;
      let splitIndex = -1;
      const { fontSize } = window.getComputedStyle(this.$el);
      for (let i = 1; i <= this.realText.length; i += 1) {
        const el = document.createElement('label');
        // el.style.fontSize = this.realTextFontSize; // TODO FIXME
        el.style.fontSize = fontSize;
        const str = this.realText.substr(0, i);
        document.body.append(el);
        el.innerText = str;
        if (el.getBoundingClientRect().width > parentWidth) {
          el.remove();
          break;
        }
        splitIndex = i;
        el.remove();
      }
      if (splitIndex < this.realText.length) {
        this.firstLine = this.realText.substr(0, splitIndex);
        const secondCount = this.realText.length - splitIndex;
        const el = document.createElement('label');
        const str = this.realText.substr(splitIndex, secondCount);
        document.body.append(el);
        el.innerText = str;
        if (el.getBoundingClientRect().width > parentWidth) {
          const el = document.createElement('label');
          document.body.append(el);
          for (let idx = 1; idx <= secondCount; idx += 1) {
            const str = `${this.realText.substr(splitIndex, secondCount - idx)}...`;
            el.innerText = str;
            if (el.getBoundingClientRect().width < parentWidth) {
              this.secondLine = str;
              break;
            }
          }
          el.remove();
        } else {
          this.secondLine = this.realText.substr(splitIndex, secondCount);
        }
        el.remove();
      } else {
        this.firstLine = this.realText;
        this.secondLine = null;
      }
    },
  },
};
</script>

<style scoped>

</style>
