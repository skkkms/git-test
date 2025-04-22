<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 어트랙션 예약현황 -->
      <ur-form-box toggleable>
        <!-- [검색조건] 영업일자 -->
        <ur-form-item
          :label="$t('MSG_TXT_BUSINESS_DT')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
          required
        >
          <ur-date-picker
            v-model="params.salesDate"
            init="today"
            input-type="YYYY-MM-DD"
            model-type="YYYYMMDD"
            :confirm-label="$t('MSG_TXT_SELT')"
            :max-date="maxEventStartDate"
            :today-label="$t('MSG_BTN_TODAY')"
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
          :label="$t('MSG_TXT_FACILT_ZONE_KIND')" 
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
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
          @click="onReset"
          >
            {{ $t('MSG_BTN_RESET') }}
          </ur-button>
          <ur-button
            color="violet"
            v-permission:read="$options.name"
            @click="onSearch"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </ur-button>
        </div>
      </div>
      <!-- [엑셀다운로드] -->
      <ur-data-grid
        ref="grid"
        class="mt35"
        :headers="columns"
        :data-source="dataSet"
        :item-size="dataTotalCount"
        :options="opts"
        @grid:paging="pagingChange"
        :data-set-options="{id: 'id'}"
      >
        <template #right-info>
          <ur-button 
            @click="onExcelDnLoad"
            v-permission:excel="$options.name"
            >
            <ur-icon
              icon="download"
              icon-type="line"
              size="small"
              spacing
            />
            {{ $t('MSG_TXT_EXCEL_DOWNLOAD') }}
          </ur-button>
        </template>
      </ur-data-grid>
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_AAF_00004', // eslint-disable-line vue/name-property-casing
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
      },
      maxEventStartDate : utils.now('YYYY-MM-DD'),

      // 테이블
      opts: { // 토탈o
        noInfo: false,
        styleBordered: false,
        resizableColumn: true,
        headerHeight: 36,
        multiSelect: true,
        resizeFullWidth: false,
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

    this. columns = [
        { text: this.$t('MSG_TXT_NUM_SHORT'), value: 'rnum', width: 50, align: 'center', },
        { text: this.$t('MSG_TXT_BUSINESS_DT'),
          value: 'salesDate', 
          width: 100,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v ? v : '-'
          },
        },
        {
          value: 'faciltName',
          text: this.$t('MSG_TXT_FACILT_NAME'), 
          customClass: ['underline'],
          click: (v, r)=>{
            const params = Object.assign({}, this.params, this.paging, { 
              returnPageId: this.$options.name,
              currentFaciltId: r.faciltId,
            })
            utils.goPage('PGE_AAB_00003', { params })
          },
        },
        { text: this.$t('MSG_TXT_FACILT_CATE'), value: 'faciltCateKindNms', width: 150 },
        { text: this.$t('MSG_TXT_FACILT_ZONE_KIND'), value: 'zoneKindNm', width: 150,},
        {
          text: this.$t('MSG_TXT_SLOT_TIME'), value: 'slotTime', width: 150,
          customValue: (val, row) => {
            let sv = row.slotStartTime ?? ''
            let ev = row.slotEndTime ?? ''
            if (sv.length === 4) {
              sv = sv.substring(0,2) + ':' + sv.substring(2,4)
            }
            if (ev.length === 4) {
              ev = ev.substring(0,2) + ':' + ev.substring(2,4)
            }
            const v = sv + ' ~ ' + ev
            return v
          },
        },
        { text: this.$t('MSG_TXT_DTST_STT'), value: 'statusCdNm', width: 170, customValue: v => v ? v : '-'  },
        { text: this.$t('MSG_TXT_WIN_RSV_APPL_CNT'), value: 'winRsvCnt', type:'number', width: 150 },
        { text: this.$t('MSG_TXT_RSV_APPL_CNT'), value: 'rsvReqCnt', type:'number', width: 120 },
        { text: this.$t('MSG_TXT_RSV_COMPLETE_CNT'), value: 'rsvWinCnt', type:'number' , width: 120 },
        { text: this.$t('MSG_TXT_USE_COMPLETE_CNT'), value: 'usedCnt', type:'number' ,width: 120},
        { text: this.$t('MSG_TXT_USE_CANCEL_CNT'), value: 'cnclCnt', type:'number' ,width: 120},
        { text: this.$t('MSG_TXT_RSV_NOSHOW_CNT'), value: 'noneCnt', type:'number' ,width: 120},
      ];
     // this.onSearch()
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
      // [노출기간 필수 체크]
      if (utils.isEmpty(this.params.salesDate[0])) {
        utils.messageBox('warning', this.$t('기간이 입력되지 안았습니다.')); // 기간이 입력되지 안았습니다. MSG_TXT_NO_EVNT
        return
      }
      
      const query = Object.assign({}, this.params, this.paging)
      query.faciltName = encodeURI(query.faciltName);
      http.request(this.$options.name, 'DTS_AAF_00004', {
        query: query,
        path: {},
        data: {},
      }).then(res => {
        this.dataTotalCount = res.data.totalCount
        this.dataSet.setData(res.data.list)
      })
    },

    onReset() {
      const dt = new Date()
      let day = dt.getDate()
      let month = dt.getMonth() + 1
      const year = dt.getFullYear()
      if (day < 10) {
        day = `0${day}`
      }

      if (month < 10) {
        month = `0${month}`
      }

      const fmt = `${year}${month}${day}`
      this.params = {
      salesDate: fmt,
      faciltCateKindCd: '',
      zoneKindCd: '',
      faciltName:'',
      }
    },
    onExcelDnLoad() {
      // [노출기간 필수 체크]
      if (utils.isEmpty(this.params.salesDate[0])) {
        utils.messageBox('warning', this.$t('기간이 입력되지 안았습니다.')); // 기간이 입력되지 안았습니다. MSG_TXT_NO_EVNT
        return
      }

      const query = Object.assign({}, this.params, this.paging)

      http.request(this.$options.name, 'DTS_AAF_00020', {
        query: query,
        path: {},
        data: {},
      }).then(res => {

        if(!utils.isEmpty(res.data)) {
          res.data.forEach(row => {
            let sv = row.slotStartTime ?? ''
            let ev = row.slotEndTime ?? ''
            if (sv.length === 4) {
              sv = sv.substring(0,2) + ':' + sv.substring(2,4)
            }
            if (ev.length === 4) {
              ev = ev.substring(0,2) + ':' + ev.substring(2,4)
            }
            const v = sv + ' ~ ' + ev
            row.slotTime = v
          });
        }

        const excelDataSet = new this.$ur.grid.DataSet();
        excelDataSet.setData(res.data);

        const sPageId = this.$contextPageId;
        const objGridColumns = this.columns;
        const objGridDataset = excelDataSet;
        const sToday = utils.now('YYYYMMDDHHmmss');
        const sExcelName = `${this.$t('MSG_TXT_IAA_F02')}_${sToday}.xlsx`;

        utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {});
      })

    },
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
