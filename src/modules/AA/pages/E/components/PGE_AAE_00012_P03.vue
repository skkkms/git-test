<template>
  <div>
    <div class="comm_popup_wrap_large">
      <div class="comm_view_wrap">
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_CODE_ID')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-7">
            <sui-text-field
              v-model="selectedRowData.tempCodeId"
              placeholder="Input text"
              :disabled="true"
            />
          </div>
          <div class="col-xs-1 nodata" />
          <div class="col-xs-3" />
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_CODE_STRT_TYPE')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-7">
            <sui-text-field
              v-model="selectedRowData.tempCdstTypeName"
              placeholder="Input text"
              :disabled="true"
            />
          </div>
          <div class="col-xs-1 nodata" />
          <div class="col-xs-3" />
        </div>
        <div class="row">
          <div class="col-xs-1">
            <sui-input-label
              :label="$t('MSG_TXT_SUB_CODE_SELECT')"
              :required="false"
              :vertical="false"
            />
          </div>
          <div class="col-xs-11">
            <!-- <sui-grid
              ref="grid1"
              :columns="gridColumns"
              :showDisplayCountControl="false"
              :initialPagesize="10"
              :dataset="'dsData'"
            /> -->
            <sui-s-grid
              ref="grid1"
              :multiselect="true"
              class="width100"
              :headers="gridColumns"
              :showRowsPerPageControl="false"
              :initialRowsPerPage="10"
              :data-source="dsData"
              :options="options"
            />
          </div>
        </div>
      </div>
      <div class="comm_btn_wrap mrR30">
        <sui-button
          type="button"
          class="comm_btn_border"
          @click="onClickBtnCancel"
        >
          {{ $t("MSG_BTN_CANCEL") }}
        </sui-button>
        <sui-button
          type="button"
          class="comm_btn_solid"
          @click="onClickBtnSelect"
        >
          {{ $t("MSG_BTN_SELT") }}
        </sui-button>
      </div>
    </div>
  </div>
</template>
<script>
// import - libraries (node modules)
// import - local files (js, vue, ...)
import { urDataSet } from 'uidev-component/index';
import BasePage from '~cm/components/BasePage';
// 페이지 에서 사용하는 code 목록 기술
const PARENT_PAGE_NAME = 'PGE_AAE_00012';
export default {
  name: 'PGE_AAE_00012_P03', // eslint-disable-line vue/name-property-casing
  extends: BasePage,
  props: {
    selectedRowData: {
      type: Object,
      required: true,
      validator(obj) {
        const has = Object.prototype.hasOwnProperty;
        return has.call(obj, 'tempCodeId')
                && has.call(obj, 'tempCdstType');
      },
    },
  },
  data() {
    return {
      // 이하 data field는 자유롭게
      selectedCodeValue: {
        COD_CD_MGT_SEARCH: {
          label: '',
          key: '',
        },
      },
      count: 0,
      localdata0: [],
      gridColumns: [
        {
          text: this.$t('MSG_TXT_CODE_NAME'),
          value: 'codeName',
          width: 150,
        }, {
          text: this.$t('MSG_TXT_CODE_ENAME'),
          value: 'codeEngName',
        }, {
          text: this.$t('MSG_TXT_SUB_CODE_ID'),
          value: 'codeId',
        }, {
          text: this.$t('MSG_TXT_CODE_VALID_VAL'),
          value: 'codeValidityValue',
          width: 150,
        }],
      selectedGridRowData: [],
      dsData: new urDataSet(),
      options: {
        infinityScroll: true,
        noBaseInfo: false,
        internalPaging: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
      },
    };
  },
  computed: {
    // 계산된 속성, property로 사용가능
    doubleCount() {
      return this.count * 2;
    },

  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  mounted() {
    // DOM이 document에 append된 상태, 실제 element에 접근 가능 (this.$el or this.$refs)
    // 주로 데이터 패치 등을 함
    // this.loadCode().then(() => {
    //
    // });
    this.loadData();
  },
  // datasets: [{
  //   id: 'dsData',
  //   type: 'local',
  //   data: 'localdata0',
  //   datafields: [
  //     { name: 'chk', type: 'string', map: 'chk' },
  //     { name: 'codeName', type: 'string', map: 'codeName' },
  //     { name: 'codeEngName', type: 'string', map: 'codeEngName' },
  //     { name: 'codeId', type: 'string', map: 'codeId' },
  //     { name: 'codeValidityValue', type: 'string', map: 'codeValidityValue' },
  //   ],
  // }],
  methods: {
    loadCode() {
    },
    loadData() {
      // get contents data, grid etc..

      if (!utils.isEmpty(this.selectedRowData)) {
        if (!utils.isEmpty(this.selectedRowData.tempCodeId)) {
          this.selectSubDetail(this.selectedRowData.tempCodeId);
        }
      }
    },
    // 내부 함수 기술
    // 이벤트 핸들러 기술, prefix on 적용
    onClick() {
      this.count += 1;
    },
    onClickBtnSelect() {
      if(utils.isEmpty(this.dsData.getSelected())) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SELECT_SUBCODE'));
        return;
      }
      const selectedData = this.dsData.getSelected();
      const dataParams = [];
      if (selectedData.length === 0) {
        dataParams.push({
          lowerCodeId: this.selectedRowData.tempCodeId,
        });
      } else {
        utils.forEach(selectedData, item => {
          dataParams.push({
            codeId: item.codeId,
            codeValidityValue: item.codeValidityValue,
            lowerCodeId: this.selectedRowData.tempCodeId,
          });
        });
      }

      http.request(PARENT_PAGE_NAME, 'DTS_AAI_00019', { // dataservices reg.
        path: {},
        data: dataParams,
      }).then(res => {
        this.$emit('save');
      }).catch(error => {
        console.log(error);
      });
    },
    onClickBtnCancel() {
      this.$emit('cancel');
    },
    selectSubDetail(sCodeId) {
      http.request(PARENT_PAGE_NAME, 'DTS_AAI_00018', {
        query: {
          codeId: sCodeId || '',
          codeValueValidityDTMUseYn: 'N',
        },
      }).then(res => {
        const selectedIdxs = [];
        utils.forEach(res.data, (item, index) => {
          if (item.chk === 'Y') {
            selectedIdxs.push(index);
          }
        });
        this.dsData.setData(res.data);
        selectedIdxs.forEach(rows => {
          this.$refs.grid1.setSelectIndex(rows);
        });
      }).catch(error => {
        console.log(error);
      });
    },
  },
};
</script>
<style scoped>
</style>
