<template>
  <ur-data-grid
    ref="grid"
    :data-source="rewrdData"
    :options="opts"
    :data-set-options="{id: 'id'}"
  />
</template>
<script>

import CommonUtils from '@/modules/AA/js/common-utils'

export default {
  name: 'PGE_AAG_00002_S01', // eslint-disable-line vue/name-property-casing
  props: {
    pageId: {
      type: String,
      required: false,
      default: null,
    },
    eventId: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      codeKeys: [
        'COD_IA_EVENT_REWARD_KIND', // 보상 구분
        'COD_IA_GAME_REWARD_BASE',
        'COD_IA_EVENT_EXPOSR_COND',
        'COD_IA_GAME_REWARD_UNIT', // 보상 단위
      ],
      codes: {
        COD_IA_EVENT_REWARD_KIND: [],
        COD_IA_GAME_REWARD_BASE: [],
        COD_IA_EVENT_EXPOSR_COND: [],
        COD_IA_GAME_REWARD_UNIT: [],
      },
      rewrdData: [],
      opts: { // 토탈o
        height: 520,
        infinityScroll: true,
        noInfo: false,
        defaultPageSize: 10,
        resizableColumn: true,
      },
      eventClassCd: '',
    }
  },
  computed: {
    rewrdColumnHeader() {
      const columns = [
        { text: this.$t('MSG_TXT_NUMBER_ABBR'), value: 'no', width: 100 },
        {
          text: this.$t('MSG_TXT_KIND'),
          value: 'rewrdKindCd',
          width: 200,
          type: 'code',
          domain: this.codes.COD_IA_EVENT_REWARD_KIND,
        },
        { text: this.$t('MSG_TXT_GVWY_NAME'), value: 'rewrdName' },
        {
          text: this.$t('MSG_TXT_COUPON_NAME'),
          value: 'couponName',
          customValue: (v, r) => {
            if (r.rewrdKindCd === '02') {
              return '-'
            }
            return v
          },
        },
        {
          text: this.$t('MSG_TXT_ISSUE_COUPON_QTY'),
          width: 250,
          value: 'rewrdQty',
          customValue: (v, r) => {
            let customValue = null
            if (r.rewrdQtyLimitYn === 'N') {
              customValue = this.$t('MSG_TXT_IAA_UNLIMITED') // '무제한'
            } else {
              customValue = utils.numberFormat(v).concat(this.$t('MSG_TXT_NUMBER_OF_COUNT'))
            }
            return customValue
          },
        },
        {
          text: this.$t('MSG_TXT_PAYMNT_COUPON_QTY'),
          value: 'rewrdPayQty',
          width: 250,
          customValue: v => utils.numberFormat(v).concat(this.$t('MSG_TXT_NUMBER_OF_COUNT')),
        },
      ]
      return columns
    },
    rewrdColumnHeader02() {
      const columns = [
        { text: this.$t('MSG_TXT_NUMBER_ABBR'), value: 'no', width: 100 },
        {
          text: this.$t('MSG_TXT_KIND'),
          value: 'rewrdKindCd',
          width: 200,
          type: 'code',
          domain: this.codes.COD_IA_EVENT_REWARD_KIND,
        },
        { text: this.$t('MSG_TXT_GVWY_NAME'), value: 'rewrdName' },
        {
          text: this.$t('MSG_TXT_COUPON_NAME'),
          value: 'couponName',
          customValue: (v, r) => {
            if (r.rewrdKindCd === '02') {
              return '-'
            }
            return v
          },
        },
        {
          text: this.$t('MSG_TXT_ISSUE_COUPON_QTY'),
          width: 150,
          value: 'rewrdQty',
          customValue: (v, r) => {
            let customValue = null
            if (r.rewrdQtyLimitYn === 'N') {
              customValue = this.$t('MSG_TXT_IAA_UNLIMITED') // '무제한'
            } else {
              customValue = utils.numberFormat(v).concat(this.$t('MSG_TXT_NUMBER_OF_COUNT'))
            }
            return customValue
          },
        },
        {
          text: this.$t('MSG_TXT_PAYMNT_COUPON_QTY'),
          value: 'rewrdPayQty',
          width: 250,
          customValue: v => utils.numberFormat(v).concat(this.$t('MSG_TXT_NUMBER_OF_COUNT')),
        },
        // 스템프
        {
          text: this.$t('MSG_TXT_REWRD_COND'),
          value: 'rewrdCondValue',
          width: 250,
          customValue: v => v + this.$t('MSG_TXT_NUMBER_OF_ATTAIN_COUNT'),
        },
      ]
      return columns
    },
    rewrdColumnHeader03() {
      const columns = [
        { text: this.$t('MSG_TXT_NUMBER_ABBR'), value: 'no', width: 100 },
        {
          text: this.$t('MSG_TXT_KIND'),
          value: 'rewrdKindCd',
          width: 200,
          type: 'code',
          domain: this.codes.COD_IA_EVENT_REWARD_KIND,
        },
        { text: this.$t('MSG_TXT_GVWY_NAME'), value: 'rewrdName' },
        {
          text: this.$t('MSG_TXT_COUPON_NAME'),
          value: 'couponName',
          customValue: (v, r) => {
            if (r.rewrdKindCd === '02') {
              return '-'
            }
            return v
          },
        },
        {
          text: this.$t('MSG_TXT_ISSUE_COUPON_QTY'),
          width: 250,
          value: 'rewrdQty',
          customValue: (v, r) => {
            if (r.rewrdKindCd === '99') {
              return '-'
            }
            let customValue = null
            if (r.rewrdQtyLimitYn === 'N') {
              customValue = this.$t('MSG_TXT_IAA_UNLIMITED') // '무제한'
            } else {
              customValue = utils.numberFormat(v).concat(this.$t('MSG_TXT_NUMBER_OF_COUNT'))
            }
            return customValue
          },
        },
        {
          text: this.$t('MSG_TXT_PAYMNT_COUPON_QTY'),
          value: 'rewrdPayQty',
          width: 250,
          customValue: v => utils.numberFormat(v).concat(this.$t('MSG_TXT_NUMBER_OF_COUNT')),
        },
      ]
      return columns
    },
    rewrdColumnHeader07() {
      const columns = [
        { text: this.$t('MSG_TXT_NUMBER_ABBR'), value: 'no', width: 100 },
        {
          text: this.$t('MSG_TXT_KIND'),
          value: 'rewrdKindCd',
          width: 200,
          type: 'code',
          domain: this.codes.COD_IA_EVENT_REWARD_KIND,
        },
        { text: this.$t('MSG_TXT_GVWY_NAME'), value: 'rewrdName' },
        {
          text: this.$t('MSG_TXT_COUPON_NAME'),
          value: 'couponName',
          customValue: (v, r) => {
            if (r.rewrdKindCd === '02') {
              return '-'
            }
            return v
          },
        },
        {
          text: this.$t('MSG_TXT_ISSUE_COUPON_QTY'),
          width: 250,
          value: 'rewrdQty',
          customValue: (v, r) => {
            let customValue = null
            if (r.rewrdQtyLimitYn === 'N') {
              customValue = this.$t('MSG_TXT_IAA_UNLIMITED') // '무제한'
            } else {
              customValue = utils.numberFormat(v).concat(this.$t('MSG_TXT_NUMBER_OF_COUNT'))
            }
            return customValue
          },
        },
        {
          text: this.$t('MSG_TXT_PAYMNT_COUPON_QTY'),
          value: 'rewrdPayQty',
          width: 250,
          customValue: v => utils.numberFormat(v).concat(this.$t('MSG_TXT_NUMBER_OF_COUNT')),
        },
        // 출석체크
        {
          text: this.$t('MSG_TXT_REWRD_DATE'),
          value: 'rewrdCondValue',
          width: 250,
          customValue: v => v + this.$t('MSG_TXT_DAY_OF_ATTEND_COUNT'),
        },
      ]
      return columns
    },
    rewrdColumnHeader08() {
      const that = this
      const columns = [
        {
          text: this.$t('MSG_TXT_COUPON_NAME'),
          value: 'couponName',
          customValue: (v, r) => {
            if (r.rewrdKindCd === '02') {
              return '-'
            }
            return v
          },
        },
        {
          text: this.$t('MSG_TXT_ISSUE_COUPON_QTY'),
          value: 'rewrdQty',
          customValue: (v, r) => {
            let customValue = null
            if (r.rewrdQtyLimitYn === 'N') {
              customValue = this.$t('MSG_TXT_IAA_UNLIMITED') // '무제한'
            } else {
              customValue = utils.numberFormat(v).concat(this.$t('MSG_TXT_NUMBER_OF_COUNT'))
            }
            return customValue
          },
        },
        {
          text: this.$t('MSG_TXT_PAYMNT_COUPON_QTY'),
          value: 'rewrdPayQty',
          width: 250,
          customValue: v => utils.numberFormat(v).concat(this.$t('MSG_TXT_NUMBER_OF_COUNT')),
        },
        // 미니게임
        {
          text: this.$t('MSG_TXT_REWRD_COND'),
          value: 'rewrdCondValue',
          width: 250,
          customValue(v, r) {
            return v + CommonUtils.getCodeText(that.codes.COD_IA_GAME_REWARD_UNIT, r.rewrdBaseCd)
          },
        },
      ]
      return columns
    },
  },
  mounted() {
    this.initializeCodes()
  },
  methods: {
    initializeCodes() {
      http.mergeCodeList(this.$options.name, this.codeKeys, this.codes).then(() => {
        this.setColumn()
      })
    },
    setRewrdData(eventClassCd, rewrdData) {
      this.eventClassCd = eventClassCd
      this.rewrdData = rewrdData
    },
    setColumn() {
      if (this.eventClassCd === '02') {
        this.$refs.grid.setHeaders(this.rewrdColumnHeader02)
      } else if (this.eventClassCd === '03') {
        this.$refs.grid.setHeaders(this.rewrdColumnHeader03)
      } else if (this.eventClassCd === '07') {
        this.$refs.grid.setHeaders(this.rewrdColumnHeader07)
      } else if (this.eventClassCd === '08') {
        this.$refs.grid.setHeaders(this.rewrdColumnHeader08)
      } else {
        this.$refs.grid.setHeaders(this.rewrdColumnHeader)
      }
    },
  },
}
</script>
<style scoped>
</style>
