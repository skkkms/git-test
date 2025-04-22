<template>
  <div style="display: flex;width: 100%;">
    <div class="receiver_list_wrap">
      <div class="list_control">
        <div class="left">
          <span>
            <cmp-exclusive-button-group
              ref="buttonGroup"
              v-model="headerApprovalType"
              :pageId="pageId"
              :btnInfo="approvalHeaderButns"
              :styleClass="'btn_receive_typeA'"
              :disabled="disabled"
              @click="changeApprovalType()"
            />
          </span>
          <span class="control_btn">
            <sui-button
              type="button"
              class="comm_btn_gridTop"
              :disabled="disabled"
              @click="clickOnTogglePostApproval"
            >
              {{ $t('MSG_TXT_AFAP') }}
            </sui-button>
            <sui-button
              type="button"
              class="comm_btn_gridTop"
              :disabled="disabled"
              @click="clickOnApplyParallel"
            >
              {{ $t('MSG_TXT_PRL') }}
            </sui-button>
            <sui-button
              type="button"
              class="comm_btn_gridTop"
              :disabled="disabled"
              @click="clickOnClearParallel"
            >
              {{ $t('MSG_BTN_PRL_CLR') }}
            </sui-button>
          </span>
          <span class="control_btn">
            <sui-button
              type="button"
              class="btn_control_top"
              :disabled="disabled"
              :enableDbClick="true"
              @click="moveTopSelectedRows"
            />
            <sui-button
              type="button"
              class="btn_control_up"
              :disabled="disabled"
              :enableDbClick="true"
              @click="moveUpSelectedRows"
            />
            <sui-button
              type="button"
              class="btn_control_down"
              :disabled="disabled"
              :enableDbClick="true"
              @click="moveDownSelectedRows"
            />
            <sui-button
              type="button"
              class="btn_control_bottom"
              :disabled="disabled"
              :enableDbClick="true"
              @click="moveBottomSelectedRows"
            />
            <sui-button
              type="button"
              class="btn_control_del"
              :disabled="disabled"
              :enableDbClick="true"
              @click="deleteSelectedRows"
            />
          </span>
          <span class="total">{{ $t('MSG_TIT_TOT') }}<em>{{ approverAllCnt }}</em></span>
        </div>
        <div class="right">
          <sui-button
            type="button"
            :class="[isListShow ? 'btn_control_close':'btn_control_open']"
            :disabled="disabled"
            @click="isListShow = !isListShow"
          >
            {{ $t('MSG_BTN_CLOSE') }}<!--닫기-->
          </sui-button>
        </div>
      </div>
      <div
        v-show="isListShow"
        class="user_list"
      >
        <ul class="disable-select">
          <!-- 기안자 정보 -->
          <li>
            <span class="number">0</span>
            <span class="draft">{{ $t('MSG_TXT_DRFT') }}</span>
            <span
              class="name"
              @click="clickOnDrafter"
            >
              {{ drafter.approverDispStr }}
            </span>
          </li>
          <!-- 승인/합의/통보자 정보 -->
          <li
            v-for="(itm,index) in approvalList"
            :key="index"
            :class="{tempClass: itm.selected, disabled: itm.disabled}"
          >
            <!-- 순번 -->
            <!-- 병렬이 아닐 경우 버튼 표현 -->
            <span v-if="itm.approvalType != 3 && itm.approvalType != 4 && itm.approvalType != 7">
              <span class="number">{{ itm.knoxApprovalOrder }}</span>
              <cmp-exclusive-button-group
                v-model="itm.approvalType"
                :pageId="pageId"
                :btnInfo="approvalBodyBtns"
                :disabled="itm.disFlag"
                :styleClass="'btn_receive_typeB'"
                @click="onClickApprovalType()"
              />
            </span>

            <!-- 병렬일 경우 버튼 표현 -->
            <template
              v-else
            >
              <span class="number">{{ itm.knoxApprovalOrder }}</span>
              <span
                :class="getApprovalBtnClass(itm.approvalType)"
              >
                {{ getApprovalTypeName(itm.approvalType) }}
              </span>
            </template>

            <!-- 승인자 정보 화면 표시부분 -->
            <span
              class="name"
              @click="clickOnApprover($event, itm.local_unique_id)"
            >
              {{ itm.approverDispStr }}
            </span>

            <sui-button
              type="button"
              class="btn_list_del"
              :disabled="itm.disFlag"
              @click="deleteRow(itm.local_unique_id)"
            >
              {{ $t('MSG_BTN_DEL') }}<!--삭제-->
            </sui-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// COD_APRVRT_TYPE: 결재권유형코드
const COD_DRAFT = 0; // 기안
const COD_APPROVAL = 1; // 결재
const COD_CONSENT = 2; // 합의
const COD_POST_APPROVAL = 3; // 후결
const COD_PARALLEL_CONSENT = 4; // 병렬합의
const COD_PARALLEL_APPROVAL = 7; // 병렬결재
const COD_NOTIFICATION = 9; // 통보
const TMP_APPROVAL_ORDER = 100; // 병렬로 묶을 row의 임시 approvalOrder

const COD_APRVRT_TYPE = [COD_DRAFT, COD_APPROVAL, COD_CONSENT, COD_POST_APPROVAL, COD_PARALLEL_CONSENT, COD_PARALLEL_APPROVAL, COD_NOTIFICATION,
`${COD_DRAFT}`, `${COD_APPROVAL}`, `${COD_CONSENT}`, `${COD_POST_APPROVAL}`, `${COD_PARALLEL_CONSENT}`, `${COD_PARALLEL_APPROVAL}`, `${COD_NOTIFICATION}`];

export default {
  name: 'CmpApprovalListManager',
  props: {
    // 이 컴포넌트를 사용하는 페이지ID
    pageId: {
      type: String,
      required: true,
    },
    // 목록에 보여줄 결재자 정보 포맷
    approverDispFormat: {
      type: String,
      required: false,
      default() {
        return `\${userName}/\${title}/\${deptNm}/\${email}`; // eslint-disable-line
      },
    },
    // 편집 가능 여부
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 중복확인 필드명
    uniqueFieldName: {
      type: String,
      required: false,
      default() {
        return 'approvalUserId';
      },
    },
  },
  data() {
    return {

      isListShow: true,
      drafter: {}, // 기안자 정보 Object
      headerApprovalType: COD_APPROVAL,
      approverTemplateLiteral: '', // 사용자가 설정한 template literal 포맷을 user obj 값을 받아들일 수 있는 것으로 변환된 값
      approvalHeaderButns: [
        {
          key: COD_APPROVAL,
          label: this.$t('MSG_TXT_APRV'), // "결재",
          btnOnClass: 'emailRcpt_toBtn_on',
        },
        {
          key: COD_CONSENT,
          label: this.$t('MSG_TXT_AGRM'), // "합의",
          btnOnClass: 'emailRcpt_ccBtn_on',
        },
        {
          key: COD_NOTIFICATION,
          label: this.$t('MSG_TXT_NTFC'), // "통보",
          btnOnClass: 'emailRcpt_bccBtn_on',
        },
      ],
      approvalBodyBtns: [
        {
          key: COD_APPROVAL,
          label: this.$t('MSG_TXT_APRV'), // "결재",
          btnOnClass: 'emailRcpt_toBtn_on',
        },
        {
          key: COD_CONSENT,
          label: this.$t('MSG_TXT_AGRM'), // "합의",
          btnOnClass: 'emailRcpt_ccBtn_on',
        },
        {
          key: COD_NOTIFICATION,
          label: this.$t('MSG_TXT_NTFC'), // "통보",
          btnOnClass: 'emailRcpt_bccBtn_on',
        },
      ],
      approvalList: [],
    };
  },
  computed: {
    approverAllCnt() {
      return this.approvalList.length;
    },
  },
  mounted() {
    this.reset();
    this.setApproverDispTemplate();
  },
  beforeDestroy() {
  },
  methods: {
    reset() {
    },
    /**
     * 사용자가 입력한 실제 데이터에 사용자의 template literal을 적용한 결과를 반환
     * @function getApproverDispString
     * @param {Object}: 전자메일 목록에 표시 할 사용자정보를 담고 있는 json object
     * @returns {String}: 사용자 정보 object 에서 목록에 표시할 포멧에 맞는 값을 찾아서 문자열로 연결해서 반환
     */
    getApproverDispString(recptObj) {
      _.templateSettings.interpolate = /\${([\s\S]+?)}/g;
      const compiled = _.template(`${this.approverTemplateLiteral}`);
      return compiled(recptObj);
    },
    /**
     * 사용자 template literal 을 받아서 각 placeHolder 명을 사용자정보 추가평션의 parameter명이 붙은 것으로 변경
     * 여기서는 getApproverDispString( recptObj) 의 매개변수 recptObj 를 각 placeHolder에 붙임
     * ex) "${userName}" -> "${recptObj.userName}"
     * @function setApproverDispTemplate
     * @returns {none}
     */
    setApproverDispTemplate() {
      const re = /\$\{\s*(\w+)\s*\}/g;
      this.approverTemplateLiteral = this.approverDispFormat.replace(re, `\${$1}`);
    },
    /**
     * 특정 승인자의 결재구분 코드값을 변경
     * @function setApprovalTypeBy
     * @param {String} approvalUserId: 사용자ID - 목록에서 사용자ID에 해당하는 승인자를 찾음
     * @param {String} approvalType: 결재구분 코드값
     * @returns {None}
     */
    setApprovalTypeBy(approvalUserId, approvalType) {
      this.$nextTick(() => {
        const _obj = utils.find(this.approvalList, JSON.parse(`{"${this.uniqueFieldName}": "${approvalUserId}"}`));
        if (utils.isEmpty(_obj)) {
          utils.messageBox('warning', `해당 ${this.uniqueFieldName}(${approvalUserId})과 일치하는 사용자가 존재하지 않습니다.`);
        } else {
          _obj.approvalType = approvalType;
          this.$forceUpdate();
        }
      });
    },
    /**
     * 이메일 수신자 정보를 수신목록에 추가
     * @function addApprover
     * @returns {none}
     */
    addApprover(approverInfo) {
      if (utils.isEmpty(approverInfo[this.uniqueFieldName])) {
        utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), this.$t('MSG_ALT_NCELL_REQUIRED_VAL').replace('{0}', `(${this.uniqueFieldName})`));
        return false;
      }
      const _approverInfo = utils.cloneDeep(approverInfo);

      // 중복체크
      if (this.drafter[this.uniqueFieldName] == _approverInfo[this.uniqueFieldName]) {
        utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), this.$t('MSG_ALT_DUP_USER_EXIST'));
        return false;
      }
      if (!utils.isEmpty(utils.find(this.approvalList, JSON.parse(`{"${this.uniqueFieldName}": "${_approverInfo[this.uniqueFieldName]}"}`)))) {
        utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), this.$t('MSG_ALT_DUP_USER_EXIST'));
        return false;
      }
      this.approvalList.push(_approverInfo);
      const _curRow = this.approvalList[this.approvalList.length - 1];
      _curRow.approvalType = COD_APRVRT_TYPE.indexOf(_curRow.approvalType) >= 0 ? _curRow.approvalType : this.headerApprovalType;
      _curRow.approverDispStr = this.getApproverDispString(_approverInfo);
      _curRow[this.uniqueFieldName] = _approverInfo[this.uniqueFieldName];
      _curRow.selected = false;
      _curRow.isMoving = false;
      _curRow.local_unique_id = `id_${Math.round(Math.random() * 1000)}_${Math.round(Math.random() * 1000)}`;
      // _curRow.knoxApprovalOrder = this.approvalList.length == 1 ? 1 : this.approvalList[this.approvalList.length - 2].knoxApprovalOrder + 1;
      if (!utils.isNumber(_curRow.knoxApprovalOrder * 1)) {
        _curRow.knoxApprovalOrder = this.approvalList.length == 1 ? 1 : this.approvalList[this.approvalList.length - 2].knoxApprovalOrder + 1;
      }
    },
    /**
     * 기안자 정보 추가
     * @function addDrafter
     * @param {Object} drafterInfo: 기안자 정보
     * @returns {None}
     */
    addDrafter(drafterInfo) {
      // 중복체크
      if (!utils.isEmpty(utils.find(this.approvalList, JSON.parse(`{"${this.uniqueFieldName}": "${drafterInfo[this.uniqueFieldName]}"}`)))) {
        utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), this.$t('MSG_ALT_DUP_USER_EXIST'));
        return false;
      }

      this.drafter = drafterInfo;
      this.drafter.approvalType = COD_DRAFT;
      this.drafter.knoxApprovalOrder = 0;
      this.drafter.approverDispStr = this.getApproverDispString(drafterInfo);
      this.drafter[this.uniqueFieldName] = drafterInfo[this.uniqueFieldName];
      this.drafter.selected = false;
      this.drafter.local_unique_id = `id_${Math.round(Math.random() * 1000)}_${Math.round(Math.random() * 1000)}`;
    },
    /**
     * 선택한 수신자들의 수신종류 변경
     * @function changeApprovalType
     * @returns {none}
     */
    changeApprovalType() {
      this.approvalList.forEach(itm => {
        if (itm.selected) {
          if (itm.disFlag === null || itm.disFlag === undefined
          || itm.disFlag) {
            itm.approvalType = this.headerApprovalType;
          }
        }
      });
    },
    /**
     * 메일 수신자 목록에서 "수신/참조/비밀참조" 버튼 클릭 event handler
     * @function onClickApprovalType
     * @returns {none}
     */
    onClickApprovalType(approver) {
      this.$forceUpdate();
    },
    /**
     * 선택한 row 의 approvalType 을 변경
     * "후결"이 아닌 row는 "후결"로 변경
     * "후결"인 row는 "결재"로 변경
     * @function clickOnTogglePostApproval
     * @param {None}
     * @returns {None}
     */
    clickOnTogglePostApproval() {
      this.approvalList.forEach(itm => {
        if (itm.selected) {
          if (itm.disFlag === null || itm.disFlag === undefined
          || itm.disFlag) {
            itm.approvalType = itm.approvalType == COD_POST_APPROVAL ? COD_APPROVAL : COD_POST_APPROVAL;
          }
        }
      });
      this.$forceUpdate();
    },
    /**
     * 선택한 row에 병렬 적용
     * 결재타입 값이 "결재", "병렬결재", "합의", "병렬합의" 인 row가 2개 이상 되어야 함
     * "결재" -> "병렬결재", "합의" -> "병렬합의" 로 변경하고 동일한 knoxApprovalOrder 를 가져야 함
     * 동일한 knoxApprovalOrder 를 가지면서 그 중 순서가 높은 row 밑으로 모여야 함
     * 직전에 동일한 knoxApprovalOrder 를 가지고 있다가 이번에 선택되지 않은 row 들은
     * "병렬결재" -> "결재", "병렬합의" -> "합의"로 변경하고 knoxApprovalOrder 를 다시 매겨야 함
     * @function clickOnMergeParallel
     * @param {None}
     * @returns {None}
     */
    clickOnApplyParallel() {
      let _selectedCnt = 0;
      let _passCnt = 0;
      const _selectedIndices = [];
      const _selectedApprovalOrders = [];

      this.approvalList.forEach((itm, index) => {
        if (itm.selected) {
          if (itm.disFlag === null || itm.disFlag === undefined
          || itm.disFlag) {
            _selectedCnt += 1;
            if (itm.approvalType === COD_APPROVAL || itm.approvalType === COD_CONSENT
              || itm.approvalType === COD_PARALLEL_CONSENT || itm.approvalType === COD_PARALLEL_APPROVAL) {
              _passCnt += 1;
              _selectedIndices.push(index);
              _selectedApprovalOrders.push(itm.knoxApprovalOrder);
            }
          }
        }
      });

      if (_selectedCnt > 0) {
        if (_selectedCnt === 1) {
          // 병렬 결재자는 2명 이상 선택하여 주십시오.
          utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), this.$t('MSG_ALT_PRL_APRV_MORE'));
        } else if (_passCnt === _selectedCnt) {
          this.approvalList.forEach((itm, index) => {
            // 결재타입 변경: "결재" --> "병렬결재", "합의" --> "병렬합의"
            if (_selectedIndices.indexOf(index) >= 0) {
              // 임시 knoxApprovalOrder 부여
              itm.knoxApprovalOrder = TMP_APPROVAL_ORDER;

              if (itm.approvalType == COD_APPROVAL || itm.approvalType == COD_PARALLEL_APPROVAL) {
                itm.approvalType = COD_PARALLEL_APPROVAL;
              } else if (itm.approvalType == COD_CONSENT || itm.approvalType == COD_PARALLEL_CONSENT) {
                itm.approvalType = COD_PARALLEL_CONSENT;
              } else {
                utils.messageBox('warning', '확인', `현재 구문에서 적절하지 않은 결재구분코드값 [${itm.approvalType}] 입니다.`);
                return false;
              }
            }
          });

          // 동일한 knoxApprovalOrder를 가졌던 row들 처리
          this.approvalList.forEach((itm, index) => {
            if (_selectedApprovalOrders.indexOf(itm.knoxApprovalOrder) >= 0) {
              // 결재순번은 임의의 unique한 값으로 부여
              itm.knoxApprovalOrder = TMP_APPROVAL_ORDER + index + 1;

              // "병렬결재" --> "결재", "병렬합의" --> "합의"
              if (itm.approvalType === COD_PARALLEL_APPROVAL) {
                itm.approvalType = COD_APPROVAL;
              } else if (itm.approvalType === COD_PARALLEL_CONSENT) {
                itm.approvalType = COD_CONSENT;
              } else {
                utils.messageBox('warning', '확인', `현재 구문에서 적절하지 않은 결재구분코드값 [${itm.approvalType}] 입니다.`);
                return false;
              }
            }
          });

          // 결재 순번이 TMP_APPROVAL_ORDER 인 row끼리 뭉쳐!
          this.groupRowsBy(TMP_APPROVAL_ORDER);

          // 결재순번 다시 매김
          this.resetApprovalOrder();

          this.$forceUpdate();
        } else {
          // 병렬은 결재 또는 합의자만 지정 가능합니다.
          utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), this.$t('MSG_ALT_PRL_AGRM_APRV'));
        }
      }
    },
    /**
     * 동일한 결재순번을 가진 row들을 한데 뭉친다.
     * 병렬해제 혹은 병렬 직후 수행
     * @function groupRows
     * @param {None}
     * @returns {None}
     */
    groupAllRows() {
      // knoxApprovalOrder 값별 count 계산
      const _orderCnt = [];
      this.approvalList.forEach(itm => {
        const _index = utils.findIndex(_orderCnt, { knoxApprovalOrder: itm.knoxApprovalOrder });
        if (_index >= 0) {
          _orderCnt[_index].count += 1;
        } else {
          _orderCnt.push({
            knoxApprovalOrder: itm.knoxApprovalOrder,
            count: 1,
          });
        }
      });

      // knoxApprovalOrder 값이 동일한 row들이 존재하면 grouping 진행
      _orderCnt.forEach(itm => {
        if (itm.count > 1) {
          this.groupRowsBy(itm.knoxApprovalOrder);
        }
      });
    },
    /**
     * 특정 결재순번인 row들을 한데 뭉침
     * 제일 상위의 row 기준으로 그 바로 아래로 순서대로 뭉침
     * @function groupRowsBy
     * @param {String} knoxApprovalOrder
     * @returns
     */
    groupRowsBy(knoxApprovalOrder) {
      const _firstRow = utils.findIndex(this.approvalList, { knoxApprovalOrder });
      const _removedRows = utils.remove(this.approvalList, (itm, index) => index > _firstRow && itm.knoxApprovalOrder == knoxApprovalOrder);
      for (let i = _removedRows.length - 1; i >= 0; i--) {
        this.approvalList.splice(_firstRow + 1, 0, _removedRows[i]);
      }
    },
    /**
     * 선택한 row에 병렬 해제 적용
     * 선택한 row를 병렬해제하고 난 다음에 남은 row 중 병렬했던 knoxApprovalOrder 값으로 한 row만 존재할 경우 자동 해제 해야 함
     * @function clickOnClearParallel
     * @param {None}
     * @returns {None}
     */
    clickOnClearParallel() {
      const _parallelOrders = [];

      this.approvalList.forEach((itm, index) => {
        if (itm.selected && (itm.approvalType == COD_PARALLEL_APPROVAL || itm.approvalType == COD_PARALLEL_CONSENT)) {
          if (itm.disFlag === null || itm.disFlag === undefined
          || itm.disFlag) {
            // "병렬결재" --> "결재", "병렬합의" --> "합의"
            itm.approvalType = itm.approvalType == COD_PARALLEL_APPROVAL ? COD_APPROVAL : COD_CONSENT;
            _parallelOrders.push(itm.knoxApprovalOrder);
            itm.knoxApprovalOrder = TMP_APPROVAL_ORDER + index + 1;// 임의의 unique한 값
          }
        }
      });

      // 병렬(결재, 합의) row들 중 일부 삭제 등으로 한row만 남았을 경우를 찾아서 병렬 해제
      this.refreshParallelApprovalType();

      this.groupAllRows();

      // 결재순번 다시 매김
      this.resetApprovalOrder();

      this.$forceUpdate();
    },
    getApprovalBtnClass(approvalTypeCode) {
      let _rtnStr = '';
      switch (approvalTypeCode) {
        case COD_DRAFT:
        case `${COD_DRAFT}`:
          _rtnStr = 'draft';
          break;
        case COD_POST_APPROVAL:
        case `${COD_POST_APPROVAL}`:
          _rtnStr = 'decision';
          break;
        case COD_PARALLEL_APPROVAL:
        case `${COD_PARALLEL_APPROVAL}`:
          _rtnStr = 'approval';
          break;
        case COD_PARALLEL_CONSENT:
        case `${COD_PARALLEL_CONSENT}`:
          _rtnStr = 'agree';
          break;
        default:
          utils.messageBox('warning', '확인', `확인되지 않은 결재구분코드값 [${approvalTypeCode}] 입니다.`);
      }
      return _rtnStr;
    },
    /**
     * approval 구분 코드 값에 따른 문자열 반환
     * @function getApprovalTypeName
     * @param {Number} approvalTypeCode
     * @returns {String} approvalTypeName
     */
    getApprovalTypeName(approvalTypeCode) {
      let _rtnStr = '';
      switch (approvalTypeCode) {
        case COD_DRAFT:
        case `${COD_DRAFT}`:
          _rtnStr = this.$t('MSG_TXT_DRAFT');
          break;
        case COD_APPROVAL:
        case `${COD_APPROVAL}`:
          _rtnStr = this.$t('MSG_TXT_APRV');
          break;
        case COD_CONSENT:
        case `${COD_CONSENT}`:
          _rtnStr = this.$t('MSG_TXT_AGRM');
          break;
        case COD_POST_APPROVAL:
        case `${COD_POST_APPROVAL}`:
          _rtnStr = this.$t('MSG_TXT_AFAP');
          break;
        case COD_NOTIFICATION:
        case `${COD_NOTIFICATION}`:
          _rtnStr = this.$t('MSG_TXT_NTFC');
          break;
        case COD_PARALLEL_CONSENT:
        case `${COD_PARALLEL_CONSENT}`:
          _rtnStr = this.$t('MSG_TXT_PRL_AGRM');
          break;
        case COD_PARALLEL_APPROVAL:
        case `${COD_PARALLEL_APPROVAL}`:
          _rtnStr = this.$t('MSG_TXT_PRL_APRV');
          break;
        default:
          utils.messageBox('warning', '확인', `확인되지 않은 결재구분코드값 [${approvalTypeCode}] 입니다.`);
      }
      return _rtnStr;
    },
    /**
     * 기안자 정보 click event handler
     */
    clickOnDrafter() {
      this.approvalList.forEach(itm => {
        itm.selected = false;
      });
      this.clearMovingFlag();
      this.$forceUpdate();
    },
    /**
     * TODO: 아래 method안의 loop와 로직은 기계적인 코딩 - 필히 수정해야 함
     * 결재자 정보 click event handler
     * @function clickOnApprover
     * @param {Object} event
     * @param {String} id
     * @returns {None}
     */
    clickOnApprover(event, id) {
      if ((event.shiftKey && event.ctrlKey) || event.ctrlKey) {
        this.approvalList.forEach(itm => {
          if (itm.local_unique_id == id) {
            itm.selected = !itm.selected;
          }
        });
      } else if (event.shiftKey) {
        let _beginIndex = 0;
        for (let i = 0; i < this.approvalList.length; i++) {
          if (this.approvalList[i].local_unique_id == id) {
            _beginIndex = i;
            break;
          }
        }
        let _endIndex = -1;
        for (let i = 0; i < _beginIndex; i++) {
          if (this.approvalList[i].selected) {
            _endIndex = i;
          }
        }
        if (_endIndex == -1) {
          for (let i = _beginIndex + 1; i < this.approvalList.length; i++) {
            if (this.approvalList[i].selected) {
              _endIndex = i;
              break;
            }
          }
        }
        if (_endIndex == -1) {
          this.approvalList[_beginIndex].selected = true;
        } else {
          this.approvalList.forEach(itm => {
            itm.selected = false;
          });
          for (let i = 0; i <= Math.abs(_beginIndex - _endIndex); i++) {
            this.approvalList[Math.min(_beginIndex, _endIndex) + i].selected = true;
          }
        }
      } else {
        this.approvalList.forEach(itm => {
          if (itm.local_unique_id == id) {
            itm.selected = true;
          } else {
            itm.selected = false;
          }
        });
      }

      this.$forceUpdate();
    },
    /**
     * 결재자 목록에서 이동 대상으로 선택된 flag 를 clear 한다.
     */
    clearMovingFlag() {
      this.approvalList.forEach(itm => {
        itm.isMoving = false;
      });
    },
    /**
     * 동일한 결재순번을 가진 row들을 반환
     * 원본(this.approvalList)는 해당 row들이 제거된채로 변경됨
     */
    pullRowsByApprovalOrder(orderNo) {
      return utils.remove(this.approvalList, itm => itm.knoxApprovalOrder == orderNo);
    },
    /**
     * 이동중 flag 가 true 인 row를 뽑아서 리턴한다.
     * 원본(approvalList)는 해당 row들이 제거된채로 변경되어짐
     */
    pullMovingFlagRows() {
      return utils.remove(this.approvalList, itm => itm.isMoving);
    },
    /**
     * 기안자 정보 설정
     * @function setDrafter
     * @param {Object} drafterInfo: 기안자 정보
     * @returns {None}
     */
    setDrafter(drafterInfo) {
      this.drafter = drafterInfo;
      this.drafter.approvalType = COD_DRAFT;
      this.drafter.knoxApprovalOrder = 0;
      this.drafter.approverDispStr = this.getApproverDispString(drafterInfo);
      this.drafter[this.uniqueFieldName] = drafterInfo[this.uniqueFieldName];
      this.drafter.selected = false;
      this.drafter.local_unique_id = `id_${Math.round(Math.random() * 1000)}_${Math.round(Math.random() * 1000)}`;
    },
    /**
     *
     */
    setRowsMovingFlagByApprovalOrder(orderNo, trueOrFalse) {
      this.approvalList.forEach(itm => {
        if (itm.knoxApprovalOrder == orderNo) {
          itm.isMoving = utils.isEmpty(trueOrFalse) ? true : trueOrFalse;
        }
      });
    },
    /**
     * 승인자 목록의 결재 순번을 처음부터 다시 매김
     * 그루핑되어 있을 경우를 고려하여 동일한 결재 순번을 가진 row는
     * 새로운 순번도 동일한 값으로 가져가야 함
     * @function resetApprovalOrder
     * @param {None}
     * @returns {None}
     */
    resetApprovalOrder() {
      let _tobeOrderNo = 0;
      let _groupOrderNo = -1;

      utils.forEach(this.approvalList, (itm, index) => {
        if (itm.knoxApprovalOrder !== _groupOrderNo) {
          _tobeOrderNo += 1;
          _groupOrderNo = itm.knoxApprovalOrder;
        }
        this.approvalList[index].knoxApprovalOrder = _tobeOrderNo;
      });
    },
    /**
     * 선택된 row들을 제일 상단으로 이동
     * @function moveTopSelectedRows
     * @param {None}
     * @returns {None}
     */
    moveTopSelectedRows() {
      // "이동중" flag reset
      this.clearMovingFlag();

      // 선택된 row와 동일한 knoxApprovalOrder 를 가진 놈들을 이동 대상으로 flag 변경
      this.approvalList.forEach(itm => {
        if (itm.selected) {
          this.setRowsMovingFlagByApprovalOrder(itm.knoxApprovalOrder);
        }
      });

      // 이동 대상 row들을 싹 빼가지고 옴
      const _removedRows = this.pullMovingFlagRows();

      // disabled = true 인 row 아래부터 추가 가능
      let lastIndex = utils.findLastIndex(this.approvalList, { disabled: true });
      lastIndex = lastIndex === -1 ? 0 : lastIndex + 1;
      // 하나씩 차례대로 추가
      for (let i = _removedRows.length - 1; i >= 0; i -= 1) {
        this.approvalList.splice(lastIndex, 0, _removedRows[i]);
      }

      // 결재순번 다시 매김
      this.resetApprovalOrder();
    },
    /**
     * 선택된 row들을 제일 하단으로 이동
     * @function moveBottomSelectedRows
     * @param {None}
     * @returns {None}
     */
    moveBottomSelectedRows() {
      // "이동중" flag reset
      this.clearMovingFlag();

      // 선택된 row와 동일한 knoxApprovalOrder 를 가진 놈들을 이동 대상으로 flag 변경
      this.approvalList.forEach(itm => {
        if (itm.selected) {
          this.setRowsMovingFlagByApprovalOrder(itm.knoxApprovalOrder);
        }
      });

      // 이동 대상 row들을 싹 빼가지고 옴
      const _removedRows = this.pullMovingFlagRows();

      // 하나씩 차례대로 추가
      for (let i = 0; i < _removedRows.length; i += 1) {
        this.approvalList.push(_removedRows[i]);
      }

      // 결재순번 다시 매김
      this.resetApprovalOrder();
    },
    /**
     * 선택된 row들을 한줄 위로 이동
     * @function moveUpSelectedRows
     * @param {None}
     * @returns {None}
     */
    moveUpSelectedRows() {
      // "이동중" flag reset
      this.clearMovingFlag();

      // 선택된 row와 동일한 approvalOrder 를 가진 놈들을 이동 대상으로 flag 변경
      this.approvalList.forEach(itm => {
        if (itm.selected) {
          this.setRowsMovingFlagByApprovalOrder(itm.knoxApprovalOrder);
        }
      });

      const _selectedIds = [];
      this.approvalList.forEach((itm, index) => {
        if (itm.isMoving) {
          _selectedIds.push(itm.local_unique_id);
        }
      });

      // 첫번째 row의 이동이 성공하면 나머지 이동
      if (this.moveUpRow(_selectedIds[0])) {
        for (let i = 1; i < _selectedIds.length; i++) {
          this.moveUpRow(_selectedIds[i]);
        }
      }

      // 결재순번 다시 매김
      this.resetApprovalOrder();
    },
    /**
     * 선택된 row들을 한줄 아래로 이동
     * @function moveDownSelectedRows
     * @param {None}
     * @returns {None}
     */
    moveDownSelectedRows() {
      // "이동중" flag reset
      this.clearMovingFlag();

      // 선택된 row와 동일한 knoxApprovalOrder 를 가진 놈들을 이동 대상으로 flag 변경
      this.approvalList.forEach(itm => {
        if (itm.selected) {
          this.setRowsMovingFlagByApprovalOrder(itm.knoxApprovalOrder);
        }
      });

      const _selectedIds = [];
      this.approvalList.forEach((itm, index) => {
        if (itm.isMoving) {
          _selectedIds.push(itm.local_unique_id);
        }
      });
      // 첫번째 row의 이동이 성공하면 나머지 이동
      if (this.moveDownRow(_selectedIds[_selectedIds.length - 1])) {
        for (let i = _selectedIds.length - 2; i >= 0; i--) {
          this.moveDownRow(_selectedIds[i]);
        }
      }

      // 결재순번 다시 매김
      this.resetApprovalOrder();
    },
    /**
     * id에 해당하는 하나의 row만 한줄 위로 이동
     * @function moveUpRow
     * @param {String} id
     * @returns {None}
     */
    moveUpRow(id) {
      let _selectedIndex = 0;
      for (let i = 0; i < this.approvalList.length; i += 1) {
        if (id == this.approvalList[i].local_unique_id) {
          _selectedIndex = i;
          break;
        }
      }
      if (_selectedIndex == 0 || this.approvalList[_selectedIndex - 1].disabled === true) {
        return false;
      }

      const _removedRow = utils.pullAt(this.approvalList, _selectedIndex);
      this.approvalList.splice(_selectedIndex - 1, 0, _removedRow[0]);
      return true;
    },
    /**
     * id에 해당하는 하나의 row만 한줄 아래로 이동
     */
    moveDownRow(id) {
      let _selectedIndex = 0;
      for (let i = 0; i < this.approvalList.length; i += 1) {
        if (id == this.approvalList[i].local_unique_id) {
          _selectedIndex = i;
          break;
        }
      }
      if (_selectedIndex == this.approvalList.length - 1) {
        return false;
      }

      const _removedRow = utils.pullAt(this.approvalList, _selectedIndex);
      this.approvalList.splice(_selectedIndex + 1, 0, _removedRow[0]);
      return true;
    },
    deleteSelectedRows() {
      for (let i = this.approvalList.length - 1; i >= 0; i -= 1) {
        if (this.approvalList[i].selected) {
          // if (utils.isEqual(this.approvalList[i].disFlag, 'true') === false) {
          if (this.approvalList[i].disFlag === null || this.approvalList[i].disFlag === undefined
                    || utils.isEqual(this.approvalList[i].disFlag, false)) {
            this.approvalList.splice(i, 1);
          }
        }
      }

      // 병렬(결재, 합의) row들 중 일부 삭제 등으로 한row만 남았을 경우를 찾아서 병렬 해제
      this.refreshParallelApprovalType();
      // 결재순번 다시 매김
      this.resetApprovalOrder();
    },
    /**
     * id에 해당하는 하나의 row만 삭제
     */
    deleteRow(id) {
      for (let i = this.approvalList.length - 1; i >= 0; i -= 1) {
        if (this.approvalList[i].local_unique_id === id) {
          // if (utils.isEqual(this.approvalList[i].disFlag, 'true') === false) {
          if (this.approvalList[i].disFlag === null || this.approvalList[i].disFlag === undefined
                    || utils.isEqual(this.approvalList[i].disFlag, false)) {
            this.approvalList.splice(i, 1);
            break;
          }
        }
      }

      // 병렬(결재, 합의) row들 중 일부 삭제 등으로 한row만 남았을 경우를 찾아서 병렬 해제
      this.refreshParallelApprovalType();
      // 결재순번 다시 매김
      this.resetApprovalOrder();
    },
    /**
     * 현재까지 작성된 결재경로 정보를 반환
     * @function getApprovalPathList
     * @param {None}
     * @returns {Array}: 현재까지 작성된 결재경로 목록
     */
    getApprovalPathList() {
      const _arr = utils.clone(this.approvalList);
      _arr.unshift(utils.clone(this.drafter)); // 기안자 를 배열의 첫번째로 끼움
      // '결재사용자 상세' 테이블의 칼럼 값 추가
      // 결재순서(approvalOrder), 결재병렬순서(approvalParallelOrder), 결재권유형코드(rightApprovalTypeCode)
      utils.forEach(_arr, (itm, index) => {
        utils.set(itm, 'approvalOrder', index); // 결재순서
        utils.set(itm, 'rightApprovalTypeCode', itm.approvalType); // 결재권유형코드
        utils.set(itm, 'approvalParallelOrder', itm.knoxApprovalOrder); // 결재병렬순서
      });

      return _arr;
    },
    /**
     * 병렬(결재, 합의) row들 중 일부 삭제 등으로 한row만 남았을 경우를 찾아서 병렬 해제
     */
    refreshParallelApprovalType() {
      utils.forEach(this.approvalList, (itm, index) => {
        if ([COD_PARALLEL_APPROVAL, `${COD_PARALLEL_APPROVAL}`, COD_PARALLEL_CONSENT, `${COD_PARALLEL_CONSENT}`].indexOf(itm.approvalType) >= 0) {
          // 하나의 병렬그룹은 '병렬결재' 나 '병렬합의' 중 하나로 통일되어야 할 경우엔 아래 주석 처리한 코드 사용
          // const arrSameParallel = utils.filter(this.approvalList, { knoxApprovalOrder: itm.knoxApprovalOrder, approvalType: itm.approvalType });
          // 하나의 병렬그룹에 '병렬결재' 와 '병렬합의' 가 같이 존재할 경우 아래의 코드 사용
          const arrSameParallel = utils.filter(this.approvalList, { knoxApprovalOrder: itm.knoxApprovalOrder });
          if (arrSameParallel.length === 1) {
            // "병렬결재" --> "결재", "병렬합의" --> "합의"
            this.approvalList[index].approvalType = (this.approvalList[index].approvalType * 1 === COD_PARALLEL_APPROVAL) ? COD_APPROVAL : COD_CONSENT;
            // row2.knoxApprovalOrder = TMP_APPROVAL_ORDER + TMP_APPROVAL_ORDER + inx + 1;// 임의의 unique한 값
          }
        }
      });
    },
  },
};
</script>

<style lang="css" scoped>
</style>
