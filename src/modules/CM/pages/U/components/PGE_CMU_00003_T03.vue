<template>
  <div>
    <div class="mrB10" />
    <sui-s-grid
      ref="grid"
      :data-source="dsMessageResourceMass"
      :headers="defaultGridData.columns"
      :options="options"
      :showRowsPerPageControl="false"
    />
    <div class="comm_btn_wrap">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClickSelectMessageresource"
      >
        {{ $t("MSG_BTN_NEW") }}
      </sui-button>
      <sui-button
        v-permission:delete="pageId"
        type="button"
        class="comm_btn_border"
        :disabled="checkMetaSave"
        @click="onClickDelete"
      >
        {{ $t("MSG_BTN_DEL") }}
      </sui-button>
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClickIdDuplicationCheck"
      >
        {{ $t("MSG_BTN_DPCT_CHCK") }}
      </sui-button>
      <sui-button
        v-permission:update="pageId"
        type="button"
        class="comm_btn_solid"
        :disabled="checkMetaSave"
        @click="onClickSave"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
import p01 from './PGE_CMU_00003_P01';
import BasePage from '~cm/components/BasePage';

const CODE_KEYS = ['COD_MDLE', 'COD_MSG_RESO_TYPE'];
const gridEditorFactory = utils.getGridCellFactory();

export default {
  name: 'PGE_CMU_00003_T03', // eslint-disable-line vue/name-property-casing
  pname: 'PGE_CMU_00003',
  extends: BasePage,
  props: {
    massdataList: {
      type: String,
      default: '',
    },
    pageId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        resizableColumn: true,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
      pageTitle: this.$t('MSG_TXT_BK_RGST'), // eslint-disable-line vue/name-property-casing,
      pageName: this.$t('MSG_TXT_MSG_RESO_BK_RGST'),
      messageResourceTypeAdapter: '',
      isShownPopupMasteNew: false,
      components: { p01 },
      localdata: [],
      massdata: [],
      moduleAdapter: '',
      codes: {
        COD_MDLE: [{ key: ' ', label: this.$t('MSG_TXT_SEL') }],
        COD_MSG_RESO_TYPE: [{ key: ' ', label: this.$t('MSG_TXT_SEL') }],
      },
      checkMetaSave: utils.checkMetaSave(),
      dsMessageResourceMass: new urDataSet(),
    };
  },
  watch: {
    massdataList(massDataList) {
      this.massDataGridInput(massDataList);
    },
  },
  created() {
    const that = this;
    this.defaultGridData = {
      columns: [
        {
          text: this.$t('MSG_TXT_MSG_RESO_VAL'),
          value: 'multiLanguageMassContent',
        }, {
          text: this.$t('MSG_TXT_DTC_MSG_VAL'),
          value: 'multiLanguageContent',
        }, {
          text: this.$t('MSG_TXT_VRFC_RSULT'),
          value: 'massCheck',
          align: 'left',
          customClass: that.massCheckcellClass,
        }, {
          text: this.$t('MSG_TXT_MDLE'),
          value: 'moduleCode',
          width: 120,
          component: {
            props: ['row', 'value'],
            template: `
                <sui-code-select
                  ref="select"
                  :initialSelectedKey="value"
                  :disabled="checkDisabledFunction"
                  codeId="COD_MDLE" 
                  @input="onChange"             
              /> `,
            data() {
              return {
                checkDisabledFunction: !utils.isEqual(this.row.massCheck, '-'),
              };
            },
            methods: {
              onChange(value) {
                that.dsMessageResourceMass.setRowValue(this.row.__id, 'moduleCode', value);
              },
            },
          },
        }, {
          text: this.$t('MSG_TXT_TYPE'),
          value: 'messageResourcesTypeCode',
          width: 120,
          component: {
            props: ['row', 'value'],
            template: `
                <sui-code-select
                  ref="select"
                  :initialSelectedKey="value"
                  :disabled="isDisabled"
                  codeId="COD_MSG_RESO_TYPE" 
                  @input="onChange"           
              /> `,
            data() {
              return {
                isDisabled: !utils.isEqual(this.row.massCheck, '-'),
              };
            },
            methods: {
              onChange(value) {
                that.dsMessageResourceMass.setRowValue(this.row.__id, 'messageResourcesTypeCode', value);
                that.dsMessageResourceMass.setRowValue(this.row.__id, 'messageResourcesId', `MSG_${value}_`);
              },
            },
          },
        }, {
          text: this.$t('MSG_TXT_MSG_RESO_ID'),
          value: 'messageResourcesId',
          component: {
            props: ['row', 'value'],
            template: `
              <sui-text-field
                ref="refInput"
                v-model="row.messageResourcesId"
                :trim="true"
                :disabled="checkDisabledFunction"
                @input="onChange"
                @blur="onBlur"
              />`,
            data() {
              return {
                oldValue: this.value,
                checkDisabledFunction: !utils.isEqual(this.row.massCheck, '-'),
              };
            },
            methods: {
              onChange(value) {
                if (!utils.isEngNum_(value) && !utils.isEmpty(value)) {
                  utils.messageBox('warning', this.$t('MSG_ALT_ONLY_ENGLISH_NUMBER'), null, () => {
                    this.row.messageResourcesId = this.oldValue;
                    that.dsMessageResourceMass.setRowValue(this.row.__id, 'messageResourcesId', this.oldValue);
                    this.$refs.refInput.setFocus();
                  });
                } else {
                  this.oldValue = value;
                }
                that.dsMessageResourceMass.setRowValue(this.row.__id, 'messageResourcesId', value);
              },
              onBlur() {
                this.row.duplicationCheck = '';
              },
            },
          },
        }, {
          text: this.$t('MSG_BTN_ID_VRFC'),
          value: 'duplicationCheck',
        }],
    };
  },
  mounted() {
    this.loadCode();
  },
  methods: {
    loadCode() {
      return http.mergeCodeList(this.$options.name, CODE_KEYS, this.codes);
    },
    /**
     * 중복 체크
     */
    onClickIdDuplicationCheck() {
      const gridList = this.dsMessageResourceMass.data;
      if (gridList.length === 0) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return;
      }

      let gridDupleIdList = utils.clone(gridList);

      if (utils.findIndex(gridList, o => utils.isEmpty(o.messageResourcesId)) > -1) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MSG_RESO_ID')));
        return false;
      }

      utils.remove(gridDupleIdList, index => utils.isEqual(index.duplicationCheck, 'N/A'));
      gridDupleIdList = utils.join(utils.map(gridDupleIdList, 'messageResourcesId'), '|');

      const queryParams = {
        messageResourceMassList: gridDupleIdList,
      };

      http.request(this.$options.pname, 'DTS_CMU_00025', {
        query: queryParams,
      }).then(res => {
        const list = utils.clone(this.dsMessageResourceMass.data);
        let i = 0;
        utils.forEach(gridList, obj => {
          const a = utils.findIndex(res.data,
            o => utils.isEqual(o.messageResourcesId.replace(/[\t\s]/g, ''),
              obj.messageResourcesId.replace(/[\t\s]/g, '')));

          if (obj.duplicationCheck !== 'N/A') {
            list[i].duplicationCheck = a > -1 ? 'fail' : 'pass';
          }
          i += 1;
        });

        this.dsMessageResourceMass.setData(list);
      });

      return null;
    },
    /**
     * GRID 글자 색 추가.
     */
    massCheckcellClass(value) {
      if (value !== '-') {
        return 'RE_errortext';
      }
      return '';
    },
    /**
     * 신규 팝업 호출
     */
    onClickSelectMessageresource() {
      this.$emit('onPopupCall');
    },
    /**
     * 신규 팝업 CALLBACK
     */
    massDataGridInput(value) {
      const valueSplitList = value.split('|');

      const queryParams = {
        messageResourceValueList: value,
      };

      http.request(this.$options.pname, 'DTS_CMU_00023', {
        query: queryParams,
      }).then(res => {
        this.massdata = [];
        utils.forEach(valueSplitList, obj => {
          const a = utils.findIndex(res.data, o => utils.isEqual(o.multiLanguageContent.replace(/[\t\s]/g, ''),
            obj.replace(/[\t\s]/g, '')));

          if (a > -1) {
            res.data[a].multiLanguageMassContent = obj;
            res.data[a].massCheck = this.$t('MSG_TXT_RGST_DAPP'); // 등록불가
            res.data[a].duplicationCheck = 'N/A';
            this.massdata.push(res.data[a]);
          } else {
            const defaultRow = {
              multiLanguageMassContent: obj,
              multiLanguageContent: '-',
              massCheck: '-',
              moduleCode: '',
              messageResourcesTypeCode: '',
              messageResourcesId: 'MSG_',
              duplicationCheck: '',
              langId: 'ko',
            };
            this.massdata.push(defaultRow);
          }
        });
        this.dsMessageResourceMass.setData([]);
        this.dsMessageResourceMass.setData(this.massdata);
      });
    },
    /**
     * 삭제
     */
    onClickDelete() {
      if (this.dsMessageResourceMass.getSelected().length === 0) {
        //utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM')); // 선택 된 항목이 없습니다.
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), '', () => {
        const selectedRows = this.dsMessageResourceMass.getSelected();
        const newList = this.dsMessageResourceMass.data.filter(item => !selectedRows.find(element => element.__idx === item.__idx));
        this.dsMessageResourceMass.setData([]);
        this.$nextTick(() => {
          this.dsMessageResourceMass.setData(newList);
        });
      });

      return null;
    },
    /**
     * 저장
     */
    onClickSave() {
      if (this.dsMessageResourceMass.getSelected().length === 0) {
        //utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM')); // 선택 된 항목이 없습니다.
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      const messageResourcesMassList = this.dsMessageResourceMass.data;
      const dataParams = {
        messageResourcesMassList,
      };

      if (!this.validCheck(messageResourcesMassList)) return false; // null 값 체크

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), '', () => { // 저장하시겠습니까?
        http.request(this.$options.pname, 'DTS_CMU_00024', {
          data: dataParams,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
        });
      });

      return null;
    },
    /**
     * 입력 체크
     */
    validCheck(messageResourcesMassList) {
      let flag = true;

      utils.forEach(messageResourcesMassList, (obj, key) => {
        const regType = new RegExp(`^MSG_${obj.messageResourcesTypeCode}_[A-Z0-9_]*$`);

        if (utils.isEmpty(utils.trim(obj.moduleCode))) {
          // {0} 행의 모듈코드를 선택하세요.
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ROW_SELECT_MODULE'), key + 1));
          flag = false;
          return false;
        }
        if (utils.isEmpty(utils.trim(obj.messageResourcesTypeCode))) {
          // {0} 행의 메시지자원 유형을 선택하세요.
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ROW_SELECT_MSG_TYPE'), key + 1));
          flag = false;
          return false;
        }
        if (utils.isEmpty(obj.messageResourcesId)) {
          // {0} 행의 메시지ID를 선택하세요.
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ROW_INPUT_MSG_ID'), key + 1));
          flag = false;
          return false;
        }
        if (!regType.test(obj.messageResourcesId)) {
          // {0} 행의 메시지ID 형식이 잘못되었습니다.
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ROW_WRONG_FORMAT'), key + 1));
          flag = false;
          return false;
        }
        if (utils.isEmpty(obj.duplicationCheck)) {
          // 중복 체크 해주세요.
          utils.messageBox('warning', this.$t('MSG_ALT_SELT_DPCT_CHK'));
          flag = false;
          return false;
        }
        if (utils.isEqual(obj.duplicationCheck, 'fail')) {
          // ID검증 fail항목이 존재하면 저장할 수 없습니다.
          utils.messageBox('warning', this.$t('MSG_ALT_FAIL_CANNOT_SAVE'));
          flag = false;
          return false;
        }

        return true;
      });
      return flag;
    },
    /**
     * grid disabled Function
     */
    checkDisabledFunction(value, row) {
      return !utils.isEqual(row.massCheck, '-');
    },
  },
};
</script>
<style scoped>
</style>
