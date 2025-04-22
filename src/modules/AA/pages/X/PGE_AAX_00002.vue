<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box>
        <!-- 품목 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_ITEM_KIND_D1')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="itemFg"
            no-select
            :items="codes.COD_POPS_00016"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>
        <!-- 사용 채널 -->
        <ur-form-item
          :label="$t('MSG_TXT_USE_CHN')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="usageFg"
            no-select
            :items="codes.COD_POPS_00056"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>
        <!-- 품목 코드 -->
        <ur-form-item
          :label="$t('MSG_TXT_ITEM_CD_D1')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="itemCd"
            style="width: 100%;"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
        <!-- 품목 명 -->
        <ur-form-item
          :label="$t('MSG_TXT_ITEM_NAME_D1')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="itemNm"
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
        ref="itemGrid"
        class="mt35"
        :headers="itemGrid.headers"
        :data-source="itemGrid.dataSource"
        :options="itemGrid.options"
        :item-size="itemGrid.itemSize"
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
  name: 'PGE_AAX_00002', // eslint-disable-line vue/name-property-casing
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
      codeKeys: [
        'COD_POPS_00016', // POPS-상품구분
        'COD_POPS_00056', // POPS-이용구분
      ],
      codes: {
        COD_POPS_00016: [],
        COD_POPS_00056: [],
      },
      itemFg: '', // 품목구분(default: 전체(''))
      usageFg: '', // 사용채널(default: 전체(''))
      itemCd: '',
      itemNm: '',
      searchParams: {},
      itemGrid: {
        headers: [
          { text: this.$t('MSG_TXT_ITEM_CD_D1'), value: 'itemCd', width: 100 }, // 품목 코드
          { text: this.$t('MSG_TXT_ITEM_NAME_D1'), value: 'itemNm', minWidth: 300 }, // 품목 명
          { text: this.$t('MSG_TXT_CLS1_NM'), value: 'cls1Nm', width: 100 }, // 태분류명
          { text: this.$t('MSG_TXT_CLS2_NM'), value: 'cls2Nm', width: 100 }, // 대분류명
          { text: this.$t('MSG_TXT_CLS3_NM'), value: 'cls3Nm', width: 100 }, // 중분류명
          { text: this.$t('MSG_TXT_CLS4_NM'), value: 'cls4Nm', width: 100 }, // 소분류명
          { text: this.$t('MSG_TXT_CLS5_NM'), value: 'cls5Nm', width: 100 }, // 세분류명
          { text: this.$t('MSG_TXT_VAT_FG'), value: 'vatFgNm', width: 100 }, // 과세구분
          { text: this.$t('MSG_TXT_PARK_FG'), value: 'parkFgNm', width: 100 }, // 파크구분C
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
    http.mergeCodeList(this.$options.name, this.codeKeys, this.codes).then(() => {
      this.onClickSearch()
    })
  },
  methods: {
    selectPopsItemList() {
      const queryParams = this.searchParams
      queryParams.offset = this.itemGrid.dataSource.totalSize
      queryParams.rowsPerPage = 10

      http.request(this.$options.name, 'DTS_AAX_00007', {
        query: {
          itemFg: queryParams.itemFg,
          usageFg: queryParams.usageFg,
          itemCd: encodeURI(queryParams.itemCd),
          itemNm: encodeURI(queryParams.itemNm),
          offset: queryParams.offset,
          rowsPerPage: queryParams.rowsPerPage,
        },
      }).then(res => {
        this.itemGrid.dataSource.appendData(res.data.popsItemList)
        this.itemGrid.itemSize = res.data.popsItemListTotCnt
      })
    },
    onClickReset() {
      this.itemFg = '' // 전체('')
      this.usageFg = '' // 전체('')
      this.itemCd = ''
      this.itemNm = ''
    },
    onClickSearch() {
      this.searchParams = {
        itemFg: this.itemFg,
        usageFg: this.usageFg,
        itemCd: this.itemCd,
        itemNm: this.itemNm,
      }
      this.itemGrid.dataSource.setData()
      this.selectPopsItemList()
    },
    onRowDblClick(row) {
      this.onClickSelect(row)
    },
    onScrollBottom() {
      const totalSize = this.itemGrid.itemSize
      const currentSize = this.itemGrid.dataSource.totalSize
      if (totalSize > currentSize) {
        this.selectPopsItemList()
      }
    },
    onClickClose() {
      this.closePagePopup()
    },
    onClickSelect(row) {
      const selected = row || this.$refs.itemGrid.getSelected()
      if (!selected) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM')) // 선택된 항목이 없습니다.
        return
      }
      const returnData = {
        itemCd: selected.itemCd,
        itemNm: selected.itemNm,
      }
      this.closePagePopup(returnData)
    },
  },
}
</script>
