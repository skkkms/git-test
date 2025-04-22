<template>
  <div>
    <div class="mrB20" />
    <div class="comm_scr_wrap">
      <div class="row">
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_DVC_TYPE')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-multi-select
            ref="deviceMultiDropdown"
            v-model="deviceSelectValue"
            :placeholder="placeholder"
            :options="deviceTypeList"
            :multiple="true"
            :closeOnSelect="false"
            :useAllOption="true"
          />
        </div>
        <div class="col-xs-1">
          <sui-input-label
            :label="$t('MSG_TXT_SEARCH_COND')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-5">
          <sui-code-select
            ref="codeSelectSearchCondition"
            v-model="queryData.searchCondition"
            :pagedId="pageId"
            codeId="COD_DSBD_SEARCH_COND"
            :defaultOption="'all'"
          />
          <div class="comp_spacing" />
          <sui-text-field
            ref="searchText"
            v-model="queryData.searchText"
            @keyup.enter="onClickSearch"
            @keyup="onKeyUpInput"
          />
        </div>
      </div>
      <div class="btn_wrap">
        <sui-button
          type="button"
          class="comm_btn_Reset"
          @click="onClickReset"
        >
          {{ $t('MSG_BTN_RESET') }}
        </sui-button>
        <sui-button
          v-permission:read="contextPageId"
          type="button"
          class="comm_btn_Scr"
          @click="onClickSearch"
        >
          {{ $t('MSG_BTN_SEARCH') }}
        </sui-button>
      </div>
    </div>
    <div class="mrB30" />
    <sui-s-grid
      ref="cmu00018t02grid"
      :headers="gridColumns"
      :data-source="dsPopupPage"
      :multiselect="multiSelect"
      :showCountControl="true"
      :showDisplayCountControl="false"
    />
    <div class="comm_btn_wrap">
      <sui-button
        type="button"
        class="comm_btn_border"
        @click="onCancelClick"
      >
        {{ $t('MSG_BTN_CANCEL') }}
      </sui-button>
      <sui-button
        type="button"
        class="comm_btn_solid"
        @click="onSelectClick"
      >
        {{ $t('MSG_BTN_SELT') }}
      </sui-button>
    </div>
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component/index.js';
import BasePage from '~cm/components/BasePage';

export default {
  name: 'PGE_CMU_00018_T02', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    pageId: {
      type: String,
      required: false,
    },
    pageInitialData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      dsPopupPage: new urDataSet(),
      multiSelect: false,
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        multiSelect: false,
        selectCheck: false,
        selectCheckOnly: false,
      },
      queryData: {
        searchCondition: '',
        searchText: '',
      },
      dsDashBoard: [],
      deviceSelectValue: [],
      placeholder: this.$t('MSG_TXT_ALL'),
      searchFieldOldText: '',
    };
  },
  computed: {},
  watch: {},
  created() {
    this.deviceTypeList = [];
    this.gridColumns = [
      {
        text: this.$t('MSG_TXT_DSBD_ID'),
        value: 'dashboardId',
        width: '150',
      },
      {
        text: this.$t('MSG_TXT_DSBD_NM'),
        value: 'dashboardName',
      },
      {
        text: this.$t('MSG_TXT_DVC_TYPE'),
        value: 'deviceTypeName',
        width: '150',
      },
    ];
  },
  mounted() {
    this.loadDeviceCode();
  },

  methods: {
    loadDeviceCode() {
      http.getCodeList(this.pageId, ['COD_DVC_TYPE'], '').then(res => {
        utils.forEach(res['COD_DVC_TYPE'], (value, key) => {
          this.deviceTypeList.push(
            { key: value.key, label: value.codeName },
            // { value: value.key, text: value.codeName },
          );
          this.deviceSelectValue.push(
            { key: value.key, label: value.codeName },
          );
        });
      }).catch(err => {
        console.log(err);
      });
    },
    calculateDeviceTypeValue() {
      let ret = 0;
      utils.forEach(this.deviceSelectValue, (item, key) => {
        ret += Number(item.key);
      });
      return ret;
    },
    onClickSearch() {
      const dataParams = {
        // linkStateCode: '',
        // linkUseYn: 'Y',
        searchCondition: this.queryData.searchCondition,
        searchText: this.queryData.searchText,
        searchDeviceType: this.calculateDeviceTypeValue(),
        deviceTypeBit: 0,
      };
      http.request(this.pageId, 'DTS_CMB_00013', {
        query: dataParams,
      }).then(res => {
        this.dsPopupPage.setData(res.data);
      }).catch(error => {
        console.log(error);
      });
    },
    onClickReset() {
      this.$refs.codeSelectSearchCondition.reset();
      this.queryData.searchText = '';
      this.deviceSelectValue = [];
    },
    onSelectClick() {
      const selectedData = this.dsPopupPage.getSelected();
      if (selectedData.length > 0) {
        // this.closePagePopup(selectedData);
        this.$emit('getDashboardInfo', selectedData);
      } else {
        // 선택 안했을 때
        utils.messageBox('information', this.$t('MSG_ALT_NOT_SEL_ITEM'));
      }
    },
    onCancelClick() {
      this.$emit('close');
    },
    onKeyUpInput() {
      const searchFieldNewText = this.queryData.searchText;

      if (utils.isEmpty(searchFieldNewText) === false) {
        if (utils.isExistSpecialChar(searchFieldNewText) === true) {
          this.conFirm('error', this.$t('MSG_ALT_NO_SPECL_CHAR'), null);
          this.queryData.searchText = this.searchFieldOldText;
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
