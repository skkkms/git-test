<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 노출 정보 -->
      <div class="comm_title_wrap">
        <h4>
          {{ $t('MSG_TXT_EXPOSR_INFO') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- 게시판 분류 -->
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_CLASS')"
          label-align="right"
          style="width: 100%; height: auto;"
          class="flex_wrap"
          required
        >
          <ur-dropdown
            ref="publctKindCd"
            v-model="inputData.publctKindCd"
            :items="codes.COD_IA_OTHR_CONTENT_CLASS"
            :rules="$rules.getRules('not_empty')"
            fixed-message
            style="width:40%"
            :placeholder="$t('MSG_TXT_SEL')"
            @input="inputPublctKindCd"
          />
        </ur-form-item>

        <!-- 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          :style="styleExposrYn"
          required
        >
          <ur-radio-wrapper
            v-model="inputData.exposrYn"
            :items="useYn"
            sm
          />
        </ur-form-item>

        <!-- 노출 순서 -->
        <ur-form-item
          v-show="exposrOrderShowYn"
          class="flex_wrap"
          :label="$t('MSG_TXT_EXPOSR_ORDER')"
          label-align="right"
          style="width: 50%; height: auto;"
          required
        >
          <ur-text-field
            ref="exposrOrder"
            v-model="inputData.exposrOrder"
            style="width:100%; height:auto"
            mask="####"
            :rules="$rules.getRules('not_null','only_numeric')"
            fixed-message
          />
        </ur-form-item>

        <!-- 앱 노출 기간 -->
        <ur-form-item
          v-show="exposrPeriodShowYn"
          :label="$t('MSG_TXT_APP_EXPOSR_PERIOD')"
          label-align="right"
          :style="styleExposrPeriod"
          class="flex_wrap"
          required
        >
          <ur-date-time-range-picker
            ref="exposrPeriod"
            v-model="inputData.exposrPeriod"
            :confirm-label="$t('MSG_TXT_SELT')"
            :clear-label="$t('MSG_BTN_INTL')"
            @input="exposrPeriodInput"
          />
        </ur-form-item>

        <!-- 기간 표시 정보 -->
        <ur-form-item
          v-show="periodDispInfoShowYn"
          :label="$t('MSG_TXT_PERIOD_DISP_INPO')"
          label-align="right"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-range-picker
            ref="periodDispInfo"
            v-model="inputData.periodDispInfo"
            :confirm-label="$t('MSG_TXT_SELT')"
            input-type="YYYY-MM-DD"
            style="height:auto"
            @input="periodDispInfoInput"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 노출 정보 -->

      <!-- S :: 게시 상세 정보 -->
      <div
        v-show="compShow != ''"
        class="comm_title_wrap mt20"
      >
        <h4>
          {{ $t('MSG_TXT_PUBLCT_DETAIL_INFO') }}
        </h4>
      </div>

      <div>
        <!-- Editor's Pick -->
        <C01
          v-show="compShow == '01'"
          ref="C01"
          :input-data="inputData"
        />
        <!-- FAQ -->
        <C02
          v-show="compShow == '02'"
          ref="C02"
          :input-data="inputData"
        />
        <!-- 개인정보 처리방침 -->
        <C03
          v-show="compShow == '03'"
          ref="C03"
          :input-data="inputData"
        />
        <!-- 영상정보 처리기기 -->
        <C04
          v-show="compShow == '04'"
          ref="C04"
          :input-data="inputData"
        />
        <!-- 방침 개정 안내 -->
        <C05
          v-show="compShow == '05'"
          ref="C05"
          :input-data="inputData"
        />
        <!-- 이용약관 -->
        <C06
          v-show="compShow == '06'"
          ref="C06"
          :input-data="inputData"
        />
        <!-- 입찰공고 -->
        <C07
          v-show="compShow == '07'"
          ref="C07"
          :input-data="inputData"
        />
        <!-- 에버랜드 테마뮤직 -->
        <C08
          v-show="compShow == '08'"
          ref="C08"
          :input-data="inputData"
        />
        <!-- 기타 -->
        <C10
          v-show="compShow == '10'"
          ref="C10"
          :input-data="inputData"
        />
        <!-- 콜센터 VOC 답변 -->
        <C11
          v-show="compShow == '11'"
          ref="C11"
          :input-data="inputData"
        />
        <!-- 도슨트와 함께 산책 (가제) -->
        <C12
          v-show="compShow == '12'"
          ref="C12"
          :input-data="inputData"
        />
      </div>

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <!-- 목록 -->
            <ur-button
              v-permission:read="this.$options.name"
              @click="onClickList"
            >
              {{ $t("MSG_BTN_LIST") }}
            </ur-button>
          </div>

          <!-- 저장 -->
          <div class="right_box">
            <ur-button
              v-permission:update="this.$options.name"
              color="violet"
              @click="onClickSave"
            >
              {{ $t("MSG_BTN_SAVE") }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import C01 from './components/PGE_AAD_00008_C01.vue' // Editor's Pick(코드, 에디터, 파일첨부, url)
import C02 from './components/PGE_AAD_00008_C02.vue' // FAQ(코드있음)
import C03 from './components/PGE_AAD_00008_C03.vue' // 개인정보 처리방침(코드있음)
import C04 from './components/PGE_AAD_00008_C04.vue' // 영상정보 처리기기(에디터)
import C05 from './components/PGE_AAD_00008_C05.vue' // 방침 개정 안내(에디터)
import C06 from './components/PGE_AAD_00008_C06.vue' // 이용약관(코드, 에디터)
import C07 from './components/PGE_AAD_00008_C07.vue' // 입찰공고(에디터)
import C08 from './components/PGE_AAD_00008_C08.vue' // 에버랜드 테마뮤직(에디터, 파일첨부)
import C10 from './components/PGE_AAD_00008_C10.vue' // 기타(코드, 에디터, url)
import C11 from './components/PGE_AAD_00008_C11.vue' // 콜센터 VOC 답변
import C12 from './components/PGE_AAD_00008_C12.vue' // 도슨트와 함께 산책 (가제)

export default {
  name: 'PGE_AAD_00008', // eslint-disable-line vue/name-property-casing
  components: {
    C01,
    C02,
    C03,
    C04,
    C05,
    C06,
    C07,
    C08,
    C10,
    C11,
    C12,
  },
  data() {
    return {
      // 공통코드
      codeKeyList: ['COD_IA_OTHR_CONTENT_CLASS', 'COD_IA_OTHR_CONTENT_KIND'],
      codes: { COD_IA_OTHR_CONTENT_CLASS: [], COD_IA_OTHR_CONTENT_KIND: [] },
      publctId: '',

      // 입력데이터
      inputData: {
        publctKindCd: '',
        publctKindCdOld: '',
        exposrYn: 'Y',
        exposrOrder: '',
        exposrPeriod: [`${utils.now('YYYY-MM-DD')} 09:00`, ''],
        appExposrPeriodStartDtm: '',
        appExposrPeriodEndDtm: '',
        periodDispInfo: [`${utils.now('YYYY-MM-DD')}`, ''],
        periodDispInfoStartDate: '',
        periodDispInfoEndDate: '',
        contntKind: '',
        langTypeCd: 'KO',
        subject: '',
        contentDesc: '',
        fileUrl: '',
        fileAltDesc: '',
        url: '',
      },

      componentsShow: '',
      useYn: [{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],
    }
  },
  computed: {
    compShow() {
      return this.componentsShow
    },
    exposrOrderShowYn() {
      if (this.componentsShow === '10') {
        return false
      }
      return true
    },
    exposrPeriodShowYn() {
      if (this.componentsShow === '10') {
        return false
      }
      return true
    },
    periodDispInfoShowYn() {
      if (this.componentsShow === '02' || this.componentsShow === '03' || this.componentsShow === '04'
      || this.componentsShow === '06' || this.componentsShow === '08' || this.componentsShow === '10' || this.componentsShow === '12') {
        return false
      }
      return true
    },
    styleExposrPeriod() {
      if (this.componentsShow === '02' || this.componentsShow === '03' || this.componentsShow === '04'
      || this.componentsShow === '06' || this.componentsShow === '08' || this.componentsShow === '10' || this.componentsShow === '12') {
        return 'width:100%;height: auto;'
      }
      return 'width:50%; height: auto;'
    },
    styleExposrYn() {
      if (this.componentsShow === '10') {
        return 'width:100%;height: auto;'
      }
      return 'width:50%; height: auto;'
    },
  },
  watch: {
    'inputData.publctKindCd': {
      handler(value, preValue) {
        if (!utils.isEmpty(preValue) && value !== preValue) {
          if (['01', '05', '07', '11'].includes(value) && !['01', '05', '07', '11'].includes(preValue)) {
            // [게시판 분류] 변경: [기간 표시 정보]를 사용 → 미사용
            this.inputData.periodDispInfo = [utils.now('YYYY-MM-DD'), '']
          } else if (!['01', '05', '07', '11'].includes(value) && ['01', '05', '07', '11'].includes(preValue)) {
            // [게시판 분류] 변경: [기간 표시 정보]를 미사용 → 사용
            this.inputData.periodDispInfo = ['', '']
          }
        }
      },
    },
  },
  created() {
    const params = utils.getParameter(this, 'params')
    if (!utils.isEmpty(params.publctId)) {
      this.publctId = params.publctId
      this.onSearch()
    }
    // 공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {
    }).catch(() => {})
  },
  methods: {
    /** *************************************
     * 검색
     *************************************** */
    onSearch() {
      // 검색조건
      const queryParams = {
        publctId: this.publctId,
        currRows: 0, // 현재 가지고 온 데이터 수
        rowsPerPage: 1, // 가지고 올 데이터 수
      }

      http.request(this.$options.name, 'DTS_AAD_00015', {
        query: queryParams,
      }).then(res => {
        this.inputData = res.data.list.at(0)
        this.setParam()
      }).catch(error => {
        console.log(error)
      })
    },

    // editor 및 날짜 값 셋팅
    setParam() {
      this.componentsShow = this.inputData.publctKindCd
      this.inputData.publctKindCdOld = this.inputData.publctKindCd
      this.inputData.exposrOrder = utils.toCharNum(this.inputData.exposrOrder)

      if (this.compShow !== '10') {
        this.inputData.exposrPeriod = [
          utils.toStringByFormat(this.inputData.appExposrPeriodStartDtm.substring(0, 12), 'YYYY-MM-DD HH:mm'),
          utils.toStringByFormat(this.inputData.appExposrPeriodEndDtm.substring(0, 12), 'YYYY-MM-DD HH:mm'),
        ]
      } else {
        this.inputData.exposrPeriod = [`${utils.now('YYYY-MM-DD')} 09:00`, '']
      }
      this.inputData.exposrPeriodOld = this.inputData.exposrPeriod // 수정시 날짜 비교를 위해

      if (this.compShow !== '10') {
        this.inputData.periodDispInfo = [
          utils.dateformatToClient(this.inputData.periodDispInfoStartDate, 'S'),
          utils.dateformatToClient(this.inputData.periodDispInfoEndDate, 'S'),
        ]
      } else {
        this.inputData.periodDispInfo = [`${utils.now('YYYY-MM-DD')}`, '']
      }
      this.inputData.periodDispInfoOld = this.inputData.periodDispInfo // 수정시 날짜 비교를 위해

      const { publctKindCd } = this.inputData
      const { contentDesc } = this.inputData
      if (publctKindCd === '01') {
        this.$refs.C01.$refs.C01Editor.setHtml(contentDesc)
      } else if (publctKindCd === '03') {
        this.$refs.C03.detailInit(this.inputData)
        this.$refs.C03.$refs.C03Editor.setHtml(contentDesc)
      } else if (publctKindCd === '04') {
        this.$refs.C04.$refs.C04Editor.setHtml(contentDesc)
      } else if (publctKindCd === '05') {
        this.$refs.C05.$refs.C05Editor.setHtml(contentDesc)
      } else if (publctKindCd === '06') {
        this.$refs.C06.detailInit(this.inputData)
        this.$refs.C06.$refs.C06Editor.setHtml(contentDesc)
      } else if (publctKindCd === '07') {
        this.$refs.C07.$refs.C07Editor.setHtml(contentDesc)
      } else if (publctKindCd === '10') {
        this.$refs.C10.$refs.C10Editor.setHtml(contentDesc)
      } else if (publctKindCd === '11') {
        this.$refs.C11.$refs.C11Editor.setHtml(contentDesc)
      }
    },

    // 값 변경 시 데이터 초기화 질문
    inputPublctKindCd(val) {
      // 최초 설정 시 변경 메시지 안뜨도록
      if (this.inputData.publctKindCdOld === '') {
        this.componentsShow = this.inputData.publctKindCd
        this.inputData.publctKindCdOld = val
        this.onClickReset()
        return
      }

      if (this.inputData.publctKindCd !== this.inputData.publctKindCdOld) {
        // 게시판 분류 변경 시 게시 상세 정보가 초기화 됩니다. 변경하시겠습니까?
        // messagebox(type, message, subMessage, handlerPositive, handlerNegative, customButtons);
        utils.messageBox('confirm',
          utils.strFormat(this.$t('MSG_ALT_CHK_CHG_INIT'), this.$t('MSG_TXT_PUBLCT_CLASS'), this.$t('MSG_TXT_PUBLCT_DETAIL_INFO')),
          null,
          () => {
            this.componentsShow = this.inputData.publctKindCd
            this.inputData.publctKindCdOld = val
            // 확인 시 게시상세정보 초기화
            this.onClickReset()
          },
          () => {
            // 취소 시 이전 값으로 돌림.
            this.inputData.publctKindCd = this.inputData.publctKindCdOld
          }, null)
      }
    },

    // 게시 상세 정보 초기화
    onClickReset() {
      this.inputData.contntKind = ''
      this.inputData.contentExtra = ''
      this.inputData.langTypeCd = 'KO'
      this.inputData.subject = ''
      this.inputData.contentDesc = ''
      this.inputData.fileUrl = ''
      this.inputData.url = ''

      const publctKindCd = this.compShow
      if (publctKindCd !== '10') {
        this.inputData.exposrPeriod = [`${utils.now('YYYY-MM-DD')} 09:00`, '']
        this.exposrPeriodInput(this.inputData.exposrPeriod)
        this.inputData.periodDispInfo = [`${utils.now('YYYY-MM-DD')}`, '']
        this.periodDispInfoInput(this.inputData.periodDispInfo)
      }
      if (publctKindCd === '01') {
        this.$refs.C01.$refs.C01Editor.setHtml('')
      } else if (publctKindCd === '03') {
        this.$refs.C03.init()
        this.$refs.C03.$refs.C03Editor.setHtml('')
      } else if (publctKindCd === '04') {
        this.$refs.C04.$refs.C04Editor.setHtml('')
      } else if (publctKindCd === '05') {
        this.$refs.C05.$refs.C05Editor.setHtml('')
      } else if (publctKindCd === '06') {
        this.$refs.C06.init()
        this.$refs.C06.$refs.C06Editor.setHtml('')
      } else if (publctKindCd === '07') {
        this.$refs.C07.$refs.C07Editor.setHtml('')
      } else if (publctKindCd === '10') {
        this.$refs.C10.$refs.C10Editor.setHtml('')
      } else if (publctKindCd === '11') {
        this.$refs.C11.$refs.C11Editor.setHtml('')
      }
    },

    // 파람데이터 만들기
    getParam() {
      const inputParam = this.inputData
      const { compShow } = this
      if (compShow === '01') {
        inputParam.contentDesc = this.$refs.C01.$refs.C01Editor.getHtml()
      } else if (compShow === '03') {
        inputParam.contentDesc = this.$refs.C03.$refs.C03Editor.getHtml()
      } else if (compShow === '04') {
        inputParam.contentDesc = this.$refs.C04.$refs.C04Editor.getHtml()
      } else if (compShow === '05') {
        inputParam.contentDesc = this.$refs.C05.$refs.C05Editor.getHtml()
      } else if (compShow === '06') {
        inputParam.contentDesc = this.$refs.C06.$refs.C06Editor.getHtml()
      } else if (compShow === '07') {
        inputParam.contentDesc = this.$refs.C07.$refs.C07Editor.getHtml()
      } else if (compShow === '10') {
        inputParam.appExposrPeriodStartDtm = ''
        inputParam.periodDispInfoStartDate = ''
        inputParam.contentDesc = this.$refs.C10.$refs.C10Editor.getHtml()
      } else if (compShow === '11') {
        inputParam.contentDesc = this.$refs.C11.$refs.C11Editor.getHtml()
      }

      return inputParam
    },

    /** *************************************
     * 저장
     *************************************** */
    async onClickSave() {
      // 중복 URL 체크
      if (!utils.isEmpty(this.inputData.url) && await this.chkSameUrl()) {
        utils.messageBox('warning', this.$t('MSG_TXT_SAME_URL')) // 동일한 URL이 있습니다. 다른경로를 입력해주세요.
        return
      }

      // 유효성 체크
      if (this.isValidation()) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
          if (this.publctId) {
            // 수정시..
            http.request(this.$options.name, 'DTS_AAD_00024', {
              data: this.getParam(),
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
              this.onClickList() // 목록으로 이동..
            })
          } else {
            // 등록시..
            http.request(this.$options.name, 'DTS_AAD_00017', {
              data: this.getParam(),
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
              this.onClickList() // 목록으로 이동..
            })
          }
        })
      }
    },

    // 중복 URL 체크
    chkSameUrl() {
      const that = this
      return new Promise(resolve => {
        const queryParams = {
          publctId: that.inputData.publctId,
          publctKindCd: that.compShow,
          url: that.inputData.url,
        }
        http.request(that.$options.name, 'DTS_AAD_00021', {
          query: queryParams,
        }).then(res => {
          if (res.data > 0) {
            utils.messageBox('warning', that.$t('MSG_TXT_SAME_URL')) // 동일한 URL이 있습니다. 다른경로를 입력해주세요.
            resolve(true)
          } else {
            resolve(false)
          }
        })
      })
    },

    // 유효성 체크
    isValidation() {
      /* eslint-disable max-len */
      // 게시판 분류
      if (!this.$rules.validate(this.$refs.publctKindCd)) {
        return false
      }

      // 노출 여부
      if (utils.isEmpty(this.inputData.exposrYn)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXPOSR_YN')) // {0}은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }

      // 노출 순서
      if (this.exposrOrderShowYn) {
        if (utils.isEmpty(this.inputData.exposrOrder)) {
          const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXPOSR_ORDER')) // {노출순서}은(는) 필수 항목입니다.
          utils.messageBox('warning', msg)
          return false
        }
        if (!this.$rules.validate(this.$refs.exposrOrder)) {
          return false
        }
      }

      // 앱 노출 기간
      if (this.exposrPeriodShowYn) {
        if (!this.isValidationExposrPeriod()) {
          return false
        }
      }

      // 기간 표시 정보
      if (this.periodDispInfoShowYn) {
        // 필수입력 사항여부: 기간 표시 정보 항목은 시작일자만 필수값으로 체크한다.
        if (utils.isEmpty(this.inputData.periodDispInfo[0])) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PERIOD_DISP_INPO')))
          return false
        }
        // 유효기간 여부
        if (!this.isValidationPeriodDispInfo()) {
          return false
        }
      }

      // 아래 컴포넌트의 유효성 체크
      if (!this.isValidationComp()) {
        return false
      }

      return true
      /* eslint-enable max-len */
    },

    // 아래 컴포넌트의 유효성 체크
    isValidationComp() {
      let reVal = true
      switch (this.compShow) {
      case '01':
        if (!this.$refs.C01.isConpValidation()) reVal = false
        break
      case '02':
        if (!this.$refs.C02.isConpValidation()) reVal = false
        break
      case '03':
        if (!this.$refs.C03.isConpValidation()) reVal = false
        break
      case '04':
        if (!this.$refs.C04.isConpValidation()) reVal = false
        break
      case '05':
        if (!this.$refs.C05.isConpValidation()) reVal = false
        break
      case '06':
        if (!this.$refs.C06.isConpValidation()) reVal = false
        break
      case '07':
        if (!this.$refs.C07.isConpValidation()) reVal = false
        break
      case '08':
        if (!this.$refs.C08.isConpValidation()) reVal = false
        break
      case '10':
        if (!this.$refs.C10.isConpValidation()) reVal = false
        break
      case '11':
        if (!this.$refs.C11.isConpValidation()) reVal = false
        break
      case '12':
        if (!this.$refs.C12.isConpValidation()) reVal = false
        break
      default:
        break
      }
      return reVal
    },

    // 앱 노출 기간 유효성 체크
    isValidationExposrPeriod() {
      /* eslint-disable max-len */
      if (utils.isEmpty(this.inputData.exposrPeriod[0]) || utils.isEmpty(this.inputData.exposrPeriod[1])) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD')) // {앱 노출기간}은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }
      if (utils.isEmpty(this.publctId) && moment(this.inputData.exposrPeriod[0]).isBefore(utils.now())) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD')) // 앱 노출기간의 과거일자는 선택할 수 없습니다.
        utils.messageBox('warning', msg)
        return false
      }
      if (!utils.isEmpty(this.publctId)
            && utils.getDayOffset(this.inputData.exposrPeriodOld[0], this.inputData.exposrPeriod[0]) !== 0
            && moment(this.inputData.exposrPeriod[0]).isBefore(utils.now())
      ) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD')) // 앱 노출기간의 과거일자는 선택할 수 없습니다.
        utils.messageBox('warning', msg)
        return false
      }
      if (!utils.isEmpty(this.publctId)
            && utils.getDayOffset(this.inputData.exposrPeriodOld[1], this.inputData.exposrPeriod[1]) !== 0
            && moment(this.inputData.exposrPeriod[1]).isBefore(utils.now())
      ) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD')) // 앱 노출기간의 과거일자는 선택할 수 없습니다.
        utils.messageBox('warning', msg)
        return false
      }
      return true
      /* eslint-enable max-len */
    },

    // 기간표시정보 유효성 체크
    isValidationPeriodDispInfo() {
      // [게시판 분류: 방침 개정 안내]의 경우에는
      // [기간 표시 정보]의 과거일자 선택 제한이 없음(2023-11-09 오주환 프로).
      if (['05'].includes(this.inputData.publctKindCd)) {
        return true
      }

      /* eslint-disable max-len */
      if (utils.isEmpty(this.publctId) && moment(this.inputData.periodDispInfo[0]).isBefore(utils.now())) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_PERIOD_DISP_INPO')) // 기간 표시 정보의 과거일자는 선택할 수 없습니다.
        utils.messageBox('warning', msg)
        return false
      }
      if (!utils.isEmpty(this.publctId)
            && utils.getDayOffset(this.inputData.periodDispInfoOld[0], this.inputData.periodDispInfo[0]) !== 0
            && moment(this.inputData.periodDispInfo[0]).isBefore(utils.now())
      ) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_PERIOD_DISP_INPO')) // 기간 표시 정보의 과거일자는 선택할 수 없습니다.
        utils.messageBox('warning', msg)
        return false
      }

      if (!_.isEmpty(this.inputData.periodDispInfo[1])) {
        if (!utils.isEmpty(this.publctId)) {
          if (_.isEmpty(this.inputData.periodDispInfoOld[1])) {
            if (moment(this.inputData.periodDispInfo[1]).isBefore(utils.now())) {
              utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_PERIOD_DISP_INPO'))) // 기간 표시 정보의 과거일자는 선택할 수 없습니다.
              return false
            }
          } else if (utils.getDayOffset(this.inputData.periodDispInfoOld[1], this.inputData.periodDispInfo[1]) !== 0 && moment(this.inputData.periodDispInfo[1]).isBefore(utils.now())) {
            utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_PERIOD_DISP_INPO'))) // 기간 표시 정보의 과거일자는 선택할 수 없습니다.
            return false
          }
        }
      }
      return true
      /* eslint-enable max-len */
    },

    // 기간표시정보 값 셋팅
    periodDispInfoInput(val) {
      this.inputData.periodDispInfoStartDate = _.isEmpty(val[0]) ? null : utils.dateformatToServer(val[0], 'S')
      this.inputData.periodDispInfoEndDate = _.isEmpty(val[1]) ? null : utils.dateformatToServer(val[1], 'S')
    },

    // 앱 노출 기간 입력 시 값 셋팅
    exposrPeriodInput(val) {
      if (val.at(1) && val.at(1).slice(-5) === '00:00') {
        this.inputData.exposrPeriod = [val.at(0), val.at(1).substring(0, 11).concat('23:59')]
        this.inputData.appExposrPeriodStartDtm = utils.dateformatToServer(val.at(0))
        this.inputData.appExposrPeriodEndDtm = utils.dateformatToServer(val.at(1).substring(0, 11).concat('23:59'))
        return
      }

      this.inputData.appExposrPeriodStartDtm = _.isEmpty(val[0]) ? null : utils.dateformatToServer(val[0].concat('00'))
      this.inputData.appExposrPeriodEndDtm = _.isEmpty(val[1]) ? null : utils.dateformatToServer(val[1].concat('59'))
    },

    // 기타게시판 목록으로 이동
    onClickList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAD_00007', { params })
    },
  },
}
</script>
<style scoped>
</style>
