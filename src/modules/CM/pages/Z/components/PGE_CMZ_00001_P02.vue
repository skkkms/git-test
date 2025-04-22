<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CODE_ID')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <sui-text-field
              v-model="frame0.selectedCodeValue.codeId"
              :readonly="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CODE_STRT_TYPE')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <sui-text-field
              v-model="frame0.selectedCodeValue.COD_CDST_TYPE_NAME"
              :readonly="true"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CODE_NAME')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <cmp-mlng-editor
              ref="mlngEditor"
              :pageId="pageId"
              :vertical="false"
              :editable="true"
              :multiLanguageId="frame0.selectedCodeValue.codeDetailMultiLanguageId"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CODE_VALID_VAL')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <sui-text-field
              v-if="!isModification"
              v-model="frame0.selectedCodeValue.codeVld"
              clearable
              maxlength="25"
              @keyup="onKeyUpInput($event, frame0.selectedCodeValue, 'codeVld')"
            />
            <sui-text-field
              v-if="isModification"
              v-model="frame0.selectedCodeValue.codeVld"
              readonly
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_CODE_CONTENT')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <textarea
              v-model="frame0.selectedCodeValue.codeContents"
              class="width100"
              maxlength="1000"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_ARRAY_ORDER')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <sui-text-field
              v-model="frame0.selectedCodeValue.arrayalOrder"
              clearable
              mask="number"
              maxlength="5"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_DEFAULT')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <sui-radio
              v-model="frame0.selectedCodeValue.defaultYN"
              value="Y"
            >
              Yes
            </sui-radio>
            <sui-radio
              v-model="frame0.selectedCodeValue.defaultYN"
              value="N"
            >
              No
            </sui-radio>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_USE')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <sui-radio
              v-model="frame0.selectedCodeValue.codeUseYN"
              value="Y"
            >
              Yes
            </sui-radio>
            <sui-radio
              v-model="frame0.selectedCodeValue.codeUseYN"
              value="N"
            >
              No
            </sui-radio>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_VALID_START_DTM')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-4">
            <ur-date-time-picker
              ref="dpSingleStartDatetime"
              v-model="startDateTime"
              :input-type="CLIENT_DATE_TIME_FORMAT"
              :model-type="CLIENT_DATE_TIME_FORMAT"
              second
            />
          </div>
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_VALID_END_DTM')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-4">
            <ur-date-time-picker
              ref="dpSingleFinishDatetime"
              v-model="finishDateTime"
              :input-type="CLIENT_DATE_TIME_FORMAT"
              :model-type="CLIENT_DATE_TIME_FORMAT"
              second
            />
          </div>
        </div>

        <div class="row">
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_PRTS_CD_VLD_VAL')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            <sui-custom-select
              :selected="frame0.selectedCodeValue.prtsCodeVld"
              :option-list="prtsCodeIdvld"
              :disabled="frame0.selectedCodeValue.COD_CDST_TYPE === '0'"
            />
          </div>
        </div>
        <div
          v-if="isModification"
          class="row"
        >
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_MDFC_USR')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            {{ frame0.selectedCodeValue.finalModificationUserId }}
          </div>
        </div>
        <div
          v-if="isModification"
          class="row"
        >
          <div class="col-xs-2">
            <sui-input-label
              :label="$t('MSG_TXT_MDFC_DTM')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-10">
            {{ frame0.selectedCodeValue.finalModificationDTM }}
          </div>
        </div>
      </div>
      <div class="comm_btn_wrap mrR30">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onClickBtnCancel"
        >
          {{ $t("MSG_BTN_CANCEL") }}
        </sui-button>
        <sui-button
          v-permission:update="pageId"
          type="button"
          class="comm_btn_solid"
          :disabled="tempDeleteYn==='Yes'"
          @click="onClickBtnSave"
        >
          {{ $t("MSG_BTN_SAVE") }}
        </sui-button>
      </div>
    </div>
  </div>
</template>
<script>
// import - libraries (node modules)
// import - local files (js, vue, ...)
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00001_P02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: 'PGE_CMZ_00001',
    },
    tempCodeId: {
      type: String,
      default: null,
    },
    tempCdstType: {
      type: String,
      default: null,
    },
    tempCdstTypeName: {
      type: String,
      default: null,
    },
    tempCdDCdId: {
      type: String,
      default: null,
    },
    tempCdVldVal: {
      type: String,
      default: null,
    },
    tempDeleteYn: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      startDateTime: new Date(2000,0,1,0,0,0),
      finishDateTime: new Date(9999,0,1,0,0,0),
      singleStartDatetime: '2000-01-01',
      timePickerStartValue: {
        HH: '00',
        mm: '00',
        ss: '00',
      },
      singleFinishDatetime: '9999-01-01',
      timePickerFinishValue: {
        HH: '00',
        mm: '00',
        ss: '00',
      },
      CLIENT_DATE_TIME_FORMAT: this.$store.getters.userInfo.dateFormat+' HH:mm:ss',
      searchFieldOldText: {},

      frame0: {
        selectedCodeValue: {
          codeId: '',
          codeVld: '',
          codeName: '',
          codeContents: '',
          COD_CDST_TYPE: '',
          COD_CDST_TYPE_NAME: '',
          arrayalOrder: '',
          defaultYN: 'Y',
          codeUseYN: 'Y',
          prtsCodeId: '',
          prtsCodeVld: { label: '', key: '' },

          codeValueValidityStartDTM: '',
          codeValueValidityFinishDTM: '',

          codeDetailMultiLanguageId: '',

          finalModificationUserId: '',
          finalModificationDTM: '',

          modificationDisplayLanguageId: '',
          modificationLoginId: '',
          modificationKnoxId: '',
          modificationUserName: '',
          modificationUserGlobalName: '',
          modificationDepartmentName: '',
          modificationDepartmentGlobalName: '',

          originalFinalModificationDTM: '',
        },
      },
      prtsCodeIdvld: [],
      isModification: false,
    };
  },
  computed: {
    // 계산된 속성, property로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
    count() {
      console.log('count increased');
    },
  },
  mounted() {
    // DOM이 document에 append된 상태, 실제 element에 접근 가능 (this.$el or this.$refs)
    // 주로 데이터 패치 등을 함
    // this.loadCode().then(() => {
    //
    // });
    this.loadData();
  },
  methods: {
    loadCode() {
    },
    loadData() {
      // get contents data, grid etc..
      this.frame0.selectedCodeValue.codeId = this.tempCodeId;
      this.frame0.selectedCodeValue.COD_CDST_TYPE = this.tempCdstType;
      this.frame0.selectedCodeValue.COD_CDST_TYPE_NAME = this.tempCdstTypeName;

      this.selectPrtsCodeVldList(this.frame0.selectedCodeValue.codeId);// 부모유효값 리스트 조회
    },
    onClickBtnSave() {
      [this.singleStartDatetime] = this.startDateTime.split(' ');
      this.timePickerStartValue = {
        HH: this.startDateTime.split(' ')[1].split(':')[0],
        mm: this.startDateTime.split(' ')[1].split(':')[1],
        ss: this.startDateTime.split(' ')[1].split(':')[2],
      };
      [this.singleFinishDatetime] = this.finishDateTime.split(' ');
      this.timePickerFinishValue = {
        HH: this.finishDateTime.split(' ')[1].split(':')[0],
        mm: this.finishDateTime.split(' ')[1].split(':')[1],
        ss: this.finishDateTime.split(' ')[1].split(':')[2],
      };
      console.log(this.singleFinishDatetime);
      console.log(this.timePickerFinishValue);
      // date picker validation
      if (this.onClickValidate()) return false;

      let runService = '';

      // 수정
      if (this.isModification) {
        runService = 'DTS_CMZ_00016';
        this.frame0.selectedCodeValue.codeVld = this.tempCdVldVal;
      } else {
        // 신규
        runService = 'DTS_CMZ_00014';
      }

      // 코드유형일자 세팅
      if (this.singleStartDatetime !== null && this.singleStartDatetime !== '') {
        const sStartDate = utils.dateformatToServer(this.singleStartDatetime).substr(0, 8);
        const sStartTm = `${this.timePickerStartValue.HH}${this.timePickerStartValue.mm}${this.timePickerStartValue.ss}`;
        this.frame0.selectedCodeValue.codeValueValidityStartDTM = `${sStartDate}${sStartTm}`;
      }

      if (this.singleFinishDatetime !== null && this.singleFinishDatetime !== '') {
        const sFinishDate = utils.dateformatToServer(this.singleFinishDatetime).substr(0, 8);
        /*  eslint max-len: ["error", { "code": 200 }] */
        const sFinishTm = `${this.timePickerFinishValue.HH}${this.timePickerFinishValue.mm}${this.timePickerFinishValue.ss}`;
        this.frame0.selectedCodeValue.codeValueValidityFinishDTM = `${sFinishDate}${sFinishTm}`;
      }

      const dataParams = {
        codeId: this.frame0.selectedCodeValue.codeId || '',
        codeValidityValue: this.frame0.selectedCodeValue.codeVld || '',
        codeContent: this.frame0.selectedCodeValue.codeContents || '',
        defaultYn: this.frame0.selectedCodeValue.defaultYN || '',
        arrayalOrder: this.frame0.selectedCodeValue.arrayalOrder,
        codeUseYn: this.frame0.selectedCodeValue.codeUseYN || '',
        parentsCodeId: this.frame0.selectedCodeValue.prtsCodeId || '',
        parentsCodeValidityValue: this.frame0.selectedCodeValue.prtsCodeVld.key || '',
        originalFinalModificationDTM: this.frame0.selectedCodeValue.originalFinalModificationDTM || '',
        codeValueValidityStartDTM: this.frame0.selectedCodeValue.codeValueValidityStartDTM || '',
        codeValueValidityFinishDTM: this.frame0.selectedCodeValue.codeValueValidityFinishDTM || '',
        deleteYn: 'N',
      };

      // 코드명 다국어 처리
      let objMultiLanguageList = {};

      if (this.isModification) {
        objMultiLanguageList = this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal();
      } else {
        let sCodeValue = this.frame0.selectedCodeValue.codeVld;

        sCodeValue = sCodeValue.replace(/[/]/gi, '^$');

        // 코드 값중 / 값은 -> ^$ 로 변경하여 다국어 ID로 등록
        const sMultiLanguageId = `${this.frame0.selectedCodeValue.codeId}_${sCodeValue}`;

        //this.frame0.selectedCodeValue.codeDetailMultiLanguageId = sMultiLanguageId;
        objMultiLanguageList = this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal(sMultiLanguageId);
      }

      utils.assign(dataParams, { codeNameMultiLanguageList: objMultiLanguageList });

      // form validation
      if (!this.formValidate(dataParams)) {
        return false;
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        http.request('PGE_CMZ_00001', runService, {
          path: {},
          data: dataParams,
        }).then(() => {
          utils.messageBox('warning', this.$t('MSG_ALT_SAVE_DATA'));
          if(this.isModification){
            this.$emit('updated', dataParams.codeId, dataParams.codeValidityValue);
          }else{
            this.$emit('save');
          }
        }).catch(error => {
          console.log(error);
        });
      });

      return true;
    },
    onClickBtnCancel() {
      this.$emit('cancel');
    },
    setDataPicker() {

    },
    selectPrtsCodeVldList(sCodeId) {
      http.request(this.pageId, 'DTS_CMZ_00019', {
        path: {
          'code-id': sCodeId || '',
        },
      }).then(res => {
        if (res.data.length > 0) {
          utils.forEach(res.data, obj => {
            const prtsCodeIdvld = {
              key: obj.codeName,
              label: `${obj.codeId}(${obj.codeName})`,
            };
            this.prtsCodeIdvld.push(prtsCodeIdvld);
          });

          this.frame0.selectedCodeValue.prtsCodeId = res.data[0].codeId;
          // eslint-disable-next-line max-len
          if (this.frame0.selectedCodeValue.prtsCodeVld.key === null || this.frame0.selectedCodeValue.prtsCodeVld.key === '') {
            this.frame0.selectedCodeValue.prtsCodeVld.key = res.data[0].codeName;
          }
        }
        this.selectDetail();
      }).catch(error => {
        console.log(error);
      });
    },
    selectDetail() {
      if (this.tempCdDCdId === null || this.tempCdDCdId === '' || this.tempCdDCdId === undefined) {
        return false;
      }

      this.isModification = true;
      this.frame0.selectedCodeValue.codeVld = this.tempCdVldVal;


      // 수정화면 (코드 조회)
      http.request(this.pageId, 'DTS_CMZ_00015', {
        path: {
          'code-id': this.frame0.selectedCodeValue.codeId || '',
        },
        query: {
          codeValidityValue: this.frame0.selectedCodeValue.codeVld || '',
          codeValueValidityDTMUseYn: 'N',
        },
      }).then(res => {
        this.frame0.selectedCodeValue.codeContents = res.data.codeContent;
        this.frame0.selectedCodeValue.arrayalOrder = res.data.arrayalOrder.toString();
        this.frame0.selectedCodeValue.defaultYN = res.data.defaultYn;
        this.frame0.selectedCodeValue.codeUseYN = res.data.codeUseYn;
        this.frame0.selectedCodeValue.codeName = res.data.codeName;
        this.frame0.selectedCodeValue.codeDetailMultiLanguageId = res.data.codeDetailMultiLanguageId;

        this.frame0.selectedCodeValue.prtsCodeId = res.data.parentsCodeId;
        this.frame0.selectedCodeValue.prtsCodeVld.key = res.data.parentsCodeValidityValue;
        //
        this.frame0.selectedCodeValue.finalModificationUserId = res.data.finalModificationUserId;

        const originalFinalModificationDTM = res.data.finalModificationDTM;
        this.frame0.selectedCodeValue.originalFinalModificationDTM = utils.clone(originalFinalModificationDTM);
        this.frame0.selectedCodeValue.finalModificationDTM = utils.dateformatToClient(res.data.finalModificationDTM);

        this.frame0.selectedCodeValue.modificationDisplayLanguageId = res.data.modificationDisplayLanguageId;
        this.frame0.selectedCodeValue.modificationLoginId = res.data.modificationLoginId;
        this.frame0.selectedCodeValue.modificationKnoxId = res.data.modificationKnoxId;
        this.frame0.selectedCodeValue.modificationUserName = res.data.modificationUserName;
        this.frame0.selectedCodeValue.modificationUserGlobalName = res.data.modificationUserGlobalName;
        this.frame0.selectedCodeValue.modificationDepartmentName = res.data.modificationDepartmentName;
        this.frame0.selectedCodeValue.modificationDepartmentGlobalName = res.data.modificationDepartmentGlobalName;

        this.frame0.selectedCodeValue.codeValueValidityStartDTM = res.data.codeValueValidityStartDTM;
        this.frame0.selectedCodeValue.codeValueValidityFinishDTM = res.data.codeValueValidityFinishDTM;

        if (this.frame0.selectedCodeValue.codeValueValidityStartDTM.length === 14) {
          const sStartDate = this.frame0.selectedCodeValue.codeValueValidityStartDTM.substr(0, 8);
          this.singleStartDatetime = utils.dateformatToClient(sStartDate);

          const sStartTm = this.frame0.selectedCodeValue.codeValueValidityStartDTM.substr(8, 8);
          this.timePickerStartValue = { HH: sStartTm.substr(0, 2), mm: sStartTm.substr(2, 2), ss: sStartTm.substr(4, 2) };
        }
        if (this.frame0.selectedCodeValue.codeValueValidityFinishDTM.length === 14) {
          const sFinishDate = this.frame0.selectedCodeValue.codeValueValidityFinishDTM.substr(0, 8);
          this.singleFinishDatetime = utils.dateformatToClient(sFinishDate);

          const sFinishTm = this.frame0.selectedCodeValue.codeValueValidityFinishDTM.substr(8, 8);
          this.timePickerFinishValue = { HH: sFinishTm.substr(0, 2), mm: sFinishTm.substr(2, 2), ss: sFinishTm.substr(4, 2) };
        }
        const finishDateTime1 = `${this.singleFinishDatetime} ${this.timePickerFinishValue.HH}:${this.timePickerFinishValue.mm}:${this.timePickerFinishValue.ss}`;
        const startDateTime1 = `${this.singleStartDatetime} ${this.timePickerStartValue.HH}:${this.timePickerStartValue.mm}:${this.timePickerStartValue.ss}`;
        this.finishDateTime = `${finishDateTime1}`;
        this.startDateTime = `${startDateTime1}`;
      }).catch(error => {
        console.log(error);
      });

      return true;
    },
    formValidate(formData) {
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.localTxtFld.value)) === true) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CODE_NAME')));
        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.globalTxtFld.value))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_ALT_GLOBAL_ENM')));
        return false;
      }
      if (utils.isEmpty(formData.codeValidityValue)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_CODE_VALID_VAL')));
        return false;
      }

      if (utils.isEmpty(`${formData.arrayalOrder}`)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_ARRAY_ORDER')));
        return false;
      }

      if (utils.isEmpty(formData.codeUseYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_USE')));
        return false;
      }

      if (utils.isEmpty(formData.codeValueValidityStartDTM) || formData.codeValueValidityFinishDTM.length !== 14) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), '유효시작일시'));
        return false;
      }
      if (utils.isEmpty(formData.codeValueValidityFinishDTM) || formData.codeValueValidityFinishDTM.length !== 14) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), '유효종료일시'));
        return false;
      }
      if (formData.codeValueValidityFinishDTM <= formData.codeValueValidityStartDTM)  {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_TXT_END_GRTR_START_DTM')), null, () => {
        });
        return false;
      }      

      return true;
    },

    onKeyUpInput(event, obj, sCol) {
      if (event.key !== 13) {
        const searchFieldNewText = event.target.value;
        if (searchFieldNewText.length > 0 && utils.isEngNum_(searchFieldNewText) === false) {
          utils.messageBox('warning', this.$t('MSG_ALT_ONLY_ENGLISH_NUMBER'), null, () => {
            const has = Object.prototype.hasOwnProperty;
            if (has.call(obj[sCol], 'key')) {
              // eslint-disable-next-line no-param-reassign
              obj[sCol].key = this.searchFieldOldText[sCol];
            } else {
              obj[sCol] = this.searchFieldOldText[sCol]; // eslint-disable-line
            }
          });
        } else {
          // eslint-disable-next-line no-param-reassign
          obj[sCol] = utils.toUpper(searchFieldNewText);
          this.searchFieldOldText[sCol] = utils.toUpper(searchFieldNewText);
        }
      }
    },
    /* 달력의 오류를 확인할 수 있는 validate 함수 */
    onClickValidate() {
      // date picker validation
      // if (this.onClickValidate()) return false;
      if (!this.$refs.dpSingleFinishDatetime.isValid()
        || !this.$refs.dpSingleStartDatetime.isValid()) {
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
