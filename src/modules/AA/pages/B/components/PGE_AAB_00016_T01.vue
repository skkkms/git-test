<template>
  <div>
    <!-- [검색조건] 영업일자 -->
    <template>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_BUSINESS_DT')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-picker
            v-model="params.salesDate"
            model-type="YYYYMMDD"
            input-type="YYYY-MM-DD"
            init="today"
            :confirm-label="$t('MSG_BTN_SELT')"
            :today-label="$t('MSG_BTN_TODAY')"
          />
        </ur-form-item>
        <!-- [검색조건] 퍼소나유형 -->
        <ur-form-item
          :label="$t('MSG_TXT_PERSON_TYPE')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="params.personaSelect"
            :readonly="true"
            style="width: 100%;"
          />
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            @click="openPersonaPopup"
          />
        </ur-form-item>
        <!-- [검색조건] 콘텐츠명 -->
        <ur-form-item
          :label="$t('MSG_TIT_CNT_NAME')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="params.contentsName"
            maxlength="100"
            style="width: 100%;"
            @keyup.enter="onSearch"
          />
        </ur-form-item>
        <!-- [선택조건] 노출여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-checkbox
            v-model="exposrY"
            sm
          /><span class="check_label"> {{ $t('MSG_TXT_EXPOSR_YN01') }} </span>
          <ur-checkbox
            v-model="exposrN"
            sm
          /><span class="check_label"> {{ $t('MSG_TXT_EXPOSR_YN02') }} </span>
        </ur-form-item>
        <!-- [선택조건] 방문상태 -->
        <ur-form-item
          :label="$t('MSG_TXT_VST_STTS')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-checkbox
            v-model="statType1"
            sm
          /><span class="check_label"> {{ $t('MSG_TXT_VISIT_A') }} </span>
          <ur-checkbox
            v-model="statType2"
            sm
          /><span class="check_label"> {{ $t('MSG_TXT_VISIT_B') }} </span>
          <ur-checkbox
            v-model="statType3"
            sm
          /><span class="check_label"> {{ $t('MSG_TXT_VISIT_C') }} </span>
        </ur-form-item>
        <!-- [선택조건] 노출위치 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_LCT')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="params.exposrLocCd"
            :items="COD_IA_CURATION_EXPOSR_LOC"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>
        <!-- [선택조건] 멤버십등급 -->
        <ur-form-item
          :label="$t('MSG_TXT_MEMSHP_T')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-checkbox
            v-model="tearType1"
            sm
          /><span class="check_label"> {{ $t('MSG_TXT_MEMSHP_T_01') }} </span>
          <ur-checkbox
            v-model="tearType2"
            sm
          /><span class="check_label"> {{ $t('MSG_TXT_MEMSHP_T_02') }} </span>
          <ur-checkbox
            v-model="tearType3"
            sm
          /><span class="check_label"> {{ $t('MSG_TXT_MEMSHP_T_03') }} </span>
          <ur-checkbox
            v-model="tearType4"
            sm
          /><span class="check_label"> {{ $t('MSG_TXT_MEMSHP_T_04') }} </span>
          <ur-checkbox
            v-model="tearType5"
            sm
          /><span class="check_label"> {{ $t('MSG_TXT_MEMSHP_T_05') }} </span>
        </ur-form-item>
        <!-- [선택조건] 언어구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_LANG_DIV')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-checkbox
            v-model="langKindKo"
            sm
          /><span class="check_label"> {{ $t('MSG_TXT_KO') }} </span>
          <ur-checkbox
            v-model="langKindEl"
            sm
          /><span class="check_label"> {{ $t('MSG_TXT_EN') }} </span>
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- [버튼] 초기화 -->
          <ur-button @click="onReset">
            {{ $t('MSG_BTN_RESET') }}
          </ur-button>
          <!-- [버튼] 검색 -->
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
        class="custom_grid_pgeNav_None mt35"
        :headers="columns"
        :data-source="dataSet"
        :options="opts"
        :item-size="dataTotalCount"
        @grid:scroll-bottom="scrollBottom"
      >
        <template #left-info>
          <cmp-ur-data-grid-left-info
            :total-count="dataTotalCount"
            :page-size="paging.rowsPerPage"
            @changePageSize="onChangePageSize"
          />
        </template>
        <template #right-info>
          <ur-button
            color="violet"
            @click="openBatchPopup"
          >
            {{ $t('MSG_TXT_BK_RGST') }}
          </ur-button>
        </template>
      </ur-data-grid>
    </template>
    <div class="btn_wrap mt10">
      <div class="right_box">
        <!-- [버튼] 저장 -->
        <ur-button
          v-permission:create="contextPageId"
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
  name: 'PGE_AAB_00016_T01', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      dataSet: new this.$ur.grid.DataSet(),
      dataSetRawData: [],
      dataTotalCount: 0,
      opts: {
        infinityScroll: true,
        pagination: false,
        styleBordered: false,
        resizableColumn: true,
        headerHeight: 36,
        resizeFullWidth: false,
        noInfo: false,
        height: 470,
        defaultPageSize: 10,
        multiSelect: false,
        selectCheck: false,
      },
      paging: {
        currentPage: 1,
        rowsPerPage: 10,
      },
      params: {
        parkKindCd: PARK_KIND_CD, // '01' 에버랜드 , '02' 캐리비안베이
        salesDate: '',
        personaId: '',
        personaSelect: '',
        contentsName: '',
        exposrLocCd: '',
        selectData: {
          COD_IA_EL_CURATION_EXPOSR_LOC: {
            label: '',
            key: '',
          },
          COD_IA_CB_CURATION_EXPOSR_LOC: {
            label: '',
            key: '',
          },
        },
      },

      exposrY: true,
      exposrN: true,
      statType1: true,
      statType2: true,
      statType3: true,
      tearType1: true,
      tearType2: true,
      tearType3: true,
      tearType4: true,
      tearType5: true,
      langKindKo: true,
      langKindEl: true,

      CODE_KEYS: [
        'COD_IA_EL_CURATION_EXPOSR_LOC',
        'COD_IA_CB_CURATION_EXPOSR_LOC',
      ],
      codes: {
        COD_IA_EL_CURATION_EXPOSR_LOC: [],
        COD_IA_CB_CURATION_EXPOSR_LOC: [],
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
    COD_IA_CURATION_EXPOSR_LOC() {
      if (this.params.parkKindCd === '02') return this.codes.COD_IA_CB_CURATION_EXPOSR_LOC
      return this.codes.COD_IA_EL_CURATION_EXPOSR_LOC
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
      {
        text: 'No.', value: 'rnum', width: 50, minWidth: 50,
      },
      { value: 'contentsName', text: this.$t('MSG_TXT_TIT_CNT_NAME') },
      {
        text: this.$t('MSG_TXT_LANG_DIV'),
        value: 'langKindNm',
        width: 80,
        minWidth: 80,
        customValue: v => v || '-',
      },
      {
        text: this.$t('MSG_TXT_EXPOSR_YN'),
        value: 'exposrYn',
        width: 100,
        minWidth: 100,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
              <ur-radio-wrapper v-model="row.exposrYn" sm @input="onInput">
                <ur-radio value="Y">Y</ur-radio>
                <ur-radio value="N">N</ur-radio>
              </ur-radio-wrapper>
            </div>`,
          methods: {
            onInput(v) {
              that.dataSet.setRowValue(this.row, 'exposrYn', v)
            },
          },
        },
      },
      {
        text: this.$t('MSG_TXT_EXPOSR_ORDER'),
        value: 'exposrOrder',
        width: 120,
        minWidth: 120,
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: `<div>
            <ur-text-field
              :value="value"
              style="width: 100%;"
              @input="onInput"
              mask="number"
              maxlength="4" />
          </div>`,
          methods: {
            onInput(v) {
              // 영문 / 숫자 입력제한
              // eslint-disable-next-line eqeqeq-fix/eqeqeq
              if (v != this.value) { // !== 사용하지 말 것!
                // eslint-disable-next-line no-underscore-dangle
                if (utils.isEngNum_(v) || utils.isEmpty(v)) {
                  that.dataSet.setRowValue(this.row, 'exposrOrder', v)
                } else {
                  utils.messageBox('warning', this.$t('MSG_ALT_ONLY_ENGLISH_NUMBER'), null, () => {})
                }
              }
            },
          },
        },
      },
      {
        text: this.$t('MSG_TXT_EXPOSR_LCT'),
        value: 'exposrLocNm',
        width: 100,
        minWidth: 100,
        customValue: v => v || '-',
      },
      {
        text: this.$t('MSG_TXT_CNTN_MGMT'),
        value: 'contentKindNm',
        width: 100,
        minWidth: 100,
        customValue: v => v || '-',
      },
      {
        text: this.$t('MSG_TXT_PERSON_CD'),
        value: 'personaCodes',
        width: 150,
        customValue: v => v || '-',
      },
      {
        text: this.$t('MSG_TXT_PERSON_TYPE'),
        value: 'personaNames',
        customValue: v => v || '-',
      },
      {
        text: this.$t('MSG_TXT_VST_STTS'),
        value: 'visitStatTypeNm',
        width: 100,
        minWidth: 100,
        customValue: v => {
          let customValue = v.replaceAll('방문', '')
          customValue = customValue.replaceAll('미지정 /', '')
          return customValue || '-'
        },
      },
      {
        text: this.$t('멤버십등급'),
        value: 'tearTypeNm',
        width: 170,
        minWidth: 170,
        customValue: v => {
          const customValue = v.replaceAll('미지정 /', '')
          return customValue || '-'
        },
      },
    ]

    this.columns = [
      ...columnHeadGroup,
    ]
    const query = utils.getParameter(this, 'params')

    if (!utils.isEmpty(query)) {
      this.params = {
        parkKindCd: PARK_KIND_CD, // 이전 화면에서 보낸 parkKindCd가 무엇이든 현재 화면의 파크코드로 대치한다.
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
    setPesonaId(selected) {
      if (!utils.isEmpty(selected)) {
        this.params.personaId = selected.personaId
        this.params.personaSelect = `${selected.companaionNm},${selected.playTypeNm}`
      }
    },
    openPersonaPopup() {
      utils.openLayerPopup('PGE_AAB_00044', this.setPesonaId, {
        pageInitialData: {
          parkKindCd: PARK_KIND_CD,
        },
      })
    },
    openBatchPopup() {
      utils.openLayerPopup('PGE_AAB_00050', this.onBatchClosed, {
        pageInitialData: {
          parkKindCd: PARK_KIND_CD,
        },
      })
    },
    onBatchClosed(comment) {
      if (comment === 'NEED_REFRESH') {
        this.onSearch()
      }
    },
    closed() {},
    onReset() {
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
        personaSelect: '',
        contentsName: '',
        exposrLocCd: '',
      }
      this.exposrY = true
      this.exposrN = true
      this.statType1 = true
      this.statType2 = true
      this.statType3 = true
      this.tearType1 = true
      this.tearType2 = true
      this.tearType3 = true
      this.tearType4 = true
      this.tearType5 = true
      this.langKindKo = true
      this.langKindEl = true
    },
    onChangePageSize(pageSize) {
      this.paging.rowsPerPage = pageSize
    },
    scrollBottom() {
      const totalSize = this.dataTotalCount
      const currentSize = this.dataSet.totalSize
      if (totalSize > currentSize) {
        this.search()
      }
    },
    onSearch() {
      this.dataSet.setData([]) // 검색 버튼으로 조회 시 인피니티 페이징 초기화 필요..
      this.$nextTick(() => {
        this.search()
      })
    },
    search() {
      const queryParams = {
        salesDate: '',
        parkKindCd: '',
        personaId: '',
        contentsName: '',
        exposrYn: '',
        visitStatType1Yn: '',
        visitStatType2Yn: '',
        visitStatType3Yn: '',
        exposrLocCd: '',
        tearType1Yn: '',
        tearType2Yn: '',
        tearType3Yn: '',
        tearType4Yn: '',
        tearType5Yn: '',
      }

      queryParams.parkKindCd = PARK_KIND_CD
      queryParams.salesDate = this.params.salesDate
      queryParams.personaId = this.params.personaId
      queryParams.contentsName = encodeURI(this.params.contentsName)
      queryParams.exposrLocCd = this.params.exposrLocCd
      queryParams.exposrYn = this.getQueryParamsExposrYn()

      queryParams.visitStatType1Yn = this.statType1 ? 'Y' : ''
      queryParams.visitStatType2Yn = this.statType2 ? 'Y' : ''
      queryParams.visitStatType3Yn = this.statType3 ? 'Y' : ''

      queryParams.tearType1Yn = this.tearType1 ? 'Y' : ''
      queryParams.tearType2Yn = this.tearType2 ? 'Y' : ''
      queryParams.tearType3Yn = this.tearType3 ? 'Y' : ''
      queryParams.tearType4Yn = this.tearType4 ? 'Y' : ''
      queryParams.tearType5Yn = this.tearType5 ? 'Y' : ''

      queryParams.langKindCd = this.getQueryParamsLangKindCd()
      const params = Object.assign({}, queryParams, this.paging)

      // [인피니티 페이징]
      params.offset = this.dataSet.getViewData().length

      http.request(this.contextPageId, 'DTS_AAC_00022', {
        query: params,
        path: {},
        data: {},
      }).then(res => {
        this.dataTotalCount = res.data.totalCount
        this.dataSet.appendData(res.data.list)
      }).catch(error => {
        console.log('ERR', error)
      })
    },

    onSave() {
      const changed = this.dataSet.getChanged()
      const { updated } = changed
      if (this.validated(updated)) {
        utils.messageBox('confirm', this.$t('MSG_ALT_IS_SAV_DATA'), null, () => {
          http.request(this.contextPageId, 'DTS_AAC_00023', {
            query: {},
            path: {},
            data: {
              curationDailyDVOUpdateList: [...updated],
            },
          }).then(res => {
            if (res.data.resultCode === '0') {
              utils.messageBox('warning', this.$t('MSG_TXT_CURATION_DAILYLIST_FAIL')) // 일별큐레이션 정보를 변경하는데 실패하였습니다.
            } else {
              utils.messageBox('success', this.$t('MSG_TXT_CURATION_DAILYLIST_CHG_DATA')) // 일별큐레이션 정보가 변경 되었습니다.
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
      return true
    },
    getQueryParamsExposrYn() {
      let exposrYn
      if (this.exposrY && !this.exposrN) {
        exposrYn = 'Y'
      } else if (!this.exposrY && this.exposrN) {
        exposrYn = 'N'
      } else if (!this.exposrY && !this.exposrN) {
        exposrYn = 'x'
      }
      return exposrYn
    },
    getQueryParamsLangKindCd() {
      let langKindCd
      if (this.langKindKo && !this.langKindEl) {
        langKindCd = '1'
      } else if (!this.langKindKo && this.langKindEl) {
        langKindCd = '2'
      } else if (!this.langKindKo && !this.langKindEl) {
        langKindCd = 'NULL_ONLY'
      }
      return langKindCd
    },
  },
}
</script>
<style scoped>
</style>
