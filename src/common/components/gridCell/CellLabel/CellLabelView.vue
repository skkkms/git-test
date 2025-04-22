<template>
  <div class="-cell-label" :style="widthStyle">
    <span :class="{'sui-input-label__star':required}"></span>
    <span ref="label" style='display: block' :title="tooltip? tooltip:label"> {{ label }}</span>
  </div>
</template>

<script>
/**
 * 이름 : cell-label
 * 설명 : 그리드용 label
 * 최종 수정 일시 : 2019 - 11 - 20
 */
export default {
  name: 'CellLabel',
  props: {
    value: { type: [String, Object], default: '' },
    type: {
      type: String,
      default: null,
    },
    required: { type: Boolean, default: false },
    width: { type: String, default: '' },
  },
  data() {
    return {
      realValue: this.value,
      label: this.value.constructor.name === 'String'? this.value:this.value.text,
      tooltip: this.value.constructor.name === 'String'? this.value:this.value.tooltip,
    };
  },
  computed: {
    widthStyle() {
      if (this.width !== '') { return { width: this.width }; }
      return '';
    },
  },
  watch: {
    value() {
      this.setValue(this.value);
    },
  },
  methods: {
    setValue(value) {
      this.realValue = value;
      this.setDefaultValue();
    },
    setDefaultValue() {
      if (this.realValue.constructor.name === 'String') {
        this.tooltip = this.realValue;
        this.label = this.tooltip;
      } else {
        this.label = this.realValue.text;
        this.tooltip = this.realValue.tooltip;
      }
    },
    getValue() {
      return this.realValue;
    },
  },
};

</script>
<style scoped>
</style>
