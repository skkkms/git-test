import GridCellBase from '../GridCellBase';

class CellMultiUserSelectAdv extends GridCellBase {
  constructor(row, column, value, parentElement, propsData, dataset, grid) {
    super(row, column, value, parentElement, propsData, dataset, grid);
  }

  getBaseComponent() { // cell에 그려질 기본 컴포넌트를 반환
    return utils.getComponentByName('CmpUserGridSelect');
  }

  getEventName() { // 컴포넌트 데이터 변경을 감지할 이벤트 이름
    return 'selected';
  }

  decoratePropsData(row, column, value, propsData) { // 컴포넌트의 초기 props 설정
    propsData.selectedUser = value;
  }

  setValue(value) { // 컴포넌트의 값을 변경 하는 함수
    this.getComponentInstance().setValue(value);
  }
  
  getValueFromEvent(event) { // 이벤트로부터 실제 dataset을 변경할 value 를 반환
    return event;
  }

  isRemoved() {
    if (this.componentInstance) {
      return (!this.componentInstance.isPopupOpened() && super.isRemoved());
    }
    super.isRemoved();
  }
}

export default CellMultiUserSelectAdv;
