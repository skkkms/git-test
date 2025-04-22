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
      <!-- 소진 솜 -->
      <ur-form-item
        :label="$t('MSG_TXT_EXHAUST_SOM')"
        label-align="right"
        class="flex_wrap"
        style="width: 50%; height: auto;"
      >
        {{ exhaustGoodsName }}
      </ur-form-item>
      <!-- 참여 기회 -->
      <ur-form-item
        :label="$t('MSG_TXT_PARTCP_OPPR')"
        label-align="right"
        class="flex_wrap"
        style="width: 50%; height: auto;"
      >
        {{ partcpAvailName }}
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
      <!-- 상세 배경 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_DETAIL_BKGRD_IMAG')"
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          v-model="eventSubData.eventRolet.bkgrdImagUrl"
          mode="SELECT"
          :page-id="pageId"
        />
      </ur-form-item>
      <!-- 패널 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_PNL_IMAG')"
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          v-model="eventSubData.eventRolet.pnlImagUrl"
          mode="SELECT"
          :page-id="pageId"
        />
      </ur-form-item>
      <!-- 기준침 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_NDL_IMAG')"
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          v-model="eventSubData.eventRolet.ndlImagUrl"
          mode="SELECT"
          :page-id="pageId"
        />
      </ur-form-item>
      <!-- 시작 버튼 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_START_BTN_IMAG')"
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          v-model="eventSubData.eventRolet.startImagUrl"
          mode="SELECT"
          :page-id="pageId"
        />
      </ur-form-item>
    </ur-form-box>
    <!-- E:: 이벤트 이미지 정보 -->

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
  name: 'PGE_AAG_00013_S03', // eslint-disable-line vue/name-property-casing
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
        'COD_IA_EVENT_PARTCP_PERIOD', // 이벤트참여주기
        'COD_IA_QTY_LIMIT_YN', // 수량제한여부
        'COD_IA_EVENT_REWARD_KIND', // 이벤트보상구분
        'COD_IA_EVENT_WINNG_LIMIT_PERIOD', // 이벤트당첨제한주기
      ],
      codes: {
        COD_IA_EVENT_EXPOSR_COND: [], // 이벤트노출조건
        COD_IA_EVENT_PARTCP_PERIOD: [], // 이벤트참여주기
        COD_IA_QTY_LIMIT_YN: [], // 수량제한여부
        COD_IA_EVENT_REWARD_KIND: [], // 이벤트보상구분
        COD_IA_EVENT_WINNG_LIMIT_PERIOD: [], // 이벤트당첨제한주기
      },
      eventSubData: {
        // Single
        exposrCondCd: null, // 노출조건코드
        subtrctPointAmt: null, // 차감포인트금액
        partcpPeriodCd: null, // 참여주기코드
        partcpAvailCnt: null, // 참여가능건수
        thumbnailImagUrl: null, // 썸네일이미지URL
        eventRolet: {
          bkgrdImagUrl: null, // 배경이미지URL
          pnlImagUrl: null, // 패널이미지URL
          ndlImagUrl: null, // 기준침이미지URL
          startImagUrl: null, // 시작이미지URL
        },
      },
      eventPartcpCondList: [], // 참여조건목록
      eventRewrdList: [], // 이벤트보상목록
      eventPartcpCondListDesc: null, // 참여조건목록설명
      rewrdGrid: {
        headers: [],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        options: {
          height: 330, // 282(5), 522(10), 762(15), 1482(30)
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
    exhaustGoodsName() {
      const { subtrctPointAmt } = this.eventSubData
      return subtrctPointAmt ? utils.numberFormat(subtrctPointAmt) : null
    },
    partcpAvailName() {
      const { partcpPeriodCd, partcpAvailCnt } = this.eventSubData
      if (partcpPeriodCd && partcpAvailCnt) {
        const partcpAvailName = []
        partcpAvailName.push(CommonUtils.getCodeText(
          this.codes.COD_IA_EVENT_PARTCP_PERIOD, partcpPeriodCd,
        ))
        partcpAvailName.push(utils.numberFormat(partcpAvailCnt).concat(this.$t('MSG_TXT_NUMBER_OF_TIMES')))
        return partcpAvailName.join(', ')
      }
      return null
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
          customValue: v => (v || '-'),
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
              customValue = utils.numberFormat(v).concat(this.$t('MSG_TXT_NUMBER_OF_COUNT'))
            } else {
              customValue = CommonUtils.getCodeText(
                this.codes.COD_IA_QTY_LIMIT_YN, r.rewrdQtyLimitYn,
              )
            }
            return customValue || '-'
          },
          width: 200,
        },
        {
          text: this.$t('MSG_TXT_PERCENTAGE'), // 확률
          value: 'winngRate',
          customValue: v => String(v).concat('%'),
          width: 150,
        },
        {
          text: this.$t('MSG_TXT_WINNG_LIMIT'), // 당첨 제한
          value: 'winngLimitQty',
          customValue: (v, r) => {
            let customValue = null
            if (r.rewrdKindCd !== '99') {
              customValue = CommonUtils.getCodeText(
                this.codes.COD_IA_EVENT_WINNG_LIMIT_PERIOD, r.winngLimitPeriodCd,
              )
              if (r.winngLimitPeriodCd !== 'UNL') {
                customValue = `${customValue} ${utils.numberFormat(v).concat(this.$t('MSG_TXT_NUMBER_OF_COUNT'))}`
              }
            }
            return customValue || '-'
          },
          width: 150,
        },
      ]
    },
    initializeParams() {
      this.eventSubData = utils.assign(this.eventSubData, this.eventData)
      this.selectEventPartcpCondList()
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
