<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S:: 이벤트 정보 -->
      <div class="comm_title_wrap">
        <h4>
          {{ $t('MSG_TXT_EVENT_INFO') }} <!-- 이벤트 정보 -->
        </h4>
      </div>
      <ur-form-box>
        <!-- 이벤트 명 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          {{ attendChkData.eventName }}
        </ur-form-item>
        <!-- 이벤트 기간 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_PERIOD')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          {{ eventPeriod }}
        </ur-form-item>
        <!-- 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          style="width: 50%; height: auto;"
        >
          {{ attendChkData.exposrYn }}
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 이벤트 정보 -->

      <!-- S:: 이벤트 이미지 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          {{ $t('MSG_TXT_EVENT_IMAG_INFO') }} <!-- 이벤트 이미지 정보 -->
        </h4>
      </div>
      <ur-form-box>
        <!-- 상세 배너 이미지 -->
        <ur-form-item
          :label="$t('MSG_TXT_DETAIL_BANNER_IMAG')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            ref="bannerImag"
            v-model="attendChkData.bannerImagUrl"
            mode="SELECT"
            :page-id="this.$options.name"
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
            ref="stmpBkgrdImag"
            v-model="attendChkData.stmpBkgrdImagUrl"
            mode="SELECT"
            :page-id="this.$options.name"
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
            ref="stmpInactivImag"
            v-model="attendChkData.stmpInactivImagUrl"
            mode="SELECT"
            :page-id="this.$options.name"
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
            ref="stmpActivImag"
            v-model="attendChkData.stmpActivImagUrl"
            mode="SELECT"
            :page-id="this.$options.name"
          />
        </ur-form-item>
        <!-- 스페셜 스탬프 비활성화 이미지 -->
        <ur-form-item
          :label="$t('MSG_TXT_SPECIAL_STMP_INACTIVATED_IMAG')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            ref="spcialStmpInactivImag"
            v-model="attendChkData.spcialStmpInactivImagUrl"
            mode="SELECT"
            :page-id="this.$options.name"
          />
        </ur-form-item>
        <!-- 스페셜 스탬프 활성화 이미지 -->
        <ur-form-item
          :label="$t('MSG_TXT_SPECIAL_STMP_ACTIVATED_IMAG')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            ref="spcialStmpActivImagUrl"
            v-model="attendChkData.spcialStmpActivImagUrl"
            mode="SELECT"
            :page-id="this.$options.name"
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

      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button
              @click="onClickList"
            >
              {{ $t('MSG_BTN_LIST') }} <!-- 목록 -->
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button
              v-permission:update="this.$options.name"
              color="violet"
              @click="onClickModify"
            >
              {{ $t('MSG_BTN_MOD') }} <!-- 수정 -->
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component'
import CommonUtils from '~aa/js/common-utils'

export default {
  name: 'PGE_AAG_00033', // eslint-disable-line vue/name-property-casing
  data() {
    return {
      codeKeys: [
        'COD_IA_QTY_LIMIT_YN', // 수량제한여부
        'COD_IA_EVENT_REWARD_KIND', // 이벤트보상구분
      ],
      codes: {
        COD_IA_QTY_LIMIT_YN: [],
        COD_IA_EVENT_REWARD_KIND: [],
      },
      attendChkData: {
        eventId: '',
        eventName: '', // 이벤트명
        eventStartDtm: '', // 이벤트시작일시
        eventEndDtm: '', // 이벤트종료일시
        exposrYn: null, // 노출여부
      },
      attendChkRewrdList: [], // 이벤트보상목록
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
    eventPeriod() {
      let eventPeriod = null
      const { eventStartDtm, eventEndDtm } = this.attendChkData
      if (!utils.isEmpty(eventStartDtm) && !utils.isEmpty(eventEndDtm)) {
        const start = moment(eventStartDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm')
        const end = moment(eventEndDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm')
        eventPeriod = start.concat(' ~ ').concat(end)
      }
      return eventPeriod
    },
  },
  created() {
    const params = utils.getParameter(this, 'params')
    if (utils.isEmpty(params.eventId)) {
      this.onClickList()
    } else {
      this.initializeCodes()
      this.initializeHeaders()
      this.initializeParams()
    }
  },
  methods: {
    initializeCodes() {
      http.mergeCodeList(this.$options.name, this.codeKeys, this.codes)
    },
    initializeHeaders() {
      this.rewrdGrid.headers = [
        {
          text: this.$t('MSG_TXT_NUMBER_ROW'), // No.
          customValue: (v, r) => r.__idx + 1, // eslint-disable-line no-underscore-dangle
          width: 50,
        },
        {
          text: this.$t('MSG_TXT_SPECIAL_STMP_YN'), // 스페셜 스탬프 여부
          value: 'spcialStmpYn',
          width: 150,
        },
        {
          text: this.$t('MSG_TXT_KIND'), // 구분
          type: 'code',
          value: 'rewrdKindCd',
          domain: this.codes.COD_IA_EVENT_REWARD_KIND,
          width: 150,
        },
        {
          text: this.$t('MSG_TXT_GVWY_NAME'), // 경품 명
          value: 'rewrdName',
        },
        {
          text: this.$t('MSG_TXT_PAYMNT_COUPON'), // 지급 쿠폰
          value: 'couponName',
          customValue: v => (utils.isEmpty(v) ? '-' : v),
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
            return customValue
          },
          width: 120,
        },
        {
          text: this.$t('MSG_TXT_REWRD_DATE'), // 보상 일자
          value: 'rewrdDcnt',
          customValue: v => String(v).concat(this.$t('MSG_TXT_DAY_OF_ATTEND_COUNT')),
          width: 180,
        },
      ]
    },
    initializeParams() {
      const params = utils.getParameter(this, 'params')
      if (!utils.isEmpty(params.eventId)) {
        this.attendChkData.eventId = params.eventId
        this.selectAttendChk()
        this.selectAttendChkRewrdList()
      }
    },
    selectAttendChk() {
      http.request(this.$options.name, 'DTS_AAG_00033', {
        path: {
          'event-id': this.attendChkData.eventId,
        },
      }).then(res => {
        this.attendChkData = res.data
      })
    },
    selectAttendChkRewrdList() {
      http.request(this.$options.name, 'DTS_AAG_00036', {
        path: {
          'event-id': this.attendChkData.eventId,
        },
      }).then(res => {
        this.attendChkRewrdList = res.data
        this.$refs.rewrdGrid.setData(this.attendChkRewrdList)
      })
    },
    onClickList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAG_00031', { params })
    },
    onClickModify() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAG_00032', { params })
    },
  },
}
</script>
