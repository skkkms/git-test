<template>
  <div class="-cell-label" :class="this.cellClassName" :style="widthStyle">
    <span ref="label" style='display: block' :title="label"> {{ label }}</span>
  </div>
</template>

<script>
/**
 * 이름 : CellDateLabel
 * 설명 : 그리드용 DateLabel
 * 최종 수정 일시 : 2019 - 12 - 23
 */
export default {
  name: 'CellDateLabel',
  props: {
    value: { type: [String, Object], default: '' },
    width: { type: String, default: '' },
    formatOption: { type: String, default: '' },
    cellClassName: { type: String, default: '' },
  },
  data() {
    return {
      realValue: this.value,
      label: utils.dateformatToClient(this.value, this.formatOption),
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
      this.label = utils.dateformatToClient(this.realValue, this.formatOption);
    },
    getValue() {
      return this.realValue;
    },
  },
};

</script>
<style scoped>  
</style>
