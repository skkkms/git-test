<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>{{ $t('MSG_TXT_DEFAULT_INFO') }}</h4>
      </div>
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDLE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-module-submodule-select
              ref="smComboFrame0"
              class="dp_flex"
              :pageId="this.$options.name"
              :selectedMd="frame0.selectData.COD_MDLE"
              :selectedSmd="frame0.selectData.COD_SMDLE"
              :disabled="moduleDisabled"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MANU_ID')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <div class="comm_label">
              {{ manualId }}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MANU_NM')"
              :required="true"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <cmp-mlng-editor
              ref="mlngEditor"
              :pageId="this.$options.name"
              :multiLanguageId="frame0.documentMultiLanguageId"
              :vertical="false"
              :editable="true"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_VER')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              ref="documentVersion"
              v-model="frame0.documentVersion"
              mask="decimal"
              maxlength="3"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_EXPL')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <textarea
              v-model="frame0.documentContent"
              name="name"
              maxlength="1000"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_APPLY_PAGE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <sui-s-grid
              ref="pageGrid"
              :headers="gridColumns0"
              :data-source="dsPage"
              :options="options0"
              :showRowsPerPageControl="false"
              class="width100"
            >
              <template #left-info>
                <div class="comp_spacing" />
                <div class="btn_wrapL">
                  <ur-button
                    type="button"
                    class="comm_btn_gridTop"
                    small
                    @click="onPagePopup"
                  >
                    {{ $t('MSG_BTN_ADD') }}
                  </ur-button>
                  <ur-button
                    type="button"
                    class="comm_btn_gridTop"
                    style="margin-left: 4px;"
                    small
                    @click="onClickDel('dsPage')"
                  >
                    {{ $t('MSG_BTN_DEL') }}
                  </ur-button>
                </div>
              </template>
            </sui-s-grid>
          </div>
        </div>
        <div
          v-if="moduleDisabled"
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
              :pageId="$options.name"
              :displayType="'1'"
              :displayLanguageId="frame0.displayLanguageIdRegistration"
              :knoxId="frame0.knoxIdRegistration"
              :loginId="frame0.loginIdRegistration"
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
          v-if="moduleDisabled"
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
              :pageId="$options.name"
              :displayType="'1'"
              :displayLanguageId="frame0.displayLanguageIdModification"
              :knoxId="frame0.knoxIdModification"
              :loginId="frame0.loginIdModification"
              :userName="frame0.userNameModification"
              :userGlobalName="frame0.userGlobalNameModification"
              :departmentName="frame0.departmentNameModification"
              :departmentEnglishName="frame0.departmentEnglishNameModification"
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
        <h4>{{ $t('MSG_TXT_MANU_FILE') }}</h4>
      </div>
      <sui-s-grid
        ref="itemGrid"
        :headers="gridColumns2"
        :data-source="dsItem"
        :options="options1"
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
              style="margin-left: 4px;"
              small
              @click="onClickDel('dsItem')"
            >
              {{ $t('MSG_BTN_ROW_DEL') }}
            </ur-button>
          </div>
        </template>
      </sui-s-grid>
    </sui-page-contents>
    <sui-page-footer>
      <div class="comm_btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onClickClose"
        >
          {{ $t('MSG_BTN_CANCEL') }}
        </sui-button>
        <sui-button
          v-permission:update="$options.name"
          type="button"
          class="comm_btn_solid"
          @click="onClickSave"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </sui-button>
      </div>
    </sui-page-footer>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component/index';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

const dateFields = [
  'firstRegistrationDTM', 'finalModificationDTM', 'pageUsePriodStartDatetime', 'pageUsePriodFinishDatetime',
];
export default {
  name: 'PGE_CMU_00011', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    closePagePopup: {
      type: Function,
      default() {
        return null;
      },
    },
    pageInitialData: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      attachItemId: '',
      attachPossibilityExtensionCode: '',
      attachRestrictionSize: 0,
      options: [],
      frame0: {
        selectData: {
          COD_SMDLE: {
            label: '',
            key: '',
          },
          COD_MDLE: {
            label: '',
            key: '',
          },
        },
        // siteId: this.$t('MSG_TXT_ALL_SITE'),
        // siteHeadquarterYn: '',
        documentMultiLanguageId: '',
        documentContent: '',
        documentVersion: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        displayLanguageIdModification: '',
        displayLanguageIdRegistration: '',
        knoxIdModification: '',
        knoxIdRegistration: '',
        loginIdModification: '',
        loginIdRegistration: '',
        userNameModification: '',
        userNameRegistration: '',
        userGlobalNameModification: '',
        userGlobalNameRegistration: '',
        departmentNameModification: '',
        departmentNameRegistration: '',
        departmentEnglishNameModification: '',
        departmentEnglishNameRegistration: '',
      },
      // siteHeadquarterYn: null,
      moduleDisabled: false,
      multiLanguageId: '',

      options0: {
        selectCheck: true,
        selectCheckOnly: true,
        multiSelect: true,
      },
      options1: {
        selectCheck: true,
        selectCheckOnly: true,
        multiSelect: true,
      },

      // eslint-disable-next-line new-cap
      dsPage: new urDataSet(),
      // eslint-disable-next-line new-cap
      dsItem: new urDataSet(),
      dsColumnDelete: [],
      dsPageDelete: [],

    };
  },
  computed: {
    manualId() {
      if (!utils.isUndefined(this.pageInitialData.manualId) && !utils.isEmpty(this.pageInitialData.manualId)) {
        return this.pageInitialData.manualId;
      }
      return `MAN_${this.frame0.selectData.COD_SMDLE.key}_`;
    },
    documentId() {
      if (!utils.isUndefined(this.pageInitialData.manualId) && !utils.isEmpty(this.pageInitialData.manualId)) {
        return this.pageInitialData.manualId;
      }
      return '';
    },
    serviceName() {
      if (!utils.isUndefined(this.pageInitialData.manualId) && !utils.isEmpty(this.pageInitialData.manualId)) {
        return 'DTS_CMU_00058';
      }
      return 'DTS_CMU_00057';
    },
  },
  watch: {
  },
  created() {
    const that = this;
    this.localdata0 = [];
    this.localdata1 = [];
    this.localdata2 = [];
    this.localdata3 = [];
    this.localdata4 = [];
    this.localdata5 = [];
    this.gridColumns0 = [{
      text: this.$t('MSG_TXT_MDLE'),
      value: 'moduleName',
      width: '100px',
    }, {
      text: this.$t('MSG_TXT_SMDLE'),
      value: 'subModuleName',
      width: '100px',
    }, {
      text: this.$t('MSG_TXT_PAGE_ID'),
      value: 'pageId',
      width: '150px',
    }, {
      text: this.$t('MSG_TXT_PAGE_NM'),
      value: 'pageName',
    }];
    this.gridColumns2 = [{
      text: this.$t('MSG_TXT_LANG'),
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
      width: '100px',
    }, {
      text: this.$t('MSG_TXT_FILE_NM'),
      value: 'fileInfo',
      component: {
        props: ['row', 'value'],
        template: `
          <cell-attach-file-button
          ref="attch"
          :pageId = "'PGE_CMD_00011'"
          :row = "row"
          :attachPossibilityExtensionCode = "row.attachPossibilityExtensionCode"
          @fileChanged="getFile"
          />`,
        methods: {
          getFile(value) {
            this.row.fileInfo = value;
            that.updateData(this.row);
          },
        },
      },
    }];
  },
  mounted() {
    this.$nextTick(() => {
      this.attachInfoSearch();
    });
  },

  methods: {
    /**
     *  언어 selectBox optionList 생성
     */
    langOptionList() {
      http.request(this.pageId, 'DTS_CMY_00001').then(res => {
        let rowNum = 0;
        _.forEach(res.data, lang => {
          res.data[rowNum].label = lang.langName;
          res.data[rowNum].key = lang.langId;

          rowNum += 1;
        });
        this.options = res.data;

        // 초기  데이터 셋팅
        if (!utils.isUndefined(this.pageInitialData.manualId) && !utils.isEmpty(this.pageInitialData.manualId)) {
          this.setManualData();
          this.moduleDisabled = true;
        } else {
          this.moduleDisabled = false;
          // this.siteHeadquarterYn = true;
        }
      });
    },
    /**
     *  매뉴얼 관련 정보 조회
     */
    setManualData() {
      const pathParam = {
        'manual-id': this.manualId,
      };
      http.request(this.$options.name, 'DTS_CMU_00056', {
        path: pathParam,
      }).then(res => {
        utils.dateformatToClientInArray(res.data.manual, dateFields);
        // utils.dateformatToClientInArray(res.data.site, dateFields);
        utils.dateformatToClientInArray(res.data.page, dateFields);

        // 매뉴얼 기본정보
        utils.forEach(this.frame0, (value, key) => {
          if (utils.isEqual(key, 'selectData')) {
            this.frame0[key].COD_SMDLE.key = res.data.manual[0].subModuleCode;
            this.frame0[key].COD_MDLE.key = res.data.manual[0].moduleCode;
          } else {
            this.frame0[key] = res.data.manual[0][key];
          }
        });

        // 상세정보 첨부파일 셋팅
        const data = utils.clone(res.data.item);
        data.forEach((itm, index) => {
          data[index].attachGroupId = 'ATG_CMD_MANU';
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

        // 사업장
        // this.dsSite.setRawData(res.data.site);
        // this.frame0.siteId = utils.join(utils.map(this.dsSite.data, 'siteName'), ',');
        // 페이지
        this.dsPage.setData(res.data.page);
        // 상세목록
        this.dsItem.setData(data);

        // this.siteHeadquarterYn = utils.isEqual(this.frame0.siteHeadquarterYn, 'Y');
      });
    },
    /**
     *  사업장 선택 팝업
     */
    onSitePopup() {
      utils.openLayerPopup('PGE_CMY_00016', this.sitePopupCallback, {
        pageInitialData: {
          multiselect: true,
          siteName: '',
          siteAbbreviationName: '',
        },
        size: 'lg',
      });
    },
    sitePopupCallback(objSite) {
      if (objSite != null && !utils.isEmpty(objSite) && objSite.length > 0) {
        utils.remove(objSite, index => {
          const rowIndex = utils.findIndex(this.dsSite.data, o => utils.isEqual(o.siteId, index.siteId));

          return rowIndex > -1;
        });

        this.dsSite.addRows(objSite);

        this.frame0.siteId = utils.join(utils.map(this.dsSite.data, 'siteAbbreviationName'), ',');
      }
    },
    /**
     *  페이지 선택 공통 팝업
     */
    onPagePopup() {
      utils.openLayerPopup('PGE_CMU_00004', this.pagePopupCallback, {
        pageInitialData: {
          multiSelect: true,
        },
        size: 'lg',
      });
    },
    pagePopupCallback(objPage) {
      if (objPage != null && !utils.isEmpty(objPage) && objPage.length > 0) {
        utils.remove(objPage, index => {
          const rowIndex = utils.findIndex(this.dsPage.data, o => utils.isEqual(o.pageId, index.pageId));

          return rowIndex > -1;
        });

        utils.forEach(objPage, objItem => {
          // eslint-disable-next-line no-param-reassign
          objItem.__selected = false;
          this.dsPage.addRow(objItem);
        });
      }
    },
    /**
     *  grid button event
     */
    onClickDel(dataset) {
      const selected = this[dataset].getSelected();

      if (selected.length < 1) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM')); // 선택 된 항목이 없습니다.
        return false;
      }
      const removed = new Map();
      selected.forEach(item => {
        removed.set(item.__idx, item);
      });
      function checkDelete(item) {
        if (removed.has(item.__idx)) {
          return false;
        }
        return true;
      }
      const removedList = this[dataset].data.filter(checkDelete);
      this[dataset].setData([]);
      this.$nextTick(() => {
        this[dataset].setData(removedList);
      });
      selected.forEach(item => {
        if(dataset==="dsItem"){
          this.dsColumnDelete.push(item);
        }else{
          this.dsPageDelete.push(item);
        }
      });
      this[dataset].removeSelected();
      return null;
    },
    onClickAddRow() {
      const defaultRow = {
        rowType: 'insert',
        langId: 'ko',
        fileName: '',
        fileSize: '',
        attachGroupId: 'ATG_CMD_MANU',
        attachItemId: this.attachItemId,
        attachPossibilityExtensionCode: this.attachPossibilityExtensionCode,
        fileInfo: {
          fileUid: '',
          fileName: '',
          fileSize: '',
          fileExtensionName: '',
          realityFilePath: '',
        },
      };
      this.dsItem.addRow(defaultRow);
    },
    /**
     *  취소
     */
    onClickClose() {
      this.closePagePopup('');
    },
    /**
     *  저장
     */
    onClickSave() {
      const multiLanguageList = this.$refs.mlngEditor.getMlngEditingInfoFillEmptyWithGlobal();// 전사적용 선택 시 데이터.
      // const siteHeadquarterRow = [{ siteId: 'HDQT' }];
      // const siteHeadquarterDeleteList = utils.clone(this.dsSiteDelete.data);
      // siteHeadquarterDeleteList.push({ siteId: 'HDQT' });
      const dataParams = {
        documentId: this.documentId,
        moduleCode: this.frame0.selectData.COD_MDLE.key,
        subModuleCode: this.frame0.selectData.COD_SMDLE.key,
        documentVersion: this.frame0.documentVersion,
        documentContent: this.frame0.documentContent,
        documentMultiLanguageId: this.frame0.documentMultiLanguageId,
        // siteList: this.siteHeadquarterYn ? siteHeadquarterRow : this.dsSite.data,
        // siteDeleteList: this.siteHeadquarterYn ? this.dsSite.originalData : siteHeadquarterDeleteList,
        pageList: this.dsPage.data,
        pageDeleteList: this.dsPageDelete,
        manualItemList: this.dsItem.data,
        manualItemDeleteList: this.dsColumnDelete,
        multiLanguageList,
      };
      const pathParams = {
        'manual-id': this.manualId,
      };

      if (!this.validCheck()) return false;

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => {
        http.request(this.$options.name, this.serviceName, {
          data: dataParams,
          path: pathParams,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null, () => {
            this.closePagePopup('');
          });
        });
      });

      return null;
    },
    /**
     *  입력 체크
     */
    validCheck() {
      let flag = true;
      if (utils.isEmpty(utils.trim(this.frame0.selectData.COD_MDLE.key))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MDLE')),
          null, () => {});
        return false;
      }
      if (utils.isEmpty(utils.trim(this.frame0.selectData.COD_SMDLE.key))) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_SMDLE')),
          null, () => {});
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
      // 첨부파일 전체 용량 합계 변수
      let totalSize = 0;

      utils.forEach(this.dsItem.data, (obj, key) => {
        if (utils.isEmpty(obj.fileInfo.fileName)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ROW_INPUT_ATTAH_FILE'), key + 1));
          flag = false;
          return;
        }
        if (utils.isEmpty(obj.langId)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ROW_SELECT'), key + 1, this.$t('MSG_TXT_LANG')));
          flag = false;
        }
        totalSize += utils.parseInt(obj.fileInfo.fileSize);
      });

      // MB 단위로 변경
      totalSize /= (1024 * 1024);

      if (this.attachRestrictionSize < utils.parseInt(totalSize)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ECXD_TTQTY_NCELL'), this.attachRestrictionSize));
        return false;
      }
      return flag;
    },
    /**
     * 첨부그룹 itemId,확장자code 조회
     */
    attachInfoSearch() {
      http.request(this.$options.name, 'DTS_CMD_00008', {
        path: {
          'attach-group-id': 'ATG_CMD_MANU',
        },
      }).then(res => {
        this.attachItemId = res.data[0].attachItemId;
        this.attachPossibilityExtensionCode = res.data[0].attachPossibilityExtensionCode;
        this.attachRestrictionSize = res.data[0].attachRestrictionSize;
        this.langOptionList();
      });
    },

    updateData(row) {
      this.dsItem.data[row.__idx] = row;
    },
  },
};
</script>
<style scoped>
</style>
