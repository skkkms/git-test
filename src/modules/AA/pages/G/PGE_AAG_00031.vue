<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <!-- 이벤트 명 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="searchParams.eventName"
            width="100%"
            maxlength="150"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
        <!-- 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox-wrapper
            v-model="searchParams.exposrYns"
            :items="codes.COD_IA_EXPOSR_YN"
            small
          >
            <template v-for="item in codes.COD_IA_EXPOSR_YN">
              <ur-checkbox
                :key="item.value"
                :value="item.value"
                sm
              />
              <span
                :key="`span-${item.value}`"
                class="check_label"
              >{{ item.text }}</span>
            </template>
          </ur-checkbox-wrapper>
        </ur-form-item>
        <!-- 이벤트 기간 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_PERIOD')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-range-picker
            v-model="searchParams.eventPeriods"
            input-type="YYYY-MM-DD"
            model-type="YYYYMMDD"
            :confirm-label="$t('MSG_BTN_SELT')"
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
            v-permission:read="this.$options.name"
            color="violet"
            @click="onClickSearch"
          >
            {{ $t('MSG_BTN_SEARCH') }} <!-- 검색 -->
          </ur-button>
        </div>
      </div>

      <ur-data-grid
        ref="attendChkGrid"
        class="custom_grid_pgeNav_None mt35"
        :headers="attendChkGrid.headers"
        :data-source="attendChkGrid.dataSource"
        :options="attendChkGrid.options"
        :item-size="attendChkGrid.itemSize"
        :data-set-options="{id: 'id'}"
        @grid:scroll-bottom="onBottomAttendChkGrid"
      >
        <template #left-info>
          <cmp-ur-data-grid-left-info
            :total-count="attendChkGrid.itemSize"
            :page-size="searchParams.rowsPerPage"
            @changePageSize="onChangePageSize"
          />
        </template>
      </ur-data-grid>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
            v-permission:delete="this.$options.name"
            @click="onClickDelete"
          >
            {{ $t('MSG_BTN_DEL') }} <!-- 삭제 -->
          </ur-button>
          <ur-button
            v-permission:create="this.$options.name"
            color="violet"
            @click="onClickNewAttendChk"
          >
            {{ $t('MSG_BTN_RGST_NEW') }} <!-- 신규 등록 -->
          </ur-button>
        </div>
      </div>

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component'

export default {
  name: 'PGE_AAG_00031', // eslint-disable-line vue/name-property-casing
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
      attendChkGrid: {
        headers: [],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        itemSize: 0,
        options: {
          infinityScroll: true,
          pagination: false,
          height: 474, // 522(10), 762(15), 1482(30)
          resizableColumn: true,
          selectCheck: true,
          selectCheckOnly: true,
          multiSelect: false,
          msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
          defaultPageSize: 10,
        },
      },
    }
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
        if (!_.isEmpty(this.codes.COD_IA_EVENT_CLASS)) {
          this.codes.COD_IA_EVENT_CLASS = this.codes.COD_IA_EVENT_CLASS.filter(item => [
            '01', // OX퀴즈
            '02', // 스탬프
            '03', // 룰렛
            '04', // 응모 이벤트
            '05', // 기타 이벤트
          ].includes(item.value))
        }
      })
    },
    initializeSearchParams() {
      const searchParams = utils.getParameter(this, 'params')[`${this.$options.name}`]
      if (!utils.isEmpty(searchParams)) {
        this.searchParams = searchParams
        this.$refs.attendChkGrid.mx_pager.rowsPerPage = this.searchParams.rowsPerPage
      } else {
        this.onClickReset()
      }
    },
    initializeHeaders() {
      this.attendChkGrid.headers = [
        {
          text: this.$t('MSG_TXT_EVENT_NAME'), // 이벤트 명
          value: 'eventName',
          minWidth: 400,
          customStyle: () => ({ 'text-decoration': 'underline' }),
          click: (value, row) => {
            const params = {}
            params[`${this.$options.name}`] = this.params // 검색조건
            params.eventId = row.eventId
            utils.goPage('PGE_AAG_00033', { params })
          },
        },
        {
          text: this.$t('MSG_TXT_EXPOSR_YN'), // 노출 여부
          value: 'exposrYn',
          width: 80,
          minWidth: 80,
        },
        {
          text: this.$t('MSG_TXT_PUBLCT_ID'), // 게시 ID
          value: 'eventId',
          width: 320,
          minWidth: 320,
          click: v => prompt(this.$t('MSG_TXT_COPY_CLIPBOARD_WITH_CTRL_C'), v), // Ctrl+C를 눌러 클립보드로 복사하세요.
        },
        {
          text: this.$t('MSG_TXT_EVENT_PERIOD'), // 이벤트 기간
          width: 260,
          minWidth: 260,
          customValue: (v, r) => {
            const startDtm = moment(r.eventStartDtm, 'YYYYMMDDHHmm').format('YYYY-MM-DD HH:mm')
            const endDtm = moment(r.eventEndDtm, 'YYYYMMDDHHmm').format('YYYY-MM-DD HH:mm')
            let customValue = startDtm
            customValue = customValue.concat(' ~ ')
            customValue = customValue.concat(endDtm)
            return customValue
          },
        },
        {
          text: this.$t('MSG_TXT_RGST_DTM'), // 등록일시
          width: 150,
          minWidth: 150,
          customValue: (v, r) => moment(r.fstRgstDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss'),
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
          customValue: (v, r) => moment(r.fnlMdfcDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss'),
        },
        {
          text: this.$t('MSG_TXT_MDFC_USR'), // 수정자
          width: 100,
          minWidth: 100,
          value: 'fnlMdfcUsrId',
        },
      ]
    },
    onChangePageSize(pageSize) {
      this.searchParams.rowsPerPage = pageSize
    },
    onBottomAttendChkGrid() {
      const totalSize = this.attendChkGrid.itemSize
      const currentSize = this.attendChkGrid.dataSource.totalSize
      if (totalSize > currentSize) {
        this.selectAttendChkList()
      }
    },
    onClickReset() {
      this.searchParams = {
        eventName: '',
        exposrYns: ['Y', 'N'],
        eventPeriods: [
          moment().add('-1', 'months').format('YYYYMMDD'),
          moment().format('YYYYMMDD'),
        ],
        offset: 0,
        rowsPerPage: 10,
      }
      this.$refs.attendChkGrid.mx_pager.rowsPerPage = this.searchParams.rowsPerPage
    },
    onClickSearch() {
      const eventStartDate = this.searchParams.eventPeriods.at(0)
      const eventEndDate = this.searchParams.eventPeriods.at(1)
      if (utils.isEmpty(eventStartDate) || utils.isEmpty(eventEndDate)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_EVENT_PERIOD'))) // {이벤트 기간} 을(를) 입력하세요.
        return
      }
      if (utils.isEmpty(this.searchParams.exposrYns)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_EXPOSR_YN'))) // {노출 여부}(을)를 선택하세요.
        return
      }

      this.$refs.attendChkGrid.setScrollLeft(0)
      this.attendChkGrid.dataSource.setData()
      this.searchParams.offset = 0

      this.params = utils.cloneDeep(this.searchParams)
      this.selectAttendChkList()
    },
    onClickDelete() {
      const selectedRow = this.$refs.attendChkGrid.getSelected()
      if (utils.isEmpty(selectedRow)) {
        utils.messageBox('warning', this.$t('MSG_ALT_DEL_NO_DATA')) // 삭제할 데이터를 선택하세요.
        return
      }

      const eventIds = [].concat(selectedRow.eventId)
      utils.messageBox(
        'confirm',
        this.$t('MSG_ALT_DO_DELETE'), // 삭제 하시겠습니까?
        null,
        () => this.deleteAttendChk(eventIds),
      )
    },
    selectAttendChkList() {
      http.request(this.$options.name, 'DTS_AAG_00031', {
        query: {
          eventName: encodeURI(this.params.eventName),
          exposrYnList: this.params.exposrYns.join(','),
          eventPeriodList: this.params.eventPeriods.join(','),
          rowsPerPage: this.params.rowsPerPage,

          offset: this.attendChkGrid.dataSource.totalSize,
        },
      }).then(res => {
        this.attendChkGrid.dataSource.appendData(res.data.attendChkList)
        this.attendChkGrid.itemSize = res.data.attendChkListTotCnt
      })
    },
    deleteAttendChk(eventIds) {
      http.request(this.$options.name, 'DTS_AAG_00035', {
        query: {
          eventIdList: eventIds.join(','),
        },
      }).then(res => {
        if (res.data) {
          utils.messageBox('success', this.$t('MSG_ALT_DELETED')) // 삭제 되었습니다.
          this.onClickSearch()
        }
      })
    },
    onClickNewAttendChk() {
      const params = {}
      params[`${this.$options.name}`] = this.params
      utils.goPage('PGE_AAG_00032', { params })
    },
  },
}
</script>
<style scoped>
</style>
