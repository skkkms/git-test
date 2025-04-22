<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S:: 이벤트 정보 -->
      <div class="comm_title_wrap">
        <h4>
          {{ $t('MSG_TXT_EVENT_INFO') }} <!-- 이벤트 정보 -->
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- 게시 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          label-align="right"
          style="width: 100%; height: auto;"
          required
        >
          <ur-radio-wrapper
            v-model="gameData.eventPublctKindCd"
            :items="codes.COD_IA_EVENT_PUBLCT_KIND"
            small
          >
            <template v-for="item in codes.COD_IA_EVENT_PUBLCT_KIND">
              <ur-radio
                :key="item.value"
                :value="item.value"
                small
              >
                {{ item.text }}
              </ur-radio>
            </template>
          </ur-radio-wrapper>
        </ur-form-item>
        <!-- 이벤트 명 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
          required
        >
          <ur-text-field
            v-model="gameData.eventName"
            style="width: 100%;"
            maxlength="150"
          />
        </ur-form-item>
        <!-- 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          style="width: 50%; height: auto;"
          required
        >
          <ur-radio-wrapper
            v-model="gameData.exposrYn"
            :items="codes.COD_IA_YN"
            small
          >
            <template v-for="item in codes.COD_IA_YN">
              <ur-radio
                :key="item.value"
                :value="item.value"
                sm
              >
                {{ item.text }}
              </ur-radio>
            </template>
          </ur-radio-wrapper>
        </ur-form-item>
        <!-- 이벤트 기간 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_PERIOD')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          required
        >
          <ur-date-time-range-picker
            v-model="eventPeriods"
            input-type="YYYY-MM-DD HH:mm"
            model-type="YYYYMMDDHHmm"
            :confirm-label="$t('MSG_BTN_SELT')"
            :clear-label="$t('MSG_BTN_INTL')"
            :min-date="minEventStartDate"
            @input="onInputEventPeriods"
          />
        </ur-form-item>
        <!-- 게임 코드 -->
        <ur-form-item
          :label="$t('MSG_TXT_GAME_CD')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
          required
        >
          <ur-text-field
            v-model="gameData.gameCdValue"
            style="width: 100%;"
            maxlength="20"
            @keyup="gameData.gameCdValue = adjustGameCdValue(gameData.gameCdValue)"
          />
        </ur-form-item>
        <!-- 연결 URL -->
        <ur-form-item
          :label="$t('MSG_TXT_CONN_URL')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
          required
        >
          <ur-text-field
            v-model="gameData.connUrl"
            style="width: 100%;"
            maxlength="150"
          />
        </ur-form-item>
        <!-- 썸네일 이미지 -->
        <ur-form-item
          :label="$t('MSG_TXT_THUMBNAIL_IMAG')"
          required
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            v-model="gameData.thumbnailImagUrl"
            upload-target="EVT005"
            accepts="jpg,png,gif"
            pixels="198*198"
            preview-mode="BELOW"
            show-guidance
            :page-id="this.$options.name"
          >
            <template>
              <div class="col_img_wrap">
                <div class="col_item_img">
                  <ur-text-field
                    v-model="gameData.thumbnailImagAltDesc"
                    style="width: 100%; height: auto;"
                    maxlength="100"
                    :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                  />
                </div>
              </div>
            </template>
          </cmp-single-file-uploader>
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 이벤트 정보 -->

      <!-- S:: 조건 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          {{ $t('MSG_TXT_COND_INFO') }} <!-- 조건 정보 -->
        </h4>
        <span class="subscript_txt">
          {{ $t('MSG_TXT_PARTCP_COND_GUID') }} <!-- * 참여 조건 미 설정 시, 전체 대상으로 설정됩니다. -->
        </span>
      </div>
      <ur-form-box>
        <!-- 참여 조건 -->
        <ur-form-item
          :label="$t('MSG_TXT_PARTCP_COND')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="eventPartcpCondListDesc"
            readonly
            style="width: 90%;"
          />
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            style="margin-left: 10px"
            @click="onClickPartcpCond"
          />
        </ur-form-item>
        <!-- 노출 조건 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_COND')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="gameData.exposrCondCd"
            :items="codes.COD_IA_EVENT_EXPOSR_COND"
            small
            @input="onInputExposrCond"
          >
            <template v-for="item in codes.COD_IA_EVENT_EXPOSR_COND">
              <ur-radio
                :key="item.value"
                :value="item.value"
                small
              >
                {{ item.text }}
              </ur-radio>
            </template>
          </ur-radio-wrapper>
        </ur-form-item>
        <!-- 소진 솜 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXHAUST_SOM')"
          required
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="gameData.subtrctPointAmt"
            style="width: 150px;"
            mask="number"
            maxlength="5"
            @keyup="gameData.subtrctPointAmt = parseInt(gameData.subtrctPointAmt, 10)"
            @blur="onBlurSubtrctPointAmt"
          />
          <span style="margin-left: 5px">
            {{ $t('MSG_TXT_EXHAUST_SOM_GUIDANCE_1') }} <!-- * 소진 솜은 100단위로 넣어주세요. -->
          </span>
        </ur-form-item>
        <!-- 참여 기회 -->
        <ur-form-item
          :label="$t('MSG_TXT_PARTCP_OPPR')"
          required
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="gameData.partcpPeriodCd"
            style="width: 100px;"
            :items="codes.COD_IA_EVENT_PARTCP_PERIOD"
            :placeholder="$t('MSG_TXT_SEL')"
          />
          <ur-text-field
            v-model="gameData.partcpAvailCnt"
            style="width: 150px; margin-left: 10px;"
            mask="number"
            maxlength="4"
            @keyup="gameData.partcpAvailCnt = parseInt(gameData.partcpAvailCnt, 10)"
          /> <span style="margin-left: 5px">{{ $t('MSG_TXT_NUMBER_OF_TIMES') }}</span> <!-- 회 -->
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 조건 정보 -->

      <!-- S:: 보상 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          {{ $t('MSG_TXT_REWRD_INFO') }} <!-- 보상 정보 -->
        </h4>
      </div>
      <ur-form-box>
        <!-- 지급 쿠폰 -->
        <ur-form-item
          :label="$t('MSG_TXT_PAYMNT_COUPON')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          required
        >
          <ur-text-field
            v-model="gameData.couponName"
            readonly
            style="width: 90%"
          />
          <ur-icon-button
            icon="search"
            icon-type="line"
            color="primary"
            style="margin-left: 10px"
            @click="onClickCouponSearch"
          />
        </ur-form-item>
        <!-- 쿠폰 수량 -->
        <ur-form-item
          :label="$t('MSG_TXT_COUPON_QTY')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          required
        >
          <ur-dropdown
            v-model="gameData.rewrdQtyLimitYn"
            :items="codes.COD_IA_QTY_LIMIT_YN"
            :placeholder="$t('MSG_TXT_SEL')"
            style="width: 100px"
          />
          <ur-text-field
            v-model="gameData.rewrdQty"
            :disabled="gameData.rewrdQtyLimitYn === 'N'"
            style="width: 100px; margin-left: 10px;"
            mask="number"
            maxlength="4"
            @keyup="gameData.rewrdQty = parseInt(gameData.rewrdQty, 10)"
          /> <span style="margin-left: 5px">{{ $t('MSG_TXT_NUMBER_OF_COUNT') }}</span> <!-- 개 -->
        </ur-form-item>
        <!-- 보상 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_REWRD_KIND')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          required
        >
          <ur-radio-wrapper
            v-model="gameData.rewrdBaseCd"
            :items="codes.COD_IA_GAME_REWARD_BASE"
            small
            @input="onInputRewrdBaseCd"
          >
            <template v-for="item in codes.COD_IA_GAME_REWARD_BASE">
              <ur-radio
                :key="item.value"
                :value="item.value"
                small
              >
                {{ item.text }}
              </ur-radio>
            </template>
          </ur-radio-wrapper>
        </ur-form-item>
        <!-- 보상 조건 -->
        <ur-form-item
          :label="$t('MSG_TXT_REWRD_COND')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          required
        >
          <ur-text-field
            ref="rewrdCond"
            v-model="gameData.rewrdBaseValue"
            style="width: 210px;"
            mask="number"
            :maxlength="gameData.rewrdBaseCd === 'RAT' ? '3' : '10'"
            @keyup="gameData.rewrdBaseValue = parseInt(gameData.rewrdBaseValue, 10)"
          />
          <span
            v-if="gameData.rewrdBaseCd === 'RNK'"
            style="margin-left: 5px"
          >{{ $t('MSG_TXT_UP_TO_RANK') }}</span> <!-- 등 까지 -->
          <span
            v-else-if="gameData.rewrdBaseCd === 'SCR'"
            style="margin-left: 5px"
          >{{ $t('MSG_TXT_POINTS_OR_MORE') }}</span> <!-- 점 이상 -->
          <span
            v-else-if="gameData.rewrdBaseCd === 'RAT'"
            style="margin-left: 5px"
          >{{ $t('MSG_TXT_UP_TO_PERCENT') }}</span> <!-- % 까지 -->
        </ur-form-item>
        <!-- 반복 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_RPT_YN')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          required
        >
          <ur-radio-wrapper
            v-model="gameData.rptYn"
            :items="codes.COD_IA_YN"
            small
            @input="onInputRptYn"
          >
            <template v-for="item in codes.COD_IA_YN">
              <ur-radio
                :key="item.value"
                :value="item.value"
                small
              >
                {{ item.text }}
              </ur-radio>
            </template>
          </ur-radio-wrapper>
        </ur-form-item>
        <!-- 결산 일시 -->
        <ur-form-item
          :label="$t('MSG_TXT_STLMN_DTM')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          required
        >
          <ur-dropdown
            v-if="gameData.rptYn === 'Y'"
            v-model="gameData.closePeriodCd"
            :items="codes.COD_IA_EVENT_CLOSE_PERIOD"
            :placeholder="$t('MSG_TXT_SEL')"
            style="width: 100px;"
            @input="onInputClosePeriodCd"
          />
          <ur-dropdown
            v-if="gameData.closePeriodCd === 'WEK'"
            v-model="gameData.closeDowCd"
            :items="codes.COD_IA_DOW_ABBREV"
            :placeholder="$t('MSG_TXT_SEL')"
            style="width: 100px; margin-left: 10px;"
          />
          <ur-text-field
            v-if="gameData.closePeriodCd === 'MNT'"
            v-model="gameData.closeDay"
            mask="number"
            maxlength="2"
            style="width: 100px; margin-left: 10px;"
            @keyup="gameData.closeDay = adjustDay(gameData.closeDay)"
          />
          <ur-text-field
            v-if="gameData.rptYn === 'Y' && gameData.closePeriodCd"
            v-model="gameData.closeHm"
            mask="##:##"
            style="width: 100px; margin-left: 10px;"
            @keyup="gameData.closeHm = adjustTime(gameData.closeHm)"
          />
          <ur-date-time-picker
            v-if="gameData.rptYn === 'N'"
            v-model="gameData.closeDtm"
            input-type="YYYY-MM-DD HH:mm"
            model-type="YYYYMMDDHHmm"
            style="width: 210px !important;"
            :confirm-label="$t('MSG_BTN_SELT')"
            :today-label="$t('MSG_BTN_TODAY')"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 보상 정보 -->

      <div class="bt1 mt10" />
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
              v-permission:create="this.$options.name"
              color="violet"
              @click="onClickSave"
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
import CommonUtils from '~aa/js/common-utils'
import GameMixin from '~aa/pages/G/mixins/GameMixin'
import CouponMixin from '~aa/pages/X/mixins/CouponMixin'

export default {
  name: 'PGE_AAG_00042', // eslint-disable-line vue/name-property-casing
  mixins: [GameMixin, CouponMixin],
  data() {
    return {
      codeKeys: [
        'COD_IA_EVENT_PUBLCT_KIND', // 이벤트게시구분
        'COD_IA_EVENT_EXPOSR_COND', // 이벤트노출조건
        'COD_IA_EVENT_PARTCP_PERIOD', // 이벤트참여주기
        'COD_IA_QTY_LIMIT_YN', // 수량제한여부
        'COD_IA_GAME_REWARD_BASE', // 게임보상기준
        'COD_IA_EVENT_CLOSE_PERIOD', // 이벤트마감주기
        'COD_IA_DOW_ABBREV', // 요일(약어)
      ],
      codes: {
        COD_IA_EVENT_PUBLCT_KIND: [], // 이벤트게시구분
        COD_IA_EVENT_EXPOSR_COND: [], // 이벤트노출조건
        COD_IA_EVENT_PARTCP_PERIOD: [], // 이벤트참여주기
        COD_IA_QTY_LIMIT_YN: [], // 수량제한여부
        COD_IA_GAME_REWARD_BASE: [], // 게임보상기준
        COD_IA_EVENT_CLOSE_PERIOD: [], // 이벤트마감주기
        COD_IA_DOW_ABBREV: [], // 요일(약어)
        COD_IA_YN: [{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],
      },
      params: {},
      gameData: {
        // Single
        eventId: null, // 이벤트ID
        eventPublctKindCd: null, // 이벤트게시구분코드
        eventName: null, // 이벤트명
        exposrYn: null, // 노출여부
        eventStartDtm: null, // 이벤트시작일시
        eventEndDtm: null, // 이벤트종료일시
        gameCdValue: null, // 게임코드값
        connUrl: null, // 연결URL
        thumbnailImagUrl: null, // 썸네일이미지URL
        exposrCondCd: '01', // 노출조건코드(default: 전체('01'))
        subtrctPointAmt: null, // 차감포인트금액
        partcpPeriodCd: 'ALL', // 참여주기코드(default: 전체('ALL'))
        partcpAvailCnt: null, // 참여가능건수
        couponMasterId: null, // 쿠폰마스터ID
        couponMasterNo: null, // 쿠폰마스터번호
        couponIssueSeq: null, // 쿠폰발행순번
        couponName: null, // 쿠폰명
        rewrdQtyLimitYn: 'Y', // 보상수량제한여부(default: 제한('Y'))
        rewrdQty: null, // 보상수량
        rewrdBaseCd: 'RNK', // 보상기준코드(default: 등수('RNK'))
        rewrdBaseValue: null, // 보상기준값
        rptYn: 'Y', // 반복여부(default: 'Y')
        closePeriodCd: null, // 마감주기코드
        closeDtm: null, // 마감일시
        closeDowCd: null, // 마감요일코드
        closeDay: null, // 마감일
        closeHm: null, // 마감시분
        // Multi
        eventPartcpCondList: { // 참여조건목록
          insert: [],
          update: [],
          delete: [],
        },
      },
      eventPeriods: [], // 이벤트기간
      minEventStartDate: null,
      eventPartcpCondList: [], // 참여조건목록
      eventPartcpCondListDesc: null, // 참여조건목록설명
    }
  },
  watch: {
    'gameData.rewrdQtyLimitYn': {
      handler(value) {
        if (value === 'N') {
          this.gameData.rewrdQty = null
        }
      },
    },
    'gameData.couponMasterId': {
      immediate: true,
      async handler(value) {
        if (value) {
          const coupon = await this.selectCoupon({
            masterId: this.gameData.couponMasterId,
            couponMasterNo: this.gameData.couponMasterNo,
            issueSeq: this.gameData.couponIssueSeq,
          })
          const validPeriodStartDate = coupon ? coupon.validPeriodStartDate : null
          const validPeriodEndDate = coupon ? coupon.validPeriodEndDate : null
          this.gameData.validPeriodStartDate = validPeriodStartDate
          this.gameData.validPeriodEndDate = validPeriodEndDate
        }
      },
    },
    eventPartcpCondList: {
      handler(list) {
        if (list.length === 0) {
          this.eventPartcpCondListDesc = null
        } else if (list.length === 1) {
          const { condName } = list.at(0)
          this.eventPartcpCondListDesc = condName
        } else {
          const { condName } = list.at(0)
          this.eventPartcpCondListDesc = utils.strFormat(this.$t('MSG_TXT_EXID_CNT'), condName, list.length - 1)
        }
      },
    },
  },
  created() {
    this.initializeCodes()
    this.initializeParams()
  },
  methods: {
    initializeCodes() {
      http.mergeCodeList(this.$options.name, this.codeKeys, this.codes).then(() => {
        if (!_.isEmpty(this.codes.COD_IA_EVENT_PUBLCT_KIND)) {
          const head = this.codes.COD_IA_EVENT_PUBLCT_KIND.filter(item => item.value === 'CM')
          const tail = this.codes.COD_IA_EVENT_PUBLCT_KIND.filter(item => item.value !== 'CM')
          this.codes.COD_IA_EVENT_PUBLCT_KIND = head.concat(tail)
        }
      })
    },
    initializeParams() {
      const params = utils.getParameter(this, 'params')
      if (utils.isEmpty(params.eventId)) {
        // INSERT
        this.gameData.eventStartDtm = utils.now('YYYYMMDD0000')
        this.eventPeriods = [this.gameData.eventStartDtm, this.gameData.eventEndDtm]
        this.minEventStartDate = utils.now('YYYY-MM-DD')
      } else {
        // UPDATE
        this.gameData.eventId = params.eventId
        this.selectGame()
        this.selectEventPartcpCondList(this.gameData.eventId)
      }
    },
    selectGame() {
      http.request(this.$options.name, 'DTS_AAG_00043', {
        path: {
          'event-id': this.gameData.eventId,
        },
      }).then(res => {
        this.gameData = res.data
        const eventStartDtm = moment(this.gameData.eventStartDtm, 'YYYYMMDDHHmmss').format('YYYYMMDDHHmm')
        const eventEndDtm = moment(this.gameData.eventEndDtm, 'YYYYMMDDHHmmss').format('YYYYMMDDHHmm')
        this.eventPeriods = [eventStartDtm, eventEndDtm]

        this.minEventStartDate = CommonUtils.getMinDateWithToday(this.gameData.eventStartDtm, 'YYYYMMDDHHmmss')

        const { closeDtm } = res.data
        if (closeDtm) {
          this.gameData.closeDtm = moment(closeDtm, 'YYYYMMDDHHmmss').format('YYYYMMDDHHmm')
        }
      })
    },
    selectEventPartcpCondList(eventId) {
      http.request(this.$options.name, 'DTS_AAG_00006', {
        path: {
          'event-id': eventId,
        },
      }).then(res => {
        this.eventPartcpCondList = res.data
      })
    },
    onInputEventPeriods(value) {
      // 종료일시의 시분(HHmm)이 0000일 경우 2359로 대체한다.
      if (value.at(1) && value.at(1).slice(-4) === '0000') {
        this.eventPeriods = [value.at(0), value.at(1).substring(0, 8).concat('2359')]
        return // [this.eventPeriods]값 변경으로 [onInputEventPeriods]가 다시 호출되므로 현재 호출은 return한다.
      }
      this.gameData.eventStartDtm = value.at(0) ? value.at(0).concat('00') : null
      this.gameData.eventEndDtm = value.at(1) ? value.at(1).concat('59') : null
    },
    onClickPartcpCond() {
      utils.openLayerPopup('PGE_AAG_00015', this.onClosePartcpCondPopup, {
        pageInitialData: {
          mode: utils.isEmpty(this.eventId) ? 'insert' : 'update',
          data: this.eventPartcpCondList,
        },
        size: 'lg',
      })
    },
    onClosePartcpCondPopup(returnData = null) {
      if (!utils.isEmpty(returnData)) {
        this.eventPartcpCondList = returnData.list

        if (utils.isEmpty(this.eventId)) {
          // INSERT
          this.gameData.eventPartcpCondList = {
            insert: returnData.list,
          }
        } else {
          // UPDATE
          // - insert : no comment
          // - update : 동일한 Key(condSeq)를 기준으로 delete 후 insert
          // - delete : 동일한 Key(condSeq)를 기준으로 update 목록에서 delete 후 insert
          this.gameData.eventPartcpCondList.insert = returnData.insert

          returnData.update.forEach(source => {
            const index = this.findDupIndexFromPartcpCondUpdateList(source)
            this.removeFromPartcpCondUpdateList(index)
            this.gameData.eventPartcpCondList.update.push(source)
          })

          returnData.delete.forEach(source => {
            const index = this.findDupIndexFromPartcpCondUpdateList(source)
            this.removeFromPartcpCondUpdateList(index)
            this.gameData.eventPartcpCondList.delete.push(source)
          })
        }
      }
      this.onInputExposrCond(this.gameData.exposrCondCd, false)
    },
    findDupIndexFromPartcpCondUpdateList(source) {
      return this.gameData.eventPartcpCondList.update
        .findIndex(target => target.condSeq === source.condSeq)
    },
    removeFromPartcpCondUpdateList(index) {
      if (index > -1) {
        this.gameData.eventPartcpCondList.update.splice(index, 1)
      }
    },
    onBlurSubtrctPointAmt() {
      const { subtrctPointAmt } = this.gameData
      if (subtrctPointAmt > 0 && subtrctPointAmt < 100) {
        this.gameData.subtrctPointAmt = null
      } else if (subtrctPointAmt % 100) {
        this.gameData.subtrctPointAmt = Math.floor(subtrctPointAmt / 100) * 100
      }
    },
    onInputExposrCond(value, showMessageBox = true) {
      // [노출 조건]을 필터 대상('02')으로 설정한 경우 [참여 조건]에 필터('01') 포함여부를 확인한다.
      // [참여 조건]에 필터가 포함되어 있지 않을 경우 [노출 조건]을 전체('01')로 설정한다.
      const isNotExistsFilter = utils.isEmpty(this.eventPartcpCondList.filter(item => item.condKindCd === '01'))
      if (value === '02' && isNotExistsFilter) {
        if (showMessageBox) {
          utils.messageBox('warning', this.$t('MSG_ALT_SET_PARCP_COND')) // 참여 조건을 먼저 설정해주세요.
        }
        this.gameData.exposrCondCd = '01'
      }
    },
    onClickCouponSearch() {
      utils.openLayerPopup('PGE_AAX_00001', this.onCloseCouponPopup, { size: 'lg' })
    },
    onCloseCouponPopup(data = null) {
      if (data) {
        this.gameData.couponMasterId = data.masterId
        this.gameData.couponMasterNo = data.couponMasterNo
        this.gameData.couponIssueSeq = data.issueSeq
        this.gameData.couponName = data.couponName
      }
    },
    onInputRewrdBaseCd(value) {
      this.gameData.rewrdBaseValue = null
      switch (value) {
      case 'RAT': // 비율(%)('RAT')
        this.$refs.rewrdCond.maxlength = '3'
        break
      default:
        this.$refs.rewrdCond.maxlength = '10'
        break
      }
    },
    onInputRptYn(value) {
      if (value === 'Y') {
        this.gameData.closeDtm = null
      } else if (value === 'N') {
        this.gameData.closePeriodCd = null
        this.gameData.closeDowCd = null
        this.gameData.closeDay = null
        this.gameData.closeHm = null
      }
    },
    onInputClosePeriodCd(value) {
      if (value === 'DAY') {
        this.gameData.closeDowCd = null
        this.gameData.closeDay = null
      } else if (value === 'WEK') {
        this.gameData.closeDay = null
      } else if (value === 'MNT') {
        this.gameData.closeDowCd = null
      }
    },
    adjustGameCdValue(value) {
      return value ? value.replace(/[^a-zA-Z0-9]/g, '') : null
    },
    adjustDay(value) {
      if (value) {
        let day = Math.max(parseInt(value, 10), 1)
        day = Math.min(day, 31)
        return String(day)
      }
      return null
    },
    adjustTime(value) {
      if (value) {
        let intH = parseInt(value.padEnd(4, '0').slice(0, 2), 10)
        let intM = parseInt(value.padEnd(4, '0').slice(2, 4), 10)
        intH = Math.min(intH, 23)
        intM = Math.min(intM, 59)

        const hour = String(intH).padStart(2, '0')
        const minute = String(intM).padStart(2, '0')
        return hour.concat(minute).slice(0, value.length)
      }
      return null
    },
    onClickList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAG_00041', { params })
    },
    onClickSave() {
      if (this.isValid()) {
        let message = this.getCouponValidPeriodMsg() // 쿠폰유효기간 메시지
        message = (message) ? `${message}\n\n${this.$t('MSG_ALT_WANT_SAVE')}` : this.$t('MSG_ALT_WANT_SAVE') // 저장 하시겠습니까?
        const confirm = () => {
          utils.messageBox('confirm', message, null, () => {
            const { eventId } = this.gameData
            if (utils.isEmpty(eventId)) {
              this.insertGame()
            } else {
              this.updateGame()
            }
          })
        }

        if (this.gameData.connUrl.startsWith('http://')) {
          // HTTP로 등록시 보안상 이슈가 발생할 수 있으니, 확인 후 등록 바랍니다.
          utils.messageBox('warning', this.$t('MSG_TXT_IAA_HTTP_WARNING'), null, () => {
            confirm()
          })
        } else {
          confirm()
        }
      }
    },
    insertGame() {
      const { gameData } = this
      http.request(this.$options.name, 'DTS_AAG_00042', {
        data: gameData,
      }).then(res => {
        if (res.data > 0) {
          utils.messageBox(
            'success',
            this.$t('MSG_ALT_SAVE_DATA'), // 저장되었습니다.
            null,
            () => this.onClickList(),
          )
        }
      })
    },
    updateGame() {
      const { gameData } = this
      http.request(this.$options.name, 'DTS_AAG_00044', {
        data: gameData,
      }).then(res => {
        if (res.data > 0) {
          utils.messageBox(
            'success',
            this.$t('MSG_ALT_SAVE_DATA'), // 저장되었습니다.
            null,
            () => this.onClickList(),
          )
        }
      })
    },
    isValid() {
      return this.isValidEventInfo() // [이벤트 정보] 영역 확인
          && this.isValidCondInfo() // [조건 정보] 영역 확인
          && this.isValidRewrdInfo01() // [보상 정보] 영역(지급 쿠폰 ~ 보상 조건) 확인
          && this.isValidRewrdInfo02() // [보상 정보] 영역(반복 여부 ~ 결산 일시) 확인
    },
    isValidEventInfo() {
      // 이벤트 정보
      if (utils.isEmpty(this.gameData.eventPublctKindCd)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PUBLCT_KIND'))) // {게시 구분}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.gameData.eventName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EVENT_NAME'))) // {이벤트 명}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.gameData.exposrYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXPOSR_YN'))) // {노출 여부}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.gameData.eventStartDtm)
          || utils.isEmpty(this.gameData.eventEndDtm)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EVENT_PERIOD'))) // {이벤트 기간}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.gameData.gameCdValue)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_GAME_CD'))) // {게임 코드}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.gameData.connUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_CONN_URL'))) // {연결 URL}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.gameData.thumbnailImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_THUMBNAIL_IMAG'))) // {썸네일 이미지}은(는) 필수 항목입니다.
        return false
      }
      return true
    },
    isValidCondInfo() {
      // 조건 정보
      if (utils.isEmpty(this.gameData.subtrctPointAmt)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXHAUST_SOM'))) // {소진 솜}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.gameData.partcpPeriodCd)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PARTCP_OPPR'))) // {참여 기회}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.gameData.partcpAvailCnt)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PARTCP_OPPR'))) // {참여 기회}은(는) 필수 항목입니다.
        return false
      }
      return true
    },
    isValidRewrdInfo01() {
      // 보상 정보
      if (utils.isEmpty(this.gameData.couponMasterId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PAYMNT_COUPON'))) // {지급 쿠폰}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.gameData.rewrdQtyLimitYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_COUPON_QTY'))) // {쿠폰 수량}은(는) 필수 항목입니다.
        return false
      }
      if (this.gameData.rewrdQtyLimitYn === 'Y' && utils.isEmpty(this.gameData.rewrdQty)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_COUPON_QTY'))) // {쿠폰 수량}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.gameData.rewrdBaseCd)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_REWRD_KIND'))) // {보상 구분}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.gameData.rewrdBaseValue)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_REWRD_COND'))) // {보상 조건}은(는) 필수 항목입니다.
        return false
      }
      return true
    },
    isValidRewrdInfo02() {
      if (utils.isEmpty(this.gameData.rptYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_RPT_YN'))) // {반복 여부}은(는) 필수 항목입니다.
        return false
      }
      if (this.gameData.rptYn === 'Y' && utils.isEmpty(this.gameData.closePeriodCd)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_STLMN_DTM'))) // {결산 일시}은(는) 필수 항목입니다.
        return false
      }
      if (this.gameData.closePeriodCd === 'DAY') {
        if ((this.gameData.closeHm || '').length < 4) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_STLMN_DTM'))) // {결산 일시}은(는) 필수 항목입니다.
          return false
        }
      } else if (this.gameData.closePeriodCd === 'WEK') {
        if (utils.isEmpty(this.gameData.closeDowCd) || (this.gameData.closeHm || '').length < 4) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_STLMN_DTM'))) // {결산 일시}은(는) 필수 항목입니다.
          return false
        }
      } else if (this.gameData.closePeriodCd === 'MNT') {
        if (utils.isEmpty(this.gameData.closeDay) || (this.gameData.closeHm || '').length < 4) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_STLMN_DTM'))) // {결산 일시}은(는) 필수 항목입니다.
          return false
        }
      }
      return true
    },
  },
}
</script>
