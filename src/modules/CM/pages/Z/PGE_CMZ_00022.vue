<template>
  <sui-page>
    <sui-page-header :pageId="contextPageId" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_PORTL')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-custom-select
              ref="selectPortal"
              v-model="searchFrame.selectedCodeValue.portalId"
              :selected="fromPsYn?psInitPortal:{key:searchFrame.selectedCodeValue.portalId}"
              :defaultOption="'all'"
              :option-list="portalList"
              :disabled="fromPsYn"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_TYPE')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="selectType"
              v-model="searchFrame.selectedCodeValue.noticeTypeCode"
              :pageId="contextPageId"
              defaultOption="all"
              codeId="COD_NTC_TYPE"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_POST_DT')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <ur-date-picker
              ref="dp"
              v-model="selectDate"
              :disabled="false"
              sticky
              @confirm="onDateSelect"
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_MDFC_USR')"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <cmp-user-select
              ref="userSelect"
              :selectedUser="selectedUser"
              :checkboxMode="false"
              @selected="userSelect"
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
              ref="selectSearchCond"
              v-model="searchFrame.selectedCodeValue.noticeSearchCond"
              :pageId="contextPageId"
              defaultOption="all"
              style="width:58%"
              codeId="COD_NTC_SERACH_COND"
            />
            <div class="comp_spacing" />
            <sui-text-field
              v-model.trim="searchFrame.noticeSearchWord"
              :disabled="false"
              :readonly="false"
              maxlength="50"
              @keyup.enter="onSearchClick"
              @keyup="onKeyUpInput"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            v-permission:read="contextPageId"
            type="button"
            class="comm_btn_Reset"
            @click="onResetClick"
          >
            {{ $t('MSG_BTN_RESET') }}
          </sui-button>
          <sui-button
            v-permission:read="contextPageId"
            type="button"
            class="comm_btn_Scr"
            @click="onSearchClick"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <!-- sui-s-grid component-->
      <sui-s-grid
        ref="grid"
        :headers="gridColumns0"
        :data-source="ds0"
        :options="options"
        :showDisplayCountControl="false"
        :showRowsPerPageControl="false"
        :initialRowsPerPage="10"
      />
      <div class="comm_btn_wrap">
        <sui-button
          v-permission:delete="contextPageId"
          type="button"
          class="comm_btn_border"
          @click="onDelClick"
        >
          {{ $t('MSG_BTN_DEL') }}
        </sui-button>
        <sui-button
          v-permission:create="contextPageId"
          type="button"
          class="comm_btn_solid"
          @click="onNewAndCancelClick"
        >
          {{ $t('MSG_BTN_RGST') }}
        </sui-button>
      </div>
      <sui-popup
        v-model="isShownPopupNew"
        :title="$t('MSG_TIT_NTC_RGST')"
      >
        <p01
          :pageId="contextPageId"
          :psInitPortal="psInitPortal"
          :fromPsYn="fromPsYn"          
          @onCloseClick="onNewAndCancelClick"
          @research="research"
        />
      </sui-popup>
      <sui-popup
        v-model="isShownPopupMod"
        :title="$t('MSG_TIT_NTC_MDFC')"
      >
        <p01
          :pageId="contextPageId"
          :noticeUid="noticeUid"
          :psInitPortal="psInitPortal"
          :fromPsYn="fromPsYn"          
          @onCloseClick="onModAndCancelClick"
          @research="research"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>
<script>
// eslint-disable-next-line import/extensions
import { urDataSet } from 'uidev-component/index.js';
import p01 from './components/PGE_CMZ_00022_P01';
// eslint-disable-next-line import/no-unresolved
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMZ_00022', // eslint-disable-line vue/name-property-casing
  components: {
    p01,
  },
  extends: BasePage,
  props: {
    psInitData: {
      type: Object,
      default() {
        return {};
      }
    },
  },   
  data() {
    return {
      searchFrame: {
        selectedCodeValue: {
          portalId: 'ALL',
          noticeTypeCode: '',
          noticeSearchCond: '',
        },
        noticeSearchWord: '',
        finalModificationUserId: '',
        searchDateStartDTM: '',
        searchDateEndDTM: '',
      },
      selectDate: '',
      selectedUser: {
        epId: '',
        employeeIDNumber: '',
        userName: '',
        companyName: '',
        departmentName: '',
        knoxId: '',
        servedStateCode: '',
        userId: '',
        epid: '',
        email: '',
      },
      userDateFormat: this.$store.getters.userInfo.dateFormat,
      // eslint-disable-next-line new-cap
      ds0: new urDataSet(),
      options: {},
      isShownPopupNew: false,
      isShownPopupMod: false,
      noticeUid: '',
      selectedNoticeData: {},
      searchFieldOldText: '',
      fromPsYn: utils.isEmpty(this.psInitData)?false:true,
      psInitPortal: {key:this.psInitData.portalId, value:''},      
    };
  },
  computed: {
    session() {
      return this.$store.getters.userInfo;
    },
  },
  watch: {},
  created() {
    const that = this;
    this.portalList = [];
    this.localdata0 = [];
    this.gridColumns0 = [{
      text: this.$t('MSG_TXT_TYPE'),
      value: 'noticeTypeName',
      width: '80px',
    }, {
      text: this.$t('MSG_TXT_PORTL_ID'),
      value: 'portalId',
      width: '100px',
    }, {
      text: this.$t('MSG_TXT_PORTL_NM'),
      value: 'portalName',
      width: '100px',
    }, {
      text: this.$t('MSG_TXT_TITLE'),
      value: 'noticeTitle',
      align: 'left',
      component: {
        props: ['row', 'value'],
        template:
            `<ur-button
              :title="row.noticeTitle"
              type="button"
              class="link"
              shape="hyperlink"
              prim
              @click.stop="onDetailClick(value, row)"
            >
            {{row.noticeTitle}}
            </ur-button>`,
        methods: {
          onDetailClick(btn, selectedRawData) {
            that.onGridSingleButtonClicked(btn, selectedRawData);
          },
        },
      },
    }, {
      text: this.$t('MSG_TXT_PAGE_NM'),
      value: 'noticeApplyPageName',
    }, {
      text: this.$t('MSG_TXT_PAGE_ID'),
      value: 'noticeApplyPageId',
      width: '150px',
    }, {
      text: this.$t('MSG_TXT_PRD'),
      value: 'noticeRangeDate',
      width: '200px',
    }, {
      text: this.$t('MSG_TXT_MDFC_USR'),
      value: 'finalModificationUserId',
      component: {
        props: ['row', 'value'],
        template:
          `<cmp-user-name-link
            :displayType="'1'"
            :type="'link'"
            :userId="row.finalModificationUserId"
            :displayLanguageId="row.displayLanguageId"
            :loginId="row.loginId"
            :knoxId="row.knoxId"
            :userName="row.userName"
            :userGlobalName="row.userGlobalName"
            :departmentName="row.departmentName"
            :departmentEnglishName="row.departmentEnglishName"
          
          />`,
      },
    },
    ];
  },
  mounted() {
    this.loadPortalList().then(() => {
      if(this.fromPsYn){
          this.onSearchClick();
      }    
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
        this.searchFrame.selectedCodeValue.portalId = '';
        resolve();
      }).catch(error => {
          console.log(error);
          reject();
        });
      });
    },
    onResetClick() {
      utils.forEach(this.$refs, (ref, key) => {
        if (utils.startsWith(key, 'select') && key!='selectPortal') {
          ref.reset();
        }
      });
      this.searchFrame.noticeSearchWord = '';
      this.searchFrame.finalModificationUserId = '';
      this.searchFrame.searchDateStartDTM = '';
      this.searchFrame.searchDateEndDTM = '';
      this.selectDate = '';
      this.userSelectReset();
    },
    userSelectReset() {
      utils.forEach(this.selectedUser, (value, key) => {
        this.selectedUser[key] = '';
      });
      this.$refs.userSelect.setValue(this.selectedUser);
    },
    userSelect(selected) {
      this.searchFrame.finalModificationUserId = selected.userId;
    },
    onDateSelect(selected) {
      this.searchFrame.searchDateStartDTM = utils.dateformatToServer(selected);
      this.searchFrame.searchDateEndDTM = utils.dateformatToServer(selected, 'S').concat('235959');
    },
    getSearchData() {
      const data = {};
      utils.forEach(this.searchFrame, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          utils.forEach(value, (codeValue, codekey) => {
            data[codekey] = codeValue;
          });
        } else {
          data[key] = value;
        }
      });
      return data;
    },
    onSearchClick() {
      this.ds0.setData([]);
      if (this.onClickValidate()) return false;

      const searchData = this.getSearchData();
      http.request(this.$options.name, 'DTS_CMZ_00088', {
        query: searchData,
      }).then(res => {
        this.ds0.setData(this.dataFormat(res.data));
      }).catch(error => {
        console.log(error);
      });

      return null;
    },
    dataFormat(list) {
      utils.forEach(list, data => {
        const start = utils.toStringByFormat(data.noticeStartDTM, 'YYYY-MM-DD');
        const finish = utils.toStringByFormat(data.noticeFinishDTM, 'YYYY-MM-DD');
        utils.assign(data, {
          noticeRangeDate: `${start} ~ ${finish}`,
        });
        utils.forEach(data.finalModificationUserInfo, (value, key) => {
          if (utils.isEqual(key, 'dsplLngId')) {
            utils.set(data, 'displayLanguageId', value);
          } else {
            utils.set(data, key, value);
          }
        });
      });
      return list;
    },
    onNewAndCancelClick() {
      this.isShownPopupNew = !this.isShownPopupNew;
    },
    onGridSingleButtonClicked(value, dataRow) {
      this.noticeUid = dataRow.noticeUid;
      this.onModAndCancelClick();
    },

    onModAndCancelClick() {
      this.noticeUid = this.isShownPopupMod ? '' : this.noticeUid;
      this.isShownPopupMod = !this.isShownPopupMod;
      if (!this.isShownPopupMod) {
        // this.ds0.clearSelection();
      }
    },
    onDelClick() {
      const indexes = this.ds0.getSelected();
      if (utils.isEmpty(indexes)) {
        // utils.messageBox('warning', this.$t('MSG_ALT_DEL_DATA_SELT'));
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
          if (indexes.length > 1) {
            const uidList = [];
            utils.forEach(indexes, index => {
              const uid = index.noticeUid;
              uidList.push(uid);
            });
            this.deleteListAction(uidList);
          } else {
            const [index] = indexes;
            const uid = index.noticeUid;
            this.deleteAction(uid);
          }
        });
      }
    },
    deleteAction(uid) {
      http.request(this.$options.name, 'DTS_CMZ_00091', {
        path: {
          'notice-uid': uid,
        },
      }).then(() => {
        utils.messageBox('success', this.$t('MSG_ALT_DEL_DATA'), null, this.research);
      }).catch(error => {
        console.log(error);
      });
    },
    deleteListAction(uidList) {
      http.request(this.$options.name, 'DTS_CMZ_00099', {
        data: uidList,
      }).then(() => {
        utils.messageBox('success', this.$t('MSG_ALT_DEL_DATA'), null, this.research);
      }).catch(error => {
        console.log(error);
      });
    },
    research() {
      if (this.isShownPopupNew) {
        this.onNewAndCancelClick();
      }
      if (this.isShownPopupMod) {
        this.onModAndCancelClick();
      }
      this.onSearchClick();
    },
    /* 달력의 오류를 확인할 수 있는 validate 함수 */
    onClickValidate() {
      // if (this.onClickValidate()) return false;
      if (!this.$refs.dp.isValid()) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
        return true;
      }
      return false;
    },
    onKeyUpInput() {
      const searchFieldNewText = this.searchFrame.noticeSearchWord;

      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.searchFrame.noticeSearchWord = this.searchFieldOldText;
        } else {
          this.searchFieldOldText = searchFieldNewText;
        }
      }
    },
    conFirm(type, value, subValue) {
      utils.messageBox(type, value, subValue, this.onClose);
    },
  },
};
</script>
  <style scoped>
  </style>
