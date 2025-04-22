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
  </div>
</template>
<script>

export default {
  name: 'PGE_AAG_00003_T04', // eslint-disable-line vue/name-property-casing
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
  components: {
  },
  data() {
    return {
      // 응모 이벤트 테이블
      columns: [
        {
          width: 100,
          value: 'eventPublctKindCd',
          text: this.$t('MSG_TXT_PUBLCT_KIND'),
          type: 'code',
          domain: this.codes.COD_IA_EVENT_PUBLCT_KIND,
        },
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
          value: 'joinDtm',
          text: this.$t('MSG_TXT_APP_DTM'),
          customValue: (v, r) => {
            const customValue = moment(v, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
            return customValue
          },
        },
        { value: 'eventPartcpResult', text: this.$t('MSG_TXT_IAA_ATTAIN_YN') },
        // { value: 'rewrdRecvYn', text: this.$t('MSG_TXT_REWRD_RECV_YN') },
        { value: 'rewrdName', text: this.$t('MSG_TXT_GVWY_NAME') },
      ],
      eventClassCd: '04',
      list: [],
    }
  },
  computed: {
    contextPageId() {
      return this.$attrs['page-id']
    },
  },
  created() {
  },
  mounted() {
    this.selectDetail()
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
