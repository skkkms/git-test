import CommonUtils from '~aa/js/common-utils'

const BannerMixin = {
  methods: {
    isValidExposrInfo() {
      if (utils.isEmpty(this.bannerKindCd)) {
        // {배너 구분}은(는) 필수 항목입니다.
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_BANNER_KIND')))
        return false
      }

      if (utils.isEmpty(this.parkKindCd)) {
        // {게시 구분}은(는) 필수 항목입니다.
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PUBLCT_KIND')))
        return false
      }

      // eslint-disable-next-line max-len
      const isCheckedAnyPublctLoc = (this.appPublctYnChk || this.mobilePublctYnChk || this.pcPublctYnChk)
      if (['01', '02'].includes(this.bannerKindCd) && !isCheckedAnyPublctLoc) {
        // 게시 위치를 1개 이상 선택해 주세요.
        utils.messageBox('warning', this.$t('MSG_ALT_PUBLCT_SELT'))
        return false
      }

      if (utils.isEmpty(this.publctDtm.at(0)) || utils.isEmpty(this.publctDtm.at(1))) {
        // {게시 기간}은(는) 필수 항목입니다.
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PUBLCT_PERIOD')))
        return false
      }

      if (['01', '03'].includes(this.bannerKindCd) && !this.$rules.validate(this.$refs.exposrOrder)) {
        // {노출 순서}은(는) 필수 항목입니다.
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXPOSR_ORDER')))
        return false
      }

      return true
    },
    isValidBannerDetailInfo() {
      if (['01', '03'].includes(this.bannerKindCd) && utils.isEmpty(this.langKindCd)) {
        // {언어 구분}은(는) 필수 항목입니다.
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_LANG_KIND')))
        return false
      }

      if (CommonUtils.isAllTrue(this.bannerKindCd === '01', utils.isEmpty(this.bannerCode))
      || CommonUtils.isAllTrue(this.bannerKindCd === '03', this.parkKindCd === '05', utils.isEmpty(this.bannerCode))) {
        // {배너 코드}은(는) 필수 항목입니다.
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_BANNER_CD')))
        return false
      }

      if (!this.$rules.validate(this.$refs.bannerSubject)) {
        // {제목}은(는) 필수 항목입니다.
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_SUBJECT')))
        return false
      }

      if (CommonUtils.isAllTrue(this.bannerKindCd === '01', this.mobileBannerImgShow, !this.$rules.validate(this.$refs.mobileBannerImg))) {
        // {배너 이미지}은(는) 필수 항목입니다.
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_BANNER_IMAG')))
        return false
      }

      if (CommonUtils.isAllTrue(this.bannerKindCd === '02', this.mobilePopupImgShow, !this.$rules.validate(this.$refs.mobilePopupImg))) {
        // {팝업 이미지}은(는) 필수 항목입니다.
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_POPUP_IMAG')))
        return false
      }

      if (CommonUtils.isAllTrue(this.bannerKindCd === '03', !this.$rules.validate(this.$refs.bannerImg))) {
        // {배너 이미지}은(는) 필수 항목입니다.
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_BANNER_IMAG')))
        return false
      }

      return true
    },
  },
}

export default BannerMixin
