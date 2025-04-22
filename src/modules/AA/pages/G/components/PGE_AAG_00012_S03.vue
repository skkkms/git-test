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
        style="width: 50%; height: auto;"
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
      <!-- 참여 기회 -->
      <ur-form-item
        :label="$t('MSG_TXT_PARTCP_OPPR')"
        required
        label-align="right"
        class="flex_wrap"
        style="width: 50%; height: auto;"
      >
        <ur-dropdown
          v-model="eventSubData.partcpPeriodCd"
          style="width: 100px;"
          :items="codes.COD_IA_EVENT_PARTCP_PERIOD"
          :placeholder="$t('MSG_TXT_SEL')"
        />
        <ur-text-field
          v-model="eventSubData.partcpAvailCnt"
          style="width: 150px; margin-left: 10px;"
          mask="number"
          maxlength="4"
          @keyup="eventSubData.partcpAvailCnt = parseInt(eventSubData.partcpAvailCnt, 10)"
        /> <span style="margin-left: 5px">{{ $t('MSG_TXT_NUMBER_OF_TIMES') }}</span> <!-- 회 -->
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
      <!-- 상세 배경 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_DETAIL_BKGRD_IMAG')"
        required
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          ref="bkgrdImag"
          v-model="eventSubData.eventRolet.bkgrdImagUrl"
          upload-target="EVT001"
          accepts="jpg,png,gif"
          pixels="720*auto"
          preview-mode="BELOW"
          show-guidance
          :page-id="pageId"
        >
          <template>
            <div class="col_img_wrap">
              <div class="col_item_img">
                <ur-text-field
                  v-model="eventSubData.eventRolet.bkgrdImagAltDesc"
                  style="width: 100%; height: auto;"
                  maxlength="100"
                  :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                />
              </div>
            </div>
          </template>
        </cmp-single-file-uploader>
      </ur-form-item>
      <!-- 패널 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_PNL_IMAG')"
        required
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          ref="pnlImag"
          v-model="eventSubData.eventRolet.pnlImagUrl"
          upload-target="EVT001"
          accepts="jpg,png,gif"
          pixels="560*560"
          preview-mode="BELOW"
          show-guidance
          :page-id="pageId"
        >
          <template>
            <div class="col_img_wrap">
              <div class="col_item_img">
                <ur-text-field
                  v-model="eventSubData.eventRolet.pnlImagAltDesc"
                  style="width: 100%; height: auto;"
                  maxlength="100"
                  :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                />
              </div>
            </div>
          </template>
        </cmp-single-file-uploader>
      </ur-form-item>
      <!-- 기준침 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_NDL_IMAG')"
        required
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          ref="ndlImag"
          v-model="eventSubData.eventRolet.ndlImagUrl"
          upload-target="EVT001"
          accepts="jpg,png,gif"
          pixels="64*80"
          preview-mode="BELOW"
          show-guidance
          :page-id="pageId"
        >
          <template>
            <div class="col_img_wrap">
              <div class="col_item_img">
                <ur-text-field
                  v-model="eventSubData.eventRolet.ndlImagAltDesc"
                  style="width: 100%; height: auto;"
                  maxlength="100"
                  :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                />
              </div>
            </div>
          </template>
        </cmp-single-file-uploader>
      </ur-form-item>
      <!-- 시작 버튼 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_START_BTN_IMAG')"
        required
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          ref="startImag"
          v-model="eventSubData.eventRolet.startImagUrl"
          upload-target="EVT001"
          accepts="jpg,png,gif"
          pixels="160*160"
          preview-mode="BELOW"
          show-guidance
          :page-id="pageId"
        >
          <template>
            <div class="col_img_wrap">
              <div class="col_item_img">
                <ur-text-field
                  v-model="eventSubData.eventRolet.startImagAltDesc"
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
import EventGridColumnMixin from '~aa/pages/G/mixins/EventGridColumnMixin'
import CouponMixin from '~aa/pages/X/mixins/CouponMixin'

export default {
  name: 'PGE_AAG_00012_S03', // eslint-disable-line vue/name-property-casing
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
        'COD_IA_EVENT_PARTCP_PERIOD', // 이벤트참여주기
        'COD_IA_QTY_LIMIT_YN', // 수량제한여부
        'COD_IA_EVENT_REWARD_KIND', // 이벤트보상구분
        'COD_IA_EVENT_WINNG_LIMIT_PERIOD', // 이벤트당첨제한주기
      ],
      codes: {
        COD_IA_EVENT_EXPOSR_COND: [], // 이벤트노출조건
        COD_IA_EVENT_PARTCP_PERIOD: [], // 이벤트참여주기
        COD_IA_QTY_LIMIT_YN: [], // 수량제한여부
        COD_IA_EVENT_REWARD_KIND: [], // 이벤트보상구분
        COD_IA_EVENT_WINNG_LIMIT_PERIOD: [], // 이벤트당첨제한주기
        COD_IA_YN: [{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],
      },
      eventSubData: {
        // Single
        exposrCondCd: '01', // 노출조건코드(default: 전체('01'))
        subtrctPointAmt: null, // 차감포인트금액
        partcpPeriodCd: 'ALL', // 참여주기코드(default: 전체('ALL'))
        partcpAvailCnt: null, // 참여가능건수
        thumbnailImagUrl: null, // 썸네일이미지URL
        thumbnailImagAltDesc: null, // 썸네일이미지ALT내용
        eventRolet: {
          bkgrdImagUrl: null, // 배경이미지URL
          bkgrdImagAltDesc: null, // 배경이미지ALT내용
          pnlImagUrl: null, // 패널이미지URL
          pnlImagAltDesc: null, // 패널이미지ALT내용
          ndlImagUrl: null, // 기준침이미지URL
          ndlImagAltDesc: null, // 기준침이미지ALT내용
          startImagUrl: null, // 시작이미지URL
          startImagAltDesc: null, // 시작이미지ALT내용
        },
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
      eventPartcpCondList: [], // 참여조건목록
      eventRewrdList: [], // 이벤트보상목록
      eventPartcpCondListDesc: null, // 참여조건목록설명
      rewrdGrid: {
        headers: [],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        options: {
          height: 330, // 282(5), 522(10), 762(15), 1482(30)
          noInfo: true,
          selectCheckOnly: true,
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
          winngLimitPeriodCd: 'UNL', // 당첨제한주기코드(default: 제한 없음('UNL'))
          winngLimitQty: null, // 당첨제한수량
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
    http.mergeCodeList(this.pageId, this.codeKeys, this.codes).then(() => {
      this.initializeHeaders(this)
      this.initializeParams()
    })
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
          text: this.$t('MSG_TXT_KIND'), // 구분
          value: 'rewrdKindCd',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-dropdown
                  v-model="row.rewrdKindCd"
                  :items="codes.COD_IA_EVENT_REWARD_KIND"
                  :placeholder="$t('MSG_TXT_SEL')"
                  @input="onInputRewrdKind"
                />
              </div>`,
            computed: {
              codes() {
                return that.codes
              },
            },
            methods: {
              onInputRewrdKind(value) {
                that.rewrdGrid.dataSource.setRowValue(this.row, 'rewrdKindCd', value)
                if (value !== '01') {
                  that.rewrdGrid.dataSource.setRowValue(this.row, 'couponMasterId', null)
                  that.rewrdGrid.dataSource.setRowValue(this.row, 'couponMasterNo', null)
                  that.rewrdGrid.dataSource.setRowValue(this.row, 'couponIssueSeq', null)
                  that.rewrdGrid.dataSource.setRowValue(this.row, 'couponName', null)
                }

                if (value === '99') {
                  that.rewrdGrid.dataSource.setRowValue(this.row, 'rewrdName', null)
                  that.rewrdGrid.dataSource.setRowValue(this.row, 'rewrdQtyLimitYn', null)
                  that.rewrdGrid.dataSource.setRowValue(this.row, 'rewrdQty', null)
                  that.rewrdGrid.dataSource.setRowValue(this.row, 'winngLimitPeriodCd', null)
                  that.rewrdGrid.dataSource.setRowValue(this.row, 'winngLimitQty', null)
                } else if (!this.row.rewrdQtyLimitYn) {
                  that.rewrdGrid.dataSource.setRowValue(this.row, 'rewrdQtyLimitYn', 'Y')
                  that.rewrdGrid.dataSource.setRowValue(this.row, 'winngLimitPeriodCd', 'UNL')
                }
              },
            },
          },
          width: 130,
        },
        {
          text: this.$t('MSG_TXT_GVWY_NAME'), // 경품 명
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-text-field
                  v-model="row.rewrdName"
                  :disabled="disabled"
                  style="width: 100%"
                  maxlength="50"
                  @input="onInputRewrdName"
                />
              </div>`,
            computed: {
              disabled() {
                return utils.isEmpty(this.row.rewrdKindCd) || this.row.rewrdKindCd === '99'
              },
            },
            methods: {
              onInputRewrdName(value) {
                that.rewrdGrid.dataSource.setRowValue(this.row, 'rewrdName', value)
              },
            },
          },
        },
        this.COLUMN_PAYMNT_COUPON, // 지급 쿠폰(EventGridColumnMixin)
        {
          text: this.$t('MSG_TXT_QTY'), // 수량
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div
                style="align-items: center"
              >
                <ur-dropdown
                  v-model="row.rewrdQtyLimitYn"
                  :items="codes.COD_IA_QTY_LIMIT_YN"
                  :placeholder="$t('MSG_TXT_SEL')"
                  :disabled="limitYnDisabled"
                  style="width: 100px"
                  @input="onInputRewrdQtyLimitYn"
                />
                <ur-text-field
                  v-model="row.rewrdQty"
                  :disabled="qtyDisabled"
                  style="width: 100px; margin-left: 10px"
                  mask="number"
                  maxlength="7"
                  @keyup="row.rewrdQty = parseInt(row.rewrdQty, 10)"
                  @input="onInputRewrdQty"
                /> <span style="margin-left: 5px">{{ $t('MSG_TXT_NUMBER_OF_COUNT') }}</span> <!-- 개 -->
              </div>`,
            computed: {
              codes() {
                return that.codes
              },
              limitYnDisabled() {
                return this.row.rewrdKindCd === '99'
              },
              qtyDisabled() {
                return this.row.rewrdKindCd === '99' || this.row.rewrdQtyLimitYn === 'N'
              },
            },
            methods: {
              onInputRewrdQtyLimitYn(value) {
                that.rewrdGrid.dataSource.setRowValue(this.row, 'rewrdQtyLimitYn', value)
                if (value === 'N') {
                  that.rewrdGrid.dataSource.setRowValue(this.row, 'rewrdQty', null)
                }
              },
              onInputRewrdQty(value) {
                that.rewrdGrid.dataSource.setRowValue(this.row, 'rewrdQty', value)
              },
            },
          },
          width: 250,
        },
        {
          text: this.$t('MSG_TXT_PERCENTAGE'), // 확률
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div
                style="align-items: center"
              >
                <ur-text-field
                  v-model="row.winngRate"
                  style="width: 80px"
                  mask="number"
                  maxlength="5"
                  @keyup="onKeyupWinngRate"
                  @input="onInputWinngRate"
                /> <span style="margin-left: 5px">%</span>
              </div>`,
            methods: {
              onInputWinngRate(value) {
                that.rewrdGrid.dataSource.setRowValue(this.row, 'winngRate', value)
              },
              onKeyupWinngRate() { // 2023.12.22 yeonjin 소수점 2자리 처리
                // 정수형의 경우 3자리로 고정
                if (Number.isInteger(parseFloat(this.row.winngRate)) && this.row.winngRate.indexOf('.') === -1) {
                  this.row.winngRate = this.row.winngRate.substring(0, 3)
                } else if (this.row.winngRate.substring(this.row.winngRate.indexOf('.')).length > 2) {
                  this.row.winngRate = parseFloat(this.row.winngRate).toFixed(2).toString()
                }
              },
            },
          },
          width: 130,
        },
        {
          text: this.$t('MSG_TXT_WINNG_LIMIT'), // 당첨 제한
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div
                style="align-items: center"
              >
                <ur-dropdown
                  v-model="row.winngLimitPeriodCd"
                  :items="codes.COD_IA_EVENT_WINNG_LIMIT_PERIOD"
                  :placeholder="$t('MSG_TXT_SEL')"
                  :disabled="limitPeriodDisabled"
                  style="width: 120px"
                  @input="onInputWinngLimitPeriodCd"
                />
                <ur-text-field
                  v-model="row.winngLimitQty"
                  :disabled="limitQtyDisabled"
                  style="width: 100px; margin-left: 10px"
                  mask="number"
                  maxlength="8"
                  @keyup="row.winngLimitQty = parseInt(row.winngLimitQty, 10)"
                  @input="onInputWinngLimitQty"
                /> <span style="margin-left: 5px">{{ $t('MSG_TXT_NUMBER_OF_COUNT') }}</span> <!-- 개 -->
              </div>`,
            computed: {
              codes() {
                return that.codes
              },
              limitPeriodDisabled() {
                return this.row.rewrdKindCd === '99'
              },
              limitQtyDisabled() {
                return this.row.rewrdKindCd === '99' || this.row.winngLimitPeriodCd === 'UNL'
              },
            },
            methods: {
              onInputWinngLimitPeriodCd(value) {
                that.rewrdGrid.dataSource.setRowValue(this.row, 'winngLimitPeriodCd', value)
                if (value === 'UNL') {
                  that.rewrdGrid.dataSource.setRowValue(this.row, 'winngLimitQty', null)
                }
              },
              onInputWinngLimitQty(value) {
                that.rewrdGrid.dataSource.setRowValue(this.row, 'winngLimitQty', value)
              },
            },
          },
          width: 270,
        },
      ]
    },
    initializeParams() {
      if (utils.isEmpty(this.eventId)) {
        // INSERT
        for (let i = 0; i < 6; i += 1) {
          this.rewrdGrid.dataSource.addRow(this.rewrdGrid.defaultRowData)
        }
      } else {
        // UPDATE
        this.eventSubData = utils.assign(this.eventSubData, this.eventData)
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
    isValid() {
      if (!(this.isValidCondInfo()
         && this.isValidImagInfo()
         && this.isValidRewrdInfo())) {
        return false
      }
      this.adjustRewrdList()
      return true
    },
    isValidCondInfo() {
      // 조건 정보
      if (utils.isEmpty(this.eventSubData.subtrctPointAmt)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXHAUST_SOM'))) // {소진 솜}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.eventSubData.partcpPeriodCd)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PARTCP_OPPR'))) // {참여 기회}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.eventSubData.partcpAvailCnt)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PARTCP_OPPR'))) // {참여 기회}은(는) 필수 항목입니다.
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
      if (utils.isEmpty(this.eventSubData.eventRolet.bkgrdImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_DETAIL_BKGRD_IMAG'))) // {상세 배경 이미지}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.eventSubData.eventRolet.pnlImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PNL_IMAG'))) // {패널 이미지}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.eventSubData.eventRolet.ndlImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_NDL_IMAG'))) // {기준침 이미지}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.eventSubData.eventRolet.startImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_START_BTN_IMAG'))) // {시작 버튼 이미지}은(는) 필수 항목입니다.
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
        if (rewrdList[i].rewrdKindCd !== '99' && utils.isEmpty(rewrdList[i].rewrdName)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_GVWY_NAME'))) // {경품 명}은(는) 필수 항목입니다.
          return false
        }
        if (rewrdList[i].rewrdKindCd === '01' && utils.isEmpty(rewrdList[i].couponMasterId)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PAYMNT_COUPON'))) // {지급 쿠폰}은(는) 필수 항목입니다.
          return false
        }
        if (rewrdList[i].rewrdKindCd !== '99' && utils.isEmpty(rewrdList[i].rewrdQtyLimitYn)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_QTY'))) // {수량}은(는) 필수 항목입니다.
          return false
        }
        if (rewrdList[i].rewrdQtyLimitYn === 'Y' && utils.isEmpty(rewrdList[i].rewrdQty)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_QTY'))) // {수량}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(rewrdList[i].winngRate)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PERCENTAGE'))) // {확률}은(는) 필수 항목입니다.
          return false
        }
        if (!this.isValidWinngLimitInfo(rewrdList[i])) {
          return false
        }
      }

      const winngRates = rewrdList.map(rewrd => rewrd.winngRate)
      const winngRateSum = winngRates.reduce((acc, cur) => Number((acc + parseFloat(cur)).toFixed(2)), 0) // 2023.12.22 yeonjin 소수점 2자리 처리
      if (winngRateSum !== 100.0) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ROLET_WINNG_RATE_SUM_MUST_100'), winngRateSum)) // 확률의 합은 100으로 설정되어야 합니다. (현재 : {0})
        return false
      }
      return true
    },
    isValidWinngLimitInfo(rewrd) {
      if (rewrd.rewrdKindCd !== '99') {
        if (utils.isEmpty(rewrd.winngLimitPeriodCd)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_WINNG_LIMIT'))) // {당첨 제한}은(는) 필수 항목입니다.
          return false
        }
        if (rewrd.winngLimitPeriodCd !== 'UNL' && utils.isEmpty(rewrd.winngLimitQty)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_WINNG_LIMIT'))) // {당첨 제한}은(는) 필수 항목입니다.
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
        const { updated } = this.rewrdGrid.dataSource.getChanged()
        this.eventSubData.eventRewrdList = {
          update: updated,
        }
      }
    },
  },
}
</script>
<style scoped>
</style>
