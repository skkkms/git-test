import GridCellBase from '../GridCellBase';
import CellUserNameView from './CellUserNameView';
import store from '~system/vuex';

class CellUserName extends GridCellBase {
  constructor(row, column, value, parentElement, propsData, dataset, grid) {
    super(row, column, value, parentElement, propsData, dataset, grid);

    // grid 에 사용자명을 저장할 map property를 추가
    if (!grid[column]) {
      grid[column] = {};
    }
    if (!grid[column].userNameMap) {
      grid[column].userNameMap = new Map();
    }
    // 사용자 정의 datafield 확인
    grid[column].datafieldMap = propsData.datafieldMap || {};
    grid[column].displayType = propsData.displayType || '1'; // default 는 1

    // 사용자 정의 필드맵핑 정보가 존재하면 해당 필드 명을 저장하고 아니면 default 필드 명을 저장
    grid[column].fieldName_displayLanguageId = grid[column].datafieldMap.displayLanguageId || 'displayLanguageId';
    grid[column].fieldName_knoxId = grid[column].datafieldMap.knoxId || 'knoxId';
    grid[column].fieldName_userId = grid[column].datafieldMap.userId || 'userId';
    grid[column].fieldName_loginId = grid[column].datafieldMap.loginId || 'loginId';
    grid[column].fieldName_userName = grid[column].datafieldMap.userName || 'userName';
    grid[column].fieldName_userGlobalName = grid[column].datafieldMap.userGlobalName || 'userGlobalName';
    grid[column].fieldName_departmentName = grid[column].datafieldMap.departmentName || 'departmentName';
    grid[column].fieldName_departmentEnglishName = grid[column].datafieldMap.departmentEnglishName || 'departmentEnglishName';

    // value 는 의미가 없음, setValue 내에서 사용하는 데이터는 dataRow
    this.setValue(value);
  }

  getBaseComponent() { // cell에 그려질 기본 컴포넌트를 반환
    return CellUserNameView;
  }

  getEventName() { // 컴포넌트 데이터 변경을 감지할 이벤트 이름
    return null;
  }

  decoratePropsData(row, column, value, propsData) { // 컴포넌트의 초기 props 설정
    //propsData.value = value;// 그리드 칼럼 정의에서 바인딩된 datafield의 값
    if (propsData.handler) {
      this.handler = propsData.handler;
    }
  }

  /**
   * 정해진 사용자명 표시 형식으로 포맷팅한 문자열을 map에서 get 하여 컴포넌트에 넘겨 줌
   * map에 존재하지 않으면 포맷팅하여 map에 add 함
   * 한번 포맷팅한 값을 저장해서 재 사용하지 않을 경우 성능부하 때문에 그리드의 이 컴포넌트 영역의 값이 깜빡임이 발생함
   * @function setValue
   * @param {String} value: 여기서는 사용하지 않는 형식적인 파라미터
   * @returns {None}
   */
  setValue(value) { // 컴포넌트의 값을 변경 하는 함수
    if (this.getComponentInstance()) {
      if (!this.hasUserName()) {
        this.addUserName(this.getFormattedUserName());
      }
      this.getComponentInstance().setValue(this.getUserName(),
        this.getFormattedFullName(),
        this.getCurrentRowValue(this.grid[this.columnName].fieldName_knoxId),
        this.getCurrentRowValue(this.grid[this.columnName].fieldName_userId),
        this.getCurrentRowValue(this.grid[this.columnName].fieldName_loginId));
    }
  }

  getValueFromEvent(event) { // 이벤트로부터 실제 dataset을 변경할 value 를 반환
    return event;
  }

  bindEvents() {
    super.bindEvents();
    this.getComponentInstance().$on('clicked', this.onBtnClicked.bind(this));
    this.dataset.$on(this.dataset.EVENTS.RAW_DATA_CHANGED, this.onDatasetChanged.bind(this));

  }

  onDatasetChanged() {
    if (this.grid && this.columnName && this.grid[this.columnName] && this.grid[this.columnName].userNameMap) {
      this.grid[this.columnName].userNameMap.clear();
    }
  }

  onBtnClicked(button) {
    if (this.handler) {
      this.handler(button, this.getCurrentDataRow());
    }
  }

  /**
   * 포맷팅된 사용자명 문자열을 grid의 맵 변수에 추가
   * @function addUserName
   * @param {String} value: 포맷팅된 사용자명
   * @returns {Map}
   */
  addUserName(value) {
    let currKey = '';
    if (utils.getConfigurationValue("CFG_CMZ_USER_POPUP_USR_ID_TYPE") == "KNOX") {
      currKey = this.getCurrentRowValue(this.grid[this.columnName].fieldName_knoxId);
    } else {
      const userId = this.getCurrentRowValue(this.grid[this.columnName].fieldName_userId);
      const loginId = this.getCurrentRowValue(this.grid[this.columnName].fieldName_loginId);
      currKey = utils.isEmpty(userId) ? loginId : userId;
    }

    if (utils.isEmpty(currKey)) {
      return currKey;
    } else {
      return this.grid[this.columnName].userNameMap.set(currKey, value);
    }
  }

  /**
   * 매개변수로 넘어가는 key에 일치하는 포맷팅된 사용자명 문자열을 반환
   * @function getUserName
   * @param {None} None
   * @returns {String} 포맷팅된 사용자명 문자열 or undefined
   */
  getUserName() {
    let currKey = '';
    if (utils.getConfigurationValue("CFG_CMZ_USER_POPUP_USR_ID_TYPE") == "KNOX") {
      currKey = this.getCurrentRowValue(this.grid[this.columnName].fieldName_knoxId);
    } else {
      const userId = this.getCurrentRowValue(this.grid[this.columnName].fieldName_userId);
      const loginId = this.getCurrentRowValue(this.grid[this.columnName].fieldName_loginId);
      currKey = utils.isEmpty(userId) ? loginId : userId;
    }
    if (this.hasUserName()) {
      return this.grid[this.columnName].userNameMap.get(currKey);
    } else {
      return this.getFormattedUserName();
    }
  }

  /**
   * 매개변수로 넘어가는 key에 일치하는 엔트리 존재유무를 true/false 로 반환
   * @function hasUserName
   * @param {None} None
   * @returns {Boolean} true/false
   */
  hasUserName() {
    let currKey = '';
    if (utils.getConfigurationValue("CFG_CMZ_USER_POPUP_USR_ID_TYPE") == "KNOX") {
      currKey = this.getCurrentRowValue(this.grid[this.columnName].fieldName_knoxId);
    } else {
      const userId = this.getCurrentRowValue(this.grid[this.columnName].fieldName_userId);
      const loginId = this.getCurrentRowValue(this.grid[this.columnName].fieldName_loginId);
      currKey = utils.isEmpty(userId) ? loginId : userId;
    }
    return this.grid[this.columnName].userNameMap.has(currKey);
  }

  /**
   * 정의된 형식으로 화면에 표현할 사용자명 문자열을 조합하여 반환
   * @function getFormattedUserName
   * @param {None}
   * @returns {String} 포맷팅된 사용자명 문자열
   */
  getFormattedUserName() {
    let _userName = '';
    let _deptName = '';
    const _arr = [];

    if (store.getters.userInfo.langId === this.getCurrentRowValue(this.grid[this.columnName].fieldName_displayLanguageId)) {
      _userName = this.getCurrentRowValue(this.grid[this.columnName].fieldName_userName);
      _deptName = this.getCurrentRowValue(this.grid[this.columnName].fieldName_departmentName);
    } else {
      _userName = this.getCurrentRowValue(this.grid[this.columnName].fieldName_userGlobalName);
      _deptName = this.getCurrentRowValue(this.grid[this.columnName].fieldName_departmentEnglishName);
    }

    if (_userName) {
      _arr.push(_userName);
    }

    // if (utils.getConfigurationValue("CFG_CMZ_USER_POPUP_USR_ID_TYPE") == "KNOX") {
    //   if (this.getCurrentRowValue(this.grid[this.columnName].fieldName_knoxId)) {
    //     _arr.push(this.getCurrentRowValue(this.grid[this.columnName].fieldName_knoxId));
    //   }
    // } else {
    //   const userId = this.getCurrentRowValue(this.grid[this.columnName].fieldName_userId);
    //   const loginId = this.getCurrentRowValue(this.grid[this.columnName].fieldName_loginId);
  
    //   if (!utils.isEmpty(loginId)) {
    //     _arr.push(loginId);
    //   } else {
    //     _arr.push(userId);
    //   }
    // }

    if (this.grid[this.columnName].displayType === '2' && _deptName) {
      _arr.push(_deptName);
    }

    return _arr.join(' / ');
  }

  /**
   * 정의된 형식으로 화면에 표현할 사용자명 문자열을 조합하여 반환
   * @function getFormattedFullName
   * @param {None}
   * @returns {String} 포맷팅된 사용자명 문자열
   */
   getFormattedFullName() {
    let _userName = '';
    let _deptName = '';
    const _arr = [];

    if (store.getters.userInfo.langId === this.getCurrentRowValue(this.grid[this.columnName].fieldName_displayLanguageId)) {
      _userName = this.getCurrentRowValue(this.grid[this.columnName].fieldName_userName);
      _deptName = this.getCurrentRowValue(this.grid[this.columnName].fieldName_departmentName);
    } else {
      _userName = this.getCurrentRowValue(this.grid[this.columnName].fieldName_userGlobalName);
      _deptName = this.getCurrentRowValue(this.grid[this.columnName].fieldName_departmentEnglishName);
    }

    if (_userName) {
      _arr.push(_userName);
    }

    if (utils.getConfigurationValue("CFG_CMZ_USER_POPUP_USR_ID_TYPE") == "KNOX") {
      if (this.getCurrentRowValue(this.grid[this.columnName].fieldName_knoxId)) {
        _arr.push(this.getCurrentRowValue(this.grid[this.columnName].fieldName_knoxId));
      }
    } else {
      const userId = this.getCurrentRowValue(this.grid[this.columnName].fieldName_userId);
      const loginId = this.getCurrentRowValue(this.grid[this.columnName].fieldName_loginId);
  
      if (!utils.isEmpty(loginId)) {
        _arr.push(loginId);
      } else {
        _arr.push(userId);
      }
    }

    if (this.grid[this.columnName].displayType === '2' && _deptName) {
      _arr.push(_deptName);
    }

    return _arr.join(' / ');
  }

  /**
   * 
   */
  getCurrentRowValue(fieldName) {
    let currentDataRow = this.getCurrentDataRow();
    if (utils.isEmpty(currentDataRow)) {
      return '';
    } else {
      return utils.trim(this.getCurrentDataRow()[fieldName]);
    }
  }

}

export default CellUserName;