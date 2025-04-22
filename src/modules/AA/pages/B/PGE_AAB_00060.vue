<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div>
        <template slot="title">
          <div class="modal-title mb45">
            가상대기 취소
          </div>
        </template>
        <template>
          <div class="modal-body">
            <!-- ::S 콘텐츠1 -->
            <ur-form-box
              toggleable
              class="mb10"
            >
              <ur-form-item
                label="확정예약 탑승시간"
                :label-align="'right'"
                style="width: 100%; height: auto;"
              >
                <ur-dropdown
                  v-model="cancelFromTime"
                  :items="COD_IA_RESERVE_TIME_FROM"
                  style="width: 100px; height: auto;"
                  @input="onChangeReserveTimeFrom"
                />
                <div class="pdRow10">
                  ~
                </div>
                <ur-dropdown
                  v-model="cancelToTime"
                  :items="COD_IA_RESERVE_TIME_TO"
                  style="width: 100px; height: auto;"
                  @input="onChangeReserveTimeTo"
                />
                <!--
                <ur-time-picker
                  v-model="cancelFromTime"
                  mode="dropdown"
                  style="width: 20%;"
                  class="pr10"
                  term="60"
                />
                ~
                <ur-time-picker
                  v-model="cancelToTime"
                  mode="dropdown"
                  style="width: 20%;"
                  term="60"
                />
                -->
              </ur-form-item>
            </ur-form-box>
            <div class="btn_wrap mt10">
              <div class="right_box">
                <!-- 검색조건EL : 조회 및 리셋 -->
                <ur-button
                  @click="onReset"
                >
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
            <!-- ::E 콘텐츠1 -->

            <!-- ::S 콘텐츠2 -->
            <template>
              <ur-data-grid
                ref="grid"
                :headers="columns"
                :data-source="dataSet"
                :options="opts"
                class="custom_grid_pgeNav_None"
              />
            </template>
            <!-- ::E 콘텐츠2 -->
          </div>
          <div class="comm_btn_wrap bt1 mt45">
            <div class="right_box mt10">
              <ur-button
                @click="onClose"
              >
                {{ $t('MSG_BTN_CLOSE') }}
              </ur-button>
              <ur-button
                color="violet"
                @click="openVlineWaitCancelGuidePopup"
              >
                {{ $t('MSG_BTN_RESERV_CNCL') }}
              </ur-button>
            </div>
          </div>
        </template>
      </div>
    </sui-page-contents>
  </sui-page>
</template>

<script>

export default {
  name: 'PGE_AAB_00060', // eslint-disable-line vue/name-property-casing
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
        'COD_IA_RESERVE_TIME',
      ],
      codes: {
        COD_IA_RESERVE_TIME: [],
      },
      cancelFromTime: '0000',
      cancelToTime: '0100',
      dataSet: new this.$ur.grid.DataSet(),
      opts: {
        //headerHeight: 36,
        height: 340,
        pagination: false,
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
        selectCheckOnly: true,
        resizableColumn: true,
        resizeFullWidth: true,
      },
      columns: [
        {
          value: '__idx', text: 'No.', width: 50, customValue: v => v + 1,
        },
        { value: 'reservDrawGubunNm', text: '구분', width: 50 },
        {
          value: 'reservReqNo',
          text: '예약번호',
          customValue: (v, r) => v ? v : r.drawWaitReqId,
        },
        { value: 'fstRgstDtm', text: '신청시간', width: 120 },
        { value: 'reservType', text: '예약구분' },
        { value: 'ridingStartTime', text: '확정예약 탑승시간', width: 120 },
        {
          value: 'procStatusNm', text: '예약상태',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    contextPageId() {
      return this.$options.name
    },
    COD_IA_RESERVE_TIME_FROM() {
      return this.codes.COD_IA_RESERVE_TIME.filter(el => el.value !== '2400')
    },
    COD_IA_RESERVE_TIME_TO() {
      return this.codes.COD_IA_RESERVE_TIME.filter(el => el.value !== '0000')
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

    const today = new Date()

    let hours = today.getHours() // 시
    if (hours.toString().length === 1) hours = `0${hours}`

    this.cancelFromTime = `${hours}00`
    this.cancelToTime = '2400'

    this.onSearch()
  },
  methods: {
    onClose() {
      this.closePagePopup('Close')
    },
    onReset() {
      const today = new Date()

      let hours = today.getHours() // 시
      if (hours.toString().length === 1) hours = `0${hours}`

      this.cancelFromTime = `${hours}00`
      this.cancelToTime = '2400'
    },
    onSearch() {
      console.log('onSearch')
      const query = {
        faciltId: this.pageInitialData.faciltId,
        salesDate: this.pageInitialData.salesDate,
        cancelFromTime: this.cancelFromTime,
        cancelToTime: this.cancelToTime,
      }

      console.log('REQ', query, this.contextPageId)
      const serviceName = 'DTS_AAB_00040'
      http.request(this.contextPageId, serviceName, {
        query,
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        this.dataSet.setData(res.data)
      }).catch(error => {
        console.log('ERR', error)
      })
    },
    openVlineWaitCancelGuidePopup() {
      const viewData = this.dataSet.getViewData()
      //const selected = this.dataSet.getSelected()

      //if (utils.isEmpty(selected)) {
      //  utils.messageBox('warning', this.$t('선택 된 항목이 없습니다.'));
      //  return
      //}

      const vlineWaitCancelList = []
      viewData.forEach(el => {
        vlineWaitCancelList.push({
          reservDrawGubunCd: el.reservDrawGubunCd,
          reservReqNo: el.reservReqNo,
          drawWaitReqId: el.drawWaitReqId,
          reservReqMemshpUid: el.reservReqMemshpUid,
          pticketId: el.pticketId,
          reservQrCd: el.reservQrCd,
          reservDate: el.reservDate,
        })
      })

      if (vlineWaitCancelList.length > 0) {
        //utils.messageBox('confirm', this.$t('예약취소 하시겠습니까?'), null, () => { // 예약취소 하시겠습니까?
        //})
        utils.openLayerPopup('PGE_AAB_00061', this.onOpenVlineWaitCancelGuidePopupClosed, {
          size: 'xlg',
          pageInitialData: {
            faciltId: this.pageInitialData.faciltId,
            vlineWaitCancelList,
          },
        })
      } else {
        utils.messageBox('warning', this.$t('예약취소할 내역이 조회되지 않았습니다.'))
      }
    },
    onOpenVlineWaitCancelGuidePopupClosed(closeFlag) {
      if (closeFlag === 'SAVE_SUCCESS') {
        this.closePagePopup('REFRESH')
      }
    },
    onChangeReserveTimeFrom() {
      if (this.cancelFromTime >= this.cancelToTime) {
        let to = this.cancelFromTime * 1 + 100
        if (to < 1000) to = `0${to}`
        else to = `${to}`
        this.cancelToTime = to
        console.log(this.cancelToTime)
      }
    },
    onChangeReserveTimeTo() {
      if (this.cancelFromTime >= this.cancelToTime) {
        let from = this.cancelToTime * 1 - 100
        if (from === 0) from = '0000'
        else if (from < 1000) from = `0${from}`
        else from = `${from}`
        this.cancelFromTime = from
        console.log(this.cancelFromTime)
      }
    },
  },
}
</script>
<style scoped>
</style>
