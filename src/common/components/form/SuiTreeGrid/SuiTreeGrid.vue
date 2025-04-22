<template>
  <div class="tree-grid">
    <!-- TODO: Needs header -->
    <sui-jqx-tree-grid
        ref="treegrid"
        :dataset="dataset"
        :autoheight="autoheight"
        :altRows="altRows"
        :autoRowHeight="autoRowHeight"
        :aggregatesHeight="aggregatesHeight"
        :autoShowLoadElement="autoShowLoadElement"
        :checkboxes="checkboxes"
        :columns="columns"
        :columnsHeight="columnsHeight"
        :columnGroups="columnGroups"
        :columnsResize="columnsResize"
        :columnsReorder="columnsReorder"
        :disabled="disabled"
        :editable="editable"
        :editSettings="editSettings"
        :exportSettings="exportSettings"
        :enableHover="enableHover"
        :enableBrowserSelection="enableBrowserSelection"
        :filterable="filterable"
        :filterHeight="filterHeight"
        :filterMode="filterMode"
        :height="height"
        :hierarchicalCheckboxes="hierarchicalCheckboxes"
        :icons="icons"
        :incrementalSearch="incrementalSearch"
        :pagerHeight="pagerHeight"
        :pageSize="pageSize"
        :pageSizeOptions="pageSizeOptions"
        :pageable="pageable"
        :pagerPosition="pagerPosition"
        :pagerMode="pagerMode"
        :pageSizeMode="pageSizeMode"
        :pagerButtonsCount="pagerButtonsCount"
        :pagerRenderer="pagerRenderer"
        :ready="ready"
        :rowDetails="rowDetails"
        :rowDetailsRenderer="rowDetailsRenderer"
        :renderToolbar="renderToolbar"
        :renderStatusBar="renderStatusBar"
        :rendering="rendering"
        :rendered="rendered"
        :rtl="rtl"
        :sortable="sortable"
        :showAggregates="showAggregates"
        :showSubAggregates="showSubAggregates"
        :showToolbar="showToolbar"
        :showStatusbar="showStatusbar"
        :statusBarHeight="statusBarHeight"
        :scrollBarSize="scrollBarSize"
        :selectionMode="selectionMode"
        :showHeader="showHeader"
        :theme="theme"
        :toolbarHeight="toolbarHeight"
        :width="width"
        :virtualModeCreateRecords="virtualModeCreateRecords"
        :virtualModeRecordCreating="virtualModeRecordCreating"
        :floatingscrollbar="floatingscrollbar"
        @bindingComplete="bindingComplete"
        @cellBeginEdit="cellBeginEdit"
        @cellEndEdit="cellEndEdit"
        @cellValueChanged="cellValueChanged"
        @columnResized="columnResized"
        @columnReordered="columnReordered"
        @filter="filter"
        @pageChanged="pageChanged"
        @pageSizeChanged="pageSizeChanged"
        @rowClick="rowClick"
        @rowDoubleClick="rowDoubleClick"
        @rowSelect="rowSelect"
        @rowUnselect="rowUnselect"
        @rowBeginEdit="rowBeginEdit"
        @rowEndEdit="rowEndEdit"
        @rowExpand="rowExpand"
        @rowCollapse="rowCollapse"
        @rowCheck="rowCheck"
        @rowUncheck="rowUncheck"
        @sort="sort"
    />
    <!-- TODO: If Needs footer -->
  </div>
</template>

<script>
export default {
  name: 'SuiTreeGrid',
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    dataset: {
      type: String,
      default: 'null',
    },
    autoheight: {
      type: Boolean,
      default: false,
    },
    altRows: {
      type: Boolean,
      default: false,
    },
    autoRowHeight: {
      type: Boolean,
      default: false,
    },
    aggregatesHeight: {
      type: Number,
      default: 34,
    },
    autoShowLoadElement: {
      type: Boolean,
      default: true,
    },
    checkboxes: {
      type: Boolean,
      default: false,
    },
    columnsHeight: {
      type: Number,
      default:36,
    },
    columnGroups: {
      type: Array,
      default() {},
    },
    columnsResize: {
      type: Boolean,
      default: true, // NOTE: S-EHS 용으로 항상 true로 변경
    },
    columnsReorder: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    editSettings: {
      type: Object,
      default() {
        return {
          saveOnPageChange: true,
          saveOnBlur: true,
          saveOnSelectionChange: true,
          cancelOnEsc: true,
          saveOnEnter: true,
          editSingleCell: false,
          editOnDoubleClick: true,
          editOnF2: true,
        };
      },
    },
    exportSettings: {
      type: Object,
      default() {
        return {
          columnsHeader: true,
          hiddenColumns: false,
          serverURL: null,
          characterSet: null,
          collapsedRecords: false,
          recordsInView: true,
          fileName: 'jqxTreeGrid',
        };
      },
    },
    enableHover: {
      type: Boolean,
      default: true,
    },
    enableBrowserSelection: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    filterHeight: {
      type: Number,
      default: 30,
    },
    filterMode: {
      type: String,
      default: 'default',
    },
    height: {
      type: [Number, String],
      default: null,
    },
    hierarchicalCheckboxes: {
      type: Boolean,
      default: false,
    },
    icons: {
      type: [Function, Boolean],
      default: false,
    },
    incrementalSearch: {
      type: Boolean,
      default: true,
    },
    pagerHeight: {
      type: Number,
      default: 28,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizeOptions: {
      type: Array,
      default: () => ['5', '10', '20'],
    },
    pageable: {
      type: Boolean,
      default: false,
    },
    pagerPosition: {
      type: String,
      default: 'bottom',
    },
    pagerMode: {
      type: String,
      default: 'default',
    },
    pageSizeMode: {
      type: String,
      default: 'default',
    },
    pagerButtonsCount: {
      type: Number,
      default: 5,
    },
    pagerRenderer: {
      type: Function,
      default: null,
    },
    ready: {
      type: Function,
      default: null,
    },
    rowDetails: {
      type: Boolean,
      default: false,
    },
    rowDetailsRenderer: {
      type: Function,
      default: null,
    },
    renderToolbar: {
      type: Function,
      default: null,
    },
    renderStatusBar: {
      type: Function,
      default: null,
    },
    rendering: {
      type: Function,
      default: null,
    },
    rendered: {
      type: Function,
      default: null,
    },
    rtl: {
      type: Boolean,
      default: false,
    },
    source: {
      type: Object,
      default: null,
    },
    sortable: {
      type: Boolean,
      default: false,
    },
    showAggregates: {
      type: Boolean,
      default: false,
    },
    showSubAggregates: {
      type: Boolean,
      default: false,
    },
    showToolbar: {
      type: Boolean,
      default: false,
    },
    showStatusbar: {
      type: Boolean,
      default: false,
    },
    statusBarHeight: {
      type: Number,
      default: 34,
    },
    scrollBarSize: {
      type: Number,
      default: 17,
    },
    selectionMode: {
      type: String,
      default: 'multipleRows', // 'singleRow' or 'multipleRows'
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
      default: '',
    },
    toolbarHeight: {
      type: Number,
      default:40,
    },
    width: {
      type: [Number, String],
      default: '100%',
    },
    virtualModeCreateRecords: {
      type: Function,
      default: null,
    },
    virtualModeRecordCreating: {
      type: Function,
      default: null,
    },
    floatingscrollbar: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      ds: null, // 데이타셋
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.ds = utils.findDataset(this.dataset, this);
    });
    this.$root.$on('lnb-resize', this.update);
  },
  methods: {
    update() {
      this.$nextTick(() => {
        const jqxTreeGrid = this.getJqxTreeGrid();
        if (jqxTreeGrid) {
          jqxTreeGrid.updatesize();
        }
      });      
    },

    getDataset() {
      return this.ds;
    },

    getJqxTreeGrid() {
      return this.$refs.treegrid;
    },

    bindingComplete(e) { this.$emit('bindingComplete', e); },
    cellBeginEdit(e) { this.$emit('cellBeginEdit', e); },
    cellEndEdit(e) { this.$emit('cellEndEdit', e); },
    cellValueChanged(e) { this.$emit('cellValueChanged', e); },
    columnResized(e) { this.$emit('columnResized', e); },
    columnReordered(e) { this.$emit('columnReordered', e); },
    filter(e) { this.$emit('filter', e); },
    pageChanged(e) { this.$emit('pageChanged', e); },
    pageSizeChanged(e) { this.$emit('pageSizeChanged', e); },
    rowClick(e) { this.$emit('rowClick', e); },
    rowDoubleClick(e) { this.$emit('rowDoubleClick', e); },
    rowSelect(e) { this.$emit('rowSelect', e); },
    rowUnselect(e) { this.$emit('rowUnselect', e); },
    rowBeginEdit(e) { this.$emit('rowBeginEdit', e); },
    rowEndEdit(e) { this.$emit('rowEndEdit', e); },
    rowExpand(e) { this.$emit('rowExpand', e); },
    rowCollapse(e) { this.$emit('rowCollapse', e); },
    rowCheck(e) { this.$emit('rowCheck', e); },
    rowUncheck(e) { this.$emit('rowUncheck', e); },
    sort(e) { this.$emit('sort', e); },
  },
  beforeDestroy() {      
    this.$root.$off('lnb-resize', this.update);    
  },
};
</script>

<style scoped>


</style>
