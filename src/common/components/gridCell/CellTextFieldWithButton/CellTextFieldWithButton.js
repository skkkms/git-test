import Vue from 'vue';
import GridCellBase from '../GridCellBase';
import TextFieldWithButton from '~common/components/form/SuiTextFieldWithButton/SuiTextFieldWithButton';

class CellTextFieldWithButton extends GridCellBase {
  constructor(row, column, value, parentElement, propsData, dataset, grid) {
    super(row, column, value, parentElement, propsData, dataset, grid);
    // if (this.componentInstance) {
    //   this.componentInstance.textField.$on('focus', () => {
    //     this.select();
    //   })
    // }
  }

  getBaseComponent() { // cell에 그려질 기본 컴포넌트를 반환
    return TextFieldWithButton;
  }

  getEventName() { // 컴포넌트 데이터 변경을 감지할 이벤트 이름
    return 'blur';
  }

  decoratePropsData(row, column, value, propsData) { // 컴포넌트의 초기 props 설정
    propsData.fdpTextValue = value;
    propsData.grid = this.grid;
    if (propsData.handler) {
      this.handler = propsData.handler;
    }
  }

  setValue(value) { // 컴포넌트의 값을 변경 하는 함수
    if (this.getComponentInstance()) {
      this.getComponentInstance().setValue(value);
    }
  }

  getValueFromEvent(event) { // 이벤트로부터 실제 dataset을 변경할 value 를 반환
    return this.componentInstance.textField.realText;
  }

  bindEvents() {
    super.bindEvents();
    this.getComponentInstance().$on('clickButton', this.onBtnClicked.bind(this));
    this.getComponentInstance().$on('initialized', this.updateComponentState.bind(this));    
  }

  onBtnClicked(event) {
    if (this.handler) {
      this.handler(event, this.getCurrentDataRow(), this.getDatasetIndex(), this.columnName);
    }
  }
}

export default CellTextFieldWithButton;
