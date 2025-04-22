<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- ::S 노출 정보 -->
      <div class="comm_title_wrap ">
        <h4>
          {{ $t('MSG_TXT_EXPOSR_INFO') }} <!-- 노출 정보 -->
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- 배너 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_BANNER_KIND')"
          label-align="right"
          required
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-model="bannerKindCd"
            value="01"
            sm
            @input="mainBannerSelect"
          >
            {{ $t('MSG_TXT_MAIN_BANNER') }} <!-- 메인 배너 -->
          </ur-radio>
          <ur-radio
            v-model="bannerKindCd"
            value="02"
            sm
            @input="maninPopupSelect"
          >
            {{ $t('MSG_TXT_MAIN_POPUP') }} <!-- 메인 팝업 -->
          </ur-radio>
          <ur-radio
            v-model="bannerKindCd"
            value="03"
            sm
            @input="etcBannerSelect"
          >
            {{ $t('MSG_TXT_ETC_BANNER') }} <!-- 기타 배너 -->
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          label-align="right"
          required
          style="width: 100%; height: auto;"
        >
          <ur-radio
            v-show="el"
            v-model="parkKindCd"
            value="01"
            sm
            @input="selectParkKindCd"
          >
            {{ $t('MSG_TXT_EB') }} <!-- 에버랜드 -->
          </ur-radio>
          <ur-radio
            v-show="cb"
            v-model="parkKindCd"
            value="02"
            sm
            @input="selectParkKindCd"
          >
            {{ $t('MSG_TXT_CB') }} <!-- 캐리비안베이 -->
          </ur-radio>
          <ur-radio
            v-show="hb"
            v-model="parkKindCd"
            value="03"
            sm
          >
            {{ $t('MSG_TXT_HOME_BRG') }} <!-- 홈브리지 -->
          </ur-radio>
          <ur-radio
            v-show="sw"
            v-model="parkKindCd"
            value="04"
            sm
          >
            {{ $t('MSG_TXT_SPEED_WAY') }} <!-- 스피드웨이 -->
          </ur-radio>
          <ur-radio
            v-show="etc"
            v-model="parkKindCd"
            value="05"
            sm
            @input="selectParkKindCd"
          >
            {{ $t('MSG_TXT_ETC') }}
          </ur-radio>
        </ur-form-item>
        <ur-form-item
          v-show="postingLocationShow"
          :label="$t('MSG_TXT_PUBCT_TARGET')"
          label-align="right"
          required
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <!-- '배너 구분' 기타 배너 선택인 경우 disabled-->
          <ur-checkbox
            v-show="postingLocationShow"
            v-model="appPublctYnChk"
            sm
          />
          <span
            v-show="postingLocationShow"
            class="check_label"
          >
            {{ $t('MSG_TXT_APP_EN') }} <!-- App -->
          </span>
          <ur-checkbox
            v-show="postingLocationShow"
            v-model="mobilePublctYnChk"
            sm
          />
          <span
            v-show="postingLocationShow"
            class="check_label"
          >
            {{ $t('MSG_TXT_IA_MOBILEWEB') }} <!-- 모바일웹 -->
          </span>
          <ur-checkbox
            v-show="postingLocationShow"
            v-model="pcPublctYnChk"
            sm
          />
          <span
            v-show="postingLocationShow"
            class="check_label"
          >
            {{ $t('MSG_TXT_PC') }} <!-- PC -->
          </span>
          <!-- '배너 구분' 기타 배너 선택인 경우 disabled-->
        </ur-form-item>
        <!-- 게시 기간 -->
        <ur-form-item
          id="publctDtm"
          :label="$t('MSG_TXT_PUBLCT_PERIOD')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          required
        >
          <ur-date-time-range-picker
            v-model="publctDtm"
            input-type="YYYY-MM-DD HH:mm"
            model-type="YYYYMMDDHHmm"
            :min-date="minStartDate"
            :confirm-label="$t('MSG_TXT_SEL')"
            :clear-label="$t('MSG_BTN_INTL')"
            @input="onInputPublctDtm"
          />
        </ur-form-item>
        <!-- 노출 여부 -->
        <ur-form-item
          id="exposrYn"
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          style="width: 50%; height: auto;"
          required
        >
          <ur-radio
            v-model="exposrYn"
            value="Y"
            sm
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="exposrYn"
            value="N"
            sm
          >
            N
          </ur-radio>
        </ur-form-item>
        <!-- 노출 순서 -->
        <ur-form-item
          v-show="exposrOrderShow"
          id="exposrOrder"
          :label="$t('MSG_TXT_EXPOSR_ORDER')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height:auto"
          required
        >
          <!-- '배너 구분' 메인 팝업 선택인 경우 disabled-->
          <ur-text-field
            v-show="exposrOrderShow"
            ref="exposrOrder"
            v-model="exposrOrder"
            mask="#####"
            maxlength="4"
            :rules="$rules.getRules('not_empty')"
            fixed-message
            class="mb4"
            style="width: 100%; height: auto;"
          />
        <!-- '배너 구분' 메인 팝업 선택인 경우 disabled-->
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 노출 정보 -->

      <!-- ::S 배너 상세 정보 -->
      <div
        v-show="bannerDetailInfoShow"
        class="comm_title_wrap mt45"
      >
        <h4>
          {{ $t('MSG_TXT_BANNER_DETAIL_INFO') }} <!-- 배너 상세 정보 -->
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- 언어 구분 -->
        <ur-form-item
          v-show="langKindShow"
          :label="$t('MSG_TXT_LANG_KIND')"
          label-align="right"
          style="width: 100%; height: auto;"
          required
        >
          <!-- '배너 구분' 메인 팝업, 기타 배너 선택인 경우 disabled-->
          <ur-radio
            v-show="langKor"
            v-model="langKindCd"
            value="01"
            sm
          >
            {{ $t('MSG_TXT_KO') }} <!-- 국문 -->
          </ur-radio>
          <ur-radio
            v-show="langEng"
            v-model="langKindCd"
            value="02"
            sm
          >
            {{ $t('MSG_TXT_EN') }} <!-- 영문 -->
          </ur-radio>
        <!-- '배너 구분' 메인 팝업, 기타 배너 선택인 경우 disabled-->
        </ur-form-item>
        <!-- 배너 코드 -->
        <ur-form-item
          v-show="bannerCodeShow"
          :label="$t('MSG_TXT_BANNER_CD')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
          required
        >
          <!-- '배너 구분' 메인 팝업, 기타 배너 선택인 경우 disabled-->
          <ur-dropdown
            v-show="bannerCodeShow"
            v-model="bannerCode"
            :items="bannerCodes.COD_IA_BANNER_CODE"
            no-select
            :msg-no-select="$t('MSG_TXT_SEL')"
            style="width: 460px; height: auto;"
            @input="bannerCodeChange"
          />
        <!-- '배너 구분' 메인 팝업, 기타 배너 선택인 경우 disabled-->
        </ur-form-item>
        <!-- 제목 -->
        <ur-form-item
          v-show="bannerSubjectShow"
          :label="$t('MSG_TXT_SUBJECT')"
          label-align="right"
          style="width: 100%;"
          required
        >
          <ur-text-field
            v-show="bannerSubjectShow"
            ref="bannerSubject"
            v-model="bannerSubject"
            value=""
            maxlength="150"
            class="mb4"
            style="width: 460px; height: auto;"
            :rules="$rules.getRules('not_empty')"
          />
        </ur-form-item>

        <!--
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_PC_BANNER_IMG')"
          label-align="right"
          required
          style="width: 100%;"
          v-show="pcBannerImgShow"
        >
        -->
        <!-- '배너 구분' 기타 배너 선택인 경우 disabled-->
        <!--
          <ur-text-field
            value=""
            style="width: 88%; height: auto;"
            class="mb4"
            v-show="false"
            v-model="pcBannerImg"
            maxlength="150"
            ref="pcBannerImg"
            :rules="$rules.getRules('not_empty')"
          />

          <ur-button
            color="violet"
            v-show="pcBannerImgShow"
          >
            {{$t('MSG_BTN_FILE_SRCH')}}
          </ur-button>
          -->
        <!--
          <cmp-single-file-uploader
            v-show="pcBannerImgShow"
            v-model="pcBannerImg"
            ref="pcBannerImg"
            :page-id="this.$options.name"
            :max-size="99999999"
            style="width: 920px;"
            :rules="$rules.getRules('not_empty')"
          />
          -->
        <!-- '배너 구분' 기타 배너 선택인 경우 disabled-->
        <!--
        </ur-form-item>
        -->
        <!--
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_PC_POUP_IMG')"
          label-align="right"
          required
          style="width: 100%; "
          v-show="pcPopupImgShow"
        >
        -->
        <!--
          <ur-text-field
            value=""
            style="width: 88%; height: auto;"
            class="mb4"
            v-show="pcPopupImgShow"
            v-model="pcPopUpImg"
            maxlength="150"
            ref="pcPopUpImg"
            :rules="$rules.getRules('not_empty')"
          />
          <ur-button color="violet" v-show="pcPopupImgShow">
            {{$t('MSG_BTN_FILE_SRCH')}}
          </ur-button>
          -->
        <!--
          <cmp-single-file-uploader
            v-show="pcPopupImgShow"
            v-model="pcPopUpImg"
            ref="pcPopUpImg"
            :page-id="this.$options.name"
            :max-size="99999999"
            style="width: 920px;"
            :rules="$rules.getRules('not_empty')"
          />
          -->
        <!--
        </ur-form-item>
        -->
        <!-- 배너 이미지 -->
        <ur-form-item
          v-show="mobileBannerImgShow"
          :label="$t('MSG_TXT_BANNER_IMAG')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height:auto"
          required
        >
          <!-- '배너 구분' 기타 배너 선택인 경우 disabled-->
          <!--
          <ur-text-field
            value=""
            style="width: 88%; height: auto;"
            class="mb4"
            v-show="mobileBannerImgShow"
            v-model="mobileBannerImg"
            maxlength="150"
            ref="mobileBannerImg"
            :rules="$rules.getRules('not_empty')"
          />
          <ur-button color="violet" v-show="mobileBannerImgShow">
            {{$t('MSG_BTN_FILE_SRCH')}}
          </ur-button>
          <img
            src=""
          >
          -->
          <cmp-single-file-uploader
            v-show="mobileBannerImgShow"
            ref="mobileBannerImg"
            v-model="mobileBannerImg"
            :page-id="this.$options.name"
            :accepts="mobileBannerImgAccepts"
            :pixels="mobileBannerImgPixels"
            style="width: 920px;"
            preview-mode="BELOW"
            show-guidance
            :rules="$rules.getRules('not_empty')"
            upload-target="CNT004"
          >
            <template>
              <div class="col_img_wrap">
                <div class="col_item_img">
                  <ur-text-field
                    v-model="mobileImagAltDesc"
                    style="width: 100%; height: auto;"
                    maxlength="100"
                    :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                  />
                </div>
              </div>
            </template>
          </cmp-single-file-uploader>
          <!-- '배너 구분' 기타 배너 선택인 경우 disabled-->
        </ur-form-item>
        <!-- 팝업 이미지 -->
        <ur-form-item
          v-show="mobilePopupImgShow"
          :label="$t('MSG_TXT_POPUP_IMAG')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height:auto"
          required
        >
          <!--
          <ur-text-field
            value=""
            style="width: 88%; height: auto;"
            class="mb4"
            v-show="mobilePopupImgShow"
            v-model="mobilePopupImg"
            maxlength="150"
            ref="mobilePopupImg"
            :rules="$rules.getRules('not_empty')"
          />
          <ur-button color="violet" v-show="mobilePopupImgShow">
            {{$t('MSG_BTN_FILE_SRCH')}}
          </ur-button>
          -->
          <cmp-single-file-uploader
            v-show="mobilePopupImgShow"
            ref="mobilePopupImg"
            v-model="mobilePopupImg"
            :page-id="this.$options.name"
            style="width: 920px;"
            :rules="$rules.getRules('not_empty')"
            accepts="jpg,png,gif"
            pixels="624*490"
            show-guidance
            preview-mode="BELOW"
            upload-target="CNT004"
          >
            <template>
              <div class="col_img_wrap">
                <div class="col_item_img">
                  <ur-text-field
                    v-model="mobileImagAltDesc"
                    style="width: 100%; height: auto;"
                    maxlength="100"
                    :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                  />
                </div>
              </div>
            </template>
          </cmp-single-file-uploader>
        </ur-form-item>
        <!-- 배너 이미지 -->
        <ur-form-item
          v-show="bannerImgShow"
          :label="$t('MSG_TXT_BANNER_IMAG')"
          label-align="right"
          required
          class="flex_wrap"
          style="width: 100%; height:auto"
        >
          <!--
          <ur-text-field
            value=""
            style="width: 88%; height: auto;"
            class="mb4"
            v-show="bannerImgShow"
            v-model="bannerImg"
            maxlength="150"
            ref="bannerImg"
            :rules="$rules.getRules('not_empty')"
          />
          <ur-button color="violet" v-show="bannerImgShow">
            {{$t('MSG_BTN_FILE_SRCH')}}
          </ur-button>
          -->
          <cmp-single-file-uploader
            v-show="bannerImgShow"
            ref="bannerImg"
            v-model="bannerImg"
            :page-id="this.$options.name"
            style="width: 920px;"
            :rules="$rules.getRules('not_empty')"
            :accepts="bannerImgAccepts"
            :pixels="bannerImgPixels"
            show-guidance
            preview-mode="BELOW"
            upload-target="CNT004"
          >
            <template>
              <div class="col_img_wrap">
                <div class="col_item_img">
                  <ur-text-field
                    v-model="mobileImagAltDesc"
                    style="width: 100%; height: auto;"
                    maxlength="100"
                    :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                  />
                </div>
              </div>
            </template>
          </cmp-single-file-uploader>
        </ur-form-item>
        <!-- 연결 URL -->
        <ur-form-item
          v-show="connUrlShow"
          :label="$t('MSG_TXT_CONN_URL')"
          label-align="right"
          style="width: 100%;"
        >
          <ur-text-field
            v-show="connUrlShow"
            ref="connUrl"
            v-model="connUrl"
            value=""
            style="width: 460px; height: auto;"
            class="mb4"
            maxlength="150"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 배너 상세 정보 -->

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button @click="onClickList">
              {{ $t('MSG_BTN_LIST') }} <!-- 목록 -->
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button
              color="violet"
              @click="save"
            >
              {{ $t('MSG_BTN_SAVE') }} <!-- 저장 -->
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import BannerMixin from '~aa/pages/D/mixins/BannerMixin'

export default {
  name: 'PGE_AAB_00022', // eslint-disable-line vue/name-property-casing
  mixins: [BannerMixin],
  data() {
    return {
      // 라디오버튼
      bannerKindCd: '',
      parkKindCd: '',
      exposrYn: 'Y',
      publctDtm: [],
      langKindCd: '01',

      // 체크박스
      appPublctYnChk: true,
      mobilePublctYnChk: true,
      pcPublctYnChk: true,
      appPublctYn: '',
      mobilePublctYn: '',
      pcPublctYn: '',

      // 드롭다운
      dateValue1: '',
      mobilePopup: true,

      bannerSubject: '',
      bannerCode: '',
      bannerCodeList: ['COD_IA_BANNER_CODE'],
      bannerCodes: { COD_IA_BANNER_CODE: [] },
      bannerCodeListTemp1: ['COD_IA_BANNER_CODE'],
      bannerCodesTemp1: { COD_IA_BANNER_CODE: [] },
      bannerCodeListTemp2: ['COD_IA_BANNER_CODE'],
      bannerCodesTemp2: { COD_IA_BANNER_CODE: [] },
      bannerCodeListTemp3: ['COD_IA_BANNER_CODE'],
      bannerCodesTemp3: { COD_IA_BANNER_CODE: [] },
      connUrl: '',
      exposrOrder: '',
      pcImagUrl: '',
      mobileImagUrl: '',
      publctStartDtm: '',
      publctEndDtm: '',
      pcBannerImg: '',
      pcPopUpImg: '',
      mobileBannerImg: '',
      mobilePopupImg: '',
      bannerImg: '',
      count: 0,
      mobileImagAltDesc: '',
      pcImagAltDesc: '',

      el: true,
      cb: true,
      hb: false,
      sw: false,
      etc: false,
      postingLocationShow: true,
      exposrOrderShow: true,
      langKor: false,
      langEng: false,
      bannerCodeShow: false,
      pcBannerImgShow: false,
      pcPopupImgShow: false,
      mobileBannerImgShow: false,
      mobilePopupImgShow: false,
      bannerImgShow: false,
      langKindShow: false,
      bannerSubjectShow: false,
      connUrlShow: false,
      bannerDetailInfoShow: false,
      bottomLineShow: false,

      bannerKindCdTemp: '',

      minStartDate: null,

      mobileBannerImgAccepts: 'jpg,png,gif,mp4,svg',
      mobileBannerImgPixels: '720*1560',
      bannerImgAccepts: 'jpg,png,gif',
      bannerImgPixels: '720*auto',
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 드랍다운
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    http.mergeCodeList(this.$options.name, this.bannerCodeList, this.bannerCodes)
    http.mergeCodeList(this.$options.name, this.bannerCodeListTemp1, this.bannerCodesTemp1)
    http.mergeCodeList(this.$options.name, this.bannerCodeListTemp2, this.bannerCodesTemp2)
    http.mergeCodeList(this.$options.name, this.bannerCodeListTemp3, this.bannerCodesTemp3)
  },
  mounted() {
    this.publctDtm = [utils.now('YYYYMMDD0900'), '']
    this.minStartDate = utils.now('YYYY-MM-DD')
  },
  methods: {
    parkKindInit() {
      this.el = true
      this.cb = true
      this.hb = true
      this.sw = true
      this.etc = true
    },

    init() {
      this.parkKindCd = ''
      this.exposrYn = 'Y'
      // this.publctDtm = []
      this.langKindCd = ''
      this.appPublctYn = ''
      this.mobilePublctYn = ''
      this.pcPublctYn = ''
      this.connUrl = ''
      this.exposrOrder = ''
      this.pcImagUrl = ''
      this.mobileImagUrl = ''
      this.publctStartDtm = ''
      this.publctEndDtm = ''
      this.pcBannerImg = ''
      this.pcPopUpImg = ''
      this.mobileBannerImg = ''
      this.mobilePopupImg = ''
      this.bannerImg = ''
      this.bannerSubject = ''
      this.bannerCode = ''
      this.appPublctYnChk = true
      this.mobilePublctYnChk = true
      this.pcPublctYnChk = true
    },

    mainBannerSelect() {
      if (this.count === 0) {
        this.init()
        this.parkKindInit()
        this.bannerDetailInfoShow = true
        this.bottomLineShow = true
        this.postingLocationShow = true
        this.exposrOrderShow = true
        this.hb = false
        this.sw = false
        this.etc = false
        this.langKindShow = true
        this.langKor = true
        this.langEng = true
        this.bannerCodeShow = true
        this.pcBannerImgShow = false
        this.pcPopupImgShow = false
        this.mobileBannerImgShow = true
        this.mobilePopupImgShow = false
        this.bannerImgShow = false
        this.bannerSubjectShow = true
        this.connUrlShow = true
        this.langKindCd = '01'

        document.querySelector('#publctDtm').style.width = '50%'
        document.querySelector('#exposrYn').style.width = '50%'

        this.bannerKindCdTemp = this.bannerKindCd
        this.bannerCodes.COD_IA_BANNER_CODE = this.bannerCodesTemp1.COD_IA_BANNER_CODE
        this.bannerCodes.COD_IA_BANNER_CODE.splice(4, 2)
        this.count += 1
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_BANNER_INPUT_INIT'), null, () => {
          this.init()
          this.parkKindInit()
          this.bannerDetailInfoShow = true
          this.bottomLineShow = true
          this.postingLocationShow = true
          this.exposrOrderShow = true
          this.hb = false
          this.sw = false
          this.etc = false
          this.langKindShow = true
          this.langKor = true
          this.langEng = true
          this.bannerCodeShow = true
          this.pcBannerImgShow = false
          this.pcPopupImgShow = false
          this.mobileBannerImgShow = true
          this.mobilePopupImgShow = false
          this.bannerImgShow = false
          this.bannerSubjectShow = true
          this.connUrlShow = true
          this.langKindCd = '01'

          document.querySelector('#publctDtm').style.width = '50%'
          document.querySelector('#exposrYn').style.width = '50%'


          this.bannerKindCdTemp = this.bannerKindCd
          this.bannerCodes.COD_IA_BANNER_CODE = this.bannerCodesTemp1.COD_IA_BANNER_CODE
          this.bannerCodes.COD_IA_BANNER_CODE.splice(4, 2)
        }, () => {
          this.bannerKindCd = this.bannerKindCdTemp
        })
      }
    },

    maninPopupSelect() {
      if (this.count === 0) {
        this.init()
        this.parkKindInit()
        this.bannerDetailInfoShow = true
        this.bottomLineShow = true
        this.postingLocationShow = true
        this.exposrOrderShow = false
        this.etc = false
        this.langKindShow = false
        this.langKor = false
        this.langEng = false
        this.bannerCodeShow = false
        this.pcBannerImgShow = false
        this.pcPopupImgShow = true
        this.mobileBannerImgShow = false
        this.mobilePopupImgShow = true
        this.bannerImgShow = false
        this.bannerSubjectShow = true
        this.connUrlShow = true
        this.bannerKindCdTemp = this.bannerKindCd
        document.querySelector('#publctDtm').style.width = '50%'
        document.querySelector('#exposrYn').style.width = '100%'
        this.count += 1
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_BANNER_INPUT_INIT'), null, () => {
          this.init()
          this.parkKindInit()
          this.bannerDetailInfoShow = true
          this.bottomLineShow = true
          this.postingLocationShow = true
          this.exposrOrderShow = false
          this.etc = false
          this.langKindShow = false
          this.langKor = false
          this.langEng = false
          this.bannerCodeShow = false
          this.pcBannerImgShow = false
          this.pcPopupImgShow = true
          this.mobileBannerImgShow = false
          this.mobilePopupImgShow = true
          this.bannerImgShow = false
          this.bannerSubjectShow = true
          this.connUrlShow = true
          this.bannerKindCdTemp = this.bannerKindCd
          document.querySelector('#publctDtm').style.width = '50%'
          document.querySelector('#exposrYn').style.width = '100%'
        }, () => {
          this.bannerKindCd = this.bannerKindCdTemp
        })
      }
    },

    etcBannerSelect() {
      if (this.count === 0) {
        this.init()
        this.parkKindInit()
        this.bannerDetailInfoShow = true
        this.bottomLineShow = true
        this.postingLocationShow = false
        this.exposrOrderShow = true
        this.hb = false
        this.sw = false
        this.langKindShow = true
        this.langKor = true
        this.langEng = true
        this.bannerCodeShow = true
        this.pcBannerImgShow = false
        this.pcPopupImgShow = false
        this.mobileBannerImgShow = false
        this.mobilePopupImgShow = false
        this.bannerImgShow = true
        this.bannerSubjectShow = true
        this.connUrlShow = true
        this.bannerKindCdTemp = this.bannerKindCd
        this.langKindCd = '01'

        document.querySelector('#publctDtm').style.width = '100%'
        document.querySelector('#exposrYn').style.width = '50%'
        document.querySelector('#exposrOrder').style.width = '50%'
        /*
        this.bannerCodes.COD_IA_BANNER_CODE = this.bannerCodesTemp2.COD_IA_BANNER_CODE;

        this.bannerCode = '';
        if (this.bannerCodes.COD_IA_BANNER_CODE.length > 2) {
          this.bannerCodes.COD_IA_BANNER_CODE.splice(0,4);
        }
        */

        this.bannerCodes.COD_IA_BANNER_CODE = ''

        this.count += 1
      } else {
        utils.messageBox('confirm', this.$t('MSG_ALT_BANNER_INPUT_INIT'), null, () => {
          this.init()
          this.parkKindInit()
          this.bannerDetailInfoShow = true
          this.bottomLineShow = true
          this.postingLocationShow = false
          this.exposrOrderShow = true
          this.hb = false
          this.sw = false
          this.langKindShow = true
          this.langKor = true
          this.langEng = true
          this.bannerCodeShow = true
          this.pcBannerImgShow = false
          this.pcPopupImgShow = false
          this.mobileBannerImgShow = false
          this.mobilePopupImgShow = false
          this.bannerImgShow = true
          this.bannerSubjectShow = true
          this.connUrlShow = true
          this.bannerKindCdTemp = this.bannerKindCd
          this.langKindCd = '01'

          document.querySelector('#publctDtm').style.width = '100%'
          document.querySelector('#exposrYn').style.width = '50%'
          document.querySelector('#exposrOrder').style.width = '50%'
          /*
          this.bannerCodes.COD_IA_BANNER_CODE = this.bannerCodesTemp2.COD_IA_BANNER_CODE;

          this.bannerCode = '';
          if (this.bannerCodes.COD_IA_BANNER_CODE.length > 2) {
            this.bannerCodes.COD_IA_BANNER_CODE.splice(0,4);
          }
          */

          this.bannerCodes.COD_IA_BANNER_CODE = ''
        }, () => {
          this.bannerKindCd = this.bannerKindCdTemp
        })
      }
    },

    async save() {
      // function of BannerMixin
      if (!this.isValidExposrInfo()) {
        return
      }

      // function of BannerMixin
      if (!this.isValidBannerDetailInfo()) {
        return
      }

      if (this.bannerKindCd === '01') {
        /*
        if (this.pcBannerImgShow) {
          if (!this.$rules.validate(this.$refs.pcBannerImg)) {
            utils.messageBox('warning', this.$t('MSG_ALT_PC_BANNER_IMG_UPLOAD'));
            return;
          }
        }
        */
      } else if (this.bannerKindCd === '02') {
        /*
        if (this.pcPopupImgShow) {
          if (!this.$rules.validate(this.$refs.pcPopUpImg)) {
            utils.messageBox('warning', this.$t('MSG_ALT_PC_POUP_IMG_UPLOAD'));
            return;
          }
        }
        */
      }
      this.publctStartDtm = `${this.publctDtm[0].replaceAll('-', '').replaceAll(' ', '').replaceAll(':', '')}00`
      this.publctEndDtm = `${this.publctDtm[1].replaceAll('-', '').replaceAll(' ', '').replaceAll(':', '')}59`

      // 이미지 처리
      if (this.bannerKindCd === '01') {
        // this.pcImagUrl = this.pcBannerImg;
        this.mobileImagUrl = this.mobileBannerImg
      } else if (this.bannerKindCd === '02') {
        // this.pcImagUrl = this.pcPopUpImg;
        this.mobileImagUrl = this.mobilePopupImg
        this.bannerCode = '' // 메인 팝업의 경우 배너코드 없음
        this.langKindCd = '01' // 메인 팝업의 경우 국문만 지원
      } else if (this.bannerKindCd === '03') {
        this.mobileImagUrl = this.bannerImg
      }

      if (this.appPublctYnChk) {
        this.appPublctYn = 'Y'
      } else {
        this.appPublctYn = 'N'
      }

      if (this.mobilePublctYnChk) {
        this.mobilePublctYn = 'Y'
      } else {
        this.mobilePublctYn = 'N'
      }

      if (this.pcPublctYnChk) {
        this.pcPublctYn = 'Y'
      } else {
        this.pcPublctYn = 'N'
      }

      if (this.exposrOrder === '') {
        this.exposrOrder = 0
      }

      if (this.bannerKindCd === '03') {
        this.appPublctYn = 'Y'
        this.mobilePublctYn = 'Y'
        this.pcPublctYn = 'Y'
      }

      const param = {
        bannerKindCd: this.bannerKindCd,
        parkKindCd: this.parkKindCd,
        exposrYn: this.exposrYn,
        langKindCd: this.langKindCd,
        appPublctYn: this.appPublctYn,
        mobilePublctYn: this.mobilePublctYn,
        pcPublctYn: this.pcPublctYn,
        connUrl: this.connUrl,
        exposrOrder: this.exposrOrder,
        mobileImagUrl: this.mobileImagUrl,
        publctStartDtm: this.publctStartDtm,
        publctEndDtm: this.publctEndDtm,
        bannerSubject: this.bannerSubject,
        bannerCode: this.bannerCode,
        mobileImagAltDesc: this.mobileImagAltDesc,
      }

      http.request(this.$options.name, 'DTS_AAD_00018', {
        data: param,
      }).then(() => {
        utils.messageBox(
          'success',
          this.$t('MSG_ALT_SAVE_DATA'), // 저장되었습니다.
          null,
          () => this.onClickList(),
        )
      })
    },
    onClickList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAB_00021', { params })
    },
    bannerCodeChange(v) {
      if (v === '01') { // 상단
        this.mobileBannerImgAccepts = 'jpg,png,gif,mp4,svg'
        this.mobileBannerImgPixels = '720*1560'
      } else if (v === '02') { // 마케팅
        this.mobileBannerImgAccepts = 'jpg,png,gif'
        this.mobileBannerImgPixels = '548*548'
      } else if (v === '03') { // Editor
        this.mobileBannerImgAccepts = 'jpg,png,gif'
        this.mobileBannerImgPixels = '480*320'
      } else if (v === '04') { // 출석
        this.bannerImgAccepts = 'jpg,png,gif'
        this.bannerImgPixels = '720*auto'
      } else if (v === '05') { // 전자영수증
        this.bannerImgAccepts = 'jpg,png,gif'
        this.bannerImgPixels = '624*226'
      } else if (v === '06') { // 공지
        this.mobileBannerImgAccepts = 'jpg,png,gif'
        this.mobileBannerImgPixels = '480*640'
      }
    },
    selectParkKindCd(v) {
      if (v === '01' && this.bannerKindCd === '03') {
        this.bannerCodes.COD_IA_BANNER_CODE = ''
        this.bannerCode = ''
      } else if (v === '02' && this.bannerKindCd === '03') {
        this.bannerCodes.COD_IA_BANNER_CODE = ''
        this.bannerCode = ''
      } else if (v === '05' && this.bannerKindCd === '03') {
        this.bannerCodes.COD_IA_BANNER_CODE = this.bannerCodesTemp3.COD_IA_BANNER_CODE
        this.bannerCode = ''
        if (this.bannerCodes.COD_IA_BANNER_CODE.length > 2) {
          this.bannerCodes.COD_IA_BANNER_CODE.splice(0, 4)
        }
      }
    },
    onInputPublctDtm(value) {
      // 종료일시의 시분(HHmm)이 0000일 경우 2359로 대체한다.
      if (value.at(1) && value.at(1).slice(-4) === '0000') {
        this.publctDtm = [value.at(0), value.at(1).substring(0, 8).concat('2359')]
      }
    },
  },
}
</script>
<style scoped>
</style>
