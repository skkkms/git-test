<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 어트랙션 개별예약현황 -->
      <ur-form-box toggleable>
        <!-- [검색조건] 회원 ID / 회원 UID-->
        <ur-form-item
          :label="$t('MSG_TXT_ID_OR_MEMUID')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            ref="textFieldEngNum"
            v-model="params.memshpUid"
            style="width:100%; height:auto;"
            maxlength="16"
            :placeholder="placeholderId"
            @keyup.enter="onSearch"
          />
        </ur-form-item>
        <!-- [검색조건] 이용권/레니Pass QR -->
        <ur-form-item
          :label="$t('MSG_TXT_PASS_QUEUE')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            ref="textFieldEngNum01"
            v-model="params.qrCd"
            maxlength="100"
            :placeholder="placeholderQr"
            style="width:100%; height:auto;"
            @keyup.enter="onSearch"
            @input="onKeyUpInputEl01"
          />
        </ur-form-item>
        <!-- [검색조건] 개인티켓 ID -->
        <ur-form-item
          :label="$t('MSG_TXT_MEMBER_MYID')"
          class="flex_wrap"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            ref="textFieldEngNum02"
            v-model="params.pticketId"
            maxlength="100"
            :placeholder="placeholderId01"
            style="width:100%; height:auto;"
            @keyup.enter="onSearch"
            @input="onKeyUpInputEl02"
          />
        </ur-form-item>
        <!-- [검색조건] 이용일자 -->
        <ur-form-item
          :label="$t('MSG_TXT_USE_DATE')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-range-picker
            v-model="params.salesDate"
            input-type="YYYY-MM-DD"
            model-type="YYYYMMDD"
            :confirm-label="$t('MSG_BTN_SELT')"
            :clear-label="$t('MSG_BTN_RESET')"
            clearable
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
            v-model="params.faciltName"
            maxlength="100"
            style="width:100%; height:auto;"
            @keyup.enter="onSearch"
            @input="onKeyUpInput"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="onReset">
            {{ $t('MSG_BTN_RESET') }}
          </ur-button>
          <ur-button
            v-permission:read="$options.name"
            color="violet"
            @click="onSearch"
          >
            {{ $t('MSG_BTN_SRCH') }}
          </ur-button>
        </div>
      </div>
      <ur-data-grid
        ref="grid"
        class="mt35"
        :headers="columns"
        :data-source="dataSet"
        :item-size="dataTotalCount"
        :options="opts"
        :data-set-options="{id: 'id'}"
        @grid:paging="pagingChange"
      >
        <template #right-info>
          <ur-button
            v-permission:excel="$options.name"
            @click="onExcelDnLoad"
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
        <template #header>
          <ur-data-grid-header-row>
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell
              colspan="3"
              :text="$t('MSG_TXT_SLOT_INFO')"
              align="center"
            />
            <ur-data-grid-header-cell
                colspan="4"
                :text="$t('MSG_TXT_RSV_INFO')"
                align="center"
            />
            <ur-data-grid-header-cell
                colspan="2"
                :text="$t('MSG_TXT_USED_INFO')"
                align="center"
            />
          </ur-data-grid-header-row>
          <ur-data-grid-header-row>
            <ur-data-grid-header-cell :expand-resizer="1" />
            <ur-data-grid-header-cell :expand-resizer="1" />
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell :expand-resizer="1" />
            <ur-data-grid-header-cell :expand-resizer="1" />
            <ur-data-grid-header-cell :expand-resizer="1" />
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell :expand-resizer="1" />
            <ur-data-grid-header-cell :expand-resizer="2" />
          </ur-data-grid-header-row>
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
  name: 'PGE_AAF_00005', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      alertFlag: true,
      dataSet: new this.$ur.grid.DataSet(),
      dataSetRawData: [],
      dataSetChangedData: [],
      dataTotalCount: 0,
      paging: {
        currentPage: '1',
        rowsPerPage: '30',
      },

      placeholderId: utils.strFormat(this.$t('MSG_ALT_CHK_INPUT'), this.$t('MSG_TXT_ID_OR_MEMUID')), // {회원 ID}(을)를 입력해 주세요
      placeholderQr: utils.strFormat(this.$t('MSG_ALT_CHK_INPUT'), this.$t('MSG_TXT_PASS_QUEUE01')), // {QR 코드}(을)를 입력해 주세요
      placeholderId01: utils.strFormat(this.$t('MSG_ALT_CHK_INPUT'), this.$t('MSG_TXT_MEMBER_MYID')), // {개인티켓 ID}(을)를 입력해 주세요

      params: {
        salesDate: [moment(utils.now('YYYY-MM-DD')).add(-1, 'months').format('YYYY-MM-DD'), utils.now('YYYY-MM-DD')],
        memshpUid: '',
        qrCd: '',
        pticketId: '',
        faciltName: '',
      },
      maxEventStartDate: utils.now('YYYY-MM-DD'),

      // 테이블
      opts: { // 토탈o
        noInfo: false,
        styleBordered: false,
        resizableColumn: true, // 그리드 사이즈
        headerHeight: 36,
        multiSelect: true,
        resizeFullWidth: false,
        height: 570,
        pagination: true,
        defaultPageSize: 30,
        selectCheckOnly: true,
      },

      columns: [
        {
          text: this.$t('MSG_TXT_NUM_SHORT'), value: 'rnum', width: 50, align: 'center',
        },
        {
          text: this.$t('MSG_TXT_USE_DATE'),
          value: 'salesDate',
          width: 100,
          customValue: v => {
            const customValue = utils.dateformatToClient(v)
            return customValue || '-'
          },
        },
        {
          text: this.$t('MSG_TXT_FACILT_NAME'),
          value: 'faciltName',
          customClass: ['underline'],
          click: (v, r) => {
            const params = Object.assign({}, this.params, this.paging, {
              returnPageId: this.$options.name,
              currentFaciltId: r.faciltId,
            })
            utils.goPage('PGE_AAB_00003', { params })
          },
        },
        { text: this.$t('MSG_TXT_FACILT_CATEGORY'), value: 'faciltCateKindNms', width: 150 },
        { text: this.$t('MSG_TXT_FACILT_ZONE_KIND01'), value: 'zoneKindNm', width: 150 },
        { text: this.$t('MSG_TXT_MEMBER_UID'), value: 'memshpUid', width: 130 },
        { text: this.$t('MSG_TXT_PASS_QR'), value: 'qrCd', width: 150 },
        { text: this.$t('줄서기 QR'), value: 'reservQrCd', width: 170 },
        { text: this.$t('MSG_TXT_PTICKET_ID'), value: 'pticketId', width: 170 },
        { text: this.$t('예약상태'), value: 'procStatusNm', width: 100 },
        {
          text: this.$t('MSG_TXT_MUMBER'), value: 'slotSeq', align: 'center', width: 70,
        },
        {
          text: this.$t('MSG_TXT_IAA_START_TIME'),
          value: 'slotStartTime',
          align: 'center',
          width: 70,
          customValue: val => {
            let ev = val ?? ''
            if (ev.length === 4) {
              ev = `${ev.substring(0, 2)}:${ev.substring(2, 4)}`
            }
            return ev || '-'
          },
        },
        {
          text: this.$t('MSG_TXT_IAA_END_TIME'),
          value: 'slotEndTime',
          width: 150,
          align: 'center',
          customValue: val => {
            let ev = val ?? ''
            if (ev.length === 4) {
              ev = `${ev.substring(0, 2)}:${ev.substring(2, 4)}`
            }
            return ev || '-'
          },
        },
        {
          text: this.$t('MSG_TXT_REQ_TIME'),
          value: 'reservReqTime',
          width: 150,
          align: 'center',
          customValue: val => {
            let ev = val ?? ''
            if (ev.length === 4) {
              ev = `${ev.substring(0, 2)}:${ev.substring(2, 4)}`
            }
            return ev || '-'
          },
        },
        {
          text: this.$t('MSG_TXT_IAA_SUCCESS_YN'),
          value: 'reservSucsYn',
          width: 150,
          align: 'center',
        },
        {
          text: this.$t('MSG_TXT_IAA_START_TIME'),
          value: 'useStartTime',
          align: 'center',
          width: 70,
          customValue: val => {
            let ev = val ?? ''
            if (ev.length === 4) {
              ev = `${ev.substring(0, 2)}:${ev.substring(2, 4)}`
            }
            return ev || '-'
          },
        },
        {
          text: this.$t('MSG_TXT_IAA_END_TIME'),
          value: 'useEndTime',
          width: 150,
          align: 'center',
          customValue: val => {
            let ev = val ?? ''
            if (ev.length === 4) {
              ev = `${ev.substring(0, 2)}:${ev.substring(2, 4)}`
            }
            return ev || '-'
          },
        },
        {
          text: this.$t('MSG_TXT_USED_STATUS'),
          value: 'procStatusNm',
          width: 150,
          align: 'center',
        },
        {
          text: this.$t('MSG_TXT_IAM_HOURS_OF_USE'),
          value: 'procStatusTime',
          width: 150,
          align: 'center',
          customValue: val => {
            let ev = val ?? ''
            if (ev.length === 6) {
              ev = `${ev.substring(0, 2)}:${ev.substring(2, 4)}:${ev.substring(4, 6)}`
            }
            return ev || '-'
          },
        },
      ],
    }
  },
  mounted() {
    this.maxEventStartDate = utils.now('YYYY-MM-DD')
    this.onReset()
  },
  methods: {
    onReset() {
      this.params.memshpUid = ''
      this.params.qrCd = ''
      this.params.pticketId = ''
      this.params.faciltName = ''
      this.params.salesDate = ['', '']
    },

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
      let query = {
        memshpUid: encodeURI(this.params.memshpUid),
        qrCd: this.params.qrCd,
        pticketId: this.params.pticketId,
        faciltName: encodeURI(this.params.faciltName),
        salesStartDate: this.params.salesDate[0],
        salesEndDate: this.params.salesDate[1],
      }

      if (!this.validateParam(query)) {
        return
      }

      query = Object.assign(query, this.paging)
      http.request(this.$options.name, 'DTS_AAF_00005', {
        // eslint-disable-next-line object-shorthand
        query: query,
        path: {},
        data: {},
      }).then(res => {
        this.dataTotalCount = res.data.totalCount
        this.dataSet.setData(res.data.list)
      })
    },
    dateDiff(_date1, _date2) {
      let yyyy = parseInt(_date1.substr(0, 4), 10)
      let mm = parseInt(_date1.substr(4, 2), 10) - 1
      let dd = parseInt(_date1.substr(6, 2), 10)
      const diffDate1 = new Date(yyyy, mm, dd)
      yyyy = parseInt(_date2.substr(0, 4), 10)
      mm = parseInt(_date2.substr(4, 2), 10) - 1
      dd = parseInt(_date2.substr(6, 2), 10)
      const diffDate2 = new Date(yyyy, mm, dd)

      let diff = Math.abs(diffDate2.getTime() - diffDate1.getTime())
      diff = Math.ceil(diff / (1000 * 3600 * 24))

      return diff
    },
    validateParam(query) {
      // eslint-disable-next-line max-len
      if (utils.isEmpty(query.memshpUid) && utils.isEmpty(query.qrCd) && utils.isEmpty(query.pticketId) && utils.isEmpty(query.faciltName)) {
        utils.messageBox('warning', this.$t('[회원ID / 회원UID, 개인티켓ID, 이용권/줄서기QR, 시설명] 중 한 개 이상의 검색조건을 입력하세요.'))
        return false
      }
      // 검색조건이 시설명만 있는 경우, 이용일자도 함께 입력되어야 한다.
      // eslint-disable-next-line max-len
      if (utils.isEmpty(query.memshpUid) && utils.isEmpty(query.qrCd) && utils.isEmpty(query.pticketId) && !utils.isEmpty(query.faciltName)) {
        if (utils.isEmpty(query.salesStartDate) && utils.isEmpty(query.salesEndDate)) {
          utils.messageBox('warning', this.$t('시설명으로 검색하는 경우 [이용일자]를 함께 입력해야 합니다.'))
          return false
        }
        // eslint-disable-next-line max-len
        if ((utils.isEmpty(query.salesStartDate) && !utils.isEmpty(query.salesEndDate)) || (!utils.isEmpty(query.salesStartDate) && utils.isEmpty(query.salesEndDate))) {
          utils.messageBox('warning', this.$t('[이용일자]는 시작일과 종료일을 모두 입력해야 합니다.'))
          return false
        }
        // eslint-disable-next-line max-len
        if (!utils.isEmpty(query.salesStartDate) && !utils.isEmpty(query.salesEndDate) && this.dateDiff(query.salesStartDate, query.salesEndDate) > 31) {
          utils.messageBox('warning', this.$t('[이용일자]는 한 달을 초과하여 입력할 수 없습니다.'))
          return false
        }
      }
      return true
    },
    onExcelDnLoad() {
      let query = {
        memshpUid: this.params.memshpUid,
        qrCd: this.params.qrCd,
        pticketId: this.params.pticketId,
        faciltName: this.params.faciltName,
        salesStartDate: this.params.salesDate[0],
        salesEndDate: this.params.salesDate[1],
      }

      // eslint-disable-next-line max-len
      if (utils.isEmpty(query.memshpUid) && utils.isEmpty(query.qrCd) && utils.isEmpty(query.pticketId) && utils.isEmpty(query.faciltName)) {
        utils.messageBox('warning', this.$t('[회원ID / 회원UID, 개인티켓ID, 이용권/줄서기QR, 시설명] 중 한 개 이상의 검색조건을 입력하세요.'))
        return
      }

      query = Object.assign(query, this.paging)

      if (!this.validateParam(query)) {
        return
      }

      http.request(this.$options.name, 'DTS_AAF_00021', {
        // eslint-disable-next-line object-shorthand
        query: query,
        path: {},
        data: {},
      }).then(res => {
        const excelDataSet = new this.$ur.grid.DataSet()
        excelDataSet.setData(res.data)

        const sPageId = this.$contextPageId
        const objGridColumns = this.columns
        const objGridDataset = excelDataSet
        const sToday = utils.now('YYYYMMDDHHmmss')
        const sExcelName = `${this.$t('MSG_TXT_TIT_IAA_F03')}_${sToday}.xlsx`

        utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {})
      })
    },
    onKeyUpInput() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewText = this.params.faciltName
      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR_SRCH'), null, () => {
          this.params.faciltName = this.searchFieldOldText
        })
      } else {
        this.searchFieldOldText = searchFieldNewText
      }
    },
    onKeyUpInputEl(value) { // 영문 / 숫자 입력제한 "params.memshpUid"
      const searchFieldNewText = value
      // eslint-disable-next-line no-underscore-dangle
      if (utils.isEngNum_(searchFieldNewText) || utils.isEmpty(searchFieldNewText)) {
        this.searchFieldOldText = searchFieldNewText
      } else if (this.alertFlag) {
        this.alertFlag = false
        utils.messageBox('warning', this.$t('MSG_ALT_ONLY_ENGLISH_NUMBER'), null, () => {
          this.alertFlag = true
          this.params.memshpUid = this.searchFieldOldText
          this.$refs.textFieldEngNum.focus()
        })
      }
    },
    onKeyUpInputEl01(value) { // 영문 / 숫자 입력제한 "params.memshpUid"
      const searchFieldNewText = value
      // eslint-disable-next-line no-underscore-dangle
      if (utils.isEngNum_(searchFieldNewText) || utils.isEmpty(searchFieldNewText)) {
        this.searchFieldOldText = searchFieldNewText
      } else if (this.alertFlag) {
        this.alertFlag = false
        utils.messageBox('warning', this.$t('MSG_ALT_ONLY_ENGLISH_NUMBER'), null, () => {
          this.alertFlag = true
          this.params.qrCd = this.searchFieldOldText
          this.$refs.textFieldEngNum01.focus()
        })
      }
    },
    onKeyUpInputEl02(value) { // 영문 / 숫자 입력제한 "params.memshpUid"
      const searchFieldNewText = value
      // eslint-disable-next-line no-underscore-dangle
      if (utils.isEngNum_(searchFieldNewText) || utils.isEmpty(searchFieldNewText)) {
        this.searchFieldOldText = searchFieldNewText
      } else if (this.alertFlag) {
        this.alertFlag = false
        utils.messageBox('warning', this.$t('MSG_ALT_ONLY_ENGLISH_NUMBER'), null, () => {
          this.alertFlag = true
          this.params.pticketId = this.searchFieldOldText
          this.$refs.textFieldEngNum02.focus()
        })
      }
    },
  },
}
</script>
