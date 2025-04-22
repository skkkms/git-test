<template>
  <div>
    <!-- S:: 조건 정보 -->
    <div class="comm_title_wrap mt20">
      <h4>
        {{ $t('MSG_TXT_COND_INFO') }} <!-- 조건 정보 -->
      </h4>
    </div>
    <ur-form-box>
      <!-- 참여 조건 -->
      <ur-form-item
        :label="$t('MSG_TXT_PARTCP_COND')"
        label-align="right"
        class="flex_wrap"
        style="width: 50%; height: auto;"
      >
        {{ eventPartcpCondListDesc }}
      </ur-form-item>
      <!-- 노출 조건 -->
      <ur-form-item
        :label="$t('MSG_TXT_EXPOSR_COND')"
        label-align="right"
        class="flex_wrap"
        style="width: 50%; height: auto;"
      >
        {{ exposrCondName }}
      </ur-form-item>
    </ur-form-box>
    <!-- E:: 조건정보 -->

    <!-- S:: 이벤트 이미지 정보 -->
    <div class="comm_title_wrap mt20">
      <h4>
        {{ $t('MSG_TXT_EVENT_IMAG_INFO') }} <!-- 이벤트 이미지 정보 -->
      </h4>
    </div>
    <ur-form-box>
      <!-- 썸네일 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_THUMBNAIL_IMAG')"
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          v-model="eventSubData.thumbnailImagUrl"
          mode="SELECT"
          :page-id="pageId"
        />
      </ur-form-item>
      <!-- 상세 배너 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_DETAIL_BANNER_IMAG')"
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          v-model="eventSubData.bannerImagUrl"
          mode="SELECT"
          :page-id="pageId"
        />
      </ur-form-item>
      <!-- 스탬프 배경 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_STMP_BKGRD_IMAG')"
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          v-model="eventSubData.eventStmp.stmpBkgrdImagUrl"
          mode="SELECT"
          :page-id="pageId"
        />
      </ur-form-item>
      <!-- 스탬프 보상 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_STMP_REWRD_IMAG')"
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          v-model="eventSubData.eventStmp.stmpRewrdImagUrl"
          mode="SELECT"
          :page-id="pageId"
        />
      </ur-form-item>
      <!-- 스탬프 비활성화 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_STMP_INACTIVATED_IMAG')"
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          v-model="eventSubData.eventStmp.stmpInactivImagUrl"
          mode="SELECT"
          :page-id="pageId"
        />
      </ur-form-item>
      <!-- 스탬프 활성화 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_STMP_ACTIVATED_IMAG')"
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          v-model="eventSubData.eventStmp.stmpActivImagUrl"
          mode="SELECT"
          :page-id="pageId"
        />
      </ur-form-item>
      <!-- 스페셜 스탬프 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_SPECIAL_STMP_IMAG')"
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          v-model="eventSubData.eventStmp.spcialStmpImagUrl"
          mode="SELECT"
          :page-id="pageId"
        />
      </ur-form-item>
    </ur-form-box>
    <!-- E:: 이벤트 이미지 정보 -->

    <!-- S:: 이벤트 상세 정보 -->
    <div class="comm_title_wrap mt20">
      <h4>
        {{ $t('MSG_TXT_EVENT_DETAIL_INFO') }} <!-- 이벤트 상세 정보 -->
      </h4>
    </div>
    <ur-data-grid
      ref="stmpDetailGrid"
      :headers="stmpDetailGrid.headers"
      :data-source="stmpDetailGrid.dataSource"
      :options="stmpDetailGrid.options"
      :data-set-options="{id: 'id'}"
    />
    <!-- E:: 이벤트 상세 정보 -->

    <!-- S:: 보상 정보 -->
    <div class="comm_title_wrap mt20">
      <h4>
        {{ $t('MSG_TXT_REWRD_INFO') }} <!-- 보상 정보 -->
      </h4>
    </div>
    <ur-data-grid
      ref="rewrdGrid"
      :headers="rewrdGrid.headers"
      :data-source="rewrdGrid.dataSource"
      :options="rewrdGrid.options"
      :data-set-options="{id: 'id'}"
    />
    <!-- E:: 보상 정보 -->
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component'
import CommonUtils from '~aa/js/common-utils'

export default {
  name: 'PGE_AAG_00013_S02', // eslint-disable-line vue/name-property-casing
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
    eventData: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      codeKeys: [
        'COD_IA_EVENT_EXPOSR_COND', // 이벤트노출조건
        'COD_IA_QTY_LIMIT_YN', // 수량제한여부
        'COD_IA_EVENT_REWARD_KIND', // 이벤트보상구분
      ],
      codes: {
        COD_IA_EVENT_EXPOSR_COND: [], // 이벤트노출조건
        COD_IA_QTY_LIMIT_YN: [], // 수량제한여부
        COD_IA_EVENT_REWARD_KIND: [], // 이벤트보상구분
      },
      eventSubData: {
        // Single
        exposrCondCd: null, // 노출조건코드
        thumbnailImagUrl: null, // 썸네일이미지URL
        bannerImagUrl: null, // 배너이미지URL
        eventStmp: {
          stmpBkgrdImagUrl: null, // 스탬프배경이미지URL
          stmpRewrdImagUrl: null, // 스탬프보상이미지URL
          stmpInactivImagUrl: null, // 스탬프비활성이미지URL
          stmpActivImagUrl: null, // 스탬프활성이미지URL
          spcialStmpImagUrl: null, // 특별스탬프이미지URL
        },
      },
      eventPartcpCondList: [], // 참여조건목록
      eventStmpDetailList: [], // 이벤트스탬프상세목록
      eventRewrdList: [], // 이벤트보상목록
      eventPartcpCondListDesc: null, // 참여조건목록설명
      stmpDetailGrid: {
        headers: [],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        options: {
          noInfo: true,
          selectCheckOnly: true,
          msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
        },
      },
      rewrdGrid: {
        headers: [],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        options: {
          noInfo: true,
          selectCheckOnly: true,
          msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
        },
      },
    }
  },
  computed: {
    exposrCondName() {
      return CommonUtils.getCodeText(
        this.codes.COD_IA_EVENT_EXPOSR_COND,
        this.eventSubData.exposrCondCd,
      )
    },
  },
  watch: {
    eventPartcpCondList: {
      handler(list) {
        if (list.length === 0) {
          this.eventPartcpCondListDesc = null
        } else if (list.length === 1) {
          const { condName } = list.at(0)
          this.eventPartcpCondListDesc = condName
        } else {
          const { condName } = list.at(0)
          this.eventPartcpCondListDesc = utils.strFormat(this.$t('MSG_TXT_EXID_CNT'), condName, list.length - 1)
        }
      },
    },
  },
  created() {
    http.mergeCodeList(this.pageId, this.codeKeys, this.codes).then(() => {
      this.initializeHeaders()
      this.initializeParams()
    })
  },
  methods: {
    initializeHeaders() {
      this.stmpDetailGrid.headers = [
        {
          text: this.$t('MSG_TXT_NUMBER_ROW'), // No.
          value: 'stmpNo',
          width: 50,
        },
        {
          text: this.$t('MSG_TXT_SPECIAL_STMP_YN'), // 스페셜 스탬프 여부
          value: 'spcialStmpYn',
          width: 150,
        },
        {
          text: this.$t('MSG_TXT_ITEM_NAME'), // 항목 명
          value: 'stmpName',
        },
        {
          text: this.$t('MSG_TXT_ATTAIN_COND'), // 달성 조건
          value: 'attainCondName',
        },
      ]

      this.rewrdGrid.headers = [
        {
          text: this.$t('MSG_TXT_NUMBER_ROW'), // No.
          customValue: (v, r) => r.__idx + 1, // eslint-disable-line no-underscore-dangle
          width: 50,
        },
        {
          text: this.$t('MSG_TXT_KIND'), // 구분
          type: 'code',
          value: 'rewrdKindCd',
          domain: this.codes.COD_IA_EVENT_REWARD_KIND,
          width: 120,
        },
        {
          text: this.$t('MSG_TXT_GVWY_NAME'), // 경품 명
          value: 'rewrdName',
        },
        {
          text: this.$t('MSG_TXT_PAYMNT_COUPON'), // 지급 쿠폰
          value: 'couponName',
          customValue: v => (v || '-'),
        },
        {
          text: this.$t('MSG_TXT_QTY'), // 수량
          value: 'rewrdQty',
          customValue: (v, r) => {
            let customValue = null
            if (r.rewrdQtyLimitYn === 'Y') {
              customValue = utils.numberFormat(v).concat(this.$t('MSG_TXT_NUMBER_OF_COUNT')) // 개
            } else {
              customValue = CommonUtils.getCodeText(
                this.codes.COD_IA_QTY_LIMIT_YN, r.rewrdQtyLimitYn,
              )
            }
            return customValue
          },
          width: 250,
        },
        {
          text: this.$t('MSG_TXT_REWRD_COND'), // 보상 조건
          value: 'rewrdCondValue',
          customValue: v => utils.numberFormat(v).concat(this.$t('MSG_TXT_NUMBER_OF_ATTAIN_COUNT')), // 개 달성
          width: 150,
        },
      ]
    },
    initializeParams() {
      this.eventSubData = utils.assign(this.eventSubData, this.eventData)
      this.selectEventPartcpCondList()
      this.selectEventStmpDetailList()
      this.selectEventRewardList()
    },
    selectEventPartcpCondList() {
      http.request(this.pageId, 'DTS_AAG_00006', {
        path: {
          'event-id': this.eventId,
        },
      }).then(res => {
        this.eventPartcpCondList = res.data
      })
    },
    selectEventStmpDetailList() {
      http.request(this.pageId, 'DTS_AAG_00009', {
        path: {
          'event-id': this.eventId,
        },
      }).then(res => {
        this.eventStmpDetailList = res.data
        this.$refs.stmpDetailGrid.setData(this.eventStmpDetailList)
      })
    },
    selectEventRewardList() {
      http.request(this.pageId, 'DTS_AAG_00007', {
        path: {
          'event-id': this.eventId,
        },
      }).then(res => {
        this.eventRewrdList = res.data
        this.$refs.rewrdGrid.setData(this.eventRewrdList)
      })
    },
  },
}
</script>
