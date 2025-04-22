<template>
  <div>
    <div class="comm_popup_wrap_large" style="padding-bottom:20px">
      <div class="comm_title_wrap">
        <h4>{{ $t("MSG_TXT_DEFAULT_INFO") }}</h4>
      </div>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="smComboFrame0"
              :pageId="pageId"
              :selectedMd="frame0.selectData.COD_MDLE"
              :selectedSmd="frame0.selectData.COD_SMDLE"
              :disabled="multiLanguageIdDisableYn"
              defaultMdOption="select"
              defaultSmdOption="select"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_STD_FORM_ID')" />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ standardFormId }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_STD_FORM_NM')"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <cmp-mlng-editor
              ref="mlngEditor"
              :pageId="pageId"
              :vertical="false"
              :editable="true"
              :multiLanguageId="frame0.documentMultiLanguageId"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_VER')"
              :required="true"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model.trim="frame0.documentVersion"
              mask="decimal"
              maxlength="3"
              :disabled="false"
              :readonly="false"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label :label="$t('MSG_TXT_DETAIL_CNTN')" />
          </div>
          <div class="col-xs-11">
            <textarea
              v-model.trim="frame0.documentContent"
              maxlength="1000"
            />
          </div>
        </div>
        <div
          v-if="multiLanguageIdDisableYn"
          class="row"
        >
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_RGST_USR')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <cmp-user-name-link
              :pageId="pageId"
              :displayType="'1'"
              :displayLanguageId="frame0.displayLanguageIdRegistration"
              :loginId="frame0.loginIdRegistration"
              :knoxId="frame0.knoxIdRegistration"
              :userName="frame0.userNameRegistration"
              :userGlobalName="frame0.userGlobalNameRegistration"
              :departmentName="frame0.departmentNameRegistration"
              :departmentEnglishName="frame0.departmentEnglishNameRegistration"
              :type="'link'"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_RGST_DTM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ frame0.firstRegistrationDTM }}
            </div>
          </div>
        </div>
        <div
          v-if="multiLanguageIdDisableYn"
          class="row"
        >
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDFC_USR')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <cmp-user-name-link
              :pageId="pageId"
              :displayType="'1'"
              :displayLanguageId="frame0.displayLanguageId"
              :loginId="frame0.loginId"
              :knoxId="frame0.knoxId"
              :userName="frame0.userName"
              :userGlobalName="frame0.userGlobalName"
              :departmentName="frame0.departmentName"
              :departmentEnglishName="frame0.departmentEnglishName"
              :type="'link'"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDFC_DTM')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ frame0.finalModificationDTM }}
            </div>
          </div>
        </div>
      </div>
      <div class="mrB30" />
      <div class="comm_title_wrap">
        <h4>{{ $t("MSG_TXT_STD_FORM_FILE") }}</h4>
      </div>
      <div class="mrT10" />
      <sui-s-grid
        ref="grid0"
        :data-source="dsAttachItem"
        :options="options0"
        :initialRowsPerPage="3"
        :headers="gridColumns0"
        :showRowsPerPageControl="false"
      >
        <template #left-info>
          <div class="comp_spacing" />
          <div class="btn_wrapL">
            <ur-button
              type="button"
              class="comm_btn_gridTop"
              small
              @click="onClickAddRow"
            >
              {{ $t('MSG_BTN_ROW_ADD') }}
            </ur-button>
            <ur-button
              type="button"
              class="comm_btn_gridTop"
              style="margin-left:8px"
              small
              @click="onClickDeleteRow"
            >
              {{ $t('MSG_BTN_DEL') }}
            </ur-button>
          </div>
        </template>      
      </sui-s-grid>
    </div>
    <div class="comm_btn_wrap mrL30 mrR30">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onClickClose"
      >
        {{ $t("MSG_BTN_CANCEL") }}
      </sui-button>
      <sui-button
        v-permission:update="pageId"
        type="button"
        class="comm_btn_solid"
        @click="onClickSave"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line import/no-unresolved
import { urDataSet } from 'uidev-component/index.js';
import BasePage from '~cm/components/BasePage';

const gridEditor = utils.getGridCellFactory();

export default {
  name: 'PGE_CMD_00001_P01', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    selectedGridRowData: {
      type: Object,
      default: null,
    },
    pageId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      deleteList: [],
      attachItemId: '',
      attachPossibilityExtensionCode: '',
      attachRestrictionSize: 0,
      options: [],
      codes: {},
      multiLanguageIdDisableYn: true,
      msgEditorPopupShow: false,
      selectedCodeValue: {
        COD_MDLE: {
          label: '',
          key: '',
        },
      },
      count: 0,
      localdata0: [],
      gridColumns0: [],
      frame0: {
        selectData: {
          COD_MDLE: {
            label: '',
            key: ' ',
          },
          COD_SMDLE: {
            label: '',
            key: ' ',
          },
        },
        standardFormId: '',
        documentName: '',
        documentVersion: '',
        documentContent: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        finalModificationUserId: '',
        finalModificationDTM: '',
        documentId: '',
        documentMultiLanguageId: '',
        loginId: '',
        knoxId: '',
        userName: '',
        userGlobalName: '',
        departmentName: '',
        departmentEnglishName: '',
        loginIdRegistration: '',
        knoxIdRegistration: '',
        userNameRegistration: '',
        userGlobalNameRegistration: '',
        departmentNameRegistration: '',
        departmentEnglishNameRegistration: '',
        displayLanguageId: '',
        displayLanguageIdRegistration: '',
      },
      options0: {
        selectCheck: true,
        selectCheckOnly: true,
        multiSelect: true,
      },
      dsAttachItem: new urDataSet(),
    };
  },
  computed: {
    standardFormId() {
      if (this.selectedGridRowData) {
        return this.frame0.documentId;
      }

      return `FOM_${this.frame0.selectData.COD_SMDLE.key}_`;
    },
    standardFormPreId() {
      return `FOM_${this.frame0.selectData.COD_SMDLE.key}_`;
    },
  },
  mounted() {
    const that = this;
    this.gridColumns0 = [{
      text: this.$t('MSG_TXT_LANG_DIV'),
      width: '100px',
      value: 'langId',
      component: {
        props: ['row', 'value'],
        template: `
            <sui-select-box
            ref="select"
            :value="selectedOption"
            :option-list="optionList"
            @input="onChange"       
          /> `,
        data() {
          return {
            optionList: that.options,
            selectedOption: utils.find(that.options, { key: this.value }),
          };
        },
        methods: {
          onChange(value) {
            this.row.langId = value.langId;
            that.updateData(this.row);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_FILE_NM'),
      value: 'fileInfo',
      width: '400px',
      component: {
        props: ['row', 'value'],
        template: `
          <cell-attach-file-button
          ref="attch"
          :pageId = "'PGE_CMD_00001'"
          :row = "row"
          :attachPossibilityExtensionCode = "row.attachPossibilityExtensionCode"
          @fileChanged="getFile"
          />`,
        watch: {
          row: {
            handler() {
              this.$refs.attch.setValue(this.row.fileInfo);
            },
            deep: true,
          },

        },
        methods: {
          getFile(value) {
            this.row.fileInfo = value;
            that.updateData(this.row);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_NOTE'),
      value: 'documentDetailContent',
      maxlength: 1000,
      component: {
        props: ['row', 'value'],
        template: `
          <ur-text-field
            v-model="row.documentDetailContent"
            @input="onChange"
          />`,
        methods: {
          onChange() {
            that.updateData(this.row);
          },
        },
      },
    }];
    this.$nextTick(() => {
      this.attachInfoSearch();
    });
  },
  methods: {
    updateData(row) {
      this.dsAttachItem.data[row.__idx] = row;
    },
    /**
     * 언어 optionList 조회
     */
    langOptionList() {
      http.request(this.pageId, 'DTS_CMY_00001').then(res => {
        _.forEach(res.data, (lang, key) => {
          res.data[key].label = lang.langName;
          res.data[key].key = lang.langId;
        });
        this.options = res.data;
        /**
        * 언어 optionList 생성 후 data SET
        * 언어 optionList 생성 전에 grid Data set하면 언어 optionList가 안보이는 현상 있음.
        */
        if (!utils.isEmpty(this.selectedGridRowData)) {
          this.selectDataFormInput(this.selectedGridRowData);
        } else {
          this.clearDataFormInput();
        }
      });
    },
    /**
     * grid button event
     */
    onClickAddRow() {
      const defaultRow = {
        rowType: 'I',
        checkBox: '',
        langId: 'ko',
        fileName: '',
        fileSize: '',
        attachGroupId: 'ATG_CMD_STD_FORM',
        attachItemId: this.attachItemId,
        attachPossibilityExtensionCode: this.attachPossibilityExtensionCode,
        fileInfo: {
          fileName: '',
          fileSize: '',
          fileExtensionName: '',
          arrayalOrder: 1,
          file: null,
          realityFilePath: '',
        },
      };
      this.dsAttachItem.addRow(defaultRow, 0);
    },
    onClickDeleteRow() {
      const deleteRows = this.dsAttachItem.getSelected();
      if (deleteRows.length < 2) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return false;
      }
      utils.forEach(deleteRows, deleteRow => {
        this.dsAttachItem.removeRow(deleteRow);
      });
      this.deleteList = deleteRows;
      this.dsAttachItem.removeSelected();
    },
    /**
     * 저장
     */
    onClickSave() {
      const multiLanguageList = this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal();
      const serviceName = (utils.isEmpty(this.selectedGridRowData) ? 'DTS_CMD_00002' : 'DTS_CMD_00006');
      const dataParams = {
        moduleCode: this.frame0.selectData.COD_MDLE.key,
        subModuleCode: this.frame0.selectData.COD_SMDLE.key,
        documentId: this.frame0.documentId,
        documentName: this.frame0.documentName,
        documentVersion: this.frame0.documentVersion,
        documentContent: this.frame0.documentContent,
        documentMultiLanguageId: this.frame0.documentMultiLanguageId,
        documentAttachList: this.dsAttachItem.data,
        documentAttachDeleteList: this.deleteList,
        multiLanguageList,
      };

      if (!this.validCheck()) return false; // null 값 체크

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
        this.dataSave(serviceName, dataParams);
      });

      return null;
    },
    dataSave(serviceName, dataParams) {
      http.request(this.pageId, serviceName, {
        data: dataParams,
      }).then(() => {
        utils.messageBox('information', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
          this.$emit('onClickSearch');
          this.$emit('onClickClose');
        });
      });
    },
    /**
     * 닫기
     */
    onClickClose() {
      this.$emit('onClickClose');
    },
    /**
     * 표준양식 정보 SET
     */
    selectDataFormInput(obj) {
      const rowData = obj;

      // 표준 양식 기본정보
      utils.forEach(this.frame0, (value, key) => {
        switch (key) {
          case 'selectData':
            this.frame0.selectData.COD_MDLE.key = rowData.moduleCode;
            this.frame0.selectData.COD_SMDLE.key = rowData.subModuleCode;
            break;
          default:
            this.frame0[key] = rowData[key];
            break;
        }
      });
      this.multiLanguageIdDisableYn = true;

      // 표준 양식 첨부 정보
      http.request(this.pageId, 'DTS_CMD_00005', {
        path: {
          'standard-form-id': this.frame0.documentId,
        },
      }).then(res => {
        const data = utils.clone(res.data);
        data.forEach((itm, index) => {
          data[index].attachGroupId = 'ATG_CMD_STD_FORM';
          data[index].attachItemId = this.attachItemId;
          data[index].attachPossibilityExtensionCode = this.attachPossibilityExtensionCode;

          data[index].fileInfo = {
            fileUid: itm.fileUid,
            fileName: itm.fileName,
            fileSize: itm.fileSize,
            fileExtensionName: itm.fileExtensionName,
            realityFilePath: itm.realityFilePath,
          };
        });
        this.dsAttachItem.setData(data); // 데이터 셋에 데이터를 넣는 함수
      });
    },
    /**
     * 리셋
     */
    clearDataFormInput() {
      this.localdata0 = [];
      utils.forEach(this.frame0, (value, key) => {
        switch (key) {
          case 'selectData':
            // this.$refs.smComboFrame0.reset();
            this.frame0.selectData.COD_MDLE.key = ' ';
            this.frame0.selectData.COD_SMDLE.key = ' ';
            break;
          default:
            this.frame0[key] = '';
            break;
        }
      });

      this.multiLanguageIdDisableYn = false;

      this.dsAttachItem.setData(this.localdata0);
    },
    /**
     * 입력 체크
     */
    validCheck() {
      const attachList = this.dsAttachItem.data;
      let flag = true;

      if (utils.isEmpty(utils.trim(this.frame0.selectData.COD_MDLE.key))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MDLE')));
        return false;
      }
      if (utils.isEmpty(utils.trim(this.frame0.selectData.COD_SMDLE.key))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SMDLE')));
        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.localTxtFld.value))) {
        // local 언어를 입력해주세요
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_LOCAL_LNG')),
          null,
          () => {
            this.$refs.mlngEditor.setFocusLocalTxtFld();
          });

        return false;
      }
      if (utils.isEmpty(utils.trim(this.$refs.mlngEditor.$refs.globalTxtFld.value))) {
        // global 언어를 입력해주세요
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_GLOBAL_LNG')),
          null,
          () => {
            this.$refs.mlngEditor.setFocusGlobalTxtFld();
          });

        return false;
      }
      if (utils.isEmpty(utils.trim(this.frame0.documentVersion))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_VER')));
        return false;
      }

      let totalSize = 0;
      utils.forEach(attachList, (obj, key) => {
        if (utils.isEmpty(obj.fileInfo.fileName)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ROW_INPUT_ATTAH_FILE'), key + 1));
          flag = false;
          return false;
        }
        if (utils.isEmpty(obj.langId)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ROW_SELECT'), key + 1, this.$t('MSG_TXT_LANG')));
          flag = false;
          return false;
        }

        totalSize += obj.fileInfo.fileSize;

        return null;
      });

      totalSize /= (1024 * 1024);
      if (this.attachRestrictionSize < totalSize) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ECXD_TTQTY_NCELL'), this.attachRestrictionSize));
        return false;
      }
      return flag;
    },
    /**
     * 첨부그룹 itemId,확장자code 조회
     */
    attachInfoSearch() {
      http.request(this.pageId, 'DTS_CMD_00008', {
        path: {
          'attach-group-id': 'ATG_CMD_STD_FORM',
        },
      }).then(res => {
        this.attachItemId = res.data[0].attachItemId;
        this.attachPossibilityExtensionCode = res.data[0].attachPossibilityExtensionCode;
        this.attachRestrictionSize = res.data[0].attachRestrictionSize;
        this.langOptionList();
      });
    },

  },
};
</script>
<style scoped>
</style>
