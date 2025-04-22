<template>
  <div>
    <!-- 검색조건 -->
    <template>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_BUSINESS_DT')"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex-wrap"
        >
          <ur-date-picker
            v-model="params.salesDate"
            input-type="YYYY-MM-DD"
            model-type="YYYYMMDD"
            init="day-0"
            :confirm-label="$t('MSG_TXT_SELT')"
            :today-label="$t('MSG_BTN_TODAY')"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_FACILT_NAME')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <!-- 검색조건EL : 시설명 -->
          <ur-text-field
            v-model="params.faciltName"
            maxlength="300"
            style="width: 100%;"
            @keydown.enter="onSearchEvt"
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
            @click="onSearchEvt"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </ur-button>
          <ur-button @click="onTest" v-if="false">TEST</ur-button>
        </div>
      </div>
    </template>

    <!-- 데이타그리드EL  "custom_grid_pgeNav_None mt35"  "custom_grid_type1 mt35" -->
    <template>

      <div v-if="false">{{dataSetRawData}}</div>
      <ur-table v-if="false" :items="dataSetRawData" :headers="columnsD" no-control title="RAW"/>
      <div v-if="false">{{dataSetChangedData}}</div>
      <ur-table v-if="false" :items="dataSetChangedData" :headers="columnsD" no-control title="CRU"/>

      <ur-data-grid
        ref="grid"
        class="custom_grid_type1 mt35"
        :headers="columns"
        :data-source="dataSet"
        :options="opts"
        :item-size="dataTotalCount"
        style="height: calc(100% - 40px)"
        @grid:paging="pagingChange"
        @grid:data-changed="onDataChange"
      >
        <template #center-info v-if="IS_CB_ON">
          <ur-switch
            v-model="entryRestrictionYn"
            labeled
            :msg-on-label="$t('입장가능')"
            :msg-off-label="$t('입장제한')"
            positive-value="Y"
            negative-value="N"
            class="mr8 col_var"
            @input="onChangeEntryRestrictionYn"
          />
          <ur-button
            color="violet"
            class="ml8 mr8"
            @click="openWavePool"
          >
            {{ $t('파도풀 관리') }}
          </ur-button>
        </template>
        <template #right-info>
          <span
            v-show="false"
            style="padding-top: 6px; padding-right: 10px;"
          >
            * 일별시설운영 관리는 등록된 시설 담당자만 가능 합니다.
          </span>
          <ur-dropdown
            v-model="operStatusCd"
            :items="codes.COD_IA_FACILT_DAILY_OPER_STATUS"
            style="width:150px;"
            class="pr10"
          />
          <ur-button
            color="violet"
            @click="onResetOperStatus"
          >
            {{ $t('운영상태 일괄변경') }}
          </ur-button>
          <ur-button
            color="violet"
            @click="onResetByDefault"
          >
            {{ $t('기초정보 가져오기') }}
          </ur-button>
          <ur-button
            color="violet"
            @click="openQpassTier"
          >
            {{ $t('일자별 Q-PASS Tier 관리') }}
          </ur-button>
          <ur-button
            color="violet"
            @click="openBatchMgr"
          >
            {{ $t('일괄 생성') }}
          </ur-button>
          <ur-button
            v-show="true"
            v-if="IS_EL_ON"
            v-permission:create="contextPageId"
            @click="onPopsBatchSync"
          >
            {{ $t('MSG_BTN_POPS_BATCH_SYNC') }} <!-- POPS 일괄 동기화 -->
          </ur-button>
          <ur-button
            v-permission:excel="contextPageId"
            @click="onExcelDnLoad"
          >
            <ur-icon
              icon="download"
              icon-type="line"
              size="small"
              spacing
            />
            {{ $t('MSG_BTN_EXCEL_DOWNLOAD') }}
          </ur-button>
        </template>
        <template
          v-if="IS_EL_ON"
          #header
        >
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
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell
              colspan="4"
              text="가상대기 설정"
              align="center"
            />
            <ur-data-grid-header-cell
              colspan="3"
              text="예약 설정"
              align="center"
            />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
          </ur-data-grid-header-row>
          <ur-data-grid-header-row>
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell :expand-resizer="1" />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell :expand-resizer="1" />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell :expand-resizer="1" />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell :expand-resizer="1" />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell :expand-resizer="1" />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell :expand-resizer="1" />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell :expand-resizer="1" />
            <ur-data-grid-header-cell />
          </ur-data-grid-header-row>
        </template>
      </ur-data-grid>
    </template>

    <!-- 그리드하단버튼EL : 삭제 & 신규등록 -->
    <div class="btn_wrap mt10">
      <div class="right_box">
        <span style="padding-top: 6px; padding-right: 10px;">* 일별시설운영 관리는 등록된 시설 담당자만 가능 합니다.</span>
        <!-- 엑셀업로드 -->
        <input
          v-show="false"
          ref="excelFile"
          type="file"
          accept=".xlsx"
          @change="onChangeExcelFile"
        >
        <!-- [버튼] 엑셀업로드 양식 다운로드 -->
        <ur-button
          v-show="true"
          @click="onExcelUploadFormDownload"
        >
          <ur-icon
            icon="download"
            icon-type="line"
            size="small"
            spacing
          />
          {{ $t('MSG_BTN_EXCEL_FORM_DOWNLOAD') }}
        </ur-button>
        <!-- [버튼] 엑셀업로드 -->
        <ur-button
          v-show="true"
          v-permission:excel="contextPageId"
          @click="onExcelUpload"
        >
          <ur-icon
            icon="upload"
            icon-type="line"
            size="small"
            spacing
          />
          {{ $t('MSG_TXT_EXCEL_UPLOAD') }}
        </ur-button>
        <ur-button
          color="violet"
          @click="onDelete"
        >
          {{ $t('MSG_BTN_DEL') }}
        </ur-button>
        <ur-button
          color="violet"
          @click="onAdd"
        >
          {{ $t('MSG_BTN_FACILT_ADD') }}
        </ur-button>
        <ur-button
          v-permission:create="contextPageId"
          color="violet"
          @click="onSave"
        >
          {{ $t('MSG_BTN_SAVE') }}
        </ur-button>
      </div>
    </div>
    <!-- 모달 : Alert -->
    <ALERT
      ref="alertModal"
    />
    <ur-modal
      ref="modalPopsSync"
      :title="$t('일별시설운영정보 POPS 일괄동기화')"
      width="800"
      style="z-index: 1000;"
      dragable
      no-foot
    >
      <template>
        <ur-form-box>
          <ur-form-item
            :label="$t('MSG_TXT_PRD')"
            label-align="right"
            style="width: 100%; height: auto;"
            class="flex_wrap"
            required
          >
            <ur-range-picker
              v-model="popsSync.startEndSalesDateArr"
              input-type="YYYY-MM-DD"
              model-type="YYYYMMDD"
              :min-date="getToday('-')"
              :confirm-label="$t('MSG_TXT_SELT')"
              :clear-label="$t('MSG_BTN_RESET')"
              clearable
              init="clear"
            />
          </ur-form-item>
        </ur-form-box>
        <div class="btn_wrap">
          <div class="left_box">
            <span
              style="padding-top: 5px; padding-right: 5px;"
            >
              * 종료날짜를 선택하지 않으면 시작날짜부터 그 이후의 모든 영업일에 대한 운영정보가 동기화 됩니다.
            </span>
          </div>
          <div class="right_box">
            <ur-button
              main
              @click="modalPopsSyncCancel"
            >
              {{ $t('MSG_BTN_CANCEL') }}
            </ur-button>
            <ur-button
              main
              @click="modalPopsSyncSync"
            >
              {{ $t('MSG_TXT_PERF') }}
            </ur-button>
          </div>
        </div>
      </template>
    </ur-modal>
  </div>
</template>

<script>

import ALERT from './PGE_AAB_00001_P01.vue' // ALERT 팝업
import CommonUtils from '~aa/js/common-utils'

const PARK_KIND_CD = '01' // '01' 에버랜드 , '02' 캐리비안베이

const RULES = {
  email       : /*NOSONAR*/(v) => !v || EMAIL_REGEX.test(v)                     || 'This value has to be e-mail form.',
  emailDomain : /*NOSONAR*/(v) => !v || !!EMAIL_DOMAIN.find(d => v.endsWith(d)) || 'The e-mail has wrong domain.',
  numEven     : /*NOSONAR*/(v) => !v || v%2 === 0                               || 'Number has to be even.',
  workDay     : /*NOSONAR*/(v) => !v || (1<=v.getDay() && v.getDay()<=5)        || 'The holiday is not allowed.',
  lessThan50  : /*NOSONAR*/(v) => !v || v>50                                    || 'Score has to greater than 50.',
  emailUserLength  : /*NOSONAR*/(v) => !v || v.split('@')[0].length < 20        || 'E-mail user has to less than 20.',
}

export default {
  name: 'PGE_AAB_00005_T01', // eslint-disable-line vue/name-property-casing
  components: {
    ALERT,
  },
  data() {
    return {
      dataSet: new this.$ur.grid.DataSet(),
      dataSetRawData: [],
      dataSetChangedData: [],
      dataTotalCount: 0,
      opts: {
        styleBordered: false,
        resizableColumn: true,
        headerHeight: PARK_KIND_CD === '01' ? 18 : 36,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        resizeFullWidth: false,
        noInfo: false,
        height: 570,
        pagination: true,
        defaultPageSize: 30,
        msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
      },
      paging: {
        currentPage: 1,
        rowsPerPage: 30,
      },
      params: {
        parkKindCd: PARK_KIND_CD, // '01' 에버랜드 , '02' 캐리비안베이
        salesDate: '',
        faciltName: '',
        faciltCateKindCds: '',
        zoneKindCd: '',
      },
      popsSync: {
        startEndSalesDateArr: ['', ''],
      },
      entryRestrictionYn: 'Y',
      operStatusCd: 'STND', // 운영상태 일괄변경 파라미터
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
        { value: 'salesDate', text: '영업일자', width: 85,  },
        { value: 'faciltName', text: '시설명', minWidth: 240, },
        { value: 'faciltKindNms', text: '시설 카테고리', minWidth: 180, },
        { value: 'zoneKindNm', text: 'Zone 구분', minWidth: 120, },
        { value: 'openTime', text: '오픈 시간', width: 120,},
        { value: 'closeTime', text: '종료 시간', width: 120, },
        { value: 'perfrmTimes', text: '공연 시간', minWidth: 180,},
        { value: 'operStatusCd',text: '운영상태', minWidth: 120, },
        // Mid Group
        { value: 'waitTime', text: '대기시간(분)',minWidth: 180, },
        { value: 'waitInfoApplyYn', text: '대기시간 표기방법', minWidth: 180, },
        { value: 'waitDescCd', text: '대기문구', minWidth: 180, },
        { value: 'vlineWaitYn', text: '가상대기 여부', width: 100,},
        { value: 'vlineWaitSettngRidingDistaMm', text: '탑승시간간격', width: 100, },
        { value: 'vlineWaitSettngInfrmBaseMm', text: '사전 알림', width: 100, },
        { value: 'vlineWaitSettngBaseOhrc', text: '기준 OHRC', width: 100,  },
        { value: 'hourAvailHcnt', text: 'THRC', width: 100, },
        { value: 'useDistanceHcnt', text: '이용간격수', width: 100, },
        { value: 'qpassHcnt', text: 'Q-PASS 건수', width: 100, },
        { value: 'vlineWaitGrpNm', text: '가상대기 그룹',width: 100, },
        { value: 'qpassGrpCd', text: 'Q-PASS 그룹', },
        // Tail Group
        { value: 'fstRgstDtm',text: '등록일시',width: 140, },
        { value: 'fstRgstUsrId', text: '등록자', width: 90, },
        { value: 'fnlMdfcDtm',text: '수정일시', width: 140, },
        { value: 'fnlMdfcUsrId', text: '수정자', width: 90, },
      ],
      validateRule: [
        v => !!v || 'Required field!',
        v => v.length <= 10 || 'Maximum length is 10!',
      ],
      FACILT_DAILY_FREE_LIST: [],
      columnsD: [
        { value: 'seqNo', text: 'seqNo', width: 100, customValue: v => v ? v : '-' },
        { value: '__dirty', text: '__dirty', width: 100, customValue: v => v ? v : '-' },
        { value: '__id', text: '__id', width: 100, customValue: v => v ? v : '-' },
        { value: 'salesDate', text: 'salesDate', width: 100, customValue: v => v ? v : '-' },
        { value: 'faciltId', text: 'faciltId', width: 100, customValue: v => v ? v : '-' },
        { value: 'faciltCateKindCds', text: 'faciltCateKindCds', width: 100, customValue: v => v ? v : '-' },
        { value: 'openTime', text: 'openTime', width: 100, customValue: v => v ? v : '-' },
        { value: 'closeTime', text: 'closeTime', width: 100, customValue: v => v ? v : '-' },
        { value: 'perfrmTimes', text: 'perfrmTimes', width: 100, customValue: v => v ? v : '-' },
        { value: 'operStatusCd', text: 'operStatusCd', width: 100, customValue: v => v ? v : '-' },
        { value: 'waitTime', text: 'waitTime', width: 100, customValue: v => v ? v : '-' },
        { value: 'waitInfoApplyYn', text: 'waitInfoApplyYn', width: 100, customValue: v => v ? v : '-' },
        { value: 'qpassGrpCd', text: 'qpassGrpCd', width: 100, customValue: v => v ? v : '-' },
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
    COD_IA_QPASS_GRP_EXTEND() {
      return [{ text: this.$t('MSG_TXT_NOT_USE'), value: '' }, ...this.codes.COD_IA_QPASS_GRP]
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
    console.log('CODES:', this.codes)

    const that = this
    // Head Group
    const columnHeadGroup = [
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
        minWidth: 240,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          computed: {
            THAT() {
              return that
            },
          },
          template: `<div>
            <template v-if="row.__dirty === 'C'">
              <ur-auto-dropdown v-model="row.faciltId" :items="THAT.FACILT_DAILY_FREE_LIST" no-select="no-select" :msg-no-select="$t('MSG_TXT_SEL')" :placeholder="$t('MSG_TXT_SEL')" @input="onInput" />
            </template>
            <div v-else @click="onClick">{{value}}</div>
            <div v-if="false">/ {{row.__dirty}}</div>
          </div>`,
          methods: {
            onInput(ev) {
              // console.log('onInput', ev)
              const fct = that.FACILT_DAILY_FREE_LIST.find(v => v.faciltId === ev)
              that.dataSet.setRowValue(this.row, 'faciltId', fct.faciltId)
              that.dataSet.setRowValue(this.row, 'faciltName', fct.faciltName)
              that.dataSet.setRowValue(this.row, 'faciltCateKindCds', fct.faciltCateKindCds)
              that.dataSet.setRowValue(this.row, 'faciltKindNms', fct.faciltKindNms)
              that.dataSet.setRowValue(this.row, 'zoneKindCd', fct.zoneKindCd)
              that.dataSet.setRowValue(this.row, 'vlineWaitYn', fct.vlineWaitYn)
              that.dataSet.setRowValue(this.row, 'vlineWaitGrpCd', fct.vlineWaitGrpCd)
              that.dataSet.setRowValue(this.row, 'vlineWaitSettngInfrmBaseMm', fct.vlineWaitSettngInfrmBaseMm)
              that.dataSet.setRowValue(this.row, 'vlineWaitSettngRidingDistaMm', fct.vlineWaitSettngRidingDistaMm)
              that.dataSet.setRowValue(this.row, 'vlineWaitSettngBaseOhrc', fct.vlineWaitSettngBaseOhrc)
              // this.$nextTick(() => { that.fetchData() })
              that.fetchData()
            },
            onClick(evt) {
              // console.log('onClick', evt, this.row.faciltId)
              prompt(this.$t('MSG_TXT_COPY_CLIPBOARD_WITH_CTRL_C'), this.row.faciltId) // Ctrl+C를 눌러 클립보드로 복사하세요.
            },
          },
        },
      },
      {
        value: 'faciltKindNms',
        text: '시설 카테고리',
        minWidth: 180,
        customValue: v => v ? v : '-',
      },
      {
        value: 'zoneKindNm',
        text: 'Zone 구분',
        minWidth: 120,
        customValue: (value, row) => {
          const codeId = row.zoneKindCd
          const code = this.COD_IA_ZONE_KIND.find(v => v.codeId === codeId)
          const val = code ? code.codeName : ''
          return val ?? '-'
        },
      },
      {
        value: 'openTime',
        text: '오픈 시간',
        width: 120,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-text-field
              :value="value"
              :rules="$rules.getRules('min_len(4)','max_int(2400)')"
              mask="time"
              style="width:90%; height:auto;"
              @input="onInput"
            />
          </div>`,
          methods: {
            onInput(v) {
              // (this.value: null, v: '') → 비교 전 보정 필요: utils.trim()
              if (utils.trim(this.value) !== utils.trim(v)) that.dataSet.setRowValue(this.row, 'openTime', v === '' ? null : v)
              that.fetchData()
            },
          },
        },
      },
      {
        value: 'closeTime',
        text: '종료 시간',
        width: 120,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-text-field
              :value="value"
              :rules="$rules.getRules('min_len(4)','max_int(2400)')"
              mask="time"
              style="width:90%; height:auto;"
              @input="onInput"
            />
          </div>`,
          methods: {
            onInput(v) {
              // (this.value: null, v: '') → 비교 전 보정 필요: utils.trim()
              if (utils.trim(this.value) !== utils.trim(v)) that.dataSet.setRowValue(this.row, 'closeTime', v === '' ? null : v)
              that.fetchData()
            },
          },
        },
      },
      {
        value: 'perfrmTimes',
        text: '공연 시간',
        minWidth: 180,
        hide: this.IS_CB_ON,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          components: {
          },
          template: `<div>
            <template v-if="row.faciltCateKindCds && row.faciltCateKindCds.includes('02')">
              <ur-text-field style="width:75%; height:auto; padding-right:10px;" placeholder="" :value="value" readonly />
              <ur-icon-button icon="search" icon-type="line" color="primary" @click="openPerfrmTime"/>
            </template>
            <div v-else>-</div>
          </div>`,
          methods: {
            onInput(v) {
              //console.log('onInput', v)
              //that.dataSet.setRowValue(this.row, 'perfrmTimes', v)
              that.fetchData()
            },
            openPerfrmTime(v) {
              console.log('openPerfrmTime', v)
              if (this.row.__dirty === 'C') {
                utils.messageBox('warning', this.$t('신규항목은 저장 후에 공연시간을 등록할 수 있습니다.'))
                return
              }
              that.openPerfrmTime(this.row)
            },
          },
        },
      },
      {
        value: 'operStatusCd',
        text: '운영상태',
        minWidth: 120,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          computed: {
            COD_IA_FACILT_DAILY_OPER_STATUS() {
              return that.codes.COD_IA_FACILT_DAILY_OPER_STATUS
            },
          },
          template: `<div>
                      <ur-dropdown :value="value" :items="COD_IA_FACILT_DAILY_OPER_STATUS" no-select="no-select" :msg-no-select="$t('MSG_TXT_SEL')" @input="onInput"/>
                    </div>`,
          methods: {
            onInput(v) {
              //console.log('onInput', v)
              if (this.value !== v) that.dataSet.setRowValue(this.row, 'operStatusCd', v)
              that.fetchData()
            },
          },
        },
      },
    ]
    // Mid Group
    let columnMidGroup = [
      {
        value: 'waitTime',
        text: '대기시간(분)',
        minWidth: 180,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          components: {
          },
          template: `<div>
            <template v-if="row.waitInfoApplyYn === 'Y'">
              <ur-text-field
                style="width:75%; height:auto; padding-right:10px;"
                placeholder=""
                mask="number"
                maxlength="3"
                :value="value"
                :rules="$rules.getRules('not_null','only_numeric')"
                @input="onInput"
              />
              <ur-icon-button icon="search" icon-type="line" color="primary" @click="openWaitTimeHistory"/>
            </template>
            <template v-else>
              <span style="width:75%; height:auto; padding-right:10px; padding-top: 8px;">{{customvalue()}}</span>
              <ur-icon-button icon="search" icon-type="line" color="primary" @click="openWaitTimeHistory"/>
            </template>
          </div>`,
          methods: {
            onInput(v) {
              // (this.value: null, v: '') → 비교 전 보정 필요: utils.trim()
              if (utils.trim(this.value) !== utils.trim(v)) that.dataSet.setRowValue(this.row, 'waitTime', v)
              that.fetchData()
            },
            openWaitTimeHistory(v) {
              console.log('openWaitTimeHistory', v)
              that.openWaitTimeHistory(this.row)
            },
            customvalue() {
              const v = this.value
              return v ? v : '-'
            },
          },
        },
      },
      {
        value: 'waitInfoApplyYn',
        text: '대기시간 표기방법',
        minWidth: 180,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          computed: {
            COD_IA_WAIT_INFO_APPLY_YN() {
              return that.codes.COD_IA_WAIT_INFO_APPLY_YN
            },
          },
          template: `<div>
                      <ur-dropdown :value="value" :items="COD_IA_WAIT_INFO_APPLY_YN" @input="onInput"/>
                    </div>`,
          methods: {
            onInput(v) {
              //console.log('onInput', v)
              if (this.value !== v) {
                that.dataSet.setRowValue(this.row, 'waitInfoApplyYn', v)
                that.dataSet.setRowValue(this.row, 'waitTime', this.row.waitTimeOrg)
                that.dataSet.setRowValue(this.row, 'waitDescCd', '')
              }
              that.fetchData()
            },
          },
        },
      },
      {
        value: 'waitDescCd',
        text: '대기문구',
        minWidth: 180,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          computed: {
            COD_IA_WAIT_DESC() {
              return that.codes.COD_IA_WAIT_DESC
            },
          },
          template: `<div>
                      <ur-dropdown
                        v-if="row.waitInfoApplyYn === 'N'"
                        :value="value"
                        :items="COD_IA_WAIT_DESC"
                        no-select="no-select"
                        :rules="$rules.getRules('not_null')"
                        :msg-no-select="$t('MSG_TXT_SEL')"
                        @input="onInput"
                      />
                      <div v-else>-</div>
                    </div>`,
          methods: {
            onInput(v) {
              //console.log('onInput', v)
              if (this.value !== v) that.dataSet.setRowValue(this.row, 'waitDescCd', v)
              that.fetchData()
            },
          },
        },
      },
      {
        value: 'vlineWaitYn',
        text: '가상대기 여부',
        width: 100,
        hide: this.IS_CB_ON,
        customValue: (value, row) => {
          const codeId = row.vlineWaitYn
          const code = this.codes.COD_IA_VLINE_WAIT_YN.find(v => v.codeId === codeId)
          const v = code ? code.codeName : ''
          return v ? v : '-'
        },
      },
      { value: 'vlineWaitSettngRidingDistaMm', text: '탑승시간간격', width: 100, hide: this.IS_CB_ON, customValue: v => v ?? '-' }, // INTERVALBRD_TIME , [탑승시간간격]
      { value: 'vlineWaitSettngInfrmBaseMm', text: '사전 알림', width: 100, hide: this.IS_CB_ON, customValue: v => v ?? '-' }, // WAITPUSH_TIME , [사전알림(탑승확정시간)]
      { value: 'vlineWaitSettngBaseOhrc', text: '기준 OHRC', width: 100, hide: this.IS_CB_ON, customValue: v => v ?? '-' }, // HH_RIDECAPA_CNT , [기준 OHRC]
      { value: 'hourAvailHcnt', text: 'THRC', width: 100, hide: this.IS_CB_ON, customValue: v => v ?? '-' },
      { value: 'useDistanceHcnt', text: '이용간격수', width: 100, hide: this.IS_CB_ON, customValue: v => v ?? '-' },
      { value: 'qpassHcnt', text: 'Q-PASS 건수', width: 100, hide: this.IS_CB_ON, customValue: v => v ?? '-' },
      {
        value: 'vlineWaitGrpNm', // vlineWaitGrpCd
        text: '가상대기 그룹',
        width: 100,
        hide: this.IS_CB_ON,
        customValue: (value, row) => {
          const codeId = row.vlineWaitGrpCd
          const code = this.codes.COD_IA_VLINE_WAIT_GRP.find(v => v.codeId === codeId)
          const val = code ? code.codeName : null
          return val ?? '-'
        },
      },
      {
        value: 'qpassGrpCd',
        text: 'Q-PASS 그룹',
        hide: this.IS_CB_ON,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          computed: {
            COD_IA_QPASS_GRP() {
              return that.codes.COD_IA_QPASS_GRP
            },
          },
          template: `<div>
            <ur-dropdown
              :value="value"
              :items="COD_IA_QPASS_GRP"
              no-select="no-select"
              :msg-no-select="$t('MSG_TXT_NOT_USE')"
              @input="onInput"/>
          </div>`,
          methods: {
            onInput(v) {
              //console.log('onInput', v)
              if (this.value !== v) that.dataSet.setRowValue(this.row, 'qpassGrpCd', v)
              that.fetchData()
            },
          },
        },
      },
    ]
    // Tail Group
    const columnTailGroup = [
      {
        value: 'fstRgstDtm',
        text: '등록일시',
        width: 140,
        customValue: v => {
          v = utils.dateformatToClient(v)
          return v ? v : '-'
        },
      },
      {
        value: 'fstRgstUsrId', text: '등록자', width: 90, customValue:v=>v?v:'-',
      },
      {
        value: 'fnlMdfcDtm',
        text: '수정일시',
        width: 140,
        customValue: v => {
          v = utils.dateformatToClient(v)
          return v ? v : '-'
        },
      },
      {
        value: 'fnlMdfcUsrId',
        text: '수정자',
        width: 90,
        customValue:v=>v?v:'-',
      },
    ]
    this.columns = [
      ...columnHeadGroup,
      ...columnMidGroup,
      ...columnTailGroup,
    ]

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
      this.paging = paging
      this.onSearch()
    },
    onSearchEvt() {
      const changed = this.dataSet.getChanged()
      if (changed !== null && changed.created.length === 0 && changed.updated.length === 0 && changed.removed.length === 0) {
        this.onSearch()
      } else {
        utils.messageBox('confirm', this.$t('변경 사항이 모두 사라집니다. 계속하시겠습니까?'), null, () => { // 변경 사항이 모두 사라집니다. 계속하시겠습니까?
          this.onSearch()
        })
      }
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

      query.faciltName = encodeURI(query.faciltName)

      console.log('REQ', query)
      const serviceName = 'DTS_AAB_00008'
      http.request(this.contextPageId, serviceName, {
        query: query,
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)

        this.dataTotalCount = res.data.totalCount
        this.dataSet.setData(res.data.dailyList)

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

        const rawData = []
        if (this.dataSet.getRawData()) {
          this.dataSet.getRawData().forEach(element => {
            rawData.push({
              seqNo: element.__idx+1,
              __dirty: element.__dirty,
              __id: element.__id,

              salesDate: element.salesDate,
              faciltId: element.faciltId, // 시설ID
              faciltCateKindCds: element.faciltCateKindCds,
              faciltKindNms: element.faciltKindNms,
              zoneKindCd: element.zoneKindCd,
              openTime: element.openTime, // 오픈시간
              closeTime: element.closeTime, // 종료시간
              perfrmTimes: element.perfrmTimes, // 공연시간
              operStatusCd: element.operStatusCd, // 운영상태
              waitTime: element.waitTime, // 대기시간 (분)
              waitInfoApplyYn: element.waitInfoApplyYn, // 대기시간 표기방법
              waitDescCd: element.waitDescCd, // 대기문구
              vlineWaitYn: element.vlineWaitYn,
              vlineWaitSettngRidingDistaMm: element.vlineWaitSettngRidingDistaMm,
              vlineWaitSettngInfrmBaseMm: element.vlineWaitSettngInfrmBaseMm,
              vlineWaitSettngBaseOhrc: element.vlineWaitSettngBaseOhrc,
              hourAvailHcnt: element.hourAvailHcnt,
              useDistanceHcnt: element.useDistanceHcnt,
              qpassHcnt: element.qpassHcnt,
              vlineWaitGrpCd: element.vlineWaitGrpCd,
              qpassGrpCd: element.qpassGrpCd, // Q-PASS 그룹
            })
          })
        }
        this.dataSetRawData = rawData
        this.dataSetChangedData = []

        //this.$nextTick(() => { this.dataSet.setData(this.dataSet.getRawData()) })

        //const dailyListCopy = [...res.data.dailyList]
        //this.$nextTick(() => { this.dataSet.setData(dailyListCopy) })
      }).catch(error => {
        console.log('ERR', error)
      })
      
      this.getCbEntryRestriction()
    },
    onDelete() {
      console.log('onDelete')
      const s = this.grid.getSelected()

      if (utils.isEmpty(s)) {
        utils.messageBox('warning', this.$t('선택 된 항목이 없습니다.'))
        return
      }

      utils.messageBox('confirm', this.$t('삭제하시겠습니까? [ 주의. 저장해야 반영 됩니다. ]'), null, () => { // 삭제하시겠습니까?
        if (!!s) {
          if (s.length === 1) this.grid.removeRow(s[0].__id, false) // 2nd arg : select next row
          else this.grid.removeRow(s)

          this.fetchData()
        } else {
          utils.messageBox('warning', this.$t('선택 된 항목이 없습니다.'))
        }
      })
    },
    onAdd() {
      console.log('onAdd')
      /*
      if (this.FACILT_DAILY_FREE_LIST && this.FACILT_DAILY_FREE_LIST.length > 0) {
        this.addNewRow()
        return
      }
      */

      console.log('REQ DATA:', this.params)
      const serviceName = 'DTS_AAB_00009'
      http.request(this.contextPageId, serviceName, {
        query: this.params,
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        if (res.data && res.data.length > 0) {
          this.$refs.grid.noti(`신규로 등록 가능한 시설이 ${res.data.length}개 조회 되었습니다.`)
          this.FACILT_DAILY_FREE_LIST = res.data
          this.addNewRow()
          this.fetchData()
        } else {
          utils.messageBox('warning', this.$t('신규로 등록 가능한 시설이 없습니다.'))
        }
      }).catch(error => {
        console.log(error)
      })
      console.log('REQ END')
    },
    addNewRow() {
      this.add({
        salesDate: this.params.salesDate, // 영업일자
        faciltId: '', // 시설ID
        faciltCateKindCds: '',
        faciltKindNms: '',
        zoneKindCd: '',
        openTime: null, // 오픈시간
        closeTime: null, // 종료시간
        perfrmTimes: '', // 공연시간
        operStatusCd: 'STND', // 운영상태
        waitTime: null, // 대기시간 (분)
        waitInfoApplyYn: 'A', // 대기시간 표기방법
        waitDescCd: '', // 대기문구
        vlineWaitYn: '',
        vlineWaitSettngRidingDistaMm: '',
        vlineWaitSettngInfrmBaseMm: '',
        vlineWaitSettngBaseOhrc: '',
        hourAvailHcnt: '',
        useDistanceHcnt: '',
        qpassHcnt: '',
        vlineWaitGrpCd: '',
        qpassGrpCd: '', // Q-PASS 그룹
      })
    },
    add(row) {
      console.log('add')
      this.dataSet.addRow(row, this.dataSet.ADD_ROW_TOP)

      this.$nextTick(() => {
        this.grid.setScrollRow(0)
      })
    },
    onSave() {
      console.log('onSave')
      const changed = this.dataSet.getChanged()
      const rawData = this.dataSetRawData

      // changed.removed 중에서 오리지널 리스트에 존재하던 것만 추려낸다.
      const removed = []
      changed.removed.forEach(removedElement => {
        const foundFromRaw = rawData.find(el => el.__id === removedElement.__id)
        if (!utils.isEmpty(foundFromRaw)) {
          removed.push(foundFromRaw)
        }
      })

      // changed.created 중에서 changed.removed 에 존재하는 것은 제외한다.
      const created = []
      changed.created.forEach(createdElement => {
        const found = changed.removed.find(el => el.__id === createdElement.__id)
        if (utils.isEmpty(found)) {
          created.push(createdElement)
        }
      })

      // changed.updated 중에서 changed.removed 에 존재하는 것은 제외한다.
      const updated = []
      changed.updated.forEach(updatedElement => {
        const found = changed.removed.find(el => el.__id === updatedElement.__id)
        if (utils.isEmpty(found)) {
          updated.push(updatedElement)
        }
      })

      // Q-Pass 그룹 Tier 정보가 변경된 시설이 있는지 체크
      let confirmMsg
      const found = updated.find(v => {
        if (v.qpassGrpCd !== v.qpassGrpCdOrg) return true
        return false
      })
      if (!utils.isEmpty(found)) {
        confirmMsg = this.$t('Q-PASS 그룹 변경 시 스마트예약 미노출 되는 문제가 있으니 \n설정값이 맞는지 재확인 하시기 바랍니다. 저장하시겠습니까?')
      } else {
        confirmMsg = this.$t('저장하시겠습니까?')
      }

      console.log('REMOVED', removed)
      console.log('CREATED', created)
      console.log('UPDATED', updated)
      if (this.validated(removed, created, updated)) {
        utils.messageBox('confirm', confirmMsg, null, () => { // 저장하시겠습니까?
          console.log('REQ DATA:', this.params)
          const serviceName = 'DTS_AAB_00010'
          http.request(this.contextPageId, serviceName, {
            query: {},
            path: {},
            data: {
              parkKindCd: this.params.parkKindCd,
              faciltDailyListCreated: [...created],
              faciltDailyListUpdated: [...updated],
              faciltDailyListRemoved: [...removed],
            },
          }).then(res => {
            console.log('RES', res.data)
            if (res.data.resultCode === '-1') { // -1 이면 서버 메시지를 그대로 표시한다.
              utils.messageBox('warning', res.data.msg)
            } else if (res.data.resultCode === '0') {
              utils.messageBox('warning', this.$t('해당 기준 일자에는 일별시설운영 정보 데이터가 없으니 다른 기준 일자를 선택하세요.'))
            } else {
              utils.messageBox('warning', this.$t('일별시설운영 정보가 변경 되었습니다.'))
              this.onSearch()
            }
          }).catch(error => {
            console.log(error)
          })
        })
      }
    },
    validated(pRemoved, pCreated, pUpdated) {
      const removed = pRemoved ?? []
      const created = pCreated ?? []
      const updated = pUpdated ?? []

      if ((created.length + updated.length + removed.length) === 0) {
        utils.messageBox('warning', this.$t('변경된 사항이 없습니다.'))
        return false
      }

      // 필수항목
      if (!this.$rules.validate(this)) {
        utils.messageBox('warning', this.$t('필수 항목이 입력되지 않았거나 값이 올바르지 않습니다.'))
        return false
      }

      // 신규항목인 경우 시설명 선택 여부 확인
      if (created.filter(v => v.faciltId === '').length > 0) {
        utils.messageBox('warning', this.$t('신규등록 항목 중 시설명이 선택되지 않은 항목이 있습니다.'))
        return false
      }

      const CR = [...created, ...updated]
      // 신규 및 수정항목 입력값 openTime, closeTime 에서 분값이 60을 초과하는지 확인
      let found = CR.find(v => {
        if (!utils.isEmpty(v.openTime) && v.openTime.substr(2, 1) >= '6') return true
        if (!utils.isEmpty(v.closeTime) && v.closeTime.substr(2, 1) >= '6') return true
        return false
      })
      if (!utils.isEmpty(found)) {
        utils.messageBox('warning', this.$t(`시설 '${found.faciltName}'의 시간 값이 올바르지 않습니다. (60분 단위 초과)`))
        return false
      }

      // 신규 및 수정항목 입력값 openTime, closeTime 비교확인
      found = CR.find(v => {
        if (!utils.isEmpty(v.openTime) && !utils.isEmpty(v.closeTime) && v.closeTime < v.openTime) return true
        return false
      })
      if (!utils.isEmpty(found)) {
        utils.messageBox('warning', this.$t(`시설 '${found.faciltName}'의 종료시간이 오픈시간 보다 빠릅니다.`))
        return false
      }

      // 신규 및 수정항목 입력값 openTime, closeTime 값이 널인지 확인
      /* 20231010 오픈시간, 종료시간 옵션값 처리! 더이상 필수 아님!
      found = CR.find(arg => {
        // 시설 카테고리가 '공연,주토피아'인 경우에는 오픈시간 또는 종료시간에 빈값을 넣는 것을 허용하기 위해 검사를 스킵한다.
        const PARK_KIND_EVERLAND = '01'
        const FACILT_CATE_PERFRM_AND_ZOOTOPIA = '02,03'
        const v = arg
        if (PARK_KIND_CD === PARK_KIND_EVERLAND && v.faciltCateKindCds === FACILT_CATE_PERFRM_AND_ZOOTOPIA) {
          return false
        }

        if (utils.isEmpty(v.openTime) || utils.isEmpty(v.closeTime)) return true
        return false
      })
      if (!utils.isEmpty(found)) {
        if (utils.isEmpty(found.openTime)) utils.messageBox('warning', this.$t(`시설 '${found.faciltName}'의 오픈시간 값이 입력되지 않았습니다.`))
        else utils.messageBox('warning', this.$t(`시설 '${found.faciltName}'의 종료시간 값이 입력되지 않았습니다.`))
        return false
      }
      */

      return true
    },
    fetchData() {
      //console.log('fetchData')
      this.$nextTick(() => {
        const ch = Object.assign({}, this.dataSet.getChanged())
        const CRUData = []
        ch.created.forEach(element => {
          CRUData.push({
            seqNo: element.__idx+1,
            dirty: element.__dirty,
            id: element.__id,

            salesDate: element.salesDate,
            faciltId: element.faciltId, // 시설ID
            faciltCateKindCds: element.faciltCateKindCds,
            faciltKindNms: element.faciltKindNms,
            zoneKindCd: element.zoneKindCd,
            openTime: element.openTime, // 오픈시간
            closeTime: element.closeTime, // 종료시간
            perfrmTimes: element.perfrmTimes, // 공연시간
            operStatusCd: element.operStatusCd, // 운영상태
            waitTime: element.waitTime, // 대기시간 (분)
            waitInfoApplyYn: element.waitInfoApplyYn, // 대기시간 표기방법
            waitDescCd: element.waitDescCd, // 대기문구
            vlineWaitYn: element.vlineWaitYn,
            vlineWaitSettngRidingDistaMm: element.vlineWaitSettngRidingDistaMm,
            vlineWaitSettngInfrmBaseMm: element.vlineWaitSettngInfrmBaseMm,
            vlineWaitSettngBaseOhrc: element.vlineWaitSettngBaseOhrc,
            hourAvailHcnt: element.hourAvailHcnt,
            useDistanceHcnt: element.useDistanceHcnt,
            qpassHcnt: element.qpassHcnt,
            vlineWaitGrpCd: element.vlineWaitGrpCd,
            qpassGrpCd: element.qpassGrpCd, // Q-PASS 그룹
          })
        })
        ch.removed.forEach(element => {
          CRUData.push({
            seqNo: element.__idx+1,
            dirty: element.__dirty,
            id: element.__id,

            salesDate: element.salesDate,
            faciltId: element.faciltId, // 시설ID
            faciltCateKindCds: element.faciltCateKindCds,
            faciltKindNms: element.faciltKindNms,
            zoneKindCd: element.zoneKindCd,
            openTime: element.openTime, // 오픈시간
            closeTime: element.closeTime, // 종료시간
            perfrmTimes: element.perfrmTimes, // 공연시간
            operStatusCd: element.operStatusCd, // 운영상태
            waitTime: element.waitTime, // 대기시간 (분)
            waitInfoApplyYn: element.waitInfoApplyYn, // 대기시간 표기방법
            waitDescCd: element.waitDescCd, // 대기문구
            vlineWaitYn: element.vlineWaitYn,
            vlineWaitSettngRidingDistaMm: element.vlineWaitSettngRidingDistaMm,
            vlineWaitSettngInfrmBaseMm: element.vlineWaitSettngInfrmBaseMm,
            vlineWaitSettngBaseOhrc: element.vlineWaitSettngBaseOhrc,
            hourAvailHcnt: element.hourAvailHcnt,
            useDistanceHcnt: element.useDistanceHcnt,
            qpassHcnt: element.qpassHcnt,
            vlineWaitGrpCd: element.vlineWaitGrpCd,
            qpassGrpCd: element.qpassGrpCd, // Q-PASS 그룹
          })
        })
        ch.updated.forEach(element => {
          CRUData.push({
            seqNo: element.__idx+1,
            dirty: element.__dirty,
            id: element.__id,

            salesDate: element.salesDate,
            faciltId: element.faciltId, // 시설ID
            faciltCateKindCds: element.faciltCateKindCds,
            faciltKindNms: element.faciltKindNms,
            zoneKindCd: element.zoneKindCd,
            openTime: element.openTime, // 오픈시간
            closeTime: element.closeTime, // 종료시간
            perfrmTimes: element.perfrmTimes, // 공연시간
            operStatusCd: element.operStatusCd, // 운영상태
            waitTime: element.waitTime, // 대기시간 (분)
            waitInfoApplyYn: element.waitInfoApplyYn, // 대기시간 표기방법
            waitDescCd: element.waitDescCd, // 대기문구
            vlineWaitYn: element.vlineWaitYn,
            vlineWaitSettngRidingDistaMm: element.vlineWaitSettngRidingDistaMm,
            vlineWaitSettngInfrmBaseMm: element.vlineWaitSettngInfrmBaseMm,
            vlineWaitSettngBaseOhrc: element.vlineWaitSettngBaseOhrc,
            hourAvailHcnt: element.hourAvailHcnt,
            useDistanceHcnt: element.useDistanceHcnt,
            qpassHcnt: element.qpassHcnt,
            vlineWaitGrpCd: element.vlineWaitGrpCd,
            qpassGrpCd: element.qpassGrpCd, // Q-PASS 그룹
          })
        })

        this.dataSetChangedData = CRUData
      })
    },
    onResetOperStatus() {
      //const d = this.grid.getSelected()
      const d = this.grid.getData()
      if (!!d) {
        utils.messageBox('confirm', this.$t('운영상태를 일괄 변경 하시겠습니까?'), null, () => { // 기초정보를 그리드에 적용하시겠습니까?
          d.forEach(r => {
            this.grid.setRowValue(r.__id, 'operStatusCd', this.operStatusCd)
          })
        })
      } else {
        this.$notify('Please click row')
      }
    },
    onResetByDefault() {
      //const d = this.grid.getSelected()
      const d = this.grid.getData()
      if (!!d) {
        utils.messageBox('confirm', this.$t('기초정보를 그리드에 적용하시겠습니까?'), null, () => { // 기초정보를 그리드에 적용하시겠습니까?
          d.forEach(r => {
            this.grid.setRow(r.__id, {
              openTime: null, // 오픈시간
              closeTime: null, // 종료시간
              perfrmTimes: '', // 공연시간
              operStatusCd: 'STND', // 운영상태
              waitTime: null, // 대기시간 (분)
              waitInfoApplyYn: 'A', // 대기시간 표기방법
              waitDescCd: '', // 대기문구
              qpassGrpCd: '', // Q-PASS 그룹
            })
          })
        })
      } else {
        this.$notify('Please click row')
      }
    },
    // [엑셀다운로드]
    onExcelDnLoad() {
      console.log('onExcelDnLoad')

      console.log('REQ-EXCEL-DOWNLOAD')
      const serviceName = 'DTS_AAB_00008'
      http.request(this.contextPageId, serviceName, {
        query: {
          salesDate: this.params.salesDate,
          parkKindCd: this.params.parkKindCd,
        },
        path: {},
        data: {},
      }).then(res => {
        console.log('RES-EXCEL-DOWNLOAD', res.data)
        const viewData = res.data.dailyList
        const excelData = []
        viewData.forEach(el => {
          console.log('el', el)

          let code
          const row = {}
          // 01.영업일자
          row.salesDate = utils.dateformatToClient(el.salesDate)
          // 02.시설명
          row.faciltName = el.faciltName
          // 03.시설 카테고리
          row.faciltKindNms = el.faciltKindNms
          // 04.Zone 구분
          code = this.COD_IA_ZONE_KIND.find(v => v.codeId === el.zoneKindCd)
          row.zoneKindNm = code ? code.codeName : '-'
          // 05.오픈 시간
          row.openTime = this.getTimeFmt(el.openTime)
          // 06.종료 시간
          row.closeTime = this.getTimeFmt(el.closeTime)
          // 07.공연 시간
          row.perfrmTimes = el.perfrmTimes
          // 08.운영상태
          code = this.codes.COD_IA_FACILT_DAILY_OPER_STATUS.find(v => v.codeId === el.operStatusCd)
          row.operStatusCd = code ? code.codeName : '-'
          // 09.대기시간(분)
          row.waitTime = el.waitTime
//          if (row.waitTime === '0') row.waitTime = ''
          // 10.대기시간 표기방법
          code = this.codes.COD_IA_WAIT_INFO_APPLY_YN.find(v => v.codeId === el.waitInfoApplyYn)
          row.waitInfoApplyYn = code ? code.codeName : '자동입력'
          // 11.대기문구
          code = this.codes.COD_IA_WAIT_DESC.find(v => v.codeId === el.waitDescCd)
          row.waitDescCd = code ? code.codeName : '-'

          // 12-1.가상대기 여부
          code = this.codes.COD_IA_VLINE_WAIT_YN.find(v => v.codeId === el.vlineWaitYn)
          row.vlineWaitYn = code ? code.codeName : '-'
          // 12-2.탑승시간간격
          row.vlineWaitSettngRidingDistaMm = el.vlineWaitSettngRidingDistaMm
          // 12-3.사전 알림
          row.vlineWaitSettngInfrmBaseMm = el.vlineWaitSettngInfrmBaseMm
          // 12-4.기준 OHRC
          row.vlineWaitSettngBaseOhrc = el.vlineWaitSettngBaseOhrc
          // 12-5.THRC
          row.hourAvailHcnt = el.hourAvailHcnt
          // 12-6.이용간격수
          row.useDistanceHcnt = el.useDistanceHcnt
          // 12-7.Q-PASS 건수
          row.qpassHcnt = el.qpassHcnt
          // 12-8.가상대기 그룹
          code = this.codes.COD_IA_VLINE_WAIT_GRP.find(v => v.codeId === el.vlineWaitGrpCd)
          row.vlineWaitGrpNm = code ? code.codeName : '-'
          // 12-9.Q-PASS 그룹
          code = this.COD_IA_QPASS_GRP_EXTEND.find(v => v.codeId === el.qpassGrpCd)
          row.qpassGrpCd = code ? code.codeName : '-'

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

        let excelColumns = [
          { value: 'salesDate', text: '영업일자', width: 85,  },
          { value: 'faciltName', text: '시설명', minWidth: 240, },
          { value: 'faciltKindNms', text: '시설 카테고리', minWidth: 180, },
          { value: 'zoneKindNm', text: 'Zone 구분', minWidth: 120, },
          { value: 'openTime', text: '오픈 시간', width: 120,},
          { value: 'closeTime', text: '종료 시간', width: 120, },
          { value: 'perfrmTimes', text: '공연 시간', minWidth: 180,},
          { value: 'operStatusCd', text: '운영상태', minWidth: 120, },
          { value: 'waitTime', text: '대기시간(분)', minWidth: 180, },
          { value: 'waitInfoApplyYn', text: '대기시간 표기방법', minWidth: 180, },
          { value: 'waitDescCd', text: '대기문구', minWidth: 180, },

          { value: 'vlineWaitYn', text: '가상대기 여부', width: 100,},
          { value: 'vlineWaitSettngRidingDistaMm', text: '탑승시간간격', width: 100, },
          { value: 'vlineWaitSettngInfrmBaseMm', text: '사전 알림', width: 100, },
          { value: 'vlineWaitSettngBaseOhrc', text: '기준 OHRC', width: 100,  },
          { value: 'hourAvailHcnt', text: 'THRC', width: 100, },
          { value: 'useDistanceHcnt', text: '이용간격수', width: 100, },
          { value: 'qpassHcnt', text: 'Q-PASS 건수', width: 100, },
          { value: 'vlineWaitGrpNm', text: '가상대기 그룹',width: 100, },
          { value: 'qpassGrpCd', text: 'Q-PASS 그룹', },

          { value: 'fstRgstDtm', text: '등록일시', width: 140, },
          { value: 'fstRgstUsrId', text: '등록자', width: 90, },
          { value: 'fnlMdfcDtm', text: '수정일시', width: 140, },
          { value: 'fnlMdfcUsrId', text: '수정자', width: 90, },
        ]
        if (this.IS_CB_ON) {
          excelColumns = [
            { value: 'salesDate', text: '영업일자', width: 85,  },
            { value: 'faciltName', text: '시설명', minWidth: 240, },
            { value: 'faciltKindNms', text: '시설 카테고리', minWidth: 180, },
            { value: 'zoneKindNm', text: 'Zone 구분', minWidth: 120, },
            { value: 'openTime', text: '오픈 시간', width: 120,},
            { value: 'closeTime', text: '종료 시간', width: 120, },
            { value: 'perfrmTimes', text: '공연 시간', minWidth: 180,},
            { value: 'operStatusCd', text: '운영상태', minWidth: 120, },
            { value: 'waitTime', text: '대기시간(분)', minWidth: 180, },
            { value: 'waitInfoApplyYn', text: '대기시간 표기방법', minWidth: 180, },
            { value: 'waitDescCd', text: '대기문구', minWidth: 180, },

            { value: 'fstRgstDtm', text: '등록일시', width: 140, },
            { value: 'fstRgstUsrId', text: '등록자', width: 90, },
            { value: 'fnlMdfcDtm', text: '수정일시', width: 140, },
            { value: 'fnlMdfcUsrId', text: '수정자', width: 90, },
          ]
        }

        const sPageId = this.contextPageId
        const objGridColumns = excelColumns
        const objGridDataset = excelDataSet
        const sToday = utils.now('YYYYMMDDHHmmss')
        const sExcelName = `${this.$t('일별시설운영 관리')}_${sToday}.xlsx`
        utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {})
      }).catch(error => {
        console.log('ERR-EXCEL-DOWNLOAD', error)
      })
    },
    onDataChange() {
      console.log('onDataChange')
    },
    alert(msg) {
      this.$refs.alertModal.open(msg)
    },
    openQpassTier() {
      utils.openLayerPopup('PGE_AAB_00053', this.onSearch, {
        pageInitialData: {
          parkKindCd: PARK_KIND_CD,
        },
      })
    },
    openWaitTimeHistory(row) {
      utils.openLayerPopup('PGE_AAB_00054', null, {
        size: 'xlg',
        pageInitialData: {
          parkKindCd: PARK_KIND_CD,
          faciltId: row.faciltId,
          faciltName: row.faciltName,
          salesDate: row.salesDate,
          caller: row,
        },
      })
    },
    openPerfrmTime(row) {
      utils.openLayerPopup('PGE_AAB_00055', this.onSearch, {
        size: 'xlg',
        pageInitialData: {
          parkKindCd: PARK_KIND_CD,
          faciltId: row.faciltId,
          salesDate: row.salesDate,
          caller: row,
        },
      })
    },
    openWavePool() {
      console.log('openWavePool', this.params.salesDate)
      if (utils.isEmpty(this.params.salesDate)) {
        utils.messageBox('warning', this.$t('검색조건에서 파도풀 관리를 등록할 영업일자를 입력해 주세요.'))
        return
      }
      utils.openLayerPopup('PGE_AAB_00056', null, {
        pageInitialData: {
          parkKindCd: PARK_KIND_CD,
          salesDate: this.params.salesDate,
        },
      })
    },
    openBatchMgr() {
      utils.openLayerPopup('PGE_AAB_00057', this.onBatchMgrClosed, {
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
    onChangeEntryRestrictionYn() {
      console.log('onChangeEntryRestrictionYn')
      this.saveCbEntryRestriction()
    },
    getCbEntryRestriction() {
      console.log('getCbEntryRestriction')
      console.log('REQ')
      const serviceName = 'DTS_AAB_00042'
      http.request(this.contextPageId, serviceName, {
        query: {},
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        this.entryRestrictionYn = res.data.entryRestrictionYn
      }).catch(error => {
        console.log('ERR', error)
      })
    },
    saveCbEntryRestriction() {
      console.log('saveCbEntryRestriction')
      console.log('REQ')
      const serviceName = 'DTS_AAB_00043'
      http.request(this.contextPageId, serviceName, {
        query: {},
        path: {},
        data: {
          entryRestrictionYn: this.entryRestrictionYn,
        },
      }).then(res => {
        console.log('RES', res.data)
        this.getCbEntryRestriction()
      }).catch(error => {
        console.log('ERR', error)
      })
    },
    getTimeFmt(HHMM) {
      if (utils.isEmpty(HHMM)) return null

      const HH = HHMM.substr(0, 2)
      const MM = HHMM.substr(2, 2)

      return utils.isEmpty(HH) || utils.isEmpty(MM) ? HHMM : `${HH}:${MM}`
    },
    // [엑셀업로드 양식 다운로드]
    onExcelUploadFormDownload() {
      const { pageId } = this
      const columns = [
        {
          text: this.$t('영업일자'), // 영업일자
          type: 'text',
          width: 20,
          memo: {
            text: '영업일자 입력 (예: 2023-08-15 )',
            wSize: 3,
            hSize: 2,
          },
        },
        {
          text: this.$t('시설아이디'), // 시설아이디
          type: 'text',
          width: 20,
        },
        {
          text: this.$t('오픈시간'), // 오픈시간
          type: 'text',
          width: 15,
          memo: {
            text: '시간 값 입력 (예: 15:00 )',
            wSize: 3,
            hSize: 2,
          },
        },
        {
          text: this.$t('종료시간'), // 종료시간
          type: 'text',
          width: 15,
          memo: {
            text: '시간 값 입력 (예: 15:00 )',
            wSize: 3,
            hSize: 2,
          },
        },
        /*
        {
          text: this.$t('공연시간'), // 공연시간
          type: 'text',
          width: 15,
          memo: {
            text: '시간 값 입력. 다수입력 시 / 로 구분 (예: 12:00 / 15:00 )',
            wSize: 3,
            hSize: 2,
          },
        },
        */
        {
          text: this.$t('운영상태'), // 운영상태
          type: 'code',
          domain: this.codes.COD_IA_FACILT_DAILY_OPER_STATUS,
          width: 15,
        },
        /*
        {
          text: this.$t('대기시간'), // 대기시간
          type: 'text',
          width: 15,
          memo: {
            text: '숫자이외에 입력불가, (0~999)',
            wSize: 3,
            hSize: 2,
          },
        },
        {
          text: this.$t('대기시간 표시방법'), // 대기시간 표시방법
          type: 'code',
          domain: this.codes.COD_IA_WAIT_INFO_APPLY_YN,
          width: 15,
        },
        {
          text: this.$t('대기문구'), // 대기시간 표시방법
          type: 'code',
          domain: this.codes.COD_IA_WAIT_DESC,
          width: 15,
        },
        {
          text: this.$t('Q-PASS 그룹'), // Q-PASS 그룹
          type: 'code',
          domain: this.COD_IA_QPASS_GRP_EXTEND,
          width: 15,
        },
        */
      ]
      let parkKindNm
      if (this.params.parkKindCd === '01') {
        parkKindNm = this.$t('MSG_TXT_EB')
      } else if (this.params.parkKindCd === '02') {
        parkKindNm = this.$t('MSG_TXT_CB')
      }
      const sToday = utils.now('YYYYMMDD')
      // const pageMeta = this.$store.getters.getPageMeta(this.$options.name)
      const excelFileName = `${this.$t('일별시설운영관리_엑셀업로드_양식')}_${parkKindNm}_${sToday}.xlsx`
      CommonUtils.downloadExcelForm(pageId, columns, excelFileName)
    },
    onExcelUpload() {
      const changed = this.dataSet.getChanged()
      if (changed !== null && changed.created.length === 0 && changed.updated.length === 0 && changed.removed.length === 0) {
        this.$refs.excelFile.value = null
        this.$refs.excelFile.click()
      } else {
        utils.messageBox('confirm', this.$t('변경 사항이 모두 사라집니다. 계속하시겠습니까?'), null, () => { // 변경 사항이 모두 사라집니다. 계속하시겠습니까?
          this.$refs.excelFile.value = null
          this.$refs.excelFile.click()
        })
      }
    },
    onChangeExcelFile(event) {
      const { files } = event.target
      if (!_.isEmpty(files)) {
        const file = files[0]

        const fileName = file.name
        const index = fileName.lastIndexOf('.')
        const exts = fileName.slice(index + 1).toLowerCase()

        if (index > 0 && exts !== 'xlsx') {
          // 허용 가능한 확장자("{xlsx}")의 파일을 추가하시기 바랍니다.
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ADD_NCELL_EXTS_FILE'), 'xlsx'))
          return
        }

        const fileSize = file.size
        if (fileSize > 5242880) {
          // 허용 가능한 용량("{5MB}") 미만의 파일을 추가하시기 바랍니다.
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_TXT_ALT_ALLOWED_MAX_FILE_SIZE'), '5MB'))
          return
        }

        console.log('REQ-EXCEL_UPLOAD')
        const formData = new FormData()
        formData.append('file', file)
        http.request(this.contextPageId, 'DTS_AAB_00049', {
          query: {},
          path: {
            'park-kind-cd': PARK_KIND_CD,
          },
          data: formData,
        }).then(res => {
          console.log('RES-EXCEL_UPLOAD', res.data)

          if (res.data.resultCode === '-1') { // -1 이면 서버 메시지를 그대로 표시한다.
            utils.messageBox('warning', res.data.msg)
            return
          }

          utils.messageBox('warning', res.data.msg)
          this.onSearch()
        })
      }
    },
    onPopsBatchSync() {
      console.log('onPopsBatchSync')
      this.$refs.modalPopsSync.open()
    },
    modalPopsSyncCancel() {
      console.log('modalPopsSyncCancel')
      this.$refs.modalPopsSync.close()
    },
    modalPopsSyncSync() {
      console.log('modalPopsSyncSync')

      const v = this.popsSync.startEndSalesDateArr
      if (!(v && Array.isArray(v) && v.length > 1 && v[0])) {
        utils.messageBox('warning', this.$t('시작일자는 반드시 입력되어야 합니다.'))
        return
      }

      utils.messageBox('confirm', this.$t('MSG_TXT_PERF_GO'), null, () => { // 동기화를 진행하시겠습니까?
        console.log('REQ-POPS-SYNC')
        http.request(this.contextPageId, 'DTS_AAB_00053', {
          query: {},
          path: {},
          data: {
            parkKindCd: this.params.parkKindCd,
            startSalesDate: this.popsSync.startEndSalesDateArr[0],
            endSalesDate: this.popsSync.startEndSalesDateArr[1],
          },
        }).then(res => {
          console.log('RES-POPS-SYNC', res.data)
          if (res.data.resultCode === '-1') { // -1 이면 서버 메시지를 그대로 표시한다.
            utils.messageBox('warning', res.data.msg)
          } else if (res.data.resultCode === '0') { // 실패
            utils.messageBox('warning', res.data.msg)
          } else if (res.data.resultCode === '1') { // 성공
            utils.messageBox('warning', res.data.msg)
          }
        }).catch(error => {
          console.log('ERROR-POPS-SYNC', error)
        })
      })
    },
    getToday(delimiter) {
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

      return `${year}${delimiter}${month}${delimiter}${day}`
    },
    onTest() {
      console.log('onTest')
      this.getCbEntryRestriction()
    },
  },
}
</script>
<style scoped>
</style>
