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
        <!-- 이벤트 명 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
          required
        >
          <ur-text-field
            v-model="attendChkData.eventName"
            style="width: 100%;"
            maxlength="150"
          />
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
        <!-- 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          required
          label-align="right"
          style="width: 50%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="attendChkData.exposrYn"
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
      </ur-form-box>
      <!-- E:: 이벤트 정보 -->

      <!-- S:: 이벤트 이미지 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          {{ $t('MSG_TXT_EVENT_IMAG_INFO') }} <!-- 이벤트 이미지 정보 -->
        </h4>
      </div>
      <ur-form-box>
        <!-- 상세 배너 이미지 -->
        <ur-form-item
          :label="$t('MSG_TXT_DETAIL_BANNER_IMAG')"
          required
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            ref="bannerImag"
            v-model="attendChkData.bannerImagUrl"
            upload-target="EVT004"
            accepts="jpg,png,gif"
            pixels="720*auto"
            preview-mode="BELOW"
            show-guidance
            :page-id="this.$options.name"
          >
            <template>
              <div class="col_img_wrap">
                <div class="col_item_img">
                  <ur-text-field
                    v-model="attendChkData.bannerImagAltDesc"
                    style="width: 100%; height: auto;"
                    maxlength="100"
                    :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                  />
                </div>
              </div>
            </template>
          </cmp-single-file-uploader>
        </ur-form-item>
        <!-- 스탬프 배경 이미지 -->
        <ur-form-item
          :label="$t('MSG_TXT_STMP_BKGRD_IMAG')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            ref="stmpBkgrdImag"
            v-model="attendChkData.stmpBkgrdImagUrl"
            upload-target="EVT004"
            accepts="jpg,png,gif"
            pixels="720*1328"
            preview-mode="BELOW"
            show-guidance
            :page-id="this.$options.name"
          >
            <template>
              <div class="col_img_wrap">
                <div class="col_item_img">
                  <ur-text-field
                    v-model="attendChkData.stmpBkgrdImagAltDesc"
                    style="width: 100%; height: auto;"
                    maxlength="100"
                    :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                  />
                </div>
              </div>
            </template>
          </cmp-single-file-uploader>
        </ur-form-item>
        <!-- 스탬프 비활성화 이미지 -->
        <ur-form-item
          :label="$t('MSG_TXT_STMP_INACTIVATED_IMAG')"
          required
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            ref="stmpInactivImag"
            v-model="attendChkData.stmpInactivImagUrl"
            upload-target="EVT004"
            accepts="jpg,png,gif"
            pixels="140*168"
            preview-mode="BELOW"
            show-guidance
            :page-id="this.$options.name"
          >
            <template>
              <div class="col_img_wrap">
                <div class="col_item_img">
                  <ur-text-field
                    v-model="attendChkData.stmpInactivImagAltDesc"
                    style="width: 100%; height: auto;"
                    maxlength="100"
                    :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                  />
                </div>
              </div>
            </template>
          </cmp-single-file-uploader>
        </ur-form-item>
        <!-- 스탬프 활성화 이미지 -->
        <ur-form-item
          :label="$t('MSG_TXT_STMP_ACTIVATED_IMAG')"
          required
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            ref="stmpActivImag"
            v-model="attendChkData.stmpActivImagUrl"
            upload-target="EVT004"
            accepts="jpg,png,gif"
            pixels="140*168"
            preview-mode="BELOW"
            show-guidance
            :page-id="this.$options.name"
          >
            <template>
              <div class="col_img_wrap">
                <div class="col_item_img">
                  <ur-text-field
                    v-model="attendChkData.stmpActivImagAltDesc"
                    style="width: 100%; height: auto;"
                    maxlength="100"
                    :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                  />
                </div>
              </div>
            </template>
          </cmp-single-file-uploader>
        </ur-form-item>
        <!-- 스페셜 스탬프 비활성화 이미지 -->
        <ur-form-item
          :label="$t('MSG_TXT_SPECIAL_STMP_INACTIVATED_IMAG')"
          required
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            ref="spcialStmpInactivImag"
            v-model="attendChkData.spcialStmpInactivImagUrl"
            upload-target="EVT004"
            accepts="jpg,png,gif"
            pixels="140*168"
            preview-mode="BELOW"
            show-guidance
            :page-id="this.$options.name"
          >
            <template>
              <div class="col_img_wrap">
                <div class="col_item_img">
                  <ur-text-field
                    v-model="attendChkData.spcialStmpInactivAltDesc"
                    style="width: 100%; height: auto;"
                    maxlength="100"
                    :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                  />
                </div>
              </div>
            </template>
          </cmp-single-file-uploader>
        </ur-form-item>
        <!-- 스페셜 스탬프 활성화 이미지 -->
        <ur-form-item
          :label="$t('MSG_TXT_SPECIAL_STMP_ACTIVATED_IMAG')"
          required
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            ref="spcialStmpActivImagUrl"
            v-model="attendChkData.spcialStmpActivImagUrl"
            upload-target="EVT004"
            accepts="jpg,png,gif"
            pixels="140*168"
            preview-mode="BELOW"
            show-guidance
            :page-id="this.$options.name"
          >
            <template>
              <div class="col_img_wrap">
                <div class="col_item_img">
                  <ur-text-field
                    v-model="attendChkData.spcialStmpActivAltDesc"
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
      <!-- E:: 이벤트 이미지 정보 -->

      <!-- S:: 보상 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          {{ $t('MSG_TXT_REWRD_INFO') }} <!-- 보상 정보 -->
        </h4>
        <div class="left_box pl16">
          <ur-button
            color="violet"
            @click="onClickAddRewrd"
          >
            {{ $t('MSG_BTN_ADD') }} <!-- 추가 -->
          </ur-button>
          <ur-button
            color="violet"
            @click="onClickDeleteRewrd"
          >
            {{ $t('MSG_BTN_DEL') }}  <!-- 삭제 -->
          </ur-button>
          <ur-button
            color="violet"
            @click="onClickResetRewrd"
          >
            {{ $t('MSG_BTN_INTL') }} <!-- 초기화 -->
          </ur-button>
        </div>
      </div>
      <ur-data-grid
        ref="rewrdGrid"
        :headers="rewrdGrid.headers"
        :data-source="rewrdGrid.dataSource"
        :options="rewrdGrid.options"
        :data-set-options="{id: 'id'}"
      />
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
import { urDataSet } from 'uidev-component'
import CommonUtils from '~aa/js/common-utils'
import EventGridColumnMixin from '~aa/pages/G/mixins/EventGridColumnMixin'
import AttendChkMixin from '~aa/pages/G/mixins/AttendChkMixin'
import CouponMixin from '~aa/pages/X/mixins/CouponMixin'

export default {
  name: 'PGE_AAG_00032', // eslint-disable-line vue/name-property-casing
  mixins: [EventGridColumnMixin, AttendChkMixin, CouponMixin],
  data() {
    return {
      codeKeys: [
        'COD_IA_QTY_LIMIT_YN', // 수량제한여부
        'COD_IA_EVENT_REWARD_KIND', // 이벤트보상구분
      ],
      codes: {
        COD_IA_QTY_LIMIT_YN: [], // 수량제한여부
        COD_IA_EVENT_REWARD_KIND: [], // 이벤트보상구분
        COD_IA_YN: [{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],
      },
      params: {},
      attendChkData: {
        // Single
        eventId: null, // 이벤트ID
        eventName: null, // 이벤트명
        eventStartDtm: null, // 이벤트시작일시
        eventEndDtm: null, // 이벤트종료일시
        exposrYn: null, // 노출여부
        bannerImagUrl: null, // 배너이미지URL
        bannerImagAltDesc: null, // 배너이미지ALT내용
        stmpBkgrdImagUrl: null, // 스탬프배경이미지URL
        stmpBkgrdImagAltDesc: null, // 스탬프배경이미지ALT내용
        stmpInactivImagUrl: null, // 스탬프비활성이미지URL
        stmpInactivImagAltDesc: null, // 스탬프비활성이미지ALT내용
        stmpActivImagUrl: null, // 스탬프활성이미지URL
        stmpActivImagAltDesc: null, // 스탬프활성이미지ALT내용
        spcialStmpInactivImagUrl: null, // 특별스탬프비활성이미지URL
        spcialStmpInactivAltDesc: null, // 특별스탬프비활성ALT내용
        spcialStmpActivImagUrl: null, // 특별스탬프활성이미지URL
        spcialStmpActivAltDesc: null, // 특별스탬프활성ALT내용
        // Multi
        attendChkRewrdList: { // 출석체크보상목록
          insert: [],
          update: [],
          delete: [],
        },
      },
      eventPeriods: [], // 이벤트기간
      minEventStartDate: null,
      attendChkRewrdList: [], // 출석체크보상목록
      rewrdGrid: {
        headers: [],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        options: {
          noInfo: true,
          selectCheck: true,
          selectCheckOnly: true,
          multiSelect: true,
          msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
        },
        defaultRowData: {
          eventId: null, // 이벤트ID
          rewrdSeq: null, // 보상순번
          spcialStmpYn: 'N', // 특별스탬프여부(default: 'N')
          rewrdKindCd: null, // 보상구분코드
          rewrdName: null, // 보상명
          couponMasterId: null, // 쿠폰마스터ID
          couponMasterNo: null, // 쿠폰마스터번호
          couponIssueSeq: null, // 쿠폰발행순번
          couponName: null, // 쿠폰명
          rewrdQtyLimitYn: 'Y', // 보상수량제한여부(default: 제한('Y'))
          rewrdQty: null, // 보상수량
          rewrdDcnt: null, // 보상일수
        },
      },
    }
  },
  created() {
    this.initializeCodes()
    this.initializeParams()
  },
  methods: {
    initializeHeaders(that) {
      this.rewrdGrid.headers = [
        {
          text: this.$t('MSG_TXT_NUMBER_ROW'), // No.
          customValue: (v, r) => r.__idx + 1, // eslint-disable-line no-underscore-dangle
          width: 50,
        },
        { hide: true, value: 'eventId' },
        { hide: true, value: 'rewrdSeq' },
        {
          text: this.$t('MSG_TXT_SPECIAL_STMP_YN'), // 스페셜 스탬프 여부
          value: 'spcialStmpYn',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-radio-wrapper
                  v-model="row.spcialStmpYn"
                  :items="codes.COD_IA_YN"
                  small
                  @input="onInputSpcialStmpYn"
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
              </div>`,
            computed: {
              codes() {
                return that.codes
              },
            },
            methods: {
              onInputSpcialStmpYn(value) {
                that.rewrdGrid.dataSource.setRowValue(this.row, 'spcialStmpYn', value)
              },
            },
          },
          width: 150,
        },
        this.COLUMN_REWRD_KIND, // 구분(EventGridColumnMixin)
        this.COLUMN_GVWY_NAME, // 경품 명(EventGridColumnMixin)
        this.COLUMN_PAYMNT_COUPON, // 지급 쿠폰(EventGridColumnMixin)
        this.COLUMN_REWRD_QTY, // 수량(EventGridColumnMixin)
        {
          text: this.$t('MSG_TXT_REWRD_DATE'), // 보상 일자
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div
                style="align-items: center"
              >
                <ur-text-field
                  v-model="row.rewrdDcnt"
                  style="width: 100px"
                  mask="number"
                  maxlength="2"
                  @keyup="row.rewrdDcnt = parseInt(row.rewrdDcnt, 10)"
                  @input="onInputRewrdDcnt"
                /> <span style="margin-left: 5px">{{ $t('MSG_TXT_DAY_OF_ATTEND_COUNT') }}</span> <!-- 일 차 -->
              </div>`,
            methods: {
              onInputRewrdDcnt(value) {
                that.rewrdGrid.dataSource.setRowValue(this.row, 'rewrdDcnt', value)
              },
            },
          },
          width: 180,
        },
      ]
    },
    initializeCodes() {
      http.mergeCodeList(this.$options.name, this.codeKeys, this.codes).then(() => {
        // 출석체크 보상 구분에서는 꽝을 사용하지 않음
        this.codes.COD_IA_EVENT_REWARD_KIND = this.codes.COD_IA_EVENT_REWARD_KIND.filter(item => item.value !== '99')
        this.initializeHeaders(this)
      })
    },
    initializeParams() {
      const params = utils.getParameter(this, 'params')
      if (utils.isEmpty(params.eventId)) {
        // INSERT
        this.attendChkData.eventStartDtm = utils.now('YYYYMMDD0000')
        this.eventPeriods = [this.attendChkData.eventStartDtm, this.attendChkData.eventEndDtm]
        this.minEventStartDate = utils.now('YYYY-MM-DD')
        this.onClickAddRewrd()
      } else {
        // UPDATE
        this.attendChkData.eventId = params.eventId
        this.selectAttendChk()
        this.selectAttendChkRewrdList()
      }
    },
    selectAttendChk() {
      http.request(this.$options.name, 'DTS_AAG_00033', {
        path: {
          'event-id': this.attendChkData.eventId,
        },
      }).then(res => {
        this.attendChkData = res.data
        const eventStartDtm = moment(this.attendChkData.eventStartDtm, 'YYYYMMDDHHmmss').format('YYYYMMDDHHmm')
        const eventEndDtm = moment(this.attendChkData.eventEndDtm, 'YYYYMMDDHHmmss').format('YYYYMMDDHHmm')
        this.eventPeriods = [eventStartDtm, eventEndDtm]

        this.minEventStartDate = CommonUtils.getMinDateWithToday(this.attendChkData.eventStartDtm, 'YYYYMMDDHHmmss')
      })
    },
    selectAttendChkRewrdList() {
      http.request(this.$options.name, 'DTS_AAG_00036', {
        path: {
          'event-id': this.attendChkData.eventId,
        },
      }).then(res => {
        this.attendChkRewrdList = res.data
        this.$refs.rewrdGrid.setData(this.attendChkRewrdList)
      })
    },
    onInputEventPeriods(value) {
      // 종료일시의 시분(HHmm)이 0000일 경우 2359로 대체한다.
      if (value.at(1) && value.at(1).slice(-4) === '0000') {
        this.eventPeriods = [value.at(0), value.at(1).substring(0, 8).concat('2359')]
        return // [this.eventPeriods]값 변경으로 [onInputEventPeriods]가 다시 호출되므로 현재 호출은 return한다.
      }
      this.attendChkData.eventStartDtm = value.at(0) ? value.at(0).concat('00') : null
      this.attendChkData.eventEndDtm = value.at(1) ? value.at(1).concat('59') : null
    },
    onClickList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAG_00031', { params })
    },
    onClickSave() {
      if (this.isValid()) {
        let message = this.getCouponValidPeriodMsg() // 쿠폰유효기간 메시지
        message = (message) ? `${message}\n\n${this.$t('MSG_ALT_WANT_SAVE')}` : this.$t('MSG_ALT_WANT_SAVE') // 저장 하시겠습니까?
        utils.messageBox(
          'confirm', message,
          null, () => {
            const { eventId } = this.attendChkData
            this.adjustAttendChkRewrdList()
            if (utils.isEmpty(eventId)) {
              this.insertAttendChk()
            } else {
              this.updateAttendChk()
            }
          },
        )
      }
    },
    insertAttendChk() {
      const { attendChkData } = this
      http.request(this.$options.name, 'DTS_AAG_00032', {
        data: attendChkData,
      }).then(res => {
        if (res.data > 0) {
          utils.messageBox(
            'success', this.$t('MSG_ALT_SAVE_DATA'), // 저장되었습니다.
            null, () => this.onClickList(),
          )
        }
      })
    },
    updateAttendChk() {
      const { attendChkData } = this
      http.request(this.$options.name, 'DTS_AAG_00034', {
        data: attendChkData,
      }).then(res => {
        if (res.data > 0) {
          utils.messageBox(
            'success', this.$t('MSG_ALT_SAVE_DATA'), // 저장되었습니다.
            null, () => this.onClickList(),
          )
        }
      })
    },
    onClickAddRewrd() {
      this.rewrdGrid.dataSource.addRow(this.rewrdGrid.defaultRowData)
    },
    onClickDeleteRewrd() {
      const rows = this.$refs.rewrdGrid.getSelected()
      rows.forEach(row => {
        this.$refs.rewrdGrid.removeRow(row, false)
      })
    },
    onClickResetRewrd() {
      const rows = this.$refs.rewrdGrid.getData()
      rows.forEach(row => {
        this.$refs.rewrdGrid.removeRow(row, false)
      })
      this.onClickAddRewrd()
    },
    isValid() {
      if (!(this.isValidEventInfo()
         && this.isValidImagInfo()
         && this.isValidRewrdInfo())) {
        return false
      }
      return true
    },
    isValidEventInfo() {
      // 이벤트 정보
      if (utils.isEmpty(this.attendChkData.eventName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EVENT_NAME'))) // {이벤트 명}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.attendChkData.eventStartDtm)
          || utils.isEmpty(this.attendChkData.eventEndDtm)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EVENT_PERIOD'))) // {이벤트 기간}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.attendChkData.exposrYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXPOSR_YN'))) // {노출 여부}은(는) 필수 항목입니다.
        return false
      }
      return true
    },
    isValidImagInfo() {
      // 이벤트 이미지 정보
      if (utils.isEmpty(this.attendChkData.bannerImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_DETAIL_BANNER_IMAG'))) // {상세 배너 이미지}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.attendChkData.stmpInactivImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_STMP_INACTIVATED_IMAG'))) // {스탬프 비활성화 이미지}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.attendChkData.stmpActivImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_STMP_ACTIVATED_IMAG'))) // {스탬프 활성화 이미지}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.attendChkData.spcialStmpInactivImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_SPECIAL_STMP_INACTIVATED_IMAG'))) // {스페셜 스탬프 비활성화 이미지}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.attendChkData.spcialStmpActivImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_SPECIAL_STMP_ACTIVATED_IMAG'))) // {스페셜 스탬프 활성화 이미지}은(는) 필수 항목입니다.
        return false
      }
      return true
    },
    isValidRewrdInfo() {
      // 보상 정보
      const rewrdList = this.rewrdGrid.dataSource.data
      for (let i = 0; i < rewrdList.length; i += 1) {
        if (utils.isEmpty(rewrdList[i].rewrdKindCd)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_KIND'))) // {구분}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(rewrdList[i].rewrdName)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_GVWY_NAME'))) // {경품 명}은(는) 필수 항목입니다.
          return false
        }
        if (rewrdList[i].rewrdKindCd === '01'
            && utils.isEmpty(rewrdList[i].couponMasterId)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PAYMNT_COUPON'))) // {지급 쿠폰}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(rewrdList[i].rewrdQtyLimitYn)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_QTY'))) // {수량}은(는) 필수 항목입니다.
          return false
        }
        if (rewrdList[i].rewrdQtyLimitYn === 'Y'
            && utils.isEmpty(rewrdList[i].rewrdQty)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_QTY'))) // {수량}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(rewrdList[i].rewrdDcnt)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_REWRD_DATE'))) // {보상 일자}은(는) 필수 항목입니다.
          return false
        }
      }
      return true
    },
    adjustAttendChkRewrdList() {
      if (utils.isEmpty(this.attendChkData.eventId)) {
        // INSERT
        this.attendChkData.attendChkRewrdList = {
          insert: this.rewrdGrid.dataSource.data,
        }
      } else {
        // UPDATE
        const { data } = this.rewrdGrid.dataSource
        const { updated, removed } = this.rewrdGrid.dataSource.getChanged()

        const insertList = data.filter(item => utils.isEmpty(item.eventId))
        const deleteList = removed.filter(item => !utils.isEmpty(item.eventId))
        const updateList = updated.filter(item => {
          const map = deleteList.map(d => d.rewrdSeq)
          return !map.includes(item.rewrdSeq)
        })

        this.attendChkData.attendChkRewrdList = {
          insert: insertList,
          update: updateList,
          delete: deleteList,
        }
      }
    },
  },
}
</script>
