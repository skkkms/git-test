<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box>
        <!-- 필터 ID -->
        <ur-form-item
          :label="$t('MSG_TXT_FLTR_ID')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="filterId"
            style="width: 100%;"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
        <!-- 필터 명 -->
        <ur-form-item
          :label="$t('MSG_TXT_FLTR_NM')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="filterName"
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
            @click="onClickReset"
          >
            {{ $t('MSG_BTN_INTL') }} <!-- 초기화 -->
          </ur-button>
          <ur-button
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
  name: 'PGE_AAX_00005', // eslint-disable-line vue/name-property-casing
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
      filterId: '',
      filterName: '',
      searchParams: {
        filterId: '',
        filterName: '',
      },
      isScrollable: true,
      filterGrid: {
        headers: [
          {
            text: this.$t('MSG_TXT_FLTR_ID'), // 필터 ID
            width: 150,
            value: 'filterId',
          },
          {
            text: this.$t('MSG_TXT_FLTR_NM'), // 필터 명
            value: 'filterName',
          },
          {
            text: this.$t('MSG_TXT_TARGET_HCNT'), // 대상 인원 수
            value: 'targetHcnt',
            customValue: v => utils.numberFormat(v),
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
    this.selectEventFilterList()
  },
  methods: {
    selectEventFilterList() {
      const queryParams = this.searchParams
      queryParams.offset = this.filterGrid.dataSource.totalSize
      queryParams.rowsPerPage = 10

      http.request(this.$options.name, 'DTS_AAX_00004', {
        query: {
          filterKindCd: 'EVT',
          filterId: encodeURI(queryParams.filterId),
          filterName: encodeURI(queryParams.filterName),
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
      this.filterId = ''
      this.filterName = ''
    },
    onClickSearch() {
      this.searchParams = {
        filterId: this.filterId,
        filterName: this.filterName,
      }
      this.filterGrid.dataSource.setData()
      this.isScrollable = true
      this.selectEventFilterList()
    },
    onRowDblClick(row) {
      this.onClickSelect(row)
    },
    onScrollBottom() {
      if (this.isScrollable) {
        this.selectEventFilterList()
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
        filterId: selected.filterId,
        filterName: selected.filterName,
      }
      this.closePagePopup(returnData)
    },
  },
}
</script>
