import moment from 'moment'

const GameMixin = {
  methods: {
    /**
     * @function getCouponValidPeriodMsg
     * @description 쿠폰유효기간을 체크하여 메시지를 return한다.
     */
    getCouponValidPeriodMsg() {
      let couponValidPeriodMsg = null
      const eventEndDate = this.gameData.eventEndDtm.substring(0, 8)
      const { validPeriodEndDate } = this.gameData
      const checkDate = moment(validPeriodEndDate, 'YYYYMMDD', true) // 쿠폰 유효기간 dateFormat 확인용
      if (checkDate.isValid() && validPeriodEndDate < eventEndDate) {
        // [{0}] 쿠폰의 유효기간 종료 일자({1})가 이벤트 기간의 종료 일자({2})보다 작습니다.
        const message = utils.strFormat(
          this.$t('MSG_ALT_CHECK_EVENT_COUPON_END_DATE_01'),
          this.gameData.couponName,
          moment(validPeriodEndDate, 'YYYYMMDD').format('YYYY-MM-DD'),
          moment(eventEndDate, 'YYYYMMDD').format('YYYY-MM-DD'),
        )
        couponValidPeriodMsg = message
      }
      return couponValidPeriodMsg
    },
  },
}

export default GameMixin
