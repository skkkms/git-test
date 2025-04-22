<template>
  <div>
    <div class="mrB20" />
    <div class="comm_scr_wrap">
      <div class="row">
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_DVC_TYPE')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-10">
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
        <div class="col-xs-2">
          <sui-input-label
            :label="$t('MSG_TXT_SEARCH_COND')"
            :required="false"
            :vertical="false"
          />
        </div>
        <div class="col-xs-10">
          <sui-code-select
            ref="codeSelectSearchCondition"
            v-model="queryData.searchCondition"
            :pagedId="contextPageId"
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
    <div class="comm_gridTop_wrap">
      <div
        class="btn_wrapL"
        style="height:24px;"
      >
        <div
          v-show="selectedCount === 0"
          class="totalList"
        >
          {{ totalCntPage }}
        </div>
        <sui-checkbox
          v-show="selectedCount"
          :checked="true"
          :disabled="false"
          class="num"
        >
          {{ selectedCountMsg }}
        </sui-checkbox>
      </div>
    </div>
    <table class="table table-fixed">
      <thead>
        <tr>
          <th style="width:30px;" />
          <th style="width:40px">
            {{ $t('MSG_TXT_NUMBER_ROW') }}
          </th>
          <th style="width:200px">
            {{ $t('MSG_TXT_DSBD_ID') }}
          </th>
          <th style="width:220px">
            {{ $t('MSG_TXT_DSBD_NM') }}
          </th>
          <th class="col-xs">
            {{ $t('MSG_TXT_DVC_TYPE') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <draggable
          ref="linkDrag"
          :list="dsDashBoard"
          :sort="false"
          ghost-class="ghost"
          draggable=".dragitem"
          @start="onDragStart($event)"
          @end="onDragEnd($event)"
        >
          <tr
            v-for="(item, index) in dsDashBoard"
            :key="item.linkUid"
            :class="{ dragitem: item.check }"
          >
            <td style="width:30px;">
              <sui-checkbox
                :checked="item.check"
                :value="item.check"
                style="width:30px; margin-top:8px;"
                @input="onCheckBoxClick(index)"
              />
            </td>
            <td style="width:40px">
              {{ index+1 }}
            </td>
            <td style="width:200px">
              {{ item.dashboardId }}
            </td>
            <td style="width:220px">
              {{ item.dashboardName }}
            </td>
            <td class="col-xs">
              {{ item.deviceTypeName }}
            </td>
          </tr>
        </draggable>
      </tbody>
    </table>
  </div>
</template>
<script>
/* eslint-disable import/no-unresolved */
import draggable from 'vuedraggable';
import BasePage from '~cm/components/BasePage';
import { eventBus } from '../PGE_CMP_00009.vue';

export default {
  name: 'PGE_CMP_00009_T03', // eslint-disable-line vue/name-property-casing
  components: {
    draggable,
  },
  extends: BasePage,
  props: {},
  data() {
    return {
      buff: [],
      dragging: false,
      queryData: {
        searchCondition: '',
        searchText: '',
      },
      dsDashBoard: [],
      selectedCount: 0,
      selectedCountMsg: '',
      readonlyMenu: false,
      // deviceApplyYn: utils.getConfigurationValue('CFG_CMZ_DVC_TYPE_APPY_YN') === 'Y',
      deviceSelectValue: [],
      placeholder: this.$t('MSG_TXT_ALL'),
      searchFieldOldText: '',
    };
  },
  computed: {
    totalCntPage() {
      return utils.strFormat(this.$t('MSG_TXT_LST_CNT'), utils.size(this.dsDashBoard));
    },
  },
  watch: {
    selectedCount(newData) {
      this.selectedCountMsg = utils.strFormat(this.$t('MSG_TXT_CHK_SELT'), this.selectedCount);
    },
  },
  created() {
    this.deviceTypeList = [];
    eventBus.$on('uncheckAllLinks', this.uncheckAllLinks);
  },
  mounted() {
    this.loadDeviceCode();
  },
  beforeDestroy() {
    eventBus.$off('uncheckAllLinks', this.uncheckAllLinks);
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
    onCheckBoxClick(idx) {
      const tmp = this.dsDashBoard[idx];
      tmp.check = !tmp.check;
      tmp.menuTypeCode = 'D';
      this.dsDashBoard.splice(idx, 1, tmp);
      this.selectedCount = utils.size(utils.filter(this.dsDashBoard, { check: true }));
      this.$emit('itemChecked', {
        menuTypeCode: tmp.menuTypeCode,
        itemChecked: utils.filter(this.dsDashBoard, { check: true }),
      });
    },
    onClickSearch() {
      this.$emit('itemChecked', {
        menuTypeCode: 'D',
        itemChecked: [],
      });

      const dataParams = {
        // linkStateCode: '',
        // linkUseYn: 'Y',
        searchCondition: this.queryData.searchCondition,
        searchText: this.queryData.searchText,
        searchDeviceType: this.calculateDeviceTypeValue(),
        deviceTypeBit: 0,
      };
      http.request(this.contextPageId, 'DTS_CMB_00013', {
        query: dataParams,
      }).then(res => {
        this.dsDashBoard = res.data;
        // checkbox add
        utils.forEach(this.dsDashBoard, item => {
          utils.assign(item, { check: false });
        });
        this.selectedCount = utils.size(utils.filter(this.dsDashBoard, { check: true }));
      }).catch(error => {
        console.log(error);
      });
    },
    onClickReset() {
      this.$refs.codeSelectSearchCondition.reset();
      this.queryData.searchText = '';
      this.deviceSelectValue = [];
    },
    onDragStart(e) {
      if (this.readonlyMenu) return false;
      this.dragging = true;
      this.buff = utils.filter(this.dsDashBoard, { check: true });
    },
    onDragEnd(e) {
      if (this.readonlyMenu) return false;
      this.dragging = false;
    },
    uncheckAllLinks() {
      utils.forEach(this.dsDashBoard, (item, index) => {
        const tmp = item;
        tmp.check = false;
        this.dsDashBoard.splice(index, 1, tmp);
      });
      this.selectedCount = utils.size(utils.filter(this.dsDashBoard, { check: true }));
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
  .table-fixed tbody {
    height: 400px;
    border-bottom: 1px solid #ccc;
  }
  .table-fixed tr:hover {
    cursor: default;
  }
  .dragitem {
    background-color: #e9ecf7;
    cursor: move !important;
  }
</style>
