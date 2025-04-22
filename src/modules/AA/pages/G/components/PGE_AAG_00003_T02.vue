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
    <!-- ::S PGE_AAZ_00075_P01 -->
    <P01
      ref="popup"
      :page-id="contextPageId"
      :codes="this.codes"
    />
    <!-- ::E PGE_AAZ_00075_P01 -->
  </div>
</template>
<script>

import P01 from './PGE_AAG_00003_P01.vue'

export default {
  name: 'PGE_AAG_00003_T02', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
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
      // 스탬프 테이블
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
        {
          text: this.$t('MSG_TXT_REWRD_RECV_YN'),
          customValue: (r, v) => {
            if (v.rewrdCnt > 0) {
              return 'Y'
            } else {
              return 'N'
            }
          },
        },
        { value: 'rewrdName', text: this.$t('MSG_TXT_GVWY_NAME') },
      ],
      list: [],
      eventClassCd: '02',
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
    openModal() {
    },
    closed() {},
  },
}
</script>
<style scoped>
</style>
