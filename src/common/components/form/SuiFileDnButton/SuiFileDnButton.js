import GridCellBase from '../GridCellBase';
import SuiFileDnButtonView from './SuiFileDnButtonView';

class CellFileDnButton extends GridCellBase {
  constructor(row, column, value, parentElement, propsData, dataset, grid) {
    super(row, column, value, parentElement, propsData, dataset, grid);
    this.setValue(value);
  }

  getBaseComponent() { // cell에 그려질 기본 컴포넌트를 반환
    return SuiFileDnButtonView;
  }

  getEventName() { // 컴포넌트 데이터 변경을 감지할 이벤트 이름
    return null;
  }

  decoratePropsData(row, column, value, propsData) { // 컴포넌트의 초기 props 설정
    //propsData.value = value;
    let _row = this.getCurrentDataRow();
    propsData.value = {
      fileName : _row.fileName,
      fileSize : _row.fileSize,
      realityFilePath: _row.realityFilePath,
    };

    if (propsData.handler) {
      this.handler = propsData.handler;
    }
  }

  setValue(value) { // 컴포넌트의 값을 변경 하는 함수
    if (this.getComponentInstance()) {
      //this.getComponentInstance().setValue(value);
      let _row = this.getCurrentDataRow();
      this.getComponentInstance().setValue({
        fileName : _row.fileName,
        fileSize : _row.fileSize,
        realityFilePath: _row.realityFilePath,
      });
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
      this.handler(button, this.getCurrentDataRow());
    }
  }
}

export default SuiFileDnButton;
