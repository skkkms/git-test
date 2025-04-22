<template>
  <div>
    <ur-form-box toggleable>
      <!-- [검색조건] 퍼소나 유형 -->
      <ur-form-item
        :label="$t('MSG_TXT_PERSON_TYPE')"
        :label-align="'right'"
        style="width: 50%; height: auto;"
        class="flex_wrap"
      >
        <ur-text-field
          ref="personaDelect"
          v-model="resData.personaSelect"
          :readonly="true"
          :checkbox-mode="false"
          style="width: 100%;"
        />
        <ur-icon-button
          icon="search"
          icon-type="line"
          color="primary"
          @click="openModalP01"
        />
        <!-- [MODEL 오픈] 퍼소나유형 -->
        <ur-modal
          ref="modal"
          class="modal-b1c6"
          large
          :label="$t('MSG_TXT_PERSON_TYPE')"
          :page-id="contextPageId"
          @set-persona-id="setPesonaId"
        />
      </ur-form-item>
      <!-- [검색조건] 콘텐츠 명 -->
      <ur-form-item
        :label="$t('MSG_TXT_TIT_CNT_NAME')"
        :label-align="'right'"
        style="width: 50%; height: auto;"
        class="flex_wrap"
      >
        <ur-text-field
          v-model="resData.contentsName"
          style="width: 100%;"
          maxlength="100"
          @keyup.enter="onSearch"
        />
      </ur-form-item>
      <!-- [체크박스] 노출여부 -->
      <ur-form-item
        :label="$t('MSG_TXT_EXPOSR_YN')"
        :label-align="'right'"
        style="width: 50%; height: auto;"
        class="flex_wrap"
      >
        <ur-checkbox
          v-model="viewY"
          sm
        /><span class="check_label"> {{ $t('MSG_TXT_EXPOSR_YN01') }} </span>
        <ur-checkbox
          v-model="viewN"
          sm
        /><span class="check_label"> {{ $t('MSG_TXT_EXPOSR_YN02') }} </span>
      </ur-form-item>
      <!-- [체크박스] 방문상태 -->
      <ur-form-item
        v-model="resData.statType"
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
      <!-- [검색조건] 노출위치 -->
      <ur-form-item
        :label="$t('MSG_TXT_EXPOSR_LCT')"
        :label-align="'right'"
        style="width: 50%; height: auto;"
        class="flex_wrap"
      >
        <ur-dropdown
          v-model="resData.exposrLocCd"
          :items="COD_IA_CURATION_EXPOSR_LOC"
          no-select="no-select"
          :msg-no-select="$t('MSG_TXT_ALL')"
        />
      </ur-form-item>
      <!-- [체크박스] 언어구분 -->
      <ur-form-item
        :label="$t('MSG_TXT_LANG_DIV')"
        :label-align="'right'"
        style="width: 50%; height: auto;"
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
      <ur-form-item
        :label="$t('MSG_TXT_USE_YN')"
        :label-align="'right'"
        style="width: 50%; height: auto;"
        class="flex_wrap"
      >
        <ur-checkbox
          v-model="useY"
          sm
        /><span class="check_label"> {{ $t('MSG_TXT_EXPOSR_YN01') }} </span>
        <ur-checkbox
          v-model="useN"
          sm
        /><span class="check_label"> {{ $t('MSG_TXT_EXPOSR_YN02') }} </span>
      </ur-form-item>

      <!-- [대상자 제어] 티어 -->
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_MEMSHP_T')"
        :label-align="'right'"
        style="width: 50%; height: auto;"
      >
        <ur-checkbox-wrapper
          ref="tearTypeCheckbox"
          v-model="tearTypeCd"
          :items="codes.COD_IA_TEAR"
          sm
        />
      </ur-form-item>
    </ur-form-box>
    <div class="btn_wrap mt10">
      <div class="right_box">
        <!-- [버튼] 초기화  -->
        <ur-button
          @click="onReset"
        >
          {{ $t('MSG_BTN_RESET') }}
        </ur-button>
        <!-- [버튼] 검색  -->
        <ur-button
          v-permission:read="contextPageId"
          color="violet"
          @click="onSearch"
        >
          {{ $t('MSG_BTN_SEARCH') }}
        </ur-button>
      </div>
    </div>
    <ur-data-grid
      ref="grid"
      :class="gridClass"
      :headers="gridColumns0"
      :data-source="dataSet"
      :options="gridOpts"
      :data-set-options="{id: 'curationId'}"
      :item-size="dataTotalCount"
      @grid:scroll-bottom="scrollBottom"
      @grid:paging="pagingChange"
    >
      <template #right-info>
        <span class="guid_txt mr16">
          *파일 용량 : 5MB 미만
        </span>
        <!-- [버튼] 동기화 -->
        <ur-button
          color="violet"
          @click="clickPlrf"
        >
          {{ $t('MSG_TXT_PERF') }}
        </ur-button>
        <!-- [버튼] 엑셀형식 다운로드 -->
        <ur-button
          v-permission:excel="contextPageId"
          @click="onClickDetailExcelFormDownload"
        >
          <ur-icon
            icon="download"
            icon-type="line"
            size="small"
            spacing
          />
          {{ $t('MSG_BTN_EXCEL_FORM_DOWNLOAD') }}
        </ur-button>
        <ur-button
          v-permission:excel="contextPageId"
          @click="onExcelUpload"
        >
          <!-- [버튼] 엑셀업로드 -->
          <ur-icon
            icon="upload"
            icon-type="line"
            size="small"
            spacing
          />
          {{ $t('MSG_TXT_EXCEL_UPLOAD') }}
        </ur-button>
      </template>
    </ur-data-grid>
    <div class="btn_wrap mt10">
      <div class="right_box">
        <!-- [버튼] 삭제 -->
        <ur-button
          v-permission:delete="contextPageId"
          @click="onDelete"
        >
          {{ $t('MSG_BTN_DEL') }} <!-- 삭제 -->
        </ur-button>
        <!-- [버튼] 신규등록 -->
        <ur-button
          color="violet"
          @click="onNewFacilt"
        >
          {{ $t('MSG_BTN_RGST_NEW') }} <!-- 신규 등록 -->
        </ur-button>
      </div>
    </div>
    <!-- 엑셀업로드 -->
    <input
      v-show="false"
      ref="excelFile"
      type="file"
      accept=".xlsx"
      @change="onChangeExcelFile"
    >
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component'
import CommonUtils from '~aa/js/common-utils'
const PARK_KIND_CD = '02' // '01' 에버랜드 , '02' 캐리비안베이
const INFINITY_SCROLL_YN = 'N' // Y : 인피니티 스크롤 , N : 페이징

export default {
  name: 'PGE_AAB_00012_T02', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      CODE_KEYS: ['COD_IA_EL_CURATION_EXPOSR_LOC', 'COD_IA_CB_CURATION_EXPOSR_LOC', 'COD_RS_LANG_KIND', 'COD_IA_CURATION_CONTENT_KIND', 'COD_IA_TEAR', 'COD_IA_EVENT_CLASS'],
      codes: {
        COD_IA_EL_CURATION_EXPOSR_LOC: [],
        COD_IA_CB_CURATION_EXPOSR_LOC: [],
        COD_RS_LANG_KIND: [],
        COD_IA_CURATION_CONTENT_KIND: [],
        COD_IA_TEAR: [],
        COD_IA_EVENT_CLASS: [],
      },

      dataTotalCount: 0,
      dataSet: new this.$ur.grid.DataSet(),
      paging: {
        currentPage: 1,
        rowsPerPage: 10,
      },

      resData: {
        parkKindCd: PARK_KIND_CD,
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
        contentsName: '',
        personaSelect: '',
        personaId: '',
        exposrLocCd: '',
        mselectData: {
          COD_IA_COMPANAION_EL: {
            label: '',
            key: '',
          },
          COD_IA_PLAY_TYPE_EL: {
            label: '',
            ke: '',
          },
        },
      },
      viewY: true,
      viewN: true,
      statType1: true,
      statType2: true,
      statType3: true,
      langKindKo: true,
      langKindEl: true,
      useY: true,
      useN: true,
      tearTypeCd: ['T1', 'T2', 'T3', 'T4', 'T5'],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // [부모 페이지 ID]
    contextPageId() {
      return this.$attrs['page-id']
    },
    COD_IA_CURATION_EXPOSR_LOC() {
      if (this.resData.parkKindCd === '02') return this.codes.COD_IA_CB_CURATION_EXPOSR_LOC
      return this.codes.COD_IA_EL_CURATION_EXPOSR_LOC
    },
    grid() {
      return this.$refs.grid
    },
    gridClass() {
      return INFINITY_SCROLL_YN === 'Y' ? 'custom_grid_pgeNav_None mt35' : 'custom_grid_type1 mt35'
    },
    gridOpts() {
      return {
        infinityScroll: true,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
        selectCheckOnly: true,
        resizableColumn: true,
        height: INFINITY_SCROLL_YN === 'Y' ? 470 : 520,
      }
    },
    gridColumns0() {
      return [
        {
          text: this.$t('MSG_TXT_NUMBER_ABBR'),
          value: 'rnum',
          width: 50,
          minWidth: 50,
        },
        {
          text: this.$t('MSG_TXT_TIT_CNT_NAME'),
          value: 'contentsName',
          customStyle: () => ({ 'text-decoration': 'underline' }),
          customValue: v => v || '-',
          click: (v, r) => {
            const searchParam = {
              parkKindCd: PARK_KIND_CD,
              personaId: this.resData.personaId,
              personaSelect: this.resData.personaSelect,
              contentsName: this.resData.contentsName,
              viewN: this.viewN,
              viewY: this.viewY,
              statType1: this.statType1,
              statType2: this.statType2,
              statType3: this.statType3,
              exposrLocCd: this.resData.exposrLocCd,
              langKindKo: this.langKindKo,
              langKindEl: this.langKindEl,
              useY: this.useY,
              useN: this.useN,
              tearTypeCd: this.tearTypeCd,
            }
            const params = Object.assign({}, searchParam, this.paging, { curationId: r.curationId })
            utils.goPage('PGE_AAB_00014', { params })
          },
        },
        {
          text: this.$t('MSG_TXT_LANG_DIV'),
          value: 'langKindNm',
          width: 80,
          minWidth: 80,
          customValue: v => v || '-',
        },
        {
          text: this.$t('MSG_TXT_USE_YN'),
          value: 'useYn',
          width: 80,
          minWidth: 80,
          customValue: v => v || '-',
        },
        {
          text: this.$t('MSG_TXT_EXPOSR_YN'),
          value: 'exposrYn',
          width: 80,
          minWidth: 80,
        },
        {
          text: this.$t('MSG_TXT_EXPOSR_ORDER'), // 노출 순서
          value: 'exposrOrder',
          width: 80,
          minWidth: 80,
          customValue: v => (v ? utils.numberFormat(v) : '-'),
        },
        {
          text: this.$t('MSG_TXT_EXPOSR_LCT'),
          value: 'exposrLocNm',
          width: 130,
          minWidth: 130,
          customValue: v => v || '-',
        },
        {
          text: this.$t('MSG_TIT_CNTN_MGMT'),
          value: 'contentKindNm',
          width: 120,
          minWidth: 120,
          customValue: (v, r) => {
            let customValue = v
            if (r.contentKindCd === '04') {
              customValue = CommonUtils.getCodeText(this.codes.COD_IA_EVENT_CLASS, r.eventClassCd)
              if (!customValue.endsWith(v)) {
                customValue = `${customValue} ${v}`
              }
            }
            return customValue || '-'
          },
        },
        {
          text: this.$t('MSG_TXT_PERSON_CD'),
          value: 'personaCodes',
          width: 150,
          minWidth: 150,
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
          component: {
            props: ['row', 'value', 'text'],
            template: '<div>{{visitStatType}}</div>',
            computed: {
              visitStatType() {
                const statType = []
                if (this.row.visitStatType1Yn === 'Y') {
                  statType.push('전')
                }
                if (this.row.visitStatType2Yn === 'Y') {
                  statType.push('중')
                }
                if (this.row.visitStatType3Yn === 'Y') {
                  statType.push('후')
                }
                return statType.join('/ ')
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_MEMSHP_T'),
          value: 'tearTypeNm',
          width: 170,
          minWidth: 170,
          customValue: v => {
            let customValue = v.trim()
            if (customValue.endsWith('/')) {
              customValue = customValue.slice(0, -1)
            }
            return customValue || '-'
          },
        },
      ]
    },
  },
  mounted() {
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)

    const params = utils.getParameter(this, 'params')
    if (!utils.isEmpty(params)) {
      this.resData.personaId = params.personaId
      this.resData.personaSelect = params.personaSelect
      this.resData.contentsName = params.contentsName
      this.viewN = params.viewN
      this.viewY = params.viewY
      this.statType1 = params.statType1
      this.statType2 = params.statType2
      this.statType3 = params.statType3
      this.resData.exposrLocCd = params.exposrLocCd
      this.langKindKo = params.langKindKo
      this.langKindEl = params.langKindEl
      this.useY = params.useY
      this.useN = params.useN
      this.tearTypeCd = params.tearTypeCd
      this.onSearch()
      return
    }
    this.search()
  },
  methods: {
    // [퍼소나유형 모달]
    setPesonaId(selected) {
      if (!utils.isEmpty(selected)) {
        this.resData.personaId = selected.personaId
        this.resData.personaSelect = `${selected.companaionNm},${selected.playTypeNm}`
      }
    },

    openModalP01() {
      utils.openLayerPopup('PGE_AAB_00044', this.setPesonaId, {
        pageInitialData: {
          parkKindCd: PARK_KIND_CD,
        },
      })
    },
    onReset() {
      this.resData.exposrLocCd = ''
      this.resData.contentsName = ''
      this.resData.personaSelect = ''
      this.resData.personaId = ''
      this.viewY = true
      this.viewN = true
      this.statType1 = true
      this.statType2 = true
      this.statType3 = true
      this.langKindKo = true
      this.langKindEl = true
      this.useY = true
      this.useN = true
    },
    scrollBottom() {
      const totalSize = this.dataTotalCount
      const currentSize = this.dataSet.totalSize
      if (INFINITY_SCROLL_YN === 'Y' && totalSize > currentSize) {
        this.search()
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
      this.search()
    },
    onSearch() {
      this.dataSet.setData([]) // 검색 버튼으로 조회 시 인피니티 페이징 초기화 필요..
      this.$nextTick(() => {
        this.search()
      })
    },

    search(IS_EXCEL_DOWNLOAD) {
      const queryParams = {
        parkKindCd: '',
        personaId: '',
        contentsName: '',
        exposrLocCd: '',
        exposrYn: '',
        useYn: '',
        visitCntType0Yn: '',
        visitCntType1Yn: '',
        visitCntType2Yn: '',
        visitCntType3Yn: '',
        visitStatType1Yn: '',
        visitStatType2Yn: '',
        visitStatType3Yn: '',
        langKindKo: '',
        langKindEl: '',
        tearType1Yn: '',
        tearType2Yn: '',
        tearType3Yn: '',
        tearType4Yn: '',
        tearType5Yn: '',
      }
      queryParams.parkKindCd = PARK_KIND_CD

      queryParams.exposrYn = this.getQueryParamsExposrYn()

      queryParams.useYn = this.getQueryParamsUseYn()

      queryParams.visitStatType1Yn = this.statType1 ? 'Y' : ''
      queryParams.visitStatType2Yn = this.statType2 ? 'Y' : ''
      queryParams.visitStatType3Yn = this.statType3 ? 'Y' : ''

      queryParams.langKindCd = this.getQueryParamsLangKindCd()

      queryParams.contentsName = encodeURI(this.resData.contentsName)
      queryParams.exposrLocCd = this.resData.exposrLocCd
      queryParams.personaId = this.resData.personaId

      queryParams.tearType1Yn = this.tearTypeCd.indexOf('T1') >= 0 ? 'Y' : ''
      queryParams.tearType2Yn = this.tearTypeCd.indexOf('T2') >= 0 ? 'Y' : ''
      queryParams.tearType3Yn = this.tearTypeCd.indexOf('T3') >= 0 ? 'Y' : ''
      queryParams.tearType4Yn = this.tearTypeCd.indexOf('T4') >= 0 ? 'Y' : ''
      queryParams.tearType5Yn = this.tearTypeCd.indexOf('T5') >= 0 ? 'Y' : ''


      // 페이징
      const query = Object.assign({}, queryParams, this.paging)

      // 인피니티 페이징
      if (INFINITY_SCROLL_YN === 'Y') {
        query.infinityOffset = this.dataSet.getViewData().length // 서버 조회 시 인피니티 페이징 결과를 내려준다.
      } else {
        query.infinityOffset = -1
      }

      // NO 페이징
      if (IS_EXCEL_DOWNLOAD) {
        query.noPagingYn = 'Y' // 서버 조회 시 페이징 처리 없이 모든 데이터를 내려준다.
      }

      http.request(this.contextPageId, 'DTS_AAB_00012', {
        query,
      }).then(res => {
        if (IS_EXCEL_DOWNLOAD === true) {
          const dsData = new urDataSet() // eslint-disable-line new-cap
          res.data.list.forEach(el => {
            const statType = []
            if (el.visitStatType1Yn === 'Y') {
              statType.push('전')
            }
            if (el.visitStatType2Yn === 'Y') {
              statType.push('중')
            }
            if (el.visitStatType3Yn === 'Y') {
              statType.push('후')
            }
            // eslint-disable-next-line no-param-reassign
            el.visitStatTypeNm = statType.join('/ ')
          })
          dsData.setData(res.data.list)
          const sPageId = this.$contextPageId
          const objGridColumns = this.gridColumns0
          const objGridDataset = dsData
          const sToday = utils.now('YYYYMMDDHHmmss')
          const sExcelName = `${this.$t('MSG_TIT_IAA_C01')}_${sToday}.xlsx`
          utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {})
        } else if (INFINITY_SCROLL_YN === 'Y') {
          this.dataSet.appendData(res.data.list)
        } else {
          this.dataSet.setData(res.data.list)
        }
        this.dataTotalCount = res.data.totalCount
      }).catch(error => {
        console.log(error)
      })
    },
    onDelete() {
      const selectedRows = this.grid.getSelected()

      if (utils.isEmpty(selectedRows)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM')) // 선택 된 항목이 없습니다.
        return
      }

      const curationIdList = []
      if (Array.isArray(selectedRows)) {
        utils.forEach(selectedRows, row => {
          curationIdList.push(row.curationId)
        })
      } else {
        if (utils.isEmpty(selectedRows.curationId)) {
          utils.messageBox('warning', this.$t('MSG_ALT_IAA_CURATION_IDNO')) // 선택 된 항목에 큐레이션 ID가 없습니다.
          return
        }
        curationIdList.push(selectedRows.curationId)
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_IS_DEL_DATA'), null, () => { // 삭제하시겠습니까?
        http.request(this.contextPageId, 'DTS_AAC_00002', {
          query: {
            curationIdList: utils.join(curationIdList, '|'),
          },
          data: {},
        }).then(res => {
          if (res.data.resultCode === '1') {
            utils.messageBox('success', this.$t('MSG_ALT_DELETED'), null, this.onSearch()) // 삭제되었습니다.
          } else {
            utils.messageBox('failure', this.$t('MSG_ALT_DEL_ERROR'), null, null) // 삭제가 실패하였습니다.
          }
        })
      })
    },

    // 신규등록
    onNewFacilt() {
      const searchParam = {
        parkKindCd: PARK_KIND_CD,
        personaId: this.resData.personaId,
        personaSelect: this.resData.personaSelect,
        contentsName: this.resData.contentsName,
        faciltNms: this.faciltNms,
        viewN: this.viewN,
        viewY: this.viewY,
        useY: this.useY,
        useN: this.useN,
        statType1: this.statType1,
        statType2: this.statType2,
        statType3: this.statType3,
        exposrLocCd: this.resData.exposrLocCd,
        langKindKo: this.langKindKo,
        langKindEl: this.langKindEl,
        tearTypeCd: this.tearTypeCd,
      }
      const params = Object.assign({}, searchParam, this.paging)
      utils.goPage('PGE_AAB_00013', { params })
    },

    // [엑셀다운로드]
    onExcelDnLoad() {
      this.search(true)
    },
    // [동기화]
    clickPlrf() {
      utils.messageBox('confirm', this.$t('MSG_TXT_PERF_GO'), null, () => {
        http.request(this.contextPageId, 'DTS_AAC_00020', {
          query: {
            parkKindCd: PARK_KIND_CD,
          },
          path: {},
          data: {},
        }).then(res => {
          if (res.data.resultCode === '1') {
            utils.messageBox('success', res.data.msg, null, this.onSearch())
          } else {
            utils.messageBox('failure', res.data.msg, null, null)
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },

    // [엑셀형식 다운로드]
    onClickDetailExcelFormDownload() {
      const sToday = utils.now('YYYYMMDDHHmmss')
      let parkName
      if (this.resData.parkKindCd === '01') parkName = '에버랜드'
      else if (this.resData.parkKindCd === '02') parkName = '캐리비안 베이'

      const { pageId } = this
      const columns = [
        {
          text: this.$t('콘텐츠명'), // 콘텐츠명
          type: 'text',
          width: 30,
        },

        {
          text: this.$t('언어구분'), // 언어구분
          type: 'code',
          domain: this.codes.COD_RS_LANG_KIND,
          width: 15,
        },
        {
          text: this.$t('노출순서'), // 노출순서
          type: 'text',
          memo: {
            text: '숫자이외에 입력불가',
            wSize: 3,
            hSize: 2,
          },
          width: 15,
        },
        {
          text: this.$t('노출위치'), // 노출위치
          type: 'code',
          domain: this.COD_IA_CURATION_EXPOSR_LOC,
          width: 15,
        },
        {
          text: this.$t('퍼소나 코드'), // 퍼소나 코드
          type: 'text',
          memo: {
            text: '숫자이외에 입력불가, 퍼소나 코드를 정확하게 입력하십시오 ex) 01',
            wSize: 3,
            hSize: 2,
          },
          width: 15,
        },
        {
          text: this.$t('콘텐츠관리1'), // 콘텐츠관리1
          type: 'code',
          domain: this.codes.COD_IA_CURATION_CONTENT_KIND,
          width: 15,
        },
        {
          text: this.$t('콘텐츠관리2'), // 콘텐츠관리2
          type: 'test',
          memo: {
            text: '콘텐츠관리1에 해당하는 ID를 입력하세요 (스마트예약 - 상품ID 입력해주세요.)',
            wSize: 3,
            hSize: 5,
          },
          width: 30,
        },
        {
          text: this.$t('방문횟수'), // 방문횟수
          type: 'test',
          memo: {
            text: '[방문횟수: 0회, 1~2회, 3~4회, 5회이상]',
            wSize: 3,
            hSize: 5,
          },
          width: 30,
        },
        {
          text: this.$t('방문상태'), // 방문상태
          type: 'test',
          memo: {
            text: '[방문상태: 방문 전, 방문 중, 방문 후]',
            wSize: 3,
            hSize: 5,
          },
          width: 30,
        },
        {
          text: this.$t('멤버십등급'), // 멤버십등급
          type: 'test',
          memo: {
            text: '[멤버십등급: T1, T2, T3, T4, T5]',
            wSize: 3,
            hSize: 5,
          },
          width: 20,
        },
      ]
      const excelFileName = `${this.$t('큐레이션 엑셀양식다운로드')}_${parkName}_${sToday}.xlsx`
      CommonUtils.downloadExcelForm(pageId, columns, excelFileName)
    },

    onExcelUpload() {
      this.$refs.excelFile.value = null
      this.$refs.excelFile.click()
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

        const formData = new FormData()
        formData.append('file', file)
        http.request(this.contextPageId, 'DTS_AAC_00026', {
          query: {
            contentsNameDupChkYn: 'Y',
          },
          path: {
            'park-kind-cd': PARK_KIND_CD,
          },
          data: formData,
        }).then(res => {
          if (res.data.resultCode === '0') {
            utils.messageBox('warning', res.data.msg)
          } else if (res.data.resultCode === '2') {
            utils.messageBox('confirm', this.$t('컨텐츠명이 동일한 큐레이션이 이미 존재 합니다. \n계속 진행하시겠습니까? \n') + res.data.msg, null, () => { '컨텐츠명이 동일한 큐레이션이 이미 존재 합니다. 계속 진행하시겠습니까?'
              http.request(this.contextPageId, 'DTS_AAC_00026', {
                query: {
                  contentsNameDupChkYn: 'N',
                },
                path: {
                  'park-kind-cd': PARK_KIND_CD,
                },
                data: formData,
              }).then(res2 => {
                utils.messageBox('warning', res2.data.msg)
                this.onSearch()
              }).catch(error => {
                console.log(error)
              })
            })
          } else {
            utils.messageBox('warning', res.data.msg)
            this.onSearch()
          }
        })
      }
    },

    getQueryParamsExposrYn() {
      let exposrYn
      if (this.viewY && !this.viewN) {
        exposrYn = 'Y'
      } else if (!this.viewY && this.viewN) {
        exposrYn = 'N'
      } else if (!this.viewY && !this.viewN) {
        exposrYn = 'x'
      }
      return exposrYn
    },

    getQueryParamsUseYn() {
      let useYn
      if (this.useY && !this.useN) {
        useYn = 'Y'
      } else if (!this.useY && this.useN) {
        useYn = 'N'
      } else if (!this.useY && !this.useN) {
        useYn = 'x'
      }
      return useYn
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
