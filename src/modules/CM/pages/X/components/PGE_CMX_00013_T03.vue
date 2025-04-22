<template>
  <div>
    <div class="mrB20" />
    <sui-grid
      ref="grid"
      :initial-pagesize="5"
      :columns="gridColumns"
      :dataset="'dsOS'"
      :showDisplayCountControl="false"
    />
    <div class="comm_btn_wrap">
      <sui-button
        type="button"
        class="comm_btn_solid"
        :disabled="!(flags.isDevelop || flags.isRejected || flags.isApproved || flags.isUnpublished)"
        @click="onClickSave"
      >
        {{ $t("MSG_BTN_SAVE") }}
      </sui-button> 
    </div>
  </div>
</template>
<script>
import BasePage from '~cm/components/BasePage';
import {urDataSet} from 'uidev-component/index.js';

export default {
  name: 'PGE_CMX_00013_T03', // eslint-disable-line vue/name-property-casing
  components: {},
  extends: BasePage,
  props: {
    selectedGridRowMobileAppMgmtData: {
      type: Object,
      required: false,
    },
    selectedGridRowMobileAppVersionData: {
      type: Object,
      required: false,
    },
    flags: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      gridColumns: [
        {
          datafield: 'useYn',
          text: this.$t('MSG_TXT_USE_YN'),
          createwidget: (row, column, value, htmlElement) => {
            utils.getGridCellFactory().createCellSegmentBox(
              row,
              column,
              value,
              htmlElement,
              {},
              this.dsOS,
              this.$refs.grid,
            );
          },
          initwidget(row, column, value, htmlElement) {
            utils.getGridCellFactory().refreshCell(row, column, value, htmlElement);
          },
        },
        {
          datafield: 'osid',
          text: this.$t('MSG_TXT_OS_ID'),
        },
        {
          datafield: 'ostypeName',
          text: this.$t('MSG_TXT_OS_TYP'),
        },
        {
          datafield: 'osversionName',
          text: this.$t('MSG_TXT_OS_VER_CD'),
        },
        {
          datafield: 'osname',
          text: this.$t('MSG_TXT_OS_NM'),
        },
        {
          datafield: 'osapiLevel',
          text: this.$t('MSG_TXT_OS_API_LVL'),
        },
      ],
    };
  },
  computed: {},
  datasets: [{
    id: 'dsOS',
    type: 'local',
    datafields: [
      { name: 'useYn', type: 'string', map: 'useYn' },
      { name: 'mobileApplicationId', type: 'string', map: 'mobileApplicationId' },
      { name: 'mobileApplicationVersionId', type: 'string', map: 'mobileApplicationVersionId' },
      { name: 'osid', type: 'string', map: 'osid' },
      { name: 'osname', type: 'string', map: 'osname' },
      { name: 'osapiLevel', type: 'string', map: 'osapiLevel' },
      { name: 'osversionName', type: 'string', map: 'osversionName' },
      { name: 'ostypeName', type: 'string', map: 'ostypeName' },
    ],
  }],
  watch: {
    selectedGridRowMobileAppVersionData(selectObj) {
      if (!utils.isEmpty(selectObj)) {
        this.supportedOSListLoad();
      } else {
        this.resetTab();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (!utils.isEmpty(this.selectedGridRowMobileAppVersionData)) {
        this.supportedOSListLoad();
      }
    });
  },

  methods: {
    resetTab() {
      this.tabGridClear();
    },
    supportedOSListLoad() {
      const dataParams = {
        mobileApplicationId: this.selectedGridRowMobileAppVersionData.mobileApplicationId,
        mobileApplicationVersionId: this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId,
      };
      const mobileApplicationId = this.selectedGridRowMobileAppVersionData.mobileApplicationId;
      const mobileApplicationVersionId = this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId;
      http.request(this.contextPageId, 'DTS_CMX_00049', {
        path: {
          'mobile-application-id': mobileApplicationId,
          'mobile-application-version-id': mobileApplicationVersionId,
        },
      }).then(res => {
        this.dsOS.setRawData(res.data);
      });
    },
    tabGridClear() {
      this.dsOS.setRawData([]);
    },
    onClickSave() {
      if (utils.isEmpty(this.selectedGridRowMobileAppVersionData)) {
        utils.messageBox('alert', null, this.$t('MSG_ALT_NOT_SEL_ITEM'));
        return;
      }
      const mobileApplicationId = this.selectedGridRowMobileAppVersionData.mobileApplicationId;
      const mobileApplicationVersionId = this.selectedGridRowMobileAppVersionData.mobileApplicationVersionId;
      const dataList = this.dsOS.getRawData();
      dataList.forEach(element => {
        element.mobileApplicationId = mobileApplicationId;
        element.mobileApplicationVersionId = mobileApplicationVersionId;
      });
      http.request(this.contextPageId, 'DTS_CMX_00050', {
        data: dataList, // this.supportedOSListToSave, // 
        path: {
          'mobile-application-id': mobileApplicationId,
          'mobile-application-version-id': mobileApplicationVersionId,
        },
      }).then(() => {
        utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'));
      });
    },
  },
};
</script>
<style scoped>
</style>
