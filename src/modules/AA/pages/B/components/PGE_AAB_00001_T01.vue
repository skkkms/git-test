<template>
  <div>
    <!-- 검색조건 -->
    <template>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_FACILT_ID')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <!-- 검색조건EL : 시설 ID -->
          <ur-text-field
            v-model="params.faciltId"
            maxlength="10"
            style="width: 100%;"
            @keydown.enter="onSearch"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_FACILT_NAME')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <!-- 검색조건EL : 시설명 -->
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
            v-model="params.faciltCateKindCds"
            :items="COD_IA_FACILT_CATE_KIND"
            :msg-no-select="$t('MSG_TXT_ALL')"
            no-select="no-select"
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
            :msg-no-select="$t('MSG_TXT_ALL')"
            no-select="no-select"
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
    </template>

    <!-- 데이타그리드EL -->
    <template>
      <ur-data-grid
        ref="grid"
        class="custom_grid_type1 mt35"
        :headers="columns"
        :data-source="dataList"
        :data-set-options="{id: 'faciltId'}"
        :options="opts"
        :item-size="dataTotalCount"
        @grid:paging="pagingChange"
      >
        <template
          #right-info
        >
          <ur-button
            v-if="IS_EL_ON"
            color="violet"
            @click="onOpenKioskPopup"
          >
            {{ $t('MSG_BTN_FACILT_VLINE_KIOSK_INFO_SEARCH') }}
          </ur-button>
          <ur-button
            v-show="true"
            v-permission:create="contextPageId"
            @click="onPopsBatchSync"
          >
            {{ $t('MSG_BTN_POPS_BATCH_SYNC') }} <!-- POPS 일괄 동기화 -->
          </ur-button>
          <ur-button
            v-permission:manualRun="contextPageId"
            @click="manualRun"
          >
            {{ $t('MSG_BTN_FACILT_SYNC') }} <!-- 시설동기화 -->
          </ur-button>
          <ur-button
            v-permission:read="contextPageId"
            @click="onExcelDnLoad"
          >
            <ur-icon
              icon="download"
              icon-type="line"
              size="small"
              spacing
            />
            {{ $t('엑셀다운로드') }}
          </ur-button>
        </template>
      </ur-data-grid>
    </template>

    <!-- 그리드하단버튼EL : 삭제 & 신규등록 -->
    <div class="btn_wrap mt10">
      <div class="right_box">
        <ur-button
          v-permission:delete="contextPageId"
          @click="onDelete"
        >
          {{ $t('MSG_BTN_DEL') }}
        </ur-button>
        <ur-button
          color="violet"
          @click="onNewFacilt"
        >
          {{ $t('MSG_BTN_FACILT_ADD') }}
        </ur-button>
      </div>
    </div>
    <!-- 모달EL : 가상대기 키오스크 정보 조회 -->
    <KIOSK_POPUP
      ref="kioskPopup"
      :page-id="contextPageId"
    />
    <!-- 모달 : Alert -->
    <ALERT
      ref="alertModal"
    />
  </div>
</template>

<script>

import ALERT from './PGE_AAB_00001_P01.vue' // ALERT 팝업
const KIOSK_POPUP = () => import('./PGE_AAB_00001_P02.vue') // 가상대기 키오스크 정보 조회 팝업

const PARK_KIND_CD = '01' // '01' 에버랜드 , '02' 캐리비안베이

export default {
  name: 'PGE_AAB_00001_T01', // eslint-disable-line vue/name-property-casing
  components: {
    ALERT,
    KIOSK_POPUP,
  },
  data() {
    return {
      dataList: [],
      dataTotalCount: 0,
      opts: {
        styleBordered: false,
        resizableColumn: true,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        resizeFullWidth: false,
        noInfo: false,
        height: 522,
        pagination: true,
        defaultPageSize: 30,
        msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
      },
      paging: {
        currentPage: '1',
        rowsPerPage: '30',
      },
      params: {
        parkKindCd: PARK_KIND_CD, // '01' 에버랜드 , '02' 캐리비안베이
        faciltId: '',
        faciltName: '',
        faciltCateKindCds: '',
        zoneKindCd: '',
      },
      CODE_KEYS: [
        'COD_RS_PARK_KIND',
        'COD_IA_EL_ZONE_KIND',
        'COD_IA_CB_ZONE_KIND',
        'COD_IA_EL_FACILT_CATE_KIND',
        'COD_IA_CB_FACILT_CATE_KIND',
        'COD_IA_VLINE_WAIT_YN',
        'COD_IA_VLINE_WAIT_GRP',
      ],
      codes: {
        COD_RS_PARK_KIND: [],
        COD_IA_EL_ZONE_KIND: [],
        COD_IA_CB_ZONE_KIND: [],
        COD_IA_EL_FACILT_CATE_KIND: [],
        COD_IA_CB_FACILT_CATE_KIND: [],
        COD_IA_VLINE_WAIT_YN: [],
        COD_IA_VLINE_WAIT_GRP: [],
      },
      columns: [], // 그리드 헤드 초기화는 mounted 에서 해야 한다. that=this 연결 필요함!
      validateRule: [
        v => !!v || 'Required field!',
        v => v.length <= 10 || 'Maximum length is 10!',
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
    COD_IA_EL_FACILT_CATE_KIND_EXTEND() {
      const COD_IA_EL_FACILT_CATE_KIND_EXTEND = [...this.codes.COD_IA_EL_FACILT_CATE_KIND];
      if (COD_IA_EL_FACILT_CATE_KIND_EXTEND.length > 0) {
        const attraction = this.codes.COD_IA_EL_FACILT_CATE_KIND.find((v) => v.codeId=='01');
        const concert = this.codes.COD_IA_EL_FACILT_CATE_KIND.find((v) => v.codeId=='02');
        const zootopia = this.codes.COD_IA_EL_FACILT_CATE_KIND.find((v) => v.codeId=='03');
        // 어트랙션+주토피아 만들기
        if (attraction && zootopia) {
          COD_IA_EL_FACILT_CATE_KIND_EXTEND.push({
            value: `${attraction.value},${zootopia.value}`,
            text: `${attraction.text}+${zootopia.text}`,
          })
        }
        // 공연+주토피아 만들기
        if (concert && zootopia) {
          COD_IA_EL_FACILT_CATE_KIND_EXTEND.push({
            value: `${concert.value},${zootopia.value}`,
            text: `${concert.text}+${zootopia.text}`,
          })
        }
      }
      return COD_IA_EL_FACILT_CATE_KIND_EXTEND
    },
    COD_IA_FACILT_CATE_KIND() {
      if (this.params.parkKindCd === '02') return this.codes.COD_IA_CB_FACILT_CATE_KIND
      return this.COD_IA_EL_FACILT_CATE_KIND_EXTEND
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
    // console.log('CODE', this.codes)

    this.onReset()

    const that = this;
    const columnHeadGroup = [
      {
        value: 'faciltId',
        text: '시설ID',
        width: 85,
        click: v => prompt(this.$t('MSG_TXT_COPY_CLIPBOARD_WITH_CTRL_C'), v), // Ctrl+C를 눌러 클립보드로 복사하세요.
      },
      {
        value: 'faciltName', text: '시설명',
        customClass: ['underline'],
        click: (v, r)=>{
          //this.$refs.grid.noti("Row is clicked["+r.faciltId+"]")
          const params = Object.assign({}, this.params, this.paging, {
            returnPageId: 'PGE_AAB_00001',
            currentFaciltId: r.faciltId,
          })
          //this.$router.push({ path: '/PGE_AAB_00003', params })
          utils.goPage('PGE_AAB_00003', { params })
        },
      },
      {
        value: 'faciltKindNms', text: '시설 카테고리', customValue:(v)=>v?v:'-',
      },
      //{ value: 'zoneKindCd', text: 'Zone 구분', width: 120 },
      { value: 'zoneKindNm', text: 'Zone 구분',
        customValue: (v,r) => {
          let codeId = r.zoneKindCd;
          let code = this.COD_IA_ZONE_KIND.find((v) => v.codeId==codeId);
          let val = code ? code.codeName : '';
          return val ? val : '-';
        }
      },
      { value: 'exposrYn', text: '게시 여부', width: 70, customValue:(v)=>v?v:'-' },
      {
        text: '노출 순서',
        value: 'exposrOrder',
        width: 70,
        customValue: v => (v ? utils.numberFormat(v) : '-'),
      },
      //{ value: 'appExposrYn', text: 'APP 게시 여부', width: 100 },
      //{ value: 'mobileExposrYn', text: 'MOBILE 게시 여부', width: 100 },
      //{ value: 'pcExposrYn', text: 'PC 게시 여부', width: 100 },
      //{ value: 'dsExposrYn', text: 'D/S 노출 여부', width: 100 },
      //{ value: 'exposrPosition', text: '게시 위치', width: 80 },
      { value: 'exposrPosition', text: '게시 위치', width: 120,
        customValue: (v,r) => {
          let app    = r.appExposrYn    == 'Y' ? 'App'     : '';
          let mobile = r.mobileExposrYn == 'Y' ? '모바일웹' : '';
          let pc     = r.pcExposrYn     == 'Y' ? 'PC'      : '';
          let val = [app,mobile,pc].filter(v => v?true:false).join(',');
          return val ? val : '-';
        }
      },
    ]
    let columnMidGroup = [
      //{ value: 'vlineWaitYn', text: '가상대기 여부', width: 100, customValue:(v)=>v?v:'-' },
      {
        value: 'vlineWaitYnNm',
        text: '가상대기 여부',
        width: 100,
        customValue: (value, row) => {
          const codeId = row.vlineWaitYn
          const code = this.codes.COD_IA_VLINE_WAIT_YN.find(v => v.codeId === codeId)
          const v = code ? code.codeName : ''
          return v ? v : '-'
        },
      },
      //{ value: 'vlineWaitGrpCd', text: '가상대기 그룹', width: 100 }, 
      {
        value: 'vlineWaitGrpNm',
        text: '가상대기 그룹',
        width: 100,
        customValue: (value, row) => {
          const codeId = row.vlineWaitGrpCd
          const code = this.codes.COD_IA_VLINE_WAIT_GRP.find(v => v.codeId === codeId)
          const v = code ? code.codeName : ''
          return v ? v : '-'
        },
      },
    ]
    //if (this.IS_CB_ON) {
    //  columnMidGroup = []
    //}
    const columnTailGroup = [
      {
        value: 'fstRgstDtm', text: '등록일시', width: 140,
        customValue: v => {
          v = utils.dateformatToClient(v);
          return v ? v : '-' ;
        },
      },
      {
        value: 'fstRgstUsrId', text: '등록자', width: 90, customValue:(v)=>v?v:'-',
      },
      {
        value: 'fnlMdfcDtm', text: '수정일시', width: 140,
        customValue: v => {
          v = utils.dateformatToClient(v);
          return v ? v : '-' ;
        },
      },
      {
        value: 'fnlMdfcUsrId', text: '수정자', width: 90, customValue:(v)=>v?v:'-',
      },
    ]
    this.columns = [
      ...columnHeadGroup,
      ...columnMidGroup,
      ...columnTailGroup,
    ]
    //const query = this.$route.query
    //console.log(this.$options.name, 'mounted, $route.query:', query)
    const query = utils.getParameter(this, 'params')
    //console.log(this.$options.name, 'mounted, utils.getParameter:', query)

    if (!utils.isEmpty(query) && query.parkKindCd === PARK_KIND_CD) { // 이전 화면에서 보낸 parkKindCd가 현재 화면의 파크코드와 일치하는 경우에만 검색조건을 복사한다.
      this.params = {
        parkKindCd: query.parkKindCd,
        faciltId: query.faciltId,
        faciltName: query.faciltName,
        faciltCateKindCds: query.faciltCateKindCds,
        zoneKindCd: query.zoneKindCd,
      }
      if (query.rowsPerPage && query.currentPage) {
        // 페이지 로드 시 rowsPerPage가 무조건 defaultPageSize(=30) 값으로 리셋되는데 변경할 방법이 없음
        // 다른 방법이 없으므로 rowsPerPage 30을 기준으로 currentPage를 재조정한다.
        const currentPage = _.toInteger(query.currentPage)
        const rowsPerPage = _.toInteger(query.rowsPerPage)
        const Q = Math.floor(currentPage * rowsPerPage / 30)
        const R = (currentPage * rowsPerPage) % 30
        if (R > 0) {
          this.$refs.grid.setCurrentPage(Q + 1)
        } else {
          this.$refs.grid.setCurrentPage(Q)
        }
        return
      }
    }

    this.onSearch()
  },
  methods: {
    onReset() {
      this.params = {
        parkKindCd: this.params.parkKindCd,
        faciltId: '',
        faciltName: '',
        faciltCateKindCds: '',
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
      // this.paging = paging
      this.paging.currentPage = paging.currentPage
      this.paging.rowsPerPage = paging.rowsPerPage
      this.onSearch()
    },
    onSearch() {
      const query = Object.assign({}, this.params, this.paging)

      query.faciltName = encodeURI(query.faciltName)

      //console.log('REQ', query)
      const serviceName = 'DTS_AAB_00001'
      http.request(this.contextPageId, serviceName, {
        query,
        path: {},
        data: {},
      }).then(res => {
        //console.log('RES', res.data)
        this.dataList = res.data.list
        this.dataTotalCount = res.data.totalCount
      }).catch(error => {
        console.log(error)
      })
    },
    onDelete() {
      const selected = this.grid.getSelected()

      if (utils.isEmpty(selected)) {
        utils.messageBox('warning', this.$t('선택 된 항목이 없습니다.'));
        return
      }

      console.log('REQ', {
        faciltListRemoved: selected,
      })
      utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, () => { // 삭제하시겠습니까?
        const serviceName = 'DTS_AAB_00025'
        http.request(this.contextPageId, serviceName, {
          query: {},
          path: {},
          data: {
            faciltListRemoved: selected,
          },
        }).then(res => {
          console.log('RES', res.data)
          if (res.data.resultCode === '1') {
            utils.messageBox('success', this.$t('삭제를 완료하였습니다.'), null, this.onSearch())
          } else {
            utils.messageBox('failure', this.$t('시설을 삭제하는데 실패하였습니다.'), null, null)
          }
          this.onSearch()
        }).catch(error => {
          console.log(error)
        })
      })
    },
    onNewFacilt() {
      const params = Object.assign({}, this.params, this.paging)
      //this.$router.push({ path: '/PGE_AAB_00002', params })
      utils.goPage('PGE_AAB_00002', { params })
    },
    onOpenKioskPopup() {
      this.$refs.kioskPopup.open()
    },
    onExcelDnLoad() {
      console.log('onExcelDnLoad')

      const query = Object.assign({}, this.params, { noPagingYn: 'Y ' })
      query.faciltName = encodeURI(query.faciltName)

      console.log('REQ-EXCEL-DOWNLOAD')
      const serviceName = 'DTS_AAB_00001'
      http.request(this.contextPageId, serviceName, {
        query,
        path: {},
        data: {},
      }).then(res => {
        console.log('RES-EXCEL-DOWNLOAD', res.data)

        const viewData = res.data.list

        const excelData = []
        viewData.forEach(el => {
          console.log('el', el)

          let code
          let val
          const row = {}
          // 01.시설명
          row.faciltId = el.faciltId
          // 02.시설명
          row.faciltName = el.faciltName
          // 03.시설 카테고리
          row.faciltKindNms = el.faciltKindNms
          // 04.Zone 구분
          code = this.COD_IA_ZONE_KIND.find(v => v.codeId === el.zoneKindCd)
          row.zoneKindNm = code ? code.codeName : '-'
          // 05.게시 여부
          row.exposrYn = el.exposrYn
          // 06.노출 순서
          row.exposrOrder = el.exposrOrder
          // 07.게시 위치
          const app    = el.appExposrYn    === 'Y' ? 'App'     : ''
          const mobile = el.mobileExposrYn === 'Y' ? '모바일웹' : ''
          const pc     = el.pcExposrYn     === 'Y' ? 'PC'      : ''
          val = [app, mobile, pc].filter(v => v?true:false).join(',')
          row.exposrPosition = val ? val : '-'
          // 08.가상대기 여부
          code = this.codes.COD_IA_VLINE_WAIT_YN.find(v => v.codeId === el.vlineWaitYn)
          val = code ? code.codeName : ''
          row.vlineWaitYnNm = val ? val : '-'
          // 09.가상대기 그룹
          code = this.codes.COD_IA_VLINE_WAIT_GRP.find(v => v.codeId === el.vlineWaitGrpCd)
          val = code ? code.codeName : ''
          row.vlineWaitGrpNm = val ? val : '-'

          // 15.등록일시
          row.fstRgstDtm = utils.dateformatToClient(el.fstRgstDtm)
          // 16.등록자
          row.fstRgstUsrId = el.fstRgstUsrId
          // 17.수정일시
          row.fnlMdfcDtm = utils.dateformatToClient(el.fnlMdfcDtm)
          // 18.수정자
          row.fnlMdfcUsrId = el.fnlMdfcUsrId

          excelData.push(row)
        })

        const excelDataSet = new this.$ur.grid.DataSet()
        excelDataSet.setData(excelData)

        const sPageId = this.contextPageId
        const objGridColumns = this.columns
        const objGridDataset = excelDataSet
        const sToday = utils.now('YYYY-MM-DD HH:mm:ss')
        const sExcelName = `${this.$t('시설정보관리')}_${sToday}.xlsx`
        utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {})
      }).catch(error => {
        console.log('ERR-EXCEL-DOWNLOAD', error)
      })
    },
    manualRun() {
      console.log('manualRun')
      this.getBatchCd('FacilityList')
    },
    getBatchCd(scheduleName) {
      utils.messageBox('confirm', this.$t('MSG_TXT_PERF_GO'), null, () => { // 동기화를 진행하시겠습니까?
        http.request(this.contextPageId, 'DTS_AAB_00050', {
          data: {
            scheduleName: encodeURI(scheduleName),
          },
        }).then(res => {
          console.log(res.data)
          if (res.data.resultCode === '-1') { // -1 이면 서버 메시지를 그대로 표시한다.
            utils.messageBox('warning', res.data.msg)
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    onPopsBatchSync() {
      console.log('onPopsBatchSync')
      utils.messageBox('confirm', this.$t('MSG_TXT_PERF_GO'), null, () => { // 동기화를 진행하시겠습니까?
        http.request(this.contextPageId, 'DTS_AAB_00051', {
          query: {},
          path: {},
          data: {
            parkKindCd: this.params.parkKindCd,
          },
        }).then(res => {
          console.log(res.data)
          if (res.data.resultCode === '-1') { // -1 이면 서버 메시지를 그대로 표시한다.
            utils.messageBox('warning', res.data.msg)
          } else if (res.data.resultCode === '0') { // 실패
            utils.messageBox('warning', res.data.msg)
          } else if (res.data.resultCode === '1') { // 성공
            utils.messageBox('warning', res.data.msg)
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    alert(msg) {
      this.$refs.alertModal.open(msg)
    },
  },
}
</script>
<style scoped>
</style>
