<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 시설 정보 탭 메뉴-->
      <div class="comm_title_wrap">
        <h4>
          {{ $t('일별 가상대기 capa 관리') }} <!-- 일별 가상대기 capa 관리 -->
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- 영업일자 -->
        <ur-form-item
          label="영업일자"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
        >
          {{ params.salesDateFmt }}
        </ur-form-item>
        <!-- 시설명 -->
        <ur-form-item
          label="시설명"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          {{ params.faciltName }}
        </ur-form-item>
        <!-- 시설 카테고리 -->
        <ur-form-item
          label="시설 카테고리"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          {{ params.faciltCateKindNms }}
        </ur-form-item>
        <!-- Zone 구분 -->
        <ur-form-item
          label="Zone 구분"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          {{ params.zoneKindNm }}
        </ur-form-item>
        <!-- 가상대기 여부 -->
        <ur-form-item
          label="가상대기 여부"
          :label-align="'right'"
          style="width:100%; height:auto;"
        >
          {{ params.vlineWaitYnNm }}
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 시설 정보 탭 메뉴-->

      <!-- S :: 시설 Capa 정보 테이블-->
      <!-- S:: 타이틀 버튼 양쪽 -->
      <div class="comm_btn_wrap mb0">
        <div class="comm_title_wrap">
          <h4>
            {{ $t('시설 Capa 정보') }} <!-- 시설 Capa 정보 -->
          </h4>
        </div>
        <div class="left_box pl16">
          <ur-button
            color="violet"
            sm
            @click="onAdd"
          >
            {{ $t('MSG_BTN_ADD') }} <!-- 추가 -->
          </ur-button>
          <ur-button
            color="violet"
            sm
            @click="onDelete"
          >
            {{ $t('MSG_BTN_DEL') }} <!-- 삭제 -->
          </ur-button>
          <ur-button
            color="violet"
            sm
            @click="onReset"
          >
            {{ $t('MSG_BTN_RESET') }} <!-- 초기화 -->
          </ur-button>
        </div>
        <div class="right_box">
          <ur-button
            v-permission:update="contextPageId"
            color="violet"
            sm
            @click="onForceSoldOut"
          >
            {{ $t('강제매진') }} <!-- 강제매진 -->
          </ur-button>
        </div>
      </div>
      <!-- E:: 타이틀 버튼 양쪽 -->

      <ur-data-grid
        ref="grid"
        :headers="columns"
        :data-source="dataSet"
        :options="opts"
        class="custom_grid_pgeNav_None"
      >
        <!-- eslint-disable vue/max-attributes-per-line -->
        <template v-if="true" #header>
          <ur-data-grid-header-row>
            <ur-data-grid-header-cell rowspan="2" align="center" />
            <ur-data-grid-header-cell rowspan="2" align="center" />
            <ur-data-grid-header-cell colspan="2" text="Slot 정보" align="center" />
            <ur-data-grid-header-cell colspan="2" text="예약 정보" align="center" />
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 예약인원 -->
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 취소인원(전체) -->
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 취소인원(확정) -->
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 전체 capa -->
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 사전예약 건수 -->
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 당일 capa -->
            <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 운영 상태 -->
            <ur-data-grid-header-cell v-if="SHOW_DRAW_TIME" rowspan="2" align="center" />
          </ur-data-grid-header-row>
          <ur-data-grid-header-row>
            <ur-data-grid-header-cell :expand-resizer="2" align="center" />
            <ur-data-grid-header-cell :expand-resizer="2" align="center" />
            <ur-data-grid-header-cell :expand-resizer="2" align="center" />
            <ur-data-grid-header-cell :expand-resizer="2" align="center" />
          </ur-data-grid-header-row>
        </template>
        <!-- eslint-enable vue/max-attributes-per-line -->
      </ur-data-grid>
      <!-- E :: 시설 Capa 정보 테이블-->

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button @click="goToList">
              {{ $t('MSG_BTN_LIST') }} <!-- 목록 -->
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button
              v-permission:create="contextPageId"
              color="violet"
              :disabled="IS_PAST_SALES_DATE"
              @click="onSave"
            >
              {{ $t('MSG_BTN_SAVE') }} <!-- 저장 -->
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAB_00058', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      CODE_KEYS: [
        'COD_RS_PARK_KIND',
        'COD_IA_EL_ZONE_KIND',
        'COD_IA_CB_ZONE_KIND',
        'COD_IA_EL_FACILT_CATE_KIND',
        'COD_IA_CB_FACILT_CATE_KIND',
        'COD_IA_VLINE_WAIT_YN',
        'COD_IA_VLINE_WAIT_CAPA_SLOT_STATUS',
      ],
      codes: {
        COD_RS_PARK_KIND: [],
        COD_IA_EL_ZONE_KIND: [],
        COD_IA_CB_ZONE_KIND: [],
        COD_IA_EL_FACILT_CATE_KIND: [],
        COD_IA_CB_FACILT_CATE_KIND: [],
        COD_IA_VLINE_WAIT_YN: [],
        COD_IA_VLINE_WAIT_CAPA_SLOT_STATUS: [],
      },
      dataSet: new this.$ur.grid.DataSet(),
      opts: {
        height: 450,
        pagination: false,
        noInfo: true,
        noBaseInfo: true,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        resizableColumn: true,
        resizeFullWidth: true,
      },
      params: {},
      SHOW_DRAW_TIME: true,
      columns: [
        { value: 'lastSlotYn', text: '마지막 슬롯 구분', width: 150 },
        {
          value: 'slotSeqNo', text: 'Slot Seq', width: 100, align: 'center',
        },
        {
          value: 'slotStartTime',
          text: '시작',
          width: 70,
          customValue: val => {
            let v = val ?? ''
            if (v.length === 4) {
              v = `${v.substring(0, 2)}:${v.substring(2, 4)}`
            }
            return v || '-'
          },
        },
        {
          value: 'slotEndTime',
          text: '종료',
          width: 70,
          customValue: val => {
            let v = val ?? ''
            if (v.length === 4) {
              v = `${v.substring(0, 2)}:${v.substring(2, 4)}`
            }
            return v || '-'
          },
        },
        {
          value: 'reservStartTime',
          text: '시작',
          width: 70,
          customValue: val => {
            let v = val ?? ''
            if (v.length === 4) {
              v = `${v.substring(0, 2)}:${v.substring(2, 4)}`
            }
            return v || '-'
          },
        },
        {
          value: 'reservEndTime',
          text: '종료',
          width: 70,
          customValue: val => {
            let v = val ?? ''
            if (v.length === 4) {
              v = `${v.substring(0, 2)}:${v.substring(2, 4)}`
            }
            return v || '-'
          },
        },
        {
          value: 'vrTotalCnt',
          text: '예약 인원',
          width: 100,
        },
        {
          value: 'vrCnclCnt',
          text: '취소인원(전체)',
          width: 100,
        },
        {
          value: 'vrCnclConfCnt',
          text: '취소인원(확정)',
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
          width: 100,
        },
        {
          value: 'drawTime',
          text: '추첨결과발표시간',
          width: 130,
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    contextPageId() {
      // return this.$attrs['page-id']
      return this.$options.name
    },
    grid() {
      return this.$refs.grid
    },
    IS_PAST_SALES_DATE() {
      const sToday = utils.now('YYYYMMDD')
      if (this.params.salesDate < sToday) {
        return true
      }
      return false
    },
    IS_FUTURE_SALES_DATE() {
      const sToday = utils.now('YYYYMMDD')
      if (this.params.salesDate > sToday) {
        return true
      }
      return false
    },
    IS_ATTRACTION() {
      if (!utils.isEmpty(this.params.faciltCateKindCds) && this.params.faciltCateKindCds.includes('01')) { // EL, CB 구분 없이 어트랙션 여부 확인
        return true
      }
      return false
    },
    IS_CONCERT() {
      if (this.params.parkKindCd === '01' && !utils.isEmpty(this.params.faciltCateKindCds) && this.params.faciltCateKindCds.includes('02')) {
        return true
      }
      return false
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
    console.log('mounted', this.$attrs['page-id'], this.$options.name, this.contextPageId)
    http.mergeCodeList(this.contextPageId, this.CODE_KEYS, this.codes)
    console.log('CODE', this.codes)

    console.log('utils.getParameter:', utils.getParameter(this, 'params'))
    const query = { ...utils.getParameter(this, 'params') }

    if (utils.isEmpty(query)) {
      utils.messageBox('warning', this.$t('상세정보를 조회 할 수 없습니다.'))
      this.goToList()
      return
    }

    if (utils.isEmpty(query.current)) {
      utils.messageBox('warning', this.$t('상세정보를 조회 할 수 없습니다.'))
      this.goToList()
      return
    }

    if (utils.isEmpty(query.current.faciltId)) {
      utils.messageBox('warning', this.$t('상세정보를 조회 할 수 없습니다.'))
      this.goToList()
      return
    }

    if (utils.isEmpty(query.current.salesDate)) {
      utils.messageBox('warning', this.$t('상세정보를 조회 할 수 없습니다.'))
      this.goToList()
      return
    }

    this.params = {
      faciltId: query.current.faciltId,
      salesDate: query.current.salesDate,
      salesDateFmt: utils.dateformatToClient(query.current.salesDate),
      faciltName: query.current.faciltName,
      faciltCateKindNms: query.current.faciltCateKindNms,
      faciltCateKindCds: query.current.faciltCateKindCds,
      zoneKindNm: query.current.zoneKindNm,
      vlineWaitYnNm: query.current.vlineWaitYnNm,
      vlineWaitYn: query.current.vlineWaitYn,
      parkKindCd: query.current.parkKindCd,
      openTime: query.current.openTime,
      closeTime: query.current.closeTime,
    }

    const THAT = this
    this.columns = [
      // { value: '__dirty', text: '', width: 20 },
      {
        value: 'lastSlotYn',
        text: '마지막 슬롯 구분',
        width: 150,
        align: 'center',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-radio
              style="display: block;"
              sm
              v-model="value"
              value="Y"
              @input="onInput"
            />
            <span v-if="false">{{row.__dirty}}</span>
          </div>`,
          methods: {
            onInput(v) {
              if (v === 'Y') {
                // 마지막 슬롯은 한 개만 선택되어야 하므로 이전의 마지막 슬롯은 선택을 해제한다.
                THAT.dataSet.getRawData().forEach(el => {
                  if (el.lastSlotYn === 'Y') {
                    // eslint-disable-next-line no-underscore-dangle
                    THAT.dataSet.setRowValue(el.__id, 'lastSlotYn', 'N')
                  }
                })
                THAT.dataSet.setRowValue(this.row, 'lastSlotYn', v)
              }
            },
          },
        },
      },
      {
        value: 'slotSeqNo',
        text: 'Slot Seq',
        width: 80,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-text-field
              v-if="row.__dirty=='C'"
              mask="number"
              style="width:100%; height:auto;"
              :value="value"
              :rules="$rules.getRules('not_null','only_numeric')"
              sm
              @input="onInput"
            />
            <span v-else style="width:100%; height:auto; text-align: right; padding-right: 8px">{{value}}</span>
          </div>`,
          methods: {
            onInput(v) {
              if (this.value !== v) THAT.dataSet.setRowValue(this.row, 'slotSeqNo', v)
            },
          },
        },
      },
      {
        value: 'slotStartTime',
        text: '시작',
        required: true,
        width: 110,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-text-field
              mask="time"
              style="width:100%; height:auto;"
              :value="value"
              :rules="$rules.getRules('not_null','min_len(4)','max_int(2400)')"
              :disabled="IS_NOT_EDITABLE()"
              sm
              @input="onInput"
            />
          </div>`,
          methods: {
            onInput(v) {
              if (this.value !== v) THAT.dataSet.setRowValue(this.row, 'slotStartTime', v)
            },
            getNow() {
              return THAT.getHHMMNow()
            },
            IS_NOT_EDITABLE() {
              if (THAT.IS_PAST_SALES_DATE) return true
              if (THAT.IS_FUTURE_SALES_DATE) return false
              return this.row.reservStartTimeOrg < this.getNow()
            },
          },
        },
      },
      {
        value: 'slotEndTime',
        text: '종료',
        required: true,
        width: 110,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-text-field
              mask="time"
              style="width:100%; height:auto;"
              :value="value"
              :rules="$rules.getRules('not_null','min_len(4)','max_int(2400)')"
              :disabled="IS_NOT_EDITABLE()"
              sm
              @input="onInput"
            />
          </div>`,
          methods: {
            onInput(v) {
              if (this.value !== v) {
                THAT.dataSet.setRowValue(this.row, 'slotEndTime', v)
                if (!THAT.SHOW_DRAW_TIME) {
                  // THAT.dataSet.setRowValue(this.row, 'reservEndTime', v)
                }
                // if (!THAT.IS_ATTRACTION && !THAT.IS_CONCERT) {
                //   THAT.dataSet.setRowValue(this.row, 'reservEndTime', v)
                // }
              }
            },
            getNow() {
              return THAT.getHHMMNow()
            },
            IS_NOT_EDITABLE() {
              /*
               * 20230711 기획 변경요청
               * : 일반형, 회차형, 추첨형 '공연' 인 경우, (기존) slot 종료 시간 input 비활성화 → (변경) input 활성화
              if (THAT.IS_CONCERT) {
                return true
              }
              const q = { ...utils.getParameter(this, 'params') }
              if (q.current.parkKindCd === '01'
              && !utils.isEmpty(q.current.faciltCateKindCds)
              && q.current.faciltCateKindCds.includes('02')) {
                return true
              }
              */
              if (THAT.IS_PAST_SALES_DATE) return true
              if (THAT.IS_FUTURE_SALES_DATE) return false
              return this.row.reservEndTimeOrg < this.getNow()
            },
          },
        },
      },
      {
        value: 'reservStartTime',
        text: '시작',
        required: true,
        width: 110,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-text-field
              mask="time"
              style="width:100%; height:auto;"
              :value="value"
              :rules="$rules.getRules('not_null','min_len(4)','max_int(2400)')"
              :disabled="IS_NOT_EDITABLE()"
              sm
              @input="onInput"
            />
          </div>`,
          methods: {
            onInput(v) {
              if (this.value !== v) THAT.dataSet.setRowValue(this.row, 'reservStartTime', v)
            },
            getNow() {
              return THAT.getHHMMNow()
            },
            IS_NOT_EDITABLE() {
              if (THAT.IS_PAST_SALES_DATE) return true
              if (THAT.IS_FUTURE_SALES_DATE) return false
              return this.row.reservStartTimeOrg < this.getNow()
            },
          },
        },
      },
      {
        value: 'reservEndTime',
        text: '종료',
        required: true,
        width: 110,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-text-field
              mask="time"
              style="width:100%; height:auto;"
              :value="value"
              :rules="$rules.getRules('not_null','min_len(4)','max_int(2400)')"
              :disabled="IS_NOT_EDITABLE()"
              sm
              @input="onInput"
            />
          </div>`,
          methods: {
            onInput(v) {
              if (this.value !== v) {
                THAT.dataSet.setRowValue(this.row, 'reservEndTime', v)
                if (!THAT.SHOW_DRAW_TIME) {
                  // THAT.dataSet.setRowValue(this.row, 'slotEndTime', v)
                }
              }
            },
            getNow() {
              return THAT.getHHMMNow()
            },
            IS_NOT_EDITABLE() {
              if (THAT.IS_PAST_SALES_DATE) return true
              if (THAT.IS_FUTURE_SALES_DATE) return false
              return this.row.reservEndTimeOrg < this.getNow()
            },
          },
        },
      },
      {
        value: 'vrTotalCnt',
        text: '예약 인원',
        width: 110,
        customValue: v => v || '-',
      },
      {
        value: 'vrCnclCnt',
        text: '취소인원(전체)',
        width: 110,
        customValue: v => v || '-',
      },
      {
        value: 'vrCnclConfCnt',
        text: '취소인원(확정)',
        width: 110,
        customValue: v => v || '-',
      },
      {
        value: 'vrRsvTotalCapa',
        text: '전체 Capa',
        width: 110,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <span v-if="IS_NOT_EDITABLE()">{{value}}</span>
            <ur-text-field
              v-else-if="IS_SMART_RESERVATION_CAPA_CODE_SLOT()"
              mask="number"
              maxlength="4"
              style="width:100%; height:auto;"
              :value="value"
              :rules="$rules.getRules('only_numeric')"
              sm
              @input="onInput"
            />
            <span v-else>{{value}}</span>
          </div>`,
          methods: {
            onInput(v) {
              if (this.value !== v) THAT.dataSet.setRowValue(this.row, 'vrRsvTotalCapa', v)
            },
            getNow() {
              return THAT.getHHMMNow()
            },
            IS_NOT_EDITABLE() {
              if (THAT.IS_PAST_SALES_DATE) return true
              if (THAT.IS_FUTURE_SALES_DATE) return false
              return this.row.reservEndTimeOrg < this.getNow()
            },
            IS_SMART_RESERVATION_CAPA_CODE_SLOT() {
              return this.row.smartReservationCapaCodeSlotYn === 'Y'
            },
          },
        },
      },
      {
        value: 'onlineRsvCnt',
        text: '사전예약 건수',
        width: 110,
        customValue: v => v || '-',
      },
      {
        value: 'vrRsvTodayCapa',
        text: '당일 Capa',
        required: true,
        width: 110,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <span v-if="IS_NOT_EDITABLE()">{{value}}</span>
            <span v-else-if="IS_SMART_RESERVATION_CAPA_CODE_SLOT()">{{value}}</span>
            <ur-text-field
              v-else
              mask="number"
              maxlength="4"
              style="width:100%; height:auto;"
              :value="value"
              :rules="$rules.getRules('not_null','only_numeric')"
              sm
              @input="onInput"
            />
          </div>`,
          methods: {
            onInput(v) {
              if (this.value !== v) THAT.dataSet.setRowValue(this.row, 'vrRsvTodayCapa', v)
            },
            getNow() {
              return THAT.getHHMMNow()
            },
            IS_NOT_EDITABLE() {
              if (THAT.IS_PAST_SALES_DATE) return true
              if (THAT.IS_FUTURE_SALES_DATE) return false
              return this.row.reservEndTimeOrg < this.getNow()
            },
            IS_SMART_RESERVATION_CAPA_CODE_SLOT() {
              return this.row.smartReservationCapaCodeSlotYn === 'Y'
            },
          },
        },
      },
      {
        value: 'statusCd',
        text: '운영 상태',
        width: 210,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          computed: {
            THAT() {
              return THAT
            },
          },
          template: `<div>
            <span v-if="IS_NOT_EDITABLE()">{{getStatusNm()}}</span>
            <ur-dropdown
              v-else
              :value="value"
              :items="THAT.codes.COD_IA_VLINE_WAIT_CAPA_SLOT_STATUS"
              style="width:100%;"
              sm
              @input="onInput"
            />
          </div>`,
          methods: {
            onInput(v) {
              if (this.value !== v) THAT.dataSet.setRowValue(this.row, 'statusCd', v)
            },
            getStatusNm() {
              const codeId = this.row.statusCd
              const code = THAT.codes.COD_IA_VLINE_WAIT_CAPA_SLOT_STATUS.find(v => v.codeId === codeId)
              const val = code ? code.codeName : ''
              return val || '-'
            },
            getNow() {
              return THAT.getHHMMNow()
            },
            IS_NOT_EDITABLE() {
              if (THAT.IS_PAST_SALES_DATE) return true
              if (THAT.IS_FUTURE_SALES_DATE) return false
              return this.row.reservEndTimeOrg < this.getNow()
            },
          },
        },
      },
      {
        value: 'drawTime',
        text: '추첨결과발표시간',
        width: 130,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-text-field
              style="width:100%; height:auto;"
              mask="time"
              :value="value"
              :rules="$rules.getRules('min_len(4)','max_int(2400)')"
              :disabled="IS_NOT_EDITABLE()"
              sm
              @input="onInput"
            />
          </div>`,
          methods: {
            onInput(v) {
              if (this.value !== v) THAT.dataSet.setRowValue(this.row, 'drawTime', v)
            },
            getNow() {
              return THAT.getHHMMNow()
            },
            IS_NOT_EDITABLE() {
              if (THAT.IS_PAST_SALES_DATE) return true
              if (THAT.IS_FUTURE_SALES_DATE) return false
              return this.row.reservStartTimeOrg < this.getNow()
            },
          },
        },
      },
      // {
      //   value: 'remainCapa',
      //   text: '잔여 Capa',
      //   width: 110,
      //   customValue: (v, r) => { return r.vlineWaitReservRemainCapa },
      // },
      // { value: '__dirty', text: '', width: 20 },
    ]

    this.onSearch()
  },
  methods: {
    getHHMMNow() {
      const now = new Date()
      let hours = now.getHours()
      if (hours < 10) {
        hours = `0${hours}`
      }
      let mins = now.getMinutes()
      if (mins < 10) {
        mins = `0${mins}`
      }
      return `${hours}${mins}`
    },
    getHHMMpastTenFromNow() {
      const now = new Date()
      now.setMinutes(now.getMinutes() + 10)

      let hours = now.getHours()
      if (hours < 10) {
        hours = `0${hours}`
      }
      let mins = now.getMinutes()
      if (mins < 10) {
        mins = `0${mins}`
      }
      return `${hours}${mins}`
    },
    goToList() {
      const params = utils.getParameter(this, 'params')
      console.log('goToList', params)

      const pageId = params.returnPageId ?? 'PGE_AAB_00007'

      const changed = this.dataSet.getChanged()
      if (changed !== null && changed.created.length === 0 && changed.updated.length === 0 && changed.removed.length === 0) {
        utils.goPage(pageId, { params })
      } else {
        utils.messageBox('confirm', this.$t('저장하지 않은 데이터가 존재합니다.\n이동하시겠습니까?'), null, () => { // 저장하지 않은 데이터가 존재합니다.\n이동하시겠습니까?
          utils.goPage(pageId, { params })
        })
      }
    },
    onSearch() {
      console.log('onSearch')
      const query = Object.assign({}, {
        faciltId: this.params.faciltId,
        salesDate: this.params.salesDate,
      }, this.paging)

      console.log('REQ', query)
      const serviceName = 'DTS_AAB_00033'
      http.request(this.contextPageId, serviceName, {
        query,
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        this.dataSet.setData(res.data)
        let rawData = this.dataSet.getRawData()
        if (rawData && rawData.length > 0) {
          this.params = {
            faciltId: rawData[0].faciltId,
            salesDate: rawData[0].salesDate,
            salesDateFmt: utils.dateformatToClient(rawData[0].salesDate),
            faciltName: rawData[0].faciltName,
            faciltCateKindNms: rawData[0].faciltCateKindNms,
            faciltCateKindCds: rawData[0].faciltCateKindCds,
            zoneKindNm: rawData[0].zoneKindNm,
            vlineWaitYnNm: rawData[0].vlineWaitYnNm,
            vlineWaitYn: rawData[0].vlineWaitYn,
            parkKindCd: rawData[0].parkKindCd,
            openTime: rawData[0].openTime,
            closeTime: rawData[0].closeTime,
          }
        }
        if (this.params.vlineWaitYn !== 'D') {
          console.log('HIDE')
          this.grid.setHeaderAttr('drawTime', 'hide', true)
          this.SHOW_DRAW_TIME = false
        } else {
          console.log('SHOW')
          this.grid.setHeaderAttr('drawTime', 'hide', false)
          this.SHOW_DRAW_TIME = true
        }

        rawData = []
        if (this.dataSet.getRawData()) {
          this.dataSet.getRawData().forEach(element => {
            rawData.push({
              seqNo: element.__idx + 1, // eslint-disable-line no-underscore-dangle
              __dirty: element.__dirty, // eslint-disable-line no-underscore-dangle
              __id: element.__id, // eslint-disable-line no-underscore-dangle

              salesDate: element.salesDate, // 영업일
              faciltId: element.faciltId, // 시설ID
              slotSeqNo: element.slotSeqNo,
              slotStartTime: element.slotStartTime,
              slotEndTime: element.slotEndTime,
              reservStartTime: element.reservStartTime,
              reservEndTime: element.reservEndTime,
              vrRsvTodayCapa: element.vrRsvTodayCapa,
              statusCd: element.statusCd,
              drawTime: element.drawTime,
            })
          })
        }
        this.dataSetRawData = rawData
      }).catch(error => {
        console.log('ERR', error)
      })
    },
    onDelete() {
      console.log('onDelete')
      const s = this.grid.getSelected()

      const sToday = utils.now('YYYYMMDD')
      if (this.params.salesDate < sToday) {
        utils.messageBox('warning', this.$t('과거일자는 수정할 수 없습니다.'))
        return
      }

      if (utils.isEmpty(s)) {
        utils.messageBox('warning', this.$t('선택 된 항목이 없습니다.'))
        return
      }

      // 마지막 슬롯으로 지정된 슬롯 삭제 금지! 전체삭제인 경우에는 마지막 슬롯까지 모두 삭제 허용!
      if (this.dataSet.selLen !== this.dataSet.totalSize) {
        const found = s.find(row => {
          if (row.lastSlotYn === 'Y') return true
          return false
        })
        if (!utils.isEmpty(found)) {
          utils.messageBox('warning', this.$t('마지막 슬롯은 삭제할 수 없습니다. 슬롯 마지막 슬롯 변경 후 삭제 해주시기 바랍니다.'))
          return
        }
      }

      // 이미 종료된 슬롯을 삭제하려는 경우 주의 메시지를 추가해서 표시한다.
      const sHHMMNow = this.getHHMMNow()
      const endedSlot = s.filter(row => {
        if (this.IS_FUTURE_SALES_DATE) return false
        if (row.slotEndTime < sHHMMNow) return true
        return false
      })

      let msg = this.$t('삭제하시겠습니까? 저장해야 반영 됩니다.')
      if (!utils.isEmpty(endedSlot)) {
        msg = this.$t('[주의] 이미 종료된 슬롯이 포함되어 있습니다. \n삭제하시겠습니까? 저장해야 반영 됩니다.')
      }

      utils.messageBox('confirm', msg, null, () => { // 삭제하시겠습니까?
        if (s) {
          // eslint-disable-next-line no-underscore-dangle
          if (s.length === 1) this.grid.removeRow(s[0].__id, false) // 2nd arg : select next row
          else {
            this.grid.removeRow(s)
          }
        } else {
          utils.messageBox('warning', this.$t('선택 된 항목이 없습니다.'))
        }
      })
    },
    onAdd() {
      console.log('onAdd')

      const sToday = utils.now('YYYYMMDD')
      if (this.params.salesDate < sToday) {
        utils.messageBox('warning', this.$t('과거일자는 수정할 수 없습니다.'))
        return
      }

      let nextSlotSeqNo = 1
      const viewData = this.dataSet.getViewData()
      if (!utils.isEmpty(viewData) && viewData.length > 0) {
        const last = viewData[viewData.length - 1]
        nextSlotSeqNo = 1 * last.slotSeqNo + 1
      }

      const data = {
        faciltId: this.params.faciltId,
        slotSeqNo: nextSlotSeqNo,
      }

      console.log('REQ', data)
      const serviceName = 'DTS_AAB_00054'
      http.request(this.contextPageId, serviceName, {
        query: {},
        path: {},
        data,
      }).then(res => {
        console.log('RES', res.data)
        this.addNewRow(res.data.smartReservationCapaCodeSlotYn, nextSlotSeqNo)
      }).catch(error => {
        console.log(error)
      })
    },
    addNewRow(smartReservationCapaCodeSlotYn, nextSlotSeqNo) {
      if (!this.IS_CONCERT && (utils.isEmpty(this.params.openTime) || utils.isEmpty(this.params.closeTime))) {
        utils.messageBox('warning', this.$t('당일자 시설 [오픈/종료 시간]을 먼저 등록 하세요.'))
        return
      }

      this.add({
        salesDate: this.params.salesDate, // 영업일자
        faciltId: this.params.faciltId, // 시설ID
        lastSlotYn: 'N',
        slotSeqNo: nextSlotSeqNo,
        slotStartTime: '',
        slotEndTime: '',
        reservStartTime: '',
        reservEndTime: '',
        vrRsvTodayCapa: smartReservationCapaCodeSlotYn === 'Y' ? '0' : '',
        statusCd: '03', // 운영상태 , '03':정상
        drawTime: '',
        smartReservationCapaCodeSlotYn,
      })

      this.$nextTick(() => {
        const viewData = this.dataSet.getViewData()
        const maxRownum = viewData.length + 1
        this.grid.setScrollRow(maxRownum)
      })
    },
    add(row) {
      // const pos = this.dataSet.ADD_ROW_TOP
      // const pos = this.dataSet.ADD_ROW_BOTTOM
      this.dataSet.addRow(row /* , pos */)
    },
    onSave() {
      console.log('onSave')

      const changed = this.dataSet.getChanged()
      const rawData = this.dataSetRawData

      const sToday = utils.now('YYYYMMDD')
      if (this.params.salesDate < sToday) {
        utils.messageBox('warning', this.$t('과거일자는 수정할 수 없습니다.'))
        return
      }

      if (!this.IS_CONCERT && (utils.isEmpty(this.params.openTime) || utils.isEmpty(this.params.closeTime))) {
        utils.messageBox('warning', this.$t('당일자 시설 [오픈/종료 시간]을 먼저 등록 하세요.'))
        return
      }

      // changed.removed 중에서 오리지널 리스트에 존재하던 것만 추려낸다.
      const removed = []
      changed.removed.forEach(removedElement => {
        // eslint-disable-next-line no-underscore-dangle
        const foundFromRaw = rawData.find(el => el.__id === removedElement.__id)
        if (!utils.isEmpty(foundFromRaw)) {
          removed.push(foundFromRaw)
        }
      })

      // changed.created 중에서 changed.removed 에 존재하는 것은 제외한다.
      const created = []
      changed.created.forEach(createdElement => {
        // eslint-disable-next-line no-underscore-dangle
        const found = changed.removed.find(el => el.__id === createdElement.__id)
        if (utils.isEmpty(found)) {
          created.push(createdElement)
        }
      })

      // changed.updated 중에서 changed.removed 에 존재하는 것은 제외한다.
      const updated = []
      changed.updated.forEach(updatedElement => {
        // eslint-disable-next-line no-underscore-dangle
        const found = changed.removed.find(el => el.__id === updatedElement.__id)
        if (utils.isEmpty(found)) {
          updated.push(updatedElement)
        }
      })

      console.log('REMOVED', removed)
      console.log('CREATED', created)
      console.log('UPDATED', updated)
      if (this.validated(removed, created, updated)) {
        let msg = this.$t('저장하시겠습니까?')
        // 최종 슬롯이 마지막 슬롯으로 선택되지 않은 경우 메시지를 변경하여 주의를 표시해준다.
        if (this.dataSet.dataSize > 0 && this.dataSet.data[this.dataSet.dataSize - 1].lastSlotYn === 'N') {
          msg = this.$t('[주의] 최종 슬롯이 마지막 슬롯으로 선택되지 않았습니다. \n저장하시겠습니까?')
        }
        utils.messageBox('confirm', msg, null, () => { // 저장하시겠습니까?
          const data = {
            faciltId: this.params.faciltId,
            salesDate: this.params.salesDate,
            created: [...created],
            updated: [...updated],
            removed: [...removed],
          }
          console.log('REQ DATA:', data)
          const serviceName = 'DTS_AAB_00034'
          http.request(this.contextPageId, serviceName, {
            query: {},
            path: {},
            data,
          }).then(res => {
            console.log('RES', res.data)
            if (res.data.resultCode === '-1') { // -1 이면 서버 메시지를 그대로 표시한다.
              utils.messageBox('warning', res.data.msg)
            } else if (res.data.resultCode === '0') {
              utils.messageBox('warning', this.$t('시설 Capa 정보를 변경하는데 실패하였습니다.'))
            } else {
              utils.messageBox('warning', this.$t('시설 Capa 정보가 변경 되었습니다.'))
              this.onSearch()
            }
          }).catch(error => {
            console.log(error)
          })
        })
      }
    },
    checkSlotAndReservTime01(CR) {
      // [우선처리1] 다른 validation의 전제가 되는 부분으로 먼저 확인되어야 함.. 순서변경 금지..
      // 신규 및 수정항목 입력값 중 시간값 에서 분값이 60을 초과하는지 확인
      let found = this.findInvalidMinuteRow(CR)
      if (!utils.isEmpty(found)) {
        utils.messageBox('warning', this.$t(`[Slot Seq : ${found.slotSeqNo}] 입력된 시간 값 중 올바르지 않은 값이 있습니다. (60분 단위 초과)`))
        return false
      }
      // 'slot'의 StartTime, EndTime 및 '예약'의 StartTime, EndTime 이 04:00 ~ 23:00 사이의 시간인지 확인
      found = this.findInvalidTimeRangeRow(CR)
      if (!utils.isEmpty(found)) {
        // utils.messageBox('warning', this.$t(`[Slot Seq : ${found.slotSeqNo}] Slot 및 예약 시간을 정확히 입력하세요.\n(입력값은 04:00 ~ 23:00 까지입니다.)`))
        // return false
      }

      // [우선처리2] 다른 validation의 전제가 되는 부분으로 먼저 확인되어야 함.. 순서변경 금지..
      // 신규 및 수정항목 입력값 'slot'의 StartTime, EndTime 선후여부 비교확인
      found = CR.find(v => {
        if (v.slotEndTime < v.slotStartTime) return true
        return false
      })
      if (!utils.isEmpty(found)) {
        utils.messageBox('warning', this.$t(`[Slot Seq : ${found.slotSeqNo}] SLOT 종료시간이 시작시간 보다 빠릅니다.`))
        return false
      }
      // 신규 및 수정항목 입력값 '예약'의 StartTime, EndTime 선후여부 비교확인
      found = CR.find(v => {
        if (v.reservEndTime < v.reservStartTime) return true
        return false
      })
      if (!utils.isEmpty(found)) {
        utils.messageBox('warning', this.$t(`[Slot Seq : ${found.slotSeqNo}] 예약 종료시간이 시작시간 보다 빠릅니다.`))
        return false
      }

      if (!this.IS_PAST_SALES_DATE && !this.IS_FUTURE_SALES_DATE) {
        // 신규 및 수정항목 입력값 slot의 StartTime, EndTime 미래 시간인지 확인
        found = CR.find(v => {
          if ((v.slotStartTime !== v.slotStartTimeOrg && v.slotStartTime < this.getHHMMNow()) || (v.reservStartTime !== v.reservStartTimeOrg && v.reservStartTime < this.getHHMMNow())) return true
          return false
        })
        if (!utils.isEmpty(found)) {
          utils.messageBox('warning', this.$t(`[Slot Seq : ${found.slotSeqNo}] SLOT 및 예약 시작시간은 과거시간으로 입력할 수 없습니다.`))
          return false
        }
        // slot의 StartTime이 현재시간+10분 보다 이후 시간으로 입력되었는지 확인 (현재시간 기준 십분이내에 슬롯이 시작되는 세팅 변경을 막는다.)
        found = CR.find(v => {
          if ((v.slotStartTime !== v.slotStartTimeOrg && v.slotStartTime < this.getHHMMpastTenFromNow()) || (v.reservStartTime !== v.reservStartTimeOrg && v.reservStartTime < this.getHHMMpastTenFromNow())) return true
          return false
        })
        if (!utils.isEmpty(found)) {
          utils.messageBox('warning', this.$t(`[Slot Seq : ${found.slotSeqNo}] SLOT 및 예약 시작시간은 현재시간 기준 10분 이후의 시간만 입력할 수 있습니다.`))
          return false
        }
        // slot 및 예약의 EndTime이 미래시간인지 여부와 현재시간 기준 10분 이후의 시간인지 여부는 StartTime에서 통과했으므로 자동 확인됨.

        // 예약종료시간이 슬롯종료시간 이내 인지 확인
        found = CR.find(v => {
          if (v.reservEndTime > v.slotEndTime) return true
          return false
        })
        if (!utils.isEmpty(found)) {
          utils.messageBox('warning', this.$t(`[Slot Seq : ${found.slotSeqNo}] 슬롯 종료시간이 예약 종료시간 보다 빠릅니다.`))
          return false
        }
      }

      return true
    },
    checkSlotAndReservTime02(CR) {
      /* slot 시작시간 validation */
      // slot의 StartTime이 시설운영 시간 이내인지 확인
      let found = CR.find(v => {
        if (this.IS_CONCERT && utils.isEmpty(v.openTime)) return false
        if (v.slotStartTime < v.openTime) return true
        return false
      })
      if (!utils.isEmpty(found)) {
        if (utils.isEmpty(found.openTime)) {
          utils.messageBox('warning', this.$t('일별시설운영 관리에서 당일자 시설 [오픈시간]을 먼저 등록 하세요.'))
        } else {
          utils.messageBox('warning', this.$t(`[Slot Seq : ${found.slotSeqNo}] Slot 시작시간이 시설 오픈시간(${found.openTimeDisp}) 보다 빠릅니다.`))
        }
        return false
      }
      // slot의 StartTime이 시설운영 시간 이내인지 확인
      found = CR.find(v => {
        if (this.IS_CONCERT && utils.isEmpty(v.closeTime)) return false
        if (v.slotStartTime > v.closeTime) return true
        return false
      })
      if (!utils.isEmpty(found)) {
        if (utils.isEmpty(found.closeTime)) {
          utils.messageBox('warning', this.$t('일별시설운영 관리에서 당일자 시설 [종료시간]을 먼저 등록 하세요.'))
        } else {
          utils.messageBox('warning', this.$t(`[Slot Seq : ${found.slotSeqNo}] Slot 시작시간이 시설 종료시간(${found.closeTimeDisp}) 보다 늦습니다.`))
        }
        return false
      }
      // slot의 StartTime을 전체 slot 과 비교하여 확인!
      if (this.dataSet.totalSize !== 0) {
        const viewData = this.dataSet.getViewData()
        // slot의 StartTime이 중복되었는지 확인
        found = CR.find(v => {
          if (v.slotStartTime !== v.slotStartTimeOrg) {
            if (viewData.filter(row => row.slotStartTime === v.slotStartTime).length > 1) return true
          }
          return false
        })
        if (!utils.isEmpty(found)) {
          utils.messageBox('warning', this.$t(`[Slot Seq : ${found.slotSeqNo}] Slot 시작시간이 중복된 값이 있습니다.`))
          return false
        }
        // slot의 StartTime이 다른 slot 과 겹치도록 입력되었는지 확인
        found = CR.find(v => {
          if (v.slotStartTime !== v.slotStartTimeOrg) {
            if (viewData.filter(row => (row.slotStartTime <= v.slotStartTime && v.slotStartTime < row.slotEndTime)).length > 1) return true
          }
          return false
        })
        if (!utils.isEmpty(found)) {
          utils.messageBox('warning', this.$t(`[Slot Seq : ${found.slotSeqNo}] 겹치는 시간이 존재합니다.\nSlot 시작시간을 확인하세요.`))
          return false
        }
      }

      /* slot 종료시간 validation */
      // slot의 EndTime이 시설운영 시간 이내인지 확인
      found = CR.find(v => {
        if (this.IS_CONCERT && utils.isEmpty(v.closeTime)) return false
        if (v.slotEndTime > v.closeTime) return true
        return false
      })
      if (!utils.isEmpty(found)) {
        if (utils.isEmpty(found.closeTime)) {
          utils.messageBox('warning', this.$t('일별시설운영 관리에서 당일자 시설 [종료시간]을 먼저 등록 하세요.'))
        } else {
          utils.messageBox('warning', this.$t(`[Slot Seq : ${found.slotSeqNo}] Slot 종료시간은 시설 종료시간(${found.closeTimeDisp}) 보다 늦은 시간으로 입력할 수 없습니다.`))
        }
        return false
      }
      // slot의 EndTime은 시설 오픈시간 이전인지 체크할 필요 없음.
      // StartTime이 이미 오픈시간을 통과했으므로 그보다 이후 시간인 EndTime은 당연히 통과.

      // slot의 EndTime의 중복값 확인은 필요 없음.
      // StartTime의 겹치는 시간대 통과로 대신 확인 됨.

      return true
    },
    checkSlotAndReservTime03(CR) {
      if (this.params.vlineWaitYn === 'D') {
        /* 추첨형의 경우 : 예약 종료시간 (12:00) <  추첨결과 발표시간 (13:00) < SLOT 종료시간 (14:00) */

        // 신규 및 수정항목 입력값 중 추첨결과 발표시간이 미입력 확인
        let found = CR.find(v => {
          if (utils.isEmpty(v.drawTime)) return true
          return false
        })
        if (!utils.isEmpty(found)) {
          utils.messageBox('warning', this.$t(`[Slot Seq : ${found.slotSeqNo}] 추첨결과 발표 시간이 입력되지 않았습니다.`))
          return false
        }

        // 신규 및 수정항목 입력값 중 추첨결과 발표시간이 예약 종료시간 보다 이후인지 확인
        found = CR.find(v => {
          if (v.drawTime < v.reservEndTime) return true
          return false
        })
        if (!utils.isEmpty(found)) {
          utils.messageBox('warning', this.$t(`[Slot Seq : ${found.slotSeqNo}] 추첨결과 발표 시간은 예약 종료 시간 이후로 설정해야 합니다.`))
          return false
        }

        // 신규 및 수정항목 입력값 중 추첨결과 발표시간이 SLOT 종료시간 보다 이전인지 확인
        found = CR.find(v => {
          if (v.slotEndTime < v.drawTime) return true
          return false
        })
        if (!utils.isEmpty(found)) {
          utils.messageBox('warning', this.$t(`[Slot Seq : ${found.slotSeqNo}] 추첨결과 발표 시간은 SLOT 종료 시간 이전으로 설정해야 합니다.`))
          // this.$refs.grid.setRowValue(found.__id, 'drawTime', '')
          // eslint-disable-next-line no-underscore-dangle
          this.dataSet.setRowValue(found.__id, 'drawTime', '')
          return false
        }
      }

      // 마지막 슬롯을 지정하지 않았는지 확인
      if (this.dataSet.totalSize !== 0) {
        const viewData = this.dataSet.getViewData()
        const found = viewData.find(row => {
          if (row.lastSlotYn === 'Y') return true
          return false
        })
        if (utils.isEmpty(found)) {
          utils.messageBox('warning', this.$t('마지막 슬롯 구분이 지정되지 않았습니다.'))
          return false
        }
      }

      return true
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

      // 신규 추가 슬롯 중 이미 사용중인 슬롯번호가 있는지 확인
      const slotNoDupFound = created.find(c => {
        const viewData = this.dataSet.getViewData()
        const slot = viewData.filter(v => v.slotSeqNo === c.slotSeqNo)
        if (slot.length > 1) return true
        return false
      })
      if (!utils.isEmpty(slotNoDupFound)) {
        utils.messageBox('warning', this.$t(`신규 추가 항목 중 이미 사용중인 슬롯번호 [Slot Seq : ${slotNoDupFound.slotSeqNo}]를 사용하는 슬롯이 있습니다. 슬롯 번호는 중복으로 등록할 수 없습니다.`))
        return false
      }

      const CR = [...created, ...updated]

      if (!this.checkSlotAndReservTime01(CR)) {
        return false
      }

      if (!this.checkSlotAndReservTime02(CR)) {
        return false
      }

      if (!this.checkSlotAndReservTime03(CR)) {
        return false
      }

      return true
    },
    onReset() {
      console.log('onReset')
      const changed = this.dataSet.getChanged()
      if (changed !== null && changed.created.length === 0 && changed.updated.length === 0 && changed.removed.length === 0) {
        this.onSearch()
      } else {
        utils.messageBox('confirm', this.$t('초기화 하면 변경 사항이 모두 사라집니다. 계속하시겠습니까?'), null, () => { // 초기화 하면 변경 사항이 모두 사라집니다. 계속하시겠습니까?
          this.onSearch()
        })
      }
    },
    onClear() {
      console.log('onClear')

      const sToday = utils.now('YYYYMMDD')
      if (this.params.salesDate < sToday) {
        utils.messageBox('warning', this.$t('과거일자는 수정할 수 없습니다.'))
        return
      }

      const v = this.dataSet.getViewData()
      if (utils.isEmpty(v)) {
        utils.messageBox('warning', this.$t('초기화 대상 데이터가 없습니다.'))
        return
      }

      if (v) {
        v.forEach(row => {
          const resetData = {
            lastSlotYn: 'N',
            slotSeqNo: '',
            vrRsvTodayCapa: '',
            drawTime: '',
          }
          if (this.getHHMMNow() > row.reservStartTimeOrg) {
            this.grid.updateLayout()
          } else {
            resetData.slotStartTime = ''
            resetData.reservStartTime = ''
          }
          if (this.getHHMMNow() > row.reservEndTimeOrg) {
            this.grid.updateLayout()
          } else {
            resetData.slotEndTime = ''
            resetData.reservEndTime = ''
            resetData.statusCd = '03' // 운영상태 , '03':정상
          }
          // eslint-disable-next-line no-underscore-dangle
          this.grid.setRow(row.__id, resetData)
        })
      } else {
        utils.messageBox('warning', this.$t('선택 된 항목이 없습니다.'))
      }
    },
    onForceSoldOut() {
      const sToday = utils.now('YYYYMMDD')
      if (this.params.salesDate < sToday) {
        utils.messageBox('warning', this.$t('과거일자는 수정할 수 없습니다.'))
        return
      }

      const changed = this.dataSet.getChanged()

      if (changed !== null && changed.created.length > 0) {
        const found = changed.created.find(r => r.__selected)
        if (!utils.isEmpty(found)) {
          utils.messageBox('warning', this.$t('신규 등록 슬롯은 강제매진 처리를 할 수 없습니다.'))
          return
        }
      }

      let msg
      if (changed !== null && changed.created.length === 0 && changed.updated.length === 0 && changed.removed.length === 0) {
        msg = this.$t('강제매진 처리를 진행하시겠습니까?')
      } else {
        msg = this.$t('저장하지 않은 데이터가 존재합니다. 저장하지 않은 데이터는 \n모두 잃게 됩니다. 강제매진 처리를 진행하시겠습니까?')
      }

      const s = this.grid.getSelected()
      if (utils.isEmpty(s)) {
        utils.messageBox('warning', this.$t('선택 된 항목이 없습니다.'))
        return
      }

      utils.messageBox('confirm', msg, null, () => {
        const data = {
          faciltId: this.params.faciltId,
          salesDate: this.params.salesDate,
          created: [],
          updated: [...s],
          removed: [],
        }
        console.log('REQ DATA:', data)
        const serviceName = 'DTS_AAB_00052'
        http.request(this.contextPageId, serviceName, {
          query: {},
          path: {},
          data,
        }).then(res => {
          console.log('RES', res.data)
          if (res.data.resultCode === '-1') { // -1 이면 서버 메시지를 그대로 표시한다.
            utils.messageBox('warning', res.data.msg)
          } else if (res.data.resultCode === '0') { // 실패
            utils.messageBox('warning', res.data.msg)
          } else { // 성공
            utils.messageBox('warning', res.data.msg)
            this.onSearch()
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    findInvalidMinuteRow(targetRows) {
      const isValidMinuteInput = targetRows.find(v => {
        if (v.slotStartTime.substr(2, 1) >= '6') return true
        if (v.slotEndTime.substr(2, 1) >= '6') return true
        if (v.reservStartTime.substr(2, 1) >= '6') return true
        if (v.reservEndTime.substr(2, 1) >= '6') return true
        if (this.params.vlineWaitYn === 'D' && v.drawTime.substr(2, 1) >= '6') return true

        return false
      })
      return isValidMinuteInput
    },
    findInvalidTimeRangeRow(targetRows) {
      const invalidTimeRangeRow = targetRows.find(v => {
        if (v.slotStartTime < '0400' || v.slotStartTime > '2300') return true
        if (v.slotEndTime < '0400' || v.slotEndTime > '2300') return true
        if (v.reservStartTime < '0400' || v.reservStartTime > '2300') return true
        if (v.reservEndTime < '0400' || v.reservEndTime > '2300') return true
        return false
      })
      return invalidTimeRangeRow
    },
  },
}
</script>
<style scoped>
</style>
