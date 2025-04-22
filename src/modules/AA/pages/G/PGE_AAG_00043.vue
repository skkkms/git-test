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
        <!-- 게시 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          style="width: 100%; height: auto;"
        >
          {{ eventPublctKindName }}
        </ur-form-item>
        <!-- 이벤트 명 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          {{ gameData.eventName }}
        </ur-form-item>
        <!-- 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          style="width: 50%; height: auto;"
        >
          {{ gameData.exposrYn }}
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
        <!-- 게임 코드 -->
        <ur-form-item
          :label="$t('MSG_TXT_GAME_CD')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          {{ gameData.gameCdValue }}
        </ur-form-item>
        <!-- 연결 URL -->
        <ur-form-item
          :label="$t('MSG_TXT_CONN_URL')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          {{ gameData.connUrl }}
        </ur-form-item>
        <!-- 썸네일 이미지 -->
        <ur-form-item
          :label="$t('MSG_TXT_THUMBNAIL_IMAG')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            v-model="gameData.thumbnailImagUrl"
            mode="SELECT"
            :page-id="this.$options.name"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 이벤트 정보 -->

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

      <!-- S:: 보상 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          {{ $t('MSG_TXT_REWRD_INFO') }} <!-- 보상 정보 -->
        </h4>
      </div>
      <ur-form-box>
        <!-- 지급 쿠폰 -->
        <ur-form-item
          :label="$t('MSG_TXT_PAYMNT_COUPON')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          {{ gameData.couponName }}
        </ur-form-item>
        <!-- 쿠폰 수량 -->
        <ur-form-item
          :label="$t('MSG_TXT_COUPON_QTY')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          {{ couponQty }}
        </ur-form-item>
        <!-- 보상 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_REWRD_KIND')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          {{ rewrdBaseName }}
        </ur-form-item>
        <!-- 보상 조건 -->
        <ur-form-item
          :label="$t('MSG_TXT_REWRD_COND')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          {{ rewrdCond }}
        </ur-form-item>
        <!-- 반복 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_RPT_YN')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          {{ gameData.rptYn }}
        </ur-form-item>
        <!-- 결산 일시 -->
        <ur-form-item
          :label="$t('MSG_TXT_STLMN_DTM')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          {{ stlmnDtm }}
        </ur-form-item>
      </ur-form-box>

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
import CommonUtils from '~aa/js/common-utils'

export default {
  name: 'PGE_AAG_00043', // eslint-disable-line vue/name-property-casing
  data() {
    return {
      codeKeys: [
        'COD_IA_EVENT_PUBLCT_KIND', // 이벤트게시구분
        'COD_IA_EVENT_EXPOSR_COND', // 이벤트노출조건
        'COD_IA_EVENT_PARTCP_PERIOD', // 이벤트참여주기
        'COD_IA_QTY_LIMIT_YN', // 수량제한여부
        'COD_IA_GAME_REWARD_BASE', // 게임보상기준
        'COD_IA_EVENT_CLOSE_PERIOD', // 이벤트마감주기
        'COD_IA_DOW_ABBREV', // 요일(약어)
      ],
      codes: {
        COD_IA_EVENT_PUBLCT_KIND: [], // 이벤트게시구분
        COD_IA_EVENT_EXPOSR_COND: [], // 이벤트노출조건
        COD_IA_EVENT_PARTCP_PERIOD: [], // 이벤트참여주기
        COD_IA_QTY_LIMIT_YN: [], // 수량제한여부
        COD_IA_GAME_REWARD_BASE: [], // 게임보상기준
        COD_IA_EVENT_CLOSE_PERIOD: [], // 이벤트마감주기
        COD_IA_DOW_ABBREV: [], // 요일(약어)
        COD_IA_YN: [{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],
      },
      gameData: {
        // Single
        eventId: null, // 이벤트ID
        eventPublctKindCd: null, // 이벤트게시구분코드
        eventName: null, // 이벤트명
        exposrYn: null, // 노출여부
        eventStartDtm: null, // 이벤트시작일시
        eventEndDtm: null, // 이벤트종료일시
        gameCdValue: null, // 게임코드값
        connUrl: null, // 연결URL
        thumbnailImagUrl: null, // 썸네일이미지URL
        exposrCondCd: null, // 노출조건코드
        subtrctPointAmt: null, // 차감포인트금액
        partcpPeriodCd: null, // 참여주기코드
        partcpAvailCnt: null, // 참여가능건수
        couponName: null, // 쿠폰명
        rewrdQtyLimitYn: null, // 보상수량제한여부
        rewrdQty: null, // 보상수량
        rewrdBaseCd: null, // 보상기준코드
        rewrdBaseValue: null, // 보상기준값
        rptYn: null, // 반복여부
        closePeriodCd: null, // 마감주기코드
        closeDtm: null, // 마감일시
        closeDowCd: null, // 마감요일코드
        closeDay: null, // 마감일
        closeHm: null, // 마감시분
      },
      eventPartcpCondList: [], // 참여조건목록
      eventPartcpCondListDesc: null, // 참여조건목록설명
    }
  },
  computed: {
    eventPublctKindName() {
      return CommonUtils.getCodeText(
        this.codes.COD_IA_EVENT_PUBLCT_KIND,
        this.gameData.eventPublctKindCd,
      )
    },
    eventPeriod() {
      let eventPeriod = null
      const { eventStartDtm, eventEndDtm } = this.gameData
      if (!utils.isEmpty(eventStartDtm) && !utils.isEmpty(eventEndDtm)) {
        const start = moment(eventStartDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm')
        const end = moment(eventEndDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm')
        eventPeriod = start.concat(' ~ ').concat(end)
      }
      return eventPeriod
    },
    exposrCondName() {
      return CommonUtils.getCodeText(
        this.codes.COD_IA_EVENT_EXPOSR_COND,
        this.gameData.exposrCondCd,
      )
    },
    exhaustGoodsName() {
      const { subtrctPointAmt } = this.gameData
      return subtrctPointAmt ? utils.numberFormat(subtrctPointAmt) : null
    },
    partcpAvailName() {
      const { partcpPeriodCd, partcpAvailCnt } = this.gameData
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
    couponQty() {
      if (this.gameData.rewrdQtyLimitYn === 'Y') {
        return utils.numberFormat(this.gameData.rewrdQty).concat(this.$t('MSG_TXT_NUMBER_OF_COUNT'))
      }
      return CommonUtils.getCodeText(
        this.codes.COD_IA_QTY_LIMIT_YN,
        this.gameData.rewrdQtyLimitYn,
      )
    },
    rewrdBaseName() {
      return CommonUtils.getCodeText(
        this.codes.COD_IA_GAME_REWARD_BASE,
        this.gameData.rewrdBaseCd,
      )
    },
    rewrdCond() {
      let postFix = null
      switch (this.gameData.rewrdBaseCd) {
      case 'RNK':
        postFix = this.$t('MSG_TXT_UP_TO_RANK') //  등 까지
        break
      case 'SCR':
        postFix = this.$t('MSG_TXT_POINTS_OR_MORE') // 점 이상
        break
      case 'RAT':
        postFix = this.$t('MSG_TXT_UP_TO_PERCENT') // % 까지
        break
      default:
        postFix = null
        break
      }
      return postFix ? this.gameData.rewrdBaseValue.concat(postFix) : null
    },
    stlmnPeriod() {
      return CommonUtils.getCodeText(
        this.codes.COD_IA_EVENT_CLOSE_PERIOD,
        this.gameData.closePeriodCd,
      )
    },
    stlmnDow() {
      return CommonUtils.getCodeText(
        this.codes.COD_IA_DOW_ABBREV,
        this.gameData.closeDowCd,
      )
    },
    stlmnHm() {
      return moment(this.gameData.closeHm, 'HHmm').format('HH:mm')
    },
    stlmnDtm() {
      let stlmnDtm = null
      if (this.gameData.rptYn === 'Y') {
        stlmnDtm = []
        if (this.stlmnPeriod) stlmnDtm.push(this.stlmnPeriod)
        if (this.stlmnDow) stlmnDtm.push(this.stlmnDow)
        if (this.gameData.closeDay) stlmnDtm.push(this.gameData.closeDay)
        if (this.stlmnHm) stlmnDtm.push(this.stlmnHm)
        return stlmnDtm.join(', ')
      }
      if (this.gameData.rptYn === 'N') {
        if (this.gameData.closeDtm) {
          stlmnDtm = moment(this.gameData.closeDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm')
        }
      }
      return stlmnDtm
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
    const params = utils.getParameter(this, 'params')
    if (utils.isEmpty(params.eventId)) {
      this.onClickList()
    } else {
      this.initializeCodes()
      this.initializeParams()
    }
  },
  methods: {
    initializeCodes() {
      http.mergeCodeList(this.$options.name, this.codeKeys, this.codes)
    },
    initializeParams() {
      const params = utils.getParameter(this, 'params')
      if (!utils.isEmpty(params.eventId)) {
        this.gameData.eventId = params.eventId
        this.selectGame()
        this.selectEventPartcpCondList(this.gameData.eventId)
      }
    },
    selectGame() {
      http.request(this.$options.name, 'DTS_AAG_00043', {
        path: {
          'event-id': this.gameData.eventId,
        },
      }).then(res => {
        this.gameData = res.data
      })
    },
    selectEventPartcpCondList(eventId) {
      http.request(this.$options.name, 'DTS_AAG_00006', {
        path: {
          'event-id': eventId,
        },
      }).then(res => {
        this.eventPartcpCondList = res.data
      })
    },
    onClickList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAG_00041', { params })
    },
    onClickModify() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAG_00042', { params })
    },
  },
}
</script>
