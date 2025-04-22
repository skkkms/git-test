<template>
  <sui-page class="custom_page">
    <!-- S :: 일별 가상대기 capa 관리 탭-->
    <ur-form-box toggleable>
      <ur-form-item
        :label="$t('영업일자')"
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
        :label="$t('MSG_TXT_FACILT_CATE')"
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
          v-permission:read="contextPageId"
          color="violet"
          @click="onSearch"
        >
          {{ $t('MSG_BTN_SEARCH') }}
        </ur-button>
      </div>
    </div>
    <!-- E :: 일별 가상대기 capa 관리 탭-->

    <!-- S :: 일별 가상대기 capa 관리 테이블-->
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
      >
        <template #right-info>
          <span style="padding-top: 6px; padding-right: 10px;">* 일별 가상대기 Capa 관리는 등록된 시설 담당자만 가능 합니다.</span>
          <ur-button
            color="violet"
            @click="openBatchMgr"
          >
            {{ $t('시설 Capa 일괄생성') }}
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
    <!-- E :: 일별 가상대기 capa 관리 테이블-->
    <div class="btn_wrap mt10">
      <div class="right_box">
        <ur-button
          v-permission:update="contextPageId"
          color="violet"
          @click="onSave"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </ur-button>
      </div>
    </div>
  </sui-page>
</template>
<script>

const PARK_KIND_CD = '01' // '01' 에버랜드 , '02' 캐리비안베이

export default {
  name: 'PGE_AAB_00007_T01', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      dataTotalCount: 0,
      dataSet: new this.$ur.grid.DataSet(),
      dataSetRawData: [],
      opts: {
        styleBordered: false,
        resizableColumn: true,
        headerHeight: 18,
        multiSelect: false,
        selectCheck: false,
        selectCheckOnly: true,
        resizeFullWidth: true,
        noInfo: false,
        height: 570,
        pagination: true,
        defaultPageSize: 10,
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
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    contextPageId() {
      return this.$attrs['page-id']
    },
    contextCurIdx() {
      return this.$attrs['cur-idx']
    },
    grid() {
      return this.$refs.grid
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
        click: (v, r) => {
          const params = Object.assign({}, this.params, this.paging, {
            current: {
              faciltId: r.faciltId,
              salesDate: r.salesDate,
              faciltName: r.faciltName,
              faciltCateKindNms: r.faciltCateKindNms,
              faciltCateKindCds: r.faciltCateKindCds,
              parkKindCd: PARK_KIND_CD,
              openTime: r.openTime,
              closeTime: r.closeTime,
            },
          })

          let code = this.COD_IA_ZONE_KIND.find(v => v.codeId === r.zoneKindCd)
          let val = code ? code.codeName : ''
          params.current.zoneKindNm = val ? val : '-'

          code = this.codes.COD_IA_VLINE_WAIT_YN.find(v => v.codeId === r.vlineWaitYn)
          val = code ? code.codeName : ''
          params.current.vlineWaitYnNm = val ? val : '-'

          params.current.vlineWaitYn = r.vlineWaitYn

          utils.goPage('PGE_AAB_00008', { params })
        },
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
        customValue: v => v ? v : '-',
      },
    ]

    const query = utils.getParameter(this, 'params')
    console.log(this.$options.name, 'mounted, utils.getParameter:', query)

    if (!utils.isEmpty(query) && query.parkKindCd === PARK_KIND_CD) { // 이전 화면에서 보낸 parkKindCd가 현재 화면의 파크코드와 일치하는 경우에만 검색조건을 복사한다.
      this.params = {
        parkKindCd: query.parkKindCd,
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
    }

    this.onSearch()
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
    onTabChanged() {
      // console.log('onTabChanged', PARK_KIND_CD, this.contextCurIdx)
      this.$nextTick(() => { this.onSearch() })
    },
    onSearch() {
      // console.log('onSearch', PARK_KIND_CD)
      if (this.contextCurIdx === 1 && PARK_KIND_CD === '02') {
        // console.log('onSearch skipped !', PARK_KIND_CD, this.contextCurIdx)
        return
      }
      if (this.contextCurIdx === 2 && PARK_KIND_CD === '01') {
        // console.log('onSearch skipped !', PARK_KIND_CD, this.contextCurIdx)
        return
      }

      const query = Object.assign({}, this.params, this.paging)

      if (utils.isEmpty(this.params.salesDate)) {
        utils.messageBox('warning', this.$t('영업일자가 선택되지 않았습니다.'))
        return
      }

      query.faciltName = encodeURI(query.faciltName)

      console.log('REQ', query)
      const serviceName = 'DTS_AAB_00030'
      http.request(this.contextPageId, serviceName, {
        query,
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)

        if (this.params.parkKindCd === '02') {
          // 파크 구분 '02' 캐리비안베이
          this.codes.COD_IA_CB_FACILT_CATE_KIND = res.data.permissionedFaciltCateKindCdList
        } else {
          // 파크 구분 '01' 에버랜드
          this.codes.COD_IA_EL_FACILT_CATE_KIND = res.data.permissionedFaciltCateKindCdList
        }

        if (res.data.resultCode === '-1') { // -1 이면 서버 메시지를 그대로 표시한다.
          utils.messageBox('warning', res.data.msg)
          return
        }

        this.dataTotalCount = res.data.totalCount
        this.dataSet.setData(res.data.vlineCapaList)
        this.dataSetRawData = []
        this.dataSet.getRawData().forEach(el => {
          this.dataSetRawData.push({
            __id: el.__id,
            offlineWaitConvTime: el.offlineWaitConvTime,
          })
        })
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
  },
}
</script>
<style scoped>
</style>
