<template>
  <div>
    <ur-form-box toggleable>
      <!-- 회원번호 -->
      <ur-form-item
        :label="$t('MSG_TXT_MEM_NUM')"
        label-align="right"
        class="flex_wrap"
        style="width:50%; height: auto;"
      >
        <ur-text-field
          v-model="searchParams.memshpUid"
          maxlength="10"
          style="width: 100%; height: auto;"
        />
      </ur-form-item>
      <!-- 미션 명 -->
      <ur-form-item
        :label="$t('MSG_TXT_MISSION_NAME')"
        label-align="right"
        class="flex_wrap"
        style="width:50%; height: auto;"
      >
        <ur-text-field
          v-model="searchParams.missionName"
          maxlength="150"
          style="width: 100%; height: auto;"
        />
      </ur-form-item>
      <!-- 미션 분류 (1) -->
      <ur-form-item
        :label="$t('MSG_TXT_MISSION_CLASS_1')"
        label-align="right"
        class="flex_wrap"
        style="width:50%; height: auto;"
      >
        <ur-dropdown
          v-model="searchParams.missionClassCd1"
          :items="codes.COD_IA_MISSION_CLASS_1"
          no-select
          :msg-no-select="$t('MSG_TXT_ALL')"
          style="width: 100%; height: auto;"
          @input="setItems"
        />
      </ur-form-item>
      <!-- 미션 분류 (2) -->
      <ur-form-item
        :label="$t('MSG_TXT_MISSION_CLASS_2')"
        label-align="right"
        class="flex_wrap"
        style="width:50%; height: auto;"
      >
        <ur-dropdown
          v-model="searchParams.missionClassCd2"
          :items="items"
          no-select
          :msg-no-select="$t('MSG_TXT_ALL')"
          style="width: 100%; height: auto;"
        />
      </ur-form-item>
      <!-- 달성일시 -->
      <ur-form-item
        :label="$t('MSG_TXT_ATTAIN_DTM')"
        label-align="right"
        class="flex_wrap"
        style="width:50%; height: auto;"
      >
        <ur-date-picker
          v-model="searchParams.joinDtm"
          :today-label="$t('MSG_BTN_TODAY')"
          :clear-label="$t('MSG_BTN_INTL')"
          :confirm-label="$t('MSG_TXT_SELT')"
          model-type="YYYYMMDD"
          style="width: 100%; height: auto;"
        />
      </ur-form-item>
      <!-- 보상 종류 -->
      <ur-form-item
        :label="$t('MSG_TXT_REWRD_CLASS')"
        label-align="right"
        class="flex_wrap"
        style="width:50%; height: auto;"
      >
        <ur-dropdown
          v-model="searchParams.missionRewrdType"
          :items="codes.COD_IA_MISSION_REWRD_TYPE"
          no-select
          :msg-no-select="$t('MSG_TXT_ALL')"
          style="width: 100%; height: auto;"
        />
      </ur-form-item>
    </ur-form-box>

    <div class="btn_wrap mt10">
      <div class="right_box">
        <ur-button @click="onClickReset">
          {{ this.$t('MSG_BTN_RESET') }}
        </ur-button>
        <ur-button
          v-permission:read="pageId"
          color="violet"
          @click="onClickSearch"
        >
          {{ this.$t('MSG_BTN_SEARCH') }}
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
  name: 'PGE_AAG_00002_S04', // eslint-disable-line vue/name-property-casing
  props: {
    pageId: {
      type: String,
      required: false,
      default: null,
    },
    eventId: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      codeKeys: [
        'COD_IA_MISSION_CLASS_1', 'COD_IA_MISSION_CLASS_2', 'COD_IA_MISSION_SEARCH_TYPE', 'COD_IA_MISSION_REWRD_TYPE',
      ],
      codes: {
        COD_IA_MISSION_CLASS_1: [],
        COD_IA_MISSION_CLASS_2: [],
        COD_IA_MISSION_SEARCH_TYPE: [],
        COD_IA_MISSION_REWRD_TYPE: [],
      },
      rewrdData: [],
      opts: { // 토탈o
        height: 474, // 522(10), 762(15), 1482(30)
        pagination: true,
        msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
        defaultPageSize: 10,
      },
      eventClassCd: '',
      searchParams: {
        memshpUid: '',
        missionName: '',
        missionClassCd1: '',
        missionClassCd2: '',
        joinDtm: '',
        missionRewrdType: '',
      },
      memberList: [],
      items: [],
      rowsPerPage: '10',
      itemSize: 0,
    }
  },
  computed: {
    memberColumnHeader() {
      const columns = [
        { text: this.$t('MSG_TXT_NUMBER_ABBR'), value: 'no', width: 100 },
        { text: this.$t('MSG_TXT_MEM_NUM'), value: 'memshpUid', width: 250 },
        {
          text: this.$t('MSG_TXT_MISSION_CLASS_1'),
          value: 'missionClassCd1',
          width: 200,
          type: 'code',
          domain: this.codes.COD_IA_MISSION_CLASS_1,
        },
        {
          text: this.$t('MSG_TXT_MISSION_CLASS_2'),
          value: 'missionClassCd2',
          width: 200,
          type: 'code',
          domain: this.codes.COD_IA_MISSION_CLASS_2,
        },
        { text: this.$t('MSG_TXT_MISSION_NAME'), value: 'missionName' },
        {
          text: this.$t('MSG_TXT_ATTAIN_DTM'),
          width: 150,
          value: 'joinDtm',
          type: 'datetime',
          customValue: v => {
            const customValue = moment(v, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
            return customValue
          },
        },
        {
          text: this.$t('MSG_TXT_REWRD_CLASS'),
          width: 150,
          type: 'custom',
          customValue: (v, r) => ((r.badgeSeq === null) ? this.$t('MSG_TXT_REWRD_NO_REWRD') : this.$t('MSG_TXT_REWRD_BADGE')),
        },
        {
          text: this.$t('MSG_TXT_IAA_EVT_RWRD_NAME'),
          value: 'badgeName',
          customValue: v => ((v === null) ? '-' : v),
        },
      ]
      return columns
    },
  },
  watch: {
  },
  mounted() {
    if (_.isEmpty(this.eventId)) {
      return
    }

    this.initializeCodes()
    this.onClickSearch()
  },
  methods: {
    initializeCodes() {
      http.mergeCodeList(this.$options.name, this.codeKeys, this.codes)
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
    onClickReset() {
      this.searchParams.memshpUid = ''
      this.searchParams.missionName = ''
      this.searchParams.missionClassCd1 = ''
      this.searchParams.missionClassCd2 = ''
      this.searchParams.joinDtm = ''
      this.searchParams.missionRewrdType = ''
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
      params.memshpUid = this.searchParams.memshpUid
      params.missionName = this.searchParams.missionName
      params.missionClassCd1 = this.searchParams.missionClassCd1
      params.missionClassCd2 = this.searchParams.missionClassCd2
      params.joinDtm = this.searchParams.joinDtm
      params.missionRewrdType = this.searchParams.missionRewrdType
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
      http.request(this.pageId, 'DTS_AAG_00060', {
        path: {
          'event-id': this.eventId,
        },
        query: this.searchParams,
      }).then(res => {
        // eslint-disable-next-line new-cap
        const dsExcel = new urDataSet()
        const list = CommonUtils.mapCode(_.toArray(res.data.memberList), this.memberColumnHeader)

        dsExcel.setData(list)

        const sPageId = this.$options.name
        const objGridColumns = this.memberColumnHeader
        const objGridDataset = dsExcel

        const sToday = utils.now('YYYYMMDDHHmmss')
        const sExcelName = `eventcurrent_member${sToday}.xlsx`

        utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, {})
      })
    },
    setItems(missionClassCd1) {
      if (!utils.isEmpty(missionClassCd1)) {
        this.items = this.codes.COD_IA_MISSION_CLASS_2.filter(
          item => item.parentsCodeValidityValue === missionClassCd1,
        )
      }
      this.searchParams.missionClassCd2 = ''
    },
  },
}
</script>
<style scoped>
</style>
