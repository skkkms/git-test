<template>
  <div
    class="sui-grid"
    :class="gridClasses"
  >
    <sui-grid-header
      v-show="!hideHeader"
      :rowMovable="rowMovable"
      :multiselect="multiselect"
      :showCountControl="showCountControl"
      :showDisplayCountControl="showDisplayCountControl"
      :showMoveControl="showMoveControl"
      :pagesizeoptions="pagesizeoptions"
      :initialPagesize="initialPagesize"
      :showComlumsControl="showComlumsControl"
      @pagesize-changed="onPageSizeChanged"
      @order-changed="onOrderChanged"
    >
      <!-- &lt;grid-header/&gt; 영역에서 사용되는 Slot 입니다. -->
      <slot />
      <template v-slot:columncontrol>
        <column-list-control v-if="showComlumsControl" />
      </template>
    </sui-grid-header>
    <sui-jqx-grid
      v-if="dataInitialized"
      ref="grid"
      :floatingscrollbar="floatingscrollbar"
      :pagerheight="defaultOptions.pagerheight"
      :scrollbarsize="defaultOptions.scrollbarsize"
      :width="defaultOptions.width"
      :columnsheight="columnsheight"
      :rowsheight="rowsheight"
      :autoshowfiltericon="defaultOptions.autoshowfiltericon"
      :pageable="pageable"
      :columns="columns"
      :columngroups="columngroups"
      :dataset="dataset"
      :groups="groups"
      :groupable="groupable"
      :showgroupaggregates="showgroupaggregates"
      :groupsheaderheight="groupsheaderheight"
      :sortable="false"
      :filterable="false"
      :columnsresize="columnsresize"
      :autoheight="autoheight"
      :pagesizeoptions="pagesizeoptions"
      :selectionmode="selectionmode"
      :filtermode="filtermode"
      :showstatusbar="showstatusbar"
      :statusbarheight="statusbarheight"
      :showaggregates="showaggregates"
      :height="gridHeight"
      :verticalscrollable="verticalscrollable"
      :enablebrowserselection="enablebrowserselection"
      :enabletexttooltips="enabletexttooltips"
      :clipboard="clipboard"
      :upperhiddenrowcount="upperhiddenrowcount"
      :lazyupdate="lazyupdate"
      :lazyupdatedelay="lazyupdatedelay"
      :updatedelay="updatedelay"
      @bindingcomplete="bindingcomplete"
      @columnresized="columnresized"
      @columnreordered="columnreordered"
      @columnclick="columnclick"
      @cellclick="cellclick"
      @celldoubleclick="celldoubleclick"
      @cellselect="cellselect"
      @cellunselect="cellunselect"
      @cellvaluechanged="cellvaluechanged"
      @cellbeginedit="cellbeginedit"
      @cellendedit="cellendedit"
      @filter="filter"
      @groupschanged="groupschanged"
      @groupexpand="groupexpand"
      @groupcollapse="groupcollapse"
      @pagechanged="pagechanged"
      @pagesizechanged="pagesizechanged"
      @rowclick="rowclick"
      @rowdoubleclick="rowdoubleclick"
      @rowselect="rowselect"
      @rowunselect="rowunselect"
      @rowexpand="rowexpand"
      @rowcollapse="rowcollapse"
      @sort="sort"
      @initialized="initialized"
    />
    <sui-pager
      v-show="totalPageCount > 1 && pageable"
      :totalPageCount="totalPageCount"
      @page-changed="onPageClick"
    />
  </div>
</template>

<script>
import ColumnListControl from './SuiGridColumnListControl';

export default {
  name: 'SuiGrid',
  components: {
    'column-list-control': ColumnListControl,
  },
  props: {
    // 그리드의 컬럼 형태를 정의합니다.
    // # Define grid column from
    // $v-model : sui-column
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    // Grid에서 활용될 Dataset의 ID입니다.
    dataset: {
      type: String,
      default: 'null',
    },
    pagesizeoptions: {
      type: [String, Array],
      default() {
        return [5, 10, 15];
      },
    },
    autoheight: {
      type: Boolean,
      default: false,
    },
    sortable: {
      type: Boolean,
      default: true,
    },
    filterable: {
      type: Boolean,
      default: true,
    },
    filtermode: {
      type: String,
      default: 'excel',
    },
    columnsresize: {
      type: Boolean,
      default: true,
    },
    groupable: {
      type: Boolean,
      default: false,
    },
    groups: {
      type: Array,
      default() {
        return [];
      },
    },
    showgroupaggregates: {
      type: Boolean,
      default: true,
    },
    groupsheaderheight: {
      type: Number,
      default: 0,
    },
    multiselect: {
      type: Boolean,
      default: false,
    },
    rowMovable: {
      type: Boolean,
      default: false,
    },
    pageable: {
      type: Boolean,
      default: false,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    // 그리드 컬럼의 높이입니다.
    columnsheight: {
      type: Number,
      default: 36,
    },
    // 그리드 행의 높이입니다.
    rowsheight: {
      type: Number,
      default: 36,
    },
    showCountControl: {
      type: Boolean,
      default: true,
    },
    showDisplayCountControl: {
      type: Boolean,
      default: true,
    },
    showMoveControl: {
      type: Boolean,
      default: false,
    },
    showComlumsControl: {
      type: Boolean,
      default: false,
    },
    columngroups: {
      type: Array,
      default: null,
    },
    showstatusbar: {
      type: Boolean,
      default: false,
    },
    statusbarheight: {
      type: Number,
      default: 50,
    },
    showaggregates: {
      type: Boolean,
      default: false,
    },
    autoShrink: {
      type: Boolean,
      default: false,
    },
    initialPagesize: {
      type: Number,
      default: 5,
    },
    floatingscrollbar: {
      type: Boolean,
      default: true,
    },
    showCellLines: {
      type: Boolean,
      default: false,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
    enablebrowserselection: {
      type: Boolean,
      default: true,
    },
    clipboard: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // [191105] 문자열 형태의 Cell에 툴팁을 보여줄 것인지 여부
    // #[PROPS,191105] Tooltip for text cell
    enabletexttooltips: {
      type: Boolean,
      default: true,
    },
    // 그리드가 여분으로 생성하는 row 개수, row span을 정상적으로 표시하기위한 용도이며 기본적으로 0으로 설정된다
    virtualrowcount: {
      type: Number,
      default: -1,
    },
    // 비동기 update 여부
    // dataset.addRow가 호출된 경우 대기여부, 대기중에 다른 api가 호출되면 즉시 렌더링을 한다
    lazyupdate: {
      type: Boolean,
      default: false,
    },
    // 비동기 update delay
    // dataset.addRow가 된경우 그리드가 렌더링 하기위해 대기하는 시간
    lazyupdatedelay: {
      type: Number,
      default: 500,
    },
    // 그리드 렌더링 delay, 스크롤시 즉시 렌더링 하지 않음
    // 모든 렌더링에 딜레이가 생기기 때문에 대용량이 아닌이상 설정 자제
    updatedelay: {
      type: Number,
      default: undefined,
    },
  },
  data() {
    return {
      dataInitialized: false,
      showComponentPortal: true,
      ds: null,
      defaultOptions: {
        pagerheight: 0,
        scrollbarsize: 6,
        width: '100%',
        autoshowfiltericon: true,
      },
      modifiedColumns: [],
      selectionmode: this.multiselect ? 'checkbox' : 'singlerow',
      pagesize: 5,
      selectedPageSize: { key: '10', label: '10' },
      // ds: null,
      grid: null,
      gridHeight: '450px',
      // ds: null,
      currentComponent: null,
      totalItemCount: 0,
      selectedItemsCount: 0,
      currentPageIndex: 1,
      pages: [],
      // grid: null,
      ellipsisFront: false,
      ellipsisRear: false,
      goToPageNum: '',
      isAutoHeight: false,
      editorMap: {},
      gridLabelColumns: [],
      mode: 'component',
      totalPageCount: 1,
      selectedColumns: [],
      columnOptions: [],
      renderedColumnsHeight: 0,
      enableHScroll: false,
      enableVScroll: false,
    };
  },
  computed: {
    gridClasses() {
      return [
        { 'sui-grid__header--multiline': utils.getConfigurationValue('CFG_CMZ_LABLE_MULTI_LINE_YN') === 'Y' },
        { 'sui-grid--showlines': this.showCellLines },
        { 'sui-grid-hide': !this.isShow },
        { 'sui-grid__scrollbar__horizontal--show': this.enableHScroll },
        { 'sui-grid__scrollbar__vertical--show': this.enableVScroll },
      ];
    },
    verticalscrollable() {
      if (this.pageable) {
        return false;
      }
      return true;
    },
    // currentGridColumns() {
    //   const grid = this.getJqxGrid();
    //   if (this.labelMode) {
    //     grid._columns(this.gridLabelColumns);
    //     return this.gridLabelColumns;
    //   } else {
    //     // grid._columns(this.columns);
    //   }
    //   return this.columns;
    // }
  },
  watch: {
    labelMode() {
      const grid = this.getJqxGrid();
      if (!grid) {
        return;
      }
      if (this.labelMode) {
        grid._selectionmode('multiplerowsextended');
        grid._columns(this.gridLabelColumns);
      } else {
        grid._selectionmode(this.selectionmode);
        grid._columns(this.columns);
      }
    },
    multiselect() {
      if (this.multiselect) {
        this.selectionmode = 'checkbox';
      } else {
        this.selectionmode = 'singlerow';
      }
      const grid = this.getJqxGrid();
      if (grid) {
        grid._selectionmode(this.selectionmode);
        // grid.updateGrid();
      }
    },
    autoheight() {
      if (this.getJqxGrid()) {
        this.getJqxGrid()._autoheight(this.autoheight);
      }
    },
  },
  created() {
    this._cellEditors = [];
    // return;
    // _.forEach(this.columns, column => {
    //   const item = _.clone(column);
    //   delete item.createwidget;
    //   delete item.initwidget;
    //   labelColumns.push(item);
    // });
    // this.gridLabelColumns = labelColumns;
    this._decorateColumns();
    this.dataInitialized = true;
  },
  mounted() {
    this.$nextTick(() => {
      this.ds = utils.findDataset(this.dataset, this);
      this.refreshPager();
      // this.$refs.grid.updateGrid();
      this.ds.$on(this.ds.EVENTS.RAW_DATA_CHANGED, this.refreshPager);
      if (this.autoShrink) {
        this.updateGridHeight(this.pagesize);
      }
      this.checkScroll();
    });
    this.registComponentPortal();
    this.$root.$on('lnb-resize', this.update);
    this.createGridColumnSelect();
  },
  beforeDestroy() {
    if (this.ds) {
      this.ds.$off(this.ds.EVENTS.RAW_DATA_CHANGED, this.refreshPager);
    }
    this.$root.$off('lnb-resize', this.update);
    this._cellEditors.forEach(editor => {
      editor.destroy();
    });
  },
  destroyed() {
    this._cellEditors.forEach(editor => {
      editor.destroy();
    });
  },
  methods: {
    setSelect(value) {
      const foundIndex = this.getDataset().data.findIndex(item => {
        return Object.keys(value).every(key => {
          return item[key] === value[key];
        });
      });

      if (foundIndex > -1) {
        this.getDataset().setSelectedIndex(foundIndex);
        this.$refs.grid.scrolloffset(this.rowsheight * foundIndex, 0);
      }
    },
    /**
     *  @public
      checkScroll()
    */
    checkScroll() {
      const jqxGrid = this.getJqxGrid();
      if (jqxGrid && jqxGrid.instance) {
        this.enableHScroll = jqxGrid.instance.hScrollBar.css('visibility') === 'visible';
        this.enableVScroll = jqxGrid.instance.vScrollBar.css('visibility') === 'visible';
      }
    },
    /**
     *  @public
      update()
    */
    update() {
      if (this.$refs.grid) {
        this.$refs.grid.updatesize();
        this.checkScroll();
      }
    },
    _decorateColumns() {
      // virtualrowcount를 설정하지 않은 경우 기본값 설정

      this.upperhiddenrowcount = this.virtualrowcount;
      this.columns.forEach(column => {
        if (column.createwidget) {
          column.destroycellswidget = this.destroyCellComponent;
        }
        if (column.rowSpan && (this.virtualrowcount === -1)) { // span이 있는 경우에만 그리도록 추가, 추후 필요시 prop으로 이동
          this.upperhiddenrowcount = 10;
        }
      });
      if (this.upperhiddenrowcount === -1) {
        this.upperhiddenrowcount = 0;
      }
    },
    addCellEditor(editor) {
      this._cellEditors.push(editor);
    },
    getCellEditor(rowIndex, columnName) {
      const { length } = this._cellEditors;
      for (let i = length - 1; i >= 0; i -= 1) {
        const editor = this._cellEditors[i];
        if (editor.getDatasetIndex() === rowIndex && editor.columnName === columnName) {
          return editor;
        }
      }
      return null;
    },
    removeCellEditor(editor) {
      const index = this._cellEditors.indexOf(editor);
      if (index) {
        this._cellEditors.splice(index, 1);
      }
    },
    createGridColumnSelect() {
      const options = [];
      this.columns.forEach(column => {
        options.push({ key: column.datafield, label: column.text });
      });
      this.columnOptions = options;
    },
    getDataset() {
      return this.ds;
    },
    refreshPager() {
      if (this.getJqxGrid() && this.getJqxGrid().getpaginginformation()) {
        this.totalPageCount = this.getJqxGrid().getpaginginformation().pagescount;
      }
    },
    registComponentPortal() {

    },
    getComponentPortal(componentName) {
      return this.$refs[componentName];
    },
    getJqxGrid() {
      return this.$refs.grid;
    },
    bindingcomplete(e) {
      // 데이터의 바인딩이 종료되었을 때에 호출됩니다.
      // $arg : 이벤트 객체
      this.$emit('bindingcomplete', e);
    },
    setMode(mode) {
      if (this.mode !== mode) {
        this.mode = mode;
        const jqxGrid = this.getJqxGrid();
        if (jqxGrid) {
          if (this.mode === 'label') {
            jqxGrid._selectionmode('multiplerowsextended');
            jqxGrid._columns(this.gridLabelColumns);
          } else if (this.mode === 'component') {
            jqxGrid._selectionmode(this.selectionmode);
            jqxGrid._columns(this.columns);
          }
        }
      }
    },
    // @vuese
    // 컬럼 을 표시/숨김처리한다.
    // # Hide/Show grid column
    // $arg : ColumnName - 표시/숨김처리 할 컬럼 이름
    // $(arg) : isShow(Boolean) - 표시(true)/숨김(false)처리 여부
    // $return : N/A
    showColumn(columnName, isShow) {
      const jqxGrid = this.getJqxGrid();
      if (jqxGrid) {
        jqxGrid.beginupdate();
        isShow? jqxGrid.showcolumn(columnName) : jqxGrid.hidecolumn(columnName);
        jqxGrid.endupdate();
      }
    },
    setShowedColumns(columnNames) {
      const jqxGrid = this.getJqxGrid();
      if (jqxGrid) {
        jqxGrid.beginupdate();
        this.columns.forEach(column => {
          if (columnNames.indexOf(column.datafield) >= 0) {
            jqxGrid.showcolumn(column.datafield);
          } else {
            jqxGrid.hidecolumn(column.datafield);
          }
        });
        jqxGrid.endupdate();
      }
    },
    updateGridHeight(pagesize) {
      if (this.renderedColumnsHeight === 0) {
        this.renderedColumnsHeight = this.columnsheight;
        if (this.columngroups) {
          for (let i = 0; i < this.columngroups.length; i += 1) {
            const group = this.columngroups[i];
            this.renderedColumnsHeight = this.columnsheight * 2;
            if (group.parentGroup) {
              this.renderedColumnsHeight = this.columnsheight * 3;
              break;
            }
          }
        }
      }

      if (this.autoShrink) {
        if (this.getJqxGrid() && this.getJqxGrid().getpaginginformation()) {
          const pageInfo = this.getJqxGrid().getpaginginformation();
          if (pageInfo.pagenum === pageInfo.pagescount - 1) {
            const lastItemCount = this.ds.data.length - ((pageInfo.pagescount - 1) * pagesize);
            this.gridHeight = `${lastItemCount * this.rowsheight + this.renderedColumnsHeight}`;
          } else {
            this.gridHeight = `${pagesize * this.rowsheight + this.renderedColumnsHeight}`;
          }
        }
      } else {
        this.gridHeight = `${pagesize * this.rowsheight + this.renderedColumnsHeight}`;
      }
      this.getJqxGrid()._height(this.gridHeight);
    },
    onPageSizeChanged(pagesize) {
      this.pagesize = pagesize;
      this.updateGridHeight(pagesize);
      if (this.pageable) {
        this.refreshPager();
      }
    },
    onOrderChanged(data) {
      this.$emit('order-changed', data);
    },
    onPageClick(pageNum) {
      const jqxGrid = this.getJqxGrid();
      if (jqxGrid) {
        jqxGrid.gotopage(pageNum - 1);
      }
      if (this.autoShrink) {
        this.updateGridHeight(this.pagesize);
      }
    },
    columnresized(e) {
      this.columns.forEach(column => {
        if (column._componentInstance) {
          column._componentInstance.refresh();
        }
      });
      this.checkScroll();
      this.$emit('columnresized', e);
    },
    columnreordered(e) { this.$emit('columnreordered', e); },
    columnclick(e) { this.$emit('columnclick', e); },
    cellclick(e) { this.$emit('cellclick', e); },
    celldoubleclick(e) { this.$emit('celldoubleclick', e); },
    cellselect(e) { this.$emit('cellselect', e); },
    cellunselect(e) { this.$emit('cellunselect', e); },
    cellvaluechanged(e) { this.$emit('cellvaluechanged', e); },
    cellbeginedit(e) { this.$emit('cellbeginedit', e); },
    cellendedit(e) { this.$emit('cellendedit', e); },
    filter(e) { this.$emit('filter', e); },
    groupschanged(e) { this.$emit('groupschanged', e); },
    groupexpand(e) { this.$emit('groupexpand', e); },
    groupcollapse(e) { this.$emit('groupcollapse', e); },
    pagechanged(e) { this.$emit('pagechanged', e); },
    pagesizechanged(e) {
      this.$emit('pagesizechanged', e);
    },
    rowclick(e) { this.$emit('rowclick', e); },
    rowdoubleclick(e) { this.$emit('rowdoubleclick', e); },
    rowselect(e) { this.$emit('rowselect', e); },
    rowunselect(e) { this.$emit('rowunselect', e); },
    rowexpand(e) { this.$emit('rowexpand', e); },
    rowcollapse(e) { this.$emit('rowcollapse', e); },
    sort(e) { this.$emit('sort', e); },
    setFocus(rowIndex, columnName) {
      const jqxGrid = this.getJqxGrid();
      if (jqxGrid) {
        jqxGrid.ensurerowvisible(rowIndex);
      }
      const editor = this.getCellEditor(rowIndex, columnName);
      if (editor) {
        editor.setFocus();
      }
    },
    ensurerowvisible(rowIndex) {
      const jqxGrid = this.getJqxGrid();
      if (jqxGrid) {
        jqxGrid.ensurerowvisible(rowIndex);
      }
    },
    onColumnSelectColose() {
      const columns = [];
      this.selectedColumns.forEach(column => {
        columns.push(column.key);
      });
      this.setShowedColumns(columns);
    },
    destroyCellComponent(rowIndex, columnName, htmlElement) {
      const editor = this.getCellEditor(rowIndex, columnName);
      if (editor) {
        editor.destroy();
      }
    },
    initialized(e) {
      this.checkScroll();
      this.$emit('initialized', e);
    },
    downloadCSV(filename) {
      const jqxGrid = this.getJqxGrid();
      if (this.ds && jqxGrid) {
        const fields = [];
        const columns = jqxGrid.instance.columns;
        _.forEach(columns.records, record => {
          if (!record.hidden && record.displayfield) {
            fields.push(record.datafield);
          }
        })
        this.ds.downloadCSV(filename, fields);
      }
    },
  },
};
</script>

<style scoped>
.-grid__column__header__root {
  width: 100%;
  height: 100%;
}

.sui-grid-hide {
  height: 0;
  overflow: hidden;
}
</style>
