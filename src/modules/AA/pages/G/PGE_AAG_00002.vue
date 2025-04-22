<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>{{this.$t('MSG_TXT_EVENT_INFO')}}</h4>
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
          style="width: 50%; height: auto;"
        >
          {{ eventKindName }}
        </ur-form-item>
        <!-- 이벤트 분류 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_EVENT_CLASS')"
          label-align="right"
          style="width: 50%; height: auto;"
        >
          {{ eventClassName }}
        </ur-form-item>
        <!-- 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          style="width: 50%; height: auto;"
        >
          {{ eventData.exposrYn }}
        </ur-form-item>
        <!-- 이벤트 기간 -->
        <ur-form-item
            :label="$t('MSG_TXT_EVENT_PERIOD')"
            class="flex_wrap"
            label-align="right"
            style="width: 50%; height: auto;"
        >
          {{ eventPeriod }}
        </ur-form-item>
        <!-- 이벤트 명 -->
        <ur-form-item
            :label="$t('MSG_TXT_EVENT_NAME')"
            label-align="right"
            style="width: 100%; height: auto;"
        >
          {{ eventData.eventName }}
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 노출 정보 -->

      <div class="comm_title_wrap mt45">
        <h4>{{this.$t('MSG_TXT_REWRD_INFO')}}</h4>
      </div>
      <!-- ::S 보상정보 테이블 -->

      <rewrd-mission
          v-if="eventData.eventClassCd==='06'"
          ref="rewrdMission"
          :page-id="this.$options.name"
          :event-id="eventData.eventId"
      />
      <rewrd-event
        v-else
        ref="rewrdEvent"
        :page-id="this.$options.name"
        :event-id="eventData.eventId"
      />
      <!-- ::S 미션 참여자 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>{{this.$t('MSG_TXT_IAA_JOIN_INFO')}}</h4>
      </div>
      <member-mission
        v-if="eventData.eventClassCd==='06'"
        ref="memberMission"
        :page-id="this.$options.name"
        :event-id="eventData.eventId"
        :event-class-cd="eventData.eventClassCd"
      />
      <member-event
        v-else
        ref="memberEvent"
        :page-id="this.$options.name"
        :event-id="eventData.eventId"
        :event-class-cd="eventData.eventClassCd"
        :rewrd-data="rewrdData"
      />
      <!-- ::E 미션 참여자 정보 -->
      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button @click="onClickList">
              {{$t('MSG_BTN_LIST')}}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import RewrdEvent from './components/PGE_AAG_00002_S01.vue'
import RewrdMission from './components/PGE_AAG_00002_S02.vue'
import MemberEvent from './components/PGE_AAG_00002_S03.vue'
import MemberMission from './components/PGE_AAG_00002_S04.vue'

import CommonUtils from '~aa/js/common-utils'

export default {
  name: 'PGE_AAG_00002', // eslint-disable-line vue/name-property-casing
  components: {
    RewrdEvent,
    RewrdMission,
    MemberEvent,
    MemberMission,
  },
  data() {
    return {
      codeKeys: [
        'COD_IA_EVENT_PUBLCT_KIND', // 이벤트게시구분
        'COD_IA_EVENT_KIND', // 이벤트구분
        'COD_IA_EVENT_CLASS', // 이벤트분류
        'COD_IA_EVENT_REWARD_KIND', // 보상 구분
      ],
      codes: {
        COD_IA_EVENT_PUBLCT_KIND: [],
        COD_IA_EVENT_KIND: [],
        COD_IA_EVENT_CLASS: [],
        COD_IA_EVENT_REWARD_KIND: [],
      },
      showRewrdEvent: false,
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
      rewrdData: [],
      // 테이블
      opts: {
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      opts1: {
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },
      eventClassCd: '',
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
      if (this.eventData.eventKindCd === null) {
        return '-'
      }
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
      if (eventStartDtm && eventEndDtm) {
        const start = moment(eventStartDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm')
        const end = moment(eventEndDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm')
        eventPeriod = start.concat(' ~ ').concat(end)
      }
      return eventPeriod
    },
    exposrSeq() {
      const { exposrSeq } = this.eventData
      return exposrSeq ? utils.numberFormat(exposrSeq) : null
    },

    // modalPopUp
    modalP01() {
      return this.$refs.modalP01
    },
  },

  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  mounted() {
  },
  created() {
    const params = utils.getParameter(this, 'params')
    if (utils.isEmpty(params.eventId)) {
      this.onClickList()
    } else {
      this.eventClassCd = params.eventClassCd
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
        this.eventData.eventClassCd = params.eventClassCd
        this.selectEvent()
      }
    },
    selectEvent() {
      http.request(this.$options.name, 'DTS_AAG_00058', {
        path: {
          'event-id': this.eventData.eventId,
        },
      }).then(res => {
        this.eventData = res.data.eventDetail
        this.rewrdData = res.data.eventRewdList

        if (this.eventData.eventClassCd === '06') {
          this.$refs.rewrdMission.setRewrdData(this.eventData.eventClassCd, this.rewrdData)
        } else {
          this.$refs.rewrdEvent.setRewrdData(this.eventData.eventClassCd, this.rewrdData)
        }
      })
    },
    openModalP01() {
      this.modalP01.open()
    },
    closeModal() { this.modalP01.close() },
    closed() {},
    onClickList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAG_00001', { params })
    },
    rewrdSet(data) {
      alert(JSON.stringify(data))
    },
  },
}
</script>
<style scoped>
</style>
