import Vue from 'vue';
import GridCellBase from '../GridCellBase';
import CellMultiSelectView from './CellMultiSelectView';

class CellMultiSelect extends GridCellBase {
  constructor(row, column, value, parentElement, propsData, dataset, grid) {
    super(row, column, value, parentElement, propsData, dataset, grid);
  }

  getBaseComponent() { // cell에 그려질 기본 컴포넌트를 반환
    return CellMultiSelectView;
  }

  getEventName() { // 컴포넌트 데이터 변경을 감지할 이벤트 이름
    return 'select';
  }

  decoratePropsData(row, column, value, propsData) { // 컴포넌트의 초기 props 설정
    propsData.value = value;
  }

  setValue(value) { // 컴포넌트의 값을 변경 하는 함수
    if (this.componentInstance) {
      this.componentInstance.setStrValue(value);
    }
  }
  
  setDefaultValue(value) {
    this.setValue(value);
  }

  getValueFromEvent(event) { // 이벤트로부터 실제 dataset을 변경할 value 를 반환
    return event;
  }

  createComponentInstance(component, parentElement, propsData) {  
    super.createComponentInstance(component, parentElement, propsData);
    this.componentInstance.getRowInfo = this.getRowInfo.bind(this);
  }
}

export default CellMultiSelect;
