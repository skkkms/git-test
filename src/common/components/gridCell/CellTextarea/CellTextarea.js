import Vue from 'vue';
import GridCellBase from '../GridCellBase';
import CellTextareaView from './CellTextareaView';

class CellTextarea extends GridCellBase {
  constructor(row, column, value, parentElement, propsData, dataset, grid) {
    super(row, column, value, parentElement, propsData, dataset, grid);
    this.useGridAPI = true;
  }

  getBaseComponent() { // cell에 그려질 기본 컴포넌트를 반환
    return CellTextareaView;
  }

  getEventName() { // 컴포넌트 데이터 변경을 감지할 이벤트 이름
    return 'input';
  }

  decoratePropsData(row, column, value, propsData) { // 컴포넌트의 초기 props 설정    
    propsData.value = value;
    this.grid.columns.forEach(col => {
      if (col.datafield === column) {
        propsData.title = col.text;
      }
    })
    
  }

  setValue(value) { // 컴포넌트의 값을 변경 하는 함수
    if (this.getComponentInstance()) {
      this.getComponentInstance().setValue(value);
    }
  }

  getValueFromEvent(event) { // 이벤트로부터 실제 dataset을 변경할 value 를 반환
    return event;
  }

  bindEvents() {
    super.bindEvents();
    if (this.grid) {
      this.onGridColumnResized = () => {
        if (this.getComponentInstance()) {          
          this.getComponentInstance().refresh();
        }
      };
      this.grid.$on('columnresized', this.onGridColumnResized);
    }    
  }

  destroy() {
    if (this.grid) {
      this.grid.$off('columnresized', this.onGridColumnResized);
    }
    super.destroy();
  }
}

export default CellTextarea;
