<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 시설 시간대별 대기시간 현황 탭 DTS_AAF_00006-->
      <ur-form-box toggleable>
        <!-- [검색조건] 영업일자 -->
        <ur-form-item
          :label="$t('MSG_TXT_BUSINESS_DT')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-picker
            v-model="params.salesDate"
            input-type="YYYY-MM-DD"
            model-type="YYYYMMDD"
            :confirm-label="$t('MSG_BTN_SELT')"
            :today-label="$t('MSG_BTN_TODAY')"
            :max-date="maxEventStartDate"
          />
        </ur-form-item>
        <!-- [검색조건] 시설 카테고리 -->
        <ur-form-item
          :label="$t('MSG_TXT_FACILT_CATEGORY')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="params.faciltCateKindCd"
            :items="codes.COD_IA_EL_FACILT_CATE_KIND"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>
        <!-- [검색조건] Zone 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_FACILT_ZONE_KIND01')"
          class="flex_wrap"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="params.zoneKindCd"
            :items="codes.COD_IA_EL_ZONE_KIND"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>
        <!-- [검색조건] 시설 -->
        <ur-form-item
          :label="$t('MSG_TXT_FACILITY')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            style="width:100%; height:auto;"
            v-model="params.faciltName"
            @keyup.enter="onSearch"
            @input="onKeyUpInput"
            maxlength="100"
          />
        </ur-form-item>
        <!-- [검색조건] 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_DIV')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="params.parkKindCd"
            value="01" sm > EL </ur-radio>
          <ur-radio
            v-model="params.parkKindCd"
            value="02" sm > CB </ur-radio>
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
          @click="onReset"
          >
           {{ $t('MSG_BTN_RESET')}}
          </ur-button>
          <ur-button
            color="violet"
            v-permission:excel="$options.name"
            @click="onSearch"
          >
           {{ $t('MSG_BTN_SEARCH')}}
          </ur-button>
        </div>
      </div>
      <!-- E :: 시설 시간대별 대기시간 현황 탭-->

      <ur-data-grid
        ref="grid"
        class="mt35"
        :headers="columns"
        :data-source="dataSet"
        :item-size="dataTotalCount"
        :options="opts"
        @grid:paging="pagingChange"
        :data-set-options="{id: 'id'}"
      />
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAF_00008', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      CODE_KEYS: ['COD_IA_EL_FACILT_CATE_KIND', 'COD_IA_EL_ZONE_KIND'],
      codes: {
        COD_IA_EL_FACILT_CATE_KIND: [],
        COD_IA_EL_ZONE_KIND: [],
      },

      dataSet: new this.$ur.grid.DataSet(),
      dataSetRawData: [],
      dataSetChangedData: [],
      dataTotalCount: 0,
      paging: {
        currentPage: '1',
        rowsPerPage: '30',
      },

      params: {
        salesDate: '',
        faciltCateKindCd: '',
        zoneKindCd: '',
        faciltName:'',
        parkKindCd: '01',
      },
      maxEventStartDate : utils.now('YYYY-MM-DD'),

      // 테이블
      opts: { // 토탈o
        styleBordered: false,
        resizableColumn: true,
        headerHeight: 36,
        resizeFullWidth: false,
        noInfo: false,
        height: 570,
        pagination: true,
        defaultPageSize: 30,
        selectCheckOnly: true,
      },

      columns: [],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
    this.maxEventStartDate = utils.now('YYYY-MM-DD');

    this.columns = [
      {
        text: this.$t('No.'), value: 'rnum', width: 50, align: 'center',
      },
      {
        text: this.$t('MSG_TXT_DIV'),
        value: 'parkKindCd',
        width: 50,
        customValue: v => {
          if (v === '01') v = 'EL'
          else if (v === '02') v = 'CB'
          return v ? v : '-'
        },
      },
      {
        text: this.$t('MSG_TXT_BUSINESS_DT'),
        value: 'salesDate',
        width: 100,
        customValue: v => {
          v = utils.dateformatToClient(v)
          return v ? v : '-'
        },
      },
      { text: this.$t('MSG_TXT_FACILT_NAME'), value: 'faciltName', customValue:v=>v?v:'-', },
      { text: this.$t('MSG_TXT_FACILT_CATEGORY'), value: 'faciltCateKindNms', width: 140, customValue:v=>v?v:'-', },
      { text: this.$t('MSG_TXT_FACILT_ZONE_KIND01'), value: 'zoneKindNm', width: 150, customValue:v=>v?v:'-', },
      { text: this.$t('MSG_TXT_TIME08_TIME09'), value: 'waitAvg08Time', width: 100, customValue:v=>v?v:'-', },
      { text: this.$t('MSG_TXT_TIME09_TIME10'), value: 'waitAvg09Time', width: 100, customValue:v=>v?v:'-', },
      { text: this.$t('MSG_TXT_TIME10_TIME11'), value: 'waitAvg10Time', width: 100, customValue:v=>v?v:'-', },
      { text: this.$t('MSG_TXT_TIME11_TIME12'), value: 'waitAvg11Time', width: 100, customValue:v=>v?v:'-', },
      { text: this.$t('MSG_TXT_TIME12_TIME13'), value: 'waitAvg12Time', width: 100, customValue:v=>v?v:'-', },
      { text: this.$t('MSG_TXT_TIME13_TIME14'), value: 'waitAvg13Time', width: 100, customValue:v=>v?v:'-', },
      { text: this.$t('MSG_TXT_TIME14_TIME15'), value: 'waitAvg14Time', width: 100, customValue:v=>v?v:'-', },
      { text: this.$t('MSG_TXT_TIME15_TIME16'), value: 'waitAvg15Time', width: 100, customValue:v=>v?v:'-', },
      { text: this.$t('MSG_TXT_TIME16_TIME17'), value: 'waitAvg16Time', width: 100, customValue:v=>v?v:'-', },
      { text: this.$t('MSG_TXT_TIME17_TIME18'), value: 'waitAvg17Time', width: 100, customValue:v=>v?v:'-', },
      { text: this.$t('MSG_TXT_TIME18_TIME19'), value: 'waitAvg18Time', width: 100, customValue:v=>v?v:'-', },
      { text: this.$t('MSG_TXT_TIME19_TIME20'), value: 'waitAvg19Time', width: 100, customValue:v=>v?v:'-', },
    ];
    this.onSearch()
  },
  methods: {
    pagingChange(paging) {
      /**
       * [ Grid Pagination ]
       *  currentPage
       *  firstIndex
       *  oldPerPage
       *  rowsPerPage
       *  totalItems
       *  totalPages
       */
      this.paging = paging
      this.onSearch()
    },
    onSearch() {
      console.log('onSearch')
      const query = Object.assign({}, this.params, this.paging)
      query.faciltName = encodeURI(query.faciltName);
      console.log('REQ', query)
      //const serviceName = 'DTS_AAB_00014'
      http.request(this.$options.name, 'DTS_AAF_00006', {
        query: query,
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        this.dataTotalCount = res.data.totalCount
        this.dataSet.setData(res.data.list)
      })
    },
    onReset() {
      this.params = {
      salesDate: '',
      faciltCateKindCd: '',
      zoneKindCd: '',
      faciltName:'',
      parkKindCd: '01', // 라디오 초기화 
      }
    },
    // [검색조건 특수문자 입력 제한]
    onKeyUpInput() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewText = this.params.faciltName;
      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR_SRCH'), null, () => {
          this.params.faciltName = this.searchFieldOldText;
        });
      } else {
        this.searchFieldOldText = searchFieldNewText;
      }
    },
  },
}
</script>
<style scoped>
</style>
