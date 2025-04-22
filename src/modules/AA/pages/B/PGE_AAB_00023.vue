<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 노출 정보 -->
      <div class="comm_title_wrap ">
        <h4>
          {{ $t('MSG_TXT_EXPOSR_INFO') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_BANNER_KIND')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ bannerKindCdNm }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ parkKindCdNm }}
        </ur-form-item>
        <ur-form-item
          v-show="publctLocationShow"
          :label="$t('MSG_TXT_PUBCT_TARGET')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ publctLocation }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_DT')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ publctDtm }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          style="width: 50%; height: auto;"
        >
          {{ exposrYn }}
        </ur-form-item>
        <ur-form-item
          v-show="exposrOrderShow"
          :label="$t('MSG_TXT_EXPOSR_ORDER')"
          label-align="right"
          style="width: 50%; height: auto;"
        >
          {{ exposrOrder | numberFormat }}
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 노출 정보 -->

      <!-- ::S 배너 상세 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          {{ $t('MSG_TXT_BANNER_DETAIL_INFO') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          v-show="langKindCdShow"
          :label="$t('MSG_TXT_LANG_DIV')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ langKindCd }}
        </ur-form-item>
        <ur-form-item
          v-show="bannerCodeShow"
          :label="$t('MSG_TXT_BANNER_CD')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ bannerCode }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TIT_TTL')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ bannerSubject }}
        </ur-form-item>
        <!--
        <ur-form-item v-show="pcBannerImgShow"
          :label="$t('MSG_TXT_PC_BANNER_IMG')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{pcImagUrl}}
        </ur-form-item>
        -->
        <ur-form-item
          v-show="mobileBannerImgShow"
          :label="$t('MSG_TXT_BANNER_IMG')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            v-model="mobileImagUrl"
            mode="SELECT"
            :page-id="this.$options.name"
          />
        </ur-form-item>

        <!--
         <ur-form-item v-show="pcPopupImgShow"
          :label="$t('MSG_TXT_PC_POUP_IMG')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{pcImagUrl}}
        </ur-form-item>
        -->
        <ur-form-item
          v-show="mobilePopupImgShow"
          :label="$t('MSG_TXT_POUP_IMG')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            v-model="mobileImagUrl"
            mode="SELECT"
            :page-id="this.$options.name"
          />
        </ur-form-item>
        <ur-form-item
          v-show="bannerImgShow"
          :label="$t('MSG_TXT_BANNER_IMG')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            v-model="mobileImagUrl"
            mode="SELECT"
            :page-id="this.$options.name"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_CONN_URL')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ connUrl }}
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 배너 상세 정보 -->

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button
              @click="onClickList"
            >
              {{ $t('MSG_BTN_LIST') }} <!-- 목록 -->
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button
              color="violet"
              @click="onClickModify"
            >
              {{ $t('MSG_BTN_MDFC') }} <!-- 수정 -->
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAB_00023', // eslint-disable-line vue/name-property-casing
  filters: {
    numberFormat(value) {
      return value ? utils.numberFormat(value) : null
    },
  },
  data() {
    return {
      publctId: '',
      bannerKindCd: '',
      bannerKindCdNm: '',
      parkKindCd: '',
      parkKindCdNm: '',
      exposrYn: '',
      langKindCd: '',
      appPublctYn: '',
      mobilePublctYn: '',
      pcPublctYn: '',
      connUrl: '',
      exposrOrder: '',
      pcImagUrl: '',
      mobileImagUrl: '',
      publctStartDtm: '',
      publctEndDtm: '',
      bannerSubject: '',
      bannerCode: '',
      publctLocation: '',
      publctDtm: '',

      publctLocationShow: false,
      exposrOrderShow: false,
      langKindCdShow: false,
      bannerCodeShow: false,
      pcBannerImgShow: false,
      mobileBannerImgShow: false,
      pcPopupImgShow: false,
      mobilePopupImgShow: false,
      bannerImgShow: false,
    }
  },
  mounted() {
    const params = utils.getParameter(this, 'params')

    // 상세
    http.request(this.$options.name, 'DTS_AAD_00020', {
      query: {
        publctId: params.publctId,
      },
    }).then(res => {
      this.publctId = res.data.publctId
      this.bannerKindCd = res.data.bannerKindCd
      this.bannerKindCdNm = res.data.bannerKindCdNm
      this.parkKindCd = res.data.parkKindCd
      this.parkKindCdNm = res.data.parkKindCdNm
      this.exposrYn = res.data.exposrYn
      this.langKindCd = res.data.langKindNm
      this.appPublctYn = res.data.appPublctYn
      this.mobilePublctYn = res.data.mobilePublctYn
      this.pcPublctYn = res.data.pcPublctYn
      this.connUrl = res.data.connUrl
      this.exposrOrder = res.data.exposrOrder
      // this.pcImagUrl = res.data.pcImagFileName;
      // this.mobileImagUrl = res.data.mobileImagFileName;
      this.pcImagUrl = res.data.pcImagUrl
      this.mobileImagUrl = res.data.mobileImagUrl
      this.publctStartDtm = res.data.publctStartDtm
      this.publctEndDtm = res.data.publctEndDtm
      this.bannerSubject = res.data.bannerSubject
      this.bannerCode = res.data.bannerCodeNm
      this.publctLocation = res.data.publctLocation
      this.publctDtm = res.data.publctDtm

      if (this.bannerKindCd === '01') {
        this.publctLocationShow = true
        this.exposrOrderShow = true
        this.langKindCdShow = true
        this.bannerCodeShow = true
        this.pcBannerImgShow = true
        this.mobileBannerImgShow = true
        this.pcPopupImgShow = false
        this.mobilePopupImgShow = false
        this.bannerImgShow = false

        // if (this.appPublctYn === 'N' && this.mobilePublctYn === 'N') {
        //   this.mobileBannerImgShow = false
        // }

        // if (this.pcPublctYn === 'N') {
        //   this.pcBannerImgShow = false
        // }
      } else if (this.bannerKindCd === '02') {
        this.publctLocationShow = true
        this.exposrOrderShow = false
        this.langKindCdShow = false
        this.bannerCodeShow = false
        this.pcBannerImgShow = false
        this.mobileBannerImgShow = false
        this.pcPopupImgShow = true
        this.mobilePopupImgShow = true
        this.bannerImgShow = false

        // if (this.appPublctYn === 'N' && this.mobilePublctYn === 'N') {
        //   this.mobilePopupImgShow = false
        // }

        // if(this.pcPublctYn === 'N') {
        //   this.pcPopupImgShow = false
        // }
      } else if (this.bannerKindCd === '03') {
        this.publctLocationShow = false
        this.exposrOrderShow = true
        this.langKindCdShow = true
        this.bannerCodeShow = true
        this.pcBannerImgShow = false
        this.mobileBannerImgShow = false
        this.pcPopupImgShow = false
        this.mobilePopupImgShow = false
        this.bannerImgShow = true
      }
    }).catch(error => {
      console.log('error : ', error)
    })
  },
  methods: {
    onClickList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAB_00021', { params })
    },
    onClickModify() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAB_00024', { params })
    },
  },
}
</script>
<style scoped>
</style>
