<template>
  <div style="display: flex;width: 100%;">
    <div class="receiver_list_wrap">
      <div class="list_control">
        <div class="left">
          <span>
            <cmp-exclusive-button-group
              ref="buttonGroup"
              v-model="recipientType"
              :pageId="pageId"
              :btnInfo="headerBtnInfo"
              @click="changeRecipientType()"
              :disabled="disabled"                
            />
          </span>
          <span class="control_btn">
            <sui-button
              type="button"
              class="btn_control_top"
              :enableDbClick="true"
              @click="moveTop()"
              :disabled="disabled"                
            />
            <sui-button
              type="button"
              class="btn_control_up"
              :enableDbClick="true"
              @click="moveUp()"
              :disabled="disabled"                
            />
            <sui-button
              type="button"
              class="btn_control_down"
              :enableDbClick="true"
              @click="moveDown()"
              :disabled="disabled"                
            />
            <sui-button
              type="button"
              class="btn_control_bottom"
              :enableDbClick="true"
              @click="moveBottom()"
              :disabled="disabled"                
            />
            <sui-button
              type="button"
              class="btn_control_del"
              :enableDbClick="true"
              @click="deleteSelection()"
              :disabled="disabled"                
            />
          </span>
          <span class="total">{{ $t('MSG_TIT_TOT') }}<!--총--><em>{{ recipientAllCnt }}</em></span>
          <span class="receive">{{ $t('MSG_TXT_RECP') }}<!--수신--><em>{{ toCnt }}</em></span>
          <span class="refer">{{ $t('MSG_TXT_REF') }}<!--참조--><em>{{ ccCnt }}</em></span>
          <span class="secret">{{ $t('MSG_TXT_SCRT') }}<!--비밀--><em>{{ bccCnt }}</em></span>
        </div>
        <div class="right">
          <sui-button
            type="button"
            :class="[isListShow ? 'btn_control_close':'btn_control_open']"
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
          <li
            v-for="(itm,index) in recipientList"
            :key="index"
            :class="{tempClass: itm.selected}"
          >
            <span>
              <cmp-exclusive-button-group
                v-model="itm.recipientType"
                :pageId="pageId"
                :btnInfo="bodyBtnInfo"
                :styleClass="'btn_receive_typeB'"
                :disabled="itm.disFlag"                
                @click="onClickRecipientType()"
              />
            </span>
            <span
              class="name"
              @click="onClickRecipient($event, itm.id)"
            >
              {{ itm.recipient }}
            </span>
            <sui-button
              type="button"
              class="btn_list_del"
              :disabled="itm.disFlag"
              @click="deleteOne(itm.id)"
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
export default {
  name: 'CmpEmailRecipientsList',
  props: {
    // 이 컴포넌트를 사용하는 페이지ID, 데이터서비스 호출시 사용
    pageId: {
      type: String,
      required: true,
    },
    // 목록에 보여줄 수신인 정보 포맷
    // "${userName}"
    recptDispFormat: {
      type: String,
      required: false,
      default() {
        return `\${userName}/\${departmentName}/\${companyName} [\${email}]`; // eslint-disable-line
      },
    },
    // TBD: 수신인 라벨 display 제어
    showRecipientsLabel: {
      type: Boolean,
      required: false,
      default() {
        return false;
      },
    },
    // disabled 제어
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isListShow: true,
      recipientType: '1',
      recptTemplateLiteral: '', // 사용자가 설정한 template literal 포맷을 user obj 값을 받아들일 수 있는 것으로 변환된 값
      headerBtnInfo: [
        {
          key: '1',
          label: this.$t('MSG_TXT_RECP'), // "수신",
          btnOnClass: 'emailRcpt_hBtn_on',
        },
        {
          key: '2',
          label: this.$t('MSG_TXT_REF'), // "참조",
          btnOnClass: 'emailRcpt_hBtn_on',
        },
        {
          key: '3',
          label: this.$t('MSG_TXT_SCRT'), // "비밀",
          btnOnClass: 'emailRcpt_hBtn_on',
        },
      ],
      bodyBtnInfo: [
        {
          key: '1',
          label: this.$t('MSG_TXT_RECP'), // "수신",
          btnOnClass: 'emailRcpt_toBtn_on',
        },
        {
          key: '2',
          label: this.$t('MSG_TXT_REF'), // "참조",
          btnOnClass: 'emailRcpt_ccBtn_on',
        },
        {
          key: '3',
          label: this.$t('MSG_TXT_SCRT'), // "비밀",
          btnOnClass: 'emailRcpt_bccBtn_on',
        },
      ],
      recipientList: [],
      toCnt: 0,
      ccCnt: 0,
      bccCnt: 0,

    };
  },
  computed: {
    recipientAllCnt() {
      return this.recipientList.length;
    },
  },
  watch: {
    recipientList: {
      handler(n, o) {
        this.countRecipientTypes();
      },
      deep: true,
    },
  },
  mounted() {
    this.setRecptDispTemplate();
  },
  methods: {
    /**
     * 사용자가 입력한 실제 데이터에 사용자의 template literal을 적용한 결과를 반환
     * @function getRecptDispStrng
     * @param {Object}: 전자메일 목록에 표시 할 사용자정보를 담고 있는 json object
     * @returns {String}: 사용자 정보 object 에서 목록에 표시할 포멧에 맞는 값을 찾아서 문자열로 연결해서 반환
     */
    getRecptDispStrng(recptObj) {
      // return (eval("`" + this.recptTemplateLiteral + "`")).replace("undefined","");
      _.templateSettings.interpolate = /\${([\s\S]+?)}/g;
      const compiled = _.template(`${this.recptTemplateLiteral}`);
      return compiled(recptObj);
    },
    /**
     * 사용자 template literal 을 받아서 각 placeHolder 명을 사용자정보 추가평션의 parameter명이 붙은 것으로 변경
     * 여기서는 getRecptDispStrng( recptObj) 의 매개변수 recptObj 를 각 placeHolder에 붙임
     * ex) "${userName}" -> "${recptObj.userName}"
     * @function setRecptDispTemplate
     * @returns {none}
     */
    setRecptDispTemplate() {
      const re = /\$\{\s*(\w+)\s*\}/g;
      // this.recptTemplateLiteral  = this.recptDispFormat.replace(re,"${recptObj.$1}");
      // eslint-disable-next-line quotes
      this.recptTemplateLiteral = this.recptDispFormat.replace(re, `\${$1}`);
    },
    /**
     * 이메일 수신자 정보를 수신목록에 추가
     * @function addRecipient
     * @returns {none}
     */
    addRecipient(recInfo) {
      const _recInfo = utils.cloneDeep(recInfo);

      if (!utils.isEmpty(utils.find(this.recipientList, { email: _recInfo.email }))) {
        utils.messageBox('alert', this.$t('MSG_BTN_CFRM'), this.$t('MSG_ALT_IMG_RGST_ID'));
        return false;
      }

      this.recipientList.push(_recInfo);
      const _lastRecipient = utils.last(this.recipientList);
      if ([1, 2, 3, '1', '2', '3'].indexOf(_lastRecipient.recipientType) === -1) {
        _lastRecipient.recipientType = this.recipientType;
      }
      _lastRecipient.recipient = this.getRecptDispStrng(_recInfo);
      _lastRecipient.email = _recInfo.email;
      _lastRecipient.selected = false;
      _lastRecipient.id = `id_${Math.round(Math.random() * 1000)}_${Math.round(Math.random() * 1000)}`;
    },
    /**
     * 선택한 수신자들의 수신종류 변경
     * @function changeRecipientType
     * @returns {none}
     */
    changeRecipientType() {
      this.recipientList.forEach(itm => {
        if (itm.selected) {
          itm.recipientType = this.recipientType;
        }
      });
      this.countRecipientTypes();
    },
    /**
     * 메일 수신자 목록에서 "수신/참조/비밀참조" 버튼 클릭 event handler
     * @function onClickRecipientType
     * @returns {none}
     */
    onClickRecipientType(recipient) {
      this.countRecipientTypes();
      this.$forceUpdate();
    },
    /**
     * 수신자 목록에서 수신, 참조, 비밀참조 숫자를 각각 계산하여 반환
     * @function countRecipientTypes
     * @returns {Array}
     */
    countRecipientTypes() {
      this.toCnt = 0;
      this.ccCnt = 0;
      this.bccCnt = 0;
      this.recipientList.forEach(itm => {
        switch (itm.recipientType) {
          case '1':
            this.toCnt++;
            break;
          case '2':
            this.ccCnt++;
            break;
          case '3':
            this.bccCnt++;
            break;
        }
      });
    },

    // TODO: 아래 method안의 loop와 로직은 기계적인 코딩 - 필히 수정해야 함
    onClickRecipient(event, id) {
      // TODO:
      this.$forceUpdate();

      if ((event.shiftKey && event.ctrlKey) || event.ctrlKey) {
        this.recipientList.forEach(itm => {
          if (itm.id == id) {
            itm.selected = !itm.selected;
          }
        });
      } else if (event.shiftKey) {
        let _beginIndex = 0;
        for (let i = 0; i < this.recipientList.length; i++) {
          if (this.recipientList[i].id == id) {
            _beginIndex = i;
            break;
          }
        }
        let _endIndex = -1;
        for (let i = 0; i < _beginIndex; i++) {
          if (this.recipientList[i].selected) {
            _endIndex = i;
          }
        }
        if (_endIndex == -1) {
          for (let i = _beginIndex + 1; i < this.recipientList.length; i++) {
            if (this.recipientList[i].selected) {
              _endIndex = i;
              break;
            }
          }
        }
        if (_endIndex == -1) {
          this.recipientList[_beginIndex].selected = true;
        } else {
          this.recipientList.forEach(itm => {
            itm.selected = false;
          });
          for (let i = 0; i <= Math.abs(_beginIndex - _endIndex); i++) {
            this.recipientList[Math.min(_beginIndex, _endIndex) + i].selected = true;
          }
        }
      } else {
        this.recipientList.forEach(itm => {
          if (itm.id == id) {
            itm.selected = true;
          } else {
            itm.selected = false;
          }
        });
      }
    },
    moveTop() {
      const _selectedIndices = [];
      this.recipientList.forEach((itm, index) => {
        if (itm.selected) {
          _selectedIndices.push(index);
        }
      });
      const _removedRows = utils.pullAt(this.recipientList, _selectedIndices);
      for (let i = _removedRows.length - 1; i >= 0; i--) {
        this.recipientList.unshift(_removedRows[i]);
      }
    },
    moveUp() {
      const _selectedIds = [];
      this.recipientList.forEach((itm, index) => {
        if (itm.selected) {
          _selectedIds.push(itm.id);
        }
      });

      // 첫번째 row의 이동이 성공하면 나머지 이동
      if (this.moveUpSingle(_selectedIds[0])) {
        for (let i = 1; i < _selectedIds.length; i++) {
          this.moveUpSingle(_selectedIds[i]);
        }
      }
    },
    moveDown() {
      const _selectedIds = [];
      this.recipientList.forEach((itm, index) => {
        if (itm.selected) {
          _selectedIds.push(itm.id);
        }
      });
      // 첫번째 row의 이동이 성공하면 나머지 이동
      if (this.moveDownSingle(_selectedIds[_selectedIds.length - 1])) {
        for (let i = _selectedIds.length - 2; i >= 0; i--) {
          this.moveDownSingle(_selectedIds[i]);
        }
      }
    },
    moveUpSingle(id) {
      let _selectedIndex = 0;
      for (let i = 0; i < this.recipientList.length; i++) {
        if (id == this.recipientList[i].id) {
          _selectedIndex = i;
          break;
        }
      }
      if (_selectedIndex == 0) {
        return false;
      }

      const _removedRow = utils.pullAt(this.recipientList, _selectedIndex);
      this.recipientList.splice(_selectedIndex - 1, 0, _removedRow[0]);
      return true;
    },
    moveDownSingle(id) {
      let _selectedIndex = 0;
      for (let i = 0; i < this.recipientList.length; i++) {
        if (id == this.recipientList[i].id) {
          _selectedIndex = i;
          break;
        }
      }
      if (_selectedIndex == this.recipientList.length - 1) {
        return false;
      }

      const _removedRow = utils.pullAt(this.recipientList, _selectedIndex);
      this.recipientList.splice(_selectedIndex + 1, 0, _removedRow[0]);
      return true;
    },
    moveBottom() {
      const _selectedIndices = [];
      this.recipientList.forEach((itm, index) => {
        if (itm.selected) {
          _selectedIndices.push(index);
        }
      });
      const _removedRows = utils.pullAt(this.recipientList, _selectedIndices);
      for (let i = 0; i < _removedRows.length; i++) {
        this.recipientList.push(_removedRows[i]);
      }
    },
    deleteSelection() {
      for (let i = this.recipientList.length - 1; i >= 0; i--) {
        if (this.recipientList[i].selected) {
          if (utils.isEqual(this.recipientList[i].disFlag, 'true') === false) {
            this.recipientList.splice(i, 1);
          }
        }
      }
    },
    deleteOne(id) {
      for (let i = this.recipientList.length - 1; i >= 0; i--) {
        if (this.recipientList[i].id == id) {
          if (utils.isEqual(this.recipientList[i].disFlag, 'true') === false) {
            this.recipientList.splice(i, 1);
            break;
          }
        }
      }
    },
    /**
     * 현재 메일 수신자 목록 정보를 반환
     * @function getRecptList
     * @returns {Array}: object array
     */
    getRecptList() {
      return utils.cloneDeep(this.recipientList);
    },
  },
};
</script>

<style lang="css" scoped>
.tempClass {background-color:#e9ecf7}

.disable-select {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none;   /* Chrome/Safari/Opera */
    -khtml-user-select: none;    /* Konqueror */
    -moz-user-select: none;      /* Firefox */
    -ms-user-select: none;       /* Internet Explorer/Edge */
    user-select: none;           /* Non-prefixed version, currently supported by any browser but < IE9 */
}
.receiver_list_wrap .list_control {padding-left:13px !important
}
</style>
