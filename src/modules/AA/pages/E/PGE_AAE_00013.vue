<template>
  <div class="dp_flex">
    <sui-text-field
      ref="localTxtFld"
      v-model="localMsgVal"
      :placeholder="$t('국문')"
      :disabled="disabled"
      :clearable="true"
      :readonly="readonly"
      :trim="true"
      :maxlength="1000"
      @keyup="onKeyUpInput(localMsgVal)"
    />
    <div class="comp_spacing" />
    <sui-text-field
      
      ref="globalTxtFld"
      v-model="globalMsgVal"
      :maxlength="1000"
      :placeholder="$t('영문')"
      :disabled="disabled"
      :clearable="true"
      :readonly="readonly"
      :trim="true"
      @blur="onBlurGlobalTxtFld"
      @keyup="onKeyUpInputEng(globalMsgVal)"
    />
    <!--
    <div class="comp_spacing" />
    <sui-text-field
      ref="chineseChsTxtFld"
      v-model="chineseChsMsgVal"
      :placeholder="$t('중문(간체)')"
      :disabled="disabled"
      :clearable="true"
      :readonly="readonly"
      :trim="true"
      :maxlength="1000"
    />
    <div class="comp_spacing" />
    <sui-text-field
      
      ref="chineseChtTxtFld"
      v-model="chineseChtMsgVal"
      :maxlength="1000"
      :placeholder="$t('중문(번체)')"
      :disabled="disabled"
      :clearable="true"
      :readonly="readonly"
      :trim="true"
      @blur="onBlurGlobalTxtFld"
    />
    -->
    <div class="comp_spacing" />
    <sui-button
      v-if="mlngDtlList.length > 1"
      type="button"
      class="comm_btn_lang"
      :disabled="disabled"
      @click="_openMlngEditorPopup()"
    >
      {{ $t("MSG_TIT_MLNG_MGT") }}
    </sui-button>
  </div>
</template>

<script>

export default {
  name: 'PGE_AAE_00013',
  props: {
    // 이 컴포넌트를 사용하는 페이지ID
    pageId: {
      type: String,
      required: true,
    },
    // 다국어ID
    multiLanguageId: {
      type: String,
      required: false,
      default() {
        return '';
      },
    },
    // 배치: 가로형/세로형
    vertical: {
      type: Boolean,
      required: false,
      default: false,
    },
    // disabled
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    // readonly
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
    // multiTenancy 여부
    multiTenancy: {
      type: Boolean,
      required: false,
      default: false,
    },
    maxlength: {
      type: Number,
      required: false,
      default: 1000,
    },
  },
  data() {
    return {
      localMsgVal: '', // 로컬 입력 텍스트 필드에 보여질 내용
      globalMsgVal: '', // Global 입력 테스트 필드에 보여질 내용
      localLangId: this.$store.getters.userInfo.langId, // 로컬 langId
      globalLangId: this.$store.getters.userInfo.globalLangId, // global langId
      //chineseChsMsgVal: '',
      //chineseChtMsgVal: '',
      //chineseChsLangId: 'zs',
      //chineseChtLangId: 'zt',

      // 다국어 object array
      mlngDtlList: [],
      // 신규
    };
  },
  watch: {
    // 로컬 메시지 값 변경 -> 모델 데이터 해당 값에 update
    localMsgVal(val) {
      for (let i = 0; i < this.mlngDtlList.length; i += 1) {
        if (this.mlngDtlList[i].langId === this.localLangId) {
          this.mlngDtlList[i].multiLanguageContent = val;
          break;
        }
      }
    },
    // 글로벌 메시지 값 변경 -> 모델 데이터 해당 값에 update
    globalMsgVal(val) {
      for (let i = 0; i < this.mlngDtlList.length; i += 1) {
        if (this.mlngDtlList[i].langId === this.globalLangId) {
          this.mlngDtlList[i].multiLanguageContent = val;
          break;
        }
      }
    },
     // 글로벌 메시지 값 변경 -> 모델 데이터 해당 값에 update
    /*
    chineseChsMsgVal(val) {
      for (let i = 0; i < this.mlngDtlList.length; i += 1) {
        if (this.mlngDtlList[i].langId === this.chineseChsLangId) {
          this.mlngDtlList[i].multiLanguageContent = val;
          break;
        }
      }
    },
     // 글로벌 메시지 값 변경 -> 모델 데이터 해당 값에 update
    chineseChtMsgVal(val) {      
      for (let i = 0; i < this.mlngDtlList.length; i += 1) {
        if (this.mlngDtlList[i].langId === this.chineseChtLangId) {
          this.mlngDtlList[i].multiLanguageContent = val;
          break;
        }
      }
    },
    */
    multiLanguageId(val) {
      this._setMlngDataById(val);
    },
  },
  mounted() {
    this.reset();
  },
  created() {
  },
  methods: {
    /**
     * 바인딩된 데이터를 clear하고 다국어 기본 조회 실행
     * 이 컴포넌트를 사용하는 화면에 reset 기능을 제공하기 위한 용도이기 때문에 조회서비스까지 포함됨
     * @function reset
     * @returns {None}
     */
    reset() {
      this._clearData();
      // 다국어 기본 데이터 조회
      this._getMlngMstData().then(mlngDtlList => {
        this._setMlngDataById(this.multiLanguageId);
      }).catch(err => {

      });
    },
    setLocalLangValue(val) {
      this.localMsgVal = val;
    },
    setGlobalLangValue(val) {
      this.globalMsgVal = val;
      // 값이 없는 언어에 global 언어값 쓰기
      this.onClickBkApplyBtn();
    },
    /**
     * 내부적인 reset 용도
     * @function _clearData
     * @returns {None}
     */
    _clearData() {
      this.mlngDtlList = [];
      this.localMsgVal = '';
      this.globalMsgVal = '';
      this.localLangId = this.$store.getters.userInfo.langId; // 로컬 langId
      this.globalLangId = this.$store.getters.userInfo.globalLangId; // global langId
      //this.chineseChsLangId = 'zs'; // 중국어 간체
      //this.chineseChtLangId = 'zt'; // 중국어 번체
    },
    /**
     * 다국어 입력 팝업 호출
     * @function _openMlngEditorPopup
     * @returns {None}
     */
    _openMlngEditorPopup() {
      if (!this.localLangId || utils.isEmpty(this.localLangId)) {
        utils.messageBox('information', this.$t('MSG_ALT_NO_LOCAL_LNG'));
      } else {
        utils.openLayerPopup('PGE_AAE_00014', this.mlngPopupConfirmed, {
          pageInitialData: {
            localLangId: this.localLangId,
            globalLangId: this.globalLangId,
            mlngMsg: this.mlngDtlList,
            disabled: this.disabled,
            readonly: this.readonly,
          },
          title: this.$t('MSG_TIT_MLNG_MGT'),
        });
      }
    },
    /**
     * global textField blur event handler
     * global 언어값이 바뀔 때 값이 없는 언어에 global 언어값 쓰기
     * @function onBlurGlobalTxtFld
     * @param {None}
     * @returns {None}
     */
    onBlurGlobalTxtFld() {
      // 값이 없는 언어에 global 언어값 쓰기
      this.onClickBkApplyBtn();
    },
    /**
     * 일괄적용버튼 click event handler
     * 다국어 값들 중 비어있는 값과 약어에 현재 Global 언어로 셋팅된 값을 일괄 복사
     * local 언어로 설정된 값은 복사대상이 아님
     * @function onClickBkApplyBtn
     * @param {None}
     * @returns {None}
     */
    onClickBkApplyBtn() {
      // Global 언어 가져오기
      if (!this.globalLangId || !utils.find(this.mlngDtlList, { langId: this.globalLangId })) {
        utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), this.$t('MSG_ALT_NOT_EXIST_GLOBAL_LNG_INFO'));
        return false;
      }
      const globalLang = utils.find(this.mlngDtlList, { langId: this.globalLangId });
      utils.forEach(this.mlngDtlList, itm => {
        // 다국어 값이 비어있을 경우 global 약어 값으로 채움
        if (utils.isEmpty(itm.multiLanguageContent)) {
          itm.multiLanguageContent = globalLang.multiLanguageContent;
        }
        // 다국어 약어 값이 비어있을 경우 global 언어 약어 값으로 채움
        if(utils.isEmpty(itm.multiLanguageAbbreviationContent)) {
          itm.multiLanguageAbbreviationContent = globalLang.multiLanguageAbbreviationContent;
        }
      });
      this.getMlngEditingInfoFillEmptyWithGlobal();

      return true;
    },
    /**
     * 다국어 입력 팝업 callback
     * mlng-updated 이벤트 발생(변경유무 관련없이 창만 닫으면 발생)
     * @function mlngPopupConfirmed
     * @param {Array}
     * @returns {Object}
     */
    mlngPopupConfirmed(arrMlng) {
      if (!utils.isEmpty(arrMlng)) {
        this.mlngDtlList = arrMlng;
        // 입력 textField 에 표시되는 local, global 값 갱신
        this._updateInputBoxVals();
      }
      this.$emit('mlng-updated', utils.cloneDeep(this.mlngDtlList));
    },

    /**
     * 다국어 마스터 정보 가져와서 기존 배열에 덮어씌우기
     * @function _getMlngMstData
     * @returns {Promise}
     */
    _getMlngMstData() {
      const that = this;
      return new Promise((resolve, reject) => {
        http.request(that.pageId, 'DTS_CMZ_00039', {
        }).then(res => {
          that.mlngDtlList = [];

          utils.forEach(res.data, itm => {
            that.mlngDtlList.push({
              multiLanguageId: '',
              langId: itm.langId,
              langName: itm.langName,
              multiLanguageContent: '',
              multiLanguageAbbreviationContent: '',
              multiLanguageTypeCode: '',
            });
          });

          if (that.mlngDtlList.length === 0) {
            // TODO: 
            // utils.messsagBox('warning', that.$t(''), that.$t(''));
          }
          //else if (that.mlngDtlList.length === 0) {

          //}
          /*
          res.data.forEach(itm => {
            that.mlngDtlList.push({
              multiLanguageId: '',
              langId: itm.langId,
              langName: itm.langName,
              multiLanguageContent: '',
              multiLanguageAbbreviationContent: '',
              multiLanguageTypeCode: '',
            });
          });
          */

          // 입력 textField 에 표시되는 local, global 값 갱신
          that._updateInputBoxVals();
        
          resolve(that.mlngDtlList);
        }).catch(err => {
          console.log(err);
          reject(err);
        });
      });
    },
    /**
     * 입력된 다국어ID에 해당하는 다국어 데이터 조회
     * @function getMlngDataById
     * @param {String} mlngId : 다국어ID
     * @returns {Promise}
     */
    getMlngDataById(mlngId) {
      const that = this;
      return new Promise((resolve, reject) => {
        http.request(that.pageId, 'DTS_CMZ_00023', {
          path: {
            'multi-languages-id': mlngId,
          },
          query: {
            tenantId: this.multiTenancy ? utils.getConfigurationValue('YML_TENANT_ID_DEFAULT') : '',
          },
        }).then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
      });
    },
    /**
     * 다국어ID 로 관련 데이터를 조회한 후 기존 다국어 정보 배열에 해당 값만 덮어 씌운다.
     * @function _setMlngDataById
     * @param {String} mlngId : 다국어ID
     * @returns {Promise}
     */
    _setMlngDataById(mlngId) {
      // 기존 다국어 배열 초기화
      // 조회 결과가 언어 갯수만큼 row를 가져오지 못할 경우를 고려하여 배열을 delete 하지 않음
      this.mlngDtlList.forEach(itm => {
        itm.multiLanguageId = '';
        itm.multiLanguageContent = '';
        itm.multiLanguageAbbreviationContent = '';
        itm.multiLanguageTypeCode = '';
      });
      // 입력 textField 에 표시되는 local, global 값 갱신
      this._updateInputBoxVals();

      if (!utils.isEmpty(mlngId)) {
        this.getMlngDataById(mlngId).then(res => {
          // 새로 가져온 다국어 값만 다시 쓰기
          // 조회 결과가 모든 언어 갯수만큼 row를 가져오지 못할 경우 고려
          res.data.forEach(itm => {
            for (let i = 0; i < this.mlngDtlList.length; i += 1) {
              this.mlngDtlList[i].multiLanguageId = mlngId;
              this.mlngDtlList[i].multiLanguageTypeCode = itm.multiLanguageTypeCode;

              if (this.mlngDtlList[i].langId === itm.langId) {
                this.mlngDtlList[i].multiLanguageContent = itm.multiLanguageContent;
                this.mlngDtlList[i].multiLanguageAbbreviationContent = itm.multiLanguageAbbreviationContent;
              }
            }
          });

          // 조회시 global 값이 없을 경우 local 값으로 보여주도록 수정
          if (this.globalLangId && utils.find(this.mlngDtlList, { langId: this.globalLangId })) {
            const globalLang = utils.find(this.mlngDtlList, { langId: this.globalLangId });
            const localLang = utils.find(this.mlngDtlList, { langId: this.localLangId });
            if (utils.isEmpty(globalLang.multiLanguageContent)) {
              globalLang.multiLanguageContent = localLang.multiLanguageContent;
              // 값이 없는 언어에 global 언어값 쓰기
              this.onClickBkApplyBtn();
            }
          }

          // 입력 textField 에 표시되는 local, global 값 갱신
          this._updateInputBoxVals();
        }).catch(err => {
          console.log(err);
        });
      }
    },
    /**
     * TODO: 삭제?
     * 입력된 다국어ID에 해당하는 다국어 데이터 조회
     * @function searchMlngDataById
     * @param {String} mlngId : 다국어ID
     * @returns {Promise}
     */
    searchMlngDataById(mlngId) {
      utils.messageBox('error', '삭제요청', 'searchMlngDataById 메소드를 호출해서 컴포넌트에 반영하는 부분은 삭제하시고 컴포넌트의 prop으로 바인딩해주시기 바랍니다.');
      // return;

      // const that = this;
      // return new Promise((resolve, reject) => {
      //   http.request(that.pageId, 'DTS_CMZ_00023', {
      //     path: {
      //       'multi-languages-id': mlngId,
      //     },
      //   }).then(res => {
      //     // 기존 다국어 배열 초기화
      //     // 조회 결과가 언어 갯수만큼 row를 가져오지 못할 경우를 고려하여 배열을 delete 하지 않음
      //     that.mlngDtlList.forEach(itm => {
      //       itm.multiLanguageId = '';
      //       itm.multiLanguageContent = '';
      //       itm.multiLanguageAbbreviationContent = '';
      //       itm.multiLanguageTypeCode = '';
      //     });

      //     // 새로 가져온 다국어 값만 다시 쓰기
      //     // 조회 결과가 모든 언어 갯수만큼 row를 가져오지 못할 경우 고려
      //     res.data.forEach(itm => {
      //       for (let i = 0; i < that.mlngDtlList.length; i++) {
      //         that.mlngDtlList[i].multiLanguageId = mlngId;
      //         that.mlngDtlList[i].multiLanguageTypeCode = itm.multiLanguageTypeCode;

      //         if (that.mlngDtlList[i].langId == itm.langId) {
      //           that.mlngDtlList[i].multiLanguageContent = itm.multiLanguageContent;
      //           that.mlngDtlList[i].multiLanguageAbbreviationContent = itm.multiLanguageAbbreviationContent;
      //         }
      //       }
      //     });

      //     // 입력 textField 에 표시되는 local, global 값 갱신
      //     that._updateInputBoxVals();

      //     resolve(that.mlngDtlList);
      //   }).catch(err => {
      //     console.log(err);
      //     reject(err);
      //   });
      // });
    },

    /**
     * 입력 textField 에 표시되는 local, global 값 갱신
     * @function _updateInputBoxVals
     * @returns {None}
     */
    _updateInputBoxVals() {
      for (let i = 0; i < this.mlngDtlList.length; i += 1) {
        // local 다국어 메시지 값
        if (this.mlngDtlList[i].langId === this.localLangId) {
          this.localMsgVal = this.mlngDtlList[i].multiLanguageContent;
        }

        // global 다국어 메시지 값
        if (this.mlngDtlList[i].langId === this.globalLangId) {
          this.globalMsgVal = this.mlngDtlList[i].multiLanguageContent;
        }
        /*
        if (this.mlngDtlList[i].langId === this.chineseChsLangId) {
          this.chineseChsMsgVal = this.mlngDtlList[i].multiLanguageContent;
        }

        if (this.mlngDtlList[i].langId === this.chineseChtLangId) {
          this.chineseChtMsgVal = this.mlngDtlList[i].multiLanguageContent;
        }
        */
      }
      this.$emit('getdata', utils.cloneDeep(this.mlngDtlList));
    },

    /**
     * 현재 편집중인 다국어 Object Array를 반환한다.
     * @function getMlngEditingInfo
     * @param {String}: 다국어ID
     * @returns {Array} : 현재 편집중인 다국어 Object Array를 반환한다.
     */
    getMlngEditingInfo(mlngId) {
      const _mlngDtlList = utils.cloneDeep(this.mlngDtlList);

      if (!utils.isEmpty(mlngId)) {
        if (!utils.isEmpty(_mlngDtlList[0].multiLanguageId) && mlngId != _mlngDtlList[0].multiLanguageId) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_OBJ_EXIST'), _mlngDtlList[0].multiLanguageId));
          return false;
        }

        // 다국어ID 파라미터 값이 존재하면 해당 값으로
        _mlngDtlList.forEach(itm => {
          itm.multiLanguageId = mlngId;
        });
      }

      return _mlngDtlList;
    },
    /**
     * 현재 편집중인 다국어 Object Array를 반환하는데 빈 값은
     * global 언어의 대응되는 값으로 채워서 반환한다.
     * 다국어ID 파라미터 값이 존재하면 해당 배열의 다국어 ID 값을 해당 값으로 채운다.
     * @function getMlngEditingInfoFillEmptyWithGlobal
     * @param {String}: 다국어ID
     * @returns {Array}: 다국어 Object Array를 반환
     */
    getMlngEditingInfoFillEmptyWithGlobal(mlngId) {
      const _mlngDtlList = utils.cloneDeep(this.mlngDtlList);
      let _globalObj = {};
      if (this.globalLangId && utils.find(this.mlngDtlList, { langId: this.globalLangId })) {
        _globalObj = utils.find(_mlngDtlList, { langId: this.globalLangId });
      }

      if (!utils.isEmpty(mlngId)) {
        if (!utils.isEmpty(_mlngDtlList[0].multiLanguageId) && mlngId != _mlngDtlList[0].multiLanguageId) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_OBJ_EXIST'), _mlngDtlList[0].multiLanguageId));
          return false;
        }

        // 다국어ID 파라미터 값이 존재하면 해당 값으로
        _mlngDtlList.forEach(itm => {
          itm.multiLanguageId = mlngId;
        });
      }

      _mlngDtlList.forEach(itm => {
        if (utils.isEmpty(itm.multiLanguageContent)) {
          itm.multiLanguageContent = _globalObj.multiLanguageContent;
        }
        if (utils.isEmpty(itm.multiLanguageAbbreviationContent)) {
          itm.multiLanguageAbbreviationContent = _globalObj.multiLanguageAbbreviationContent;
        }
      });
      this.$emit('getdata', utils.cloneDeep(_mlngDtlList));

      return _mlngDtlList;
    },
    getMlngEditingInfoFillEmptyWithString(mlngContent) {
      const _mlngDtlList = utils.cloneDeep(this.mlngDtlList);

      _mlngDtlList.forEach(itm => {
        if (utils.isEmpty(itm.multiLanguageContent)) {
          itm.multiLanguageContent = mlngContent;
        }
        if (utils.isEmpty(itm.multiLanguageAbbreviationContent)) {
          itm.multiLanguageAbbreviationContent = mlngContent;
        }
      });
      return _mlngDtlList;
    },
    /**
     * set focus to local langauge text field
     * @function setFocusLocalTxtFld
     * @returns {none}
     */
    setFocusLocalTxtFld() {
      this.$refs.localTxtFld.setFocus();
    },
    /**
     * set focus to global langauge text field
     * @function setFocusGlobalTxtFld
     * @returns {none}
     */
    setFocusGlobalTxtFld() {
      if (!this.globalLangId || !utils.find(this.mlngDtlList, { langId: this.globalLangId })) {
        utils.messageBox('warning', this.$t('MSG_BTN_CFRM'), this.$t('MSG_ALT_NOT_EXIST_GLOBAL_LNG_INFO'));
        return false;
      }
      this.$refs.globalTxtFld.setFocus();
      return true;
    },
    getLocalLangValue() {
      return this.$refs.localTxtFld.value;
    },
    getGlobalLangValue() {
      return this.$refs.globalTxtFld ? this.$refs.globalTxtFld.value : '';
    },

    onKeyUpInput(v) {
      const searchFieldNewText = v;

      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          utils.messageBox('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.localMsgVal = ''
        } 
      }
    },

    onKeyUpInputEng(v) {
      const searchFieldNewText = v;

      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          utils.messageBox('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.globalMsgVal = ''
        } 
      }
    },

  },
};
</script>

<style scoped>
</style>
