<template>
  <div>
    <ur-form-box toggleable>
      <!-- 게시 구분 -->
      <ur-form-item
        :label="$t('MSG_TXT_PUBLCT_KIND')"
        label-align="right"
        class="flex_wrap"
        style="width: 50%; height: auto; border: 0;"
      >
        <ur-dropdown
          v-model="searchParams.eventPublctKindCd"
          no-select
          :items="codes.COD_IA_EVENT_PUBLCT_KIND"
          :msg-no-select="$t('MSG_TXT_ALL')"
        />
      </ur-form-item>
      <ur-form-item
        class="flex_wrap"
        :label="$t('MSG_TXT_EVENT_CLASS')"
        label-align="right"
        style="width: 50%; height: auto;"
      >
        <ur-dropdown
          v-model="searchParams.eventClassCd"
          no-select
          :items="codes.COD_IA_EVENT_CLASS"
          :msg-no-select="$t('MSG_TXT_ALL')"
        />
      </ur-form-item>
      <!-- 이벤트 명 -->
      <ur-form-item
        :label="$t('MSG_TXT_EVENT_NAME')"
        label-align="right"
        class="flex_wrap"
        style="width: 50%; height: auto;"
      >
        <ur-text-field
          v-model="searchParams.eventName"
          maxlength="150"
          style="width: 100%"
          @keyup.enter="onClickSearch"
        />
      </ur-form-item>
      <!-- 이벤트 기간 -->
      <ur-form-item
        :label="$t('MSG_TXT_EVENT_PERIOD')"
        label-align="right"
        class="flex_wrap"
        style="width: 50%; height: auto;"
      >
        <ur-range-picker
          v-model="searchParams.eventPeriods"
          input-type="YYYY-MM-DD"
          model-type="YYYYMMDD"
          :confirm-label="$t('MSG_TXT_SELT')"
        />
      </ur-form-item>
    </ur-form-box>
    <div class="btn_wrap mt10">
      <div class="right_box">
        <ur-button
          @click="onClickReset"
        >
          {{ $t('MSG_BTN_INTL') }} <!-- 초기화 -->
        </ur-button>
        <ur-button
          v-permission:read="contextPageId"
          color="violet"
          @click="onClickSearch"
        >
          {{ $t('MSG_BTN_SEARCH') }} <!-- 검색 -->
        </ur-button>
      </div>
    </div>

    <ur-data-grid
      ref="eventPublctGrid"
      class="custom_grid_pgeNav_None mt35"
      :headers="eventPublctGrid.headers"
      :data-source="eventPublctGrid.dataSource"
      :options="eventPublctGrid.options"
      :item-size="eventPublctGrid.itemSize"
      :data-set-options="{id: 'id'}"
      @grid:paging="onPagingEventPublctGrid"
      @grid:scroll-bottom="onBottomEventPublctGrid"
    />
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component'

export default {
  name: 'PGE_AAG_00001_T01', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      codeKeys: [
        'COD_IA_EVENT_PUBLCT_KIND', // 이벤트게시구분
        'COD_IA_EVENT_KIND', // 이벤트구분
        'COD_IA_EVENT_CLASS', // 이벤트분류
        'COD_IA_EXPOSR_YN', // 노출여부
      ],
      codes: {
        COD_IA_EVENT_PUBLCT_KIND: [],
        COD_IA_EVENT_KIND: [],
        COD_IA_EVENT_CLASS: [],
        COD_IA_EXPOSR_YN: [],
      },
      params: {},
      searchParams: {},
      eventPublctGrid: {
        headers: [],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        itemSize: 0,
        options: {
          height: 474, // 522(10), 762(15), 1482(30)
          resizableColumn: true,
          multiSelect: false,
          pagination: true,
          msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
          defaultPageSize: 10,
        },
      },
    }
  },
  computed: {
    contextPageId() {
      return this.$attrs['page-id']
    },
  },
  created() {
    this.initializeCodes()
    this.initializeHeaders()
  },
  mounted() {
    this.initializeSearchParams()
    this.onClickSearch()
  },
  methods: {
    initializeCodes() {
      http.mergeCodeList(this.$options.name, this.codeKeys, this.codes).then(() => {
        const newList = []

        for (let i = 0; i < this.codes.COD_IA_EVENT_CLASS.length; i += 1) {
          if (this.codes.COD_IA_EVENT_CLASS[i].codeId !== '05') {
            newList.push(this.codes.COD_IA_EVENT_CLASS[i])
          }
        }
        this.codes.COD_IA_EVENT_CLASS = newList
      })
    },
    initializeSearchParams() {
      const searchParams = utils.getParameter(this, 'params')[`${this.$options.name}`]
      if (!utils.isEmpty(searchParams)) {
        this.searchParams = searchParams
        this.$refs.eventPublctGrid.mx_pager.rowsPerPage = this.searchParams.rowsPerPage
      } else {
        this.onClickReset()
      }
    },
    initializeHeaders() {
      this.eventPublctGrid.headers = [
        {
          text: this.$t('MSG_TXT_PUBLCT_KIND'), // 게시 구분
          type: 'code',
          value: 'eventPublctKindCd',
          domain: this.codes.COD_IA_EVENT_PUBLCT_KIND,
          width: 120,
          minWidth: 120,
        },
        {
          text: this.$t('MSG_TXT_EVENT_CLASS'), // 이벤트 분류
          type: 'code',
          value: 'eventClassCd',
          domain: this.codes.COD_IA_EVENT_CLASS,
          width: 120,
          minWidth: 120,
        },
        {
          text: this.$t('MSG_TXT_EVENT_NAME'), // 이벤트 명
          value: 'eventName',
          minWidth: 400,
          customStyle: () => ({ 'text-decoration': 'underline' }),
          click: (value, row) => {
            const params = {}
            params[`${this.$options.name}`] = this.params // 검색조건
            params.eventId = row.eventId
            params.eventClassCd = row.eventClassCd
            params.tabIndex = '1'
            utils.goPage('PGE_AAG_00002', { params })
          },
        },
        {
          text: this.$t('MSG_TXT_EXPOSR_YN'), // 노출 여부
          value: 'exposrYn',
          width: 80,
          minWidth: 80,
        },
        {
          text: this.$t('MSG_TXT_EVENT_PERIOD'), // 이벤트 기간
          width: 260,
          minWidth: 260,
          customValue: (v, r) => {
            const startDate = moment(r.eventStartDtm, 'YYYYMMDDHHmm').format('YYYY-MM-DD HH:mm')
            const endDate = moment(r.eventEndDtm, 'YYYYMMDDHHmm').format('YYYY-MM-DD HH:mm')
            return `${startDate}~${endDate}`
          },
        },
        {
          text: this.$t('MSG_TXT_PUBLCT_ID'), // 게시 ID
          value: 'eventId',
          minWidth: 320,
          click: v => prompt(this.$t('MSG_TXT_COPY_CLIPBOARD_WITH_CTRL_C'), v), // Ctrl+C를 눌러 클립보드로 복사하세요.
        },
        {
          text: this.$t('MSG_TXT_RGST_DTM'), // 등록일시
          width: 150,
          minWidth: 150,
          customValue: (value, row) => {
            const customValue = moment(row.fstRgstDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
            return customValue
          },
        },
        {
          text: this.$t('MSG_TXT_RGST_USR'), // 등록자
          width: 100,
          minWidth: 100,
          value: 'fstRgstUsrId',
        },
        {
          text: this.$t('MSG_TXT_MDFC_DTM'), // 수정일시
          width: 150,
          minWidth: 150,
          customValue: (v, r) => {
            const customValue = moment(r.fnlMdfcDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
            return customValue
          },
        },
        {
          text: this.$t('MSG_TXT_MDFC_USR'), // 수정자
          width: 100,
          minWidth: 100,
          value: 'fnlMdfcUsrId',
        },
      ]
    },
    onPagingEventPublctGrid(pager) {
      this.searchParams.rowsPerPage = pager.rowsPerPage
    },
    onBottomEventPublctGrid() {
      const totalSize = this.eventPublctGrid.itemSize
      const currentSize = this.eventPublctGrid.dataSource.totalSize
      if (totalSize > currentSize) {
        this.selectEventPublicationList()
      }
    },
    onClickReset() {
      this.searchParams = {
        eventPublctKindCd: '',
        eventKindCd: '',
        eventClassCd: '',
        eventName: '',
        exposrYns: ['Y', 'N'],
        eventPeriods: [
          moment().add('-1', 'months').format('YYYYMMDD'),
          moment().format('YYYYMMDD'),
        ],
        offset: 0,
        rowsPerPage: 10,
      }
      this.$refs.eventPublctGrid.mx_pager.rowsPerPage = 10
    },
    onClickSearch() {
      const eventStartDate = this.searchParams.eventPeriods.at(0)
      const eventEndDate = this.searchParams.eventPeriods.at(1)
      if (utils.isEmpty(eventStartDate) || utils.isEmpty(eventEndDate)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_EVENT_PERIOD')) // {이벤트 기간} 을(를) 입력하세요.
        utils.messageBox('warning', msg)
        return
      }

      this.$refs.eventPublctGrid.setScrollLeft(0)
      this.eventPublctGrid.dataSource = new urDataSet() // eslint-disable-line new-cap
      this.searchParams.offset = 0

      this.params = utils.cloneDeep(this.searchParams)
      this.selectEventPublicationList()
    },
    selectEventPublicationList() {
      http.request(this.contextPageId, 'DTS_AAG_00057', {
        query: {
          eventPublctKindCd: this.params.eventPublctKindCd,
          eventClassCd: this.params.eventClassCd,
          eventName: encodeURI(this.params.eventName),
          eventPeriodList: this.params.eventPeriods.join(','),
          rowsPerPage: this.params.rowsPerPage,
          offset: this.eventPublctGrid.dataSource.totalSize,
        },
      }).then(res => {
        this.eventPublctGrid.dataSource.appendData(res.data.eventPublctList)
        this.eventPublctGrid.itemSize = res.data.eventPublctListTotCnt
      })
    },
  },
}
</script>
<style scoped>
</style>
