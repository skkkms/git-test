<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div>
        <template slot="title">
          <div class="modal-title mb45">
            대기 시간 이력 조회
          </div>
        </template>
        <template>
          <div class="modal-body">
            <ur-form-box toggleable>
              <ur-form-item
                label="영업일자"
                :label-align="'right'"
                style="width: 100%; height: auto;"
              >
                {{ getSalesDate() }}
              </ur-form-item>
              <ur-form-item
                label="시설명"
                :label-align="'right'"
                style="width: 100%; height: auto;"
              >
                {{ pageInitialData.faciltName }}
              </ur-form-item>
            </ur-form-box>
            <!-- 그리드 -->
            <ur-tree-grid
              ref="grid"
              :headers="columns"
              :options="opts"
              :data-source="list"
              class="mt45"
            >
              <template #summary="{data}">
                <div class="my-summary">
                  <div class="my-summary__value">
                    <div><label>일 평균 대기시간 (분)</label> : {{ getAvg(data) }}</div>
                  </div>
                </div>
              </template>
            </ur-tree-grid>
            <div class="comm_btn_wrap bt1">
              <div class="right_box mt10">
                <ur-button @click="onClose">
                  닫기
                </ur-button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </sui-page-contents>
  </sui-page>
</template>

<script>
export default {
  name: 'PGE_AAB_00054', // eslint-disable-line vue/name-property-casing
  components: {
  },
  props: {
    pageInitialData: {
      type: Object,
      default() {
        return {}
      },
    },
    closePagePopup: {
      type: Function,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      CODE_KEYS: [
        'COD_RS_PARK_KIND',
        'COD_IA_FACILT_OPER_STATUS',
      ],
      codes: {
        COD_RS_PARK_KIND: [],
        COD_IA_FACILT_OPER_STATUS: [],
      },
      // 일자별 Q-PASS Tier 관리 시설 명 드랍다운 데이터
      FACILT_LIST: [],
      params: {
        faciltId: '',
      },
      dataSet: new this.$ur.grid.DataSet(),
      dataSetRawData: [],
      dataSetChangedData: [],
      // 일자별 Q-PASS Tier 관리 테이블
      columns: [],
      list: [],
      // 테이블
      opts: { // 토탈o
        resizableColumn: false,
        infinityScroll: true,
        height: 300,
        // msgTotal: false,
        /*
        noInfo: false,
        noBaseInfo: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        styleBordered: false,
        resizableColumn: true,
        headerHeight: 36,
        resizeFullWidth: false,
        noInfo: false,
        height: 570,
        pagination: true,
        defaultPageSize: 10,
        */
      },
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
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
    http.mergeCodeList(this.contextPageId, this.CODE_KEYS, this.codes)
    console.log('CODES:', this.codes)

    const THAT = this
    this.columns = [
      {
        value: 'waitTime', text: '대기시간(분)', width: 120,
      },
      {
        value: 'operStatusNm',
        text: '운영상태',
        width: 475,
        align: 'center',
        customValue: (value, row) => {
          const codeId = row.operStatusCd
          const code = THAT.codes.COD_IA_FACILT_OPER_STATUS.find(v => v.codeId === codeId)
          return code && code.codeName ? code.codeName : '-'
        },
      },
      {
        value: 'fstRgstDtm',
        text: '등록일시',
        width: 200,
        customValue: v => {
          v = utils.dateformatToClient(v)
          return v ? v : '-'
        },
      },
      {
        value: 'fstRgstUsrId', text: '등록자',
      },
    ]

    this.getWaitTimeHistory()
  },
  methods: {
    getSalesDate() {
      return utils.dateformatToClient(this.pageInitialData.salesDate)
    },
    getWaitTimeHistory() {
      console.log('getWaitTimeHistory')

      console.log('REQ DATA:', {})
      const serviceName = 'DTS_AAB_00021'
      http.request(this.contextPageId, serviceName, {
        query: {
          faciltId: this.pageInitialData.faciltId,
          salesDate: this.pageInitialData.salesDate,
        },
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        if (res.data && res.data.length > 0) {
          this.list = res.data
        } else {
          utils.messageBox('warning', this.$t('대기 시간 이력이 없습니다.'))
        }
      }).catch(error => {
        console.log(error)
      })
      console.log('REQ END')
    },
    getAvg(arr) {
      console.log('getAvg', arr)
      let sum = 0
      for (let i = 0; i < arr.length; i += 1) {
        const str = arr[i].waitTime
        const time = Number(str)
        sum += time
      }
      if (Number.isNaN(sum / arr.length)) {
        return 0
      }
      return Math.round(sum / arr.length * 100) / 100
    },
    onClose() {
      this.closePagePopup('Close')
    },
  },
}
</script>
<style scoped>
</style>
