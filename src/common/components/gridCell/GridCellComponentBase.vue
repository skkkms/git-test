<script>

export default {
  name: 'GridCellComponentBase',
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
    ownerCellEditor: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      editable: true,
      disabled: false,
      visibility: true,
    };
  },
  computed: {
    displayLabel() {

    },
  },
  mounted() {
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
    /* [191104] For Memory Leak - Destroy me (nicepig7) */
    extDestroyMe() {
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el); // remove the element from the DOM
      }
    },
    handleBeforeDestroy() {
      if (this.ownerCellEditor) {
        // const rowInfo = this.ownerCellEditor.getRowInfo();
        this.extDestroyMe(); // 해당 함수 호출시 그리드에서 이상동작함, row 삭제시 컴포넌트가 다시 그려지지 않는 경우가 있음
        // console.log(`(${rowInfo.rowIndex}) : (${rowInfo.columnName})`);
      }  
    }
  },
  /* [191104] For Memory Leak - Lifecycle (nicepig7) */
  beforeDestroy() {
    this.handleBeforeDestroy();
  }
  
};
</script>
