<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box>
        <!-- 파크 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_PARK_KIND')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="parkFg"
            :items="codes.COD_POPS_S058"
            :placeholder="$t('MSG_TXT_SEL')"
            style="width: 300px;"
          />
        </ur-form-item>
        <!-- POS 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_POS_KIND')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="posFg"
            no-select
            :items="posFgItems"
            :placeholder="$t('MSG_TXT_SEL')"
            style="width: 300px;"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>
        <!-- 부문 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_SECT_KIND')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="divisionFg"
            no-select
            :items="codes.COD_POPS_S020"
            :placeholder="$t('MSG_TXT_SEL')"
            style="width: 300px;"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>
        <!-- 시설코드/위치 -->
        <ur-form-item
          :label="$t('MSG_TXT_FACILT_CD_LOC')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            v-model="facilNm"
            readonly
            style="width: 260px;"
            @keyup="onKeyupFacilNm"
          />
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            style="margin-left: 10px"
            @click="onClickFaciltSearch"
          />
        </ur-form-item>
        <!-- POS종별 -->
        <ur-form-item
          :label="$t('MSG_TXT_POS_SPEC')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="posKind"
            no-select
            :items="codes.COD_POPS_20023"
            :placeholder="$t('MSG_TXT_SEL')"
            style="width: 300px;"
            :msg-no-select="$t('MSG_TXT_ALL')"
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
        ref="posGrid"
        class="mt35"
        :headers="posGrid.headers"
        :data-source="posGrid.dataSource"
        :options="posGrid.options"
        :item-size="posGrid.itemSize"
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
  name: 'PGE_AAX_00003', // eslint-disable-line vue/name-property-casing
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
        'COD_POPS_S058', // POPS-파크 구분 코드
        'COD_POPS_20011', // POPS-POS구분(EL)
        'COD_POPS_20010', // POPS-POS구분(CB)
        'COD_POPS_20012', // POPS-POS구분(HB)
        'COD_POPS_S020', // POPS-부문(小)
        'COD_POPS_20023', // POPS-POS종별
      ],
      codes: {
        COD_POPS_S058: [],
        COD_POPS_20010: [],
        COD_POPS_20011: [],
        COD_POPS_20012: [],
        COD_POPS_S020: [],
        COD_POPS_20023: [],
      },
      parkFg: 'B009', // 파크구분(default: E/L('B009'))
      posFg: '', // POS구분(default: 전체(''))
      divisionFg: '', // 부문구분(default: 전체(''))
      facilCd: null, // 시설코드
      facilNm: null, // 시설명
      posKind: '', // POS종별(default: 전체(''))
      searchParams: {},
      posFgItems: [],
      posGrid: {
        headers: [
          // eslint-disable-next-line no-underscore-dangle
          { text: this.$t('MSG_TXT_NUMBER_ROW'), customValue: (v, r) => r.__idx + 1, width: 50 }, // No.
          { text: this.$t('MSG_TXT_POS_NO'), value: 'posId', width: 200 }, // POS 번호
          { text: this.$t('MSG_TXT_POS_NAME'), value: 'posNm' }, // POS 명
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
  watch: {
    parkFg: {
      immediate: true,
      handler(value) {
        switch (value) {
        case 'B008': // C/B
          this.posFgItems = this.codes.COD_POPS_20010
          break
        case 'B012': // H/B
          this.posFgItems = this.codes.COD_POPS_20012
          break
        default: // default(E/L)
          this.posFgItems = this.codes.COD_POPS_20011
          break
        }
      },
    },
  },
  mounted() {
    http.mergeCodeList(this.$options.name, this.codeKeys, this.codes).then(() => {
      this.codes.COD_POPS_S058 = this.codes.COD_POPS_S058.filter(item => item.value !== 'AL') // ALL('AL')을 사용하지 않음
      this.onClickSearch()
    })
  },
  methods: {
    selectPopsPosList() {
      const queryParams = this.searchParams
      queryParams.offset = this.posGrid.dataSource.totalSize
      queryParams.rowsPerPage = 10

      http.request(this.$options.name, 'DTS_AAX_00009', {
        query: queryParams,
      }).then(res => {
        this.posGrid.dataSource.appendData(res.data.popsPosList)
        this.posGrid.itemSize = res.data.popsPosListTotCnt
      })
    },
    onClickFaciltSearch() {
      utils.openLayerPopup('PGE_AAX_00004', this.onCloseFaciltPopup, { size: 'lg' })
    },
    onCloseFaciltPopup(data = null) {
      if (data) {
        this.facilCd = data.facilCd
        this.facilNm = data.facilNm
      }
    },
    onClickReset() {
      this.parkFg = 'B009' // E/L('B009')
      this.posFg = '' // 전체('')
      this.divisionFg = '' // 전체('')
      this.facilCd = null
      this.facilNm = null
      this.posKind = '' // 전체('')
    },
    onClickSearch() {
      this.searchParams = {
        parkFg: this.parkFg,
        posFg: this.posFg,
        divisionFg: this.divisionFg,
        facilCd: this.facilCd,
        posKind: this.posKind,
      }
      this.posGrid.dataSource.setData()
      this.selectPopsPosList()
    },
    onRowDblClick(row) {
      this.onClickSelect(row)
    },
    onScrollBottom() {
      const totalSize = this.posGrid.itemSize
      const currentSize = this.posGrid.dataSource.totalSize
      if (totalSize > currentSize) {
        this.selectPopsPosList()
      }
    },
    onClickClose() {
      this.closePagePopup()
    },
    onClickSelect(row) {
      const selected = row || this.$refs.posGrid.getSelected()
      if (!selected) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM')) // 선택된 항목이 없습니다.
        return
      }
      const returnData = {
        posId: selected.posId,
        posNm: selected.posNm,
      }
      this.closePagePopup(returnData)
    },
    onKeyupFacilNm(event) {
      if ([8, 46, 110].includes(event.keyCode)) {
        this.facilCd = null
        this.facilNm = null
      }
    },
  },
}
</script>
