<template>
  <div>
    <!-- 검색조건 -->
    <template>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_FACILT_CATE')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <!-- [검색조건] 시설 카테고리 -->
          <ur-dropdown
            v-model="params.faciltCateKindCd"
            :items="COD_IA_FACILT_CATE_KIND"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_FACILT_NAME')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <!-- [검색조건] 시설명 -->
          <ur-text-field
            v-model="params.faciltName"
            max-length="300"
            style="width: 100%;"
            @keydown.enter="onSearch"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <!--[검색조건] 조회 및 리셋 -->
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

    <template>
      <ur-data-grid
        ref="grid"
        class="custom_grid_type1 mt35"
        :headers="columns"
        :data-source="dataSet"
        :options="opts"
        :item-size="dataTotalCount"
        @grid:paging="pagingChange"
        @grid:data-changed="onDataChange"
      />
    </template>

    <!-- [검색조건] 삭제 & 신규등록 -->
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
  </div>
</template>

<script>

const PARK_KIND_CD = '01' // '01' 에버랜드 , '02' 캐리비안베이

export default {
  name: 'PGE_AAB_00042_T01', // eslint-disable-line vue/name-property-casing
  components: {
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
        resizeFullWidth: false,
        noInfo: false,
        height: 522,
        defaultPageSize: 10,
        pagination: true,
        multiSelect: false,
        selectCheck: false,
      },
      paging: {
        currentPage: '1',
        rowsPerPage: '10',
      },
      params: {
        parkKindCd: PARK_KIND_CD, // '01' 에버랜드 , '02' 캐리비안베이
        faciltName: '',
        faciltCateKindCd: '',
      },
      CODE_KEYS: [
        'COD_IA_EL_FACILT_CATE_KIND',
        'COD_IA_CB_FACILT_CATE_KIND',
      ],
      codes: {
        COD_IA_EL_FACILT_CATE_KIND: [],
        COD_IA_CB_FACILT_CATE_KIND: [],
      },

      columns: [], // 그리드 헤드 초기화는 mounted 에서 해야 한다. that=this 연결 필요함!

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
    COD_IA_FACILT_CATE_KIND() {
      if (this.params.parkKindCd === '02') return this.codes.COD_IA_CB_FACILT_CATE_KIND
      return this.codes.COD_IA_EL_FACILT_CATE_KIND
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

    const that = this
    const columnHeadGroup = [
      { value: 'faciltName', text: this.$t('MSG_TXT_FACILT_NAME') },
      {
        value: 'faciltKindNms',
        text: this.$t('MSG_TXT_FACILT_CATE'),
        customValue: v => (v || '-'),
      },
      { value: 'vlineWaitNm', text: this.$t('MSG_TXT_FACILT_VLINE_WAIT_YN') },
      {
        text: this.$t('MSG_TXT_USE_YN'),
        value: 'flowCtrlUseYn',
        required: true,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
              <ur-radio-wrapper v-model="row.flowCtrlUseYn" sm @input="onInput">
                <ur-radio value="Y">Y</ur-radio>
                <ur-radio value="N">N</ur-radio>
              </ur-radio-wrapper>
            </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v)
              that.dataSet.setRowValue(this.row, 'flowCtrlUseYn', v)
              // that.dataSet.setRowValue(this.row, 'flowCtrlGateId', '')
            },
          },
        },
      },
      {
        text: this.$t('MSG_TXT_GATE_ID'),
        value: 'flowCtrlGateId',
        required: true,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <template v-if="row.flowCtrlUseYn === 'Y'">
              <ur-text-field
                v-model="row.flowCtrlGateId"
                @input="onInput"
                :rules="$rules.getRules('only_alphanumeric')"
                maxlength="10"
              />
            </template>
            <template v-else>
              <ur-text-field v-model="row.flowCtrlGateId" disabled/>
            </template>
          </div>`,
          methods: {
            onInput(v) {
              console.log('onInput', v)
              if (this.value !== v) {
                that.dataSet.setRowValue(this.row, 'flowCtrlGateId', v)
              }
            },
          },
        },
      },
      {
        value: 'firstRegistrationDTM',
        text: this.$t('MSG_TXT_FST_RGST_DTM'),
        customValue: v => {
          v = utils.dateformatToClient(v)
          return v || '-'
        },
      },
      {
        value: 'firstRegistrationUserId', text: this.$t('MSG_TXT_FST_RGST_USR'), width: 90, customValue: v => (v || '-'),
      },
      {
        value: 'finalModificationDTM',
        text: this.$t('MSG_TXT_MDFC_DTM'),
        customValue: v => {
          v = utils.dateformatToClient(v)
          return v || '-'
        },
      },
      { value: 'finalModificationUserId', text: this.$t('MSG_TIT_MDFC_USR'), customValue: v => (v || '-') },
    ]

    this.columns = [
      ...columnHeadGroup,
    ]
    const query = utils.getParameter(this, 'params')
    console.log(this.$options.name, 'mounted, utils.getParameter:', query)

    if (!utils.isEmpty(query)) {
      this.params = {
        parkKindCd: PARK_KIND_CD, // 이전 화면에서 보낸 parkKindCd가 무엇이든 현재 화면의 파크코드로 대치한다.
        faciltName: query.faciltName,
        faciltCateKindCd: query.faciltCateKindCd,
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
      this.params = {
        parkKindCd: PARK_KIND_CD,
        faciltName: '',
        faciltCateKindCd: '',
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
    onSearch() {
      console.log('onSearch')
      const query = Object.assign({}, this.params, this.paging)
      query.faciltName = encodeURI(query.faciltName)
      this.dataSet.setData([])
      console.log('REQ', query)
      http.request(this.contextPageId, 'DTS_AAB_00011', {
        query,
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        this.dataTotalCount = res.data.totalCount
        this.dataSet.setData(res.data.list)

        const rawData = []
        if (this.dataSet.getRawData()) {
          this.dataSet.getRawData().forEach(element => {
            rawData.push({
              seqNo: element.__idx + 1,
              __dirty: element.__dirty,
              __id: element.__id,

              faciltId: element.faciltId,
              faciltCateKindCd: element.faciltCateKindCd,
              faciltKindNms: element.faciltKindNms,
              vlineWaitNm: element.vlineWaitNm,
            })
          })
        }
        this.dataSetRawData = rawData
        this.dataSetChangedData = []
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
        const found = changed.removed.find(el => el.__id === updatedElement.__id)
        if (utils.isEmpty(found)) {
          updated.push(updatedElement)
        }
      })

      console.log('UPDATED', updated)
      if (this.validated(updated)) {
        console.log('REQ DATA:', this.params)
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null, () => {
          http.request(this.contextPageId, 'DTS_AAB_00013', {
            query: {},
            path: {},
            data: {
              faciltFlowCtrlUpdated: [...updated],
            },
          }).then(res => {
            console.log('RES', res.data)
            if (res.data.resultCode === '0') {
              utils.messageBox('warning', res.data.msg)
            } else {
              utils.messageBox('success', this.$t('MSG_ALT_CHG_DATA')) // 변경되었습니다.
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

      if ((updated.length) === 0) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_CHANGED_CNTN')) // 변경된 내용이 없습니다.
        return false
      }

      // 수정항목 입력값 사용여부
      let found = updated.find(row => utils.isEmpty(row.flowCtrlUseYn))
      if (!utils.isEmpty(found)) {
        utils.messageBox('warning', this.$t(`시설 '${found.faciltName}'의 사용여부를 선택하세요`)) // 시설 사용여부를 선택하세요
        return false
      }

      // 수정항목 게이트ID 누락여부
      found = updated.find(row => row.flowCtrlUseYn === 'Y' && utils.isEmpty(row.flowCtrlGateId))
      if (!utils.isEmpty(found)) {
        utils.messageBox('warning', this.$t(`시설 '${found.faciltName}'의 게이트 ID가 입력되지 않았습니다.`)) // 시설 게이트 ID가 입력되지 않았습니다.
        return false
      }

      found = updated.find(row => row.flowCtrlUseYn === 'Y' && !utils.isEngNum_(row.flowCtrlGateId))
      if (!utils.isEmpty(found)) {
        utils.messageBox('warning', this.$t('영문/숫자만 입력 가능합니다.'))
        return false
      }

      return true
    },
    onDataChange() {
      console.log('onDataChange')
    },
  },
}
</script>
<style scoped>
</style>
