<template>
  <sui-page class="custom_page">
    <!-- S :: 일별 가상대기 capa 관리 탭-->
    <ur-form-box toggleable>
      <!-- 영업일자 -->
      <ur-form-item
        :label="$t('MSG_TXT_BUSINESS_DT')"
        :label-align="'right'"
        style="width:50%; height:auto;"
        class="flex_wrap"
      >
        <!-- 검색조건 : 영업일자 -->
        <ur-date-picker
          v-model="params.salesDate"
          input-type="YYYY-MM-DD"
          model-type="YYYYMMDD"
          :confirm-label="$t('선택')"
          :today-label="$t('오늘')"
        />
      </ur-form-item>
      <ur-form-item
        :label="$t('MSG_TXT_FACILT_NAME')"
        :label-align="'right'"
        style="width:50%; height:auto;"
        class="flex_wrap"
      >
        <!-- 검색조건 : 시설명 -->
        <ur-text-field
          v-model="params.faciltName"
          maxlength="300"
          style="width: 100%;"
          @keydown.enter="onSearch"
        />
      </ur-form-item>
      <ur-form-item
        :label="$t('MSG_TXT_FACILT_CATEGORY')"
        :label-align="'right'"
        style="width: 50%; height: auto;"
        class="flex_wrap"
      >
        <!-- 검색조건EL : 시설 카테고리 -->
        <ur-dropdown
          v-model="params.faciltCateKindCd"
          :items="COD_IA_FACILT_CATE_KIND"
          no-select="no-select"
          :msg-no-select="$t('MSG_TXT_ALL')"
        />
      </ur-form-item>
      <ur-form-item
        :label="$t('MSG_TXT_FACILT_ZONE_KIND')"
        :label-align="'right'"
        style="width: 50%; height: auto;"
        class="flex_wrap"
      >
        <!-- 검색조건EL : Zone 구분 -->
        <ur-dropdown
          v-model="params.zoneKindCd"
          :items="COD_IA_ZONE_KIND"
          no-select="no-select"
          :msg-no-select="$t('MSG_TXT_ALL')"
        />
      </ur-form-item>
    </ur-form-box>
    <div class="btn_wrap mt10">
      <div class="right_box">
        <!-- 검색조건EL : 조회 및 리셋 -->
        <ur-button @click="onReset">
          {{ $t('MSG_BTN_RESET') }}
        </ur-button>
        <ur-button
          color="violet"
          @click="onSearch"
        >
          {{ $t('MSG_BTN_SEARCH') }}
        </ur-button>
      </div>
    </div>
    <!-- E :: 일별 가상대기 capa 관리 탭-->

    <!-- S :: 일별 가상대기 capa 관리 목록 테이블-->
    <template>
      <!-- 데이타그리드EL  "custom_grid_pgeNav_None mt35"  "custom_grid_type1 mt35" -->
      <ur-data-grid
        ref="grid"
        class="custom_grid_type1 mt35"
        :headers="columns"
        :data-source="dataSet"
        :options="opts"
        :item-size="dataTotalCount"
        style="height: calc(100% - 40px)"
        @grid:paging="pagingChange"
        @grid:selected="onSelectRow"
      >
        <template #right-info>
          <ur-button
            color="violet"
            @click="openBatchMgr"
          >
            {{ $t('MSG_TXT_FACILT_CAPA_BLK_CREATE') }}
          </ur-button>
          <ur-button
            color="violet"
            @click="onSave"
          >
            {{ $t('MSG_BTN_SAVE') }}
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
            <ur-data-grid-header-cell colspan="2" text="예약 정보" align="center" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
          </ur-data-grid-header-row>
          <ur-data-grid-header-row>
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell :expand-resizer="2" />
          </ur-data-grid-header-row>
        </template>
      </ur-data-grid>
    </template>
    <!-- E :: 일별 가상대기 capa 관리 목록 테이블-->
    <div class="btn_wrap mt10">
      <div class="right_box"></div>
    </div>

    <!-- S :: 일별 가상대기 capa 관리 테이블-->
    <template>
      <ur-data-grid
        ref="gridDetail"
        :headers="columnsDetail"
        :data-source="dataSetDetail"
        :options="optsDetail"
        class="custom_grid_pgeNav_None"
      >
        <template #header>
          <ur-data-grid-header-row>
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- slot seq -->
            <ur-data-grid-header-cell colspan="2" text="Slot 정보" align="center" />
            <ur-data-grid-header-cell colspan="2" text="예약 정보" align="center" />
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 예약인원 -->
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 최소인원(전체) -->
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 최소인원(확정) -->
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 전체 capa -->
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 사전예약 건수 -->
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 당일 capa -->
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 운영 상태 -->
            <ur-data-grid-header-cell v-if="SHOW_DRAW_TIME" rowspan="2" align="center" /><!-- 추첨결과발표시간 -->
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 등록일시 -->
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 등록자 -->
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 수정일시 -->
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 수정자 -->
          </ur-data-grid-header-row>
          <ur-data-grid-header-row>
            <ur-data-grid-header-cell :expand-resizer="2" align="center" />
            <ur-data-grid-header-cell :expand-resizer="2" align="center" />
            <ur-data-grid-header-cell :expand-resizer="2" align="center" />
            <ur-data-grid-header-cell :expand-resizer="2" align="center" />
          </ur-data-grid-header-row>
        </template>
      </ur-data-grid>
    </template>
    <div class="btn_wrap mt10">
      <div class="right_box">
        <ur-button
          color="violet"
          @click="onChangeCapa"
        >
          {{ $t('MSG_BTN_MDFC') }}
        </ur-button>
      </div>
    </div>
  </sui-page>
</template>
<script>

const PARK_KIND_CD = '02' // '01' 에버랜드 , '02' 캐리비안베이

export default {
  name: 'PGE_AAB_00064_T02', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      dataTotalCount: 0,
      dataSet: new this.$ur.grid.DataSet(),
      dataSetDetail: [],
      dataSetRawData: [],
      opts: {
        styleBordered: false,
        resizableColumn: true,
        headerHeight: 36,
        multiSelect: false,
        selectCheck: true,
        selectCheckOnly: false,
        resizeFullWidth: true,
        noInfo: false,
        height: 570,
        pagination: true,
        defaultPageSize: 10,
      },
      optsDetail: {
        height: 450,
        pagination: false,
        noInfo: true,
        noBaseInfo: true,
        multiSelect: false,
        selectCheck: false,
        selectCheckOnly: true,
        styleBordered: false,
        resizableColumn: true,
      },
      paging: {
        currentPage: '1',
        rowsPerPage: '10',
      },
      params: {
        parkKindCd: PARK_KIND_CD, // '01' 에버랜드 , '02' 캐리비안베이
        salesDate: '',
        faciltName: '',
        faciltCateKindCd: '',
        zoneKindCd: '',
      },
      SHOW_DRAW_TIME: true,
      CURRENT_FACILT_ID: '',
      CODE_KEYS: [
        'COD_RS_PARK_KIND',
        'COD_IA_EL_ZONE_KIND',
        /*
          rtn.push({ value: '01', text: '전체' })
          rtn.push({ value: '02', text: '글로벌페어' })
          rtn.push({ value: '03', text: '아메리칸 어드벤처' })
          rtn.push({ value: '04', text: '매직랜드' })
          rtn.push({ value: '05', text: '유러피안 어드벤처' })
          rtn.push({ value: '06', text: '쥬토피아' })
        */
        'COD_IA_CB_ZONE_KIND',
        'COD_IA_EL_FACILT_CATE_KIND',
        /*
          rtn.push({ value: '01', text: '전체' })
          rtn.push({ value: '02', text: '어트렉션' })
          rtn.push({ value: '03', text: '공연' })
          rtn.push({ value: '04', text: '주토피아' })
          rtn.push({ value: '05', text: '레스토랑' })
          rtn.push({ value: '06', text: '편의시설' })
          rtn.push({ value: '07', text: '기프트샵' })
          rtn.push({ value: '08', text: '포토존' })
        */
        'COD_IA_CB_FACILT_CATE_KIND',
        'COD_IA_VLINE_WAIT_YN',
        'COD_IA_VLINE_WAIT_GRP',
        'COD_IA_FACILT_DAILY_OPER_STATUS',
        /*
          [
            { value: 'OPEN', text: 'OPEN' },
            { value: 'CLOS', text: 'CLOSED' },
            { value: 'STND', text: '준비중' },
            { value: 'PMCH', text: 'PM 점검' },
            { value: 'CHCK', text: '점검중' },
            { value: 'OVER', text: '금일종료' },
            { value: 'PEND', text: '대기중' },
            { value: 'RAIN', text: '우천대기' },
            { value: 'SMMR', text: '하계운휴' },
            { value: 'WNTR', text: '동계운휴' },
            { value: 'CONR', text: '공사운휴' },
            { value: 'RNTR', text: '대관운휴' },
            { value: 'SNOW', text: '강설대기' },
            { value: 'WIND', text: '강풍대기' },
            { value: 'CNCL', text: '취소' },
            { value: 'RSVP', text: '예약가능' },
            { value: 'SOLD', text: '예약마감' },
            { value: 'THUN', text: '낙뢰대기' },
          ]
        */
        'COD_IA_WAIT_DESC',
        'COD_IA_WAIT_INFO_APPLY_YN',
        'COD_IA_QPASS_GRP',
        'COD_IA_VLINE_WAIT_CAPA_SLOT_STATUS',
      ],
      codes: {
        COD_RS_PARK_KIND: [],
        COD_IA_EL_ZONE_KIND: [],
        COD_IA_CB_ZONE_KIND: [],
        COD_IA_EL_FACILT_CATE_KIND: [],
        COD_IA_CB_FACILT_CATE_KIND: [],
        COD_IA_VLINE_WAIT_YN: [],
        COD_IA_VLINE_WAIT_GRP: [],
        COD_IA_FACILT_DAILY_OPER_STATUS: [],
        COD_IA_WAIT_DESC: [],
        COD_IA_WAIT_INFO_APPLY_YN: [],
        COD_IA_QPASS_GRP: [],
        COD_IA_VLINE_WAIT_CAPA_SLOT_STATUS: [],
      },
      columns: [
        {
          value: 'salesDate',
          text: '영업일자',
          width: 85,
        },
        {
          value: 'faciltName',
          text: '시설명',
          width: 200,
        },
        {
          value: 'faciltCateKindNms',
          text: '시설 카테고리',
          width: 200,
        },
        {
          value: 'zoneKindNm',
          text: 'Zone 구분',
          width: 200,
        },
        {
          value: 'vlineWaitYnNm',
          text: '가상대기 여부',
          width: 100,
        },
        {
          value: 'openTime',
          text: '오픈 시간',
          width: 120,
        },
        {
          value: 'closeTime',
          text: '종료 시간',
          width: 120,
        },
        {
          value: 'waitTime',
          text: '대기시간(분)',
          width: 120,
        },
        {
          value: 'operStatusCd',
          text: '운영 상태',
          width: 150,
        },
        {
          value: 'vlineWaitSettngRidingDistaMm',
          text: '탑승시간간격',
          width: 120,
        },
        {
          value: 'vlineWaitSettngBaseOhrc',
          text: '기준 OHRC',
          width: 120,
        },
        {
          value: 'offlineWaitConvTime',
          text: '현장 줄서기 전환 시간',
          width: 200,
        },
        {
          value: 'fstRgstDtm',
          text: '등록일시',
          width: 150,
        },
        {
          value: 'fstRgstUsrId',
          text: '등록자',
          width: 100,
        },
        {
          value: 'fnlMdfcDtm',
          text: '수정일시',
          width: 150,
        },
        {
          value: 'fnlMdfcUsrId',
          text: '수정자',
          width: 100,
        },
      ],
      columnsDetail: [
        {
          value: 'slotSeqNo', text: 'Slot Seq', width: 100, align: 'center',
        },
        {
          value: 'slotStartTime',
          text: '시작',
          width: 80,
          customValue: val => {
            let v = val ?? ''
            if (v.length === 4) {
              v = v.substring(0,2) + ':' + v.substring(2,4)
            }
            return v ? v : '-'
          },
        },
        {
          value: 'slotEndTime',
          text: '종료',
          width: 80,
          customValue: val => {
            let v = val ?? ''
            if (v.length === 4) {
              v = v.substring(0,2) + ':' + v.substring(2,4)
            }
            return v ? v : '-'
          },
        },
        {
          value: 'reservStartTime',
          text: '시작',
          width: 80,
          customValue: val => {
            let v = val ?? ''
            if (v.length === 4) {
              v = v.substring(0,2) + ':' + v.substring(2,4)
            }
            return v ? v : '-'
          },
        },
        {
          value: 'reservEndTime',
          text: '종료',
          width: 80,
          customValue: val => {
            let v = val ?? ''
            if (v.length === 4) {
              v = v.substring(0,2) + ':' + v.substring(2,4)
            }
            return v ? v : '-'
          },
        },
        {
          value: 'vrTotalCnt',
          text: '예약 인원',
          width: 100,
        },
        {
          value: 'vrCnclCnt',
          text: '최소인원(전체)',
          width: 100,
        },
        {
          value: 'vrCnclConfCnt',
          text: '최소인원(확정)',
          width: 100,
        },
        {
          value: 'vrRsvTotalCapa',
          text: '전체 Capa',
          width: 100,
        },
        {
          value: 'onlineRsvCnt',
          text: '사전예약 건수',
          width: 100,
        },
        {
          value: 'vrRsvTodayCapa',
          text: '당일 Capa',
          width: 100,
        },
        {
          value: 'statusCd',
          text: '운영 상태',
          width: 160,
          customValue: (value, row) => {
            const code = this.codes.COD_IA_VLINE_WAIT_CAPA_SLOT_STATUS.find(v => v.codeId === value)
            const val = code ? code.codeName : ''
            return val ? val : '-'
          },
        },
        {
          value: 'drawTime',
          text: '추첨결과발표시간',
          width: 130,
          customValue: val => {
            let v = val ?? ''
            if (v.length === 4) {
              v = v.substring(0,2) + ':' + v.substring(2,4)
            }
            return v ? v : '-'
          },
        },
        {
          value: 'fstRgstDtm',
          text: '등록일시',
          width: 150,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v ? v : '-'
          },
        },
        {
          value: 'fstRgstUsrId',
          text: '등록자',
          width: 100,
          customValue: v => v ? v : '-',
        },
        {
          value: 'fnlMdfcDtm',
          text: '수정일시',
          width: 150,
          customValue: v => {
            v = utils.dateformatToClient(v)
            return v ? v : '-'
          },
        },
        {
          value: 'fnlMdfcUsrId',
          text: '수정자',
          width: 100,
          customValue: v => v ? v : '-',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    contextPageId() {
      return this.$attrs['page-id']
    },
    grid() {
      return this.$refs.grid
    },
    gridDetail() {
      return this.$refs.gridDetail
    },
    COD_IA_FACILT_CATE_KIND() {
      if (this.params.parkKindCd === '02') return this.codes.COD_IA_CB_FACILT_CATE_KIND
      return this.codes.COD_IA_EL_FACILT_CATE_KIND
    },
    COD_IA_ZONE_KIND() {
      if (this.params.parkKindCd === '02') return this.codes.COD_IA_CB_ZONE_KIND // '02' 캐리비안베이
      return this.codes.COD_IA_EL_ZONE_KIND // 파크 구분 '01' 에버랜드
    },
    IS_EL_ON() {
      return (this.params.parkKindCd === '01')
    },
    IS_CB_ON() {
      return (this.params.parkKindCd === '02')
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
    console.log('CODE', this.codes)

    this.onReset()

    const THAT = this
    this.columns = [
      //{ value: '__dirty', text: '', width: 20 },
      {
        value: 'salesDate',
        text: '영업일자',
        width: 85,
        customValue: v => {
          v = utils.dateformatToClient(v)
          return v ? v : '-'
        },
      },
      {
        value: 'faciltName',
        text: '시설명',
        width: 200,
        customClass: ['underline'],
      },
      {
        value: 'faciltCateKindNms',
        text: '시설 카테고리',
        width: 200,
      },
      {
        value: 'zoneKindNm',
        text: 'Zone 구분',
        width: 200,
        customValue: (value, row) => {
          const codeId = row.zoneKindCd
          const code = this.COD_IA_ZONE_KIND.find(v => v.codeId === codeId)
          const val = code ? code.codeName : ''
          return val ? val : '-'
        },
      },
      {
        value: 'vlineWaitYnNm',
        text: '가상대기 여부',
        width: 100,
        customValue: (value, row) => {
          const codeId = row.vlineWaitYn
          const code = this.codes.COD_IA_VLINE_WAIT_YN.find(v => v.codeId === codeId)
          const val = code ? code.codeName : ''
          return val ? val : '-'
        },
      },
      {
        value: 'openTime',
        text: '오픈 시간',
        width: 120,
        customValue: v => v ? v : '-',
      },
      {
        value: 'closeTime',
        text: '종료 시간',
        width: 120,
        customValue: v => v ? v : '-',
      },
      {
        value: 'waitTime',
        text: '대기시간(분)',
        width: 120,
        customValue: v => v ? v : '-',
      },
      {
        value: 'operStatusCd',
        text: '운영 상태',
        width: 150,
        customValue: (value, row) => {
          const code = this.codes.COD_IA_FACILT_DAILY_OPER_STATUS.find(v => v.codeId === value)
          const val = code ? code.codeName : ''
          return val ? val : '-'
        },
      },
      {
        value: 'vlineWaitSettngRidingDistaMm',
        text: '탑승시간간격',
        width: 120,
        customValue: v => v ? v : '-',
      },
      {
        value: 'vlineWaitSettngBaseOhrc',
        text: '기준 OHRC',
        width: 120,
        customValue: v => v ? v : '-',
      },
      {
        value: 'offlineWaitConvTime',
        text: '현장 줄서기 전환 시간',
        width: 200,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          computed: {
            IS_FACILT_DAILY_EMPTY() {
              if (this.row.openTime === null && this.row.closeTime === null) return true
              return false
            },
          },
          template: `<div>
            <template v-if="row.vlineWaitYn === 'Y' || row.vlineWaitYn === 'R'">
              <ur-text-field
                mask="time"
                :value="value"
                style="height:auto;"
                width="100px"
                @input="onInput"
                :disabled="IS_FACILT_DAILY_EMPTY"
                :rules="$rules.getRules('min_len(4)','max_int(2400)')"
              />
            </template>
            <div v-else>-</div>
          </div>`,
          methods: {
            onInput(v) {
              if (this.value !== v) THAT.dataSet.setRowValue(this.row, 'offlineWaitConvTime', v)
            },
          },
        },
      },
      {
        value: 'fstRgstDtm',
        text: '등록일시',
        width: 150,
        customValue: v => {
          v = utils.dateformatToClient(v)
          return v ? v : '-'
        },
      },
      {
        value: 'fstRgstUsrId',
        text: '등록자',
        width: 100,
        customValue: v => v ? v : '-',
      },
      {
        value: 'fnlMdfcDtm',
        text: '수정일시',
        width: 150,
        customValue: v => {
          v = utils.dateformatToClient(v)
          return v ? v : '-'
        },
      },
      {
        value: 'fnlMdfcUsrId',
        text: '수정자',
        width: 100,
        customValue: v => v ? v : '-',
      },
    ]

    const query = utils.getParameter(this, 'params')
    console.log(this.$options.name, 'mounted, utils.getParameter:', query)

    if (!utils.isEmpty(query)) {
      this.params = {
        parkKindCd: PARK_KIND_CD, // 이전 화면에서 보낸 parkKindCd가 무엇이든 현재 화면의 파크코드로 대치한다.
        salesDate: query.salesDate,
        faciltName: query.faciltName,
        faciltCateKindCd: query.faciltCateKindCd,
        zoneKindCd: query.zoneKindCd,
      }
      this.paging = {
        currentPage: query.currentPage,
        rowsPerPage: query.rowsPerPage,
      }

      if (query.currentPage) {
        this.$refs.grid.setCurrentPage(_.toInteger(query.currentPage))
      }

      if (query.current && !utils.isEmpty(query.current.faciltId)) {
        this.CURRENT_FACILT_ID = query.current.faciltId
      }
    }

    this.search()
  },
  methods: {
    onReset() {
      console.log('onReset')
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
        parkKindCd: PARK_KIND_CD,
        salesDate: fmt,
        faciltName: '',
        faciltCateKindCd: '',
        zoneKindCd: '',
      }
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
    onSelectRow(row) {
      console.log('onSelectRow', row)
      this.onSearchDetail()
    },
    onSearchDetail() {
      console.log('onSearchDetail')

      const selected = this.grid.getSelected()

      if (utils.isEmpty(selected)) {
        this.dataSetDetail = []
        return
      }

      selected.faciltName = encodeURI(selected.faciltName)

      console.log('DETAIL REQ', selected)
      const serviceName = 'DTS_AAB_00033'
      http.request(this.contextPageId, serviceName, {
        query: selected,
        path: {},
        data: {},
      }).then(res => {
        console.log('DETAIL RES', res.data)
        this.dataSetDetail = res.data
        /*
        this.dataSet.setData(res.data)
        const rawData = this.dataSet.getRawData()
        if (rawData && rawData.length > 0) {
          this.params = {
            salesDateFmt: utils.dateformatToClient(rawData[0].salesDate),
            faciltName: rawData[0].faciltName,
            faciltCateKindNms: rawData[0].faciltCateKindNms,
            zoneKindNm: rawData[0].zoneKindNm,
            vlineWaitYnNm: rawData[0].vlineWaitYnNm,
            vlineWaitYn: rawData[0].vlineWaitYn,
          }
        }
        */
        if (selected.vlineWaitYn !== 'D') {
          console.log('HIDE')
          this.gridDetail.setHeaderAttr('drawTime', 'hide', true)
          this.SHOW_DRAW_TIME = false
        } else {
          console.log('SHOW')
          this.gridDetail.setHeaderAttr('drawTime', 'hide', false)
          this.SHOW_DRAW_TIME = true
        }
      }).catch(error => {
        console.log('ERR', error)
      })
    },
    onSearch() {
      console.log('onSearch', this.contextPageId)

      if (utils.isEmpty(this.params.salesDate)) {
        utils.messageBox('warning', this.$t('영업일자가 선택되지 않았습니다.'))
        return
      }

      this.CURRENT_FACILT_ID = ''

      this.search()
    },
    search() {
      console.log('search', this.contextPageId)
      const query = Object.assign({}, this.params, this.paging)

      const THAT = this

      query.faciltName = encodeURI(query.faciltName)
      this.dataSetDetail = []

      console.log('REQ', query)
      const serviceName = 'DTS_AAB_00030'
      http.request(this.contextPageId, serviceName, {
        query,
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        this.dataTotalCount = res.data.totalCount
        this.dataSet.setData(res.data.vlineCapaList)
        this.dataSetRawData = []
        this.dataSet.getRawData().forEach(el => {
          this.dataSetRawData.push({
            __id: el.__id,
            offlineWaitConvTime: el.offlineWaitConvTime,
          })
        })

        // 현재 선택된 시설이 있는 경우 그리드 갱신 후 row select 까지 처리 해준다.
        if (!utils.isEmpty(THAT.CURRENT_FACILT_ID)) {
          const rawData = this.dataSet.getRawData()
          const found = rawData.find(el => el.faciltId === this.CURRENT_FACILT_ID)
          if (!utils.isEmpty(found)) {
            this.$refs.grid.selectRow(found.__id, true)
          }
        }
      }).catch(error => {
        console.log('ERR', error)
      })
    },
    onSave() {
      console.log('onSave')
      const changed = this.dataSet.getChanged()
      const rawData = this.dataSetRawData

      // changed.updated 중에서 changed.removed 에 존재하는 것은 제외한다.
      const updated = []
      changed.updated.forEach(updatedElement => {
        const found = rawData.find(el => el.__id === updatedElement.__id)
        console.log(found.faciltId, found.faciltName)
        if (!utils.isEmpty(found)
          && found.offlineWaitConvTime !== updatedElement.offlineWaitConvTime) {
          updated.push(updatedElement)
        }
      })

      console.log('updated', updated)
      if (this.validated(updated)) {
        utils.messageBox('confirm', this.$t('저장하시겠습니까?'), null, () => { // 저장하시겠습니까?
          console.log('REQ DATA:', updated)
          const serviceName = 'DTS_AAB_00031'
          http.request(this.contextPageId, serviceName, {
            query: {},
            path: {},
            data: {
              parkKindCd: this.params.parkKindCd,
              faciltVlineCapaList: [...updated],
            },
          }).then(res => {
            console.log('RES', res.data)
            if (res.data.resultCode === '-1') { // -1 이면 서버 메시지를 그대로 표시한다.
              utils.messageBox('warning', res.data.msg)
            } else if (res.data.resultCode === '0') {
              utils.messageBox('warning', this.$t('일별 가상대기 capa 관리 정보를 변경하는데 실패하였습니다.'))
            } else {
              utils.messageBox('warning', this.$t('일별 가상대기 capa 관리 정보가 변경 되었습니다.'))
              this.onSearch()
            }
          }).catch(error => {
            console.log(error)
          })
        })
      }
    },
    validated(pUpdated) {
      const updated = pUpdated ?? []

      if (updated.length === 0) {
        utils.messageBox('warning', this.$t('변경된 사항이 없습니다.'))
        return false
      }

      // 필수항목
      if (!this.$rules.validate(this)) {
        utils.messageBox('warning', this.$t('입력값이 올바르지 않습니다.'))
        return false
      }

      // 신규 및 수정항목 입력값 offlineWaitConvTime 에서 분값이 60을 초과하는지 확인
      const found = updated.find(v => {
        if (v.offlineWaitConvTime.substr(2, 1) >= '6') return true
        return false
      })
      if (!utils.isEmpty(found)) {
        utils.messageBox('warning', this.$t(`시설 '${found.faciltName}'의 현장 줄서기 전환 시간이 올바르지 않습니다. (60분 단위 초과)`))
        return false
      }

      return true
    },
    openBatchMgr() {
      utils.openLayerPopup('PGE_AAB_00059', this.onBatchMgrClosed, {
        pageInitialData: {
          parkKindCd: PARK_KIND_CD,
          salesDate: this.params.salesDate,
        },
      })
    },
    onBatchMgrClosed(flag) {
      if (flag === 'REFRESH') {
        this.onSearch()
      }
    },
    onChangeCapa() {
      console.log('onChangeCapa')
      const selected = this.grid.getSelected()
      console.log('-selected', selected)

      if (utils.isEmpty(selected)) {
        utils.messageBox('warning', this.$t('시설이 선택되지 않았습니다.'))
        return
      }

      const params = Object.assign({}, this.params, this.paging, {
        current: {
          faciltId: selected.faciltId,
          salesDate: selected.salesDate,
          faciltName: selected.faciltName,
          faciltCateKindNms: selected.faciltCateKindNms,
          faciltCateKindCds: selected.faciltCateKindCds,
          parkKindCd: PARK_KIND_CD,
        },
      })

      let code = this.COD_IA_ZONE_KIND.find(v => v.codeId === selected.zoneKindCd)
      let val = code ? code.codeName : ''
      params.current.zoneKindNm = val ? val : '-'

      code = this.codes.COD_IA_VLINE_WAIT_YN.find(v => v.codeId === selected.vlineWaitYn)
      val = code ? code.codeName : ''
      params.current.vlineWaitYnNm = val ? val : '-'

      params.current.vlineWaitYn = selected.vlineWaitYn

      params.returnPageId = this.contextPageId

      console.log('-goPage', params)
      utils.goPage('PGE_AAB_00058', { params })
    },
  },
}
</script>
<style scoped>
</style>
