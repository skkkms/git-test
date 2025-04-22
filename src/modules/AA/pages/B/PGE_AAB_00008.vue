<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 시설 정보 탭 메뉴-->
      <div class="comm_title_wrap">
        <h4>
          일별 가상대기 capa 관리
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="영업일자"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
        >
          {{params.salesDateFmt}}
        </ur-form-item>
        <ur-form-item
          label="시설명"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          {{params.faciltName}}
        </ur-form-item>
        <ur-form-item
          label="시설 카테고리"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          {{params.faciltCateKindNms}}
        </ur-form-item>
        <ur-form-item
          label="Zone 구분"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          {{params.zoneKindNm}}
        </ur-form-item>
        <ur-form-item
          label="가상대기 여부"
          :label-align="'right'"
          style="width:100%; height:auto;"
        >
          {{params.vlineWaitYnNm}}
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 시설 정보 탭 메뉴-->

      <!-- S :: 시설 Capa 정보 테이블-->
      <div class="comm_title_wrap mt20">
        <h4>
          {{ $t('시설 Capa 정보') }}
        </h4>
      </div>
      <template>
        <ur-data-grid
          ref="grid"
          :headers="columns"
          :data-source="dataSet"
          :options="opts"
          class="custom_grid_pgeNav_None"
        >
          <template #header>
            <ur-data-grid-header-row>
              <ur-data-grid-header-cell rowspan="2" align="center" /><!-- slot seq -->
              <ur-data-grid-header-cell colspan="2" text="Slot 정보" align="center" />
              <ur-data-grid-header-cell colspan="2" text="예약 정보" align="center" />
              <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 예약인원 -->
              <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 취소인원(전체) -->
              <ur-data-grid-header-cell rowspan="2" align="center" /><!-- 취소인원(확정) -->
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
          <!--
          <template #header>
            <ur-data-grid-header-row>
              <ur-data-grid-header-cell
                rowspan="2"
                align="center"
              />
              <ur-data-grid-header-cell
                colspan="2"
                text="Slot 정보"
                align="center"
              />
              <ur-data-grid-header-cell
                colspan="2"
                text="예약 정보"
                align="center"
              />
              <ur-data-grid-header-cell
                rowspan="2"
                align="center"
              />
              <ur-data-grid-header-cell
                rowspan="2"
                align="center"
              />
              <ur-data-grid-header-cell
                rowspan="2"
                align="center"
              />
              <ur-data-grid-header-cell
                rowspan="2"
                align="center"
              />
              <ur-data-grid-header-cell
                rowspan="2"
                align="center"
              />
              <ur-data-grid-header-cell
                rowspan="2"
                align="center"
              />
              <ur-data-grid-header-cell
                rowspan="2"
                align="center"
              />
              <ur-data-grid-header-cell
                rowspan="2"
                align="center"
              />
              <ur-data-grid-header-cell
                rowspan="2"
                align="center"
              />
              <ur-data-grid-header-cell
                rowspan="2"
                align="center"
              />
              <ur-data-grid-header-cell
                rowspan="2"
                align="center"
              />
              <ur-data-grid-header-cell
                rowspan="2"
                align="center"
              />
              <ur-data-grid-header-cell
                rowspan="2"
                align="center"
              />
            </ur-data-grid-header-row>
            <ur-data-grid-header-row>
              <ur-data-grid-header-cell
                :expand-resizer="2"
                align="center"
              />
              <ur-data-grid-header-cell
                :expand-resizer="2"
                align="center"
              />
              <ur-data-grid-header-cell
                :expand-resizer="2"
                align="center"
              />
              <ur-data-grid-header-cell
                :expand-resizer="2"
                align="center"
              />
            </ur-data-grid-header-row>
          </template>
          -->
        </ur-data-grid>
      </template>
      <!-- E :: 시설 Capa 정보 테이블-->
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button @click="goToList">
              {{ $t('MSG_BTN_LIST') }}
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button
              color="violet"
              @click="onChangeCapa"
            >
              {{ $t('MSG_BTN_MDFC') }}
            </ur-button>
            <ur-button v-if="false" @click="onTest">TEST</ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAB_00008', // eslint-disable-line vue/name-property-casing
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
        multiSelect: false,
        selectCheck: false,
        styleBordered: false,
        resizableColumn: true,
      },
      params: {},
      SHOW_DRAW_TIME: true,
      columns: [
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
    // 계산된 속성, date pickproperty로 사용가능\
    contextPageId() {
      //return this.$attrs['page-id']
      return this.$options.name
    },
    grid() {
      return this.$refs.grid
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
    http.mergeCodeList(this.contextPageId, this.CODE_KEYS, this.codes)
    console.log('CODE', this.codes)

    console.log(this.contextPageId, 'mounted, utils.getParameter:', utils.getParameter(this, 'params'))
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
    }

    this.onSearch()
  },
  methods: {
    goToList() {
      const params = utils.getParameter(this, 'params')
      console.log('goToList', params)
      utils.goPage('PGE_AAB_00007', { params })
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
        const rawData = this.dataSet.getRawData()
        if (rawData && rawData.length > 0) {
          this.params = {
            salesDateFmt: utils.dateformatToClient(rawData[0].salesDate),
            faciltName: rawData[0].faciltName,
            faciltCateKindNms: rawData[0].faciltCateKindNms,
            zoneKindNm: rawData[0].zoneKindNm,
            vlineWaitYnNm: rawData[0].vlineWaitYnNm,
            vlineWaitYn: rawData[0].vlineWaitYn,
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
      }).catch(error => {
        console.log('ERR', error)
      })
    },
    onChangeCapa() {
      const params = utils.getParameter(this, 'params')
      console.log('onChangeCapa', params)
      utils.goPage('PGE_AAB_00058', { params })
    },
    onTest() {
      console.log('onTest')
    },
  },
}
</script>
<style scoped>
</style>
