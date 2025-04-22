<template>
  <div>
    <ur-form-box toggleable>
      <!-- 구분 -->
      <ur-form-item
        :label="$t('MSG_TXT_DIV')"
        label-align="right"
        class="flex_wrap"
        style="width:50%; height: auto;"
        required
      >
        <ur-dropdown
          v-model="searchType"
          :items="codes.COD_IA_EVENT_CURRENT_MEMBER_SEARCH_TYPE"
          style="width: 100%; height: auto;"
          no-select
          :msg-no-select="$t('MSG_BTN_SELT')"
          @input="() => searchText = ''"
        />
      </ur-form-item>
      <!-- 항목 명 -->
      <ur-form-item
        :label="$t('MSG_TXT_ITEM_NAME')"
        label-align="right"
        class="flex_wrap"
        style="width:50%; height: auto;"
        required
      >
        <ur-date-picker
          v-if="searchType === '003'"
          v-model="searchText"
          :today-label="$t('MSG_BTN_TODAY')"
          :confirm-label="$t('MSG_TXT_SELT')"
          model-type="YYYYMMDD"
          style="width: 100%; height: auto;"
        />
        <ur-dropdown
          v-else-if="searchType === '002' && resultSearchType === 'dropdown'"
          v-model="searchText"
          :items="resultSearchData"
          no-select
          :msg-no-select="$t('MSG_BTN_SELT')"
          style="width: 100%; height: auto;"
        />
        <ur-radio-wrapper
          v-else-if="searchType === '002' && resultSearchType === 'radio'"
          v-model="searchText"
          :items="resultSearchData"
          style="width: 100%; height: auto;"
        />
        <ur-dropdown
          v-else-if="searchType === '004'"
          v-model="searchText"
          :items="gvmyName"
          no-select
          :msg-no-select="$t('MSG_BTN_SELT')"
          style="width: 100%; height: auto;"
        />
        <ur-text-field
          v-else
          v-model="searchText"
          maxlength="10"
          style="width: 100%; height: auto;"
        />
      </ur-form-item>
    </ur-form-box>

    <div class="btn_wrap mt10">
      <div class="right_box">
        <ur-button @click="onClickReset">
          {{ $t('MSG_BTN_INTL') }}
        </ur-button>
        <ur-button
          color="violet"
          @click="onClickSearch"
        >
          {{ $t('MSG_BTN_SEARCH') }}
        </ur-button>
      </div>
    </div>

    <ur-data-grid
      ref="grid"
      :headers="memberColumnHeader"
      :data-source="memberList"
      :options="opts"
      :data-set-options="{id: 'id'}"
      :item-size="itemSize"
      class="custom_grid_pgeNav_None mt35"
      @grid:paging="onPagingEventPublctGrid"
      @grid:scroll-bottom="onBottomEventPublctGrid"
    >
      <template
        #right-info
      >
        <ur-button
          v-permission:excel="pageId"
          @click="onClickDownloadExcel"
        >
          <ur-icon
            icon="download"
            icon-type="line"
            size="small"
            spacing
          />
          {{ $t('MSG_TXT_EXCEL_DOWNLOAD') }}
        </ur-button>
      </template>
    </ur-data-grid>
  </div>
</template>
<script>

import { urDataSet } from 'uidev-component'
import CommonUtils from '@/modules/AA/js/common-utils'

export default {
  name: 'PGE_AAG_00002_S03', // eslint-disable-line vue/name-property-casing
  props: {
    pageId: {
      type: String,
      required: true,
      default: null,
    },
    eventId: {
      type: String,
      required: true,
      default: null,
    },
    eventClassCd: {
      type: String,
      required: true,
      default: null,
    },
    rewrdData: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      codeKeys: [
        'COD_IA_EVENT_CURRENT_MEMBER_SEARCH_TYPE',
      ],
      codes: {
        COD_IA_EVENT_CURRENT_MEMBER_SEARCH_TYPE: [],
      },
      memberList: new urDataSet(), // eslint-disable-line new-cap
      opts: { // 토탈o
        height: 474, // 522(10), 762(15), 1482(30)
        resizableColumn: true,
        pagination: true,
        selectCheckOnly: true,
        msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
        defaultPageSize: 10,
      },
      searchType: '',
      searchText: '',
      resultTitle: '',
      joinDtmTitle: '',
      resultSearchType: '',
      resultSearchData: [],
      gvmyName: [],
      rowsPerPage: '10',
      offset: 0,
      itemSize: 0,
    }
  },
  computed: {
    memberColumnHeader() {
      const hide = (this.eventClassCd !== '04')
      const that = this
      const columns = [
        {
          text: this.$t('MSG_TXT_NUMBER_ABBR'), value: 'no', width: 50, minWidth: 50,
        },
        {
          text: this.$t('MSG_TXT_MEM_NUM'),
          value: 'memshpUid',
        },
        {
          text: this.resultTitle,
          value: 'eventPartcpResult',
          width: 200,
          type: 'custom',
          customValue: (v, r) => {
            if (that.eventClassCd === '02') {
              return r.attainCondName
            }
            if (that.eventClassCd === '03') {
              if (r.rewrdKindCd === '99') {
                return this.$t('MSG_TXT_IAA_KKUNG')
              }
              return r.rewrdName
            }
            return v
          },
        },
        {
          text: this.joinDtmTitle,
          value: 'joinDtm',
          width: 150,
          minWidth: 150,
          type: 'datetime',
          customValue: v => {
            const customValue = moment(v, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
            return customValue
          },
        },
        {
          hide,
          text: this.$t('MSG_TXT_GVWY_NAME'),
          value: 'rewrdName',
          width: 300,
          customValue: v => {
            if (v === null) {
              return '-'
            }
            return v
          },
        },
      ]
      return columns
    },
  },
  watch: {
    rewrdData(newVal) {
      this.gvmyName = []
      _.forEach(newVal, name => {
        const key = name.rewrdSeq
        const value = name.rewrdName
        const gvmy = {
          codeId: key,
          codeName: value,
          parentsCodeId: '',
          parentsCodeValidityValue: '',
          text: value,
          value: key,
        }
        this.gvmyName.push(gvmy)
      })
    },
  },
  mounted() {
    if (_.isEmpty(this.eventId)) {
      return
    }

    this.initializeCodes()

    if (this.eventClassCd === '01') {
      // ox
      this.resultTitle = this.$t('MSG_TXT_IAA_RIGHT_ANSWR_CNT')
      this.joinDtmTitle = this.$t('MSG_TXT_JOIN_DT')
      this.resultSearchType = 'text'
      this.resultSearchData = []
    } else if (this.eventClassCd === '02') {
      // 스템프
      this.resultTitle = this.$t('MSG_TXT_ATTAIN_TARGET')
      this.joinDtmTitle = this.$t('MSG_TXT_ATTAIN_DTM')
      this.resultSearchType = 'dropdown'
      this.selectAttainList()
    } else if (this.eventClassCd === '03') {
      // 룰렛
      this.resultTitle = this.$t('MSG_TXT_ROULETTE_RESULT')
      this.joinDtmTitle = this.$t('MSG_TXT_IAA_JOIN_DTM')
      this.resultSearchType = 'dropdown'
      this.selectAttainList()
    } else if (this.eventClassCd === '04') {
      // 응모이벤트
      this.resultTitle = this.$t('MSG_TXT_EVT_WIN_YN')
      this.joinDtmTitle = this.$t('MSG_TXT_APP_DTM')
      this.resultSearchType = 'radio'
      this.selectYnList()
    } else if (this.eventClassCd === '06') {
      // 미션
      this.resultTitle = this.$t('MSG_TXT_EVT_ATTEND_CNT')
      this.joinDtmTitle = this.$t('MSG_TXT_EVT_ATTEND_DTM')
      this.resultSearchType = 'text'
      this.resultSearchData = []
    } else if (this.eventClassCd === '07') {
      // 출석체크
      this.resultTitle = this.$t('MSG_TXT_EVT_ATTEND_CNT')
      this.joinDtmTitle = this.$t('MSG_TXT_EVT_ATTEND_DTM')
      this.resultSearchType = 'text'
      this.resultSearchData = []
    } else if (this.eventClassCd === '08') {
      // 미니게임
      this.resultTitle = this.$t('MSG_TXT_EVT_SCORE')
      this.joinDtmTitle = this.$t('MSG_TXT_IAA_JOIN_DTM')
      this.resultSearchType = 'text'
      this.resultSearchData = []
    } else {
      this.resultTitle = this.$t('MSG_TXT_RSULT')
      this.joinDtmTitle = this.$t('MSG_TXT_JOIN_DTM')
      this.resultSearchType = 'text'
      this.resultSearchData = []
    }

    this.onClickSearch()
  },
  methods: {
    async initializeCodes() {
      http.mergeCodeList(this.$options.name, this.codeKeys, this.codes).then(() => {
        if (this.codes.COD_IA_EVENT_CURRENT_MEMBER_SEARCH_TYPE) {
          for (let i = 0; i < this.codes.COD_IA_EVENT_CURRENT_MEMBER_SEARCH_TYPE.length; i += 1) {
            const tmp = this.codes.COD_IA_EVENT_CURRENT_MEMBER_SEARCH_TYPE[i]

            if (tmp.codeName === '{{LABEL_RESULT}}') {
              tmp.codeName = this.resultTitle
              tmp.label = this.resultTitle
              tmp.text = this.resultTitle
            } else if (tmp.codeName === '{{LABEL_DATE}}') {
              tmp.codeName = this.joinDtmTitle
              tmp.label = this.joinDtmTitle
              tmp.text = this.joinDtmTitle
            }
          }
          if (this.eventClassCd !== '04') {
            this.codes.COD_IA_EVENT_CURRENT_MEMBER_SEARCH_TYPE.pop()
          }
        }
      })
    },
    onClickReset() {
      this.searchType = ''
      this.searchText = ''
    },
    onPagingEventPublctGrid(pager) {
      this.rowsPerPage = pager.rowsPerPage
    },
    onBottomEventPublctGrid() {
      const totalSize = this.itemSize
      const currentSize = this.memberList.totalSize

      if (totalSize > currentSize) {
        this.offset = this.memberList.totalSize
        this.searchData()
      }
    },
    onClickSearch() {
      this.offset = 0
      this.itemSize = 0
      // eslint-disable-next-line new-cap
      this.memberList = new urDataSet()
      this.searchData()
    },
    searchData() {
      if (this.searchType !== '' && this.searchText === '') {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_ITEM_NAME')))
        return
      }
      const params = {}
      if (this.searchType === '001') {
        params.memshpUid = this.searchText
      } else if (this.searchType === '002') {
        params.eventPartcpResult = this.searchText
      } else if (this.searchType === '003') {
        params.joinDtm = this.searchText
      } else if (this.searchType === '004') {
        params.rewrdSeq = this.searchText
      }
      params.rowsPerPage = this.rowsPerPage
      params.offset = this.offset

      http.request(this.pageId, 'DTS_AAG_00060', {
        path: {
          'event-id': this.eventId,
        },
        query: params,
      }).then(res => {
        this.memberList.appendData(res.data.memberList)
        this.itemSize = res.data.cnt
      })
    },
    onClickDownloadExcel() {
      // eslint-disable-next-line new-cap
      const dsExcel = new urDataSet()

      const params = {}
      if (this.searchType === '001') {
        params.memshpUid = this.searchText
      } else if (this.searchType === '002') {
        params.eventPartcpResult = this.searchText
      } else if (this.searchType === '003') {
        params.joinDtm = this.searchText
      } else if (this.searchType === '004') {
        params.rewrdSeq = this.searchText
      }
      http.request(this.pageId, 'DTS_AAG_00060', {
        path: {
          'event-id': this.eventId,
        },
        query: params,
      }).then(res => {
        const list = CommonUtils.mapCode(_.toArray(res.data.memberList), this.memberColumnHeader)
        dsExcel.setData(list)

        const metaObj = {
          headerFontSize: 16,
          headerFontColor: 1,
          headerForegroundColor: 22,
        }

        const sPageId = this.$options.name
        const objGridColumns = this.memberColumnHeader
        const objGridDataset = dsExcel

        const sToday = utils.now('YYYYMMDDHHmmss')
        const sExcelName = `eventcurrent_member${sToday}.xlsx`

        utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, metaObj)
      })
    },
    selectAttainList() {
      http.request(this.pageId, 'DTS_AAG_00066', {
        path: {
          'event-id': this.eventId,
        },
        query: {
          eventClassCd: this.eventClassCd,
        },
      }).then(res => {
        this.resultSearchData = res.data
      })
    },
    selectYnList() {
      http.getCodeList(this.$options.name, ['COD_IA_EXPOSR_YN']).then(res => {
        this.resultSearchData = res.COD_IA_EXPOSR_YN
      })
    },
  },
}
</script>
