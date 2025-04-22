<template>
  <div>
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
          v-model="eventSubData.exposrCondCd"
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
        style="width: 100%; height: auto;"
      >
        <ur-text-field
          v-model="eventSubData.subtrctPointAmt"
          style="width: 150px;"
          mask="number"
          maxlength="5"
          @keyup="eventSubData.subtrctPointAmt = parseInt(eventSubData.subtrctPointAmt, 10)"
          @blur="onBlurSubtrctPointAmt"
        />
        <span style="margin-left: 5px">
          {{ $t('MSG_TXT_EXHAUST_SOM_GUIDANCE_1') }} <!-- * 소진 솜은 100단위로 넣어주세요. -->
        </span>
      </ur-form-item>
    </ur-form-box>
    <!-- E:: 조건정보 -->

    <!-- S:: 이벤트 이미지 정보 -->
    <div class="comm_title_wrap mt20">
      <h4>
        {{ $t('MSG_TXT_EVENT_IMAG_INFO') }} <!-- 이벤트 이미지 정보 -->
      </h4>
    </div>
    <ur-form-box>
      <!-- 썸네일 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_THUMBNAIL_IMAG')"
        required
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          ref="thumbnailImag"
          v-model="eventSubData.thumbnailImagUrl"
          upload-target="EVT001"
          accepts="jpg,png,gif"
          pixels="624*320"
          preview-mode="BELOW"
          show-guidance
          :page-id="pageId"
        >
          <template>
            <div class="col_img_wrap">
              <div class="col_item_img">
                <ur-text-field
                  v-model="eventSubData.thumbnailImagAltDesc"
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

    <!-- S:: 이벤트 상세 정보 -->
    <div class="comm_title_wrap mt20">
      <h4>
        {{ $t('MSG_TXT_EVENT_DETAIL_INFO') }} <!-- 이벤트 상세 정보 -->
      </h4>
    </div>
    <ur-form-box>
      <!-- 신청 기간 -->
      <ur-form-item
        :label="$t('MSG_TXT_REQ_PERIOD')"
        required
        label-align="right"
        class="flex_wrap"
        style="width: 50%; height: auto;"
      >
        <ur-range-picker
          v-model="reqPeriods"
          input-type="YYYY-MM-DD"
          model-type="YYYYMMDD"
          :confirm-label="$t('MSG_BTN_SELT')"
          :min-date="minReqStartDate"
          @input="onInputReqPeriods"
        />
      </ur-form-item>
      <!-- 당첨자 발표일 -->
      <ur-form-item
        :label="$t('MSG_TXT_WINNER_ANN_DAY')"
        required
        label-align="right"
        class="flex_wrap"
        style="width: 50%; height: auto;"
      >
        <ur-date-picker
          v-model="eventSubData.winngAnnDate"
          input-type="YYYY-MM-DD"
          model-type="YYYYMMDD"
          :confirm-label="$t('MSG_BTN_SELT')"
          :today-label="$t('MSG_BTN_TODAY')"
          :min-date="minWinngAnnDate"
          style="width: 144px !important"
        />
      </ur-form-item>
      <!-- 내용 -->
      <ur-form-item
        :label="$t('MSG_TXT_DESC')"
        required
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <sui-web-editor ref="eventDesc" />
      </ur-form-item>
    </ur-form-box>
    <!-- E:: 이벤트 상세 정보 -->

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
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component'
import CommonUtils from '~aa/js/common-utils'
import EventGridColumnMixin from '~aa/pages/G/mixins/EventGridColumnMixin'
import CouponMixin from '~aa/pages/X/mixins/CouponMixin'

export default {
  name: 'PGE_AAG_00012_S04', // eslint-disable-line vue/name-property-casing
  mixins: [EventGridColumnMixin, CouponMixin],
  props: {
    pageId: {
      type: String,
      required: false,
      default: null,
    },
    eventId: {
      type: String,
      required: false,
      default: null,
    },
    eventData: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      codeKeys: [
        'COD_IA_EVENT_EXPOSR_COND', // 이벤트노출조건
        'COD_IA_QTY_LIMIT_YN', // 수량제한여부
        'COD_IA_EVENT_REWARD_KIND', // 이벤트보상구분
      ],
      codes: {
        COD_IA_EVENT_EXPOSR_COND: [], // 이벤트노출조건
        COD_IA_QTY_LIMIT_YN: [], // 수량제한여부
        COD_IA_EVENT_REWARD_KIND: [], // 이벤트보상구분
        COD_IA_YN: [{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],
      },
      eventSubData: {
        // Single
        exposrCondCd: '01', // 노출조건코드(default: 전체('01'))
        subtrctPointAmt: null, // 차감포인트금액
        thumbnailImagUrl: null, // 썸네일이미지URL
        thumbnailImagAltDesc: null, // 썸네일이미지ALT내용
        reqStartDate: null, // 신청시작일자
        reqEndDate: null, // 신청종료일자
        winngAnnDate: null, // 당첨발표일자
        eventDesc: null, // 이벤트내용
        // Multi
        eventPartcpCondList: { // 참여조건목록
          insert: [],
          update: [],
          delete: [],
        },
        eventRewrdList: { // 이벤트보상목록
          insert: [],
          update: [],
          delete: [],
        },
      },
      reqPeriods: [], // 신청기간
      minReqStartDate: null,
      minWinngAnnDate: null,
      eventPartcpCondList: [], // 참여조건목록
      eventRewrdList: [], // 이벤트보상목록
      eventPartcpCondListDesc: null, // 참여조건목록설명
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
          rewrdKindCd: null, // 보상구분코드
          rewrdName: null, // 보상명
          couponMasterId: null, // 쿠폰마스터ID
          couponMasterNo: null, // 쿠폰마스터번호
          couponIssueSeq: null, // 쿠폰발행순번
          couponName: null, // 쿠폰명
          rewrdQtyLimitYn: 'Y', // 보상수량제한여부(default: 제한('Y'))
          rewrdQty: null, // 보상수량
          rewrdCondValue: null, // 보상조건값
          winngRate: null, // 당첨률
        },
      },
    }
  },
  watch: {
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
    this.initializeMinDate()
    http.mergeCodeList(this.pageId, this.codeKeys, this.codes).then(() => {
      // 응모 이벤트 보상 구분에서는 꽝을 사용하지 않음
      this.codes.COD_IA_EVENT_REWARD_KIND = this.codes.COD_IA_EVENT_REWARD_KIND.filter(item => item.value !== '99')
      this.initializeHeaders(this)
      this.initializeParams()
    })
  },
  methods: {
    initializeMinDate() {
      if (utils.isEmpty(this.eventId)) {
        // INSERT
        this.minReqStartDate = utils.now('YYYY-MM-DD')
        this.minWinngAnnDate = utils.now('YYYY-MM-DD')
      } else {
        // UPDATE : initializeParams() assign 이전이므로 this.eventData의 값을 사용
        this.minReqStartDate = CommonUtils.getMinDateWithToday(this.eventData.reqStartDate, 'YYYYMMDD')
        this.minWinngAnnDate = CommonUtils.getMinDateWithToday(this.eventData.winngAnnDate, 'YYYYMMDD')
      }
    },
    initializeHeaders() {
      this.rewrdGrid.headers = [
        {
          text: this.$t('MSG_TXT_NUMBER_ROW'), // No.
          customValue: (v, r) => r.__idx + 1, // eslint-disable-line no-underscore-dangle
          width: 50,
        },
        { hide: true, value: 'eventId' },
        { hide: true, value: 'rewrdSeq' },
        this.COLUMN_REWRD_KIND, // 구분(EventGridColumnMixin)
        this.COLUMN_GVWY_NAME, // 경품 명(EventGridColumnMixin)
        this.COLUMN_PAYMNT_COUPON, // 지급 쿠폰(EventGridColumnMixin)
        this.COLUMN_REWRD_QTY, // 수량(EventGridColumnMixin)
      ]
    },
    initializeParams() {
      if (utils.isEmpty(this.eventId)) {
        // INSERT
        this.onClickAddRewrd()
      } else {
        // UPDATE
        this.eventSubData = utils.assign(this.eventSubData, this.eventData)
        this.reqPeriods = [this.eventSubData.reqStartDate, this.eventSubData.reqEndDate]
        this.$refs.eventDesc.setHtml(this.eventSubData.eventDesc)
        this.selectEventPartcpCondList()
        this.selectEventRewardList()
      }
    },
    selectEventPartcpCondList() {
      http.request(this.pageId, 'DTS_AAG_00006', {
        path: {
          'event-id': this.eventId,
        },
      }).then(res => {
        this.eventPartcpCondList = res.data
      })
    },
    selectEventRewardList() {
      http.request(this.pageId, 'DTS_AAG_00007', {
        path: {
          'event-id': this.eventId,
        },
      }).then(res => {
        this.eventRewrdList = res.data
        this.$refs.rewrdGrid.setData(this.eventRewrdList)
      })
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
          this.eventSubData.eventPartcpCondList = {
            insert: returnData.list,
          }
        } else {
          // UPDATE
          // - insert : no comment
          // - update : 동일한 Key(condSeq)를 기준으로 delete 후 insert
          // - delete : 동일한 Key(condSeq)를 기준으로 update 목록에서 delete 후 insert
          this.eventSubData.eventPartcpCondList.insert = returnData.insert

          returnData.update.forEach(source => {
            const index = this.findDupIndexFromPartcpCondUpdateList(source)
            this.removeFromPartcpCondUpdateList(index)
            this.eventSubData.eventPartcpCondList.update.push(source)
          })

          returnData.delete.forEach(source => {
            const index = this.findDupIndexFromPartcpCondUpdateList(source)
            this.removeFromPartcpCondUpdateList(index)
            this.eventSubData.eventPartcpCondList.delete.push(source)
          })
        }
      }
      this.onInputExposrCond(this.eventSubData.exposrCondCd, false)
    },
    findDupIndexFromPartcpCondUpdateList(source) {
      return this.eventSubData.eventPartcpCondList.update
        .findIndex(target => target.condSeq === source.condSeq)
    },
    removeFromPartcpCondUpdateList(index) {
      if (index > -1) {
        this.eventSubData.eventPartcpCondList.update.splice(index, 1)
      }
    },
    onBlurSubtrctPointAmt() {
      const { subtrctPointAmt } = this.eventSubData
      if (subtrctPointAmt > 0 && subtrctPointAmt < 100) {
        this.eventSubData.subtrctPointAmt = null
      } else if (subtrctPointAmt % 100) {
        this.eventSubData.subtrctPointAmt = Math.floor(subtrctPointAmt / 100) * 100
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
        this.eventSubData.exposrCondCd = '01'
      }
    },
    onInputReqPeriods(value) {
      this.eventSubData.reqStartDate = value.at(0) || null
      this.eventSubData.reqEndDate = value.at(1) || null
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
    isValid(paramData = null) {
      if (!(this.isValidCondInfo()
         && this.isValidImagInfo()
         && this.isValidDetailInfo(paramData)
         && this.isValidRewrdInfo())) {
        return false
      }
      this.eventSubData.eventDesc = this.$refs.eventDesc.getHtml()
      this.adjustRewrdList()
      return true
    },
    isValidCondInfo() {
      // 조건 정보
      if (utils.isEmpty(this.eventSubData.subtrctPointAmt)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXHAUST_SOM'))) // {소진 솜}은(는) 필수 항목입니다.
        return false
      }
      return true
    },
    isValidImagInfo() {
      // 이벤트 이미지 정보
      if (utils.isEmpty(this.eventSubData.thumbnailImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_THUMBNAIL_IMAG'))) // {썸네일 이미지}은(는) 필수 항목입니다.
        return false
      }
      return true
    },
    isValidDetailInfo(paramData = null) {
      // 이벤트 상세 정보
      if (utils.isEmpty(this.eventSubData.reqStartDate)
          || utils.isEmpty(this.eventSubData.reqEndDate)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_REQ_PERIOD'))) // {신청 기간}은(는) 필수 항목입니다.
        return false
      }

      const eventStartDateNum = Number(moment(paramData.eventStartDtm, 'YYYYMMDDHHmmss').startOf('day')) // 이벤트시작일자
      const eventEndDateNum = Number(moment(paramData.eventEndDtm, 'YYYYMMDDHHmmss').startOf('day')) // 이벤트시작일자
      const reqStartDateNum = Number(moment(this.eventSubData.reqStartDate, 'YYYYMMDD').startOf('day')) // 신청시작일자
      const reqEndDateNum = Number(moment(this.eventSubData.reqEndDate, 'YYYYMMDD').startOf('day')) // 신청종료일자
      const winngAnnDateNum = Number(moment(this.eventSubData.winngAnnDate, 'YYYYMMDD').startOf('day')) // 당첨발표일자

      // 이벤트 기간과 신청 기간의 단위가 다름 : 일(day)단위로 비교하여 판단하는 것으로 확인
      if (!(eventStartDateNum <= reqStartDateNum && reqEndDateNum <= eventEndDateNum)) {
        utils.messageBox('warning', this.$t('MSG_ALT_EVENT_REQ_PERIOD_RANGE_IS_INVALID')) // 신청 기간은 이벤트 기간 외로 설정할 수 없습니다.
        return false
      }

      if (utils.isEmpty(this.eventSubData.winngAnnDate)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_WINNER_ANN_DAY'))) // {당첨자 발표일}은(는) 필수 항목입니다.
        return false
      }

      if (winngAnnDateNum <= reqEndDateNum) {
        utils.messageBox('warning', this.$t('MSG_ALT_WINNER_ANN_DAY_RANGE_IS_INVALID')) // 당첨자 발표일은 신청기간 이후로 선택 가능합니다.
        return false
      }

      if (this.$refs.eventDesc.getContentSize() === 0) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_DESC'))) // {내용}은(는) 필수 항목입니다.
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
        if (rewrdList[i].rewrdQtyLimitYn === 'Y' && utils.isEmpty(rewrdList[i].rewrdQty)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_QTY'))) // {수량}은(는) 필수 항목입니다.
          return false
        }
      }
      return true
    },
    adjustRewrdList() {
      if (utils.isEmpty(this.eventId)) {
        // INSERT
        this.eventSubData.eventRewrdList = {
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

        this.eventSubData.eventRewrdList = {
          insert: insertList,
          update: updateList,
          delete: deleteList,
        }
      }
    },
  },
}
</script>
