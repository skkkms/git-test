import _ from 'lodash';
import Vue from 'vue';
import { Parser } from 'json2csv';
import utils from '../util';

const SELECTED = 0;
const UNSELECTED = 1;

const getMappedRowArrays = (dataset, rows) => {
  const datafields = dataset.datafields;
  const mappedRows = [];
  if (datafields.length > 0 && rows.length > 0) {
    utils.forEach(rows, (row, rowIndex) => {
      const mappedRow = [];
      utils.forEach(datafields, (df, di) => {
        const map = df.map || df.name;
        if (!dataset.readonly) {
          Object.defineProperty(mappedRow, di, {
            get: () =>{
              return row ? row[map] : null;
            },
            set: newValue => {
              const newRow = _.clone(row);
              newRow[map] = newValue;
              dataset.updateRows([rowIndex], [newRow]);
            },
          });
        } else {
          mappedRow[di] = row[map];
        }
      });
      mappedRows.push(mappedRow);
    });
  }

  return mappedRows;
};

const getMappedRowObjects = (dataset, rows, rawDataIndexes = null) => {
  const datafields = dataset.datafields;
  const mappedObjs = [];
  if (datafields.length > 0 && rows.length > 0) {
    utils.forEach(rows, (row, rowIndex) => {
      const mappedObj = {}
      utils.forEach(datafields, df => {
        const map = df.map || df.name;
        if (!dataset.readonly) {
          Object.defineProperty(mappedObj, df.name, {
            get: () => {
              return row ? row[map] : null;
            },
            set: newValue => {
              const newRow = _.clone(row);
              newRow[map] = newValue;
              const dataRowIndex = rawDataIndexes ? rawDataIndexes[rowIndex] : rowIndex;
              dataset.updateRows([dataRowIndex], [newRow]);
            }
          });
        } else {
          mappedObj[df.name] = row[map];
        }
      });
      mappedObjs.push(mappedObj);
    });
  }

  return mappedObjs;
};

const clearDataset = dataset => {
  dataset.mappedArray = null;
  dataset.mappedObject = null;
};

/**
 * Registers emit to raise an event if the reference to the data changes or the selection changes.
 */
const initEvents = dataset => {
  Object.defineProperty(dataset, 'data', {
    get: () => {
      return dataset.store.data || [];
    },
    set: newData => {
      dataset.setRawData(newData, {preventBackup: true});
    },
  });

  Object.defineProperty(dataset, 'datafields', {
    get: () => {
      return dataset.store.datafields || [];
    },
    set: newDatafields => {
      const oldDatafields = dataset.datafields;
      if (!_.isEqual(oldDatafields, newDatafields)) {
        dataset.store.datafields = newDatafields;
        clearDataset(dataset);
        initSelections(dataset);
        dataset.$emit(dataset.EVENTS.DATAFIELDS_CHANGED, { oldDatafields, newDatafields });
      }
    },
  });

  Object.defineProperty(dataset, 'selectedRowIds', {
    get: () => {
      return dataset.store.selectedRowIds || [];
    },
    set: newValue => {
      let newSelectedRowIds = null;
      let sender = null;
      let indexes = null;
      if (newValue.constructor === Array) {
        newSelectedRowIds = newValue;
      } else if (newValue.constructor === Object) {
        newSelectedRowIds = newValue.rowIds;
        sender = newValue.sender;
        newValue.indexes? indexes = newValue.indexes : null;
      } else {
        console.warn(`selectedRowIds: invalid input - ${newValue}`);
        return;
      }

      const oldSelectedRowIds = dataset.selectedRowIds;
      if (!_.isEqual(oldSelectedRowIds, newSelectedRowIds)) {
        const oldSelections =dataset.getSelectedIndexes();
        dataset.store.selectedRowIds = newSelectedRowIds;
        updateSelectedFields(dataset, oldSelectedRowIds, newSelectedRowIds);
        const newSelections = dataset.getSelectedIndexes();

        dataset.$emit(dataset.EVENTS.SELECTION_CHANGED, { oldSelectedRowIds, newSelectedRowIds, oldSelections, newSelections, sender });
      }
    }
  });
};

const getRowsToUpdateSelection = (dataset, rowIds, isSelected = true) => {
  const newRows = [];
  const newRowIndexes = [];
  if (dataset.rowSelectDatafield && rowIds && rowIds.length > 0) {
    const selectionIndex = isSelected ? SELECTED : UNSELECTED;
    utils.forEach(rowIds, rowId => {
      let selectedRowIndex = null;
      let selectedRow = null;
      selectedRowIndex = dataset.data.findIndex(d => d[dataset.rowIdKey] === rowId);
      selectedRow = dataset.data[selectedRowIndex];
      if (selectedRow) {
        const newRow = _.clone(selectedRow);
        const map = dataset.rowSelectDatafield.map || dataset.rowSelectDatafield.name;
        newRow[map] = dataset.rowSelectDatafield.rowSelect[selectionIndex];
        newRows.push(newRow);
        newRowIndexes.push(selectedRowIndex);
      }
    });
  }

  return { newRows, newRowIndexes };
}

const updateSelectedFields = (dataset, oldRowIds, newRowIds) => {
  if(dataset.rowSelectDatafield) {
    const unselectedRowIds = _.difference(oldRowIds, newRowIds);
    const unselectedRows = getRowsToUpdateSelection(dataset, unselectedRowIds, false);
    const selectedRowIds = _.difference(newRowIds, oldRowIds);
    const selectedRows = getRowsToUpdateSelection(dataset, selectedRowIds);
    const rowIndexes = _.concat(unselectedRows.newRowIndexes, selectedRows.newRowIndexes);
    const rows = _.concat(unselectedRows.newRows, selectedRows.newRows);

    if (rowIndexes.length > 0 && rows.length > 0 && rowIndexes.length === rows.length) {
      dataset.updateRows(rowIndexes, rows);
    }
  }
}

// TODO: add / delete / update - Separate actions to improve performance.
const updateSelections = dataset => {
  const oldSelectedRowIds = dataset.getSelectedRowIds();
  dataset.setSelectedRowIds(oldSelectedRowIds);
}

const initSelections = dataset => {
  const selectedRowIds = [];

  const { data, datafields } = dataset.store;
  const { initialSelectedIndexes } = dataset;

  // Only the datafield with the first selected is applied.
  // const rowSelectDatafield = datafields.find(datafield => !!datafield.rowSelect);
  // dataset.rowSelectDatafield = rowSelectDatafield;
  const rowSelectDatafield = null;
  dataset.rowSelectDatafield = rowSelectDatafield;

  // selected must have two conditions, 'selected' and 'unselected' ex> ['Y', 'N']
  if (rowSelectDatafield && rowSelectDatafield.rowSelect.length > 1) {
    const map = rowSelectDatafield.map || rowSelectDatafield.name;
    utils.forEach(data, (rowData, rowIndex) => {
      const rowId = rowData[dataset.rowIdKey];
      if (rowId && (rowSelectDatafield && rowSelectDatafield.rowSelect[SELECTED]) === rowData[map] && selectedRowIds.indexOf(rowId) < 0) {
        if (dataset.rowIdKey) {
          selectedRowIds.push(rowData[dataset.rowIdKey]);
        }
      }
    });
  } else {
    // If the datafield does not have a selection setting, use the default setting.
    if (initialSelectedIndexes && initialSelectedIndexes.constructor === Array) {
      if (dataset.rowIdKey) {
        utils.forEach(initialSelectedIndexes, si => {
          selectedRowIds.push(data[si][dataset.rowIdKey]);
        });
      }
    }
  }

  dataset.setSelectedRowIds(selectedRowIds);
};

const deleteRows = (dataset, rowIds) => {
  if (!dataset.readonly && rowIds && rowIds.length > 0) {
    const data = dataset.data;
    const deletedRows = [];
    const rowKey = dataset.rowIdKey;
    utils.forEach(rowIds, rowId => {
      const dataIndex = data.findIndex(d => d[rowKey] === rowId);
      if (dataIndex >= 0) {
        const deletedRow = data[dataIndex];
        data.splice(dataIndex, 1);
        deletedRows.push(deletedRow);
      }
    });

    if (deletedRows.length > 0) {
      dataset.setRemovedRows(deletedRows);
      updateSelections(dataset);

      return {
        type: dataset.DATA_CHANGED_TYPE.ROW_DELETED,
        rows: deletedRows,
      };
    }
  }

  return null;
}

const updateRows = (dataset, indexes, rows, updateDeltas = []) => {

  if (dataset.readonly) {
    return null;
  }

  if (indexes && indexes.length > 0 && rows && rows.length > 0 && indexes.length === rows.length) {
    const updatedRows = [];

    utils.forEach(indexes, (index, i) => {
      const oldRow = dataset.data[index];
      const newRow = rows[i];
      if (oldRow) {
        newRow[dataset.rowIdKey] = oldRow[dataset.rowIdKey];
        if (!_.isEqual(oldRow, newRow)) {
          dataset.data[index] = newRow;
          updatedRows.push({
            oldRow,
            newRow,
            index,
          });
        }
      }
    });

    if (updatedRows.length > 0) {
      updateSelections(dataset);

      return {
        type: dataset.DATA_CHANGED_TYPE.ROW_UPDATED,
        rows: updatedRows,
        updateDeltas,
      };
    }
  }

  return null;
}

/**
 * Adds a row to a specific location.
 * @param {Object[] | Array[]} rows - The rows to add.
 * @param {Number} refIndex - reference index to add.
 * @param {Object[] | Array[]} data - base rows.
 */
const executeInsert = (rows, refIndex, data) => {
  // default last
  if(data) {
    let newData = [];    
    if (refIndex < 0) {
      newData = utils.mergeArray(data, rows);
      // rows.forEach(row => {
      //   data.push(row);
      // });
    } else {
      newData = utils.mergeArray(rows, data);      
    }    
    Object.preventExtensions(newData);
    return newData;    
  }
}

class Dataset {
  init(parent) {
    this.owner = parent;
    this.store = {
      selectedIndexes: [],
      selectedRowIds: [],
    };
    this.bus = new Vue();
    this.clearRowStateMap();
    initEvents(this);
    this.initCallbacks = [];
    this.initialized = false;
  }
  
  /**
   * Initialize the dataset.
   * Data fields and data.
   * Upon initialization completion, initialzed event is generated and all callbacks that are subscribed are released.
   * @param {Object} option
   */
  initDataset(option) {
    if (option) {
      try {
        this.id = option.id;
        const keys = Object.keys(option);
        utils.forEach(keys, key => {
          if (key !== 'data' && key !== 'datafields') {
            this[key] = option[key];
          }
        });

        let rawData = option.data ? this.owner[option.data] : [];
        this.rowIdKey = option.rowIdKey;
        if (!this.rowIdKey) {
          this.setRowsId(rawData);
          this.autoRowId = true;
        }

        this.store.data = rawData;
        // Object.preventExtensions(this.store.data);
        this.store.datafields = option.datafields;        
        this.initialSelectedIndexes = option.selectedIndexes;
        initSelections(this);

        // for reset
        this.originalData = _.clone(rawData);
        this.initialized = true;
      } catch (e) {
        console.error(`Initialize ${option.id} failed...`, e);
      }

      if (this.initiailzed) {
        this.$emit(this.EVENTS.INITIALIZED, this);
        utils.forEach(this.initCallbacks, callback => {
          this.$off(this.EVENTS.INITIALIZED, callback);
        });
        this.initCallbacks = [];
      }
    }
  }

  /**
   * dataset initialization listener.
   * It is a one-shot listener and returns false if initialization has already been completed.
   * @param {Function} callback
   * @return {Boolean}
   */
  $init(callback) {
    if (!this.initialized) {
      this.bus.$on(this.EVENTS.INITIALIZED, callback);
      this.initCallbacks.push(callback);
      return true;
    }
    console.info(`${this.id} is already initialized`);
    return false;
  }

  /**
   * Subscribe to Events.
   * @param {String} eventType - type of event.
   * @param {Function} callback - callback function.
   */
  $on (eventType, callback) {
    if (this.bus) {
      this.bus.$on(eventType, callback);
    }
  }

  /**
   * Stop event subscriptions.
   * @param {String} eventType - type of event.
   * @param {Function} callback - callback function.
   */
  $off (eventType, callback) {
    if (this.bus) {
      this.bus.$off(eventType, callback);
    }
  }

  /**
   * Event publishing.
   * @param {String} eventType - type of event.
   * @param {Object} args - arguments of event.
   */
  $emit (eventType, args) {
    if (this.bus) {
      this.bus.$emit(eventType, args);
    }
  }

  /**
   * get dataset's id
   * @return {String} - dataset id
   */
  getDatasetId() {
    if (!this.initialized) {
      console.warn(`dataset is not initialized`);
    }
    return this.id;
  }

  /**
   * initDataset
   * @return {Boolean}
   */
  isInitialized() {
    return this.initialized;
  }

  /**
   * Returns the type of raw data
   * @return {String}
   */
  getRawDataType() {
    let type = this.DATA_TYPE.OBJECT;
    if (this.data.length > 0) {
      const first = this.data[0];
      if (first.constructor === Array) {
        type = this.DATA_TYPE.ARRAY;
      }
    }

    return type;
  }

  /**
   * Returns the bound data using data and data fields.
   * @param {Boolean} force - Create a new mapping result.
   * @return {Array}
   */
  getMappedArrays (force) {
    if (this.getRawDataType() === this.DATA_TYPE.ARRAY) {
      if (!this.mappedArray || force) {
        this.mappedArray = getMappedRowArrays(this, this.data);
      }
      return this.mappedArray;
    }

    return [];
  }

  /**
   * Returns the bound data using data and data fields.
   * @param {Boolean} force - Create a new mapping result.
   * @return {Object}
   */
  getMappedObjects (force) {
    if (!this.mappedObject || force) {
      this.mappedObject = getMappedRowObjects(this, this.data);
    }

    return this.mappedObject;
  }

  /**
   * Returns the original data.
   * @return {Object[]|Array[]}
   */
  getRawData () {
    return this.data;
  }

  /**
   * set the original data.
   * @param {Object[]|Array[]} newData - The data to set.
   */

  clear() {
    this.store.data.splice(0, this.store.data.length);
    this.originalData.splice(0, this.originalData.length);
    this.$emit(this.EVENTS.RAW_DATA_CLEARED);
    this.setRawData([]);
  }

  setRawData (newData, option = {}) {
    if (this.autoRowId) { // 새로운 rawData를 설정하는 경우에도 rowId를 새로 부여해야 한다
      this.setRowsId(newData);
    }
    Object.preventExtensions(newData);
    const oldData = this.store.data;
    this.store.data = newData;
    if (option.preventBackup) {
      this.originalData = [];
    } else {
      this.originalData = _.clone(newData);
    }

    clearDataset(this);

    if (option.selectedIndexes) {
      this.setSelectedIndexes(option.selectedIndexes, null ,{ skipEmit: true });
    } else {
      initSelections(this);
    }

    this.$emit(this.EVENTS.RAW_DATA_CHANGED, { oldData, newData });
  }

  /**
   * Returns the datafield.
   * @return {Object[]}
   */
  getDatafields () {
    return this.datafields;
  }

  /**
   * set the datafield.
   * @param {Object[]} newDatafields - The datafields to set.
   */
  setDatafields (newDatafields) {
    this.datafields = newDatafields;
  }

  /**
   * Add a selection using index.
   * @param {Number} index - The index of the row to add.
   * @param {String} sender - id of caller.
   */
  addSelectedIndex(index, sender) {
    this.addSelectedIndexes([index], sender);
  }

  /**
   * Add a selection using indexes.
   * @param {Number[]} indexes - The index of the rows to add.
   * @param {String} sender - id of caller.
   */
  addSelectedIndexes(indexes, sender) {
    const data = this.data;
    let selectedRowIds = this.getSelectedRowIds().slice();
    const newSelectedRowIds = _.map(indexes, index => data[index][this.rowIdKey]);

    const addedSelectedRowIds = _.difference(newSelectedRowIds, selectedRowIds);
    selectedRowIds = _.concat(selectedRowIds, addedSelectedRowIds);
    this.setSelectedRowIds(selectedRowIds, sender);
  }

  addSelectedRowId(rowId, sender) {
    const selectedRowIds = this.getSelectedRowIds().slice();
    if (!selectedRowIds.find(sri => sri === rowId)) {
      selectedRowIds.push(rowId);

      this.setSelectedRowIds(selectedRowIds, sender);
    }
  }

  deleteSelectedRowId(rowId, sender) {
    const selectedRowIds = this.getSelectedRowIds().slice();
    const index = selectedRowIds.findIndex(selectedRowId => selectedRowId === rowId);

    if (index >= 0) {
      selectedRowIds.splice(index, 1);
    }
    this.setSelectedRowIds(selectedRowIds, sender);
  }

  /**
   * Delete row using index.
   * @param {Number} index - index of row to delete.
   * @param {String} sender - id of caller.
   */
  deleteSelectedIndex(index, sender) {
    this.deleteSelectedIndexes([index], sender);
  }

  /**
   * Delete row using indexes.
   * @param {Number[]} indexes - index of rows to delete.
   * @param {String} sender - id of caller.
   */
  deleteSelectedIndexes(indexes, sender) {
    const data = this.data;
    const selectedRowIds = this.getSelectedRowIds().slice();
    const newUnSelectedRowIds = _.map(indexes, index => data[index][this.rowIdKey]);
    const resultSelectedRowIds = _.difference(selectedRowIds, newUnSelectedRowIds);
    this.setSelectedRowIds(resultSelectedRowIds, sender);
  }

  clearSelection() { // 선택  취소를 위한 API
    this.setSelectedIndexes([]);
  }

  resetRowId() { // EHS 프로젝트에서는 row id가 1부터 생성 되어야함
    this._currentRowId = 1;
  }

  generateRowId() {
    return `${this._currentRowId++}`;
  }

  setRowsId(rawData) {
    this.resetRowId();
    const rowIdKey = this.ROWIDKEY;
    this.rowIdKey = rowIdKey;
    if (rawData) {
      utils.forEach(rawData, rd => {
        rd[rowIdKey] = this.generateRowId();
      });
    }
  }

  /**
   * Change selection and update
   * @param {Number} index - selected index
   * @param {String} sender - id of API caller
   */
  setSelectedIndex (index, sender) {
    this.setSelectedIndexes([index], sender);
  }
  
  /**
   * Sets the selected rowid.
   * @param {String} rowId - row id
   * @param {String} sender - id of API caller
   */
  setSelectedRowId (rowId, sender) {
    this.setSelectedRowIds([rowId], sender);
  }

  /**
   * Get selected rowids.
   * @return {String[]}
   */
  getSelectedRowIds() {
    return this.selectedRowIds;
  }

  /**
   * Get selected row.
   * @return {Object | Array}
   */
  getSelectedRawData() {
    const data = this.data;
    const rawData = this.getSelectedIndexes().map(index => {
      return data[index];
    });

    return rawData;
  }
  /**
   * Get data of multiple selected rows.
   * @return {Object[]}
   */
  getSelectedRows () {
    const data = this.data;
    const indexes = this.getSelectedIndexes();
    if (indexes.length <= 0) {
      return [];
    }
    const rows = [];
    utils.forEach(indexes, index => {
      rows.push(data[index]);
    });

    return getMappedRowObjects(this, rows, indexes);
  }

  /**
   * get selected row data
   * @return {Object}
   */
  getSelectedRow () {
    const selectedrows = this.getSelectedRows();
    if (selectedrows.length > 0) {
      return selectedrows[selectedrows.length - 1];
    }
    return null;
  }

  /**
   * Change the single cell value.
   * The cell value is changed, but the row is changed and a 'row-updated' event occurs.
   * @param {Number} row - row index.
   * @param {Number|String} col - col index or key.
   * @param {Number|String|Object} value - value to set.
   * @param {String} sender - id of caller.
   */
  setData (row, col, value, sender) {
    this.setDataList([{row, col, value}], sender);
  }

  /**
   * Change the multi-data.
   * Update multiple data at once
   * The cell value is changed, but the row is changed and a 'row-updated' event occurs.
   * @param {Object[]} deltas - An array of {row, col, value}.
   * @param {String} sender - id of caller.
   */
  setDataList (deltas, sender) {
    const indexes = [];
    const rows = [];
    const updateDeltas = [];
    utils.forEach(deltas, delta => {
      const row = this.data[delta.row];
      if (row) {
        const newRow = _.clone(row);
        newRow[delta.col] = delta.value;
        indexes.push(delta.row);
        rows.push(newRow);
        if (row[delta.col] !== delta.value) {
          updateDeltas.push({
            index: delta.row,
            column: delta.col,
            oldValue: row[delta.col],
            newValue: newRow[delta.col],
          });
        }
      }
    });
    if (rows.length > 0) {
      this.updateRows(indexes, rows, sender, updateDeltas);
    }
  }

  /**
   * Add the given rows to a specific location.
   * @param {Object[]|Array[]} rows - The rows to add. array-array or object-array.
   * @param {Boolean | String | Object} isStart - If true, add before the current data; if false, add after.
   * @param {String} sender - id of caller.
   */
  addRows (rows, nextSibling = null, sender) {
    let validRows = [];
    const rowKey = this.rowIdKey;
    const data = this.data;
    if (rows && rows.length > 0) {
      validRows = rows.filter(row => {
        if (this.autoRowId || !row[rowKey]) { // 새로운 row를 생성하는 방법으로, 기존 row를 clone하는 방법으로 많이 사용하기 때문에, autoRowId인경우에는 id를 새로 부여해야 한다.
          row[rowKey] = this.generateRowId();
          return true;
        } else {
          const exists = data.find(d => d[rowKey] === row[rowKey])
          if (exists) {
            console.warn(`Dataset AddRows: ROW ID '${row[rowKey]}' already exists and is not added`);
          }
          return !exists;
        }
      });
    }

    if (!this.readonly && validRows.length > 0) {
      let refRowId = null;
      if (typeof nextSibling === 'boolean' && nextSibling && data.length) {
        refRowId = data[0][this.rowIdKey];
      } else if (nextSibling) {
        refRowId = nextSibling[this.rowIdKey];
      }
      this.insertRows(validRows, refRowId, sender);
    }
  }

  /**
   * Inserts a row at a specific position in the current data.
   * @param {Object[] | Array[]} rows - rows to add.
   * @param {String | Object} refRow - The id of the reference row to which you want to append rows. New rows are added before refRow.
   * @param {String} sender - id of caller.
   */
  insertRows(rows, refRowId, sender) {

    let refRowIndex = -1;

    refRowIndex = this.data.findIndex(d => d[this.rowIdKey] === refRowId);
    this.store.data = executeInsert(rows, refRowIndex, this.data);
    updateSelections(this);

    const delta = {
      type: this.DATA_CHANGED_TYPE.ROW_ADDED,
      refRowId,
      rows,
      sender,
    };

    this.setAddedRows(rows);
    this.$emit(this.EVENTS.DATA_CHANGED, delta);
  }

  /**
   * Delete rows at a given index.
   * @param {Number[]} indexes - The index of rows to delete.
   * @param {String} sender - id of caller.
   */
  deleteRows (indexes, sender) {
    let rowIds = [];
    const data = this.data;
    utils.forEach(indexes ,index => {
      if (index >= 0 && index < data.length) {
        rowIds.push(data[index][this.rowIdKey]);
      }
    });

    this.deleteRowsByRowId(rowIds, sender);
  }

  /**
   * Delete rows using rowid.
   * @param {String[]} rowIds - rowids to delete.
   * @param {String} sender - id of caller.
   */
  deleteRowsByRowId(rowIds, sender) {
    let delta = null;
    delta = deleteRows(this, rowIds);

    if (delta) {
      delta.sender = sender;
      delta.type = this.DATA_CHANGED_TYPE.ROW_DELETED;
      this.$emit(this.EVENTS.DATA_CHANGED, delta);
    }
  }

  /**
   * Moves row by row id. Move forward in the row to be referenced.
   * @param {String[]} rowIds - The id of the rows to move.
   * @param {String} refRowId - The id of the rows to reference. The row moved before refRowId is placed.
   * @param {String} sender - id of caller.
   */
  moveRowsByRowId(rowIds, refRowId, sender) {
    if (rowIds && rowIds.length > 0) {
      const indexes = [];
      utils.forEach(rowIds, rowId => {
        const index = this.data.findIndex(d => d[this.rowIdKey] === rowId);
        if (index >= 0) {
          indexes.push(index);
        }
      });

      const refIndex = refRowId ? this.data.findIndex(d => d[this.rowIdKey] === refRowId) : -1;
      this.moveRows(indexes, refIndex, sender);
    }
  }

  /**
   * Moves row by index. Move forward in the row to be referenced.
   * @param {Number[]} indexes - The index of the rows to move.
   * @param {Number} refIndex - The index of the row to reference.
   * @param {String} sender - The id of caller.
   */
  moveRows(indexes, refIndex, sender) {
    if (indexes.length >= this.store.data.length) {
      return;
    }

    if (indexes.indexOf(refIndex) >= 0) {
      return;
    }

    const rows = [];

    let refId = null;
    if (refIndex >= 0) {
      refId = this.store.data[refIndex][this.rowIdKey];
    }

    indexes.sort();
    indexes.reverse();

    const newData = _.clone(this.store.data);

    utils.forEach(indexes, index => {
      if (index >= 0) {
        const row = newData[index];
        rows.push(row);
        newData.splice(index, 1);
      }
    });

    if (refId) {
      const index = newData.findIndex(d => d[this.rowIdKey] === refId);
      utils.forEach(rows, row => {
        newData.splice(index, 0, row);
      });
    } else {
      for (let i = rows.length - 1; i >= 0; i--) {
        newData.push(rows[i]);
      }
    }

    this.store.data = newData;
    Object.preventExtensions(newData);

    if (rows.length) {
      updateSelections(this);
    }

    const delta = {
      indexes,
      refIndex,
      rows,
      sender,
      type: this.DATA_CHANGED_TYPE.ROW_MOVED,
    }
    this.$emit(this.EVENTS.DATA_CHANGED, delta);
  }

  /**
   * Replaces the row at the given index with the given new row.
   * 'rows' and 'indexes' are matched based on the same index.
   * @param {Number[]} indexes - Indexes to replace.
   * @param {Object[]|Array[]} rows - Rows to replace.
   * @param {String} sender - id of caller.
   */
  updateRows (indexes, rows, sender, updateDelta) {
    let delta = null;
    delta = updateRows(this, indexes, rows, updateDelta);

    if (delta) {
      this.setUpdatedRows(rows);
      delta.sender = sender;
      this.$emit(this.EVENTS.DATA_CHANGED, delta);
    }
  }

  /**
   * Replaces the row at the given rowId with the given new row.
   * @param {Number[]} rowId - The rowId of the row to be replaced.
   * @param {Object} row - Row to replace.
   * @param {String} sender - id of caller.   
   */
  updateRowById(rowId, row, sender) {
    const data = this.data;
    const index = data.findIndex(d => d[this.rowIdKey] === rowId);
    if (index >= 0) {
      this.updateRows([index], [row], sender);
    }
  }

  /**
   * Reset raw data.
   * @param {String} sender - id of caller.
   */
  reset(sender) {

    let oldData;
    if (this.componentType !== 'tree-grid') {
      if (!this.initialized || !this.store.data) { // 초기화 전에 reset하는 경우 에러 방지
        return;
      };
      oldData = this.data;
      const clonedData = _.clone(this.originalData);
      this.store.data = Object.preventExtensions(clonedData);
    } else {
      oldData = this.data;
      this.store.data = _.clone(this.originalData);
    }

    if (this.stateData) {
      initStateData(this);
    }
    updateSelections(this);
    this.clearRowStateMap();
    this.$emit(this.EVENTS.DATA_RESET, { oldData, newData: this.data, sender });
  }

  /**
   * Initialize row's changes. It only works if stateData is used.
   * @param {Number[]} indexes - The index of the rows to reset.
   */
  resetRows(indexes) {
    if (!this.stateData) {
      return;
    }

    const validIndexes = indexes.filter(index => index >= 0 && index < this.stateData.length);
    utils.forEach(validIndexes, vi => {
      const stateRow = this.stateData[vi];
      if (stateRow.state === this.STATE.DELETE) {
        stateRow.state = this.STATE.READ;
      } else if (stateRow.state === this.STATE.UPDATE) {
        this.stateData[vi] = _.clone(this.data[vi]);
        this.stateData[vi].state = this.STATE.READ;
      }
    });

    utils.forEach(validIndexes, index => {
      const stateRow = this.stateData[index];
      if (stateRow.state === this.STATE.CREATE) {
        this.stateData.splice(index, 1);
      }
    });
  }

  /**
   * Merge stateData changes into data.
   * @param {String} sender - id of caller.
   */
  submitChanges(sender) {
    if (!this.stateData) {
      return;
    }

    const addedRows = [];
    const deletedRows = [];
    const updatedRows = [];
    // created and updated rows
    utils.forEach(this.stateData, (sd, i) => {
      if (sd.state === this.STATE.CREATE) {
        this.store.data.splice(i, 0, sd);
        delete sd.state;
        pushDelta(this, sd, addedRows);
      } else if (sd.state === this.STATE.UPDATE) {
        this.store.data[i] = sd;
        delete sd.state;
        pushDelta(this, sd, updatedRows);
      }
    });
    // deleted rows
    utils.forEachRight(this.stateData, (sd, i) => {
      if (sd.state === this.STATE.DELETE) {
        this.store.data.splice(i, 1);
        delete sd.state;
        pushDelta(this, sd, deletedRows);
        const deletedIndex = this.store.selectedRowIds.findIndex(sri => sri === sd[this.rowIdKey]);
        if (deletedIndex >= 0) {
          this.store.selectedRowIds.splice(deletedIndex, 1);
        }
      }
    });

    initStateData(this);
    updateSelections(this);
    const args = {
      sender,
      addedRows,
      deletedRows,
      updatedRows,
    };
    this.$emit(this.EVENTS.DATA_CHANGED, { type: this.DATA_CHANGED_TYPE.STATE_SUBMIT, args});
  }

  clearRowStateMap() {
    this.rowStateMap = {};
    this.rowMap = {};
  }

  setRowState(row, state) {
    const rowId = row[this.rowIdKey];
    if (state !== this.STATE.CREATE && (this.rowStateMap[rowId] === this.STATE.CREATE)) { // 사용자가 추가한 row는 별개의 방법으로 상태가 관리되어야함
      if (state === this.STATE.DELETE) { // 사용자가 추가한 row를 삭제하는 경우에, 상태를 없애 버린다
        delete this.rowStateMap[rowId];
        delete this.rowMap[rowId];
        return;
      }
    } else {
      this.rowStateMap[rowId] = state;
      this.rowMap[rowId] = row;
    }
  }

  setAddedRows(rows) {
    utils.forEach(rows, row => {
      this.setRowState(row, this.STATE.CREATE);
    });
  }

  setRemovedRows(rows)  {
    utils.forEach(rows, row => {
      this.setRowState(row, this.STATE.DELETE);
    });
  }

  setUpdatedRows(rows) {
    utils.forEach(rows, row => {
      this.setRowState(row, this.STATE.UPDATE);
    });
  }

  getAddedRows() {
    const rows = [];
    utils.forEach(this.rowStateMap, (value, key) => {
      if (value === this.STATE.CREATE) {
        rows.push(this.rowMap[key]);
      }
    });
    return rows;
  }

  getRemovedRows() {
    const rows = [];
    utils.forEach(this.rowStateMap, (value, key) => {
      if (value === this.STATE.DELETE) {
        rows.push(this.rowMap[key]);
      }
    });
    return rows;
  }

  getUpdatedRows() {
    const rows = [];
    utils.forEach(this.rowStateMap, (value, key) => {
      if (value === this.STATE.UPDATE) {
        rows.push(this.rowMap[key]);
      }
    });
    return rows;
  }

  getUnChangedInitialRows() {
    const initialRows = [];    
    utils.forEach(this.getRawData(), row => {
      if (!this.rowStateMap[row[this.rowIdKey]]) {
        initialRows.push(row);
      }
    });
    return initialRows;
  }

  isChanged() {
    return Object.keys(this.rowStateMap).length;
  }

  submit()  {
    this.clearRowStateMap();
  }

  destroy() {
    if (this.store && this.store.data && this.store.data.constructor.name === 'Array') {
      this.store.data.splice(0, this.store.data.length);
      this.store.data = null;
    }

    if (this.originalData && this.originalData.constructor.name === 'Array') {
      this.originalData.splice(0, this.originalData.length);
      this.originalData = null;
    }

    if (this.bus) {
      this.bus.$destroy();
      this.bus = null;
    }
  }
  
  setSelectedRowIds (rowIds, sender, indexes) {
    if (rowIds && rowIds.constructor === Array) {
      const validRowIds = rowIds.filter(rowId => rowId);
      const idIndexMap = {};
      const validIndexes = [];
      utils.forEach(this.data, (row, index) => { // idIndexMap 생성
        const id = row[this.rowIdKey];
        idIndexMap[id] = index;
      });

      utils.forEach(rowIds, rowId => { // 실제 key가 있는 row만 필터링
        if (idIndexMap[rowId] !== undefined) {
          validIndexes.push(idIndexMap[rowId]);
        }
      });

      validIndexes.sort(); // 정렬
      this._setSelection(validIndexes, sender);
    }
  }

  setSelectedIndexes (indexes, sender, option) {
    const data = this.data;
    const validIndexes = [];
    
    if (indexes && indexes.constructor === Array) {
      const length = data.length;
      utils.forEach(indexes, index => {
        if (index >= 0 && index < length) {
          validIndexes.push(index);
        }
      })

      validIndexes.sort();
      this._setSelection(validIndexes, sender, option);
    }
  }

  getSelectedIndexes() {
    if (this.store) {
      return this.store.selectedIndexes;
    }
    return [];
  }

  getselectedRowIds() {
    if (this.store) {
      return this.store.selectedRowIds;
    }
    return [];
  }

  _setSelection(newSelections, sender, option = {}) {
    const newSelectedRowIds = [];
    const data = this.store.data;

    utils.forEach(newSelections, index => { newSelectedRowIds.push(data[index][this.rowIdKey]) });

    const oldSelectedRowIds = this.store.selectedRowIds;
    const oldSelections = this.store.selectedIndexes;
    const newSelectedIds = [];
    if (newSelectedRowIds.length && data[0].id) { // row에 id field가 있는 경우 추가로 정보로 전달
      utils.forEach(newSelections, index => { newSelectedIds.push(data[index].id) });
    }

    this.store.selectedIndexes = newSelections;
    this.store.selectedRowIds = newSelectedRowIds;
    
    if (!option.skipEmit && !_.isEqual(oldSelectedRowIds, newSelectedRowIds)) {
      this.$emit(this.EVENTS.SELECTION_CHANGED, { oldSelectedRowIds, newSelectedRowIds, newSelectedIds, oldSelections, newSelections, sender });
    }    
  }

  downloadCSV(filename, fields = null) {
    const data = this.store.data;
    if (!filename || !data || data.length === 0) {
      return;
    }

    const ext = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    const targetFileName = ext ? filename : `${filename}.csv`;
    try {
      const parser = new Parser({ fields, withBOM: true });
      const csv = parser.parse(data);
      const blob = new Blob([csv],{type: "text/csv;charset=utf-8;"});
      if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, targetFileName)
      } else {
        const link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", targetFileName);
          link.style = "visibility:hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

}

// dataset Event name constant.
Dataset.prototype.EVENTS = {
  GRID_CELL_DATA_CHANGED: 'grid-cell-data-changed',
  RAW_DATA_CHANGED: 'raw-data-changed',
  RAW_DATA_CLEARED: 'raw-data-cleared',
  DATAFIELDS_CHANGED: 'datafields-changed',
  SELECTION_CHANGED: 'selection-changed',
  DATA_CHANGED: 'data-changed',
  DATA_RESET: 'data-reset',
};

// Dataset event detail type of DATA_CHANGED
Dataset.prototype.DATA_CHANGED_TYPE = {
  ROW_ADDED: 'row-added',
  ROW_DELETED: 'row-deleted',
  ROW_MOVED: 'row-moved',
  ROW_UPDATED: 'row-updated',
  STATE_SUBMIT: 'state-submit',
};

// The type of raw data.
Dataset.prototype.DATA_TYPE = {
  OBJECT: 'raw-data-type-object',
  ARRAY: 'raw-data-type-array',
};

// The data state of stateData.
Dataset.prototype.STATE = {
  READ: 'R',
  CREATE: 'C',
  UPDATE: 'U',
  DELETE: 'D',
  FIELD_NAME: '$state', // state라는 이름은 너무 일반적이기 때문에, 기존 data와 충돌 날수 있음
};

Dataset.prototype.ROWIDKEY = 'dataset-row-id';

export default Dataset;
