<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box>
        <!-- 미션 코드 -->
        <ur-form-item
          :label="$t('MSG_TXT_MISSION_CD')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="missionCd"
            style="width: 100%;"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
        <!-- 미션 명 -->
        <ur-form-item
          :label="$t('MSG_TXT_MISSION_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="missionName"
            style="width: 100%;"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
      </ur-form-box>
      <div
        ref="modal"
        class="btn_wrap mt10"
      >
        <div class="right_box">
          <ur-button
            v-permission:read="this.$options.name"
            @click="onClickReset"
          >
            {{ $t('MSG_BTN_INTL') }} <!-- 초기화 -->
          </ur-button>
          <ur-button
            v-permission:read="this.$options.name"
            color="violet"
            @click="onClickSearch"
          >
            {{ $t("MSG_BTN_SEARCH") }} <!-- 검색 -->
          </ur-button>
        </div>
      </div>
      <ur-data-grid
        ref="filterGrid"
        class="mt35"
        :headers="filterGrid.headers"
        :data-source="filterGrid.dataSource"
        :options="filterGrid.options"
        :item-size="filterGrid.itemSize"
        :data-set-options="{id: 'id'}"
        @grid:row-dbl-click="onRowDblClick"
        @grid:scroll-bottom="onScrollBottom"
      />
      <div class="comm_btn_wrap mt10">
        <div class="right_box">
          <ur-button
            @click="onClickClose()"
          >
            {{ $t("MSG_BTN_CLOSE") }} <!-- 닫기 -->
          </ur-button>
          <ur-button
            color="violet"
            @click="onClickSelect()"
          >
            {{ $t("MSG_BTN_SELT") }} <!-- 선택 -->
          </ur-button>
        </div>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component'

export default {
  name: 'PGE_AAG_00025', // eslint-disable-line vue/name-property-casing
  props: {
    closePagePopup: {
      type: Function,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      missionCd: '',
      missionName: '',
      searchParams: {
        missionCd: '',
        missionName: '',
      },
      isScrollable: true,
      filterGrid: {
        headers: [
          {
            text: this.$t('MSG_TXT_MISSION_CD'), // 미션 코드
            width: 150,
            value: 'filterId',
          },
          {
            text: this.$t('MSG_TXT_MISSION_NAME'), // 미션 명
            value: 'filterName',
          },
          {
            text: this.$t('MSG_TXT_RGST_DTM'), // 등록일시
            width: 180,
            customValue: (value, row) => {
              const customValue = moment(row.fstRgstDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
              return customValue
            },
          },
          {
            text: this.$t('MSG_TXT_RGST_USR'), // 등록자
            width: 100,
            value: 'fstRgstUsrId',
          },
        ],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        itemSize: 0,
        options: {
          infinityScroll: true,
          pagination: false,
          height: 234, // 522(10), 762(15), 1482(30)
          noInfo: true,
          multiSelect: false,
          msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
        },
      },
    }
  },
  mounted() {
    this.selectMissionFilterList()
  },
  methods: {
    selectMissionFilterList() {
      const queryParams = this.searchParams
      queryParams.offset = this.filterGrid.dataSource.totalSize
      queryParams.rowsPerPage = 10

      http.request(this.$options.name, 'DTS_AAX_00004', {
        query: {
          filterKindCd: 'MIS',
          filterId: encodeURI(queryParams.missionCd),
          filterName: encodeURI(queryParams.missionName),
          offset: queryParams.offset,
          rowsPerPage: queryParams.rowsPerPage,
        },
      }).then(res => {
        if (res.data.length > 0) {
          this.filterGrid.dataSource.appendData(res.data)
        } else {
          this.isScrollable = false
        }
      })
    },
    onClickReset() {
      this.missionCd = ''
      this.missionName = ''
    },
    onClickSearch() {
      this.searchParams = {
        missionCd: this.missionCd,
        missionName: this.missionName,
      }
      this.filterGrid.dataSource.setData()
      this.isScrollable = true
      this.selectMissionFilterList()
    },
    onRowDblClick(row) {
      this.onClickSelect(row)
    },
    onScrollBottom() {
      if (this.isScrollable) {
        this.selectMissionFilterList()
      }
    },
    onClickClose() {
      this.closePagePopup()
    },
    onClickSelect(row) {
      const selected = row || this.$refs.filterGrid.getSelected()
      if (!selected) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM')) // 선택된 항목이 없습니다.
        return
      }
      const returnData = {
        attainCondCd: selected.filterId,
        attainCondName: selected.filterName,
      }
      this.closePagePopup(returnData)
    },
  },
}
</script>
