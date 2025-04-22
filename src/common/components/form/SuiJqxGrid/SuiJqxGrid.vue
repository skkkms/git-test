/*
jQWidgets v7.1.0 (2019-Feb)
Copyright (c) 2011-2019 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */


/*
수정 사항
2019.03.07
- dataSource prop 추가, dataSource prop을 이용해서 dataAdapter 생성하는 부분 추가
2019.04.04
- dataset prop 추가. dataset을 이용하여 databinding 하는 부분 추가
2019.04.24
- dataset과 컴포넌트의 selection 동기화 부분 추가
*/

<template>
  <div :id="id">
    <slot />
  </div>
</template>

<script>
/* eslint-disable no-undef */
// import '../sources/jqxcore.js'
// import '../sources/jqxdata.js'
// import '../sources/jqxdata.export.js'
// import '../sources/jqxbuttons.js'
// import '../sources/jqxbuttongroup.js'
// import '../sources/jqxscrollbar.js'
// import '../sources/jqxmenu.js'
// import '../sources/jqxlistbox.js'
// import '../sources/jqxdropdownlist.js'
// import '../sources/jqxcombobox.js'
// import '../sources/jqxnumberinput.js'
// import '../sources/jqxcheckbox.js'
// import '../sources/globalization/globalize.js'
// import '../sources/jqxcalendar.js'
// import '../sources/jqxnumberinput.js'
// import '../sources/jqxdatetimeinput.js'
// import '../sources/jqxgrid.js'
// import '../sources/jqxgrid.edit.js'
// import '../sources/jqxgrid.pager.js'
// import '../sources/jqxgrid.selection.js'
// import '../sources/jqxgrid.filter.js'
// import '../sources/jqxgrid.sort.js'
// import '../sources/jqxgrid.storage.js'
// import '../sources/jqxgrid.grouping.js'
// import '../sources/jqxgrid.export.js'
// import '../sources/jqxgrid.columnsresize.js'
// import '../sources/jqxgrid.columnsreorder.js'
// import '../sources/jqxgrid.aggregates.js'

// IDE BEGIN - add utility function for row control
const createDatasetInput = (component, rowIds, data) => {
  let ids = null;

  if (!rowIds && rowIds !== 0) {
    return;
  }

  if (rowIds.constructor !== Array) {
    ids = [rowIds];
  } else {
    ids = rowIds;
  }

  const indexes = [];
  const rows = component.getboundrows();
  ids.forEach(id => {
    const index = rows.findIndex(row => row.uid === id);
    if (index > -1) {
      indexes.push(index);
    }
  });

  const dataset = component.datasetObj;
  const rawType = dataset.getRawDataType();
  let inputData = null;
  if (data) {
    let sample = data;
    if (rawType === dataset.DATA_TYPE.ARRAY) {
      sample = data[0];
    }

    if (sample.constructor !== Array) {
      inputData = [data];
    } else {
      inputData = data;
    }
  }

  return {
    indexes,
    inputData,
  };
};

const updateDatasetListeners = (grid, register) => {
  if (!grid.datasetObj) {
    return;
  }
  const dataset = grid.datasetObj;

  if (register) {
    // subscribe events.
    dataset.$on(dataset.EVENTS.RAW_DATA_CHANGED, grid.dataChanged);
    dataset.$on(dataset.EVENTS.RAW_DATA_CLEARED, grid.clearData);
    dataset.$on(dataset.EVENTS.DATAFIELDS_CHANGED, grid.dataChanged);
    dataset.$on(dataset.EVENTS.DATA_CHANGED, grid.dataChanged);
    dataset.$on(dataset.EVENTS.SELECTION_CHANGED, grid.datasetSelectionChanged);
    dataset.$on(dataset.EVENTS.DATA_RESET, grid.dataChanged);
  } else {
    // unsubscribe events.
    dataset.$off(dataset.EVENTS.RAW_DATA_CHANGED, grid.dataChanged);
    dataset.$off(dataset.EVENTS.RAW_DATA_CLEARED, grid.clearData);
    dataset.$off(dataset.EVENTS.DATAFIELDS_CHANGED, grid.dataChanged);
    dataset.$off(dataset.EVENTS.DATA_CHANGED, grid.dataChanged);
    dataset.$off(dataset.EVENTS.SELECTION_CHANGED, grid.datasetSelectionChanged);
    dataset.$off(dataset.EVENTS.DATA_RESET, grid.dataChanged);
  }
};
// IDE END
export default {
  props: {
    // IDE BEGIN - add binding types
    dataSource: Object,
    dataset: null,
    floatingscrollbar: null,
    verticalscrollable: null,
    upperhiddenrowcount: Number,
    lazyupdate: Boolean,
    lazyupdatedelay: Number,
    // IDE END
    altrows: Boolean,
    altstart: Number,
    altstep: Number,
    autoshowloadelement: Boolean,
    autoshowfiltericon: Boolean,
    autoshowcolumnsmenubutton: Boolean,
    showcolumnlines: Boolean,
    showrowlines: Boolean,
    showcolumnheaderlines: Boolean,
    adaptive: Boolean,
    adaptivewidth: Number,
    clipboard: Boolean,
    closeablegroups: Boolean,
    columnsmenuwidth: Number,
    columnmenuopening: Function,
    columnmenuclosing: Function,
    cellhover: Function,
    enablekeyboarddelete: Boolean,
    enableellipsis: Boolean,
    enablemousewheel: Boolean,
    enableanimations: Boolean,
    enabletooltips: Boolean,
    // IDE BEGIN tooltip option for text cell
    enabletexttooltips: Boolean,
    // IDE END
    enablehover: Boolean,
    enablebrowserselection: Boolean,
    everpresentrowposition: String,
    everpresentrowheight: Number,
    everpresentrowactions: String,
    everpresentrowactionsmode: String,
    filterrowheight: Number,
    filtermode: String,
    groupsrenderer: Function,
    groupcolumnrenderer: Function,
    groupsexpandedbydefault: Boolean,
    handlekeyboardnavigation: Function,
    pagerrenderer: Function,
    rtl: Boolean,
    showdefaultloadelement: Boolean,
    showfiltercolumnbackground: Boolean,
    showfiltermenuitems: Boolean,
    showpinnedcolumnbackground: Boolean,
    showsortcolumnbackground: Boolean,
    showsortmenuitems: Boolean,
    showgroupmenuitems: Boolean,
    showrowdetailscolumn: Boolean,
    showheader: Boolean,
    showgroupsheader: Boolean,
    showaggregates: Boolean,
    showgroupaggregates: Boolean,
    showeverpresentrow: Boolean,
    showfilterrow: Boolean,
    showemptyrow: Boolean,
    showstatusbar: Boolean,
    statusbarheight: Number,
    showtoolbar: Boolean,
    selectionmode: String,
    updatefilterconditions: Function,
    updatefilterpanel: Function,
    theme: String,
    toolbarheight: Number,
    autoheight: Boolean,
    autorowheight: Boolean,
    columnsheight: Number,
    deferreddatafields: Array,
    groupsheaderheight: Number,
    groupindentwidth: Number,
    height: [String, Number],
    pagerheight: Number,
    rowsheight: Number,
    scrollbarsize: Number,
    scrollmode: String,
    scrollfeedback: Function,
    width: [String, Number],
    autosavestate: Boolean,
    autoloadstate: Boolean,
    columns: Array,
    columngroups: Array,
    columnsmenu: Boolean,
    columnsresize: Boolean,
    columnsautoresize: Boolean,
    columnsreorder: Boolean,
    disabled: Boolean,
    editable: Boolean,
    editmode: String,
    filter: Function,
    filterable: Boolean,
    groupable: Boolean,
    groups: Array,
    horizontalscrollbarstep: Number,
    horizontalscrollbarlargestep: Number,
    initrowdetails: Function,
    keyboardnavigation: Boolean,
    localization: Object,
    pagesize: Number,
    pagesizeoptions: Array,
    pagermode: String,
    pagerbuttonscount: Number,
    pageable: Boolean,
    rowdetails: Boolean,
    rowdetailstemplate: Object,
    ready: Function,
    rendered: Function,
    renderstatusbar: Function,
    rendertoolbar: Function,
    rendergridrows: Function,
    sortable: Boolean,
    sortmode: String,
    selectedrowindex: Number,
    selectedrowindexes: Array,
    source: Object,
    sorttogglestates: Number,
    updatedelay: Number,
    virtualmode: Boolean,
    verticalscrollbarstep: Number,
    verticalscrollbarlargestep: Number,
    autoCreate: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      isFirst: true,
    };
  },
  watch: {
    //   // IDE BEGIN
    //   dataSource: {
    //     deep: true,
    //     handler(newValue) {
    //       if (this.useDataSource) this._source().dataBind();
    //     }
    //   },
    //   dataset: {
    //     deep: true,
    //     handler() {
    //       this.datasetChanged();
    //     }
    //   }
    //   // IDE END
  },
  created() {
    this.id = `jqxGrid${JQXLite.generateID()}`;
    this.componentSelector = `#${this.id}`;

    // IDE BEGIN - create dataAdapter
    if (!this.datasetObj && this.$options.propsData.dataSource && !this.$options.propsData.source) {
      this.useDataSource = true;
      this.$options.propsData.source = new jqx.dataAdapter(this.$options.propsData.dataSource);
    }
    // IDE END
  },
  // IDE BEGIN
  beforeDestroy() {
    if (this.datasetObj) {
      updateDatasetListeners(this, false);
    }
    if (this.instance) {
      this.instance.destroy();
    }
  },
  // IDE END
  mounted() {
    // IDE BEGIN - move  'this.__createComponent_()' to nextTick.
    this.$nextTick(() => {
      this.datasetObj = this.$parent.$getDataset && this.$parent.$getDataset(this.dataset);
      if (this.datasetObj) {
        updateDatasetListeners(this, true);
      }
      if (this.autoCreate) {
        this.instance = this.__createComponent__();
      }
      this.updateGrid();
    });
    // IDE END
  },
  methods: {
    // IDE BEGIN
    reqUpdate(updateTick) {
      this.renderTime = (new Date()).getTime() + updateTick;
      if (updateTick === 0) {
        if (this.timerId) {
          clearTimeout(this.timerId);
        }
        this.updateGrid();
      } else if (!this.timerId) {
        this.timerId = setTimeout(this.handleTimeout, 200);
      }
    },
    handleTimeout() {
      const currentTime = (new Date()).getTime();
      if (currentTime >= this.renderTime) {
        this.timerId = null;
        this.updateGrid();
      } else {
        this.timerId = setTimeout(this.handleTimeout, 200);
      }
    },
    dataChanged(event) {
      let updateTick = 0;

      if (this.lazyupdate) {
        if (event.type === this.datasetObj.DATA_CHANGED_TYPE.ROW_ADDED) {
          updateTick = this.lazyupdatedelay;
        }
      }

      this.reqUpdate(updateTick);
    },
    datasetSelectionChanged(event) {
      if (event.sender !== this.id) {
        const indexes = this.datasetObj.getSelectedIndexes();
        if (this.selectionmode === 'multiplerows' || this.selectionmode === 'multiplerowsextended' || this.selectionmode === 'checkbox') {
          if (indexes.length === 0) {
            this.clearselection();
          } else {
            this.selectedrowindexes = indexes.slice();
          }
        } else if (this.selectionmode === 'singlerow') {
          this.selectedrowindex = indexes.length > 0 ? indexes[indexes.length - 1] : -1;
        }

        this.updatebounddata('cells');
      }
    },
    /**
             * When the dataset changes, reconnect the event.
             */
    datasetChanged(event) {
      if (this.datasetObj) {
        updateDatasetListeners(this, false);
      }

      this.datasetObj = (this.$parent && this.$parent.getSepDataset && this.$parent.getSepDataset(this.dataset)) || null;
      if (this.datasetObj) {
        updateDatasetListeners(this, true);
      }
      this.updateGrid();
    },

    clearData() {
      if (this.datasetObj) {
        updateDatasetListeners(this, false);
        if (!this.isFirst) {
          const source = this._source();
          source._source.localdata = this.datasetObj.data;
          this.updatebounddata('cells');
        }
        this.datasetObj = null;
      }
    },

    // IDE - add methods for dataset
    /**
     * If the dataset prop is changed, update the source of the adapter and re-bind.
     */
    updateGrid(isRowUpdated = false) {
      if (!this._source()) {
        return;
      }

      const datasetSource = {};
      if (this.datasetObj) {
        // if (this.isFirst || !isRowUpdated) {
        if (this.isFirst) {
          const datafields = this.datasetObj.getDatafields();
          const localdata = this.datasetObj.getRawData();
          const isInitialized = this.datasetObj.initialized;
          datasetSource.datafields = datafields;
          datasetSource.localdata = localdata;
          if (this.datasetObj.getRawDataType() === this.datasetObj.DATA_TYPE.OBJECT) {
            datasetSource.datatype = 'json';
          } else {
            datasetSource.datatype = 'array';
          }

          if (localdata.length) {
            this.isFirst = false;
          }
          this.useDataSource = false;

          const selections = this.datasetObj.getSelectedIndexes();
          if (selections.length > 0) {
            if (this.selectionmode === 'multiplerows' || this.selectionmode === 'multiplerowsextended' || this.selectionmode === 'checkbox') {
              this.selectedrowindexes = selections.slice();
            } else if (this.selectionmode === 'singlerow') {
              this.selectedrowindex = selections[selections.length - 1];
            }
          }

          // update adapter source
          this._source().setSource(datasetSource);
          // re-bind
          this.source.dataBind();
        } else {
          const source = this._source();
          source._source.localdata = this.datasetObj.data;
          const selections = this.datasetObj.getSelectedIndexes();
          let bClear = false;
          if (selections.length > 0) {
            if (this.selectionmode === 'multiplerows' || this.selectionmode === 'multiplerowsextended' || this.selectionmode === 'checkbox') {
              this.selectedrowindexes = selections.slice();
            } else if (this.selectionmode === 'singlerow') {
              this.selectedrowindex = selections[selections.length - 1];
            }
          } else if (this.selectedrowindexes.length > 0) {
            bClear = true;
            // this.clearselection();
          }
          this.updatebounddata('cells');
          if (bClear) {
            this.clearselection();
          }
        }

        // dataset 1개를 selection mode가 다른 2개의 grid가 사용하는 경우에 필요한 로직인듯 보임
        // 아래 로직은 IE에서 데이터셋 1개를 여러개의 그리드가 사용하는 경우에 알수없는 오류(symbol 에러)를 발생시킴
        // const selections = this.datasetObj.getSelectedIndexes();
        // if (selections.length > 0) {
        //   if (this.selectionmode === 'multiplerows' || this.selectionmode === 'multiplerowsextended' || this.selectionmode === 'checkbox') {
        //     this.selectedrowindexes = selections.slice();
        //   } else if (this.selectionmode === 'singlerow') {
        //     this.selectedrowindex = selections[selections.length - 1];
        //   }
        //   this.updatebounddata('cells');
        // } else {
        //   this.clearselection();
        // }
      } else if (this.dataSource) {
        this.useDataSource = true;
        this._source().setSource(this.dataSource);
        this.source.dataBind();
      } else {
        datasetSource.datafields = [];
        datasetSource.localdata = [];
        this.useDataSource = false;
        this._source().setSource(datasetSource);
        this.source.dataBind();
      }
    },
    /**
     * If the cell value of the grid has been changed, change the dataset value.
     */
    cellValueChanged(event) {
      if (!this.useDataSource && event.args && this.datasetObj) {
        const rowIndex = event.args.rowindex;
        const { datafields } = this._source()._source;
        const datafield = datafields ? datafields.find(df => df.name === event.args.datafield) : undefined;
        const colIndex = datafield ? datafield.map : undefined;

        if (rowIndex !== undefined && colIndex !== undefined) {
          const rawData = (this.source && this.source.loadedData) || [];
          if (rawData.length > 0 && rawData[rowIndex][colIndex] !== event.args.value) {
            this.datasetObj.setData(rowIndex, colIndex, event.args.value, this.id);
          }
        }
      }
    },
    /**
     * If row is selected, match the selection and sync of the dataset.
     */
    rowSelected(event) {
      if (this.datasetObj) {
        if (this.selectionmode === 'multiplerows' || this.selectionmode === 'multiplerowsextended' || this.selectionmode === 'checkbox') {
          this.datasetObj.setSelectedIndexes(this.selectedrowindexes, this.id);
          if (this.selectedrowindexes.length === 0) {
            this.unselectrow();
          }
        } else if (this.selectionmode === 'singlerow') {
          // prevent cycle.
          if (event.args.rowindex !== this.selectedrowindex) {
            this.datasetObj.setSelectedIndexes([event.args.rowindex], this.id);
          }
        }
      }
    },
    /**
     * If row is unselected, match the selection and sync of the dataset.
     */
    rowUnselected() {
      if (this.datasetObj && (this.selectionmode === 'multiplerows' || this.selectionmode === 'multiplerowsextended' || this.selectionmode === 'checkbox')) {
        this.datasetObj.setSelectedIndexes(this.selectedrowindexes, this.id);
      }
    },
    // IDE END

    createComponent(options) {
      if (!this.autoCreate) this.__createComponent__(options);
      else console.warn('Component is already created! If you want to use createComponent, please set "autoCreate" property to "false".');
    },
    setOptions(options) {
      JQXLite(this.componentSelector).jqxGrid(options);
    },
    getOptions() {
      const usedProps = Object.keys(this.__manageProps__());
      const resultToReturn = {};
      for (let i = 0; i < usedProps.length; i++) {
        resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxGrid(usedProps[i]);
      }
      return resultToReturn;
    },
    autoresizecolumns(type) {
      JQXLite(this.componentSelector).jqxGrid('autoresizecolumns', type);
    },
    autoresizecolumn(dataField, type) {
      JQXLite(this.componentSelector).jqxGrid('autoresizecolumn', dataField, type);
    },
    beginupdate() {
      JQXLite(this.componentSelector).jqxGrid('beginupdate');
    },
    clear() {
      // IDE BEGIN - clear
      if (this.datasetObj && !this.datasetObj.readonly) {
        this.datasetObj.clearDataset(this.id);
        this.updateGrid();
      } else {
        // original code
        JQXLite(this.componentSelector).jqxGrid('clear');
      }
      // IDE END
    },
    destroy() {
      JQXLite(this.componentSelector).jqxGrid('destroy');
    },
    endupdate() {
      JQXLite(this.componentSelector).jqxGrid('endupdate');
    },
    ensurerowvisible(rowBoundIndex) {
      JQXLite(this.componentSelector).jqxGrid('ensurerowvisible', rowBoundIndex);
    },
    focus() {
      JQXLite(this.componentSelector).jqxGrid('focus');
    },
    getcolumnindex(dataField) {
      return JQXLite(this.componentSelector).jqxGrid('getcolumnindex', dataField);
    },
    getcolumn(dataField) {
      return JQXLite(this.componentSelector).jqxGrid('getcolumn', dataField);
    },
    getcolumnproperty(dataField, propertyName) {
      return JQXLite(this.componentSelector).jqxGrid('getcolumnproperty', dataField, propertyName);
    },
    getrowid(rowBoundIndex) {
      return JQXLite(this.componentSelector).jqxGrid('getrowid', rowBoundIndex);
    },
    getrowdata(rowBoundIndex) {
      return JQXLite(this.componentSelector).jqxGrid('getrowdata', rowBoundIndex);
    },
    getrowdatabyid(rowID) {
      return JQXLite(this.componentSelector).jqxGrid('getrowdatabyid', rowID);
    },
    getrowboundindexbyid(rowID) {
      return JQXLite(this.componentSelector).jqxGrid('getrowboundindexbyid', rowID);
    },
    getrowboundindex(rowDisplayIndex) {
      return JQXLite(this.componentSelector).jqxGrid('getrowboundindex', rowDisplayIndex);
    },
    getrows() {
      return JQXLite(this.componentSelector).jqxGrid('getrows');
    },
    getboundrows() {
      return JQXLite(this.componentSelector).jqxGrid('getboundrows');
    },
    getdisplayrows() {
      return JQXLite(this.componentSelector).jqxGrid('getdisplayrows');
    },
    getdatainformation() {
      return JQXLite(this.componentSelector).jqxGrid('getdatainformation');
    },
    getsortinformation() {
      return JQXLite(this.componentSelector).jqxGrid('getsortinformation');
    },
    getpaginginformation() {
      return JQXLite(this.componentSelector).jqxGrid('getpaginginformation');
    },
    hidecolumn(dataField) {
      JQXLite(this.componentSelector).jqxGrid('hidecolumn', dataField);
    },
    hideloadelement() {
      JQXLite(this.componentSelector).jqxGrid('hideloadelement');
    },
    hiderowdetails(rowBoundIndex) {
      JQXLite(this.componentSelector).jqxGrid('hiderowdetails', rowBoundIndex);
    },
    iscolumnvisible(dataField) {
      return JQXLite(this.componentSelector).jqxGrid('iscolumnvisible', dataField);
    },
    iscolumnpinned(dataField) {
      return JQXLite(this.componentSelector).jqxGrid('iscolumnpinned', dataField);
    },
    localizestrings(localizationobject) {
      JQXLite(this.componentSelector).jqxGrid('localizestrings', localizationobject);
    },
    pincolumn(dataField) {
      JQXLite(this.componentSelector).jqxGrid('pincolumn', dataField);
    },
    refreshdata() {
      JQXLite(this.componentSelector).jqxGrid('refreshdata');
    },
    refresh() {
      JQXLite(this.componentSelector).jqxGrid('refresh');
    },
    render() {
      JQXLite(this.componentSelector).jqxGrid('render');
    },
    scrolloffset(top, left) {
      JQXLite(this.componentSelector).jqxGrid('scrolloffset', top, left);
    },
    scrollposition() {
      return JQXLite(this.componentSelector).jqxGrid('scrollposition');
    },
    showloadelement() {
      JQXLite(this.componentSelector).jqxGrid('showloadelement');
    },
    showrowdetails(rowBoundIndex) {
      JQXLite(this.componentSelector).jqxGrid('showrowdetails', rowBoundIndex);
    },
    setcolumnindex(dataField, index) {
      JQXLite(this.componentSelector).jqxGrid('setcolumnindex', dataField, index);
    },
    setcolumnproperty(dataField, propertyName, propertyValue) {
      JQXLite(this.componentSelector).jqxGrid('setcolumnproperty', dataField, propertyName, propertyValue);
    },
    showcolumn(dataField) {
      JQXLite(this.componentSelector).jqxGrid('showcolumn', dataField);
    },
    unpincolumn(dataField) {
      JQXLite(this.componentSelector).jqxGrid('unpincolumn', dataField);
    },
    updatebounddata(type) {
      JQXLite(this.componentSelector).jqxGrid('updatebounddata', type);
    },
    updating() {
      return JQXLite(this.componentSelector).jqxGrid('updating');
    },
    getsortcolumn() {
      return JQXLite(this.componentSelector).jqxGrid('getsortcolumn');
    },
    removesort() {
      JQXLite(this.componentSelector).jqxGrid('removesort');
    },
    sortby(dataField, sortOrder) {
      JQXLite(this.componentSelector).jqxGrid('sortby', dataField, sortOrder);
    },
    addgroup(dataField) {
      JQXLite(this.componentSelector).jqxGrid('addgroup', dataField);
    },
    cleargroups() {
      JQXLite(this.componentSelector).jqxGrid('cleargroups');
    },
    collapsegroup(group) {
      JQXLite(this.componentSelector).jqxGrid('collapsegroup', group);
    },
    collapseallgroups() {
      JQXLite(this.componentSelector).jqxGrid('collapseallgroups');
    },
    expandallgroups() {
      JQXLite(this.componentSelector).jqxGrid('expandallgroups');
    },
    expandgroup(group) {
      JQXLite(this.componentSelector).jqxGrid('expandgroup', group);
    },
    getrootgroupscount() {
      return JQXLite(this.componentSelector).jqxGrid('getrootgroupscount');
    },
    getgroup(groupIndex) {
      return JQXLite(this.componentSelector).jqxGrid('getgroup', groupIndex);
    },
    insertgroup(groupIndex, dataField) {
      JQXLite(this.componentSelector).jqxGrid('insertgroup', groupIndex, dataField);
    },
    iscolumngroupable() {
      return JQXLite(this.componentSelector).jqxGrid('iscolumngroupable');
    },
    removegroupat(groupIndex) {
      JQXLite(this.componentSelector).jqxGrid('removegroupat', groupIndex);
    },
    removegroup(dataField) {
      JQXLite(this.componentSelector).jqxGrid('removegroup', dataField);
    },
    addfilter(dataField, filterGroup, refreshGrid) {
      JQXLite(this.componentSelector).jqxGrid('addfilter', dataField, filterGroup, refreshGrid);
    },
    applyfilters() {
      JQXLite(this.componentSelector).jqxGrid('applyfilters');
    },
    clearfilters() {
      JQXLite(this.componentSelector).jqxGrid('clearfilters');
    },
    getfilterinformation() {
      return JQXLite(this.componentSelector).jqxGrid('getfilterinformation');
    },
    getcolumnat(index) {
      return JQXLite(this.componentSelector).jqxGrid('getcolumnat', index);
    },
    removefilter(dataField, refreshGrid) {
      JQXLite(this.componentSelector).jqxGrid('removefilter', dataField, refreshGrid);
    },
    refreshfilterrow() {
      JQXLite(this.componentSelector).jqxGrid('refreshfilterrow');
    },
    gotopage(pagenumber) {
      JQXLite(this.componentSelector).jqxGrid('gotopage', pagenumber);
    },
    gotoprevpage() {
      JQXLite(this.componentSelector).jqxGrid('gotoprevpage');
    },
    gotonextpage() {
      JQXLite(this.componentSelector).jqxGrid('gotonextpage');
    },
    addrow(rowIds, data, rowPosition) {
      // IDE BEGIN - add row
      // CAUTION: If you use dataset, you can not set rowId.
      if (this.datasetObj && !this.datasetObj.readonly) {
        let start = false;
        if (rowPosition === 'first') {
          start = true;
        }
        this.datasetObj.addRows(data, start, this.id);
        this.updateGrid();
      } else {
        JQXLite(this.componentSelector).jqxGrid('addrow', rowIds, data, rowPosition);
      }
      // IDE END
    },
    begincelledit(rowBoundIndex, dataField) {
      JQXLite(this.componentSelector).jqxGrid('begincelledit', rowBoundIndex, dataField);
    },
    beginrowedit(rowBoundIndex) {
      JQXLite(this.componentSelector).jqxGrid('beginrowedit', rowBoundIndex);
    },
    closemenu() {
      JQXLite(this.componentSelector).jqxGrid('closemenu');
    },
    deleterow(rowIds) {
      // IDE BEGIN - delete row
      if (this.datasetObj && !this.datasetObj.readonly) {
        const inputs = createDatasetInput(this, rowIds);
        const indexes = inputs ? inputs.indexes : [];
        this.datasetObj.deleteRows(indexes, this.id);
        this.updateGrid();
      } else {
        JQXLite(this.componentSelector).jqxGrid('deleterow', rowIds);
      }
      // IDE 20190521 END
    },
    endcelledit(rowBoundIndex, dataField, confirmChanges) {
      JQXLite(this.componentSelector).jqxGrid('endcelledit', rowBoundIndex, dataField, confirmChanges);
    },
    endrowedit(rowBoundIndex, confirmChanges) {
      JQXLite(this.componentSelector).jqxGrid('endrowedit', rowBoundIndex, confirmChanges);
    },
    getcell(rowBoundIndex, datafield) {
      return JQXLite(this.componentSelector).jqxGrid('getcell', rowBoundIndex, datafield);
    },
    getcellatposition(left, top) {
      return JQXLite(this.componentSelector).jqxGrid('getcellatposition', left, top);
    },
    getcelltext(rowBoundIndex, dataField) {
      return JQXLite(this.componentSelector).jqxGrid('getcelltext', rowBoundIndex, dataField);
    },
    getcelltextbyid(rowID, dataField) {
      return JQXLite(this.componentSelector).jqxGrid('getcelltextbyid', rowID, dataField);
    },
    getcellvaluebyid(rowID, dataField) {
      return JQXLite(this.componentSelector).jqxGrid('getcellvaluebyid', rowID, dataField);
    },
    getcellvalue(rowBoundIndex, dataField) {
      return JQXLite(this.componentSelector).jqxGrid('getcellvalue', rowBoundIndex, dataField);
    },
    isBindingCompleted() {
      return JQXLite(this.componentSelector).jqxGrid('isBindingCompleted');
    },
    openmenu(dataField) {
      JQXLite(this.componentSelector).jqxGrid('openmenu', dataField);
    },
    setcellvalue(rowBoundIndex, dataField, value) {
      JQXLite(this.componentSelector).jqxGrid('setcellvalue', rowBoundIndex, dataField, value);
    },
    setcellvaluebyid(rowID, dataField, value) {
      JQXLite(this.componentSelector).jqxGrid('setcellvaluebyid', rowID, dataField, value);
    },
    showvalidationpopup(rowBoundIndex, dataField, validationMessage) {
      JQXLite(this.componentSelector).jqxGrid('showvalidationpopup', rowBoundIndex, dataField, validationMessage);
    },
    updaterow(rowIds, data) {
      // IDE BEGIN - update row
      if (this.datasetObj && !this.datasetObj.readonly) {
        const inputs = createDatasetInput(this, rowIds, data);
        if (inputs) {
          const { indexes, inputData } = inputs;
          this.datasetObj.updateRows(indexes, inputData, this.id);
        }
      } else {
        JQXLite(this.componentSelector).jqxGrid('updaterow', rowIds, data);
      }
      // IDE END
    },
    // IDE BEGIN - force updating component size
    updatesize() {
      JQXLite(this.componentSelector).jqxGrid('_updatesize');
    },
    // IDE END
    clearselection() {
      // IDE BEGIN
      if (this.columns.records) {
        JQXLite(this.componentSelector).jqxGrid('clearselection');
      }
      // IDE END

      // original code
      // JQXLite(this.componentSelector).jqxGrid('clearselection');
    },
    getselectedrowindex() {
      return JQXLite(this.componentSelector).jqxGrid('getselectedrowindex');
    },
    getselectedrowindexes() {
      return JQXLite(this.componentSelector).jqxGrid('getselectedrowindexes');
    },
    getselectedcell() {
      return JQXLite(this.componentSelector).jqxGrid('getselectedcell');
    },
    getselectedcells() {
      return JQXLite(this.componentSelector).jqxGrid('getselectedcells');
    },
    selectcell(rowBoundIndex, dataField) {
      JQXLite(this.componentSelector).jqxGrid('selectcell', rowBoundIndex, dataField);
    },
    selectallrows() {
      JQXLite(this.componentSelector).jqxGrid('selectallrows');
    },
    selectrow(rowBoundIndex) {
      JQXLite(this.componentSelector).jqxGrid('selectrow', rowBoundIndex);
    },
    unselectrow(rowBoundIndex) {
      JQXLite(this.componentSelector).jqxGrid('unselectrow', rowBoundIndex);
    },
    unselectcell(rowBoundIndex, dataField) {
      JQXLite(this.componentSelector).jqxGrid('unselectcell', rowBoundIndex, dataField);
    },
    getcolumnaggregateddata(dataField, aggregates) {
      return JQXLite(this.componentSelector).jqxGrid('getcolumnaggregateddata', dataField, aggregates);
    },
    refreshaggregates() {
      JQXLite(this.componentSelector).jqxGrid('refreshaggregates');
    },
    renderaggregates() {
      JQXLite(this.componentSelector).jqxGrid('renderaggregates');
    },
    exportdata(dataType, fileName, exportHeader, rows, exportHiddenColumns, serverURL, charSet) {
      return JQXLite(this.componentSelector).jqxGrid('exportdata', dataType, fileName, exportHeader, rows, exportHiddenColumns, serverURL, charSet);
    },
    getstate() {
      return JQXLite(this.componentSelector).jqxGrid('getstate');
    },
    loadstate(stateobject) {
      JQXLite(this.componentSelector).jqxGrid('loadstate', stateobject);
    },
    savestate() {
      return JQXLite(this.componentSelector).jqxGrid('savestate');
    },
    _altrows(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('altrows', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('altrows');
      }
    },
    _altstart(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('altstart', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('altstart');
      }
    },
    _altstep(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('altstep', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('altstep');
      }
    },
    _autoshowloadelement(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('autoshowloadelement', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('autoshowloadelement');
      }
    },
    _autoshowfiltericon(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('autoshowfiltericon', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('autoshowfiltericon');
      }
    },
    _autoshowcolumnsmenubutton(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('autoshowcolumnsmenubutton', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('autoshowcolumnsmenubutton');
      }
    },
    _showcolumnlines(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showcolumnlines', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showcolumnlines');
      }
    },
    _showrowlines(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showrowlines', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showrowlines');
      }
    },
    _showcolumnheaderlines(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showcolumnheaderlines', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showcolumnheaderlines');
      }
    },
    _adaptive(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('adaptive', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('adaptive');
      }
    },
    _adaptivewidth(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('adaptivewidth', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('adaptivewidth');
      }
    },
    _clipboard(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('clipboard', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('clipboard');
      }
    },
    _closeablegroups(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('closeablegroups', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('closeablegroups');
      }
    },
    _columnsmenuwidth(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('columnsmenuwidth', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('columnsmenuwidth');
      }
    },
    _columnmenuopening(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('columnmenuopening', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('columnmenuopening');
      }
    },
    _columnmenuclosing(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('columnmenuclosing', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('columnmenuclosing');
      }
    },
    _cellhover(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('cellhover', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('cellhover');
      }
    },
    _enablekeyboarddelete(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('enablekeyboarddelete', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('enablekeyboarddelete');
      }
    },
    _enableellipsis(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('enableellipsis', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('enableellipsis');
      }
    },
    _enablemousewheel(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('enablemousewheel', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('enablemousewheel');
      }
    },
    _enableanimations(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('enableanimations', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('enableanimations');
      }
    },
    _enabletooltips(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('enabletooltips', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('enabletooltips');
      }
    },
    // IDE BEGIN tooltip option for text cell
    _enabletexttooltips(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('enabletexttooltips', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('enabletexttooltips');
      }
    },
    // IDE END
    _enablehover(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('enablehover', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('enablehover');
      }
    },
    _enablebrowserselection(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('enablebrowserselection', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('enablebrowserselection');
      }
    },
    _everpresentrowposition(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('everpresentrowposition', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('everpresentrowposition');
      }
    },
    _everpresentrowheight(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('everpresentrowheight', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('everpresentrowheight');
      }
    },
    _everpresentrowactions(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('everpresentrowactions', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('everpresentrowactions');
      }
    },
    _everpresentrowactionsmode(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('everpresentrowactionsmode', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('everpresentrowactionsmode');
      }
    },
    _filterrowheight(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('filterrowheight', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('filterrowheight');
      }
    },
    _filtermode(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('filtermode', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('filtermode');
      }
    },
    _groupsrenderer(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('groupsrenderer', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('groupsrenderer');
      }
    },
    _groupcolumnrenderer(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('groupcolumnrenderer', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('groupcolumnrenderer');
      }
    },
    _groupsexpandedbydefault(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('groupsexpandedbydefault', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('groupsexpandedbydefault');
      }
    },
    _handlekeyboardnavigation(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('handlekeyboardnavigation', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('handlekeyboardnavigation');
      }
    },
    _pagerrenderer(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('pagerrenderer', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('pagerrenderer');
      }
    },
    _rtl(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('rtl', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('rtl');
      }
    },
    _showdefaultloadelement(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showdefaultloadelement', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showdefaultloadelement');
      }
    },
    _showfiltercolumnbackground(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showfiltercolumnbackground', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showfiltercolumnbackground');
      }
    },
    _showfiltermenuitems(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showfiltermenuitems', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showfiltermenuitems');
      }
    },
    _showpinnedcolumnbackground(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showpinnedcolumnbackground', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showpinnedcolumnbackground');
      }
    },
    _showsortcolumnbackground(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showsortcolumnbackground', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showsortcolumnbackground');
      }
    },
    _showsortmenuitems(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showsortmenuitems', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showsortmenuitems');
      }
    },
    _showgroupmenuitems(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showgroupmenuitems', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showgroupmenuitems');
      }
    },
    _showrowdetailscolumn(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showrowdetailscolumn', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showrowdetailscolumn');
      }
    },
    _showheader(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showheader', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showheader');
      }
    },
    _showgroupsheader(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showgroupsheader', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showgroupsheader');
      }
    },
    _showaggregates(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showaggregates', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showaggregates');
      }
    },
    _showgroupaggregates(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showgroupaggregates', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showgroupaggregates');
      }
    },
    _showeverpresentrow(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showeverpresentrow', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showeverpresentrow');
      }
    },
    _showfilterrow(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showfilterrow', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showfilterrow');
      }
    },
    _showemptyrow(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showemptyrow', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showemptyrow');
      }
    },
    _showstatusbar(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showstatusbar', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showstatusbar');
      }
    },
    _statusbarheight(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('statusbarheight', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('statusbarheight');
      }
    },
    _showtoolbar(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('showtoolbar', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('showtoolbar');
      }
    },
    _selectionmode(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('selectionmode', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('selectionmode');
      }
    },
    _updatefilterconditions(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('updatefilterconditions', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('updatefilterconditions');
      }
    },
    _updatefilterpanel(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('updatefilterpanel', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('updatefilterpanel');
      }
    },
    _theme(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('theme', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('theme');
      }
    },
    _toolbarheight(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('toolbarheight', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('toolbarheight');
      }
    },
    _autoheight(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('autoheight', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('autoheight');
      }
    },
    _autorowheight(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('autorowheight', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('autorowheight');
      }
    },
    _columnsheight(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('columnsheight', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('columnsheight');
      }
    },
    _deferreddatafields(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('deferreddatafields', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('deferreddatafields');
      }
    },
    _groupsheaderheight(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('groupsheaderheight', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('groupsheaderheight');
      }
    },
    _groupindentwidth(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('groupindentwidth', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('groupindentwidth');
      }
    },
    _height(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('height', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('height');
      }
    },
    _pagerheight(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('pagerheight', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('pagerheight');
      }
    },
    _rowsheight(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('rowsheight', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('rowsheight');
      }
    },
    _scrollbarsize(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('scrollbarsize', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('scrollbarsize');
      }
    },
    _scrollmode(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('scrollmode', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('scrollmode');
      }
    },
    _scrollfeedback(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('scrollfeedback', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('scrollfeedback');
      }
    },
    _width(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('width', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('width');
      }
    },
    _autosavestate(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('autosavestate', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('autosavestate');
      }
    },
    _autoloadstate(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('autoloadstate', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('autoloadstate');
      }
    },
    _columns(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('columns', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('columns');
      }
    },
    _columngroups(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('columngroups', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('columngroups');
      }
    },
    _columnsmenu(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('columnsmenu', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('columnsmenu');
      }
    },
    _columnsresize(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('columnsresize', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('columnsresize');
      }
    },
    _columnsautoresize(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('columnsautoresize', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('columnsautoresize');
      }
    },
    _columnsreorder(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('columnsreorder', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('columnsreorder');
      }
    },
    _disabled(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('disabled', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('disabled');
      }
    },
    _editable(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('editable', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('editable');
      }
    },
    _editmode(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('editmode', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('editmode');
      }
    },
    _filter(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('filter', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('filter');
      }
    },
    _filterable(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('filterable', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('filterable');
      }
    },
    _groupable(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('groupable', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('groupable');
      }
    },
    _groups(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('groups', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('groups');
      }
    },
    _horizontalscrollbarstep(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('horizontalscrollbarstep', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('horizontalscrollbarstep');
      }
    },
    _horizontalscrollbarlargestep(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('horizontalscrollbarlargestep', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('horizontalscrollbarlargestep');
      }
    },
    _initrowdetails(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('initrowdetails', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('initrowdetails');
      }
    },
    _keyboardnavigation(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('keyboardnavigation', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('keyboardnavigation');
      }
    },
    _localization(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('localization', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('localization');
      }
    },
    _pagesize(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('pagesize', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('pagesize');
      }
    },
    _pagesizeoptions(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('pagesizeoptions', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('pagesizeoptions');
      }
    },
    _pagermode(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('pagermode', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('pagermode');
      }
    },
    _pagerbuttonscount(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('pagerbuttonscount', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('pagerbuttonscount');
      }
    },
    _pageable(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('pageable', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('pageable');
      }
    },
    _rowdetails(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('rowdetails', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('rowdetails');
      }
    },
    _rowdetailstemplate(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('rowdetailstemplate', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('rowdetailstemplate');
      }
    },
    _ready(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('ready', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('ready');
      }
    },
    _rendered(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('rendered', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('rendered');
      }
    },
    _renderstatusbar(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('renderstatusbar', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('renderstatusbar');
      }
    },
    _rendertoolbar(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('rendertoolbar', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('rendertoolbar');
      }
    },
    _rendergridrows(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('rendergridrows', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('rendergridrows');
      }
    },
    _sortable(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('sortable', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('sortable');
      }
    },
    _sortmode(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('sortmode', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('sortmode');
      }
    },
    _selectedrowindex(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('selectedrowindex', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('selectedrowindex');
      }
    },
    _selectedrowindexes(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('selectedrowindexes', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('selectedrowindexes');
      }
    },
    _source(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('source', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('source');
      }
    },
    _sorttogglestates(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('sorttogglestates', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('sorttogglestates');
      }
    },
    _updatedelay(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('updatedelay', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('updatedelay');
      }
    },
    _virtualmode(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('virtualmode', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('virtualmode');
      }
    },
    _verticalscrollbarstep(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('verticalscrollbarstep', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('verticalscrollbarstep');
      }
    },
    _verticalscrollbarlargestep(arg) {
      if (arg !== undefined) {
        JQXLite(this.componentSelector).jqxGrid('verticalscrollbarlargestep', arg);
      } else {
        return JQXLite(this.componentSelector).jqxGrid('verticalscrollbarlargestep');
      }
    },
    __createComponent__(options) {
      let widgetOptions;
      options ? widgetOptions = options : widgetOptions = this.__manageProps__();
      JQXLite(this.componentSelector).jqxGrid(widgetOptions);
      this.__extendProps__();
      this.__wireEvents__();
      return JQXLite(this.componentSelector).jqxGrid('getInstance');
    },
    __manageProps__() {
      // IDE BEGIN floatingscrollbar
      //const widgetProps = ['altrows','altstart','altstep','autoshowloadelement','autoshowfiltericon','autoshowcolumnsmenubutton','showcolumnlines','showrowlines','showcolumnheaderlines','adaptive','adaptivewidth','clipboard','closeablegroups','columnsmenuwidth','columnmenuopening','columnmenuclosing','cellhover','enablekeyboarddelete','enableellipsis','enablemousewheel','enableanimations','enabletooltips','enablehover','enablebrowserselection','everpresentrowposition','everpresentrowheight','everpresentrowactions','everpresentrowactionsmode','filterrowheight','filtermode','groupsrenderer','groupcolumnrenderer','groupsexpandedbydefault','handlekeyboardnavigation','pagerrenderer','rtl','showdefaultloadelement','showfiltercolumnbackground','showfiltermenuitems','showpinnedcolumnbackground','showsortcolumnbackground','showsortmenuitems','showgroupmenuitems','showrowdetailscolumn','showheader','showgroupsheader','showaggregates','showgroupaggregates','showeverpresentrow','showfilterrow','showemptyrow','showstatusbar','statusbarheight','showtoolbar','selectionmode','updatefilterconditions','updatefilterpanel','theme','toolbarheight','autoheight','autorowheight','columnsheight','deferreddatafields','groupsheaderheight','groupindentwidth','height','pagerheight','rowsheight','scrollbarsize','scrollmode','scrollfeedback','width','autosavestate','autoloadstate','columns','columngroups','columnsmenu','columnsresize','columnsautoresize','columnsreorder','disabled','editable','editmode','filter','filterable','groupable','groups','horizontalscrollbarstep','horizontalscrollbarlargestep','initrowdetails','keyboardnavigation','localization','pagesize','pagesizeoptions','pagermode','pagerbuttonscount','pageable','rowdetails','rowdetailstemplate','ready','rendered','renderstatusbar','rendertoolbar','rendergridrows','sortable','sortmode','selectedrowindex','selectedrowindexes','source','sorttogglestates','updatedelay','virtualmode','verticalscrollbarstep','verticalscrollbarlargestep'];
      const widgetProps = ['altrows','altstart','altstep','autoshowloadelement','autoshowfiltericon','autoshowcolumnsmenubutton','showcolumnlines','showrowlines','showcolumnheaderlines','adaptive','adaptivewidth','clipboard','closeablegroups','columnsmenuwidth','columnmenuopening','columnmenuclosing','cellhover','enablekeyboarddelete','enableellipsis','enablemousewheel','enableanimations','enabletooltips','enabletexttooltips','enablehover','enablebrowserselection','everpresentrowposition','everpresentrowheight','everpresentrowactions','everpresentrowactionsmode','filterrowheight','filtermode','groupsrenderer','groupcolumnrenderer','groupsexpandedbydefault','handlekeyboardnavigation','pagerrenderer','rtl','showdefaultloadelement','showfiltercolumnbackground','showfiltermenuitems','showpinnedcolumnbackground','showsortcolumnbackground','showsortmenuitems','showgroupmenuitems','showrowdetailscolumn','showheader','showgroupsheader','showaggregates','showgroupaggregates','showeverpresentrow','showfilterrow','showemptyrow','showstatusbar','statusbarheight','showtoolbar','selectionmode','updatefilterconditions','updatefilterpanel','theme','toolbarheight','autoheight','autorowheight','columnsheight','deferreddatafields','groupsheaderheight','groupindentwidth','height','pagerheight','rowsheight','scrollbarsize','scrollmode','scrollfeedback','width','autosavestate','autoloadstate','columns','columngroups','columnsmenu','columnsresize','columnsautoresize','columnsreorder','disabled','editable','editmode','filter','filterable','groupable','groups','horizontalscrollbarstep','horizontalscrollbarlargestep','initrowdetails','keyboardnavigation','localization','pagesize','pagesizeoptions','pagermode','pagerbuttonscount','pageable','rowdetails','rowdetailstemplate','ready','rendered','renderstatusbar','rendertoolbar','rendergridrows','sortable','sortmode','selectedrowindex','selectedrowindexes','source','sorttogglestates','updatedelay','virtualmode','verticalscrollbarstep','verticalscrollbarlargestep', 'floatingscrollbar', 'verticalscrollable', 'upperhiddenrowcount'];
      // IDE END
      const componentProps = this.$options.propsData;
      let options = {};

      for (let prop in componentProps) {
        if (widgetProps.indexOf(prop) !== -1) {
          options[prop] = componentProps[prop];
        }
      }
      return options;
    },
    __extendProps__() {
      const that = this;

      Object.defineProperty(that, 'altrows', {
        get() {
          return that._altrows();
        },
        set(newValue) {
          that._altrows(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'altstart', {
        get() {
          return that._altstart();
        },
        set(newValue) {
          that._altstart(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'altstep', {
        get() {
          return that._altstep();
        },
        set(newValue) {
          that._altstep(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'autoshowloadelement', {
        get() {
          return that._autoshowloadelement();
        },
        set(newValue) {
          that._autoshowloadelement(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'autoshowfiltericon', {
        get() {
          return that._autoshowfiltericon();
        },
        set(newValue) {
          that._autoshowfiltericon(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'autoshowcolumnsmenubutton', {
        get() {
          return that._autoshowcolumnsmenubutton();
        },
        set(newValue) {
          that._autoshowcolumnsmenubutton(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showcolumnlines', {
        get() {
          return that._showcolumnlines();
        },
        set(newValue) {
          that._showcolumnlines(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showrowlines', {
        get() {
          return that._showrowlines();
        },
        set(newValue) {
          that._showrowlines(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showcolumnheaderlines', {
        get() {
          return that._showcolumnheaderlines();
        },
        set(newValue) {
          that._showcolumnheaderlines(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'adaptive', {
        get() {
          return that._adaptive();
        },
        set(newValue) {
          that._adaptive(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'adaptivewidth', {
        get() {
          return that._adaptivewidth();
        },
        set(newValue) {
          that._adaptivewidth(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'clipboard', {
        get() {
          return that._clipboard();
        },
        set(newValue) {
          that._clipboard(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'closeablegroups', {
        get() {
          return that._closeablegroups();
        },
        set(newValue) {
          that._closeablegroups(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'columnsmenuwidth', {
        get() {
          return that._columnsmenuwidth();
        },
        set(newValue) {
          that._columnsmenuwidth(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'columnmenuopening', {
        get() {
          return that._columnmenuopening();
        },
        set(newValue) {
          that._columnmenuopening(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'columnmenuclosing', {
        get() {
          return that._columnmenuclosing();
        },
        set(newValue) {
          that._columnmenuclosing(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'cellhover', {
        get() {
          return that._cellhover();
        },
        set(newValue) {
          that._cellhover(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'enablekeyboarddelete', {
        get() {
          return that._enablekeyboarddelete();
        },
        set(newValue) {
          that._enablekeyboarddelete(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'enableellipsis', {
        get() {
          return that._enableellipsis();
        },
        set(newValue) {
          that._enableellipsis(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'enablemousewheel', {
        get() {
          return that._enablemousewheel();
        },
        set(newValue) {
          that._enablemousewheel(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'enableanimations', {
        get() {
          return that._enableanimations();
        },
        set(newValue) {
          that._enableanimations(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'enabletooltips', {
        get() {
          return that._enabletooltips();
        },
        set(newValue) {
          that._enabletooltips(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      // IDE BEGIN tooltip option for text cell
      Object.defineProperty(that, 'enabletexttooltips', {
        get() {
          return that._enabletexttooltips();
        },
        set(newValue) {
          that._enabletexttooltips(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      // IDE END
      Object.defineProperty(that, 'enablehover', {
        get() {
          return that._enablehover();
        },
        set(newValue) {
          that._enablehover(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'enablebrowserselection', {
        get() {
          return that._enablebrowserselection();
        },
        set(newValue) {
          that._enablebrowserselection(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'everpresentrowposition', {
        get() {
          return that._everpresentrowposition();
        },
        set(newValue) {
          that._everpresentrowposition(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'everpresentrowheight', {
        get() {
          return that._everpresentrowheight();
        },
        set(newValue) {
          that._everpresentrowheight(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'everpresentrowactions', {
        get() {
          return that._everpresentrowactions();
        },
        set(newValue) {
          that._everpresentrowactions(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'everpresentrowactionsmode', {
        get() {
          return that._everpresentrowactionsmode();
        },
        set(newValue) {
          that._everpresentrowactionsmode(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'filterrowheight', {
        get() {
          return that._filterrowheight();
        },
        set(newValue) {
          that._filterrowheight(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'filtermode', {
        get() {
          return that._filtermode();
        },
        set(newValue) {
          that._filtermode(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'groupsrenderer', {
        get() {
          return that._groupsrenderer();
        },
        set(newValue) {
          that._groupsrenderer(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'groupcolumnrenderer', {
        get() {
          return that._groupcolumnrenderer();
        },
        set(newValue) {
          that._groupcolumnrenderer(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'groupsexpandedbydefault', {
        get() {
          return that._groupsexpandedbydefault();
        },
        set(newValue) {
          that._groupsexpandedbydefault(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'handlekeyboardnavigation', {
        get() {
          return that._handlekeyboardnavigation();
        },
        set(newValue) {
          that._handlekeyboardnavigation(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'pagerrenderer', {
        get() {
          return that._pagerrenderer();
        },
        set(newValue) {
          that._pagerrenderer(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'rtl', {
        get() {
          return that._rtl();
        },
        set(newValue) {
          that._rtl(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showdefaultloadelement', {
        get() {
          return that._showdefaultloadelement();
        },
        set(newValue) {
          that._showdefaultloadelement(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showfiltercolumnbackground', {
        get() {
          return that._showfiltercolumnbackground();
        },
        set(newValue) {
          that._showfiltercolumnbackground(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showfiltermenuitems', {
        get() {
          return that._showfiltermenuitems();
        },
        set(newValue) {
          that._showfiltermenuitems(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showpinnedcolumnbackground', {
        get() {
          return that._showpinnedcolumnbackground();
        },
        set(newValue) {
          that._showpinnedcolumnbackground(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showsortcolumnbackground', {
        get() {
          return that._showsortcolumnbackground();
        },
        set(newValue) {
          that._showsortcolumnbackground(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showsortmenuitems', {
        get() {
          return that._showsortmenuitems();
        },
        set(newValue) {
          that._showsortmenuitems(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showgroupmenuitems', {
        get() {
          return that._showgroupmenuitems();
        },
        set(newValue) {
          that._showgroupmenuitems(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showrowdetailscolumn', {
        get() {
          return that._showrowdetailscolumn();
        },
        set(newValue) {
          that._showrowdetailscolumn(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showheader', {
        get() {
          return that._showheader();
        },
        set(newValue) {
          that._showheader(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showgroupsheader', {
        get() {
          return that._showgroupsheader();
        },
        set(newValue) {
          that._showgroupsheader(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showaggregates', {
        get() {
          return that._showaggregates();
        },
        set(newValue) {
          that._showaggregates(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showgroupaggregates', {
        get() {
          return that._showgroupaggregates();
        },
        set(newValue) {
          that._showgroupaggregates(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showeverpresentrow', {
        get() {
          return that._showeverpresentrow();
        },
        set(newValue) {
          that._showeverpresentrow(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showfilterrow', {
        get() {
          return that._showfilterrow();
        },
        set(newValue) {
          that._showfilterrow(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showemptyrow', {
        get() {
          return that._showemptyrow();
        },
        set(newValue) {
          that._showemptyrow(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showstatusbar', {
        get() {
          return that._showstatusbar();
        },
        set(newValue) {
          that._showstatusbar(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'statusbarheight', {
        get() {
          return that._statusbarheight();
        },
        set(newValue) {
          that._statusbarheight(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'showtoolbar', {
        get() {
          return that._showtoolbar();
        },
        set(newValue) {
          that._showtoolbar(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'selectionmode', {
        get() {
          return that._selectionmode();
        },
        set(newValue) {
          that._selectionmode(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'updatefilterconditions', {
        get() {
          return that._updatefilterconditions();
        },
        set(newValue) {
          that._updatefilterconditions(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'updatefilterpanel', {
        get() {
          return that._updatefilterpanel();
        },
        set(newValue) {
          that._updatefilterpanel(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'theme', {
        get() {
          return that._theme();
        },
        set(newValue) {
          that._theme(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'toolbarheight', {
        get() {
          return that._toolbarheight();
        },
        set(newValue) {
          that._toolbarheight(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'autoheight', {
        get() {
          return that._autoheight();
        },
        set(newValue) {
          that._autoheight(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'autorowheight', {
        get() {
          return that._autorowheight();
        },
        set(newValue) {
          that._autorowheight(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'columnsheight', {
        get() {
          return that._columnsheight();
        },
        set(newValue) {
          that._columnsheight(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'deferreddatafields', {
        get() {
          return that._deferreddatafields();
        },
        set(newValue) {
          that._deferreddatafields(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'groupsheaderheight', {
        get() {
          return that._groupsheaderheight();
        },
        set(newValue) {
          that._groupsheaderheight(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'groupindentwidth', {
        get() {
          return that._groupindentwidth();
        },
        set(newValue) {
          that._groupindentwidth(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'height', {
        get() {
          return that._height();
        },
        set(newValue) {
          that._height(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'pagerheight', {
        get() {
          return that._pagerheight();
        },
        set(newValue) {
          that._pagerheight(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'rowsheight', {
        get() {
          return that._rowsheight();
        },
        set(newValue) {
          that._rowsheight(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'scrollbarsize', {
        get() {
          return that._scrollbarsize();
        },
        set(newValue) {
          that._scrollbarsize(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'scrollmode', {
        get() {
          return that._scrollmode();
        },
        set(newValue) {
          that._scrollmode(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'scrollfeedback', {
        get() {
          return that._scrollfeedback();
        },
        set(newValue) {
          that._scrollfeedback(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'width', {
        get() {
          return that._width();
        },
        set(newValue) {
          that._width(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'autosavestate', {
        get() {
          return that._autosavestate();
        },
        set(newValue) {
          that._autosavestate(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'autoloadstate', {
        get() {
          return that._autoloadstate();
        },
        set(newValue) {
          that._autoloadstate(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'columns', {
        get() {
          return that._columns();
        },
        set(newValue) {
          that._columns(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'columngroups', {
        get() {
          return that._columngroups();
        },
        set(newValue) {
          that._columngroups(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'columnsmenu', {
        get() {
          return that._columnsmenu();
        },
        set(newValue) {
          that._columnsmenu(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'columnsresize', {
        get() {
          return that._columnsresize();
        },
        set(newValue) {
          that._columnsresize(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'columnsautoresize', {
        get() {
          return that._columnsautoresize();
        },
        set(newValue) {
          that._columnsautoresize(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'columnsreorder', {
        get() {
          return that._columnsreorder();
        },
        set(newValue) {
          that._columnsreorder(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'disabled', {
        get() {
          return that._disabled();
        },
        set(newValue) {
          that._disabled(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'editable', {
        get() {
          return that._editable();
        },
        set(newValue) {
          that._editable(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'editmode', {
        get() {
          return that._editmode();
        },
        set(newValue) {
          that._editmode(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'filter', {
        get() {
          return that._filter();
        },
        set(newValue) {
          that._filter(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'filterable', {
        get() {
          return that._filterable();
        },
        set(newValue) {
          that._filterable(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'groupable', {
        get() {
          return that._groupable();
        },
        set(newValue) {
          that._groupable(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'groups', {
        get() {
          return that._groups();
        },
        set(newValue) {
          that._groups(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'horizontalscrollbarstep', {
        get() {
          return that._horizontalscrollbarstep();
        },
        set(newValue) {
          that._horizontalscrollbarstep(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'horizontalscrollbarlargestep', {
        get() {
          return that._horizontalscrollbarlargestep();
        },
        set(newValue) {
          that._horizontalscrollbarlargestep(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'initrowdetails', {
        get() {
          return that._initrowdetails();
        },
        set(newValue) {
          that._initrowdetails(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'keyboardnavigation', {
        get() {
          return that._keyboardnavigation();
        },
        set(newValue) {
          that._keyboardnavigation(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'localization', {
        get() {
          return that._localization();
        },
        set(newValue) {
          that._localization(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'pagesize', {
        get() {
          return that._pagesize();
        },
        set(newValue) {
          that._pagesize(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'pagesizeoptions', {
        get() {
          return that._pagesizeoptions();
        },
        set(newValue) {
          that._pagesizeoptions(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'pagermode', {
        get() {
          return that._pagermode();
        },
        set(newValue) {
          that._pagermode(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'pagerbuttonscount', {
        get() {
          return that._pagerbuttonscount();
        },
        set(newValue) {
          that._pagerbuttonscount(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'pageable', {
        get() {
          return that._pageable();
        },
        set(newValue) {
          that._pageable(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'rowdetails', {
        get() {
          return that._rowdetails();
        },
        set(newValue) {
          that._rowdetails(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'rowdetailstemplate', {
        get() {
          return that._rowdetailstemplate();
        },
        set(newValue) {
          that._rowdetailstemplate(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'ready', {
        get() {
          return that._ready();
        },
        set(newValue) {
          that._ready(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'rendered', {
        get() {
          return that._rendered();
        },
        set(newValue) {
          that._rendered(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'renderstatusbar', {
        get() {
          return that._renderstatusbar();
        },
        set(newValue) {
          that._renderstatusbar(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'rendertoolbar', {
        get() {
          return that._rendertoolbar();
        },
        set(newValue) {
          that._rendertoolbar(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'rendergridrows', {
        get() {
          return that._rendergridrows();
        },
        set(newValue) {
          that._rendergridrows(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'sortable', {
        get() {
          return that._sortable();
        },
        set(newValue) {
          that._sortable(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'sortmode', {
        get() {
          return that._sortmode();
        },
        set(newValue) {
          that._sortmode(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'selectedrowindex', {
        get() {
          return that._selectedrowindex();
        },
        set(newValue) {
          that._selectedrowindex(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'selectedrowindexes', {
        get() {
          return that._selectedrowindexes();
        },
        set(newValue) {
          that._selectedrowindexes(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'source', {
        get() {
          return that._source();
        },
        set(newValue) {
          that._source(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'sorttogglestates', {
        get() {
          return that._sorttogglestates();
        },
        set(newValue) {
          that._sorttogglestates(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'updatedelay', {
        get() {
          return that._updatedelay();
        },
        set(newValue) {
          that._updatedelay(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'virtualmode', {
        get() {
          return that._virtualmode();
        },
        set(newValue) {
          that._virtualmode(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'verticalscrollbarstep', {
        get() {
          return that._verticalscrollbarstep();
        },
        set(newValue) {
          that._verticalscrollbarstep(newValue);
        },
        enumerable: true,
        configurable: true,
      });
      Object.defineProperty(that, 'verticalscrollbarlargestep', {
        get() {
          return that._verticalscrollbarlargestep();
        },
        set(newValue) {
          that._verticalscrollbarlargestep(newValue);
        },
        enumerable: true,
        configurable: true,
      });
    },
    __wireEvents__() {
      const that = this;

      JQXLite(this.componentSelector).on('bindingcomplete', event => { that.$emit('bindingcomplete', event); });
      JQXLite(this.componentSelector).on('columnresized', event => { that.$emit('columnresized', event); });
      JQXLite(this.componentSelector).on('columnreordered', event => { that.$emit('columnreordered', event); });
      JQXLite(this.componentSelector).on('columnclick', event => { that.$emit('columnclick', event); });
      JQXLite(this.componentSelector).on('cellclick', event => { that.$emit('cellclick', event); });
      JQXLite(this.componentSelector).on('celldoubleclick', event => { that.$emit('celldoubleclick', event); });
      JQXLite(this.componentSelector).on('cellselect', event => { that.$emit('cellselect', event); });
      JQXLite(this.componentSelector).on('cellunselect', event => { that.$emit('cellunselect', event); });
      JQXLite(this.componentSelector).on('cellvaluechanged', event => { that.$emit('cellvaluechanged', event); });
      JQXLite(this.componentSelector).on('cellbeginedit', event => { that.$emit('cellbeginedit', event); });
      JQXLite(this.componentSelector).on('cellendedit', event => { that.$emit('cellendedit', event); });
      JQXLite(this.componentSelector).on('filter', event => { that.$emit('filter', event); });
      JQXLite(this.componentSelector).on('groupschanged', event => { that.$emit('groupschanged', event); });
      JQXLite(this.componentSelector).on('groupexpand', event => { that.$emit('groupexpand', event); });
      JQXLite(this.componentSelector).on('groupcollapse', event => { that.$emit('groupcollapse', event); });
      JQXLite(this.componentSelector).on('pagechanged', event => { that.$emit('pagechanged', event); });
      JQXLite(this.componentSelector).on('pagesizechanged', event => { that.$emit('pagesizechanged', event); });
      JQXLite(this.componentSelector).on('rowclick', event => { that.$emit('rowclick', event); });
      JQXLite(this.componentSelector).on('rowdoubleclick', event => { that.$emit('rowdoubleclick', event); });
      JQXLite(this.componentSelector).on('rowselect', event => { that.$emit('rowselect', event); });
      JQXLite(this.componentSelector).on('rowunselect', event => { that.$emit('rowunselect', event); });
      JQXLite(this.componentSelector).on('rowexpand', event => { that.$emit('rowexpand', event); });
      JQXLite(this.componentSelector).on('rowcollapse', event => { that.$emit('rowcollapse', event); });
      JQXLite(this.componentSelector).on('sort', event => { that.$emit('sort', event); });
      JQXLite(this.componentSelector).on('initialized', event => { that.$emit('initialized', event); });

      // IDE BEGIN - add event listener
      JQXLite(this.componentSelector).on('cellvaluechanged', event => { that.cellValueChanged(event); });
      JQXLite(this.componentSelector).on('rowselect', event => { that.rowSelected(event); });
      JQXLite(this.componentSelector).on('rowunselect', event => { that.rowUnselected(event); });
      // IDE END
    },
  },
};
</script>
