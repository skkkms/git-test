import Vue from 'vue';
import VueI18n from 'vue-i18n';
const USE_ASYNC_DATA_COUNT = 10000;

class CellBase {
  constructor(row, column, value, parentElement, propsData, dataset, grid) {
    this.initData(row, column, dataset, grid, parentElement);
    propsData.ownerCellEditor = this;

    let tmpValue = value;
//    if(typeof tmpValue === 'string') {
//      value = tmpValue.replaceAll('&amp;', '&').replaceAll('&gt;', '>').replaceAll('&lt;', '<').replaceAll('&quot;','"');
//    }
    this.decoratePropsData(row, column, value, propsData);
    this.createComponentInstance(this.getBaseComponent(), parentElement, propsData);
    this.bindEvents();
    if (grid) {
      grid.addCellEditor(this);
    }
    this.setDefaultValue(value);
    this.updateComponentState();    
  }

  initData(row, column, dataset = null, grid, parentElement) {
    this.grid = grid;
    this.dataset = dataset;
    this.columnName = column;
    this.componentInstance = null;
    this.row = row;
    this.refreshIndex = -1;
    this.alignClass = null;
    this.cellClassName = null;
    this.parentElement = parentElement;
    if (this.grid) {
      const col = this.grid.getJqxGrid().getcolumn(column);
      if (col) {
        if (col.cellsalign)  {
          this.alignClass = `jqx-grid-cell-${col.cellsalign}-align`;
        }
        if (col.cellClassName) {
          this.cellClassName = col.cellClassName;
        }
      }
    }    
  }

  createComponentInstance(component, parentElement, propsData) {
    const componentClass = Vue.extend(component);
    this.componentInstance = new componentClass({
      propsData,
    })
    this.componentInstance.$mount();
    parentElement.appendChild(this.componentInstance.$el);
    if (this.alignClass) {
      parentElement.classList.add(this.alignClass);
    }
    if (this.cellClassName) {
      parentElement.classList.add(this.cellClassName);
    }
    parentElement.classList.add('jqx-grid-cell-root');
  }

  getComponentInstance() {
    return this.componentInstance;
  }

  useGridAPI() {
    return false;
  }

  isAsync() {
    const ds = this.dataset;
    if (ds && (ds.data.length * ds.datafields.length) > USE_ASYNC_DATA_COUNT) {
      return true;
    }
    return false;
  }

  bindEvents() {
    const eventName = this.getEventName();
    if (eventName) {
      if (this.useGridAPI()) {
        this.componentInstance.$on(eventName, this.updateGrid.bind(this));
      } else {
        this.componentInstance.$on(eventName, this.updateDataset.bind(this));
      }
      // this.selectHandler = (event) => {
      //   if (this.isSelectable()) {
      //     this.select();          
      //   } else {
      //     if (event.srcElement === this.parentElement) {
      //       this.select();
      //     }
      //   }
      // }
      // this.parentElement.addEventListener('mousedown', this.selectHandler);      
    }
  }

  refreshEditor(boundindex, column, value, parentElement) {
    let tmpValue = value;
//    if(typeof tmpValue === 'string') {
//      tmpValue = tmpValue.replaceAll('&amp;', '&').replaceAll('&gt;', '>').replaceAll('&lt;', '<').replaceAll('&quot;','"');
//    }

    this.refreshIndex = boundindex;
    this.setValue(tmpValue);
    this.updateComponentState();    
  }

  getDatasetIndex() {
    if (this.refreshIndex >= 0) {
      return this.refreshIndex;
    }
    return this.row.boundindex;
  }

  getCurrentDataRow() {
    const index = this.getDatasetIndex();
    if (this.dataset.data.length > index)  {
      return this.dataset.data[index];
    }
  }

  updateDataset(event) {
    const value = this.getValueFromEvent(event)
    const rowIndex = this.getDatasetIndex();
    // this.setValue(value);
    if (this.dataset.data[rowIndex] && this.dataset.data[rowIndex][this.columnName] !== value) {
      this.dataset.setData(rowIndex, this.columnName, value);
    }
    // if (this.isAsync()) {
    //   this.dataset.setDataAsync(rowIndex, this.columnName, value);
    // } else {
    //   if (this.dataset.data[rowIndex] && this.dataset.data[rowIndex][this.columnName] !== value) {
    //     this.dataset.setData(rowIndex, this.columnName, value);
    //   }
    // }
  }

  updateGrid(event) {
    const value = this.getValueFromEvent(event);
    const rowIndex = this.getDatasetIndex();
    if (this.grid) {
      const jqxGrid = this.grid.getJqxGrid();
      jqxGrid.setcellvalue(rowIndex, this.columnName, value);
    }
  }

  setEditable() {
    const component = this.getComponentInstance();
    if (component && component.setEditable) {
      const dataRow = this.getCurrentDataRow();
      if (!dataRow) {
        return;
      }
      component.setEditable(dataRow, this.columnName, this.dataset, this.grid);
    }
  }

  setDisabled() {
    const component = this.getComponentInstance();
    if (component && component.setDisabled) {
      const dataRow = this.getCurrentDataRow();
      if (!dataRow) {
        return;
      }
      component.setDisabled(dataRow, this.columnName, this.dataset, this.grid);
    }
  }

  setVisibility() {
    const component = this.getComponentInstance();
    if (component && component.setVisibility) {
      const dataRow = this.getCurrentDataRow();
      if (!dataRow) {
        return;
      }
      component.setVisibility(dataRow, this.columnName, this.dataset, this.grid);
    }
  }

  select() {
    const selection = this.dataset.getSelectedIndexes();
    const index = this.getDatasetIndex();
    if (!this.grid.multiselect && (selection.length !== 1 || selection[0] !== index)) {
      this.dataset.setSelectedIndex(index);
    }
  }

  isRemoved() {
    if (!this.componentInstance) {
      return true;
    }
    let el = this.componentInstance.$el;  
    while(el) {
      if (el === document.body) {
        return false;
      }
      el = el.parentElement;
    }
    return true;
  }

  destroy() {
    if (this.parentElement) {
      this.parentElement['$customeditor'] = null;
    }
    if (this.componentInstance) {
      this.componentInstance.$destroy();
      this.componentInstance = null;
      if (this.selectHandler) {        
        this.selectHandler = null;
      }
    }
    if (this.grid) {
      this.grid.removeCellEditor(this);
    }
  }

  setDefaultValue(value) {
    
  }

  setFocus() {
    if (this.componentInstance)  {
      if (this.componentInstance.activate) {
        this.componentInstance.activate();
      } else if (this.componentInstance.setFocus) {
        this.componentInstance.setFocus();
      }
    }
  }

  isSelectable() {
    return false;
  }

  getRowInfo() {
    const rowIndex = this.getDatasetIndex();
    const rowData = this.dataset.data[rowIndex];
    const columnName = this.columnName;
    const value = rowData? rowData[columnName] : '';
    return {
      rowIndex,
      rowData,
      columnName,
      value,
      dataset: this.dataset,
      grid: this.grid,
    };
  }

  updateComponentState() {
    this.setEditable();
    this.setDisabled();
    this.setVisibility();    
  }

}

export default CellBase;
