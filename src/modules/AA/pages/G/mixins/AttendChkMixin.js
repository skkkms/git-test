import moment from 'moment'

const AttendChkMixin = {
  methods: {
    /**
     * @function getCouponValidPeriodMsg
     * @description 쿠폰유효기간을 체크하여 메시지를 return한다.
     */
    getCouponValidPeriodMsg() {
      let couponValidPeriodMsg = null
      if (this.rewrdGrid) {
        const eventEndDate = this.attendChkData.eventEndDtm.substring(0, 8)
        const rewrdList = this.rewrdGrid.dataSource.data
        const checkedCouponList = [] // 쿠폰 중복 확인용 List
        for (let i = 0; i < rewrdList.length; i += 1) {
          const key = `${rewrdList[i].couponMasterId}-${rewrdList[i].couponIssueSeq}` // 쿠폰 중복 확인용 Key
          const checkDate = moment(rewrdList[i].validPeriodEndDate, 'YYYYMMDD', true) // 쿠폰 유효기간 dateFormat 확인용
          if (rewrdList[i].rewrdKindCd === '01' && checkDate.isValid() && !checkedCouponList.includes(key)) { // 01: 쿠폰
            if (rewrdList[i].validPeriodEndDate < eventEndDate) {
              // [{0}] 쿠폰의 유효기간 종료 일자({1})가 이벤트 기간의 종료 일자({2})보다 작습니다.
              const message = utils.strFormat(
                this.$t('MSG_ALT_CHECK_EVENT_COUPON_END_DATE_01'),
                rewrdList[i].couponName,
                moment(rewrdList[i].validPeriodEndDate, 'YYYYMMDD').format('YYYY-MM-DD'),
                moment(eventEndDate, 'YYYYMMDD').format('YYYY-MM-DD'),
              )
              couponValidPeriodMsg = (couponValidPeriodMsg) ? `${couponValidPeriodMsg}\n\n${message}` : message
              checkedCouponList.push(key)
            }
          }
        }
      }
      return couponValidPeriodMsg
    },
  },
}

export default AttendChkMixin
