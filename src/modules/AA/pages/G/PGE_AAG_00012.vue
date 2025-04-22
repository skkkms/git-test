<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S:: 노출 정보 -->
      <div class="comm_title_wrap">
        <h4>
          {{ $t('MSG_TXT_EXPOSR_INFO') }} <!-- 노출 정보 -->
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- 게시 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          label-align="right"
          style="width: 100%; height: auto;"
          required
        >
          <ur-radio-wrapper
            ref="eventPublictKind"
            v-model="eventData.eventPublctKindCd"
            :items="codes.COD_IA_EVENT_PUBLCT_KIND"
            small
          >
            <template v-for="item in codes.COD_IA_EVENT_PUBLCT_KIND">
              <ur-radio
                :key="item.value"
                :value="item.value"
                small
              >
                {{ item.text }}
              </ur-radio>
            </template>
          </ur-radio-wrapper>
        </ur-form-item>
        <!-- 이벤트 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_KIND')"
          label-align="right"
          style="width: 100%; height: auto;"
          required
        >
          <ur-radio-wrapper
            v-model="eventData.eventKindCd"
            :items="codes.COD_IA_EVENT_KIND"
            small
          >
            <template v-for="item in codes.COD_IA_EVENT_KIND">
              <ur-radio
                :key="item.value"
                :value="item.value"
                sm
              >
                {{ item.text }}
              </ur-radio>
            </template>
          </ur-radio-wrapper>
        </ur-form-item>
        <!-- 이벤트 분류 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_CLASS')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
          required
          :rules="$rules.getRules('not_empty')"
        >
          <div v-if="eventData.eventId">
            {{ eventClassName }}
          </div>
          <ur-dropdown
            v-else
            v-model="eventData.eventClassCd"
            :items="codes.COD_IA_EVENT_CLASS"
            :placeholder="$t('MSG_TXT_SEL')"
            style="width: 444px !important"
            @input="onInputEventClass"
          />
        </ur-form-item>
        <!-- 이벤트 명 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
          required
        >
          <ur-text-field
            v-model="eventData.eventName"
            style="width: 100%;"
            maxlength="150"
          />
        </ur-form-item>
        <!-- 이벤트 기간 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_PERIOD')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
          required
        >
          <ur-date-time-range-picker
            v-model="eventPeriods"
            input-type="YYYY-MM-DD HH:mm"
            model-type="YYYYMMDDHHmm"
            :confirm-label="$t('MSG_BTN_SELT')"
            :clear-label="$t('MSG_BTN_INTL')"
            :min-date="minEventStartDate"
            @input="onInputEventPeriods"
          />
        </ur-form-item>
        <!-- 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          required
          label-align="right"
          style="width: 50%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="eventData.exposrYn"
            :items="codes.COD_IA_YN"
            small
          >
            <template v-for="item in codes.COD_IA_YN">
              <ur-radio
                :key="item.value"
                :value="item.value"
                sm
              >
                {{ item.text }}
              </ur-radio>
            </template>
          </ur-radio-wrapper>
        </ur-form-item>
        <!-- 노출 순서 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_ORDER')"
          label-align="right"
          required
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="eventData.exposrSeq"
            style="width: 100%;"
            mask="number"
            maxlength="4"
            @keyup="eventData.exposrSeq = parseInt(eventData.exposrSeq, 10)"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 노출 정보 -->

      <!-- OX퀴즈 -->
      <event-ox-quiz-sub
        v-if="showOxQuizSub"
        ref="eventOxQuizSub"
        :page-id="this.$options.name"
        :event-id="eventData.eventId"
        :event-data="eventSubParams"
      />

      <!-- 스탬프 -->
      <event-stamp-sub
        v-if="showStampSub"
        ref="eventStampSub"
        :page-id="this.$options.name"
        :event-id="eventData.eventId"
        :event-data="eventSubParams"
      />

      <!-- 룰렛 -->
      <event-roulette-sub
        v-if="showRouletteSub"
        ref="eventRouletteSub"
        :page-id="this.$options.name"
        :event-id="eventData.eventId"
        :event-data="eventSubParams"
      />

      <!-- 응모 -->
      <event-draw-sub
        v-if="showDrawSub"
        ref="eventDrawSub"
        :page-id="this.$options.name"
        :event-id="eventData.eventId"
        :event-data="eventSubParams"
      />

      <!-- 기타 -->
      <event-etc-sub
        v-if="showEtcSub"
        ref="eventEtcSub"
        :page-id="this.$options.name"
        :event-id="eventData.eventId"
        :event-data="eventSubParams"
      />

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
              v-permission:create="this.$options.name"
              color="violet"
              @click="onClickSave"
            >
              {{ $t('MSG_BTN_SAVE') }} <!-- 저장 -->
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import EventOxQuizSub from '~aa/pages/G/components/PGE_AAG_00012_S01.vue'
import EventStampSub from '~aa/pages/G/components/PGE_AAG_00012_S02.vue'
import EventRouletteSub from '~aa/pages/G/components/PGE_AAG_00012_S03.vue'
import EventDrawSub from '~aa/pages/G/components/PGE_AAG_00012_S04.vue'
import EventEtcSub from '~aa/pages/G/components/PGE_AAG_00012_S05.vue'
import CommonUtils from '~aa/js/common-utils'
import EventMixin from '~aa/pages/G/mixins/EventMixin'

export default {
  name: 'PGE_AAG_00012', // eslint-disable-line vue/name-property-casing
  components: {
    EventOxQuizSub,
    EventStampSub,
    EventRouletteSub,
    EventDrawSub,
    EventEtcSub,
  },
  mixins: [EventMixin],
  data() {
    return {
      codeKeys: [
        'COD_IA_EVENT_PUBLCT_KIND', // 이벤트게시구분
        'COD_IA_EVENT_KIND', // 이벤트구분
        'COD_IA_EVENT_CLASS', // 이벤트분류
        'COD_IA_QTY_LIMIT_YN', // 수량제한여부
        'COD_IA_EVENT_EXPOSR_COND', // 이벤트노출조건
      ],
      codes: {
        COD_IA_EVENT_PUBLCT_KIND: [], // 이벤트게시구분
        COD_IA_EVENT_KIND: [], // 이벤트구분
        COD_IA_EVENT_CLASS: [], // 이벤트분류
        COD_IA_QTY_LIMIT_YN: [], // 수량제한여부
        COD_IA_EVENT_EXPOSR_COND: [], // 이벤트노출조건
        COD_IA_YN: [{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],
      },
      params: {},
      eventData: {
        eventId: null, // 이벤트ID
        eventPublctKindCd: null, // 이벤트게시구분코드
        eventKindCd: null, // 이벤트구분코드
        eventClassCd: null, // 이벤트분류코드
        eventName: null, // 이벤트명
        eventStartDtm: null, // 이벤트시작일시
        eventEndDtm: null, // 이벤트종료일시
        exposrYn: null, // 노출여부
        exposrSeq: null, // 노출순번
      },
      eventPeriods: [], // 이벤트기간
      minEventStartDate: null,
      eventSub: null,
      showOxQuizSub: false,
      showStampSub: false,
      showRouletteSub: false,
      showDrawSub: false,
      showEtcSub: false,
    }
  },
  computed: {
    eventClassName() {
      return CommonUtils.getCodeText(
        this.codes.COD_IA_EVENT_CLASS,
        this.eventData.eventClassCd,
      )
    },
  },
  watch: {
    'eventData.eventClassCd': {
      handler(value) {
        this.onInputEventClass(value)
      },
    },
  },
  created() {
    this.initializeCodes()
    this.initializeParams()
  },
  methods: {
    initializeCodes() {
      http.mergeCodeList(this.$options.name, this.codeKeys, this.codes).then(() => {
        if (!_.isEmpty(this.codes.COD_IA_EVENT_PUBLCT_KIND)) {
          const head = this.codes.COD_IA_EVENT_PUBLCT_KIND.filter(item => item.value === 'CM')
          const tail = this.codes.COD_IA_EVENT_PUBLCT_KIND.filter(item => item.value !== 'CM')
          this.codes.COD_IA_EVENT_PUBLCT_KIND = head.concat(tail)
        }

        if (!_.isEmpty(this.codes.COD_IA_EVENT_CLASS)) {
          this.codes.COD_IA_EVENT_CLASS = this.codes.COD_IA_EVENT_CLASS.filter(item => [
            '01', // OX퀴즈
            '02', // 스탬프
            '03', // 룰렛
            '04', // 응모 이벤트
            '05', // 기타 이벤트
          ].includes(item.value))
        }
      })
    },
    initializeParams() {
      const params = utils.getParameter(this, 'params')
      if (utils.isEmpty(params.eventId)) {
        this.eventData.eventStartDtm = utils.now('YYYYMMDD0000')
        this.eventPeriods = [this.eventData.eventStartDtm, this.eventData.eventEndDtm]
        this.minEventStartDate = utils.now('YYYY-MM-DD')
      } else {
        this.eventData.eventId = params.eventId
        this.selectEvent()
      }
    },
    selectEvent() {
      http.request(this.$options.name, 'DTS_AAG_00003', {
        path: {
          'event-id': this.eventData.eventId,
        },
      }).then(res => {
        this.eventData = res.data
        const eventStartDtm = moment(this.eventData.eventStartDtm, 'YYYYMMDDHHmmss').format('YYYYMMDDHHmm')
        const eventEndDtm = !this.eventData.eventEndDtm ? '' : moment(this.eventData.eventEndDtm, 'YYYYMMDDHHmmss').format('YYYYMMDDHHmm')
        this.eventPeriods = [eventStartDtm, eventEndDtm]

        this.minEventStartDate = CommonUtils.getMinDateWithToday(this.eventData.eventStartDtm, 'YYYYMMDDHHmmss')
      })
    },
    onInputEventClass(value) {
      this.showOxQuizSub = false
      this.showStampSub = false
      this.showRouletteSub = false
      this.showDrawSub = false
      this.showEtcSub = false

      this.eventSubParams = {
        exposrCondCd: this.eventData.exposrCondCd,
        subtrctPointAmt: this.eventData.subtrctPointAmt,
        partcpAvailCnt: this.eventData.partcpAvailCnt,
        thumbnailImagUrl: this.eventData.thumbnailImagUrl,
        thumbnailImagAltDesc: this.eventData.thumbnailImagAltDesc,
        bannerImagUrl: this.eventData.bannerImagUrl,
        bannerImagAltDesc: this.eventData.bannerImagAltDesc,
      }

      switch (value) {
      case '01': // OX퀴즈
        this.showOxQuizSub = true
        this.$nextTick(() => {
          this.eventSub = this.$refs.eventOxQuizSub
        })
        break
      case '02': // 스탬프
        this.showStampSub = true
        this.eventSubParams.eventStmp = this.eventData.eventStmp
        this.$nextTick(() => {
          this.eventSub = this.$refs.eventStampSub
        })
        break
      case '03': // 룰렛
        this.showRouletteSub = true
        this.eventSubParams.partcpPeriodCd = this.eventData.partcpPeriodCd // 참여주기코드
        this.eventSubParams.eventRolet = this.eventData.eventRolet
        this.$nextTick(() => {
          this.eventSub = this.$refs.eventRouletteSub
        })
        break
      case '04': // 응모 이벤트
        this.showDrawSub = true
        this.eventSubParams.reqStartDate = this.eventData.reqStartDate
        this.eventSubParams.reqEndDate = this.eventData.reqEndDate
        this.eventSubParams.winngAnnDate = this.eventData.winngAnnDate
        this.eventSubParams.eventDesc = this.eventData.eventDesc
        this.$nextTick(() => {
          this.eventSub = this.$refs.eventDrawSub
        })
        break
      case '05': // 기타 이벤트
        this.showEtcSub = true
        this.eventSubParams.eventDetailClassCd = this.eventData.eventDetailClassCd
        this.eventSubParams.subclubId = this.eventData.subclubId
        this.eventSubParams.eventDesc = this.eventData.eventDesc
        this.$nextTick(() => {
          this.eventSub = this.$refs.eventEtcSub
        })
        break
      default:
        break
      }
    },
    onInputEventPeriods(value) {
      // 종료일시의 시분(HHmm)이 0000일 경우 2359로 대체한다.
      if (value.at(1) && value.at(1).slice(-4) === '0000') {
        this.eventPeriods = [value.at(0), value.at(1).substring(0, 8).concat('2359')]
        return // [this.eventPeriods]값 변경으로 [onInputEventPeriods]가 다시 호출되므로 현재 호출은 return한다.
      }
      this.eventData.eventStartDtm = value.at(0) ? value.at(0).concat('00') : null
      this.eventData.eventEndDtm = value.at(1) ? value.at(1).concat('59') : null
    },
    onClickList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAG_00011', { params })
    },
    onClickSave() {
      if (this.isValid() && this.eventSub.isValid(this.eventData)) {
        let message = this.getCouponValidPeriodMsg() // 쿠폰유효기간 메시지
        message = (message) ? `${message}\n\n${this.$t('MSG_ALT_WANT_SAVE')}` : this.$t('MSG_ALT_WANT_SAVE') // 저장 하시겠습니까?
        utils.messageBox(
          'confirm', message,
          null, () => {
            const { eventId } = this.eventData
            if (utils.isEmpty(eventId)) {
              this.insertEvent()
            } else {
              this.updateEvent()
            }
          },
        )
      }
    },
    insertEvent() {
      let eventData = utils.assign({}, this.eventData)
      eventData = utils.assign(eventData, this.eventSub.eventSubData)
      http.request(this.$options.name, 'DTS_AAG_00002', {
        data: eventData,
      }).then(res => {
        if (res.data > 0) {
          utils.messageBox(
            'success',
            this.$t('MSG_ALT_SAVE_DATA'), // 저장되었습니다.
            null,
            () => this.onClickList(),
          )
        }
      })
    },
    updateEvent() {
      let eventData = utils.assign({}, this.eventData)
      eventData = utils.assign(eventData, this.eventSub.eventSubData)
      http.request(this.$options.name, 'DTS_AAG_00004', {
        data: eventData,
      }).then(res => {
        if (res.data > 0) {
          utils.messageBox(
            'success',
            this.$t('MSG_ALT_SAVE_DATA'), // 저장되었습니다.
            null,
            () => this.onClickList(),
          )
        }
      })
    },
    isValid() {
      // 노출 정보
      if (utils.isEmpty(this.eventData.eventPublctKindCd)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PUBLCT_KIND'))) // {게시 구분}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.eventData.eventKindCd)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EVENT_KIND'))) // {이벤트 구분}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.eventData.eventClassCd)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EVENT_CLASS'))) // {이벤트 분류}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.eventData.eventName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EVENT_NAME'))) // {이벤트 명}은(는) 필수 항목입니다.
        return false
      }
      if (this.eventData.eventClassCd == '05') {
        if (utils.isEmpty(this.eventData.eventStartDtm)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EVENT_PERIOD_START'))) // {이벤트 시작일} 을(를) 입력하세요.
          return
        }
      } else {
        if (utils.isEmpty(this.eventData.eventStartDtm) || utils.isEmpty(this.eventData.eventEndDtm)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EVENT_PERIOD'))) // {이벤트 기간}은(는) 필수 항목입니다.
          return false
        }
      }
      if (utils.isEmpty(this.eventData.exposrYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXPOSR_YN'))) // {노출 여부}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.eventData.exposrSeq)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXPOSR_ORDER'))) // {노출 순서}은(는) 필수 항목입니다.
        return false
      }
      return true
    },
  },
}
</script>
