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
      <ur-form-box>
        <!-- 게시 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          style="width: 100%; height: auto;"
        >
          {{ eventPublctKindName }}
        </ur-form-item>
        <!-- 이벤트 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_KIND')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ eventKindName }}
        </ur-form-item>
        <!-- 이벤트 분류 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_CLASS')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          {{ eventClassName }}
        </ur-form-item>
        <!-- 이벤트 명 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          {{ eventData.eventName }}
        </ur-form-item>
        <!-- 이벤트 기간 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_PERIOD')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          {{ eventPeriod }}
        </ur-form-item>
        <!-- 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          style="width: 50%; height: auto;"
        >
          {{ eventData.exposrYn }}
        </ur-form-item>
        <!-- 노출 순서 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_ORDER')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          {{ exposrSeq }}
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
import EventOxQuizSub from '~aa/pages/G/components/PGE_AAG_00013_S01.vue'
import EventStampSub from '~aa/pages/G/components/PGE_AAG_00013_S02.vue'
import EventRouletteSub from '~aa/pages/G/components/PGE_AAG_00013_S03.vue'
import EventDrawSub from '~aa/pages/G/components/PGE_AAG_00013_S04.vue'
import EventEtcSub from '~aa/pages/G/components/PGE_AAG_00013_S05.vue'
import CommonUtils from '~aa/js/common-utils'

export default {
  name: 'PGE_AAG_00013', // eslint-disable-line vue/name-property-casing
  components: {
    EventOxQuizSub,
    EventStampSub,
    EventRouletteSub,
    EventDrawSub,
    EventEtcSub,
  },
  data() {
    return {
      codeKeys: [
        'COD_IA_EVENT_PUBLCT_KIND', // 이벤트게시구분
        'COD_IA_EVENT_KIND', // 이벤트구분
        'COD_IA_EVENT_CLASS', // 이벤트분류
      ],
      codes: {
        COD_IA_EVENT_PUBLCT_KIND: [],
        COD_IA_EVENT_KIND: [],
        COD_IA_EVENT_CLASS: [],
      },
      eventData: {
        eventId: '',
        eventPublctKindCd: '', // 이벤트게시구분코드
        eventPublctKindName: '', // 이벤트게시구분명
        eventKindCd: '', // 이벤트구분코드
        eventKindName: '', // 이벤트구분명
        eventClassCd: '', // 이벤트분류코드
        eventClassName: '', // 이벤트분류명
        eventName: '', // 이벤트명
        eventStartDtm: '', // 이벤트시작일시
        eventEndDtm: '', // 이벤트종료일시
        exposrYn: null, // 노출여부
      },
      showOxQuizSub: false,
      showStampSub: false,
      showRouletteSub: false,
      showDrawSub: false,
      showEtcSub: false,
    }
  },
  computed: {
    eventPublctKindName() {
      return CommonUtils.getCodeText(
        this.codes.COD_IA_EVENT_PUBLCT_KIND,
        this.eventData.eventPublctKindCd,
      )
    },
    eventKindName() {
      return CommonUtils.getCodeText(
        this.codes.COD_IA_EVENT_KIND,
        this.eventData.eventKindCd,
      )
    },
    eventClassName() {
      return CommonUtils.getCodeText(
        this.codes.COD_IA_EVENT_CLASS,
        this.eventData.eventClassCd,
      )
    },
    eventPeriod() {
      let eventPeriod = null
      const { eventStartDtm, eventEndDtm } = this.eventData
      if (eventStartDtm) {
        const start = moment(eventStartDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm')
        const end = !eventEndDtm ? '' : moment(eventEndDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm')
        eventPeriod = start.concat(' ~ ').concat(end)
      }
      return eventPeriod
    },
    exposrSeq() {
      const { exposrSeq } = this.eventData
      return exposrSeq ? utils.numberFormat(exposrSeq) : null
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
      })
    },
    onInputEventClass(value) {
      this.showOxQuizSub = false
      this.showStampSub = false
      this.showRouletteSub = false
      this.showDrawSub = false
      this.showEtcSub = false

      this.eventSubParams = utils.cloneDeep(this.eventData)
      switch (value) {
      case '01': // OX퀴즈
        this.showOxQuizSub = true
        this.$nextTick(() => {
          this.eventSub = this.$refs.eventOxQuizSub
        })
        break
      case '02': // 스탬프
        this.showStampSub = true
        this.$nextTick(() => {
          this.eventSub = this.$refs.eventStampSub
        })
        break
      case '03': // 룰렛
        this.showRouletteSub = true
        this.$nextTick(() => {
          this.eventSub = this.$refs.eventRouletteSub
        })
        break
      case '04': // 응모 이벤트
        this.showDrawSub = true
        this.$nextTick(() => {
          this.eventSub = this.$refs.eventDrawSub
        })
        break
      case '05': // 기타 이벤트
        this.showEtcSub = true
        this.$nextTick(() => {
          this.eventSub = this.$refs.eventEtcSub
        })
        break
      default:
        break
      }
    },
    onClickList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAG_00011', { params })
    },
    onClickModify() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAG_00012', { params })
    },
  },
}
</script>
