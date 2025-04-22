<template>
  <div>
    <div class="comm_title_wrap">
      <h4>{{ $t('MSG_TXT_ATTH_GROUP_INFO') }}</h4>
    </div>
    <div class="comm_view_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_MDLE')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-module-submodule-select
            ref="smComboFrame0"
            :disabled="true"
            :pageId="pageId"
            :selectedMd="frame0.selectData.COD_MDLE"
            :selectedSmd="frame0.selectData.COD_SMDLE"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_ATTH_GRP_ID')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model="frame0.attachGroupId"
            :readonly="true"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_ATTH_GRP_NM')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-text-field
            v-model="frame0.attachGroupName"
            :readonly="true"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_ATTH_ITEM_MGT_YN')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-yn-select
            ref="mgtYnSelect"
            :disabled="true"
            :selected="frame0.selectData.COD_MGT_YN"
          />
        </div>
      </div>
    </div>
    <div class="mrB30" />
    <div class="comm_title_wrap">
      <h4>{{ $t('MSG_TXT_ATTH_ITEM_LIST') }}</h4>
    </div>  
    <sui-s-grid
      ref="grid"
      :initialRowsPerPage="3"
      :options="options"
      :headers="gridColumns0"
      :showRowsPerPageControl="false"
      :data-source="dsItem"
    >
      <template #left-info
        v-if="btnShow"
      >
        <div class="comp_spacing" />
        <div class="btn_wrapL">
          <sui-button
            v-if="btnShow"
            type="button"
            class="comm_btn_gridTop"
            @click="onClickAddRow"
          >
            {{ $t('MSG_BTN_ROW_ADD') }}
          </sui-button>
          <sui-button
            v-if="btnShow"
            type="button"
            class="comm_btn_gridTop"
            @click="onClickDelRow"
          >
            {{ $t('MSG_BTN_ROW_DEL') }}
          </sui-button>
        </div>        
      </template>
    </sui-s-grid>
    <div class="comm_btn_wrap">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClickClose"
      >
        {{ $t('MSG_BTN_CANCEL') }}
      </sui-button>
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="moveTab(-2)"
      >
        {{ $t('MSG_BTN_PREV') }}
      </sui-button>
      <sui-button
        v-permission:update="pageId"
        type="button"
        :class="saveClass"
        @click="onClickSave(attachGroupDeterminYn,'save')"
      >
        {{ $t('MSG_BTN_SAVE') }}
      </sui-button>
      <sui-button
        v-if="determinDisabledYn"
        v-permission:update="pageId"
        type="button"
        class="comm_btn_solid"
        @click="onClickSave('Y','determin')"
      >
        {{ $t('MSG_BTN_DTRM') }}
      </sui-button>
    </div>
    <sui-popup
      v-model="showRegisterPopup"
      :title="$t('MSG_TXT_ATTH_ITEM_RGST')"
    >
      <p01
        :parentPageId="contextPageId"
        @exit="onPopupCancelClicked"
        @apply="onPopupApply"
      />
    </sui-popup>
    <sui-popup
      v-model="showModifyPopup"
      :title="$t('MSG_TXT_MDFC_ATTH_ITEM')"
    >
      <p01
        :key="key"
        :dataRow="selectedRow"
        :isRegister="false"
        :parentPageId="contextPageId"
        @exit="onPopupCancelClicked"
        @modify="onPopupModify"
      />
    </sui-popup>
  </div>
</template>

<script>
// eslint-disable-next-line import/no-unresolved, import/extensions
import { urDataSet } from 'uidev-component/index.js';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';
import p01 from './PGE_CMD_00003_P02.vue';

const CODE_KEYS = ['COD_ATTH_EXTS'];

export default {
  name: 'PGE_CMD_00003_T03', // eslint-disable-line vue/name-property-casing
  components: {
    p01,
  },
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      default: null,
    },
    tabData: {
      type: Object,
      default: null,
    },
    idx: {
      type: Number,
      default: 2,
    },
    attachGroupId: {
      type: String,
      default: null,
    },
    selectedGridRowData: {
      type: Object,
      default: null,
    },
    attachGroupDeterminYn: {
      type: String,
      default: 'N',
    },
  },
  data() {
    return {
      golbalId: this.$store.getters.userInfo.langId,
      key: 1,
      selectedRow: {},
      showRegisterPopup: false,
      showModifyPopup: false,
      optionList: {
        COD_ATTH_EXTS: [],
        COD_NCSR_YN: [{
          key: 'Y',
          label: this.$t('MSG_TXT_NCSR'),
        }, {
          key: 'N',
          label: this.$t('MSG_TXT_SEL'),
        }],
      },
      frame0: {
        selectData: {
          COD_MDLE: {
            label: '',
            key: '',
          },
          COD_SMDLE: {
            label: '',
            key: '',
          },
          COD_MGT_YN: {
            label: '',
            key: '',
          },
        },
        attachGroupId: '',
        attachGroupName: '',
      },
      localdata0: [],
      localdata1: [],
      mlngDtlList: [],
      attachExtensionCodeList: [],
      btnShow: false,
      determinDisabledYn: true,
      // eslint-disable-next-line new-cap
      dsItem: new urDataSet(),
      deletedRows: [],
      options: {
        infinityScroll: true,
        noBaseInfo: true,
        internalPaging: false,
        selectCheck: true,
        selectCheckOnly: true,
        multiSelect: true,
      },
      segmentOptList: [{ key: 'Y', label: 'Y' }, { key: 'N', label: 'N' }],

    };
  },
  computed: {
    saveClass() {
      if (utils.isEqual(this.attachGroupDeterminYn, 'Y')) {
        return 'comm_btn_solid';
      }
      return 'comm_btn_border';
    },
  },

  // --------Ashok code start for grid-----------------------------
  created() {
    const that = this;
    this.gridColumns0 = [
      {
        text: this.$t('MSG_TXT_ARRAY_ORDER'),
        value: 'arrayalOrder',
        width: '100px',
        customValue: (v, r) => { that.dsItem.setRowValue(r.__id, 'arrayalOrder', r.__idx + 1); return r.__idx + 1; },
      },
      {
        text: this.$t('MSG_TXT_ITEM_NM'),
        customValue: (v, r) => {
          if (r.multiLanguageList[0].langId === this.golbalId) return r.multiLanguageList[0].multiLanguageContent;
          return r.multiLanguageList[1].multiLanguageContent;
        },
        width: '400px',
      }, {
        text: this.$t('MSG_TXT_HDQT_CNTL_YN'),
        value: 'headquarterControlYn',
        width: '100px',
        customValue: (v, r) => (r.headquarterControlYn == 'N' ? 'No' : 'Yes'),
      },

      {
        text: this.$t('MSG_TXT_NCSR_YN'),
        value: 'headquarterEssentialYn',
        width: '100px',
        customValue: (v, r) => utils.find(that.optionList.COD_NCSR_YN, { key: r.headquarterEssentialYn }).label,
      },
      {
        text: this.$t('MSG_TXT_EXTS'),
        value: 'attachPossibilityExtensionCode',
        width: '100px',
        customValue: (v, r) => utils.find(that.attachExtensionCodeList,
          { key: r.attachPossibilityExtensionCode }).label,
      },
      {
        text: this.$t('MSG_TXT_ATTH_EXLD_PSBL_YN'),
        value: 'attachExcludePossibilityYn',
        width: '120px',
        customValue: (v, r) => (r.attachExcludePossibilityYn == 'N' ? 'No' : 'Yes'),
      },
      {
        text: this.$t('MSG_TXT_STDD_FORM'),
        value: 'standardFormName',
        customValue: (v, r) => r.standardFormName,
      },
    ];
  },
  mounted() {
    http.getCodeList(this.pageId, ['COD_ATTH_EXTS'], this.siteId).then(
      res => {
        this.attachExtensionCodeList = res.COD_ATTH_EXTS;
      },
    );
    this.determinDisabledYn = !utils.isEqual(this.attachGroupDeterminYn, 'Y');
    this.commCodeSelect().then(() => {
      if (utils.isEmpty(this.attachGroupId)) {
        this.setAttachItemDefault();
      } else {
        this.setAttachItemList();
      }
    }).catch(() => {});
  },

  activated() {
    this.setGroupInfo();

    if (utils.isEmpty(this.attachGroupId)) {
      this.setAttachItemDefault();
    }

    // this.setAttachItemNameManagementN();
  },
  methods: {
    onPopupApply(row) {
      this.dsItem.addRow(row);
      this.showRegisterPopup = false;
    },
    onPopupModify(rowData) {
      const row = rowData;
      row.__selected = false;
      this.dsItem.data[row.__idx] = row;
      const dataSet = this.dsItem.data;
      this.dsItem.setData([]);
      this.$nextTick(() => {
        this.dsItem.setData(dataSet);
      });
      this.showModifyPopup = false;
    },
    onPopupCancelClicked(option) {
      switch (option) {
        case 'cancelRegister':
          this.showRegisterPopup = false;
          break;
        case 'register':
          this.showRegisterPopup = false;
          break;
        case 'modify':
          this.showModifyPopup = false;
          break;
        case 'cancelModify':
          this.showModifyPopup = false;
          break;
        default:
          break;
      }
    },
    onModify() {
      if (this.dsItem.getSelected().length > 1) {
        utils.messageBox('information', this.$t('MSG_ALT_SELT_ONE_ITEM'), null, () => {
        });
        return;
      }
      const curr = this.dsItem.getSelected()[0];
      if (utils.isEmpty(curr)) {
        return;
      }
      // eslint-disable-next-line consistent-return
      this.selectedRow = curr;
      this.selectedRow.mlngData = curr.multiLanguageList;
      this.key += 1;
      this.showModifyPopup = true;
    },
    /**
     * 확장자 공통 code 목록 조회
     */
    commCodeSelect() {
      return http.mergeCodeList(this.pageId, CODE_KEYS, this.optionList).then(() => {
      }).catch(() => {});
    },
    /**
     * tab01 첨부항목 관리 여부 N 인 경우
     * 고정 row 항목명을 첨부그룹명과 동일하게 설정
     */
    setAttachItemNameManagementN() {
      if (utils.isEqual(this.tabData.t01.attachItemManagementYn, 'N')) {
        this.dsItem.setData(0, 'attachItemName', this.tabData.t01.localMultiLanguage);
      }
    },
    /**
     * 첨부항목 목록 조회
     */
    setAttachItemList() {
      http.request(this.pageId, 'DTS_CMD_00008', {
        path: {
          'attach-group-id': this.attachGroupId,
        },
      }).then(res => {
        const itemList = utils.clone(res.data);

        utils.forEach(itemList, (obj, key) => {
          itemList[key].arrayalOrder = obj.arrayalOrder.toString();
        });


        this.dsItem.setData(itemList); // 데이터 셋에 데이터를 넣는 함수
        // this.setAttachItemNameManagementN();
      });
    },
    updateData(row) {
      this.dsItem.data[row.__idx] = row;
    },
    /**
     * 첨부항목 초기 값 셋팅.
     * tab01 첨부항목 관리 여부 N 인 경우
     * 고정 1row 추가.
     */
    setAttachItemDefault() {
      const attachItemManagementYn = utils.isUndefined(this.dsItem.data[0])
        ? '' : this.dsItem.data[0].attachItemManagementYn;

      if (utils.isEqual(this.tabData.t01.attachItemManagementYn, 'N') && !utils.isEqual(attachItemManagementYn, 'N')) {
        const defaultRow = [{
          standardFormId: '',
          standardFormName: '',
          attachItemId: '',
          attachItemName: this.tabData.t01.localMultiLanguage,
          arrayalOrder: '1',
          attachExcludePossibilityYn: 'Y',
          headquarterControlYn: 'Y',
          headquarterEssentialYn: '',
          attachPossibilityExtensionCode: '',
          attachItemManagementYn: this.tabData.t01.attachItemManagementYn,
        }];

        this.dsItem.setData(defaultRow);
      } else if (utils.isEqual(this.tabData.t01.attachItemManagementYn, 'Y')
                 && utils.isEqual(attachItemManagementYn, 'N')) {
        this.dsItem.setData([]);
      }
    },
    /**
     * 첨부그룹정보 data SET
     */
    setGroupInfo() {
      this.frame0.selectData.COD_MDLE.key = this.tabData.t01.moduleCode;
      this.frame0.selectData.COD_SMDLE.key = this.tabData.t01.subModuleCode;
      this.frame0.selectData.COD_MGT_YN.key = this.tabData.t01.attachItemManagementYn;
      this.frame0.attachGroupId = this.tabData.t01.attachGroupId;
      this.frame0.attachGroupName = this.tabData.t01.localMultiLanguage;

      this.btnShow = utils.isEqual(this.tabData.t01.attachItemManagementYn, 'Y');
    },
    /**
     * 닫기
     */
    onClickClose() {
      this.$emit('onClickClose', false);
    },
    /**
     * 이전
     * tab 이동
     */
    moveTab(value) {
      const idx = this.idx + value;

      this.$emit('moveTab', idx);
    },
    /**
     * 부모화면에 현재 TAB의 DATA 저장.
     */
    dataSet() {
      const info = {
        attachItemList: this.dsItem.data,
      };
      this.$emit('setTabInfo', info, 't03');
    },
    /**
     * 첨부항목관리여부 (tab01) 값이 N인 경우
     * 특정 컬럼 입력 제한.
     */
    checkEditableName() {
      // rowData, columnName, dataset, grid
      if (utils.isEqual(this.tabData.t01.attachItemManagementYn, 'N')) {
        return false;
      }
      return true;
    },
    /**
     * grid button event
     */
    onClickAddRow() {
      this.showRegisterPopup = true;
    },
    onDelete() {
      const selectedIndexes = this.dsItem.getSelected();
      if (selectedIndexes.length <= 0) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM')); // 선택 된 항목이 없습니다.
        return false;
      }
      utils.forEach(selectedIndexes, deleteRow => {
        if (utils.isEmpty(deleteRow.rowType)) {
          this.dsItem.removeRow(deleteRow);
        }
      });
      this.deletedRows = selectedIndexes;
      this.dsItem.removeSelected();

      return null;
    },
    onClickSave(attachGroupDeterminYn, type) {
      // eslint-disable-next-line prefer-template
      const serviceName = (utils.isEmpty(this.attachGroupId) ? 'DTS_CMD_00009' : 'DTS_CMD_00010');
      const dataParam = {
        attachItemList: this.dsItem.data,
        attachItemDeleteList: this.deletedRows, // this.dsItemDelete.data,
        attachGroupDeterminYn,
      };
      // eslint-disable-next-line prefer-template
      if (!this.validCheck()) return false; // null 값 체크

      // 다른 tab data 할당.
      utils.assign(dataParam, this.tabData.t01);
      utils.assign(dataParam, this.tabData.t02);

      // 신규등록인 경우만 id 중복체크
      if (utils.isEmpty(this.attachGroupId)) {
        http.request(this.pageId, 'DTS_CMD_00011', {
          query: {
            attachGroupId: dataParam.attachGroupId,
          },
        }).then(res => {
          if (res.data > 0) {
            this.moveTab(-2);
            // 이미 등록된 ID입니다.
            utils.messageBox('information', this.$t('MSG_ALT_IMG_RGST_ID'), null, () => {
              this.$emit('setFocus', 'inputAttachGroupId');
            });
          } else {
            // 서비스 호출
            utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
              this.dataSave(serviceName, dataParam, type);
            });
          }
        });
      } else {
        // 서비스 호출
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
          this.dataSave(serviceName, dataParam, type);
        });
      }

      return null;
    },
    dataSave(serviceName, dataParams, type) {
      http.request(this.pageId, serviceName, {
        data: dataParams,
      }).then(() => {
        utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
        // this.determinDisabledYn = utils.isEqual(this.attachGroupDeterminYn ,'N');
        if (utils.isEqual(type, 'determin')) {
          this.$emit('onClickClose', true);
        } else {
          this.$emit('onClickSearch');
        }
      });
    },
    /**
     * 저장
     */
    validCheck() {
      const tab01Data = this.tabData.t01;
      const attachItemList = this.dsItem.data;
      let itemListFlag = true;

      // tab01
      if (utils.isEmpty(tab01Data.moduleCode)) {
        this.moveTab(-2);
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MDLE')));

        return false;
      }
      if (utils.isEmpty(tab01Data.subModuleCode)) {
        this.moveTab(-2);
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SMDLE')));

        return false;
      }
      if (tab01Data.attachGroupId.length < 9) {
        this.moveTab(-2);
        utils.messageBox('warning',
          utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_ATTH_GRP_ID')),
          null, () => {
            this.$emit('setFocus', 'inputAttachGroupId');
          });

        return false;
      }
      if (utils.isEmpty(tab01Data.localMultiLanguage)) {
        this.moveTab(-2);
        utils.messageBox('warning',
          utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_LOCAL_LNG')),
          null, () => {
            this.$emit('setFocus', 'local');
          });

        return false;
      }
      if (utils.isEmpty(tab01Data.globalMultiLanguage)) {
        this.moveTab(-2);
        utils.messageBox('warning',
          utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_GLOBAL_LNG')),
          null, () => {
            this.$emit('setFocus', 'global');
          });

        return false;
      }
      if (utils.isEmpty(tab01Data.attachItemManagementYn)) {
        this.moveTab(-2);
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_ATTH_ITEM_MGT_YN')));

        return false;
      }
      if (utils.isEmpty(tab01Data.imagePreviewApplyYn)) {
        this.moveTab(-2);
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_IMG_PRVW_APPY_YN')));

        return false;
      }
      if (utils.isEmpty(tab01Data.attachRestrictionSize)) {
        this.moveTab(-2);
        utils.messageBox('warning',
          utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_RSLT_CAPA')),
          null, () => {
            this.$emit('setFocus', 'attachRestrictionSize');
          });

        return false;
      }
      if (utils.isEmpty(tab01Data.downloadHistoryManagementYn)) {
        this.moveTab(-2);
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_DLOAD_HIS_MGT_YN')));

        return false;
      }
      if (utils.isEmpty(tab01Data.downloadReasonInputYn)) {
        this.moveTab(-2);
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_DLOAD_RSN_INP_YN')));

        return false;
      }
      if (utils.isEmpty(tab01Data.fileEncryptionYn)) {
        this.moveTab(-2);
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_FILE_ENCR_YN')));

        return false;
      }

      // 첨부항목 리스트 (TAB3)
      if (attachItemList.length < 1) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_ATTH_ITEM')));

        return false;
      }

      utils.forEach(attachItemList, (obj, key) => {
        if (utils.isEmpty(obj.headquarterControlYn)) {
          utils.messageBox('warning',
            utils.strFormat(this.$t('MSG_ALT_ROW_INPUT'), key + 1, this.$t('MSG_TXT_HDQT_CNTL_YN')),
            null, () => {
              // this.gridSetFocus(key, 'headquarterControlY');
            });

          itemListFlag = false;
          return false;
        }
        if (utils.isEmpty(obj.headquarterEssentialYn)) {
          utils.messageBox('warning',
            utils.strFormat(this.$t('MSG_ALT_ROW_INPUT'), key + 1, this.$t('MSG_TXT_NCSR_YN')),
            null, () => {
              // this.gridSetFocus(key, 'headquarterEssentialYn');
            });

          itemListFlag = false;
          return false;
        }
        if (utils.isEmpty(obj.arrayalOrder)) {
          utils.messageBox('warning',
            utils.strFormat(this.$t('MSG_ALT_ROW_INPUT'), key + 1, this.$t('MSG_TXT_ARRAY_ORDER')),
            null, () => {
              // this.gridSetFocus(key, 'arrayalOrder');
            });

          itemListFlag = false;
          return false;
        }
        if (utils.isEmpty(obj.attachPossibilityExtensionCode)) {
          utils.messageBox('warning',
            utils.strFormat(this.$t('MSG_ALT_ROW_INPUT'), key + 1, this.$t('MSG_TXT_EXTS')),
            null, () => {
              // this.gridSetFocus(key, 'attachPossibilityExtensionCode');
            });

          itemListFlag = false;
          return false;
        }
        if (utils.isEmpty(obj.attachExcludePossibilityYn)) {
          utils.messageBox('warning',
            utils.strFormat(this.$t('MSG_ALT_ROW_INPUT'), key + 1, this.$t('MSG_TXT_ATTH_EXLD_PSBL_YN')),
            null, () => {
              // this.gridSetFocus(key, 'attachExcludePossibilityYn');
            });

          itemListFlag = false;
          return false;
        }

        if (utils.isEmpty(obj.multiLanguageList)) {
          utils.messageBox('warning',
            utils.strFormat(this.$t('MSG_ALT_ROW_INPUT'), key + 1, this.$t('MSG_TXT_MLNG_CNTN')),
            null, () => {
              // this.gridSetFocus(rowIndex, 'multiLanguageList');
            });

          itemListFlag = false;
          return false;
        }
        const emptyContent = utils.find(obj.multiLanguageList, { multiLanguageContent: '' });
        if (emptyContent) {
          utils.messageBox('warning',
            utils.strFormat(this.$t('MSG_ALT_ROW_INPUT'), key + 1, this.$t('MSG_TXT_MLNG_CNTN')),
            null, () => {
              // this.gridSetFocus(rowIndex, 'multiLanguageList');
            });

          itemListFlag = false;
          return false;
        }
        return itemListFlag;
      });

      return itemListFlag;
    },
    gridSetFocus(rowIndex, datafield) {
      this.$refs.grid.ensurerowvisible(rowIndex);

      const editor = this.$refs.grid.getCellEditor(rowIndex, datafield);

      if (editor) {
        editor.getComponentInstance().setFocus();
      }
    },
  },
};
</script>

<style scoped>
</style>
