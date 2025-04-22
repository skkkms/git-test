import Vue from 'vue';
import GridCellBase from '../GridCellBase';
import CellSegmentBoxView from './CellSegmentBoxView';

class CellSegmentBox extends GridCellBase {
  constructor(row, column, value, parentElement, propsData, dataset, grid) {
    super(row, column, value, parentElement, propsData, dataset, grid);
  }

  getBaseComponent() { // cell에 그려질 기본 컴포넌트를 반환
    return CellSegmentBoxView;
  }

  getEventName() { // 컴포넌트 데이터 변경을 감지할 이벤트 이름
    return 'input';
  }

  decoratePropsData(row, column, value, propsData) { // 컴포넌트의 초기 props 설정
    if (!propsData.items) {
      propsData.items = [{key: 'Y', label: 'Y'}, {key: 'N', label: 'N'}];
    }
    propsData.value = [];
    _.forEach(propsData.items, item => {
      if (value === item.key)  {
        propsData.value = item;
      }
    });
    if (propsData.handler) {
      this.handler = propsData.handler;
    }
  }

  setValue(value) { // 컴포넌트의 값을 변경 하는 함수
    if (this.getComponentInstance() && this.getComponentInstance().getValue() !== value) {
      this.getComponentInstance().setValue(value);
    }
  }

  getValueFromEvent(event) { // 이벤트로부터 실제 dataset을 변경할 value 를 반환
    return event.key;
  }

  bindEvents() {
    super.bindEvents();
    this.getComponentInstance().$on('input', this.onBadgeClicked.bind(this));
  }

  onBadgeClicked(button) {
    if (this.handler) {
      this.handler(button.key, this.getCurrentDataRow(), this.getDatasetIndex(), this.columnName);
    }
  }

}

export default CellSegmentBox;
