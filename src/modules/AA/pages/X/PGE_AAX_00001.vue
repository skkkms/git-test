<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box>
        <!-- 쿠폰 마스터 번호 -->
        <ur-form-item
          :label="$t('MSG_TXT_COUPON_MASTER_NO')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="couponMasterNo"
            mask="##########"
            maxlength="10"
            style="width: 100%;"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
        <!-- 쿠폰 명 -->
        <ur-form-item
          :label="$t('MSG_TXT_COUPON_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="couponName"
            style="width: 100%;"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
        <!-- 발행 확정 일자 -->
        <ur-form-item
          :label="$t('MSG_TXT_ISSUE_FIX_DATE')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-range-picker
            v-model="issueFixPeriods"
            input-type="YYYY-MM-DD"
            model-type="YYYYMMDD"
            :confirm-label="$t('MSG_TXT_SEL')"
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
        ref="couponGrid"
        class="mt35"
        :headers="couponGrid.headers"
        :data-source="couponGrid.dataSource"
        :options="couponGrid.options"
        :data-set-options="{id: 'id'}"
        @grid:row-dbl-click="onRowDblClick"
      >
        <template #header>
          <ur-data-grid-header-row>
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell
              colspan="2"
              align="center"
              :text="$t('MSG_TXT_VALID_PERIOD')"
            />
          </ur-data-grid-header-row>
          <ur-data-grid-header-row>
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell />
          </ur-data-grid-header-row>
        </template>
      </ur-data-grid>
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
  name: 'PGE_AAX_00001', // eslint-disable-line vue/name-property-casing
  props: {
    pageInitialData: {
      type: Object,
      required: false,
      default() {
        return {
          issueChCd: null,
        }
      },
    },
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
        'COD_IA_COUPON_ISSUE_CHN', // [멤버십 시스템 코드] 쿠폰발행채널
      ],
      codes: {
        COD_IA_COUPON_ISSUE_CHN: [],
      },
      couponMasterNo: '',
      couponName: '',
      issueFixPeriods: [],

      couponGrid: {
        headers: [],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        options: {
          infinityScroll: true,
          pagination: false,
          height: 282, // 522(10), 762(15), 1482(30)
          noInfo: true,
          multiSelect: false,
          msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
          resizableColumn: true,
        },
      },
    }
  },
  created() {
    this.initializeCodes()
    this.initializeHeaders()
  },
  mounted() {
  },
  methods: {
    initializeCodes() {
      http.mergeCodeList(this.$options.name, this.codeKeys, this.codes)
    },
    initializeHeaders() {
      this.couponGrid.headers = [
        { hide: true, value: 'masterId' },
        {
          text: this.$t('MSG_TXT_COUPON_MASTER_NO'), // 쿠폰 마스터 번호
          width: 110,
          minWidth: 110,
          value: 'couponMasterNo',
        },
        {
          text: this.$t('MSG_TXT_COUPON_NAME'), // 쿠폰 명
          minWidth: 180,
          value: 'couponName',
        },
        {
          text: this.$t('MSG_TXT_ISSUE_ORDER'), // 발행 차수
          width: 70,
          minWidth: 70,
          value: 'issueSeq',
        },
        {
          text: this.$t('MSG_TXT_ISSUE_CHN'), // 발행 채널
          type: 'code',
          width: 70,
          minWidth: 70,
          value: 'issueChCd',
          domain: this.codes.COD_IA_COUPON_ISSUE_CHN,
        },
        {
          text: this.$t('MSG_TXT_COUPON_KIND'), // 쿠폰 구분
          width: 70,
          minWidth: 70,
          value: 'couponKind',
        },
        {
          text: this.$t('MSG_TXT_ISSUE_FIX_DTM'), // 발행 확정 일시
          width: 140,
          minWidth: 140,
          value: 'issueFixDtm',
          customValue: v => {
            const date = moment(v, 'YYYYMMDDHHmmss', true)
            return date.isValid() ? date.format('YYYY-MM-DD HH:mm:ss') : null
          },
        },
        {
          // 유효기간 시작일자
          text: this.$t('MSG_TXT_START_DATE_1'), // 시작일자
          width: 115,
          minWidth: 115,
          value: 'validPeriodStartDate',
          customValue: v => {
            const date = moment(v, 'YYYYMMDD', true)
            return date.isValid() ? date.format('YYYY-MM-DD') : v
          },
        },
        {
          // 유효기간 종료일자
          text: this.$t('MSG_TXT_END_DATE_1'), // 종료일자
          width: 115,
          minWidth: 115,
          value: 'validPeriodEndDate',
          customValue: v => {
            const date = moment(v, 'YYYYMMDD', true)
            return date.isValid() ? date.format('YYYY-MM-DD') : v
          },
        },
      ]
    },
    selectCouponList() {
      http.request(this.$options.name, 'DTS_AAX_00005', {
        query: {
          couponMasterNo: encodeURI(this.couponMasterNo),
          couponName: encodeURI(this.couponName),
          issueFixStartDate: this.issueFixPeriods.at(0),
          issueFixEndDate: this.issueFixPeriods.at(1),
          issueChCd: this.pageInitialData.issueChCd,
        },
      }).then(res => {
        if (!this.couponMasterNo) {
          // 쿠폰 마스터 번호를 입력하지 않고 조회하실 경우, 각 쿠폰 별 최종 발행 차수만 조회됩니다.
          utils.toast(this.$t('MSG_ALT_SEARCH_WITHOUT_COUPON_MASTER_NO'))
        }
        this.couponGrid.dataSource = res.data
      })
    },
    onClickReset() {
      this.couponMasterNo = ''
      this.couponName = ''
      this.issueFixPeriods = []
    },
    onClickSearch() {
      this.selectCouponList()
    },
    onRowDblClick(row) {
      this.onClickSelect(row)
    },
    onClickClose() {
      this.closePagePopup()
    },
    onClickSelect(row) {
      const selected = row || this.$refs.couponGrid.getSelected()
      if (!selected) {
        utils.messageBox('warning', this.$t('MSG_ALT_NOT_SEL_ITEM')) // 선택된 항목이 없습니다.
        return
      }
      const returnData = {
        masterId: selected.masterId,
        couponMasterNo: selected.couponMasterNo,
        issueSeq: selected.issueSeq,
        couponName: selected.couponName,
        issueChCd: selected.issueChCd,
        validPeriodStartDate: selected.validPeriodStartDate,
        validPeriodEndDate: selected.validPeriodEndDate,
      }
      this.closePagePopup(returnData)
    },
  },
}
</script>
