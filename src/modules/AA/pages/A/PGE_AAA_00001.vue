<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>{{ $t('MSG_TXT_USE_INQURY') }}</h4>
      </div>
      <div class="comm_scr_wrap custom_column_wrap">
        <div class="row">
          <div class="col-xs-1 ">
            {{ $t('MSG_TXT_SELECT_DATE_RANGE') }}
          </div>
          <div class="col-xs-11 direction_column align_start bgc-w">
            <ur-segment-wrapper
              v-model="searchParams.dateRangeButton"
              solid
              primary
              @click.prevent="changeDateSegment"
            >
              <ur-segment-button value="1">
                {{ $t('MSG_TXT_TODAY') }}
              </ur-segment-button>
              <ur-segment-button value="2">
                {{ $t('MSG_TXT_YESTERDAY') }}
              </ur-segment-button>
              <ur-segment-button value="3">
                3{{ $t('MSG_TXT_DAY') }}
              </ur-segment-button>
              <ur-segment-button value="4">
                1{{ $t('MSG_TXT_WEEK') }}
              </ur-segment-button>
              <ur-segment-button value="5">
                1{{ $t('MSG_TXT_MONTH') }}
              </ur-segment-button>
              <ur-segment-button value="6">
                2{{ $t('MSG_TXT_MONTH') }}
              </ur-segment-button>
              <ur-segment-button value="7">
                3{{ $t('MSG_TXT_MONTH') }}
              </ur-segment-button>
            </ur-segment-wrapper>
            <div class="mt4">
              <ur-range-picker
                v-model="searchParams.dateRange"
                :input-type="this.userDateFormat"
                :model-type="this.userDateFormat"
                clearable
                :confirm-label="$t('MSG_TXT_SELT')"
                :clear-label="$t('MSG_BTN_INTL')"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_INQURY_TYPE') }}
          </div>
          <div class="col-xs-5 bgc-w">
            <ur-dropdown
              v-model="searchParams.questTypeCd"
              :items="codes.COD_IA_VOC_QUEST_KIND"
              no-select
              :msg-no-select="$t('MSG_TXT_ALL')"
            />
          </div>
          <div class="col-xs-1">
            {{ $t('MSG_TXT_CUR_SIT') }}
          </div>
          <div class="col-xs-5 bgc-w">
            <ur-dropdown
              v-model="searchParams.procStatusCd"
              :items="codes.COD_IA_VOC_PROC_STATUS"
              no-select
              :msg-no-select="$t('MSG_TXT_ALL')"
            />
          </div>
        </div>
        <div
          class="row"
          style="border-bottom: 1px solid #cccccc;"
        >
          <div class="col-xs-1">
            {{ $t('MSG_TXT_DIV') }}
          </div>
          <div class="col-xs-5 bgc-w">
            <ur-dropdown
              v-model="searchParams.searchType"
              :items="codes.COD_IA_VOC_SEARCH_TYPE"
              :placeholder="$t('MSG_TXT_SEL')"
              no-select
              :msg-no-select="$t('MSG_TXT_ALL')"
            />
          </div>
          <div class="col-xs-1">
            {{ $t('MSG_BTN_SEARCH') }}
          </div>
          <div class="col-xs-5 bgc-w">
            <ur-text-field
              v-model="searchParams.searchText"
              width="100%"
              :placeholder="$t('MSG_TXT_INPUT_SEARCH_TXT')"
              maxlength="15"
              @keyup="onKeyUpInput"
              @keyup.enter.prevent="onClickSearchButton"
            />
          </div>
        </div>
      </div>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="onClickInitButton">
            {{ $t('MSG_BTN_INTL') }}
          </ur-button>
          <ur-button
            v-permission:read="this.$options.name"
            color="violet"
            @click="onClickSearchButton"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </ur-button>
        </div>
      </div>

      <ur-data-grid
        ref="grid"
        class="custom_grid_type1 mt35"
        :headers="columns"
        :data-source="vocList"
        :options="opts"
        :item-size="listSize"
        @grid:paging="pagingChange"
      >
        <template #right-info>
          <ur-button
            v-permission:excel="'PGE_AAA_00001'"
            @click="onClickExcelDownload"
          >
            <ur-icon
              spacing
              size="small"
              icon="download"
              icon-type="line"
            />
            {{ $t('MSG_BTN_EXCEL_DOWNLOAD') }}
          </ur-button>
        </template>
        <template #empty-view>
          <div class="empty_box">
            {{ $t('MSG_TXT_EMPTY_DATA') }}
          </div>
        </template>
      </ur-data-grid>
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>

<script>
import moment from 'moment/moment'
import { urDataSet } from 'uidev-component'
import CommonUtils from '@/modules/AA/js/common-utils'
export default {
  name: 'PGE_AAA_00001', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      userDateFormat: 'YYYY-MM-DD',
      searchParams: {
        dateRangeButton: '3',
        dateRange: [moment(utils.now('YYYY-MM-DD')).add(-3, 'days').format('YYYY-MM-DD'), utils.now('YYYY-MM-DD')],
        questTypeCd: 'CODE0000012702',
        procStatusCd: '',
        searchType: '',
        searchText: '',
        page: 1,
        rowsPerPage: 10,
      },
      initSearchParam: {
        dateRangeButton: '3',
        dateRange: [moment(utils.now('YYYY-MM-DD')).add(-3, 'days').format('YYYY-MM-DD'), utils.now('YYYY-MM-DD')],
        questTypeCd: 'CODE0000012702',
        procStatusCd: '',
        searchType: '',
        searchText: '',
        page: 1,
        rowsPerPage: 10,
      },
      CODE_KEYS: ['COD_IA_VOC_PROC_STATUS', 'COD_IA_VOC_QUEST_KIND', 'COD_IA_VOC_SEARCH_TYPE'],
      codes: {
        COD_IA_VOC_PROC_STATUS: [],
        COD_IA_VOC_QUEST_KIND: [],
        COD_IA_VOC_SEARCH_TYPE: [],
      },
      listSize: 0,
      vocList: [
      ],
      // eslint-disable-next-line new-cap
      dsExcel: new urDataSet(),
      opts: {
        resizableColumn: true,
        height: 520,
        pagination: true,
        defaultPageSize: 10,
        rowStyle: row => {
          const today = utils.now('YYYYMMDD')
          const questDtm = row.questDtm.substring(0, 10).replaceAll('-', '')

          let bgColor = '#ffffff'
          if (row.procStatusCd === '2') {
            // 보류중
            bgColor = '#fff9da'
          } else if (row.procStatusCd === '4') {
            // 배제
            bgColor = '#e4e4e4'
          } else if (row.procStatusCd === '1' || row.procStatusCd === '5') {
            // 답변완료, 전화응대
            bgColor = '#ffffff'
          } else if (today === questDtm) {
            // 오늘 업로드
            bgColor = '#b7dbfb'
          } else if (today > questDtm && row.procStatusCd === '0') {
            // 전일 업로드, 접수완료
            bgColor = '#ffe5e5'
          } else {
            bgColor = '#ffffff'
          }

          return { 'background-color': bgColor }
        },
      },
      searchFieldOldText: '',
    }
  },
  computed: {
    columns() {
      const that = this
      const columns = [
        {
          text: this.$t('MSG_TXT_SERIAL'), value: 'vocId', width: 150, minWidth: 150,
        },
        {
          text: this.$t('MSG_TXT_ANSWER_TYPE'), value: 'questTypeCd', minWidth: 150, width: 150, type: 'code', domain: this.codes.COD_IA_VOC_QUEST_KIND,
        },
        {
          text: this.$t('MSG_TXT_SUBJT'),
          value: 'questTitle',
          formatter: 'selectTableCode',
          component: {
            props: ['row', 'value', 'text'],
            template: '<div><ur-button shape="hyperlink" @click.stop="clickCheck(row)">{{text}}</ur-button></div>',
            methods: {
              clickCheck(row) {
                that.onRowClickEvent(row)
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_INQUIRER_NM'), value: 'questPersnUsrNm', width: 100, minWidth: 100,
        },
        {
          text: this.$t('MSG_TIT_DRAT_DT'),
          width: 150,
          minWidth: 150,
          value: 'questDtm',
        },
        {
          text: this.$t('MSG_TXT_CUR_SIT'),
          value: 'procStatusCd',
          width: 100,
          minWidth: 100,
          type: 'code',
          domain: this.codes.COD_IA_VOC_PROC_STATUS,
        },
        { text: this.$t('MSG_TXT_ICS_REGI_YN'), value: 'integrCsRgstYn', width: 150 },
      ]
      return columns
    },
  },
  watch: {
  },
  created() {
    this.selectCode()
  },
  mounted() {
    const params = utils.getParameter(this, 'params')
    if (params !== undefined && typeof (params) === 'object') {
      // eslint-disable-next-line max-len
      this.searchParams.dateRangeButton = params.dateRangeButton || this.initSearchParam.dateRangeButton
      this.searchParams.dateRange[0] = params.dateRangeBegin || this.initSearchParam.dateRange[0]
      this.searchParams.dateRange[1] = params.dateRangeEnd || this.initSearchParam.dateRange[1]
      this.searchParams.questTypeCd = params.questTypeCd
      this.searchParams.procStatusCd = params.procStatusCd || this.initSearchParam.procStatusCd
      this.searchParams.searchType = params.searchType || this.initSearchParam.searchType
      this.searchParams.searchText = params.searchText || this.initSearchParam.searchText
      this.searchParams.rowsPerPage = params.rowsPerPage || this.initSearchParam.rowsPerPage
      this.searchParams.page = params.page || this.initSearchParam.page
      if (params.page) {
        this.search()
        this.$refs.grid.setCurrentPage(_.toInteger(params.page))
      }
    } else {
      this.onClickInitButton()
    }
  },
  methods: {
    async selectCode() {
      await http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
    },
    onClickSearchButton() {
      this.search()
    },
    getSearchParam() {
      const params = {
        dateRangeButton: this.searchParams.dateRangeButton,
        dateRangeBegin: this.searchParams.dateRange[0],
        dateRangeEnd: this.searchParams.dateRange[1],
        questTypeCd: this.searchParams.questTypeCd,
        procStatusCd: this.searchParams.procStatusCd,
        searchType: this.searchParams.searchType,
        searchText: encodeURI(this.searchParams.searchText),
        rowsPerPage: this.searchParams.rowsPerPage,
        page: this.searchParams.page,
      }
      return params
    },
    search() {
      if (_.isEmpty(this.searchParams.dateRange[0])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SELECT_DATE_RANGE')))
        return
      }
      if (_.isEmpty(this.searchParams.dateRange[1])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SELECT_DATE_RANGE')))
        return
      }
      if (moment(this.searchParams.dateRange[1]).isAfter(moment(this.searchParams.dateRange[1]))) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_TXT_IA_DATE_START_END_ORDER'), this.$t('MSG_TXT_SELECT_DATE_RANGE')))
        return
      }

      const params = this.getSearchParam()
      http.request(this.$options.name, 'DTS_AAA_00001', {
        query: params,
      }).then(res => {
        if (res.data) {
          this.vocList = res.data.list
          this.listSize = res.data.totalCount
        }
      }).catch(error => {
        console.log(error)
      })
    },
    changeDateSegment() {
      this.$nextTick(() => {
        let searchStartDate = utils.now('YYYY-MM-DD')
        switch (this.searchParams.dateRangeButton) {
        case '1':
          searchStartDate = moment(searchStartDate).format('YYYY-MM-DD')
          break
        case '2':
          searchStartDate = moment(searchStartDate).add(-1, 'days').format('YYYY-MM-DD')
          break
        case '3':
          searchStartDate = moment(searchStartDate).add(-3, 'days').format('YYYY-MM-DD')
          break
        case '4':
          searchStartDate = moment(searchStartDate).add(-7, 'days').format('YYYY-MM-DD')
          break
        case '5':
          searchStartDate = moment(searchStartDate).add(-1, 'months').format('YYYY-MM-DD')
          break
        case '6':
          searchStartDate = moment(searchStartDate).add(-2, 'months').format('YYYY-MM-DD')
          break
        case '7':
          searchStartDate = moment(searchStartDate).add(-3, 'months').format('YYYY-MM-DD')
          break
        default:
        }
        this.searchParams.dateRange = [searchStartDate, utils.now('YYYY-MM-DD')]
      })
    },
    pagingChange(paging) {
      this.searchParams.rowsPerPage = paging.rowsPerPage
      this.searchParams.page = paging.currentPage
      this.search()
    },
    onClickInitButton() {
      this.searchParams = JSON.parse(JSON.stringify(this.initSearchParam))
    },
    onRowClickEvent(row) {
      const params = {
        vocId: row.vocId,
        dateRangeButton: this.searchParams.dateRangeButton,
        dateRangeBegin: this.searchParams.dateRange[0],
        dateRangeEnd: this.searchParams.dateRange[1],
        questTypeCd: this.searchParams.questTypeCd,
        procStatusCd: this.searchParams.procStatusCd,
        searchType: this.searchParams.searchType,
        searchText: this.searchParams.searchText,
        rowsPerPage: this.searchParams.rowsPerPage,
        page: this.searchParams.page,
      }
      utils.goPage('PGE_AAA_00002', { params })
    },
    onClickExcelDownload() {
      if (_.isEmpty(this.searchParams.dateRange[0])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SELECT_DATE_RANGE')))
        return
      }
      if (_.isEmpty(this.searchParams.dateRange[1])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SELECT_DATE_RANGE')))
        return
      }

      const params = this.getSearchParam()
      delete params.page
      delete params.rowsPerPage
      params.excelYn = 'Y'

      http.request(this.$options.name, 'DTS_AAA_00001', {
        query: params,
      }).then(res => {
        const list = CommonUtils.mapCode(res.data.list, this.columns)

        this.dsExcel.setData(list) // 데이터 셋에 데이터를 넣는 함수


        const sPageId = this.$options.name
        const objGridColumns = this.columns
        const objGridDataset = this.dsExcel

        const sToday = utils.now('YYYYMMDDHHmmss')
        const sExcelName = `voc_list${sToday}.xlsx`

        utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName)
      }).catch(error => {
        console.log(error)
      })
    },
    onKeyUpInput() {
      // _ 제외 특수문자 입력제한
      const searchFieldNewText = this.searchParams.searchText
      if (utils.isExistSpecialChar(searchFieldNewText)) {
        utils.messageBox('warning', this.$t('MSG_ALT_NO_SPECL_CHAR'), null, () => {
          this.searchParams.searchText = this.searchFieldOldText
        })
      } else {
        this.searchFieldOldText = searchFieldNewText
      }
    },
  },
}

</script>
<style lang="scss">

</style>
