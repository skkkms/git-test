<template>
  <div>
    <sui-page>
      <sui-page-header :pageId="this.$options.name" />
      <sui-page-contents>
        <div class="comm_scr_wrap">
          <div class="row">
            <div class="col-xs-1">
              <sui-input-label
                :label="$t('MSG_TXT_MDLE')"
                :vertical="false"
              />
            </div>
            <div class="col-xs-5">
              <sui-module-submodule-select
                ref="selectModule"
                :pageId="this.$options.name"
                :selectedMd="searchFrame.selectedCodeValue.moduleCode"
                :selectedSmd="searchFrame.selectedCodeValue.subModuleCode"
                :defaultMdOption="'all'"
                :defaultSmdOption="'all'"
                class="dp_flex"
              />
            </div>
            <div class="col-xs-1">
              <sui-input-label
                :label="$t('MSG_TXT_PAGE')"
                :vertical="false"
              />
            </div>
            <div class="col-xs-5">
              <sui-text-field
                v-model="searchFrame.searchPageId"
                :placeholder="$t('MSG_TXT_SRCH_PGID_PGNAME')"
                maxlength="50"
              />
            </div>
          </div>
          <div class="btn_wrap">
            <sui-button
              type="button"
              class="comm_btn_Reset"
              @click="onClickReset"
            >
              {{ $t("MSG_BTN_RESET") }}
            </sui-button>
            <sui-button
              v-permission:read="this.$options.name"
              type="button"
              class="comm_btn_Scr"
              @click="onClickSearch"
            >
              {{ $t("MSG_BTN_SEARCH") }}
            </sui-button>
          </div>
        </div>
        <div class="mypage">
          <ur-checkbox
            v-model="myPage"
            :disabled="myPageEnable"
            size="small"
            @click="onClickSearch"
          >
            {{ $t("MSG_TXT_MY_PAGE") }}
          </ur-checkbox>
        </div>
        <div class="mrB30" />
        <sui-s-grid
          ref="mainGrid"
          :headers="gridColumns"
          :data-source="dsMain"
          :options="options"
          :initialRowsPerPage="10"
        >
          <template #right-info>
            <sui-button
              class="comm_btn_gridTop comm_ico_excel"
              @click="onExcelDnLoad"
            >
              {{ $t('MSG_BTN_EXCEL_DOWN') }}
            </sui-button>
          </template>
        </sui-s-grid>
        <div class="comm_btn_wrap">
          <sui-button
            v-permission:delete="this.$options.name"
            type="button"
            class="comm_btn_border"
            @click="onClickDelete"
          >
            {{ $t("MSG_BTN_DEL") }}
          </sui-button>
          <sui-button
            v-permission:create="this.$options.name"
            type="button"
            class="comm_btn_solid"
            @click="onClickPopupCall"
          >
            {{ $t("MSG_BTN_CNTN_CREATE") }}
          </sui-button>
        </div>
        <!-- my code -->
        <div class="comm_scr_wrap">
          <div class="row">
            <div class="col-xs-1">
              <sui-input-label
                :label="$t('MSG_TXT_MDLE')"
                :vertical="false"
                :required="true"
              />
            </div>
            <div class="col-xs-5">
              <sui-module-submodule-select
                ref="quickFrame"
                class="dp_flex"
                :pageId="this.$options.name"
                :selectedMd="pageData.selectedCodeValue.moduleCode"
                :selectedSmd="pageData.selectedCodeValue.subModuleCode"
                :defaultMdOption="'select'"
                :defaultSmdOption="'select'"
              />
            </div>
            <div class="col-xs-1">
              <sui-input-label
                :label="$t('MSG_TXT_PAGE_NM')"
                :required="true"
                :vertical="false"
              />
            </div>
            <div class="col-xs-5">
              <sui-text-field
                ref="pageName"
                v-model="pageData.pageName"
                maxlength="100"
                :trim="true"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-xs-1">
              <sui-input-label
                :label="$t('MSG_TXT_PAGE_UE_NM')"
                :required="true"
                :vertical="false"
              />
            </div>
            <div class="col-xs-5">
              <sui-code-select
                :selected="pageData.selectedCodeValue.pageUseCode"
                :pageId="this.$options.name"
                codeId="COD_PAGE_UE"
                :initialSelectedIndex="0"
              />
            </div>
            <div class="col-xs-1">
              <sui-input-label
                :label="$t('MSG_TXT_DVC_TYPE')"
                :required="true"
              />
            </div>
            <div class="col-xs-5">
              <sui-device-checkbox
                ref="deviceCheck"
                :value="deviceTypeValue"
              />
            </div>
          </div>
        </div>
        <div class="comm_btn_wrap">
          <sui-button
            type="button"
            class="comm_btn_solid"
            @click="onClickQuickCreate"
          >
            {{ $t('MSG_BTN_QCK_CREATE') }}
          </sui-button>
        </div>
      </sui-page-contents>
    </sui-page>
    <sui-popup
      v-model="isShownPopup"
      :title="$t('MSG_TIT_CRT_PGE')"
    >
      <p01
        :pageId="$options.name"
        @exit="onPopupCancelClicked"
        @apply="onPopupApply"
      />
    </sui-popup>
  </div>
</template>

<script>
// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';
import p01 from './components/PGE_CMU_00020_P01.vue';

const dateFields = [
  'firstRegistrationDTM', 'finalModificationDTM', 'pageUsePriodStartDatetime', 'pageUsePriodFinishDatetime',
];
export default
{
  name: 'PGE_CMU_00020', // eslint-disable-line vue/name-property-casing
  components: {
    p01,
  },
  data() {
    return {
      deviceApplyYn: true,
      myPage: false,
      myPageEnable: true,
      isShownPopup: false,
      searchFrame: {
        selectedCodeValue: {
          moduleCode: {
            key: '',
            label: '',
          },
          subModuleCode: {
            key: '',
            label: '',
          },
          COD_PAGE_SEARCH_COND: {
            key: 'ALL',
          },
        },
        searchPageId: '',
      },
      pageData: {
        selectedCodeValue: {
          moduleCode: {
            key: '',
            label: '',
          },
          subModuleCode: {
            key: '',
            label: '',
          },
          pageUseCode: {
            key: '',
            label: '',
          },
          pageTypeCode: {
            key: '',
            label: '',
          },
          pageStatusCode: {
            key: 'D',
            label: 'In Development',
          },
        },
        pageId: '',
        pageDestinationValue: '',
        pageName: '',
        pageNickName: '',
        pageTitleMessageResourceId: '',
        pageBlockContent: '',
        pageUsePriodStartDatetime: '',
        pageUsePriodFinishDatetime: '',
        pagePopupYn: 'N',
        pagePopupOptionValue: '',
        pageContent: '',
        firstRegistrationDTM: '',
        firstRegistrationUserId: '',
        firstRegistrationProgramId: '',
        finalModificationDTM: '',
        finalModificationUserId: '',
        finalModificationProgramId: '',
        pageUsePriodYn: 'N',
        pageUseYn: 'Y',
        linkPageId: '',
        linkPageName: '',
        r_dsplLngId: '',
        r_knoxId: '',
        r_loginId: '',
        r_userName: '',
        r_userGlobalName: '',
        r_departmentName: '',
        r_departmentEnglishName: '',
        m_dsplLngId: '',
        m_knoxId: '',
        m_loginId: '',
        m_userName: '',
        m_userGlobalName: '',
        m_departmentName: '',
        m_departmentEnglishName: '',
        periodDT: {
          from: utils.now('YYYY-MM-DD'),
          to: utils.now('YYYY-MM-DD'),
        },
        periodDTR: [utils.now('YYYY-MM-DD'), utils.now('YYYY-MM-DD')],
        deviceTypeValue: 1,
      },
      pageIdPrefix: '',
      duplicate: false,
      originalNickName: '',
      inputNickName: '',
      deviceTypeValue: 1,
      searchPageId: '',
      // eslint-disable-next-line new-cap
      dsMain: new urDataSet(),
      options: {
        infinityScroll: true,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
    };
  },
  computed: {
    pageUsePriodFlag() {
      // 사용 안할 시 true
      return utils.isEqual(this.pageData.pageUsePriodYn, 'N');
    },
    pageNickNameInput() {
      // 입력시 true
      return !utils.isEmpty(this.inputNickName);
    },
    nickNameChange() {
      // 변경 시 true
      return !utils.isEqual(this.inputNickName, this.originalNickName);
    },
    pageTypeFlag() {
      return utils.isEqual(this.pageData.selectedCodeValue.pageTypeCode.key, 'N');
    },
    saveParam() {
      const dataParams = {};
      utils.forEach(this.pageData, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          utils.forEach(value, (code, codekey) => {
            dataParams[codekey] = code.key;
          });
        } else if (utils.isEqual(key, 'periodDTR')) {
          const pageUsePriodStartDatetime = this.pageUsePriodFlag ? '' : utils.dateformatToServer(value[0]);
          const pageUsePriodFinishDatetime = this.pageUsePriodFlag ? '' : utils.dateformatToServer(value[1]);
          utils.assign(dataParams, { pageUsePriodStartDatetime, pageUsePriodFinishDatetime });
        } else {
          dataParams[key] = value;
        }
      });
      return dataParams;
    },
  },
  created() {
    const that = this;
    this.gridColumns = [
      {
        text: this.$t('MSG_TXT_MDLE'),
        value: 'moduleName',
      },
      {
        text: this.$t('MSG_TXT_SMDLE'),
        value: 'subModuleName',
      },
      {
        text: this.$t('MSG_TXT_PAGE_ID'),
        value: 'pageId',
        align: 'left',
        component: {
          props: ['row', 'value'],
          template:
            `<ur-button
              color="#60a3ef !important"
              hyperlink
              @click="onClick(row)">
              {{value}}
            </ur-button>`,
          methods: {
            onClick(row) {
              that.onClickDetail(row.__idx);
            },
          },
        },
      },
      {
        text: this.$t('MSG_TXT_PAGE_NM'),
        value: 'pageName',
      },
      {
        text: this.$t('MSG_TXT_RGST_USR'),
        value: 'firstRegistrationUserId',
        component: {
          props: ['row'],
          template: `
                    <cmp-user-name-link
                    :displayType="'1'"
                    :displayLanguageId="row.firstRegistrationUserInfo.dsplLngId"
                    :userId="row.firstRegistrationUserInfo.userId"
                    :loginId="row.firstRegistrationUserInfo.loginId"
                    :knoxId="row.firstRegistrationUserInfo.knoxId"
                    :userName="row.firstRegistrationUserInfo.userName"
                    :userGlobalName="row.firstRegistrationUserInfo.userGlobalName"
                    :departmentName="row.firstRegistrationUserInfo.departmentName"
                    :departmentEnglishName="row.firstRegistrationUserInfo.departmentEnglishName"
                    :type="'link'"
                    />`,
        },
      },
      {
        text: this.$t('MSG_TXT_RGST_DT'),
        value: 'firstRegistrationDTM',
      },
      {
        text: this.$t('MSG_TXT_MDFC_USR'),
        value: 'finalModificationUserName',
        component: {
          props: ['row'],
          template: `
                    <cmp-user-name-link
                    :displayType="'1'"
                    :displayLanguageId="row.finalModificationUserInfo.dsplLngId"
                    :userId="row.finalModificationUserInfo.userId"
                    :loginId="row.finalModificationUserInfo.loginId"
                    :knoxId="row.finalModificationUserInfo.knoxId"
                    :userName="row.finalModificationUserInfo.userName"
                    :userGlobalName="row.finalModificationUserInfo.userGlobalName"
                    :departmentName="row.finalModificationUserInfo.departmentName"
                    :departmentEnglishName="row.finalModificationUserInfo.departmentEnglishName"
                    :type="'link'"
                    />`,
        },
      },
      {
        text: this.$t('MSG_TXT_MDFC_DTM'),
        value: 'finalModificationDTM',
      },
    ];
  },
  methods: {
    onClickReset() {
      this.$refs.selectModule.selectMd('ALL');
      // this.$refs.quickFrame.selectMd('ALL');
      this.searchFrame.searchPageId = '';
      this.myPage = false;
    },

    onQuickReset() {
      this.$refs.quickFrame.selectMd(' ');
      this.pageData.pageName = '';
      this.$refs.deviceCheck.setValue(1);
      this.pageData.selectedCodeValue.pageUseCode.key = 'N';
    },

    onClickSearch() {
      this.myPageEnable = false;
      const queryParams = {
        moduleCode: utils.trim(this.searchFrame.selectedCodeValue.moduleCode.key) || '',
        subModuleCode: utils.trim(this.searchFrame.selectedCodeValue.subModuleCode.key) || '',
        searchPageCond: utils.trim(this.searchFrame.selectedCodeValue.COD_PAGE_SEARCH_COND.key) || '',
        searchPageText: utils.toUpper(utils.trim(this.searchFrame.searchPageId)) || '',
      };
      http.request(this.$options.name, 'DTS_CMU_00002',
        {
          query: queryParams,
        })
        .then(res => {
          utils.dateformatToClientInArray(res.data, dateFields);
          if (this.myPage === true) {
            const list = [];
            res.data.forEach(r => {
              // eslint-disable-next-line max-len
              if ((r.firstRegistrationUserId === this.$store.getters.userInfo.userId.toLowerCase()) || (r.finalModificationUserId.toLowerCase() === this.$store.getters.userInfo.userId.toLowerCase())) {
                list.push(r);
              }
            });
            this.dsMain.setData(list);
          } else {
            this.dsMain.setData(res.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onExcelDnLoad() {
      const sToday = utils.now('YYYYMMDDHHmmss');
      const sExcelName = `page_development_${sToday}.xlsx`;
      const columns = [
        { text: this.$t('MSG_TXT_MDLE'), datafield: 'moduleName' },
        { text: this.$t('MSG_TXT_SMDLE'), datafield: 'subModuleName' },
        { text: this.$t('MSG_TXT_PAGE_ID'), datafield: 'pageId' },
        { text: this.$t('MSG_TXT_PAGE_NM'), datafield: 'pageName' },
        { text: this.$t('MSG_TXT_RGST_USR'), datafield: 'firstRegistrationUserId' },
        { text: this.$t('MSG_TXT_RGST_DT'), datafield: 'firstRegistrationDTM' },
        { text: this.$t('MSG_TXT_MDFC_USR'), datafield: 'finalModificationUserName' },
        { text: this.$t('MSG_TXT_MDFC_DTM'), datafield: 'finalModificationDTM' },
      ];
      utils.downloadGridToExcel(this.$options.name, columns, this.dsMain, sExcelName);
    },
    onClickDelete() {
      const selectedIndexes = this.dsMain.getSelected();
      const pageIdList = [];
      if (selectedIndexes.length < 1) {
        utils.messageBox('warning', this.$t('MSG_ALT_DEL_NO_DATA'));
        return false;
      }
      utils.forEach(selectedIndexes, index => {
        pageIdList.push({
          pageId: index.pageId,
        });
      });
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, () => {
        utils.forEach(pageIdList, index => {
          http.request(this.$options.name, 'DTS_CMU_00005', {
            path: {
              'page-id': index.pageId,
            },
          }).then(() => {
            this.onClickSearch();
          });
        });
      });
      return null;
    },

    changeFormat() {
      const a = this.pageData.periodDT.from.substr(0, 10);
      const b = this.pageData.periodDT.to.substr(0, 10);
      this.pageData.periodDTR = [a, b];
    },
    convertRangeFormat() {
      this.pageData.periodDT = {
        from: this.pageData.periodDTR[0],
        to: this.pageData.periodDTR[1],
      };
    },
    makeSnapshot() {
      const dataParams = {};
      utils.forEach(this.pageData, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          utils.forEach(value, (code, codekey) => {
            dataParams[codekey] = code.key;
          });
        } else if (utils.isEqual(key, 'periodDTR')) {
          const pageUsePriodStartDatetime = this.pageUsePriodFlag ? '' : utils.dateformatToServer(value[0]);
          // eslint-disable-next-line max-len
          const pageUsePriodFinishDatetime = this.pageUsePriodFlag ? '' : utils.dateformatToServer(value[1]).substr(0, 8).concat('235959');
          utils.assign(dataParams, { pageUsePriodStartDatetime, pageUsePriodFinishDatetime });
        } else {
          dataParams[key] = value;
        }
      });
      dataParams.deviceTypeValue = this.$refs.deviceCheck.getValue();
      return dataParams;
    },

    onClickQuickCreate() {
      this.convertRangeFormat();
      const dataParams = this.makeSnapshot();
      dataParams.originalFinalModificationDTM = utils.dateformatToServer(dataParams.finalModificationDTM);
      if (!this.formValidate(dataParams)) return false;
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null,
        () => {
          http.request(this.$options.name, 'DTS_CMU_00004', {
            data: dataParams,
          }).then(() => {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null);
            this.onQuickReset();
          });
        });
      return null;
    },

    formValidate(formData) {
      if (!(this.formValidate01(formData)
         && this.formValidate02(formData)
         && this.formValidate03(formData))) {
        return false
      }
      return true
    },
    formValidate01(formData) {
      if (!utils.trim(formData.moduleCode) || formData.moduleCode === 'ALL') {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_MDLE'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (!utils.trim(formData.subModuleCode) || formData.subModuleCode === 'ALL') {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_SMDLE'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (formData.pageTypeCode === 'L' && !utils.trim(formData.linkPageId)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_LINK_PAGE'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (formData.deviceTypeValue === 0) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_DVC_TYPE'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (!formData.pageUseCode) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_PAGE_UE_NM'));
        utils.messageBox('warning', msg);
        return false;
      }
      return true;
    },
    formValidate02(formData) {
      if (!formData.pageName) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PAGE_NM'));
        utils.messageBox('warning', msg, null, () => {
          this.$refs.pageName.setFocus();
        });
        return false;
      }
      // eslint-disable-next-line no-param-reassign
      // formData.pageTitleMessageResourceId = formData.pageName;
      // if (!formData.pageTitleMessageResourceId) {
      //   const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_MSG_RESO'));
      //   utils.messageBox('warning', msg, null, () => {
      //     this.$refs.pageName.setFocus();
      //   });
      //   return false;
      // }
      if (!formData.pageUsePriodYn) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PRD_YN'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (!formData.pageStatusCode) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_STT'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (!this.pageUsePriodFlag && (!formData.pageUsePriodStartDatetime || !formData.pageUsePriodFinishDatetime)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_USE_PRD'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (!formData.pagePopupYn) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_POPU_YN'));
        utils.messageBox('warning', msg);
        return false;
      }
      return true;
    },
    formValidate03(formData) {
      if (!formData.pageUseYn) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_USE_YN'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (this.pageNickNameInput && this.nickNameChange && !this.duplicate) {
        const msg = utils.strFormat(this.$t('MSG_ALT_DUPLICATE_CHECK'), this.$t('MSG_TXT_PAGE_NNM'));
        utils.messageBox('warning', msg);
        return false;
      }
      if (formData.pageTypeCode === 'L' && formData.pageStatusCode === 'B') {
        utils.messageBox('warning', this.$t('MSG_ALT_LNK_PAGE_BLCK_NO'));
        return false;
      }
      if (formData.pageStatusCode === 'B' && utils.isEmpty(utils.trim(formData.pageBlockContent))) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_BLCK_MSG'));
        utils.messageBox('warning', msg);
        return false;
      }
      return true;
    },
    /* 달력의 오류를 확인할 수 있는 validate 함수 */
    onPopupCancelClicked() {
      this.isShownPopup = false;
    },
    onPopupApply(dataValue) {
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null,
        () => {
          http.request(this.$options.name, 'DTS_CMU_00004', {
            data: dataValue,
          }).then(() => {
            this.isShownPopup = false;
            this.onClickSearch();
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null);
          });
        });
    },
    onClickPopupCall() {
      this.isShownPopup = true;
    },
    onClickDetail(idVal) {
      utils.goPage('PGE_CMU_00022', {
        pageId: this.dsMain.data[idVal].pageId,
      });
    },
  },
};
</script>
