<template>
  <div>
    <div class="comm_title_wrap">
      <h4>
        {{ $t('MSG_TXT_EVT_JOIN_INFO') }}
      </h4>
    </div>
    <ur-data-grid
      ref="grid"
      :headers="columns"
      :data-source="list"
      :data-set-options="{id: 'id'}"
      :options="opts"
    >
      <template #header>
        <!-- [0] 1st row -->
        <ur-data-grid-header-row>
          <ur-data-grid-header-cell rowspan="2" :text="$t('MSG_TXT_IAA_GAME')"/>
          <ur-data-grid-header-cell rowspan="2" :text="$t('MSG_TXT_EVENT_PERIOD')"/>
          <ur-data-grid-header-cell rowspan="2" :text="$t('MSG_TXT_IAA_JOIN_DTM')"/>
          <ur-data-grid-header-cell colspan="3" :text="$t('MSG_TXT_RSULT')" align="center"/>
          <ur-data-grid-header-cell rowspan="2" :text="$t('MSG_TXT_REWRD_RECV_YN')"/>
          <ur-data-grid-header-cell rowspan="2" :text="$t('MSG_TXT_COUPON_NAME')"/>
        </ur-data-grid-header-row>
        <ur-data-grid-header-row>
          <ur-data-grid-header-cell/> <!--[2]-->
          <ur-data-grid-header-cell/> <!--[2]-->
          <ur-data-grid-header-cell/> <!--[2]-->
        </ur-data-grid-header-row>
      </template>

    </ur-data-grid>
  </div>
</template>
<script>

import CommonUtils from '@/modules/AA/js/common-utils'

export default {
  name: 'PGE_AAG_00003_T07', // eslint-disable-line vue/name-property-casing
  components: {
  },
  props: {
    memshpUid: {
      type: String,
      required: false,
      default: null,
    },
    opts: {
      type: Object,
      required: true,
    },
    codes: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // 미니게임 테이블
      columns: [
        { value: 'eventName', text: this.$t('MSG_TXT_IAA_GAME') },
        {
          text: this.$t('MSG_TXT_EVENT_PERIOD'),
          width: 260,
          customValue: (v, r) => {
            const startDate = moment(r.eventStartDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
            const endDate = moment(r.eventEndDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
            return `${startDate}~${endDate}`
          },
        },
        {
          value: 'joinDtm',
          text: this.$t('MSG_TXT_IAA_JOIN_DTM'),
          customValue: (v, r) => {
            const customValue = moment(v, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
            return customValue
          },
          width: 150,
        },
        {
          value: 'eventPartcpResult',
          text: this.$t('MSG_TXT_EVT_SCORE'),
          customValue: (v) => {
            if (utils.isEmpty(v)) {
              return '-'
            }
            return v + CommonUtils.getCodeText(this.codes.COD_IA_GAME_REWARD_UNIT, 'SCR')
          },
        },
        {
          value: 'eventPartcpRank',
          text: this.$t('MSG_TXT_IAA_RANK'),
          customValue: (v) => {
            if (utils.isEmpty(v)) {
              return '-'
            }
            return v + CommonUtils.getCodeText(this.codes.COD_IA_GAME_REWARD_UNIT, 'RNK')
          },
        },
        {
          value: 'eventPartcpRate',
          text: this.$t('MSG_TXT_IAA_RATE'),
          customValue: (v) => {
            if (utils.isEmpty(v)) {
              return '-'
            }
            return v + CommonUtils.getCodeText(this.codes.COD_IA_GAME_REWARD_UNIT, 'RAT')
          },
        },
        { value: 'rewrdRecvYn', text: this.$t('MSG_TXT_REWRD_RECV_YN') },
        { value: 'rewrdName', text: this.$t('MSG_TXT_COUPON_NAME') },
      ],
      list: [],
      eventClassCd: '08',
    }
  },
  computed: {
    contextPageId() {
      return this.$attrs['page-id']
    },
  },
  created() {
    this.selectDetail()
  },
  mounted() {

  },
  methods: {
    selectDetail() {
      http.request(this.contextPageId, 'DTS_AAG_00063', {
        path: {
          'memshp-uid': this.memshpUid,
        },
        query: {
          eventClassCd: this.eventClassCd,
        },
      }).then(res => {
        this.list = res.data
      })
    },
  },
}
</script>
<style scoped>
</style>
