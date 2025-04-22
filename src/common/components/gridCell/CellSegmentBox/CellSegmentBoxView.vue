<template>
  <div v-show="visibility" class='-grid-cell-component'>
    <cell-label v-show='!editable' :value="activekey" />
    <div v-show="editable" class="sui-segment-box"
         :class="{'sui-segment-box--disabled': disabled, 'sui-segment-box--mod': true}">
      <div class="sui-segment-box__row">
        <div v-for="item in items" :key="item.key"
          class="sui-segment-box__item"
          :class="{'sui-segment-box__item--active': activekey === item.key}"
          @click="changeValue(item)">
          <div v-if="item.label" class="sui-segment-box__item-text">
            <span class="sui-segment-box__item-value">{{item.label}}</span>
            <span class="sui-segment-box__item-subValue">{{item.subLabel}}</span>
          </div>
          <div v-else>
            <div class="sui-segment-box__item-text"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CellLabel from '../CellLabel/CellLabelView';

export default {
  name: 'CellSegmentBox',
  components: {
    'cell-label': CellLabel,
  },
  props: {
    checkEditableFunction: {
      type: Function,
      default: null,
    },
    checkDisabledFunction: {
      type: Function,
      default: null,
    },
    checkVisibilityFunction: {
      type: Function,
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    // ownerCellEditor: {
    //   type: Object,
    //   default: null,
    // },
    items: {type: Array, required: true}, // 버튼으로 표현될 전체 항목 array
    value: {type: Object}, // 선택된 항목 array (단건의 경우도 array형태로 넘김)
    multi: {type: Boolean, default: false}, // 다중선택   
  },
  data() {
    return {
      editable: true,
      disabled: false,
      visibility: true,
      activekey: this.value.key,
    };
  },
  methods: {
    setEditable(rowData, columnName, dataset, grid) {
      if (this.checkEditableFunction) {
        this.editable = this.checkEditableFunction(rowData, columnName, dataset, grid);
      }
    },
    setDisabled(rowData, columnName, dataset, grid) {
      if (this.checkDisabledFunction) {
        this.disabled = this.checkDisabledFunction(rowData, columnName, dataset, grid);
      }
    },
    setVisibility(rowData, columnName, dataset, grid) {
      if (this.checkVisibilityFunction) {
        this.visibility = this.checkVisibilityFunction(rowData, columnName, dataset, grid);
      }
    },
    handleBeforeDestroy() {
      (this.$el && this.$el.parentNode)? this.$el.parentNode.removeChild(this.$el):'';
    },
    setValue(value) {
      let target = null;
      this.items.forEach((item, index) => {
        if (item.key === value) {
          target = item;
        }
      });
      if (target) {
        this.activekey = target.key;
      }
    },
    getValue() {
      return this.activekey;
    },
    changeValue (item) { // 아이템 클릭시 불리는 매서드
      if (this.disabled) return
      this.activekey = item.key;
      this.$emit('input', item);
      return;
    },
  },
  beforeDestroy() {
    this.handleBeforeDestroy();
  }
}
</script>

<style scoped>
</style>
