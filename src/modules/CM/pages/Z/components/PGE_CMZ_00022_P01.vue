<template>
  <div>
    <div class="comm_popup_wrap_xlarge">
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TYPE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="noticeTypeCode"
              :selected="noticeData.selectedCodeValue.noticeTypeCode"
              :pageId="pageId"
              codeId="COD_NTC_TYPE"
              @list-clicked="onTypeSelect"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_POPU_SHPE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="noticePopupShapeCode"
              :selected="noticeData.selectedCodeValue.noticePopupShapeCode"
              :pageId="pageId"
              codeId="COD_NTC_POPU_SHPE"
              :disabled="popupShapeDisabled"
              @list-clicked="onPopupShapeSelect"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_POPU_FREQ')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="noticePopupTypeCode"
              :selected="noticeData.selectedCodeValue.noticePopupTypeCode"
              :pageId="pageId"
              codeId="COD_NTC_POPU_TYPE"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_LCT')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="noticePopupLocationCode"
              :selected="noticeData.selectedCodeValue.noticePopupLocationCode"
              :pageId="pageId"
              codeId="COD_NTC_POPU_LCT"
              :disabled="locationDisabled"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_PRD')"
              :vertical="false"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <!-- <sui-range-date-picker
              ref="dp"
              v-model="rangeDate"
              sticky
              @confirm="onRangeConfirm"
            /> -->
            <ur-range-picker
              ref="dp"
              v-model="rangeDateValue"
              value="rangeDateValue"
              strictRange
              oneInputMode
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SIZE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="noticePopupSizeCode"
              :selected="noticeData.selectedCodeValue.noticePopupSizeCode"
              :pageId="pageId"
              codeId="COD_NTC_POPU_SIZE"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_PORTL')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-custom-select
              ref="portalSelect"
              :selected="fromPsYn?psInitPortal:noticeData.selectedCodeValue.portalId"
              :option-list="portalList"
              :disabled="fromPsYn"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_APPY_TYPE')"
              :vertical="false"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="noticeApplyTypeCode"
              :selected="noticeData.selectedCodeValue.noticeApplyTypeCode"
              :pageId="pageId"
              codeId="COD_NTC_APPY_TYPE"
              style="width: (selectPage?30%:100%);"
              @list-clicked="onApplyTypeSelect"
            />
            <div class="comp_spacing" />
            <div
              v-show="selectPage"
              class="comm_scrInput_wrap"
            >
              <div>
                <sui-text-field
                  ref="noticeApplyPageId"
                  :value="applyPageString"
                  :placeholder="pagePlaceholder"
                  style="width:100%;"
                  readonly
                  maxlength="100"
                />
              </div>
              <sui-button
                v-permission:read="pageId"
                type="button"
                class="comm_btn_InputScr"
                @click="onPageSelectClick"
              />
            </div>
            <div
              v-show="selectDirect"
              class="comm_scrInput_wrap"
            >
              <sui-text-field
                ref="noticeNickName"
                v-model.trim="nickName"
                maxlength="100"
                style="width: 100%;"
              />
              <sui-button
                v-permission:read="pageId"
                type="button"
                class="comm_btn_duplicate"
                :disabled="duplicateDisabled"
                @click="onDuplicateCheckClick"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TITLE')"
              :vertical="false"
              :required="true"
            />
          </div>
          <div class="col-xs-11">
            <sui-text-field
              ref="noticeTitle"
              v-model.trim="noticeData.noticeTitle"
              maxlength="100"
              :disabled="false"
              :readonly="false"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_CNTN')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <sui-web-editor
              ref="tuiEditor"
              v-model.trim="noticeData.noticeContent"
              :initialValue="content"
              :height="250"
              @loaded="editorCreated"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="comm_btn_wrap mrR30">
      <sui-button
        v-permission:read="pageId"
        type="button"
        class="comm_btn_border"
        @click="onCancelClick"
      >
        {{ $t('MSG_BTN_CANCEL') }}
      </sui-button>
      <sui-button
        v-permission:create="pageId"
        type="button"
        class="comm_btn_solid"
        @click="onSaveClick"
      >
        {{ $t('MSG_BTN_SAVE') }}
      </sui-button>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00022_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: '',
    },
    noticeUid: {
      type: String,
      default: '',
    },
    psInitPortal: {
      type: Object,
      default() {
        return {};
      }
    },
    fromPsYn: {
      type: Boolean,
      default: false,      
    }    
  },
  data() {
    return {
      rangeDateValue: [utils.now('YYYY-MM-DD'), utils.now('YYYY-MM-DD')],
      noticeData: {
        selectedCodeValue: {
          portalId: {
            key: '',
            value: '',
          },
          noticeTypeCode: {
            key: '',
            label: '',
          },
          noticePopupTypeCode: {
            key: '',
            label: '',
          },
          noticePopupLocationCode: {
            key: '',
            label: '',
          },
          noticePopupSizeCode: {
            key: '',
            label: '',
          },
          noticePopupShapeCode: {
            key: '',
            label: '',
          },
          noticeApplyTypeCode: {
            key: '',
            label: '',
          },
        },
        noticeUid: '',
        noticeApplyPageId: '',
        noticeApplyPageName: '',
        noticeStartDTM: '',
        noticeFinishDTM: '',
        noticeTitle: '',
        noticeContent: '',
        noticeNickName: '',
        originalFinalModificationDTM: '',
      },
      rangeDate: {
        from: '',
        to: '',
      },
      userDateFormat: this.$store.getters.userInfo.dateFormat,
      noticeRangeDate: '',
      pagePlaceholder: utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE')),
      popupShapeDisabled: false,
      locationDisabled: true,
      selectPage: false,
      selectDirect: false,
      nickName: '',
      originalNickName: '',
      content: '',
      temp: {},
      portalList: [],
    };
  },
  computed: {
    modMode() {
      return !utils.isEmpty(this.noticeUid);
    },
    applyPageString() {
      const pageId = utils.trim(this.noticeData.noticeApplyPageId);
      const pageName = utils.trim(this.noticeData.noticeApplyPageName);
      return (utils.isEqual(this.applyType, 'P') && !utils.isEmpty(pageId)) ? `${pageId} (${pageName})` : '';
    },
    applyType() {
      return this.noticeData.selectedCodeValue.noticeApplyTypeCode.key;
    },
    duplicateDisabled() {
      return !utils.isEmpty(this.nickName) && utils.isEqual(this.nickName, this.noticeData.noticeNickName);
    },
    editorMount() {
      return utils.isEmpty(this.noticeUid) || !utils.isEmpty(this.content);
    },
  },
  watch: {
    nickName(data) {
      if (utils.isEqual(data, this.originalNickName)) {
        this.noticeData.noticeNickName = data;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.loadPortalList().then(() => {
        if (this.modMode) {
          this.noticeDataLoad();
        }
      });
    });
  },

  methods: {
    loadPortalList() {
      return new Promise((resolve, reject) => {
        http.request(this.contextPageId, 'DTS_CMP_00004', {
        }).then(res => {
          this.portalList = [];
          if (res.data.length > 0) {
            utils.forEach(res.data, obj => {
              const portalInfo = {
                key: obj.portalId,
                label: obj.portalName,
              };
              this.portalList.push(portalInfo);
            });
          }
          if (!this.modMode) {
            // eslint-disable-next-line prefer-destructuring
            this.noticeData.selectedCodeValue.portalId = this.portalList[0];
          }
          resolve();
        }).catch(error => {
          console.log(error);
          reject();
        });
      });
    },
    // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼수정 시 초기데이터 로드&세팅▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
    noticeDataLoad() {
      http.request(this.pageId, 'DTS_CMZ_00089', {
        path: {
          'notice-uid': this.noticeUid,
        },
      }).then(res => {
        this.setNoticeData(res.data);
        this.setSelectBox(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    setNoticeData(data) {
      utils.forEach(this.noticeData, (value, key) => {
        if (utils.has(data, key)) {
          utils.set(this.noticeData, key, data[key]);
        }
      });
      this.setEditor(data.noticeContent);
      this.rangeDate = this.changeDate(data.noticeStartDTM, data.noticeFinishDTM);
      this.onLoadNewDate();
      this.nickName = this.noticeData.noticeNickName;
      this.originalNickName = this.noticeData.noticeNickName;
    },
    onLoadNewDate() {
      const a = this.rangeDate.from.substr(0, 11);
      const b = this.rangeDate.to.substr(0, 11);
      this.rangeDateValue = [a, b];
    },
    setSelectBox(data) {
      this.popupShapeDisabled = utils.isEqual(data.noticeTypeCode, 'A');
      this.locationDisabled = utils.isEqual(data.noticePopupShapeCode, 'L');
      utils.forEach(this.noticeData.selectedCodeValue, (value, codekey) => {
        utils.set(value, 'key', data[codekey]);
        if (utils.isEqual(codekey, 'noticeApplyTypeCode')) {
          this.onApplyTypeSelect(value);
        }
      });
    },
    editorCreated() {
      this.setEditor(this.content);
    },
    setEditor(value) {
      this.$refs.tuiEditor.setHtml(value);
    },
    onCancelClick() {
      utils.messageBox('confirm', this.$t('MSG_ALT_PRGS_CANCEL'), null, () => {
        this.$emit('onCloseClick');
      });
    },
    // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼적용유형 관련 메소드▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
    onApplyTypeSelect(event) {
      switch (event.key) {
        case 'P':
          this.selectPage = true;
          this.selectDirect = false;
          break;
        case 'D':
          this.selectPage = false;
          this.selectDirect = true;
          break;
        default:
          this.selectPage = false;
          this.selectDirect = false;
          break;
      }
    },
    onPageSelectClick() {
      utils.openLayerPopup('PGE_CMU_00004', this.onPagePopupCallback, {
        pageInitialData: { multiSelect: false },
        size: 'lg',
      });
    },
    onPagePopupCallback(pageList) {
      if (!utils.isEmpty(pageList)) {
        const [page] = pageList;
        this.noticeData.noticeApplyPageId = page.pageId;
        this.noticeData.noticeApplyPageName = page.pageName;
      }
    },
    onDuplicateCheckClick() {
      if (utils.isEmpty(this.nickName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_NTC_NNM')));
      } else {
        this.duplicateCheckAction(this.nickName).then(res => {
          if (res.data > 0) {
            utils.messageBox('warning', this.$t('MSG_ALT_DUPLICATE_EXISTS'));
          } else {
            const msg = utils.strFormat(this.$t('MSG_ALT_USE_PSBL'), this.$t('MSG_TXT_NTC_NNM'));
            utils.messageBox('success', msg, null, () => {
              this.noticeData.noticeNickName = this.nickName;
            });
          }
        });
      }
    },
    duplicateCheckAction(noticeNickName) {
      return new Promise((resolve, reject) => {
        http.request(this.pageId, 'DTS_CMZ_00140', {
          query: { noticeNickName },
        }).then(res => {
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼기간설정 관련 메소드▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
    changeDate(start, finish) {
      const from = utils.toStringByFormat(utils.toDate(start), 'YYYY-MM-DD');
      const to = utils.toStringByFormat(utils.toDate(finish), 'YYYY-MM-DD');
      this.noticeRangeDate = `${from} ~ ${to}`;
      return { from, to };
    },
    onRangeConfirm() {
      const value = {
        from: this.rangeDateValue[0],
        to: this.rangeDateValue[1],
      };
      utils.assign(this.noticeData.rangeDate, value);
      this.noticeData.noticeStartDTM = utils.isEmpty(value) ? '' : utils.dateformatToServer(value.from);
      const finish = utils.isEmpty(value) ? '' : utils.dateformatToServer(value.to, 'S');
      this.noticeData.noticeFinishDTM = finish.concat('235959');
    },
    onTypeSelect(selected) {
      // N 공지 A 동의서 -> A 선택 시 팝업모양을 레이어팝업으로 위치를 센터로
      if (utils.isEqual(selected.key, 'A')) {
        this.$refs.noticePopupShapeCode.select('L');
        this.$refs.noticePopupLocationCode.select('C');
        this.popupShapeDisabled = true;
        this.locationDisabled = true;
      } else {
        this.$refs.noticePopupShapeCode.select('L');
        this.$refs.noticePopupLocationCode.select('C');
        this.popupShapeDisabled = false;
        this.locationDisabled = true;
      }
    },
    onPopupShapeSelect(selected) {
      // L 레이어 W 윈도우 -> L 선택 시 위치를 센터로
      if (utils.isEqual(selected.key, 'L')) {
        this.$refs.noticePopupLocationCode.select('C');
        this.locationDisabled = true;
      } else {
        this.locationDisabled = false;
      }
    },
    // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼저장 관련 메소드▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
    getSaveData() {
      const data = {};
      this.noticeData.noticeContent = this.$refs.tuiEditor.getContent();
      utils.forEach(this.noticeData, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          utils.forEach(value, (codeValue, codekey) => {
            data[codekey] = codeValue.key;
          });
        } else if (utils.isEqual(key, 'noticeNickName')) {
          data[key] = utils.trim(this.nickName);
        } else {
          data[key] = utils.trim(value);
        }
      });
      return data;
    },
    onSaveClick() {
      this.onRangeConfirm();
      // date picker validation
      if (this.onClickValidate()) return;

      // editor size check
      if (this.$refs.tuiEditor.isContentSizeExcceed()) return;

      const saveData = this.getSaveData();
      const result = this.validation(saveData);
      if (result.valid) {
        if (this.modMode) {
          this.updateAction(saveData);
        } else {
          this.saveAction(saveData);
        }
      } else {
        utils.messageBox('warning', result.message, null, () => {
          if (!utils.isEmpty(result.focus)) {
            this.$refs[result.focus].setFocus();
          }
        });
      }
    },
    validation(data) {
      const result = {
        valid: true,
        message: '',
        focus: '',
      };
      utils.forEach(data, (value, key) => {
        if (utils.isEmpty(utils.trim(value))) {
          result.valid = false;
          switch (key) {
            case 'noticeTitle':
              result.message = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_TITLE'));
              result.focus = key;
              return false;
            case 'noticeContent':
              result.message = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CNTN'));
              return false;
            case 'noticeStartDTM':
              result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PRD'));
              return false;
            case 'noticeFinishDTM':
              result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PRD'));
              return false;
            case 'portalId':
              result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PORTL'));
              return false;
            case 'noticeApplyPageId':
              if (utils.isEqual(this.applyType, 'P')) {
                result.message = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE'));
                result.focus = key;
                return false;
              }
              result.message = '';
              result.valid = true;
              break;
            case 'noticeNickName':
              if (utils.isEqual(this.applyType, 'D')) {
                result.message = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_NTC_NNM'));
                result.focus = key;
                return false;
              }
              result.message = '';
              result.valid = true;
              break;
            default:
              result.valid = true;
              result.message = '';
          }
        } else if (utils.isEqual(key, 'noticeNickName')) {
          if (!this.duplicateDisabled) {
            result.valid = false;
            result.message = this.$t('MSG_ALT_SELT_DPCT_CHK');
            result.focus = key;
            return false;
          }
        }
        return true;
      });
      return result;
    },
    saveAction(saveData) {
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        http.request(this.pageId, 'DTS_CMZ_00098', {
          data: saveData,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.research);
        }).catch(error => {
          console.log(error);
        });
      });
    },
    updateAction(saveData) {
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        http.request(this.pageId, 'DTS_CMZ_00090', {
          path: {
            'notice-uid': this.noticeUid,
          },
          data: saveData,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, this.research);
        }).catch(error => {
          console.log(error);
        });
      });
    },
    research() {
      this.$emit('research');
    },
    // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲저장 관련 메소드▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
    /* 달력의 오류를 확인할 수 있는 validate 함수 */
    onClickValidate() {
      // date picker validation
      if (!this.$refs.dp.isValid()) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
        return true;
      }
      return false;
    },
  },
};
</script>
<style scoped>
</style>
