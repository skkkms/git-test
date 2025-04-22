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
    />
    <!-- ::S PGE_AAZ_00075_P04 -->
    <P03
        ref="popup"
        :codes="this.codes"
        :page-id="contextPageId"
    />
    <!-- ::E PGE_AAZ_00075_P04 -->
  </div>
</template>
<script>

import P03 from './PGE_AAG_00003_P03.vue'

export default {
  name: 'PGE_AAG_00003_T06', // eslint-disable-line vue/name-property-casing
  components: {
    P03,
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
    const that = this
    return {
      // 미션 테이블
      columns: [
        { value: 'eventName', text: this.$t('MSG_TXT_EVENT_NAME') },
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
          value: 'eventPartcpResult',
          text: this.$t('MSG_TXT_IAA_ATTAIN_CNT'),
          component: {
            props: ['row', 'value', 'text'],
            template: '<div><ur-button hyperlink small style="padding: 0;"  @click="onClickHistory">{{this.value}}</ur-button></div>',
            methods: {
              onClickHistory() {
                that.selectHistory(this.row)
              },
            },
          },
        },
        { value: 'rewrdCnt', text: this.$t('MSG_TXT_IAA_BADGE_CNT') },
      ],
      list: [],
      eventClassCd: '06',
    }
  },
  computed: {
    contextPageId() {
      return this.$attrs['page-id']
    },
    modal() {
      return this.$refs.popup
    },
  },
  created() {
  },
  mounted() {
    this.selectDetail()
  },
  methods: {
    openModal() { this.modal.open() },
    closed() {},
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
    selectHistory(row) {
      http.request(this.contextPageId, 'DTS_AAG_00064', {
        path: {
          'memshp-uid': this.memshpUid,
          'event-id': row.eventId,
        },
        query: {
          eventClassCd: this.eventClassCd,
        },
      }).then(res => {
        this.modal.open()
        this.modal.setData(res.data)
      })
    },
  },
}
</script>
<style scoped>
</style>
