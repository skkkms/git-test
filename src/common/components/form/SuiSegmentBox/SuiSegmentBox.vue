<template>
  <div
    class="sui-segment-box"
    :class="{'sui-segment-box--disabled': disabled, 'sui-segment-box--mod': true}"
  >
    <div class="sui-segment-box__row">
      <div
        v-for="item in items"
        :key="item.key"
        class="sui-segment-box__item"
        :class="{'sui-segment-box__item--active': activekey === item.key}"
        @click="changeValue(item)"
      >
        <div
          v-if="item.label"
          class="sui-segment-box__item-text"
        >
          <span class="sui-segment-box__item-value">{{ item.label }}</span>
          <span class="sui-segment-box__item-subValue">{{ item.subLabel }}</span>
        </div>
        <div v-else>
          <div class="sui-segment-box__item-text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 이름 : SuiSegmentBox
 * 설명 : 버튼 그룹의 역할을 하는 컴포넌트
 * 최종 수정 일시 : 2018 - 11 - 16
 */
export default {
  name: 'SuiSegmentBox',
  props: {
    items: { type: Array, required: true }, // 버튼으로 표현될 전체 항목 array
    value: { type: Object }, // 선택된 항목 array (단건의 경우도 array형태로 넘김)
    multi: { type: Boolean, default: false }, // 다중선택
    disabled: { type: Boolean, default: false }, // 선택제한형
    essential: { type: Boolean, default: false }, // 최소1개 필수선택
    itemPerLine: { type: Number, default: 0 }, // 1 라인에 보여질 세그먼트 버튼 갯수
    itemWidth: { type: String }, // 한 버튼의 너비 지정자
  },
  data() {
    return {
      checkFlag: new Array(this.items.length).fill(false),
      activekey: this.value.key,
    }
  },
  methods: {
    setValue(value) {
      let target = null;
      this.items.forEach((item, index) => {
        if (item.key === value) {
          target = item;
        }
      });
      if (target) {
        this.changeValue(target);
      }
    },
    changeValue (item) { // 아이템 클릭시 불리는 매서드
      if (this.disabled) return;
      this.activekey = item.key;
      this.$emit('input', item);
      return;
    },
  },
  computed: {
    lineNumber () { // 한 라인에 몇개의 버튼이 있을지 정하는 것으로, 특별히 값이 들어오지 않는경우 전부 같은 라인에 표기한다.
      return this.itemPerLine || this.items.length;
    },
  },
};
</script>

<style scoped>
</style>
