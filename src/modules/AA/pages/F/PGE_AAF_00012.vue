<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- 리워드달성 현황 -->
      <ur-form-box toggleable>
        <!-- 회원 ID / 회원 UID -->
        <ur-form-item
          :label="$t('MSG_TXT_ID_OR_MEMUID')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="search.memshpUid"
            :placeholder="placeholderId"
            style="width:100%; height:auto;"
            maxlength="16"
            @enter="onSearch()"
          />
        </ur-form-item>

        <!-- 회차선택 -->
        <ur-form-item
          :label="$t('MSG_TXT_TIMES')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="search.times"
            :items="codes.COD_IAA_RWD_TIMES"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>

        <!-- 기간선택 -->
        <ur-form-item
          :label="$t('MSG_TXT_SELECT_DATE_RANGE')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-range-picker
            v-model="search.achievedDate"
            input-type="YYYY-MM-DD"
            model-type="YYYYMMDD"
            :max-date="maxDate"
            :confirm-label="$t('MSG_BTN_SELT')"
            :clear-label="$t('MSG_BTN_RESET')"
            clearable
          />
        </ur-form-item>
      </ur-form-box>

      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
            v-permission:read="this.$options.name"
            @click="onReset()"
          >
            {{ $t('MSG_BTN_RESET') }} <!-- 초기화 -->
          </ur-button>
          <ur-button
            v-permission:read="this.$options.name"
            color="violet"
            @click="onSearch()"
          >
            {{ $t("MSG_BTN_SEARCH") }} <!-- 검색 -->
          </ur-button>
        </div>
      </div>

      <ur-data-grid
        ref="grid"
        class="mt35"
        :headers="columns"
        :data-source="dataList"
        :options="opts"
        :data-set-options="{id: 'id'}"
        :item-size="totalCount"
      >
        <!-- 엑셀다운로드 -->
        <template #right-info>
          <ur-button @click="onExcelDnLoad()">
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

import CommonUtils from '@/modules/AA/js/common-utils'

export default {
  name: 'PGE_AAF_00012', // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // 공통코드
      codeKeyList: [
        'COD_IAA_RWD_TIMES'
      ],
      codes: {
        COD_IAA_RWD_TIMES: []
      },

      // 검색조건
      search: {
        memshpUid: '',
        times: '',
        achievedDate: [utils.toStringByFormat(utils.addMonth(utils.now('YYYY-MM-DD'), -1), 'YYYYMMDD'), utils.toStringByFormat(utils.now('YYYY-MM-DD'), 'YYYYMMDD')],
      },

      maxDate: utils.dateformatToClient(utils.addDay(utils.now('YYYY-MM-DD'), 0), 'S'),

      placeholderId: utils.strFormat(this.$t('MSG_ALT_CHK_INPUT'), this.$t('MSG_TXT_ID_OR_MEMUID')), // {회원 ID}(을)를 입력해 주세요
      
      // 테이블
      opts: {
        noInfo: false,
        multiSelect: false,
        selectCheckOnly: true,
        resizableColumn: true,
        resizeFullWidth: false,
        height: 450,
      },
      columns: [
        { text: this.$t('MSG_TXT_TIMES'), value: 'rowNum', align: 'center' },
        { text: this.$t('MSG_TXT_ID_OR_MEMUID'), value: 'memshpUid', align: 'center' },
        { text: this.$t('MSG_TXT_STAMP_PAIED_YN'), value: 'stampYn', align: 'center' },
        { text: this.$t('MSG_TXT_STAMP_PAIED_DTM'), value: 'stpPaidDtm', align: 'center' },
        { text: this.$t('MSG_TXT_LATEST_IN_DTM'), value: 'histDtm', align: 'center' },
        { text: this.$t('MSG_TXT_PARK_KIND'), value: 'enterParkKind', align: 'center' },
        { text: this.$t('MSG_TXT_RCV_AGR_YN'), value: 'rcvAgrYn', align: 'center' },
        { text: this.$t('MSG_TXT_AGE_REACH_14_YN'), value: 'age', align: 'center' },
        { text: this.$t('MSG_TXT_CREATE_DTM'), value: 'fstRgstDtm', align: 'center' },
        { text: this.$t('MSG_TXT_MDFC_DTM'), value: 'fnlMdfcDtm', align: 'center' },
      ],
      dataList: new this.$ur.grid.DataSet(),
      dsExcel: new this.$ur.grid.DataSet(),
      totalCount: 0,
    }
  },
  
  created() {
    // 공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {
    }).catch(() => {})
  },
  methods: {
    // 초기화
    onReset() {
      this.search.memshpUid = ''
      this.search.times = ''
      this.search.achievedDate = [utils.toStringByFormat(utils.addMonth(utils.now('YYYY-MM-DD'), -1), 'YYYYMMDD'), utils.toStringByFormat(utils.now('YYYY-MM-DD'), 'YYYYMMDD')]
    },
    // 검색
    onSearch() {
      
      if (!this.validateParam()) { 
        return 
      }

      http.request(this.$options.name, 'DTS_AAF_00024', {
        query: this.getParam(),
      }).then(res => {
        this.totalCount = res.data.totalCount
        this.dataList.setData(res.data.list)
      })
    },
    // 엑셀다운로드
    onExcelDnLoad() {
      
      if (!this.validateParam()) { 
        return 
      }

      http.request(this.$options.name, 'DTS_AAF_00024', {
        query: this.getParam(),
        path: {},
        data: {},
      }).then(res => {
        const excelDataSet = new this.$ur.grid.DataSet()
        excelDataSet.setData(res.data.list)

        const sPageId = this.$contextPageId
        const objGridColumns = this.columns
        const objGridDataset = excelDataSet
        const sToday = utils.now('YYYYMMDDHHmmss')
        const sExcelName = `${this.$t('MSG_TIT_REWARD_ACHIEVE_STATUS')}_${sToday}.xlsx`

        utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {})
      })
    },

    // 검색조건 유효성검사
    validateParam() {
      // eslint-disable-next-line max-len
      if (utils.isEmpty(this.search.memshpUid) && utils.isEmpty(this.search.name) && utils.isEmpty(this.search.contact)) {
        utils.messageBox('warning', this.$t('회원ID/회원UID 는 필수 입력 항목입니다.'))
        return false
      }
      if ((utils.isEmpty(this.search.achievedDate[0]) && !utils.isEmpty(this.search.achievedDate[1])) || (!utils.isEmpty(this.search.achievedDate[0]) && utils.isEmpty(this.search.achievedDate[1]))) {
          utils.messageBox('warning', this.$t('[기간선택]는 시작일과 종료일을 모두 입력해야 합니다.'))
          return false
      }
      return true
    },

    // 검색조건
    getParam() {
      // 검색조건let
      let params = {
        memshpUid: encodeURI(this.search.memshpUid),
        times: this.search.times,
        startDtm: this.search.achievedDate[0],
        endDtm: this.search.achievedDate[1],
      }
      return params
    },
  },
}
</script>
<style scoped>
</style>
