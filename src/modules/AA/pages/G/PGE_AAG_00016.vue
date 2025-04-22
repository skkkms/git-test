<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap mt45">
        <h4>
          {{ $t('MSG_TXT_COND_INFO') }} <!-- 조건 정보 -->
        </h4>
        <div
          class="title_compo"
          style="margin-left: 16px"
        >
          <ur-button
            color="violet"
            @click="onClickReset"
          >
            {{ $t('MSG_BTN_INTL') }} <!-- 초기화 -->
          </ur-button>
        </div>
      </div>
      <ur-data-grid
        ref="grid"
        :headers="gridData.headers"
        :data-source="gridData.dataSource"
        :options="gridData.options"
        :data-set-options="{id: 'id'}"
      />
      <div class="comm_btn_wrap mt10">
        <div class="right_box">
          <ur-button
            @click="onClickClose()"
          >
            {{ $t('MSG_BTN_CLOSE') }} <!-- 닫기 -->
          </ur-button>
          <ur-button
            color="violet"
            @click="onClickSave()"
          >
            {{ $t('MSG_BTN_SAVE') }}  <!-- 저장 -->
          </ur-button>
        </div>
      </div>
    </sui-page-contents>
  </sui-page>
</template>

<script>
import { urDataSet } from 'uidev-component'
import CommonUtils from '~aa/js/common-utils'

export default {
  name: 'PGE_AAG_00016', // eslint-disable-line vue/name-property-casing
  props: {
    pageInitialData: {
      type: Object,
      required: false,
      default() {
        return {
          mode: 'INSERT',
          data: {},
        }
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
      codeKeys: [
        'COD_IA_EVENT_ATTAIN_COND_CLASS', // 이벤트달성조건분류
        'COD_IA_EVENT_ATTAIN_COND_ITEM_1', // 이벤트달성조건항목1
        'COD_IA_EVENT_ATTAIN_COND_ITEM_2', // 이벤트달성조건항목2
        'COD_IA_PURCHS_USE_CHN', // 구매이용채널(항목2에서 사용)
        'COD_IA_EVENT_ATTAIN_COND_BASE', // 이벤트달성조건기준
        'COD_IA_COND_LEAVE_CHK_CHN', // 조건-퇴장체크채널
        'COD_IA_COND_WEATHER', // 날씨 코드(항목2에서 사용)
        'COD_POPS_P010', // POPS-결제수단유형(항목2에서 사용)
        'COD_POPS_00016', // POPS-상품구분(항목2에서 사용)
        'COD_POPS_00056', // POPS-이용구분(항목2에서 사용)
      ],
      codes: {
        COD_IA_EVENT_ATTAIN_COND_CLASS: [],
        COD_IA_EVENT_ATTAIN_COND_ITEM_1: [],
        COD_IA_EVENT_ATTAIN_COND_ITEM_2: [],
        COD_IA_PURCHS_USE_CHN: [],
        COD_IA_EVENT_ATTAIN_COND_BASE: [],
        COD_IA_COND_LEAVE_CHK_CHN: [],
        COD_IA_COND_WEATHER: [],
        COD_IA_YN: [{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],
        COD_POPS_P010: [],
        COD_POPS_00016: [],
        COD_POPS_00056: [],
      },
      data: [],
      faciltList: [
        {
          faciltId: 'ALL',
          faciltName: this.$t('MSG_TXT_ALL_ALL_FACILT'), // 전체(모든 시설)
        },
      ],
      selectDone: false, // 시설목록 조회 완료 확인용
      gridData: {
        headers: [],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        options: {
          height: 138, // 282(5), 522(10), 762(15), 1482(30)
          noInfo: true,
          selectCheckOnly: true,
          msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
        },
        defaultRowData: {
          attainCondClassCd: '001', // 달성조건분류코드(default: 입장('001'))
          attainCondItemCd1: '001', // 달성조건항목코드1(default: 입장 시간('001'))
          attainCondItemCd2: null, // 달성조건항목코드2
          attainCondBaseCd: '001', // 달성조건기준코드(default: 이상('001'))
          attainCondValue: null, // 달성조건값
          attainCondItemName2: null, // 달성조건항목명2
        },
      },
    }
  },
  created() {
    http.mergeCodeList(this.$options.name, this.codeKeys, this.codes).then(() => {
      this.selectEventFaciltList()
      this.initializeHeaders(this)
    })
  },
  async mounted() {
    const { data } = this.pageInitialData
    if (utils.isEmpty(data.attainCondClassCd)) {
      // INSERT
      this.data = this.gridData.defaultRowData
    } else {
      // UPDATE
      this.data = data
      if (data.attainCondItemCd2) {
        if (data.attainCondItemCd1 === '008') { // 상품명/결제횟수(008)
          data.attainCondItemName2 = await this.getPopsItemNm(data.attainCondItemCd2)
        } else if (data.attainCondItemCd1 === '011') { // POS상세/결제총계(011)
          data.attainCondItemName2 = await this.getPopsPosNm(data.attainCondItemCd2)
        }
      }
    }
    this.gridData.dataSource.addRow(this.data)
  },
  methods: {
    initializeHeaders(that) {
      this.gridData.headers = [
        { hide: true, value: 'eventId' }, // 이벤트ID
        { hide: true, value: 'stmpSeq' }, // 스탬프순번
        {
          text: this.$t('MSG_TXT_CLSF'), // 분류
          value: 'attainCondClassCd',
          required: true,
          component: {
            props: ['row', 'value'],
            template: `
              <div>
                <ur-dropdown
                  v-model="row.attainCondClassCd"
                  :items="codes.COD_IA_EVENT_ATTAIN_COND_CLASS"
                  :placeholder="$t('MSG_TXT_SEL')"
                  @input="onInputAttainCondClassCd"
                />
              </div>`,
            computed: {
              codes() {
                return that.codes
              },
            },
            watch: {
              value: {
                immediate: true,
                handler(value) {
                  this.row.oldAttainCondClassCd = value
                },
              },
            },
            methods: {
              onInputAttainCondClassCd(value) {
                if (value !== this.row.oldAttainCondClassCd) {
                  that.gridData.dataSource.setRowValue(this.row, 'attainCondItemCd1', null)
                  that.gridData.dataSource.setRowValue(this.row, 'attainCondItemCd2', null)
                  that.gridData.dataSource.setRowValue(this.row, 'attainCondItemName2', null)
                  that.gridData.dataSource.setRowValue(this.row, 'attainCondBaseCd', null)
                  that.gridData.dataSource.setRowValue(this.row, 'attainCondValue', null)
                }
                that.gridData.dataSource.setRowValue(this.row, 'attainCondClassCd', value)
              },
            },
          },
          width: 180,
        },
        {
          text: this.$t('MSG_TXT_ITEM_1'), // 항목 1
          value: 'attainCondItemCd1',
          required: true,
          component: {
            props: ['row', 'value'],
            data() {
              return {
                items1: [],
              }
            },
            template: `
              <div>
                <ur-dropdown
                  v-model="row.attainCondItemCd1"
                  :items="items1"
                  item-text="codeName"
                  item-value="codeId"
                  :placeholder="$t('MSG_TXT_SEL')"
                  @input="onInputAttainCondItemCd1"
                />
              </div>`,
            computed: {
              codes() {
                return that.codes
              },
            },
            watch: {
              value: {
                immediate: true,
                handler(value) {
                  this.row.oldAttainCondItemCd1 = value
                },
              },
              'row.attainCondClassCd': {
                handler(value) {
                  this.setItems1(value)
                },
              },
            },
            mounted() {
              this.setItems1(this.row.attainCondClassCd)
            },
            methods: {
              setItems1(attainCondClassCd) {
                if (!utils.isEmpty(attainCondClassCd)) {
                  this.items1 = this.codes.COD_IA_EVENT_ATTAIN_COND_ITEM_1.filter(
                    item => item.parentsCodeValidityValue === attainCondClassCd,
                  )
                }
              },
              onInputAttainCondItemCd1(value) {
                if (value !== this.row.oldAttainCondItemCd1) {
                  that.gridData.dataSource.setRowValue(this.row, 'attainCondItemCd2', null)
                  that.gridData.dataSource.setRowValue(this.row, 'attainCondItemName2', null)
                  that.gridData.dataSource.setRowValue(this.row, 'attainCondBaseCd', null)
                  that.gridData.dataSource.setRowValue(this.row, 'attainCondValue', null)
                }
                that.gridData.dataSource.setRowValue(this.row, 'attainCondItemCd1', value)
              },
            },
          },
          width: 210,
        },
        {
          text: this.$t('MSG_TXT_ITEM_2'), // 항목 2
          value: 'attainCondItemCd2',
          required: true,
          component: {
            props: ['row', 'value'],
            template: `
              <div v-if="['005', '006', '007'].includes(this.row.attainCondItemCd1)"> 
                <!-- 결제수단/결제횟수(005) / 결제수단/결제금액(006) / 결제수단/결제총계(007) -->
                <ur-dropdown
                  v-model="row.attainCondItemCd2"
                  :items="codes.COD_POPS_P010"
                  :placeholder="$t('MSG_TXT_SEL')"
                  @input="onInputAttainCondItemCd2"
                />
              </div>
              <div v-else-if="this.row.attainCondItemCd1 === '008'"> <!-- 상품명/결제횟수(008) -->
                <ur-text-field
                  v-model="row.attainCondItemName2"
                  readonly
                  style="width: 100%"
                />
                <ur-icon-button
                  icon="search"
                  icon-type="line"
                  color="primary"
                  style="margin-left: 10px"
                  @click="onClickItemSearch"
                />
              </div>
              <div v-else-if="this.row.attainCondItemCd1 === '009'"> <!-- 이용채널/결제총계(009) -->
                <ur-dropdown
                  v-model="row.attainCondItemCd2"
                  :items="codes.COD_IA_PURCHS_USE_CHN"
                  :placeholder="$t('MSG_TXT_SEL')"
                  @input="onInputAttainCondItemCd2"
                />
              </div>
              <div v-else-if="this.row.attainCondItemCd1 === '010'"> <!-- POS분류/결제총계(010) -->
                <ur-dropdown
                  v-model="row.attainCondItemCd2"
                  :items="codes.COD_POPS_00016"
                  :placeholder="$t('MSG_TXT_SEL')"
                  @input="onInputAttainCondItemCd2"
                />
              </div>
              <div v-else-if="this.row.attainCondItemCd1 === '011'"> <!-- POS상세/결제총계(011) -->
                <ur-text-field
                  v-model="row.attainCondItemName2"
                  readonly
                  style="width: 100%"
                />
                <ur-icon-button
                  icon="search"
                  icon-type="line"
                  color="primary"
                  style="margin-left: 10px"
                  @click="onClickPosSearch"
                />
              </div>
              <div v-else-if="this.row.attainCondItemCd1 === '012' && selectDone"> <!-- 시설명(012) -->
                <ur-auto-dropdown
                  v-model="row.attainCondItemCd2"
                  :items="faciltList"
                  item-text="faciltName"
                  item-value="faciltId"
                  keyin-able
                  :placeholder="$t('MSG_TXT_SEL')"
                  style="width: 100%;"
                  @input="onInputAttainCondItemCd2"
                />
              </div>
              <div v-else-if="this.row.attainCondItemCd1 === '017'"> <!-- 날씨 별 입장 수(017) -->
                <ur-dropdown
                  v-model="row.attainCondItemCd2"
                  :items="codes.COD_IA_COND_WEATHER"
                  :placeholder="$t('MSG_TXT_SEL')"
                  @input="onInputAttainCondItemCd2"
                />
              </div>
              <div v-else>
                <ur-text-field
                  disabled 
                  style="width: 100%"
                />
              </div>`,
            computed: {
              codes() {
                return that.codes
              },
              faciltList() {
                return that.faciltList
              },
              selectDone() {
                return that.selectDone
              },
            },
            methods: {
              // 상품 검색 팝업 호출
              onClickItemSearch() {
                utils.openLayerPopup('PGE_AAX_00002', this.onCloseItemPopup, { size: 'lg' })
              },
              onCloseItemPopup(data = null) {
                if (data) {
                  that.gridData.dataSource.setRowValue(this.row, 'attainCondItemCd2', data.itemCd)
                  that.gridData.dataSource.setRowValue(this.row, 'attainCondItemName2', data.itemNm)
                }
              },
              // POS 검색 팝업 호출
              onClickPosSearch() {
                utils.openLayerPopup('PGE_AAX_00003', this.onClosePosPopup, { size: 'lg' })
              },
              onClosePosPopup(data = null) {
                if (data) {
                  that.gridData.dataSource.setRowValue(this.row, 'attainCondItemCd2', data.posId)
                  that.gridData.dataSource.setRowValue(this.row, 'attainCondItemName2', data.posNm)
                }
              },
              onInputAttainCondItemCd2(value) {
                that.gridData.dataSource.setRowValue(this.row, 'attainCondItemCd2', value)
              },
            },
          },
        },
        { hide: true, value: 'attainCondItemName2' },
        {
          text: this.$t('MSG_TXT_CNFG_VALUE'), // 설정 값
          value: 'attainCondBaseCd',
          required: true,
          component: {
            props: ['row', 'value'],
            data() {
              return {
                showAttainCondBase: false,
              }
            },
            template: `
              <div v-if="showAttainCondBase">
                <ur-dropdown
                  v-model="row.attainCondBaseCd"
                  :items="codes.COD_IA_EVENT_ATTAIN_COND_BASE"
                  :placeholder="$t('MSG_TXT_SEL')"
                  @input="onInputAttainCondBaseCd"
                />
              </div>
              <div v-else>
                <ur-text-field
                  disabled
                />
              </div>`,
            computed: {
              codes() {
                return that.codes
              },
            },
            watch: {
              'row.attainCondItemCd1': {
                immediate: true,
                handler(value) {
                  if (utils.isEmpty(value) || value !== '001') { // 입장시간(001)
                    this.showAttainCondBase = false
                  } else {
                    this.showAttainCondBase = true
                  }
                },
              },
            },
            methods: {
              onInputAttainCondBaseCd(value) {
                that.gridData.dataSource.setRowValue(this.row, 'attainCondBaseCd', value)
              },
            },
          },
          width: 120,
        },
        {
          text: this.$t('MSG_TXT_INPUT_VALUE'), // 입력 값
          value: 'attainCondValue',
          required: true,
          component: {
            props: ['row', 'value'],
            data() {
              return {
                type: null,
                leaveChkChns: [],
              }
            },
            template: `
              <div v-if="['001'].includes(row.attainCondItemCd1)"> <!-- 입장시간(001) -->
                <ur-text-field
                  v-model="row.attainCondValue"
                  mask="##:##"
                  style="width: 100px;"
                  @keyup="onInputAttainCondValue(adjustTime(row.attainCondValue))"
                />
              </div>
              <div v-else-if="['003', '018'].includes(row.attainCondItemCd1)"> <!-- 정기권 여부(003), 마케팅수신동의여부(018) -->
                <ur-radio-wrapper
                  v-model="row.attainCondValue"
                  :items="codes.COD_IA_YN"
                  small
                  @input="onInputAttainCondValue"
                >
                  <template v-for="item in codes.COD_IA_YN">
                    <ur-radio
                      :key="item.value"
                      :value="item.value"
                      small
                    >
                      {{ item.text }}
                    </ur-radio>
                  </template>
                </ur-radio-wrapper>
              </div>
              <div v-else-if="['004'].includes(row.attainCondItemCd1)"> <!-- 퇴장확인채널(004) -->
                <ur-checkbox-wrapper
                  v-model="leaveChkChns"
                  :items="codes.COD_IA_COND_LEAVE_CHK_CHN"
                  small
                  @input="onInputAttainCondValue"
                >
                  <template v-for="item in codes.COD_IA_COND_LEAVE_CHK_CHN">
                    <ur-checkbox
                      :key="item.value"
                      :value="item.value"
                      small
                    >{{ item.text }}
                    </ur-checkbox>
                  </template>
                </ur-checkbox-wrapper>
              </div>
              <div v-else-if="row.attainCondItemCd1">
                <ur-text-field
                  v-model="row.attainCondValue"
                  mask="number"
                  maxlength="10"
                  style="width: 100%"
                  @input="onInputAttainCondValue"
                />
              </div>
              <div v-else>-</div>`,
            computed: {
              codes() {
                return that.codes
              },
            },
            watch: {
              value: {
                immediate: true,
                handler(value) {
                  if (['004'].includes(this.row.attainCondItemCd1)) { // 퇴장확인채널(004)
                    this.leaveChkChns = value ? value.split(',') : value
                  }
                },
              },
              leaveChkChns(value) {
                if (value instanceof Array && value.length > 0) {
                  this.row.attainCondValue = value.join(',')
                }
              },
              'row.attainCondItemCd1': {
                immediate: true,
                handler(value) {
                  if (!['004'].includes(value)) {
                    this.leaveChkChns = []
                  }
                },
              },
            },
            methods: {
              adjustTime(value) {
                if (value) {
                  let intH = parseInt(value.padEnd(4, '0').slice(0, 2), 10)
                  let intM = parseInt(value.padEnd(4, '0').slice(2, 4), 10)
                  intH = Math.min(intH, 23)
                  intM = Math.min(intM, 59)

                  const hour = String(intH).padStart(2, '0')
                  const minute = String(intM).padStart(2, '0')
                  return hour.concat(minute).slice(0, value.length)
                }
                return null
              },
              onInputAttainCondValue(value) {
                let attainCondValue = null
                if (!utils.isEmpty(value)) {
                  if (value instanceof Array && value.length > 0) {
                    attainCondValue = value.sort().join(',')
                  } else {
                    attainCondValue = value
                  }
                }
                that.gridData.dataSource.setRowValue(this.row, 'attainCondValue', attainCondValue)
              },
            },
          },
          width: 300,
        },
      ]
    },
    onClickReset() {
      const rows = this.$refs.grid.getData()
      rows.forEach(row => {
        this.$refs.grid.removeRow(row, false)
      })
      this.gridData.dataSource.addRow(this.gridData.defaultRowData)
    },
    onClickClose() {
      this.closePagePopup()
    },
    onClickSave() {
      if (this.isValid()) {
        const gridData = this.gridData.dataSource.data[0]
        gridData.attainCondName = CommonUtils.getCodeText(
          this.codes.COD_IA_EVENT_ATTAIN_COND_ITEM_1,
          gridData.attainCondItemCd1,
        )
        this.closePagePopup(gridData)
      }
    },
    isValid() {
      // 조건 정보
      const { data } = this.gridData.dataSource
      for (let i = 0; i < data.length; i += 1) {
        if (utils.isEmpty(utils.trim(data[i].attainCondClassCd))) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_CLSF'))) // {분류}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(utils.trim(data[i].attainCondItemCd1))) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_ITEM_1'))) // {항목 1}은(는) 필수 항목입니다.
          return false
        }
        if (this.isEnabledItem2(data[i].attainCondItemCd1)
            && utils.isEmpty(utils.trim(data[i].attainCondItemCd2))) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_ITEM_2'))) // {항목 2}은(는) 필수 항목입니다.
          return false
        }
        if (this.isEnabledCnfgValue(data[i].attainCondItemCd1)
            && utils.isEmpty(utils.trim(data[i].attainCondBaseCd))) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_CNFG_VALUE'))) // {설정 값}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(utils.trim(data[i].attainCondValue))) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_INPUT_VALUE'))) // {입력 값}은(는) 필수 항목입니다.
          return false
        } if (data[i].attainCondItemCd1 === '001' && data[i].attainCondValue.length < 4) { // 입장시간(001)
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_INPUT_VALUE'))) // {입력 값}은(는) 필수 항목입니다.
          return false
        }
      }
      return true
    },
    isEnabledItem2(attainCondItemCd1) {
      if (!attainCondItemCd1) return true
      return [
        '005', '006', '007', // 결제수단/결제횟수(005) / 결제수단/결제금액(006) / 결제수단/결제총계(007)
        '008', // 상품명/결제횟수(008)
        '009', // 이용채널/결제총계(009)
        '010', // POS분류/결제총계(010)
        '011', // POS상세/결제총계(011)
        '012', // 시설명(012)
        '017', // 날씨 별 입장 수(017)
      ].includes(attainCondItemCd1)
    },
    isEnabledCnfgValue(attainCondItemCd1) {
      if (!attainCondItemCd1) return true
      return attainCondItemCd1 === '001' // 입장시간(001)
    },
    // POPS 상품명 조회
    getPopsItemNm(itemCd) {
      return new Promise(resolve => {
        http.request(this.$options.name, 'DTS_AAX_00008', {
          path: { 'item-cd': itemCd },
        }).then(res => {
          resolve((res.data || {}).itemNm || null)
        })
      })
    },
    // POPS POS명 조회
    getPopsPosNm(posId) {
      return new Promise(resolve => {
        http.request(this.$options.name, 'DTS_AAX_00010', {
          path: { 'pos-id': posId },
        }).then(res => {
          resolve((res.data || {}).posNm || null)
        })
      })
    },
    // 시설 목록 조회
    selectEventFaciltList() {
      http.request(this.$options.name, 'DTS_AAG_00011').then(res => {
        if (!utils.isEmpty(res.data)) {
          this.faciltList = this.faciltList.concat(res.data)
        }
      }).finally(() => {
        this.selectDone = true
      })
    },
  },
}
</script>
