<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MLNG_TYPE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="codMlngType"
              :selected="frame0.selectedCodeValue.COD_MLNG_TYPE"
              codeId="COD_MLNG_TYPE"
              :initialSelectedIndex="0"
              @loaded="onMlngTypeLoaded"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_LANG')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-lang-select
              ref="codItgrLng"
              :selected="frame0.selectedCodeValue.COD_ITGR_LNG"
              :pageId="this.$options.name"
              @loaded="onLangLoaded"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEARCH_COND')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="searchCond"
              :selected="frame0.selectedCodeValue.COD_MLNG_SEARCH_COND"
              codeId="COD_MLNG_SEARCH_COND"
              :customOpitonList="selCodes.allOption"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model="condContent"
              @keyup="onKeyUpInput"
              @keyup.enter="onSearch"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_Reset"
            @click="onReset"
          >
            {{ $t('MSG_BTN_RESET') }}
          </sui-button>
          <sui-button
            v-permission:read="contextPageId"
            type="button"
            class="comm_btn_Scr"
            @click="onSearch"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="grdMaster"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="10"
        :headers="columnMaster"
        :data-source="dsMaster"
        :options="optionsMaster"
        @grid:selected="onSelectGridMaster"
      >
        <template #right-info>
          <div class="comm_gridTop_wrap">
            <div class="btn_wrapR">
              <sui-button
                v-permission:download="contextPageId"
                type="button"
                class="comm_btn_gridTop comm_ico_excel"
                @click="onExcelDowonLoad"
                @grid:scroll-bottom="onAddList"
              >
                {{ $t('MSG_BTN_EXCEL_DOWN') }}
              </sui-button>
              <!-- <sui-file-uploader
                :btnLabel="$t('MSG_BTN_EXCEL_UPLOAD')"
                class="comm_btn_gridTop comm_ico_excel"
                acceptExt=".xlsx"
                @change="onExcelUpLoad"
              /> -->
            </div>
          </div>
        </template>
      </sui-s-grid>
      <div class="btn_moreView">
        <p>
          {{ showMoreCount }}
        </p>
      </div>
      <div class="mrB10" />
      <!--
      <sui-grid
        ref="grdDetail"
        :columnsheight="20"
        :initialPagesize="10"
        :showDisplayCountControl="false"
        :pageable="false"
        :sortable="false"
        :filterable="false"
        :columns="columnDetail"
        :columngroups="gridColumgroups"
        :columnsresize="true"
        :columnsautoresize="true"
        :enabletooltips="true"
        :editable="true"
        :selectionmode="'singlecell'"
        :editmode="'click'"
        width="100%"
        :dataset="'dsDetail'"
      />
      -->
      <sui-s-grid
        ref="grdDetail"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="5"
        :headers="columnDetail"
        :data-source="dsDetail"
        :options="optionsGridDetail"
      >
        <template #header>
          <!-- 1st row -->
          <!-- <ur-data-grid-header-row>
            <ur-data-grid-header-cell
              rowspan="2"
            />
            <ur-data-grid-header-cell
              colspan="2"
              text="다국어"
            />
            <ur-data-grid-header-cell
              colspan="2"
              text="약어"
            />
            <ur-data-grid-header-cell
              rowspan="2"
            />
          </ur-data-grid-header-row> -->

          <ur-data-grid-header-row>
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell :text="$t('MSG_TXT_MLNG_CNTN')" />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell :text="$t('MSG_TXT_ABBR_CNTN')" />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell />
          </ur-data-grid-header-row>
          <!-- 2nd row -->
          <!-- <ur-data-grid-header-row>
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell />
          </ur-data-grid-header-row> -->
        </template>
      </sui-s-grid>

      <div class="comm_btn_wrap">
        <sui-button
          v-permission:update="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="onSave"
        >
          {{ $t("MSG_BTN_SAVE") }}
        </sui-button>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
// import - libraries (node modules)
// import - local files (js, vue, ...)
// 페이지 에서 사용하는 code 목록 기술
import BasePage from '~cm/components/BasePage';
import {urDataSet} from 'uidev-component/index.js';

export default {
  name: 'PGE_CMZ_00007', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  data() {
    return {
      // eslint-disable-next-line new-cap
      dsMaster: new urDataSet(),
      // eslint-disable-next-line new-cap
      dsDetail: new urDataSet(),
      optionsMaster: {
      },
      optionsGridDetail: {
        noInfo: true,
        cellEdit: true,
        keepEditable: true,
      },
      isPageing: false,
      pageing: {
        pagePerCount: 5000,
        currentPage: 1,
        totalCount: 0,
        count: 0,
      },

      langData: [],

      // 더보기 SearchBox
      showMoreSearchBox: {},

      condContent: '',
      searchFieldOldText: '',
      selCodes: CommonConstants.selectOptions(),
      frame0: {
        selectedCodeValue: {
          COD_MLNG_TYPE: { key: '', label: '' },
          COD_ITGR_LNG: { key: '', label: '' },
          COD_MLNG_SEARCH_COND: { key: '', label: '' },
        },
      },
      mlngTypeKey: '',
      langKey: '',
      oldRowIndex: -1,
    };
  },
  created() {
    let that = this;
    this.columnMaster = [
      {
        text: this.$t('MSG_TXT_MLNG_TYPE'),
        value: 'multiLanguageTypeName',
        width: '200',
      },
      {
        text: this.$t('MSG_TXT_LANG'),
        value: 'langName',
        width: '150',
      },
      {
        text: this.$t('MSG_TXT_MLNG_ID'),
        value: 'multiLanguageId',
      },
      {
        text: this.$t('MSG_TXT_MLNG_CNTN'),
        value: 'multiLanguageContent',
      },
      {
        text: this.$t('MSG_TXT_MDFC_USR'),
        value: 'finalModificationUserName',
        width: '200px',
        component: {
          props: ['row', 'value'],
          template:
            `<cmp-user-name-link
              :pageId="'${this.contextPageId}'"
              :displayType="'3'"
              :displayLanguageId="row.displayLanguageId"
              :userId="row.userId"
              :knoxId="row.knoxId"
              :loginId="row.loginId"
              :userName="row.userName"
              :userGlobalName="row.userGlobalName"
              :departmentName="row.departmentName"
              :departmentEnglishName="row.departmentEnglishName"
              :type="'link'"
            />`,
        },
      },
      {
        text: this.$t('MSG_TXT_MDFC_DTM'),
        value: 'finalModificationDTM',
        width: '150px',
        customValue(value) {
          return utils.dateformatToClient(value);
        },
      },
    ];
    this.columnDetail = [
      /*
      {
        text: this.$t('MSG_TXT_LANG'),
        value: 'multiLanguageId',
        width: 150,
        key: true,
        hide: true,
      },
      */
      {
        text: this.$t('MSG_TXT_LANG'),
        value: 'langName',
        width: 200,
        edit: false,
      },
      {
        text: this.$t('MSG_TXT_VAL'),
        value: 'content',
        // type: 'string',
        edit: true,
      },
      {
        text: this.$t('MSG_TXT_EDIT'),
        value: 'mlngEditButton',
        width: 80,
        type: 'string',
        edit: false,
        readonly: true,
        component: {
          props: ['row', 'value', 'text', 'edit'], // provided by grid
          template: `
            <sui-button
              type="button"
              class="border"
              @click.stop="onMlngContentEditButtonClicked(row, edit)"
            >
              {{ $t('MSG_TXT_EDIT') }}
            </sui-button>`,
          methods: {
            onMlngContentEditButtonClicked(dataRow, edit) {
              console.log(edit);
              utils.openTextAreaEditor(chgVal => {
                if (chgVal != null) {
                  that.dsDetail.setRowValue(dataRow.__id, 'content', chgVal);
                }
              },
              {
                title: `${dataRow.langName}-${this.$t('MSG_TXT_MLNG_CNTN')}`,
                size: 'sm',
                pageInitialData: {
                  value: dataRow.content,
                  maxlength: 1000,
                  positiveButtonText: this.$t('MSG_BTN_CFRM'),
                  negativeButtonText: this.$t('MSG_BTN_CANCEL'),
                },
              });
            },
          },
        },
      },
      {
        text: this.$t('MSG_TXT_VAL'),
        value: 'abbreviationContent',
        edit: true,
      },
      {
        text: this.$t('MSG_TXT_EDIT'),
        value: 'abbrEditButton',
        width: 80,
        type: 'string',
        edit: false,
        readonly: true,
        component: {
          props: ['row', 'value', 'text'], // provided by grid
          template: `
            <sui-button
              type="button"
              class="border"
              @click.stop="onAbbreviationEditButtonClicked(row)"
            >
              {{ $t('MSG_TXT_EDIT') }}
            </sui-button>`,
          methods: {
            onAbbreviationEditButtonClicked(dataRow) {
              utils.openTextAreaEditor(chgVal => {
                if (chgVal != null) {
                  that.dsDetail.setRowValue(dataRow.__id, 'abbreviationContent', chgVal);
                }
              },
              {
                title: `${dataRow.langName}-${this.$t('MSG_TXT_ABBR')}`,
                size: 'sm',
                pageInitialData: {
                  value: dataRow.abbreviationContent,
                  maxlength: 1000,
                  positiveButtonText: this.$t('MSG_BTN_CFRM'),
                  negativeButtonText: this.$t('MSG_BTN_CANCEL'),
                },
              });
            },
          },
        },
      },
      {
        text: this.$t('MSG_TIT_BK_APPLY'),
        value: 'bulkApplyButton',
        width: 150,
        type: 'string',
        edit: false,
        readonly: true,
        click: (value, row, field, e = null, that = this) => {
          that.dsDetail.getRawData().forEach(item => {
            if (item.langId !== 'en') {
              if (utils.isEmpty(item.content)) {
                that.dsDetail.setRowValue(item.__id, 'content', row.content);
              }
              if (utils.isEmpty(item.abbreviationContent)) {
                that.dsDetail.setRowValue(item.__id, 'abbreviationContent', row.abbreviationContent);
              }
            }
          });
          return true;
        },
        component: {
          props: ['row', 'value', 'text'], // provided by grid
          template: `
            <sui-button
              type="button"
              class="border"
              v-if="row.langId=='en'"
            >
              {{ $t('MSG_TIT_BK_APPLY') }}
            </sui-button>`,
          methods: {
            onBulkApplyButtonClicked(page) {
              page.dsDetail.forEach((item, key) => {
                if (item.langId !== 'en') {
                  if (utils.isEmpty(item.content)) {
                    this.dsDetail.content = this.row.content;
                  }
                  if (utils.isEmpty(item.abbreviationContent)) {
                    this.dsDetail.abbreviationContent = this.row.abbreviationContent;
                  }
                }
              });
            },
          },
        },
        /*
        createwidget: (row, column, value, htmlElement) => {
          if (row.visibleindex === 1) {
            utils.getGridCellFactory().createCellButtonList(row, column, value, htmlElement, {
              handler: this.onBulkApplyButtonClicked,
            }, this.dsDetail, this.$refs.grdDetail);
          }
        },
        initwidget(row, column, value, htmlElement) {
          if (row.visibleindex === 1) {
            utils.getGridCellFactory().refreshCell(row, column, value, htmlElement);
          }
        },
        */
      }
    ];
  },
  computed: {
    // 계산된 속성, property로 사용가능
    showMoreCount() {
      return `${ utils.numberFormat(this.pageing.count)} / ${utils.numberFormat(this.pageing.totalCount)}`;
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
    count() {},
  },
  mounted() {
    // DOM이 document에 append된 상태, 실제 element에 접근 가능 (this.$el or this.$refs)
    // 주로 데이터 패치 등을 함
    this.loadData();

  },
  methods: {
    loadData() {
      // get contents data, grid etc..
      this.defaultValues = utils.clone(this.frame0.selectedCodeValue);
    },
    onReset() {
      this.$refs.codMlngType.reset();
      this.$refs.codItgrLng.reset();
      this.$refs.searchCond.reset();
      this.frame0.selectedCodeValue.COD_MLNG_TYPE.key = this.mlngTypeKey;
      this.$refs.codItgrLng.select(this.langKey);
      this.condContent = '';
    },
    onMlngTypeLoaded(optionsList) {
      this.mlngTypeKey = optionsList[0].key;
    },
    onLangLoaded(optionsList) {
      const { langId } = this.$store.getters.userInfo;
      this.langKey = utils.isEmpty(langId) || utils.isUndefined(langId)
        ? 'en'
        : langId;

      // this.langKey = optionsList[0].key;
      this.$refs.codItgrLng.select(this.langKey);

      this.langData = [];

      utils.forEach(optionsList, item => {
        if (utils.isEqual(item.key, 'ALL') === false) {
          this.langData.push(this.setLangData(item.label, item.key));
        }
      });
      this.$refs.grdDetail.onChangePageSize(this.langData.length);
    },
    onAddList() {
      if (this.isPageing) {
        this.pageing.currentPage += 1;
        this.selectMultiInfo();
      }
    },
    onSearch(selectedMultiLanguageId = '') {
      this.pageing.currentPage = 1;
      this.pageing.totalCount = 0;
      this.pageing.count = 0;

      this.dsMaster.setData([]);
      this.dsDetail.setData([]);

      this.setShowMoreSearchBox();
      this.selectMultiInfo(selectedMultiLanguageId);
    },
    setShowMoreSearchBox() {
      const codeValues = this.frame0.selectedCodeValue;

      let codLangKey = '';

      if (codeValues.COD_ITGR_LNG.key !== 'ALL') {
        codLangKey = codeValues.COD_ITGR_LNG.key;
      }

      const condCode = utils.trim(codeValues.COD_MLNG_SEARCH_COND.key) === 'ALL' ? ''
        : utils.trim(codeValues.COD_MLNG_SEARCH_COND.key);

      const queryParams = {
        multiLanguageTypeCode: codeValues.COD_MLNG_TYPE.key || '',
        langId: codLangKey || '',
        condCode,
        condWord: this.condContent || '',
      };

      this.showMoreSearchBox = queryParams;
    },
    selectMultiInfo(selectedMultiLanguageId = '') {
      const queryParams = utils.cloneDeep(this.showMoreSearchBox);

      utils.assign(queryParams, { currentPage: this.pageing.currentPage });

      http.request(this.$options.name, 'DTS_CMZ_00022', {
        query: queryParams,
      }).then(res => {
        if (utils.isUndefined(res.data) === false && res.data.length === this.pageing.pagePerCount) {
          this.isPageing = true;
        } else {
          this.isPageing = false;
        }

        if (res.data) {
          const newLocalData = [];
          utils.forEach(res.data, item => {
            // End GridSelection
            const mlngItem = {
              multiLanguageTypeName: item.multiLanguageTypeName,
              multiLanguageTypeCode: item.multiLanguageTypeCode,
              langName: item.langName,
              langId: item.langId,
              multiLanguageId: item.multiLanguageId,
              multiLanguageContent: item.multiLanguageContent,
              multiLanguageAbbreviationContent: item.multiLanguageAbbreviationContent,
              loginId: item.loginId,
              userId: item.userId,
              finalModificationUserId: item.finalModificationUserId,
              knoxId: item.knoxId,
              userName: item.userName,
              userGlobalName: item.userGlobalName,
              departmentName: item.departmentName,
              departmentEnglishName: item.departmentEnglishName,
              displayLanguageId: item.displayLanguageId,
              // finalModificationDTM: item.finalModificationDTM,
              finalModificationDTM: utils.dateformatToClient(item.finalModificationDTM),
            };
            newLocalData.push(mlngItem);
          });

          const union = utils.mergeArray(this.dsMaster.getRawData(), newLocalData);
          this.dsMaster.setData(union);
          if (selectedMultiLanguageId) {
            this.$refs.grdMaster.setSelect({ multiLanguageId: selectedMultiLanguageId });
          }

          this.pageing.count = this.dsMaster.getRawData().length;
          if (res.data.length > 0) {
            this.pageing.totalCount = res.data[0].totalCount;
          }

          this.$refs.grdDetail.resetSelect();
          // grid rowState 초기화
          // 메뉴 이동 시 '저장되지 않은 데이터가 있습니다. 이동하시겠습니까?' alert 안나오도록 조치
          // this.dsData.sumbit();
        }
      }).catch(error => {
        console.log(error);
      });
    },
    selectDetailInfo(newSelection) {
      let mlnId = '';
      let multiTypeCode = '';

      if (newSelection.multiLanguageId) {
        mlnId = newSelection.multiLanguageId;
      }

      if (newSelection.multiLanguageTypeCode) {
        multiTypeCode = newSelection.multiLanguageTypeCode;
      }

      const pathParams = {
        'multi-languages-id': mlnId,
      };

      http.request(this.contextPageId, 'DTS_CMZ_00023', {
        path: pathParams,
        query: {
          tenantId: '',
        },
      }).then(res => {
        const tempData = [];
        utils.forEach(this.langData, item => {
          let index = -1;
          let content = '';
          let abbreviationContent = '';
          index = utils.findIndex(res.data, dataInfo => dataInfo.langId === item.langId);
          if (index > -1) {
            content = res.data[index].multiLanguageContent;
            abbreviationContent = res.data[index].multiLanguageAbbreviationContent;
          }

          tempData.push({
            langName: item.langName,
            langId: item.langId,
            multiLanguageId: mlnId,
            content,
            abbreviationContent,
            multiLanguageTypeCode: multiTypeCode,
            mlngEditButton: [{ key: '', label: this.$t('MSG_BTN_EDIT'), type: 'button' }],
            abbrEditButton: [{ key: '', label: this.$t('MSG_BTN_EDIT'), type: 'button' }],
            bulkApplyButton: [{ key: '', label: this.$t('MSG_TIT_BK_APPLY'), type: 'button' }],
          });
        });

        // this.dsDetail.setRawData(tempData);
        this.dsDetail.setData(tempData);
      }).catch(error => {
        console.log(error);
      });
    },
    onSelectGridMaster(newSelection) {
      if (newSelection) {
        this.selectDetailInfo(newSelection);
      } else {
        this.dsDetail.setData([]);
      }
    },
    onExcelDowonLoad() {
      const metaObj = {
        headerTitle: {
          multiLanguageTypeCode: this.$t('MSG_TXT_MLNG_TYPE'),
          langId: this.$t('MSG_TXT_LNG_ID'),
          langName: this.$t('MSG_TXT_LANG'),
          multiLanguageId: this.$t('MSG_TXT_MLNG_ID'),
          multiLanguageContent: this.$t('MSG_TXT_MLNG_CNTN'),
          finalModificationUserName: this.$t('MSG_TXT_MDFC_USR'),
          finalModificationDTM: this.$t('MSG_TXT_MDFC_DTM'),
        },
        headerFontSize: 16,
        headerFontColor: 1,
        headerForegroundColor: 22,
      };

      const grdData = [];
      utils.forEach(this.dsMaster.data, obj => {
        const userName = utils.isEqual(obj.displayLanguageId, this.$store.getters.userInfo.langId)
          ? obj.userName
          : obj.userGlobalName;

        const objData = {
          multiLanguageTypeCode: utils.trim(obj.multiLanguageTypeName),
          langId: utils.trim(obj.langId),
          langName: utils.trim(obj.langName),
          multiLanguageId: utils.trim(obj.multiLanguageId),
          multiLanguageContent: utils.trim(obj.multiLanguageContent),
          finalModificationUserName: !utils.isEmpty(userName) ? `${userName}` : '',
          finalModificationDTM: utils.trim(obj.finalModificationDTM),
        };
        grdData.push(objData);
      });

      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `mlng-data_${sToday}.xlsx`;
      utils.downloadDataToExcel(this.contextPageId, this.gridColumns, grdData, sExcelName, metaObj);
    },
    onExcelUpLoad(file) {
      const formData = new FormData();
      formData.append('file', file[0]);
      http.request(this.contextPageId, 'DTS_CMZ_00066', {
        data: formData,
      }).then(() => {
        this.onSearch();
      });
    },
    onSave() {
      const paramList = [];

      utils.forEach(this.dsDetail.data, data => {
        const dataParams = this.setParamList(data);
        if (dataParams) {
          paramList.push(dataParams);
        }
      });

      if (paramList.length > 0) {
        for (let i = 0; i < paramList.length; i += 1) {
          if (utils.trim(paramList[i].multiLanguageContent) === '') {
            utils.messageBox('alert', this.$t('MSG_ALT_INP_MLNG_VAL'));
            return false;
          }
        }

        http.request(this.contextPageId, 'DTS_CMZ_00024', {
          data: paramList,
        }).then(() => {
          this.conFirm('success', this.$t('MSG_ALT_CHG_DATA'), null);
          this.onSearch(paramList[0].multiLanguageId);
        }).catch(error => {
          console.log(error);
        });
      } else {
        this.conFirm('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
    onBulkApplyButtonClicked(btn, dataRow) {
      this.dsDetail.forEach((item, key) => {
        if (item.langId !== 'en') {
          if (utils.isEmpty(item.content)) {
            this.dsDetail.setData(key, 'content', dataRow.content);
          }
          if (utils.isEmpty(item.abbreviationContent)) {
            this.dsDetail.setData(key, 'abbreviationContent', dataRow.abbreviationContent);
          }
        }
      });
    },
    onClose() {
      console.log('onConfirm');
    },
    onPagePopupClose(data) {
      console.log(data);
    },
    setLangData(langName, langId) {
      const dataInfo = {
        langName,
        langId,
        multiLanguageId: '',
        multiLanguageContent: '',
        multiLanguageAbbreviationContent: '',
        multiLanguageTypeCode: '',
        mlngEditButton: '',
        abbrEditButton: '',
        bulkApplyButton: '',
      };
      return dataInfo;
    },
    setParamList(data) {
      let dataParams = '';
      let multiLangId = '';
      let languageId = '';
      let languageName = '';
      let contents = '';
      let abbContent = '';
      let typeCode = '';

      if (data.langName) {
        languageName = data.langName;
      }

      if (data.langId) {
        languageId = data.langId;
      }

      if (data.multiLanguageId) {
        multiLangId = data.multiLanguageId;
      }

      if (data.content) {
        contents = data.content;
      }

      if (data.abbreviationContent) {
        abbContent = data.abbreviationContent;
      }

      if (data.multiLanguageTypeCode) {
        typeCode = data.multiLanguageTypeCode;
      }

      if ((contents) || (abbContent)) {
        dataParams = {
          multiLanguageId: multiLangId || '',
          langId: languageId || '',
          langName: languageName || '',
          multiLanguageTypeCode: typeCode || '',
          multiLanguageTypeName: '',
          multiLanguageContent: contents || '',
          multiLanguageAbbreviationContent: abbContent || '',
        };
      }
      return dataParams;
    },
    onKeyUpInput() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewText = this.condContent;
      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.condContent = this.searchFieldOldText;
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;
      }
    },
  },
};
</script>
<style scoped>
</style>
