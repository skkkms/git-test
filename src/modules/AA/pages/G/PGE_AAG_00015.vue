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
            @click="onClickAdd"
          >
            {{ $t('MSG_BTN_ADD') }} <!-- 추가 -->
          </ur-button>
          <ur-button
            color="violet"
            @click="onClickDelete"
          >
            {{ $t('MSG_BTN_DEL') }}  <!-- 삭제 -->
          </ur-button>
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

export default {
  name: 'PGE_AAG_00015', // eslint-disable-line vue/name-property-casing
  props: {
    pageInitialData: {
      type: Object,
      required: false,
      default() {
        return {
          mode: 'INSERT',
          data: [],
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
      // 공통코드
      codeKeys: [
        'COD_IA_COND_KIND', // 조건구분
        'COD_IA_EVENT_PARTCP_COND', // 이벤트참여조건
        'COD_IA_COND_MEMSHP_GRD', // 조건-멤버십등급
      ],
      codes: {
        COD_IA_COND_KIND: [],
        COD_IA_EVENT_PARTCP_COND: [],
        COD_IA_COND_MEMSHP_GRD: [],
        COD_IA_YN: [{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],
      },
      data: [],
      gridData: {
        headers: [],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        options: {
          height: 282, // 282(5), 522(10), 762(15), 1482(30)
          noInfo: true,
          selectCheck: true,
          selectCheckOnly: true,
          multiSelect: true,
          msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
        },
        defaultRowData: {
          eventId: null,
          condSeq: null,
          condKindCd: '01',
          condCd: '',
          condName: '',
          condValue: '',
        },
      },
    }
  },
  created() {
    http.mergeCodeList(this.$options.name, this.codeKeys, this.codes).then(() => {
      this.initializeHeaders(this)
    })
  },
  mounted() {
    const { mode, data } = this.pageInitialData
    this.data = utils.cloneDeep(data)
    this.$refs.grid.setData(this.data)
    if (mode.toUpperCase() === 'INSERT' && this.data.length === 0) {
      this.onClickAdd()
    }
  },
  methods: {
    initializeHeaders(that) {
      this.gridData.headers = [
        {
          text: this.$t('MSG_TXT_NUMBER_ROW'), // No.
          type: 'number',
          value: '__idx',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div>{{ rowNum }}</div>',
            computed: {
              rowNum() {
                return this.value + 1
              },
            },
          },
          width: 50,
        },
        { hide: true, value: 'eventId' },
        { hide: true, value: 'condSeq' },
        {
          text: this.$t('MSG_TXT_CLSF'), // 분류
          value: 'condKindCd',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-radio-wrapper
                  v-model="row.condKindCd"
                  :items="codes.COD_IA_COND_KIND"
                  @input="onInputCondKind"
                  small
                >
                  <template v-for="item in codes.COD_IA_COND_KIND">
                    <ur-radio
                      :key="item.value"
                      :value="item.value"
                      small
                    >
                      {{ item.text }}
                    </ur-radio>
                  </template>
                </ur-radio-wrapper>
              </div>`,
            computed: {
              codes() {
                return that.codes
              },
            },
            methods: {
              onInputCondKind(value) {
                const condKindCd = value
                that.gridData.dataSource.setRowValue(this.row, 'condKindCd', condKindCd)
                that.gridData.dataSource.setRowValue(this.row, 'condCd', '')
                that.gridData.dataSource.setRowValue(this.row, 'condName', '')
              },
            },
          },
          width: 200,
        },
        {
          text: this.$t('MSG_TXT_ITEM'), // 항목
          value: 'condCd',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div
                v-if="this.row.condKindCd === '01'"
                style="width: 250px"
              > 
                <ur-text-field
                  v-model="row.condName"
                  readonly
                  style="width: 210px"
                /> 
                <ur-icon-button
                  icon="search"
                  icon-type="line"
                  color="primary"
                  style="margin-left: 10px"
                  @click="onClickFilterSearch"
                /> 
              </div>
              <div
                v-else
                style="width: 250px"
              >
                <ur-dropdown
                  ref="cond"
                  v-model="row.condCd"
                  :items="codes.COD_IA_EVENT_PARTCP_COND"
                  :placeholder="$t('MSG_TXT_SEL')"
                  @input="onInputCond"/>
              </div>`,
            computed: {
              codes() {
                return that.codes
              },
              condKindNm() {
                return this.row.condName
              },
            },
            methods: {
              // 필터검색
              onClickFilterSearch() {
                utils.openLayerPopup('PGE_AAX_00005', this.callbackFilterSearch, { size: 'lg' })
              },
              // 필터 검색 값 셋팅
              callbackFilterSearch(data) {
                if (data) {
                  that.gridData.dataSource.setRowValue(this.row, 'condCd', data.filterId)
                  that.gridData.dataSource.setRowValue(this.row, 'condName', data.filterName)
                  that.gridData.dataSource.setRowValue(this.row, 'condValue', '')
                }
              },
              onInputCond(value) {
                const condList = this.codes.COD_IA_EVENT_PARTCP_COND
                const condCd = value
                const condName = condList.find(item => item.value === condCd).text
                that.gridData.dataSource.setRowValue(this.row, 'condCd', condCd)
                that.gridData.dataSource.setRowValue(this.row, 'condName', condName)
                that.gridData.dataSource.setRowValue(this.row, 'condValue', '')
              },
            },
          },
          width: 300,
        },
        { hide: true, value: 'condName' },
        {
          text: this.$t('MSG_TXT_SELT_VALUE'), // 선택 값
          value: 'condValue',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            data() {
              return {
                memshpGrds: [],
              }
            },
            watch: {
              value: {
                immediate: true,
                handler(value) {
                  if (this.row.condCd === '04') {
                    this.memshpGrds = value.split(',')
                  }
                },
              },
              memshpGrds(value) {
                if (value instanceof Array && value.length > 0) {
                  this.row.condValue = value.join(',')
                }
              },
            },
            template: `
              <div v-if="this.row.condKindCd === '01'">-</div>
              <div v-else>
                <div v-if="this.row.condCd === ''">-</div>
                <div v-else-if="this.row.condCd !== '04'">
                  <ur-radio-wrapper
                    v-model="row.condValue"
                    :items="codes.COD_IA_YN"
                    small
                    @input="onInputCondValue"
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
                <div v-else-if="this.row.condCd === '04'">
                  <ur-checkbox-wrapper
                    v-model="memshpGrds"
                    :items="codes.COD_IA_COND_MEMSHP_GRD"
                    small
                    @input="onInputCondValue"
                  >
                    <template v-for="item in codes.COD_IA_COND_MEMSHP_GRD">
                      <ur-checkbox
                        :key="item.value"
                        :value="item.value"
                        small
                      >{{ item.text }}
                      </ur-checkbox>
                    </template>
                  </ur-checkbox-wrapper>
                </div>
              </div>`,
            computed: {
              codes() {
                return that.codes
              },
            },
            methods: {
              onInputCondValue(value) {
                let condValue = null
                if (!utils.isEmpty(value)) {
                  if (value instanceof Array && value.length > 0) {
                    condValue = value.sort().join(',')
                  } else {
                    condValue = value
                  }
                }
                that.gridData.dataSource.setRowValue(this.row, 'condValue', condValue)
              },
            },
          },
        },
      ]
    },
    onClickAdd() {
      const data = this.$refs.grid.getData()
      if (data.length >= 10) {
        utils.messageBox('warning', this.$t('MSG_ALT_MAX10_LENGTH')) // 최대 10개까지 가능합니다
        return
      }
      this.gridData.dataSource.addRow(this.gridData.defaultRowData)
    },
    onClickDelete() {
      const rows = this.$refs.grid.getSelected()
      rows.forEach(row => {
        this.$refs.grid.removeRow(row, false)
      })
    },
    onClickReset() {
      const rows = this.$refs.grid.getData()
      rows.forEach(row => {
        this.$refs.grid.removeRow(row, false)
      })
      this.onClickAdd()
    },
    onClickClose() {
      this.closePagePopup()
    },
    onClickSave() {
      if (this.isValid()) {
        const returnData = {
          list: this.gridData.dataSource.data,
        }

        const { mode } = this.pageInitialData
        if (mode.toUpperCase() === 'INSERT') {
          returnData.insert = this.gridData.dataSource.data
        } else {
          const { removed } = this.gridData.dataSource.getChanged()

          // insertList: [그리드에 보이는] 데이터 중, [eventId]가 [empty]
          const insertList = returnData.list.filter(item => utils.isEmpty(item.eventId))

          // insertList: [그리드에 보이는] 데이터 중, [eventId]가 [not empty]고, [__dirty]가 [U]
          const updateList = returnData.list
            .filter(item => !utils.isEmpty(item.eventId) && item.__dirty === 'U') // eslint-disable-line no-underscore-dangle

          // deleteList: [removed] 데이터 중, [eventId]가 [not empty]는 것
          const deleteList = removed.filter(item => !utils.isEmpty(item.eventId))

          returnData.insert = insertList
          returnData.update = updateList
          returnData.delete = deleteList
        }
        this.closePagePopup(returnData)
      }
    },
    isValid() {
      // 조건 정보
      const { data } = this.gridData.dataSource
      const condCds = []
      for (let i = 0; i < data.length; i += 1) {
        if (condCds.indexOf(data[i].condCd) > -1) {
          utils.messageBox('warning', this.$t('MSG_ALT_ITEM_REDND')) // 항목은 중복 설정할 수 없습니다.
          return false
        }

        if (utils.isEmpty(utils.trim(data[i].condKindCd))) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_CLSF'))) // {분류}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(utils.trim(data[i].condCd))) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_ITEM'))) // {항목}은(는) 필수 항목입니다.
          return false
        }
        if (data[i].condKindCd !== '01' && utils.isEmpty(utils.trim(data[i].condValue))) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_SELT_VALUE'))) // {선택 값}은(는) 필수 항목입니다.
          return false
        }

        condCds.push(data[i].condCd)
      }
      return true
    },
  },
}
</script>
