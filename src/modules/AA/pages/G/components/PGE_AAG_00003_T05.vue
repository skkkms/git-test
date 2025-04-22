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

    <!-- ::S PGE_AAZ_00075_P03 -->
    <P02
      ref="popup"
      :codes="this.codes"
      :page-id="contextPageId"
    />
    <!-- ::E PGE_AAZ_00075_P03 -->
  </div>
</template>
<script>
import P02 from './PGE_AAG_00003_P02.vue'

export default {
  name: 'PGE_AAG_00003_T05', // eslint-disable-line vue/name-property-casing
  components: {
    P02,
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
      // 출석체크 테이블
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
          text: this.$t('MSG_TXT_IAA_ATTEND_CNT'),
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
        {
          text: this.$t('MSG_TXT_REWRD_RECV_YN'),
          customValue: (v, r) => {
            if (r.rewrdCnt > 0) {
              return 'Y'
            }
            return 'N'
          },
        },
        { value: 'rewrdName', text: this.$t('MSG_TXT_GVWY_NAME') },
      ],
      list: [],
      eventClassCd: '07',
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
