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
        <!-- 게시 구분 -->
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
            @input="[selectParkKindCd(), countCheck()]"
          >
            {{ $t('MSG_TXT_EB') }} <!-- 에버랜드 -->
          </ur-radio>
          <ur-radio
            v-show="cb"
            v-model="parkKindCd"
            value="02"
            sm
            @input="[selectParkKindCd(), countCheck()]"
          >
            {{ $t('MSG_TXT_CB') }} <!-- 캐리비안베이 -->
          </ur-radio>
          <ur-radio
            v-show="hb"
            v-model="parkKindCd"
            value="03"
            sm
            @input="countCheck"
          >
            {{ $t('MSG_TXT_HOME_BRG') }} <!-- 홈브리지 -->
          </ur-radio>
          <ur-radio
            v-show="sw"
            v-model="parkKindCd"
            value="04"
            sm
            @input="countCheck"
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
            {{ $t('MSG_TXT_ETC') }} <!-- 기타 -->
          </ur-radio>
        </ur-form-item>
        <!-- 게시 위치 -->
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
            @input="appFileShow"
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
            @input="mobileFileShow"
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
            @input="pcFileShow"
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
          :label="$t('MSG_TXT_PUBLCT_DT')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          required
        >
          <ur-date-time-range-picker
            v-model="publctDtm"
            :confirm-label="$t('MSG_TXT_SEL')"
            :clear-label="$t('MSG_BTN_INTL')"
            :min-date="minStartDate"
            @input="onInputPublctDtm"
          />
        </ur-form-item>
        <!-- 노출 여부 -->
        <ur-form-item
          id="exposrYn"
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          required
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="exposrYn"
            value="Y"
            sm
            @input="exposrYnCheck"
          >
            Y
          </ur-radio>
          <ur-radio
            v-model="exposrYn"
            value="N"
            sm
            @input="exposrYnCheck"
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
          style="width: 50%; height: auto;"
          required
        >
          <!-- '배너 구분' 메인 팝업 선택인 경우 disabled-->
          <ur-text-field
            v-show="exposrOrderShow"
            ref="exposrOrder"
            v-model="exposrOrder"
            mask="####"
            maxlength="4"
            class="mb4"
            style="width: 100%; height: auto;"
            :rules="$rules.getRules('not_empty')"
            fixed-message
          />
        <!-- '배너 구분' 메인 팝업 선택인 경우 disabled-->
        </ur-form-item>
      </ur-form-box>
      <!-- ::E 노출 정보 -->

      <!-- ::S 배너 상세 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          {{ $t('MSG_TXT_BANNER_DETAIL_INFO') }} <!-- 배너 상세 정보 -->
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- 언어 구분 -->
        <ur-form-item
          v-show="langKindShow"
          :label="$t('MSG_TXT_LANG_DIV')"
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
          required
          style="width: 100%; height: auto;"
        >
          <!-- '배너 구분' 메인 팝업, 기타 배너 선택인 경우 disabled-->
          <ur-dropdown
            v-show="bannerCodeShow"
            v-model="bannerCode"
            :items="bannerCodes.COD_IA_BANNER_CODE"
            style="width: 460px; height: auto;"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_SEL')"
            @input="[bannerCodeChange(), bannerCountCheck()]"
          />
        <!-- '배너 구분' 메인 팝업, 기타 배너 선택인 경우 disabled-->
        </ur-form-item>
        <!-- 제목 -->
        <ur-form-item
          v-show="bannerSubjectShow"
          :label="$t('MSG_TIT_TTL')"
          label-align="right"
          required
          style="width: 100%; "
        >
          <ur-text-field
            v-show="bannerSubjectShow"
            ref="bannerSubject"
            v-model="bannerSubject"
            value=""
            style="width: 460px; height: auto;"
            class="mb4"
            maxlength="150"
            :rules="$rules.getRules('not_empty')"
          />
        </ur-form-item>
        <!--
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_PC_BANNER_IMG')"
          label-align="right"
          required
          style="width: 100%; "
          v-show="pcBannerImgShow"
        >
        -->
        <!-- '배너 구분' 기타 배너 선택인 경우 disabled-->
        <!--
          <ur-text-field
            value=""
            style="width: 88%; height: auto;"
            class="mb4"
            v-show="pcBannerImgShow"
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
            style="width: 920px;"
            :rules="$rules.getRules('not_empty')"
          />
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
            style="width: 920px;"
            :rules="$rules.getRules('not_empty')"
            :accepts="mobileBannerImgAccepts"
            :pixels="mobileBannerImgPixels"
            preview-mode="BELOW"
            show-guidance
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
        <!--
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_BANNER_IMAG')"
          label-align="right"
          required
          style="width: 100%;"
          v-show="bannerImgShow"
        >
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
        </ur-form-item>
        -->
        <!-- 배너 이미지 -->
        <ur-form-item
          v-show="bannerImgShow"
          :label="$t('MSG_TXT_BANNER_IMAG')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
          required
        >
          <!--
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
          -->
          <cmp-single-file-uploader
            v-show="bannerImgShow"
            ref="bannerImg"
            v-model="bannerImg"
            :page-id="this.$options.name"
            style="width: 920px; margin"
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
          <!--
            </div>
          </div>
          <div class="col_img_wrap pb4">
            <div class="col_item_img">
              <img
                :src="bannerImgUrl"
                style="width: 20%;"
              >
            </div>
          </div>
          -->
        </ur-form-item>
        <!-- 연결 URL -->
        <ur-form-item
          v-show="connUrlShow"
          :label="$t('MSG_TXT_CONN_URL')"
          label-align="right"
          style="width: 100%; "
        >
          <ur-text-field
            v-show="connUrlShow"
            ref="connUrl"
            v-model="connUrl"
            maxlength="150"
            value=""
            class="mb4"
            style="width: 460px; height: auto;"
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
import CommonUtils from '~aa/js/common-utils' // import
import BannerMixin from '~aa/pages/D/mixins/BannerMixin'

export default {
  name: 'PGE_AAB_00024', // eslint-disable-line vue/name-property-casing
  mixins: [BannerMixin],
  data() {
    return {
      // 라디오버튼
      bannerKindCd: '',
      parkKindCd: '',
      parkKindCdOld: '',
      parkKindNew: false,
      bannerCodeOld: '',
      bannerCodeNew: false,
      exposrYn: 'Y',
      publctDtm: [],
      langKindCd: '',
      exposrYnOld: '',
      exposrYnNew: false,

      // 체크박스
      appPublctYnChk: false,
      mobilePublctYnChk: false,
      pcPublctYnChk: false,
      appPublctYn: '',
      mobilePublctYn: '',
      pcPublctYn: '',
      appPublctYnNew: false,
      mobilePublctNew: false,
      pcPublctYnNew: false,

      appPublctYnOld: '',
      mobilePublctYnOld: '',
      pcPublctYnOld: '',

      // 드롭다운
      dateValue1: '',
      mobilePopup: true,

      bannerSubject: '',
      bannerCode: '01',
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
      bannerImgUrl: '',
      mobileImagAltDesc: '',

      el: false,
      cb: false,
      hb: false,
      sw: false,
      etc: false,
      postingLocationShow: false,
      exposrOrderShow: false,
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

      bannerKindCdTemp: '',

      publctId: '',
      count: 0,
      pcImagFileName: '',
      mobileImagFileName: '',
      minStartDate: null,

      mobileBannerImgAccepts: '',
      mobileBannerImgPixels: '',
      bannerImgAccepts: '',
      bannerImgPixels: '',
      publctDtmOld: [],
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
    // http.mergeCodeList(this.$options.name, this.bannerCodeList, this.bannerCodes)
    http.mergeCodeList(this.$options.name, this.bannerCodeListTemp1, this.bannerCodesTemp1)
    http.mergeCodeList(this.$options.name, this.bannerCodeListTemp2, this.bannerCodesTemp2)
    http.mergeCodeList(this.$options.name, this.bannerCodeListTemp3, this.bannerCodesTemp3)
  },
  mounted() {
    const params = utils.getParameter(this, 'params')

    // 상세
    http.request(this.$options.name, 'DTS_AAD_00020', {
      query: {
        publctId: params.publctId,
      },
    }).then(res => {
      if (res.data.bannerKindCd === '01') {
        this.mainBannerSelectInit()
        this.pcBannerImg = res.data.pcImagUrl
        this.mobileBannerImg = res.data.mobileImagUrl
      } else if (res.data.bannerKindCd === '02') {
        this.maninPopupSelectInit()
        this.pcPopUpImg = res.data.pcImagUrl
        this.mobilePopupImg = res.data.mobileImagUrl
      } else if (res.data.bannerKindCd === '03') {
        this.etcBannerSelectInit(res.data.parkKindCd, res.data.bannerKindCd)
        this.bannerImg = res.data.mobileImagUrl
        this.bannerImgUrl = res.data.mobileImagUrl
      }

      this.publctId = res.data.publctId
      this.bannerKindCd = res.data.bannerKindCd
      this.bannerKindCdNm = res.data.bannerKindCdNm
      this.parkKindCd = res.data.parkKindCd
      this.parkKindCdOld = res.data.parkKindCd
      this.parkKindCdNm = res.data.parkKindCdNm
      this.exposrYn = res.data.exposrYn
      this.exposrYnOld = res.data.exposrYn
      this.langKindCd = res.data.langKindCd
      this.appPublctYn = res.data.appPublctYn
      this.mobilePublctYn = res.data.mobilePublctYn
      this.pcPublctYn = res.data.pcPublctYn
      this.appPublctYnOld = res.data.appPublctYn
      this.mobilePublctYnOld = res.data.mobilePublctYn
      this.pcPublctYnOld = res.data.pcPublctYn
      this.connUrl = res.data.connUrl
      this.exposrOrder = `${res.data.exposrOrder}`
      this.pcImagUrl = res.data.pcImagUrl
      this.mobileImagUrl = res.data.mobileImagUrl
      this.publctStartDtm = res.data.publctStartDtm
      this.publctEndDtm = res.data.publctEndDtm
      this.bannerSubject = res.data.bannerSubject
      this.bannerCode = res.data.bannerCode
      this.publctLocation = res.data.publctLocation
      this.mobileImagAltDesc = res.data.mobileImagAltDesc
      this.bannerKindCdTemp = this.bannerKindCd

      if (this.appPublctYn === 'N') {
        this.appPublctYnChk = false
      }

      if (this.mobilePublctYn === 'N') {
        this.mobilePublctYnChk = false
      }

      if (this.pcPublctYn === 'N') {
        this.pcPublctYnChk = false
      }

      this.publctDtm = [
        utils.toStringByFormat(res.data.publctStartDtm, 'YYYY-MM-DD HH:mm'),
        utils.toStringByFormat(res.data.publctEndDtm, 'YYYY-MM-DD HH:mm'),
      ]

      this.publctDtmOld = [
        utils.toStringByFormat(res.data.publctStartDtm, 'YYYY-MM-DD HH:mm'),
        utils.toStringByFormat(res.data.publctEndDtm, 'YYYY-MM-DD HH:mm'),
      ]

      const dateString = utils.toStringByFormat(res.data.publctStartDtm, 'YYYYMMDD') // today와 비교할 날짜 (저장 시 입력된 날짜가 되겠습니다.)
      const dateFormat = 'YYYYMMDD' // 위 dateString의 format (예시와 같은 경우에는 YYYYMMDD가 되겠습니다.)

      // dateString과 today의 날짜를 비교한 뒤, 더 과거의 날짜를 return하여 this.minDate에 대입합니다.
      // picker의 min-date는 YYYY-MM-DD 형태의 값을 받으므로, YYYY-MM-DD 형태로 RETURN됩니다.
      this.minStartDate = CommonUtils.getMinDateWithToday(dateString, dateFormat)
      // this.minStartDate = moment(res.data.publctStartDtm, 'YYYYMMDDHHmm').format('YYYY-MM-DD')

      this.bannerCodeChange(this.bannerCode)
    }).catch(error => {
      console.log('error : ', error)
    })
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
      this.publctDtm = []
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
      utils.messageBox('confirm', this.$t('MSG_ALT_BANNER_INPUT_INIT'), null, () => {
        this.init()
        this.parkKindInit()
        this.postingLocationShow = true
        this.exposrOrderShow = true
        this.hb = false
        this.sw = false
        this.etc = false
        this.langKindShow = true
        this.langKor = true
        this.langEng = true
        this.bannerCodeShow = true
        this.pcBannerImgShow = true
        this.pcPopupImgShow = false
        this.mobileBannerImgShow = true
        this.mobilePopupImgShow = false
        this.bannerImgShow = false
        this.bannerSubjectShow = true
        this.connUrlShow = true

        document.querySelector('#publctDtm').style.width = '50%'
        document.querySelector('#exposrYn').style.width = '50%'

        // this.bannerCodeChange('01')

        this.bannerKindCdTemp = this.bannerKindCd
        this.bannerCodes.COD_IA_BANNER_CODE = []
        this.bannerCodes.COD_IA_BANNER_CODE = this.bannerCodesTemp1.COD_IA_BANNER_CODE
        this.bannerCodes.COD_IA_BANNER_CODE.splice(4, 2)
      }, () => {
        this.bannerKindCd = this.bannerKindCdTemp
      })
    },

    maninPopupSelect() {
      utils.messageBox('confirm', this.$t('MSG_ALT_BANNER_INPUT_INIT'), null, () => {
        this.init()
        this.parkKindInit()
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
    },

    etcBannerSelect() {
      utils.messageBox('confirm', this.$t('MSG_ALT_BANNER_INPUT_INIT'), null, () => {
        this.init()
        this.parkKindInit()
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

        document.querySelector('#publctDtm').style.width = '100%'
        document.querySelector('#exposrYn').style.width = '50%'
        document.querySelector('#exposrOrder').style.width = '50%'

        /*
        this.bannerCodes.COD_IA_BANNER_CODE = []
        this.bannerCodes.COD_IA_BANNER_CODE = this.bannerCodesTemp2.COD_IA_BANNER_CODE
        //this.bannerCode = '04'
        if (this.bannerCodes.COD_IA_BANNER_CODE.length > 2) {
          this.bannerCodes.COD_IA_BANNER_CODE.splice(0,4)
        }
        */
        this.bannerCodeChange('04')
        this.bannerCodes.COD_IA_BANNER_CODE = ''
      }, () => {
        this.bannerKindCd = this.bannerKindCdTemp
      })
    },

    mainBannerSelectInit() {
      this.init()
      this.parkKindInit()
      this.postingLocationShow = true
      this.exposrOrderShow = true
      this.hb = false
      this.sw = false
      this.etc = false
      this.langKindShow = true
      this.langKor = true
      this.langEng = true
      this.bannerCodeShow = true
      this.pcBannerImgShow = true
      this.pcPopupImgShow = false
      this.mobileBannerImgShow = true
      this.mobilePopupImgShow = false
      this.bannerImgShow = false
      this.bannerSubjectShow = true
      this.connUrlShow = true

      document.querySelector('#publctDtm').style.width = '50%'
      document.querySelector('#exposrYn').style.width = '50%'

      this.bannerCodes.COD_IA_BANNER_CODE = []
      this.bannerCodes.COD_IA_BANNER_CODE = this.bannerCodesTemp1.COD_IA_BANNER_CODE
      setTimeout(() => this.bannerCodes.COD_IA_BANNER_CODE.splice(4, 2), 100)
    },

    maninPopupSelectInit() {
      this.init()
      this.parkKindInit()
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

      document.querySelector('#publctDtm').style.width = '50%'
      document.querySelector('#exposrYn').style.width = '100%'
    },

    etcBannerSelectInit(v, bannerKindCd) {
      this.init()
      this.parkKindInit()
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

      this.selectParkKindCd(v, bannerKindCd)
      document.querySelector('#publctDtm').style.width = '100%'
      document.querySelector('#exposrYn').style.width = '50%'
      document.querySelector('#exposrOrder').style.width = '50%'

      /*
      this.bannerCodes.COD_IA_BANNER_CODE = []
      this.bannerCodes.COD_IA_BANNER_CODE = this.bannerCodesTemp2.COD_IA_BANNER_CODE
      setTimeout(() => this.bannerCodes.COD_IA_BANNER_CODE.splice(0,4), 500)
      */
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
        if (!await this.isValidMainBanner()) {
          return
        }
      } else if (this.bannerKindCd === '02') {
        if (!await this.isValidMainPopup()) {
          return
        }
      }
      this.publctStartDtm = `${this.publctDtm[0].replaceAll('-', '').replaceAll(' ', '').replaceAll(':', '')}00`
      this.publctEndDtm = `${this.publctDtm[1].replaceAll('-', '').replaceAll(' ', '').replaceAll(':', '')}59`

      // 이미지 처리
      if (this.bannerKindCd === '01') {
        // this.pcImagUrl = this.pcBannerImg
        this.mobileImagUrl = this.mobileBannerImg
      } else if (this.bannerKindCd === '02') {
        // this.pcImagUrl = this.pcPopUpImg
        this.mobileImagUrl = this.mobilePopupImg
        this.bannerCode = '' // 메인 팝업의 경우 배너코드 없음
        this.langKindCd = '01' // 메인 팝업의 경우 국문만 지원
      } else if (this.bannerKindCd === '03') {
        this.pcImagUrl = this.bannerImg
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

      if (utils.isEmpty(this.exposrOrder)) {
        this.exposrOrder = 0
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
        publctId: this.publctId,
        mobileImagAltDesc: this.mobileImagAltDesc,
      }

      http.request(this.$options.name, 'DTS_AAD_00025', {
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

    appFileShow() {
      if (this.appPublctYnChk) {
        this.appPublctYn = 'Y'
      } else {
        this.appPublctYn = 'N'
      }

      if (this.appPublctYn !== this.appPublctYnOld) {
        this.appPublctYnNew = true
      } else {
        this.appPublctYnNew = false
      }
    },

    mobileFileShow() {
      if (this.mobilePublctYnChk) {
        this.mobilePublctYn = 'Y'
      } else {
        this.mobilePublctYn = 'N'
      }

      if (this.mobilePublctYn !== this.mobilePublctYnOld) {
        this.mobilePublctNew = true
      } else {
        this.mobilePublctNew = false
      }
    },

    pcFileShow() {
      if (this.pcPublctYnChk) {
        this.pcPublctYn = 'Y'
      } else {
        this.pcPublctYn = 'N'
      }

      if (this.pcPublctYn !== this.pcPublctYnOld) {
        this.pcPublctYnNew = true
      } else {
        this.pcPublctYnNew = false
      }
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
      } else if (v === undefined) {
        if (this.bannerCode === '01') { // 상단
          this.mobileBannerImgAccepts = 'jpg,png,gif,mp4,svg'
          this.mobileBannerImgPixels = '720*1560'
        } else if (this.bannerCode === '02') { // 마케팅
          this.mobileBannerImgAccepts = 'jpg,png,gif'
          this.mobileBannerImgPixels = '548*548'
        } else if (this.bannerCode === '03') { // Editor
          this.mobileBannerImgAccepts = 'jpg,png,gif'
          this.mobileBannerImgPixels = '480*320'
        } else if (this.bannerCode === '04') { // 출석
          this.bannerImgAccepts = 'jpg,png,gif'
          this.bannerImgPixels = '720*auto'
        } else if (this.bannerCode === '05') { // 전자영수증
          this.bannerImgAccepts = 'jpg,png,gif'
          this.bannerImgPixels = '624*226'
        } else if (this.bannerCode === '06') { // 공지
          this.mobileBannerImgAccepts = 'jpg,png,gif'
          this.mobileBannerImgPixels = '480*640'
        }
      }
    },

    sleep() {
      const wakeUpTime = Date.now() + 100
      while (Date.now() < wakeUpTime) {
        // Do nothing
      }
    },

    async  selectParkKindCd(v) {
      await this.sleep()

      if (v === '01' && this.bannerKindCd === '03') {
        this.bannerCodes.COD_IA_BANNER_CODE = []
        this.bannerCode = ''
      } else if (v === '02' && this.bannerKindCd === '03') {
        this.bannerCodes.COD_IA_BANNER_CODE = []
        this.bannerCode = ''
      } else if (v === '05' && this.bannerKindCd === '03') {
        this.bannerCodes.COD_IA_BANNER_CODE = this.bannerCodesTemp3.COD_IA_BANNER_CODE
        // this.bannerCode = ''
        setTimeout(() => this.settingEtcBannerCodes(), 500)
      }
    },

    settingEtcBannerCodes() {
      if (this.bannerCodes.COD_IA_BANNER_CODE.length > 2) {
        this.bannerCodes.COD_IA_BANNER_CODE.splice(0, 4)
      }
    },

    countCheck() {
      if (this.parkKindCd !== this.parkKindCdOld) {
        this.parkKindNew = true
      } else {
        this.parkKindNew = false
      }
    },

    bannerCountCheck() {
      if (this.bannerCode !== this.bannerCodeOld) {
        this.bannerCodeNew = true
      } else {
        this.bannerCodeNew = false
      }
    },

    exposrYnCheck() {
      if (this.exposrYn !== this.exposrYnOld) {
        this.exposrYnNew = true
      } else {
        this.exposrYnNew = false
      }
    },
    onInputPublctDtm(value) {
      // 종료일시의 시분(HHmm)이 0000일 경우 2359로 대체한다.
      if (value.at(1) && value.at(1).slice(-5) === '00:00') {
        this.publctDtm = [value.at(0), value.at(1).substring(0, 11).concat('23:59')]
      }
    },
    updated() {
      if (this.count === 0) {
        this.appFileShow()
        this.mobileFileShow()
        this.pcFileShow()
        this.count += 1
      }
    },
    async isValidMainBanner() {
      if (utils.getDayOffset(this.publctDtmOld[0], this.publctDtm[0]) !== 0
            && moment(this.publctDtm[0]).isBefore(utils.now())
      ) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_PUBLCT_DT')) // 노출기간의의 과거일자는 선택할 수 없습니다.
        utils.messageBox('warning', msg)
        return false
      }

      if (utils.getDayOffset(this.publctDtmOld[1], this.publctDtm[1]) !== 0
          && moment(this.publctDtm[1]).isBefore(utils.now())
      ) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_PUBLCT_DT')) // 노출기간의의 과거일자는 선택할 수 없습니다.
        utils.messageBox('warning', msg)
        return false
      }
      /*
      if (this.pcBannerImgShow) {
        if (!this.$rules.validate(this.$refs.pcBannerImg)) {
          utils.messageBox('warning', this.$t('MSG_ALT_PC_BANNER_IMG_UPLOAD'))
          return false
        }
      }
      */
      return true
    },
    async isValidMainPopup() {
      /*
      if (this.pcPopupImgShow) {
        if (!this.$rules.validate(this.$refs.pcPopUpImg)) {
          utils.messageBox('warning', this.$t('MSG_ALT_PC_POUP_IMG_UPLOAD'))
          return
        }
      }
      */
      return true
    },
  },
}

</script>
<style scoped>
</style>
