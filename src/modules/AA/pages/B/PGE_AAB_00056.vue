<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div>
        <template slot="title">
          <div class="modal-title mb45">
            {{ $t('MSG_TIT_IAA_B24') }} <!-- 파도풀 관리 -->
          </div>
        </template>
        <template>
          <div class="modal-body">
            <div class="comm_title_wrap mt35">
              <h4>
                {{ $t('MSG_TXT_IAM_OUTDOOR_WAVE_POOL') }} <!-- 실외 파도풀 -->
              </h4>
            </div>
            <ur-data-grid
              ref="grid"
              :headers="columns"
              :data-source="dataSet"
              :options="opts"
            />
            <div class="comm_title_wrap mt35" style="margin-top: 20px;">
              <h4>
                {{ $t('MSG_TXT_IAM_INDOOR_WAVE_POOL') }} <!-- 실내 파도풀 -->
              </h4>
            </div>
            <ur-data-grid
              ref="grid2"
              :headers="columns2"
              :data-source="dataSet2"
              :options="opts"
            />
            <div class="comm_btn_wrap bt1">
              <div class="right_box mt10">
                <ur-button @click="onClose">
                  {{ $t('MSG_BTN_CLOSE') }} <!-- 닫기 -->
                </ur-button>
                <ur-button
                  color="violet"
                  @click="onSave"
                >
                  {{ $t('MSG_BTN_SAVE') }} <!-- 저장 -->
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
const HIGH = 0
const LOW = 1
const REST = 2
export default {
  name: 'PGE_AAB_00056', // eslint-disable-line vue/name-property-casing
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
        'COD_IA_WAVE_POOL_IN_OUT_SIDE_FG',
        'COD_IA_WAVE_POOL_STATUS',
      ],
      codes: {
        COD_RS_PARK_KIND: [],
        COD_IA_WAVE_POOL_IN_OUT_SIDE_FG: [],
        COD_IA_WAVE_POOL_STATUS: [],
      },
      params: {},
      dataSet: new this.$ur.grid.DataSet(),
      dataSet2: new this.$ur.grid.DataSet(),
      opts: { // 토탈o
        // msgTotal: false,
        noInfo: true,
        noBaseInfo: false,
        multiSelect: false,
        selectCheck: false,
        selectCheckOnly: true,
        /*
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
      columns: [],
      columns2: [],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    contextPageId() {
      // return this.$attrs['page-id']
      return this.$options.name
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
        value: 'time1StatusCd',
        text: '정각~10분',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-radio v-if="true" :value="value" sm @input="onInput">{{row.levelText}}</ur-radio>
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v, this.row.level)
              THAT.setWavePool(THAT.dataSet, this.row.level, 'time1StatusCd')
            },
          },
        },
      },
      {
        value: 'time2StatusCd',
        text: '10~20분',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-radio v-if="true" :value="value" sm @input="onInput">{{row.levelText}}</ur-radio>
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v, this.row.level)
              THAT.setWavePool(THAT.dataSet, this.row.level, 'time2StatusCd')
            },
          },
        },
      },
      {
        value: 'time3StatusCd',
        text: '20~30분',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-radio v-if="true" :value="value" sm @input="onInput">{{row.levelText}}</ur-radio>
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v, this.row.level)
              THAT.setWavePool(THAT.dataSet, this.row.level, 'time3StatusCd')
            },
          },
        },
      },
      {
        value: 'time4StatusCd',
        text: '30~40분',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-radio v-if="true" :value="value" sm @input="onInput">{{row.levelText}}</ur-radio>
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v, this.row.level)
              THAT.setWavePool(THAT.dataSet, this.row.level, 'time4StatusCd')
            },
          },
        },
      },
      {
        value: 'time5StatusCd',
        text: '40~50분',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-radio v-if="true" :value="value" sm @input="onInput">{{row.levelText}}</ur-radio>
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v, this.row.level)
              THAT.setWavePool(THAT.dataSet, this.row.level, 'time5StatusCd')
            },
          },
        },
      },
      {
        value: 'time6StatusCd',
        text: '50~정각',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-radio v-if="true" :value="value" sm @input="onInput">{{row.levelText}}</ur-radio>
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v, this.row.level)
              THAT.setWavePool(THAT.dataSet, this.row.level, 'time6StatusCd')
            },
          },
        },
      },
    ]

    this.columns2 = [
      {
        value: 'time1StatusCd',
        text: '정각~10분',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-radio v-if="true" :value="value" sm @input="onInput">{{row.levelText}}</ur-radio>
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v, this.row.level)
              THAT.setWavePool(THAT.dataSet2, this.row.level, 'time1StatusCd')
            },
          },
        },
      },
      {
        value: 'time2StatusCd',
        text: '10~20분',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-radio v-if="true" :value="value" sm @input="onInput">{{row.levelText}}</ur-radio>
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v, this.row.level)
              THAT.setWavePool(THAT.dataSet2, this.row.level, 'time2StatusCd')
            },
          },
        },
      },
      {
        value: 'time3StatusCd',
        text: '20~30분',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-radio v-if="true" :value="value" sm @input="onInput">{{row.levelText}}</ur-radio>
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v, this.row.level)
              THAT.setWavePool(THAT.dataSet2, this.row.level, 'time3StatusCd')
            },
          },
        },
      },
      {
        value: 'time4StatusCd',
        text: '30~40분',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-radio v-if="true" :value="value" sm @input="onInput">{{row.levelText}}</ur-radio>
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v, this.row.level)
              THAT.setWavePool(THAT.dataSet2, this.row.level, 'time4StatusCd')
            },
          },
        },
      },
      {
        value: 'time5StatusCd',
        text: '40~50분',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-radio v-if="true" :value="value" sm @input="onInput">{{row.levelText}}</ur-radio>
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v, this.row.level)
              THAT.setWavePool(THAT.dataSet2, this.row.level, 'time5StatusCd')
            },
          },
        },
      },
      {
        value: 'time6StatusCd',
        text: '50~정각',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-radio v-if="true" :value="value" sm @input="onInput">{{row.levelText}}</ur-radio>
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v, this.row.level)
              THAT.setWavePool(THAT.dataSet2, this.row.level, 'time6StatusCd')
            },
          },
        },
      },
    ]

    const list = [
      {
        level: HIGH, levelText: this.$t('MSG_TXT_IAM_HIGH') /* 큰 파도 */, time1StatusCd: 'false', time2StatusCd: 'false', time3StatusCd: 'false', time4StatusCd: 'false', time5StatusCd: 'false', time6StatusCd: 'false',
      },
      {
        level: LOW, levelText: this.$t('MSG_TXT_IAM_LOW') /* 작은 파도 */, time1StatusCd: 'false', time2StatusCd: 'false', time3StatusCd: 'false', time4StatusCd: 'false', time5StatusCd: 'false', time6StatusCd: 'false',
      },
      {
        level: REST, levelText: this.$t('MSG_TXT_IAM_BREAK') /* 휴식 */, time1StatusCd: 'false', time2StatusCd: 'false', time3StatusCd: 'false', time4StatusCd: 'false', time5StatusCd: 'false', time6StatusCd: 'false',
      },
    ]
    this.dataSet.setData(list)

    const list2 = [
      {
        level: HIGH, levelText: this.$t('MSG_TXT_IAM_HIGH') /* 큰 파도 */, time1StatusCd: 'false', time2StatusCd: 'false', time3StatusCd: 'false', time4StatusCd: 'false', time5StatusCd: 'false', time6StatusCd: 'false',
      },
      {
        level: LOW, levelText: this.$t('MSG_TXT_IAM_LOW') /* 작은 파도 */, time1StatusCd: 'false', time2StatusCd: 'false', time3StatusCd: 'false', time4StatusCd: 'false', time5StatusCd: 'false', time6StatusCd: 'false',
      },
      {
        level: REST, levelText: this.$t('MSG_TXT_IAM_BREAK') /* 휴식 */, time1StatusCd: 'false', time2StatusCd: 'false', time3StatusCd: 'false', time4StatusCd: 'false', time5StatusCd: 'false', time6StatusCd: 'false',
      },
    ]
    this.dataSet2.setData(list2)

    this.onSearch()
  },
  methods: {
    onSearch() {
      console.log('onSearch')

      this.params.salesDate = this.pageInitialData.salesDate

      console.log('REQ DATA:', this.params)
      const serviceName = 'DTS_AAB_00026'
      http.request(this.contextPageId, serviceName, {
        query: this.params,
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        if (!utils.isEmpty(res.data)) {
          res.data.forEach(element => {
            if (element.inOutSideFg === 'O') {
              this.setOutsideWavePool(element)
            } else if (element.inOutSideFg === 'I') {
              this.setInsideWavePool(element)
            }
          })
        } else {
          const status = {
            time1StatusCd: 'REST',
            time2StatusCd: 'REST',
            time3StatusCd: 'REST',
            time4StatusCd: 'REST',
            time5StatusCd: 'REST',
            time6StatusCd: 'REST',
          }
          this.setOutsideWavePool(status)
          this.setInsideWavePool(status)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    setWavePool(DATASET, WAVE_LEVEL, COLUMN_NAME) {
      const RAWDATA = DATASET.getRawData()
      if (WAVE_LEVEL === HIGH) {
        DATASET.setRowValue(RAWDATA[HIGH], COLUMN_NAME, false)
        DATASET.setRowValue(RAWDATA[LOW], COLUMN_NAME, true)
        DATASET.setRowValue(RAWDATA[REST], COLUMN_NAME, true)
      } else if (WAVE_LEVEL === LOW) {
        DATASET.setRowValue(RAWDATA[HIGH], COLUMN_NAME, true)
        DATASET.setRowValue(RAWDATA[LOW], COLUMN_NAME, false)
        DATASET.setRowValue(RAWDATA[REST], COLUMN_NAME, true)
      } else if (WAVE_LEVEL === REST) {
        DATASET.setRowValue(RAWDATA[HIGH], COLUMN_NAME, true)
        DATASET.setRowValue(RAWDATA[LOW], COLUMN_NAME, true)
        DATASET.setRowValue(RAWDATA[REST], COLUMN_NAME, false)
      }
    },
    CONV(timeStatusCd) {
      let rtn = ''
      if (timeStatusCd === 'HIGH') rtn = HIGH
      else if (timeStatusCd === 'LOW') rtn = LOW
      else if (timeStatusCd === 'REST') rtn = REST
      return rtn
    },
    setOutsideWavePool(outData) {
      console.log('setOutsideWavePool', outData)
      this.setWavePool(this.dataSet, this.CONV(outData.time1StatusCd), 'time1StatusCd')
      this.setWavePool(this.dataSet, this.CONV(outData.time2StatusCd), 'time2StatusCd')
      this.setWavePool(this.dataSet, this.CONV(outData.time3StatusCd), 'time3StatusCd')
      this.setWavePool(this.dataSet, this.CONV(outData.time4StatusCd), 'time4StatusCd')
      this.setWavePool(this.dataSet, this.CONV(outData.time5StatusCd), 'time5StatusCd')
      this.setWavePool(this.dataSet, this.CONV(outData.time6StatusCd), 'time6StatusCd')
    },
    setInsideWavePool(inData) {
      console.log('setInsideWavePool', inData)
      this.setWavePool(this.dataSet2, this.CONV(inData.time1StatusCd), 'time1StatusCd')
      this.setWavePool(this.dataSet2, this.CONV(inData.time2StatusCd), 'time2StatusCd')
      this.setWavePool(this.dataSet2, this.CONV(inData.time3StatusCd), 'time3StatusCd')
      this.setWavePool(this.dataSet2, this.CONV(inData.time4StatusCd), 'time4StatusCd')
      this.setWavePool(this.dataSet2, this.CONV(inData.time5StatusCd), 'time5StatusCd')
      this.setWavePool(this.dataSet2, this.CONV(inData.time6StatusCd), 'time6StatusCd')
    },
    getWavePoolStatus(VIEWDATA) {
      const timeStatusCdList = [null, '', '', '', '', '', '']
      // time1StatusCd
      if (VIEWDATA[HIGH].time1StatusCd === false) timeStatusCdList[1] = 'HIGH'
      else if (VIEWDATA[LOW].time1StatusCd === false) timeStatusCdList[1] = 'LOW'
      else if (VIEWDATA[REST].time1StatusCd === false) timeStatusCdList[1] = 'REST'
      // time2StatusCd
      if (VIEWDATA[HIGH].time2StatusCd === false) timeStatusCdList[2] = 'HIGH'
      else if (VIEWDATA[LOW].time2StatusCd === false) timeStatusCdList[2] = 'LOW'
      else if (VIEWDATA[REST].time2StatusCd === false) timeStatusCdList[2] = 'REST'
      // time3StatusCd
      if (VIEWDATA[HIGH].time3StatusCd === false) timeStatusCdList[3] = 'HIGH'
      else if (VIEWDATA[LOW].time3StatusCd === false) timeStatusCdList[3] = 'LOW'
      else if (VIEWDATA[REST].time3StatusCd === false) timeStatusCdList[3] = 'REST'
      // time4StatusCd
      if (VIEWDATA[HIGH].time4StatusCd === false) timeStatusCdList[4] = 'HIGH'
      else if (VIEWDATA[LOW].time4StatusCd === false) timeStatusCdList[4] = 'LOW'
      else if (VIEWDATA[REST].time4StatusCd === false) timeStatusCdList[4] = 'REST'
      // time5StatusCd
      if (VIEWDATA[HIGH].time5StatusCd === false) timeStatusCdList[5] = 'HIGH'
      else if (VIEWDATA[LOW].time5StatusCd === false) timeStatusCdList[5] = 'LOW'
      else if (VIEWDATA[REST].time5StatusCd === false) timeStatusCdList[5] = 'REST'
      // time6StatusCd
      if (VIEWDATA[HIGH].time6StatusCd === false) timeStatusCdList[6] = 'HIGH'
      else if (VIEWDATA[LOW].time6StatusCd === false) timeStatusCdList[6] = 'LOW'
      else if (VIEWDATA[REST].time6StatusCd === false) timeStatusCdList[6] = 'REST'

      return {
        time1StatusCd: timeStatusCdList[1],
        time2StatusCd: timeStatusCdList[2],
        time3StatusCd: timeStatusCdList[3],
        time4StatusCd: timeStatusCdList[4],
        time5StatusCd: timeStatusCdList[5],
        time6StatusCd: timeStatusCdList[6],
      }
    },
    getFaciltWavePoolList() {
      const VIEWDATA = this.dataSet.getViewData()
      const wavePoolInside = this.getWavePoolStatus(VIEWDATA)
      wavePoolInside.salesDate = this.pageInitialData.salesDate
      wavePoolInside.inOutSideFg = 'O'

      const VIEWDATA2 = this.dataSet2.getViewData()
      const wavePoolOutside = this.getWavePoolStatus(VIEWDATA2)
      wavePoolOutside.salesDate = this.pageInitialData.salesDate
      wavePoolOutside.inOutSideFg = 'I'
      return [
        wavePoolInside,
        wavePoolOutside,
      ]
    },
    onSave() {
      console.log('onSave')
      this.$nextTick(() => {
        const faciltWavePoolList = this.getFaciltWavePoolList()
        console.log('REQ DATA:', { faciltWavePoolList })
        const serviceName = 'DTS_AAB_00027'
        http.request(this.contextPageId, serviceName, {
          query: {},
          path: {},
          data: {
            faciltWavePoolList,
          },
        }).then(res => {
          console.log('RES', res.data)
          if (res.data.resultCode === '0') {
            utils.messageBox('warning', this.$t('MSG_ALT_IAA_WAVEPOOL_CHANGE_FAIL')) // 파도풀 정보를 변경하는데 실패하였습니다.
          } else {
            utils.messageBox('warning', this.$t('MSG_ALT_IAA_WAVEPOOL_CHANGE_SUCCESS')) // 파도풀 정보가 변경 되었습니다.
            //this.onSearch()
            this.closePagePopup()
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    onClose() {
      this.closePagePopup('Close')
    },
  },
}
</script>
<style scoped>
</style>
