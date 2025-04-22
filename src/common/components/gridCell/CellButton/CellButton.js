import GridCellBase from '../GridCellBase';
import CellButtonView from './CellButtonView';

class CellButton extends GridCellBase {
  constructor(row, column, value, parentElement, propsData, dataset, grid) {
    super(row, column, value, parentElement, propsData, dataset, grid);
    this.componentInstance.cellEditor = this;
  }

  getBaseComponent() { // cell에 그려질 기본 컴포넌트를 반환
    return CellButtonView;
  }

  getEventName() { // 컴포넌트 데이터 변경을 감지할 이벤트 이름
    return null;
  }

  decoratePropsData(row, column, value, propsData) { // 컴포넌트의 초기 props 설정
    propsData.value = value;
    propsData.grid = this.grid;
    if (propsData.handler) {
      this.handler = propsData.handler;
    }
    if(propsData.styleBoldFieldName) {
      this.styleBoldFieldName = propsData.styleBoldFieldName;
      const fieldValue = this.getCurrentDataRow()[propsData.styleBoldFieldName];
      propsData.isTextStyleBold = fieldValue && (fieldValue === true || fieldValue === 'Y');
    }
  }

  setValue(value) { // 컴포넌트의 값을 변경 하는 함수
    if (this.getComponentInstance()) {
      this.getComponentInstance().setValue(value, this.getCurrentDataRow(), this.styleBoldFieldName);
      // this.getComponentInstance().setValue(value);
    }
  }

  getValueFromEvent(event) { // 이벤트로부터 실제 dataset을 변경할 value 를 반환
    return event;
  }

  bindEvents() {
    super.bindEvents();
    this.getComponentInstance().$on('clicked', this.onBtnClicked.bind(this));
  }

  onBtnClicked(button) {
    if (this.handler) {
      this.handler(button, this.getCurrentDataRow(), this.getDatasetIndex(), this.columnName);
    }
  }

  refreshEditor(boundindex, column, value, parentElement) {
    super.refreshEditor(boundindex, column, value, parentElement);
  }
}

export default CellButton;
