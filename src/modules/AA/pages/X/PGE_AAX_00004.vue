<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box>
        <!-- 시설 코드 -->
        <ur-form-item
          :label="$t('MSG_TXT_FACIL_CD')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="facilCd"
            style="width: 100%;"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
        <!-- 시설 명 -->
        <ur-form-item
          :label="$t('MSG_TXT_FACIL_NM')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="facilNm"
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
            v-permission:read="this.$options.name"
            color="violet"
            @click="onClickSearch"
          >
            {{ $t("MSG_BTN_SEARCH") }} <!-- 검색 -->
          </ur-button>
        </div>
      </div>
      <ur-data-grid
        ref="faciltGrid"
        class="mt35"
        :headers="faciltGrid.headers"
        :data-source="faciltGrid.dataSource"
        :options="faciltGrid.options"
        :item-size="faciltGrid.itemSize"
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
  name: 'PGE_AAX_00004', // eslint-disable-line vue/name-property-casing
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
      // 공통코드
      facilCd: '', // 시설코드
      facilNm: '', // 시설명
      searchParams: {},
      faciltGrid: {
        headers: [
          { text: this.$t('MSG_TXT_FACIL_CD'), value: 'facilCd' }, // 시설코드
          { text: this.$t('MSG_TXT_FACIL_NM'), value: 'facilNm' }, // 시설명
          { text: this.$t('MSG_TXT_REPR_FACIL_CD'), value: 'facilCd2' }, // 대표 시설코드
          { text: this.$t('MSG_TXT_REPR_FACIL_NM'), value: 'facilNm2' }, // 대표 시설명
        ],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        itemSize: 0,
        options: {
          infinityScroll: true,
          pagination: false,
          height: 282, // 522(10), 762(15), 1482(30)
          noInfo: true,
          multiSelect: false,
          msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
        },
      },
    }
  },
  mounted() {
    this.selectPopsFaciltList()
  },
  methods: {
    selectPopsFaciltList() {
      const queryParams = this.searchParams
      queryParams.offset = this.faciltGrid.dataSource.totalSize
      queryParams.rowsPerPage = 10

      http.request(this.$options.name, 'DTS_AAX_00011', {
        query: {
          facilCd: encodeURI(queryParams.facilCd),
          facilNm: encodeURI(queryParams.facilNm),
          offset: queryParams.offset,
          rowsPerPage: queryParams.rowsPerPage,
        },
      }).then(res => {
        this.faciltGrid.dataSource.appendData(res.data.popsFaciltList)
        this.faciltGrid.itemSize = res.data.popsFaciltListTotCnt
      })
    },
    onClickReset() {
      this.facilCd = ''
      this.facilNm = ''
    },
    onClickSearch() {
      this.searchParams = {
        facilCd: this.facilCd,
        facilNm: this.facilNm,
      }
      this.faciltGrid.dataSource.setData()
      this.selectPopsFaciltList()
    },
    onRowDblClick(row) {
      this.onClickSelect(row)
    },
    onScrollBottom() {
      const totalSize = this.faciltGrid.itemSize
      const currentSize = this.faciltGrid.dataSource.totalSize
      if (totalSize > currentSize) {
        this.selectPopsFaciltList()
      }
    },
    onClickClose() {
      this.closePagePopup()
    },
    onClickSelect(row) {
      const selected = row || this.$refs.faciltGrid.getSelected()
      if (!selected) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM')) // 선택된 항목이 없습니다.
        return
      }
      const returnData = {
        facilCd: selected.facilCd,
        facilNm: selected.facilNm,
      }
      this.closePagePopup(returnData)
    },
  },
}
</script>
