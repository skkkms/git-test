<template>
  <sui-page>
    <sui-page-header :pageId="this.$options.name" />
    <sui-page-contents>
      <div class="comm_scr_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SEND_TMPLT_ID')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model.trim="searchFrame.sendTemplateId"
              :placeholder="$t('MSG_TXT_INPUT_ITEM_NM')"
              maxlength="50"
              @keyup.enter="onSearchClick"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_PRD')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <ur-range-picker
              ref="dp"
              v-model="rangeDataValue"
              sticky
              @toggle-floating="onRangeConfirm"
              init="week-1"
              one-input-mode
              :inputType=this.userDateFormat
              :modelType=this.userDateFormat
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="this.$t('MSG_TXT_EMAIL_TTL')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model.trim="searchFrame.emailTitle"
              :placeholder="$t('MSG_TXT_INPUT_ITEM_NM')"
              maxlength="50"
              @keyup.enter="onSearchClick"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="this.$t('MSG_TXT_RECP_EMAIL')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-text-field
              v-model.trim="searchFrame.receiptUserEmail"
              :placeholder="$t('MSG_TXT_INPUT_ITEM_NM')"
              maxlength="50"
              @keyup.enter="onSearchClick"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="this.$t('MSG_TXT_SEND_STT_CD')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="selectSendStatus"
              :selected="searchFrame.selectedCodeValue.emailSendStatusCode"
              :pageId="this.$options.name"
              codeId="COD_EMAIL_SEND_STT"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
            />
          </div>
          <div class="col-xs-1">
            <sui-input-label
              :label="this.$t('MSG_TXT_RECP_STT_CD')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-5">
            <sui-code-select
              ref="selectReceiptStatus"
              :selected="searchFrame.selectedCodeValue.emailReceiptStatusCode"
              :pageId="this.$options.name"
              codeId="COD_EMAIL_RECP_STT"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
            />
          </div>
        </div>
        <div class="btn_wrap">
          <sui-button
            v-permission:read="this.$options.name"
            type="button"
            class="comm_btn_Reset"
            @click="onResetClick"
          >
            {{ $t("MSG_BTN_RESET") }}
          </sui-button>
          <sui-button
            v-permission:read="this.$options.name"
            type="button"
            class="comm_btn_Scr"
            @click="onSearchClick"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </sui-button>
        </div>
      </div>
      <div class="mrB30" />
      <sui-s-grid
        ref="mainGrid"
        :data-source="ds0"
        :headers="gridColumns0"
        :initial-pagesize="10"
        :showRowsPerPageControl="false"
        :multiselect="false"
        @grid:scroll-bottom="addRows"
      />
      <div class="btn_moreView">
        <p>
          {{ showMore }}
        </p>
      </div>
      <sui-popup
        v-model="isShownPopupDetail"
        :title="this.$t('MSG_TIT_EMAIL_SEND_DTL')"
      >
        <p01
          :pageId="this.$options.name"
          :emailUid="emailUid"
          @onDetailAndCancelClick="onDetailAndCancelClick"
        />
      </sui-popup>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import p01 from './components/PGE_CMZ_00068_P01';
import BasePage from '~cm/components/BasePage';
import { urDataSet } from 'uidev-component/index.js';

export default {
  name: 'PGE_CMZ_00068', // eslint-disable-line vue/name-property-casing
  components: {
    p01,
  },
  extends: BasePage,
  data() {
    return {
      rangeDataValue: ['',''],
      searchFrame: {
        selectedCodeValue: {
          emailSendStatusCode: {
            key: '',
            label: '',
          },
          emailReceiptStatusCode: {
            key: '',
            label: '',
          },
        },
        sendTemplateId: '',
        receiptUserEmail: '',
        rangeDate: {
          from: utils.dateformatToClient(utils.addDay(utils.now('YYYY-MM-DD'), -6), 'S'),
          to: utils.now('YYYY-MM-DD'),
        },
      },
      userDateFormat: this.$store.getters.userInfo.dateFormat,
      localdata0: [],
      ds0: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
      },
      isShownPopupDetail: false,
      emailUid: '',
      paging: {
        count: 0,
        totalCount: 0,
        curPage: 0,
        searchData: {},
      },
    };
  },
  computed: {
    showMore() {
      return `${ utils.numberFormat(this.paging.count)} / ${utils.numberFormat(this.paging.totalCount)}`;
    },
  },
  watch: {},
  mounted() {
  },

  created() {
    this.dataList = [];
    const that = this;
    this.gridColumns0 = [
      {
        text: this.$t('MSG_TXT_SEND_TMPLT_ID'),
        value: 'sendTemplateId',
        width: '200px',
      }, {
        text: this.$t('MSG_TXT_EMAIL_TTL'),
        value: 'emailTitle',
        align: 'left',
        component: {
         props: ['row', 'value'],
          
          template:
             `<ur-button
                :title="row.emailTitle"
                type="button"
                class="link"
                shape="hyperlink"
                prim
                @click ="handlingClick"
              >
                {{row.emailTitle}}
              </ur-button>`,
            methods: {
              handlingClick() {
                that.onGridSingleButtonClicked(this.value, this.row);
              }
            }
        },
      }, {
        text: this.$t('MSG_TXT_RGST_DTM'),
        value: 'firstRegistrationDTM',
        customValue(value) {
          return utils.dateformatToClient(value);
        },
        width: '150px',
      }, {
        text: this.$t('MSG_TXT_SEND_STT_CD'),
        value: 'emailSendStatusName',
        width: '150px',
      }];
  },

  methods: {
    onGridSingleButtonClicked(value, dataRow) {
      this.onDetailAndCancelClick(dataRow.emailUid);
    },
    onResetClick() {
      utils.forEach(this.searchFrame, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          utils.forEach(this.$refs, (ref, refkey) => {  
            if (utils.startsWith(refkey, 'select')) {
              ref.reset();
            }
          });
        } else if (utils.isEqual(key, 'rangeDate')) {
          this.rangeDataValue= [utils.dateformatToClient(utils.addDay(utils.now('YYYY-MM-DD'), -6), 'S'),utils.dateformatToClient(utils.now())];
        } else {
          this.searchFrame[key] = '';
        }
      });
    },
    onRangeConfirm(value) {
      if (value) { return false; }
      const [from, to] = this.rangeDataValue;
      if (utils.getDayOffset(utils.dateformatToServer(to),utils.dateformatToServer(from)) > 6) {
        this.rangeDataValue = [utils.dateformatToClient(utils.addDay(utils.now('YYYY-MM-DD'), -6), 'S'),utils.dateformatToClient(utils.now())];
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_SEARCH_UNDER_DY'), '7'));
      } else {
        this.searchFrame.rangeDate = this.rangeDataValue;
      }
      return true;
    },
    getSearchData() {
      const data = {
        curPage: 1,
      };
      utils.forEach(this.searchFrame, (value, key) => {
        if (utils.isEqual(key, 'selectedCodeValue')) {
          utils.forEach(value, (codeValue, codekey) => {
            data[codekey] = codeValue.key;
          });
        } else if (utils.isEqual(key, 'rangeDate')) {
          data.searchSendFromDTM = utils.isDate(value.from) ? utils.dateformatToServer(value.from) : '';
          data.searchSendToDTM = utils.isDate(value.to) ? utils.dateformatToServer(value.to, 'S').concat('235959') : '';
        } else {
          data[key] = value;
        }
      });
      return data;
    },
    onSearchClick() {
     this.convertToArray();
      if (this.onClickValidate()) return;
      this.paging.curPage = 1;
      this.paging.searchData = this.getSearchData();
      this.searchAction(false);
    },
    addRows() {
      if (this.paging.count < this.paging.totalCount) {
        this.paging.curPage += 1;
        this.paging.searchData.curPage = this.paging.curPage;
        this.searchAction(true);
      }
    },
    searchAction(addRow) {
      http.request(this.$options.name, 'DTS_MLM_00016', {
        query: this.paging.searchData,
      }).then(res => {
        if (addRow) {
          this.paging.count += res.data.length;
          const union = utils.mergeArray(this.ds0.data, res.data);
          this.ds0.setData(union);
        } else if (res.data.length > 0) {
          this.paging.totalCount = res.data[0].totalCount;
          this.paging.count = res.data.length;
          this.ds0.setData(res.data);
        } else {
          this.paging.totalCount = 0;
          this.paging.count = 0;
          this.ds0.setData([]);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    onDetailAndCancelClick(emailUid) {
      this.emailUid = emailUid;
      this.isShownPopupDetail = !this.isShownPopupDetail;
    },
    /* 달력의 오류를 확인할 수 있는 validate 함수 */
    onClickValidate() {
      if (!this.$refs.dp.isValid()) {
        utils.messageBox('warning', this.$t('MSG_ALT_CHK_DT'), null, null);
        return true;
      }
      return false;
    },
    convertToArray()
    {
      this.searchFrame.rangeDate.from = this.rangeDataValue[0];
      this.searchFrame.rangeDate.to=this.rangeDataValue[1];
     },
  },
};
</script>
<style scoped>
</style>
