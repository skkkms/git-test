<template>
  <div>
    <div class="mrT25"></div>
    <div class="comm_scr_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label :label="$t('MSG_TXT_GNRZ_AREA')" :vertical="false"/>
        </div>
        <div class="col-xs-7">
          <sui-code-select
              :selected="frame2.COD_GNRZ_AREA"
              :pageId="pageId"
              codeId="COD_GNRZ_AREA"
              :defaultOption="'all'"
              :initialSelectedIndex="0"
          />
        </div>
        <div class="btn_wrap">
          <sui-button
              v-permission:read="pageId"
              type="button"
              class="comm_btn_Scr"
              @click="onSearchClick">{{ $t('MSG_BTN_SEARCH') }}</sui-button>
      </div>
    </div>
  </div>
    <div class="comm_shut_wrap">
      <div class="inbox">
       <div class="mrB30"></div>
        <sui-grid
          ref="siteListGrid"
          :columns="gridColumns0"
          :dataset="'dsSiteList'"
          :showCountControl="true"
          :showDisplayCountControl="false"
          :multiselect="true"
        >
        </sui-grid>
      </div>
      <div class="btnbox">
        <ul style="margin-top:50px;">
          <li>
            <sui-button type="button" class="comm_btn_shut_right" @click="onSendRight">오른쪽보내기</sui-button>
          </li>
          <!--<li>
            <sui-button type="button" class="comm_btn_shut_left">왼쪽보내기</sui-button>
          </li>-->
        </ul>
      </div>
      <div class="inbox">
      <div class="mrB30"></div>
        <sui-grid
          ref="qLinkSiteListGrid"
          :columns="gridColumns1"
          :dataset="'dsQLinkSiteList'"
          :showCountControl="true"
          :showDisplayCountControl="false"
          :multiselect="true"
        >
         <div class="comm_line_div"></div>
         <div class="btn_wrapL">
           <sui-button
               v-permission:delete="pageId"
               type="button"
               class="comm_btn_gridTop"
               @click="onDeleteClick">{{ $t('MSG_BTN_DEL') }}</sui-button>
         </div>
       </sui-grid>
      </div>
    </div>
    <div class="comm_btn_wrap">
      <sui-button
          v-permission:update="pageId"
          type="button"
          class="comm_btn_solid"
          @click="onSaveClick">{{ $t('MSG_BTN_SAVE') }}</sui-button>
    </div>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMP_00015_T02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: [
    'pageId',
    'selectedGridRowData',
  ],
  data() {
    return {
      // Codes
      frame2: {
        COD_GNRZ_AREA: {
          label: '',
          key: '',
        },
      },
      localdata0: [],
      gridColumns0: [{
        text: this.$t('MSG_TXT_SITE_ID'),
        datafield: 'siteId',
      }, {
        text: this.$t('MSG_TXT_SITE_ABBR'),
        datafield: 'siteAbbreviationName',
      }, {
        text: this.$t('MSG_TXT_GNRZ_AREA'),
        datafield: 'generalizationAreaName',
      }],
      localdata1: [],
      gridColumns1: [{
        text: this.$t('MSG_TXT_SITE_ID'),
        datafield: 'siteId',
      }, {
        text: this.$t('MSG_TXT_SITE_ABBR'),
        datafield: 'siteAbbreviationName',
      }, {
        text: this.$t('MSG_TXT_GNRZ_AREA'),
        datafield: 'generalizationAreaName',
      }],
    };
  },
  datasets: [{
    id: 'dsSiteList',
    type: 'local',
    data: 'localdata0',
    datafields: [
      { name: 'siteId', type: 'string', map: 'siteId' },
      { name: 'siteAbbreviationName', type: 'string', map: 'siteAbbreviationName' },
      { name: 'generalizationAreaName', type: 'string', map: 'generalizationAreaName' },
    ],
  }, {
    id: 'dsQLinkSiteList',
    type: 'local',
    data: 'localdata1',
    datafields: [
      { name: 'siteId', type: 'string', map: 'siteId' },
      { name: 'siteAbbreviationName', type: 'string', map: 'siteAbbreviationName' },
      { name: 'generalizationAreaName', type: 'string', map: 'generalizationAreaName' },
    ],
  }],
  computed: {},
  watch: {
    selectedGridRowData(obj) {
      if (obj.quickLinkUid) {
        this.getQuickLinkSites(obj.quickLinkUid);
      }
    },
  },
  mounted() {
    if (this.$props.selectedGridRowData) {
      this.getQuickLinkSites(this.$props.selectedGridRowData.quickLinkUid);
    }
  },

  methods: {
    getQuickLinkSites(qLinkUid) {
      http.request(this.pageId, 'DTS_CMP_00051', {
        path: {
          'quick-link-uid': qLinkUid,
        },
      }).then(res => {
        this.localdata1 = res.data;
        this.dsQLinkSiteList.setRawData(this.localdata1);
      }).catch(error => {
        console.log(error);
      });
    },
    onSearchClick() {
      http.request(this.pageId, 'DTS_CMY_00012', {
        query: {
          generalizationAreaCode: utils.trim(this.frame2.COD_GNRZ_AREA.key),
        },
      })
        .then(res => {
          this.localdata0 = res.data;
          this.dsSiteList.setRawData(this.localdata0);
        })
        .catch(error => {
          console.log(error);
        });
    },
    onDeleteClick() {
      const chkArr = this.dsQLinkSiteList.getSelectedIndexes();
      if (chkArr.length) {
        const delArr = [];
        utils.forEach(chkArr, index => {
          if (typeof index === 'number') {
            delArr.push(index);
          }
        });
        this.dsQLinkSiteList.deleteRows(delArr);
      } else {
        utils.messageBox('information', this.$t('MSG_ALT_DEL_NO_DATA'), null, () => false);
      }
    },
    onSaveClick() {
      const qList = this.dsQLinkSiteList.getRawData();

      // if (!utils.size(qList)) return;

      const qLinkUid = this.$props.selectedGridRowData.quickLinkUid;

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null,
        (/* ok */) => {
          const dataParams = [];
          utils.forEach(qList, data => {
            dataParams.push({
              quickLinkUid: qLinkUid,
              siteId: data.siteId,
            });
          });
          http.request(this.pageId, 'DTS_CMP_00052', {
            path: {
              'quick-link-uid': qLinkUid,
            },
            data: dataParams,
          }).then(() => {
            // utils.alert(this.$t('MSG_ALT_SVE_DATA'), this.$t('MSG_BTN_CFRM'));
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'), null);
          }).catch(error => {
            console.log(error);
          });
        },
        (/* cancel */) => {});
    },
    onSendRight() {
      // this._moveRows(this.$refs.siteListGrid, this.$refs.qLinkSiteListGrid);
      this._moveRows(this.dsSiteList, this.dsQLinkSiteList);
    },
    _moveRows(fromGrid, toGrid) {
      // 1. fromGrid check 가져오기
      const chkArr = fromGrid.getSelectedIndexes();

      if (!chkArr.length) return;

      // 2. toGrid으로 추가하기
      const addArr = [];
      for (const i in chkArr) {
        const row = fromGrid.getRawData()[chkArr[i]];
        const toGridArr = toGrid.getRawData();

        if (utils.findIndex(toGridArr, { siteId: row.siteId }) === -1) { // not exist in target grid.
          addArr.push(row);
        }
      }
      toGrid.addRows(addArr);

      // 3. fromGrid 지우기
      fromGrid.deleteRows(chkArr);
      fromGrid.clearSelection();
    },
  },
};
</script>
<style scoped>
</style>
