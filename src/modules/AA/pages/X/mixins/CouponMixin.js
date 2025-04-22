const CouponMixin = {
  methods: {
    /**
     * 쿠폰 조회
     * @function selectCoupon
     * @param {String} masterId
     * @param {Number} issueSeq
     * @description 쿠폰을 조회한다.
     */
    async selectCoupon(param = null) {
      let coupon = null
      if (!this.isValidParam(param)) {
        return null
      }

      const pageId = (this.pageId) ? this.pageId : this.$options.name
      const { masterId, couponMasterNo, issueSeq } = param
      coupon = await http.request(pageId, 'DTS_AAX_00005', {
        query: {
          masterId,
          couponMasterNo,
          issueSeq,
        },
      }).then(res => {
        let result = null
        if (!utils.isEmpty(res.data)) {
          result = res.data.at(0)
        }
        return result
      })
      return coupon
    },
    isValidParam(param) {
      let result = false
      try {
        if (param === null) {
          throw new Error('[param] is null')
        }
        if (utils.isEmpty(param.masterId) && utils.isEmpty(param.couponMasterNo)) {
          throw new Error('One of [param.masterid] and [param.couponMasterNo] must have a value.')
        }
        if (utils.isEmpty(param.issueSeq)) {
          throw new Error('[param.issueSeq] cannot be empty')
        }
        result = true
      } catch (e) {
        utils.messageBox('error', e.message)
        console.error(e)
      }
      return result
    },
  },
}

export default CouponMixin
