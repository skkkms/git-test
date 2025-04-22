<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <!-- :: 할인혜택 등록 -->
    <sui-page-contents>
      <!-- S :: 노출 정보 탭 메뉴-->
      <div class="comm_title_wrap">
        <h4>
          {{ $t('MSG_TXT_EXPOSR_INFO') }}
        </h4>
      </div>
      <ur-form-box>
        <!-- 게시 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          :label-align="'right'"
          style="width:50%; height:auto;"
          required
        >
          <ur-radio-wrapper
            ref="parkKindCd"
            v-model="inputData.parkKindCd"
            :items="codes.COD_RS_PARK_KIND_SIMPLE"
            sm
            @input="inputParkKindCd"
          />
        </ur-form-item>

        <!-- 혜택 분류 -->
        <ur-form-item
          :label="$t('MSG_TXT_BNTF_CLASS')"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
          required
        >
          <ur-dropdown
            v-if="inputData.parkKindCd=='02'"
            ref="bnftClassCdCb"
            v-model="inputData.bnftClassCd"
            :items="COD_IA_BENEFIT_CLASS_CB"
            :placeholder="$t('MSG_TXT_SEL')"
            class="pr10"
            :rules="$rules.getRules('not_empty')"
            fixed-message
            @input="inputBnftClassCd"
          />
          <ur-dropdown
            v-else
            ref="bnftClassCd"
            v-model="inputData.bnftClassCd"
            :items="codes.COD_IA_BENEFIT_CLASS"
            :placeholder="$t('MSG_TXT_SEL')"
            class="pr10"
            :rules="$rules.getRules('not_empty')"
            fixed-message
            @input="inputBnftClassCd"
          />
        </ur-form-item>

        <!-- 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          :label-align="'right'"
          style="width:50%; height:auto;"
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
          :label="$t('MSG_TXT_EXPOSR_ORDER')"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
          required
        >
          <ur-text-field
            ref="exposrOrder"
            v-model="inputData.exposrOrder"
            style="width:100%; height:auto;"
            mask="####"
            :rules="$rules.getRules('not_null','only_numeric')"
            fixed-message
          />
        </ur-form-item>

        <!-- 앱 노출 기간 -->
        <ur-form-item
          :label="$t('MSG_TXT_APP_EXPOSR_PERIOD')"
          :label-align="'right'"
          :style="chgStyle"
          class="flex_wrap"
          required
        >
          <ur-date-time-range-picker
            ref="appExposrPeriodDtm"
            v-model="inputData.appExposrPeriodDtm"
            :confirm-label="$t('MSG_TXT_SELT')"
            :rules="appExposrPeriodDtmRule"
            fixed-message
            @input="inputAppExposrPeriodDtm"
          />
        </ur-form-item>

        <!-- 기간 표시 정보 -->
        <ur-form-item
          v-show="compShow != '02'"
          :label="$t('MSG_TXT_PERIOD_DISP_INPO')"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
        >
          <ur-range-picker
            ref="periodDispInfoDate"
            v-model="inputData.periodDispInfoDate"
            :confirm-label="$t('MSG_TXT_SELT')"
            :rules="periodDispInfoDateRule"
            fixed-message
            @input="periodDispInfoDateInput"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 노출 정보 탭 메뉴-->


      <!-- S :: 혜택 상세 정보 -->
      <div
        v-show="compShow != ''"
        class="comm_title_wrap mt20"
      >
        <h4>
          {{ $t('MSG_TXT_BNTF_DETAIL_INFO') }}
        </h4>
      </div>

      <div>
        <!-- 할인 정보 -->
        <C01
          v-show="compShow == '01'"
          ref="C01"
          :input-data="inputData"
          input-type="I"
        />
        <!-- 제휴 카드 -->
        <C02
          v-show="compShow == '02'"
          ref="C02"
          :input-data="inputData"
          input-type="I"
        />
        <!-- 스페셜 패키지 -->
        <C03
          v-show="compShow == '03'"
          ref="C03"
          :input-data="inputData"
          input-type="I"
        />
        <!-- 정기권 제휴 혜택, 드림투어 -->
        <C04
          v-show="compShow == '04'|| compShow == '05' "
          ref="C04"
          :input-data="inputData"
          input-type="I"
        />
        <!-- 체험프로그램 -->
        <C06
          v-show="compShow == '06'"
          ref="C06"
          :input-data="inputData"
          input-type="I"
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
import C01 from './components/PGE_AAD_00012_C01.vue' // 할인 정보
import C02 from './components/PGE_AAD_00012_C02.vue' // 제휴 카드
import C03 from './components/PGE_AAD_00012_C03.vue' // 스페셜 패키지
import C04 from './components/PGE_AAD_00012_C04.vue' // 정기권 제휴 혜택, 드림투어
import C06 from './components/PGE_AAD_00012_C06.vue' // 체험프로그램

export default {
  name: 'PGE_AAD_00012', // eslint-disable-line vue/name-property-casing
  components: {
    C01,
    C02,
    C03,
    C04,
    C06,
  },
  data() {
    return {

      // 공통코드
      codeKeyList: ['COD_RS_PARK_KIND_SIMPLE', 'COD_IA_BENEFIT_CLASS'],
      codes: { COD_RS_PARK_KIND_SIMPLE: [], COD_IA_BENEFIT_CLASS: [] },

      useYn: [{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],
      COD_IA_BENEFIT_CLASS_CB: [],

      // 입력데이터
      inputData: {
        publctId: '',
        parkKindCd: '',
        bnftClassCd: '',
        bnftClassCdOld: '',
        bnftKindCd: '',
        appExposrPeriodDtm: [`${utils.now('YYYY-MM-DD')} 09:00`, ''],
        appExposrPeriodStartDtm: '',
        appExposrPeriodEndDtm: '',
        periodDispInfoDate: [utils.now('YYYY-MM-DD'), ''],
        periodDispInfoDateOld: [utils.now('YYYY-MM-DD'), ''],
        periodDispInfoStartDate: '',
        periodDispInfoEndDate: '',
        exposrYn: 'Y',
        exposrOrder: '',
        packgeKindCd: '',
        targetDescrt: '',
        publctSubject: '',
        publctDescrt: '',
        thumbImagUrl: '',
        thumbImagAltDesc: '',
        publctSmallSubject: '',
      },

      componentsShow: '', // 컴포넌트 조작을 위해사용
      appExposrPeriodDtmRule: [
        () => {
          const tempVal = this.inputData.appExposrPeriodDtm
          return (!!tempVal && Array.isArray(tempVal) && tempVal.length === 2 && !!tempVal[0] && !!tempVal[1]) || this.$t('MSG_ALT_RULES_NOT_NULL')
        },
      ],
      periodDispInfoDateRule: [
        () => {
          const tempVal = this.inputData.periodDispInfoDate
          return (!!tempVal && Array.isArray(tempVal) && tempVal.length > 0 && !!tempVal[0]) || this.$t('MSG_ALT_RULES_NOT_NULL')
        },
      ],
    }
  },
  computed: {
    compShow() {
      return this.componentsShow
    },
    chgStyle() {
      if (this.compShow === '02') {
        return 'width:100%; height:auto;'
      }
      return 'width:50%; height:auto;'
    },
  },

  watch: {
  },
  created() {
    const params = utils.getParameter(this, 'params')
    if (!utils.isEmpty(params.publctId)) {
      this.publctId = params.publctId
      this.onSearch()
    }

    // 공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {
      this.COD_IA_BENEFIT_CLASS_CB = this.codes.COD_IA_BENEFIT_CLASS.slice(0, 3)
    }).catch(() => {})
  },
  mounted() { },
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

      http.request(this.$options.name, 'DTS_AAD_00026', {
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
      this.componentsShow = this.inputData.bnftClassCd
      this.inputData.bnftClassCdOld = this.inputData.bnftClassCd
      this.inputData.exposrOrder = utils.toCharNum(this.inputData.exposrOrder)
      this.inputData.appExposrPeriodDtm = [
        utils.toStringByFormat(this.inputData.appExposrPeriodStartDtm.substring(0, 12), 'YYYY-MM-DD HH:mm'),
        utils.toStringByFormat(this.inputData.appExposrPeriodEndDtm.substring(0, 12), 'YYYY-MM-DD HH:mm'),
      ]
      this.inputData.appExposrPeriodDtmOld = this.inputData.appExposrPeriodDtm // 수정시 날짜 비교를 위해
      if (!utils.isEmpty(this.inputData.periodDispInfoStartDate)) {
        this.inputData.periodDispInfoDate = [
          utils.dateformatToClient(this.inputData.periodDispInfoStartDate, 'S'),
          utils.dateformatToClient(this.inputData.periodDispInfoEndDate, 'S'),
        ]
        this.inputData.periodDispInfoDateOld = this.inputData.periodDispInfoDate // 수정시 날짜 비교를 위해
      } else {
        this.inputData.periodDispInfoDateOld = []
      }
      const contentDesc = this.inputData.publctDescrt
      const { compShow } = this
      if (compShow === '01') {
        this.$refs.C01.$refs.C01Editor.setHtml(contentDesc)
      } else if (compShow === '02') {
        this.$refs.C02.$refs.C02Editor.setHtml(contentDesc)
      } else if (compShow === '03') {
        if (!Array.isArray(this.inputData.packgeKindCd)) {
          this.$refs.C03.packgeKindCdList = this.inputData.packgeKindCd.split(',')
        }
        this.$refs.C03.$refs.C03Editor.setHtml(contentDesc)
      } else if (compShow === '04' || compShow === '05') {
        this.$refs.C04.$refs.C04Editor.setHtml(contentDesc)
      } else if (compShow === '06') {
        this.$refs.C06.$refs.C06Editor.setHtml(contentDesc)
      }
    },


    // 파람데이터 만들기
    getParam() {
      const inputParam = this.inputData
      const { compShow } = this
      if (compShow === '01') {
        inputParam.publctDescrt = this.$refs.C01.$refs.C01Editor.getHtml()
      } else if (compShow === '02') {
        inputParam.publctDescrt = this.$refs.C02.$refs.C02Editor.getHtml()
        inputParam.periodDispInfoStartDate = ''
        inputParam.periodDispInfoEndDate = ''
      } else if (compShow === '03') {
        inputParam.packgeKindCd = this.$refs.C03.packgeKindCdList.join(',')
        inputParam.publctDescrt = this.$refs.C03.$refs.C03Editor.getHtml()
      } else if (compShow === '04' || compShow === '05') {
        inputParam.publctDescrt = this.$refs.C04.$refs.C04Editor.getHtml()
      } else if (compShow === '06') {
        inputParam.publctDescrt = this.$refs.C06.$refs.C06Editor.getHtml()
      }
      return inputParam
    },

    /** *************************************
     * 저장
     *************************************** */
    onClickSave() {
      if (this.isValidation()) {
        utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
          if (this.publctId) {
            // 수정시..
            http.request(this.$options.name, 'DTS_AAD_00029', {
              data: this.getParam(),
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
              this.onClickList() // 목록으로 이동..
            })
          } else {
            // 등록시..
            http.request(this.$options.name, 'DTS_AAD_00028', {
              data: this.getParam(),
            }).then(() => {
              utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
              this.onClickList() // 목록으로 이동..
            })
          }
        })
      }
    },

    // 유효성 체크
    isValidation() {
      // 게시구분
      if (!this.$rules.validate(this.$refs.parkKindCd)) {
        return false
      }

      if (utils.isEmpty(this.inputData.parkKindCd)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PUBLCT_KIND')) // 게시 구분은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }

      // 혜택분류
      if (this.inputData.parkKindCd === '02') {
        if (!this.$rules.validate(this.$refs.bnftClassCdCb)) {
          return false
        }
      } else if (!this.$rules.validate(this.$refs.bnftClassCd)) {
        return false
      }

      // 노출 여부
      if (utils.isEmpty(this.inputData.exposrYn)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXPOSR_YN')) // 노출여부은(는) 필수 항목입니다.
        utils.messageBox('warning', msg)
        return false
      }

      // 노출 순서
      if (!this.$rules.validate(this.$refs.exposrOrder)) {
        return false
      }

      // 앱 노출 기간 유효성체크
      if (!this.isValidationExposrPeriod()) {
        return false
      }

      // 기간 표시 정보(제휴카드가 아닐시만 유효성 체크)
      if (this.compShow !== '02') {
        if (!this.isValidationPeriodDispInfo()) {
          return false
        }
      }

      // 아래 컴포넌트의 유효성 체크
      if (!this.isValidationComp()) {
        return false
      }


      return true
    },

    // 컴포넌트의 유효성 체크
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
        if (!this.$refs.C04.isConpValidation()) reVal = false
        break
      case '06':
        if (!this.$refs.C06.isConpValidation()) reVal = false
        break
      default:
        break
      }
      return reVal
    },

    // 앱 노출 기간 유효성 체크
    isValidationExposrPeriod() {
      /* eslint-disable max-len */
      if (!this.$refs.appExposrPeriodDtm.isValid()) {
        return false
      }
      if (utils.isEmpty(this.publctId) && moment(this.inputData.appExposrPeriodDtm[0]).isBefore(utils.now())) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD')) // 앱 노출기간의 과거일자는 선택할 수 없습니다.
        utils.messageBox('warning', msg)
        return false
      }
      if (!utils.isEmpty(this.publctId)
            && utils.getDayOffset(this.inputData.appExposrPeriodDtmOld[0], this.inputData.appExposrPeriodDtm[0]) !== 0
            && moment(this.inputData.appExposrPeriodDtm[0]).isBefore(utils.now())
      ) {
        const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD')) // 앱 노출기간의 과거일자는 선택할 수 없습니다.
        utils.messageBox('warning', msg)
        return false
      }
      if (!utils.isEmpty(this.publctId)
            && utils.getDayOffset(this.inputData.appExposrPeriodDtmOld[1], this.inputData.appExposrPeriodDtm[1]) !== 0
            && moment(this.inputData.appExposrPeriodDtm[1]).isBefore(utils.now())
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
      /* eslint-disable max-len */
      if (_.isEmpty(this.inputData.periodDispInfoDate[0])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PERIOD_DISP_INPO'))) // 기간 표시 정보은(는) 필수 항목입니다.
        return false
      }

      // if (utils.isEmpty(this.publctId) && moment(this.inputData.periodDispInfoDate[0]).isBefore(utils.now())) {
      //   const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_PERIOD_DISP_INPO')) // 기간 표시 정보의 과거일자는 선택할 수 없습니다.
      //   utils.messageBox('warning', msg)
      //   return false
      // }
      // if (!utils.isEmpty(this.publctId)
      //         && utils.getDayOffset(this.inputData.periodDispInfoDateOld[0], this.inputData.periodDispInfoDate[0]) !== 0
      //         && moment(this.inputData.periodDispInfoDate[0]).isBefore(utils.now())
      // ) {
      //   const msg = utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_PERIOD_DISP_INPO')) // 기간 표시 정보의 과거일자는 선택할 수 없습니다.
      //   utils.messageBox('warning', msg)
      //   return false
      // }
      // if(!_.isEmpty(this.inputData.periodDispInfoDate[1])){
      //   if(!utils.isEmpty(this.publctId)){
      //     if(_.isEmpty(this.inputData.periodDispInfoDateOld[1])){
      //       if(moment(this.inputData.periodDispInfoDate[1]).isBefore(utils.now())){
      //         utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_PERIOD_DISP_INPO'))) // 기간 표시 정보의 과거일자는 선택할 수 없습니다.
      //         return false
      //       }
      //     }else{
      //       if(utils.getDayOffset(this.inputData.periodDispInfoDateOld[1], this.inputData.periodDispInfoDate[1]) !== 0
      //         && moment(this.inputData.periodDispInfoDate[1]).isBefore(utils.now())) {
      //           utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NO_PAST_DT_MSG'), this.$t('MSG_TXT_PERIOD_DISP_INPO'))) // 기간 표시 정보의 과거일자는 선택할 수 없습니다.
      //           return false
      //         }
      //     }
      //   }
      // }
      /* eslint-enable max-len */
      return true
    },

    // 게시구분 변경 시 혜택분류코드에 속하지 않으면 혜택분류 코드값 초기화
    inputParkKindCd(val) {
      if (val === '02') {
        let temp = false
        this.COD_IA_BENEFIT_CLASS_CB.forEach(el => {
          if (this.inputData.bnftClassCd === el.value) {
            temp = true
          }
        })
        if (!temp) {
          this.inputData.bnftClassCd = ''
          this.onClickReset()
        }
      }
    },

    // 혜택분류 변경 시 데이터 초기화 질문
    inputBnftClassCd(val) {
      // 최초 설정 시 변경 메시지 안뜨도록
      if (this.inputData.bnftClassCdOld === '') {
        this.componentsShow = this.inputData.bnftClassCd
        this.inputData.bnftClassCdOld = val
        return
      }

      if (this.inputData.bnftClassCd !== this.inputData.bnftClassCdOld) {
        // 혜택 분류 변경 시 혜택 상세 정보가 초기화 됩니다. 변경하시겠습니까?
        // messagebox(type, message, subMessage, handlerPositive, handlerNegative, customButtons);
        utils.messageBox('confirm',
          utils.strFormat(this.$t('MSG_ALT_CHK_CHG_INIT'), this.$t('MSG_TXT_BNTF_CLASS'), this.$t('MSG_TXT_BNTF_DETAIL_INFO')),
          null,
          () => {
            // 확인 시 혜택상세정보 초기화
            this.onClickReset()
            this.componentsShow = this.inputData.bnftClassCd
            this.inputData.bnftClassCdOld = val
          },
          () => {
            // 취소 시 이전 값으로 돌림.
            this.inputData.bnftClassCd = this.inputData.bnftClassCdOld
          }, null)
      }
    },
    // 혜택상세정보 초기화
    onClickReset() {
      this.inputData.bnftKindCd = ''
      this.inputData.packgeKindCd = ''
      this.inputData.targetDescrt = ''
      this.inputData.publctSubject = ''
      this.inputData.publctDescrt = ''
      this.inputData.thumbImagUrl = ''
      this.inputData.publctSmallSubject = ''
      if (!_.isEmpty(this.$refs.C01.$refs.thumbImagUrl)) {
        this.$refs.C01.$refs.thumbImagUrl.onClickDelete()
      }
      if (!_.isEmpty(this.$refs.C01.$refs.thumbImagUrl1)) {
        this.$refs.C01.$refs.thumbImagUrl1.onClickDelete()
      }
      if (!_.isEmpty(this.$refs.C01.$refs.thumbImagUrl2)) {
        this.$refs.C01.$refs.thumbImagUrl2.onClickDelete()
      }
      this.$refs.C02.$refs.thumbImagUrl.onClickDelete()
      if (!_.isEmpty(this.$refs.C03.$refs.thumbImagUrl)) {
        this.$refs.C03.$refs.thumbImagUrl.onClickDelete()
      }
      if (!_.isEmpty(this.$refs.C03.$refs.thumbImagUrl1)) {
        this.$refs.C03.$refs.thumbImagUrl1.onClickDelete()
      }
      if (!_.isEmpty(this.$refs.C03.$refs.thumbImagUrl2)) {
        this.$refs.C03.$refs.thumbImagUrl2.onClickDelete()
      }
      this.$refs.C04.$refs.thumbImagUrl.onClickDelete()
      this.$refs.C06.$refs.thumbImagUrl.onClickDelete()

      const { compShow } = this
      if (compShow === '01') {
        this.$refs.C01.$refs.C01Editor.setHtml('')
      } else if (compShow === '02') {
        this.$refs.C02.$refs.C02Editor.setHtml('')
      } else if (compShow === '03') {
        this.$refs.C03.packgeKindCdList = []
        this.$refs.C03.$refs.C03Editor.setHtml('')
      } else if (compShow === '04' || compShow === '05') {
        this.$refs.C04.$refs.C04Editor.setHtml('')
      } else if (compShow === '06') {
        this.$refs.C06.$refs.C06Editor.setHtml('')
      }

      this.inputData.thumbImagAltDesc = ''
    },

    // 기간표시정보 값 셋팅
    periodDispInfoDateInput(val) {
      this.inputData.periodDispInfoStartDate = utils.dateformatToServer(val[0], 'S')
      this.inputData.periodDispInfoEndDate = utils.dateformatToServer(val[1], 'S')
    },
    // 앱 노출 기간 입력 시 값 셋팅
    inputAppExposrPeriodDtm(val) {
      this.inputData.appExposrPeriodStartDtm = utils.dateformatToServer(val[0].concat('00'))
      if (val.at(1) && val.at(1).slice(-5) === '00:00') {
        this.inputData.appExposrPeriodEndDtm = utils.dateformatToServer(val.at(1).substring(0, 11).concat('23:59:59'))
      } else {
        this.inputData.appExposrPeriodEndDtm = utils.dateformatToServer(val[1].concat('59'))
      }
    },

    // 할인혜택 목록으로 이동
    onClickList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAD_00011', { params })
    },

  },
}
</script>
<style scoped>
</style>
