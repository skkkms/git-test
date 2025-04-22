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
        <ur-text-field
          v-model="eventSubData.partcpAvailCnt"
          style="width: 200px;"
          mask="number"
          maxlength="4"
          @keyup="eventSubData.partcpAvailCnt = parseInt(eventSubData.partcpAvailCnt, 10)"
        /> <span style="margin-left: 5px">{{ $t('MSG_TXT_NUMBER_OF_TIMES') }}</span> <!-- 회 -->
      </ur-form-item>
    </ur-form-box>
    <!-- E:: 조건정보 -->

    <!-- S:: 이벤트 상세 정보 -->
    <!-- S:: 타이틀 버튼 양쪽 -->
    <div class="comm_btn_wrap">
      <div class="comm_title_wrap">
        <h4>
          {{ $t('MSG_TXT_EVENT_DETAIL_INFO') }} <!-- 이벤트 상세 정보 -->
        </h4>
      </div>
      <div class="left_box pl16">
        <ur-button
          color="violet"
          @click="onClickAddQuiz"
        >
          {{ $t('MSG_BTN_ADD') }} <!-- 추가 -->
        </ur-button>
        <ur-button
          color="violet"
          @click="onClickDeleteQuiz"
        >
          {{ $t('MSG_BTN_DEL') }}  <!-- 삭제 -->
        </ur-button>
        <ur-button
          color="violet"
          @click="onClickResetOxQuiz"
        >
          {{ $t('MSG_BTN_INTL') }} <!-- 초기화 -->
        </ur-button>
      </div>
      <div class="right_box">
        <span
          v-permission:create="pageId"
          class="guid_txt mr16"
        >
          {{ excelUploadSizeLimitDesc }}
        </span>
        <ur-button
          v-permission:excel="pageId"
          @click="onClickExcelFormDownload"
        >
          <ur-icon
            icon="download"
            icon-type="line"
            size="small"
            spacing
          />
          {{ $t('MSG_BTN_EXCEL_FORM_DOWNLOAD') }} <!-- 엑셀 양식 다운로드 -->
        </ur-button>
        <ur-button
          v-permission:create="pageId"
          @click="onClickExcelUpload"
        >
          <ur-icon
            icon="upload"
            icon-type="line"
            size="small"
            spacing
          />
          {{ $t('MSG_TXT_EXCEL_UPLOAD') }} <!-- 엑셀업로드 -->
        </ur-button>
      </div>
    </div>
    <!-- E:: 타이틀 버튼 양쪽 -->
    <ur-data-grid
      ref="oxQuizGrid"
      :headers="oxQuizGrid.headers"
      :data-source="oxQuizGrid.dataSource"
      :options="oxQuizGrid.options"
      :data-set-options="{id: 'id'}"
    />
    <!-- E:: 이벤트 상세 정보 -->

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
          v-model="eventSubData.bannerImagUrl"
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
                  v-model="eventSubData.bannerImagAltDesc"
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

    <!-- S:: Invisible -->
    <input
      v-show="false"
      ref="oxQuizFile"
      type="file"
      accept=".xlsx"
      @change="onChangeOxQuizFile"
    >
    <!-- E:: Invisible -->
  </div>
</template>
<script>
import { urDataSet } from 'uidev-component'
import CommonUtils from '~aa/js/common-utils'
import EventGridColumnMixin from '~aa/pages/G/mixins/EventGridColumnMixin'
import CouponMixin from '~aa/pages/X/mixins/CouponMixin'

export default {
  name: 'PGE_AAG_00012_S01', // eslint-disable-line vue/name-property-casing
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
        COD_IA_OX: [{ value: 'O', text: 'O' }, { value: 'X', text: 'X' }],
        COD_IA_YN: [{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],
      },
      eventSubData: {
        // Single
        exposrCondCd: '01', // 노출조건코드(default: 전체('01'))
        subtrctPointAmt: null, // 차감포인트금액
        partcpAvailCnt: '1', // 참여가능건수(default: '1')
        thumbnailImagUrl: null, // 썸네일이미지URL
        thumbnailImagAltDesc: null, // 썸네일이미지ALT내용
        bannerImagUrl: null, // 배너이미지URL
        bannerImagAltDesc: null, // 배너이미지ALT내용
        // Multi
        eventPartcpCondList: { // 참여조건목록
          insert: [],
          update: [],
          delete: [],
        },
        eventOxQuizList: { // 이벤트OX퀴즈목록
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
      eventOxQuizList: [], // 이벤트OX퀴즈목록
      eventRewrdList: [], // 이벤트보상목록
      eventPartcpCondListDesc: null, // 참여조건목록설명
      oxQuizGrid: {
        headers: [],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        options: {
          height: 282, // 282(5), 522(10), 762(15), 1482(30)
          noInfo: true,
          selectCheck: true,
          selectCheckOnly: true,
          multiSelect: true,
          msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
        },
        defaultRowData: {
          eventId: null, // 이벤트ID
          quizSeq: null, // 퀴즈순번
          quizDesc: null, // 퀴즈내용
          rightAnswrValue: null, // 정답값
          useYn: null, // 사용여부
          useStartDate: null, // 사용시작일자
          useEndDate: null, // 사용종료일자
        },
      },
      rewrdGrid: {
        headers: [],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        options: {
          height: 90, // 282(5), 522(10), 762(15), 1482(30)
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
        },
      },
    }
  },
  computed: {
    excelUploadSizeLimitDesc() {
      return utils.strFormat(this.$t('MSG_TXT_FILE_SIZE_UNDER_A'), '5MB') // *파일 용량 : {5MB} 미만
    },
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
      // OX퀴즈 보상 구분에서는 꽝을 사용하지 않음
      this.codes.COD_IA_EVENT_REWARD_KIND = this.codes.COD_IA_EVENT_REWARD_KIND.filter(item => item.value !== '99')
      this.initializeHeaders(this)
      this.initializeParams()
    })
  },
  methods: {
    initializeHeaders(that) {
      this.oxQuizGrid.headers = [
        {
          text: this.$t('MSG_TXT_NUMBER_ROW'), // No.
          customValue: (v, r) => r.__idx + 1, // eslint-disable-line no-underscore-dangle
          width: 50,
        },
        { hide: true, value: 'eventId' },
        { hide: true, value: 'quizSeq' },
        {
          text: this.$t('MSG_TXT_QUESTION'), // 문항
          value: 'quizDesc',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-text-field
                  v-model="row.quizDesc"
                  class="pr10"
                  style="width: 100%"
                  maxlength="250"
                  @input="onInputQuizDesc" />
              </div>`,
            methods: {
              onInputQuizDesc(value) {
                that.oxQuizGrid.dataSource.setRowValue(this.row, 'quizDesc', value)
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_RIGHT_ANSWR'), // 정답
          value: 'rightAnswrValue',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-radio-wrapper
                  v-model="row.rightAnswrValue"
                  :items="codes.COD_IA_YN"
                  small
                  @input="onInputRightAnswrValue"
                >
                  <template v-for="item in codes.COD_IA_OX">
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
              onInputRightAnswrValue(value) {
                that.oxQuizGrid.dataSource.setRowValue(this.row, 'rightAnswrValue', value)
              },
            },
          },
          width: 120,
        },
        {
          text: this.$t('MSG_TXT_USE_YN'), // 사용 여부
          value: 'useYn',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-radio-wrapper
                  v-model="row.useYn"
                  :items="codes.COD_IA_YN"
                  small
                  @input="onInputUseYn"
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
              onInputUseYn(value) {
                that.oxQuizGrid.dataSource.setRowValue(this.row, 'useYn', value)
              },
            },
          },
          width: 120,
        },
        { hide: true, value: 'useStartDate' },
        { hide: true, value: 'useEndDate' },
        {
          text: this.$t('MSG_TXT_USE_PRD'), // 사용 기간
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            data() {
              return {
                usePeriods: [],
                minUseStartDate: null,
              }
            },
            template: `
              <div>
                <ur-range-picker
                  v-model="usePeriods"
                  input-type="YYYY-MM-DD"
                  model-type="YYYYMMDD"
                  :confirm-label="$t('MSG_BTN_SELT')"
                  :min-date="minUseStartDate"
                  @input="onInputUsePeriods"
                />
              </div>`,
            watch: {
              'row.useStartDate': {
                handler(value) {
                  this.usePeriods = [value, this.row.useEndDate]
                },
              },
              'row.useEndDate': {
                handler(value) {
                  this.usePeriods = [this.row.useStartDate, value]
                },
              },
            },
            mounted() {
              this.usePeriods = [this.row.useStartDate, this.row.useEndDate]
              if (this.row.useStartDate) {
                this.minUseStartDate = CommonUtils.getMinDateWithToday(this.row.useStartDate, 'YYYYMMDD')
              } else {
                this.minUseStartDate = utils.now('YYYY-MM-DD')
              }
            },
            methods: {
              onInputUsePeriods(value) {
                const useStartDate = value.at(0)
                const useEndDate = value.at(1)
                if (useStartDate !== this.row.useStartDate
                    || useEndDate !== this.row.useEndDate) {
                  that.oxQuizGrid.dataSource.setRowValue(this.row, 'useStartDate', useStartDate)
                  that.oxQuizGrid.dataSource.setRowValue(this.row, 'useEndDate', useEndDate)
                }
              },
            },
          },
          width: 350,
        },
      ]

      this.rewrdGrid.headers = [
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
        this.onClickAddQuiz()
        this.rewrdGrid.dataSource.addRow(this.rewrdGrid.defaultRowData)
      } else {
        // UPDATE
        this.eventSubData = utils.assign(this.eventSubData, this.eventData)
        this.selectEventPartcpCondList()
        this.selectEventOxQuizList()
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
    selectEventOxQuizList() {
      http.request(this.pageId, 'DTS_AAG_00008', {
        path: {
          'event-id': this.eventId,
        },
      }).then(res => {
        this.eventOxQuizList = res.data
        this.$refs.oxQuizGrid.setData(this.eventOxQuizList)
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
    onClickAddQuiz() {
      this.oxQuizGrid.dataSource.addRow(this.oxQuizGrid.defaultRowData)
    },
    onClickDeleteQuiz() {
      const rows = this.$refs.oxQuizGrid.getSelected()
      rows.forEach(row => {
        this.$refs.oxQuizGrid.removeRow(row, false)
      })
    },
    onClickResetOxQuiz() {
      const rows = this.$refs.oxQuizGrid.getData()
      rows.forEach(row => {
        this.$refs.oxQuizGrid.removeRow(row, false)
      })
      this.onClickAddQuiz()
    },
    onClickExcelFormDownload() {
      const pageMeta = this.$store.getters.getPageMeta(this.pageId)
      const pageName = this.$t(pageMeta.pageInfo.pageTitleMessageResourceId)
      const sToday = utils.now('YYYYMMDDHHmmss')

      const { pageId } = this
      const columns = [
        {
          text: this.$t('MSG_TXT_QUESTION'), // 문항
          type: 'text',
          width: 100,
        },
        {
          text: this.$t('MSG_TXT_RIGHT_ANSWR'), // 정답
          type: 'code',
          domain: this.codes.COD_IA_OX,
          memo: {
            text: this.$t('MSG_TXT_SELT'), // 선택
          },
          width: 12,
        },
        {
          text: this.$t('MSG_TXT_USE_YN'), // 사용 여부
          type: 'code',
          domain: this.codes.COD_IA_YN,
          memo: {
            text: this.$t('MSG_TXT_SELT'), // 선택
          },
          width: 12,
        },
        {
          text: this.$t('MSG_TXT_USE_PERIOD_FROM'), // 사용 기간 FROM
          type: 'text',
          memo: {
            text: 'YYYYMMDD',
          },
          width: 20,
        },
        {
          text: this.$t('MSG_TXT_USE_PERIOD_TO'), // 사용 기간 TO
          type: 'text',
          memo: {
            text: 'YYYYMMDD',
          },
          width: 20,
        },
      ]
      const excelFileName = `${pageName}_${sToday}.xlsx`
      CommonUtils.downloadExcelForm(pageId, columns, excelFileName)
    },
    onClickExcelUpload() {
      this.$refs.oxQuizFile.value = null
      this.$refs.oxQuizFile.click()
    },
    isValid() {
      if (!(this.isValidCondInfo()
         && this.isValidDetailInfo()
         && this.isValidImagInfo()
         && this.isValidRewrdInfo())) {
        return false
      }
      this.adjustEventOxQuizList()
      this.adjustEventRewrdList()
      return true
    },
    isValidCondInfo() {
      // 조건 정보
      if (utils.isEmpty(this.eventSubData.subtrctPointAmt)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXHAUST_SOM'))) // {소진 솜}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.eventSubData.partcpAvailCnt)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_PARTCP_OPPR'))) // {참여 기회}은(는) 필수 항목입니다.
        return false
      }
      return true
    },
    isValidDetailInfo() {
      // 이벤트 상세 정보
      const oxQuizList = this.oxQuizGrid.dataSource.data
      for (let i = 0; i < oxQuizList.length; i += 1) {
        if (utils.isEmpty(oxQuizList[i].quizDesc)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_QUESTION'))) // {문항}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(oxQuizList[i].rightAnswrValue)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_RIGHT_ANSWR'))) // {정답}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(oxQuizList[i].useYn)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_USE_YN'))) // {사용 여부}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(oxQuizList[i].useStartDate) || utils.isEmpty(oxQuizList[i].useEndDate)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_USE_PRD'))) // {사용 기간}은(는) 필수 항목입니다.
          return false
        }
      }
      return true
    },
    isValidImagInfo() {
      // 이벤트 이미지 정보
      if (utils.isEmpty(this.eventSubData.thumbnailImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_THUMBNAIL_IMAG'))) // {썸네일 이미지}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.eventSubData.bannerImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_DETAIL_BANNER_IMAG'))) // {상세 배너 이미지}은(는) 필수 항목입니다.
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
        if (rewrdList[i].rewrdKindCd === '01' && utils.isEmpty(rewrdList[i].couponMasterId)) {
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
    adjustEventOxQuizList() {
      if (utils.isEmpty(this.eventId)) {
        // INSERT
        this.eventSubData.eventOxQuizList.insert = this.oxQuizGrid.dataSource.data
      } else {
        // UPDATE
        const { data } = this.oxQuizGrid.dataSource
        const { updated, removed } = this.oxQuizGrid.dataSource.getChanged()

        const insertList = data.filter(item => utils.isEmpty(item.eventId))
        const deleteList = removed.filter(item => !utils.isEmpty(item.eventId))
        const updateList = updated.filter(item => {
          const map = deleteList.map(d => d.quizSeq)
          return !map.includes(item.quizSeq)
        })

        this.eventSubData.eventOxQuizList = {
          insert: insertList,
          update: updateList,
          delete: deleteList,
        }
      }
    },
    adjustEventRewrdList() {
      if (utils.isEmpty(this.eventId)) {
        // INSERT
        this.eventSubData.eventRewrdList.insert = this.rewrdGrid.dataSource.data
      } else {
        // UPDATE
        const { updated } = this.rewrdGrid.dataSource.getChanged()
        this.eventSubData.eventRewrdList.update = updated
      }
    },
    onChangeOxQuizFile(event) {
      const { files } = event.target
      if (!_.isEmpty(files)) {
        const file = files[0]

        const fileName = file.name
        const index = fileName.lastIndexOf('.')
        const exts = fileName.slice(index + 1).toLowerCase()
        if (index > 0 && exts !== 'xlsx') {
          // 허용 가능한 확장자("{xlsx}")의 파일을 추가하시기 바랍니다.
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_ADD_NCELL_EXTS_FILE'), 'xlsx'))
          return
        }

        const fileSize = file.size
        if (fileSize > 5242880) {
          // 허용 가능한 용량("{5MB}") 미만의 파일을 추가하시기 바랍니다.
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_TXT_ALT_ALLOWED_MAX_FILE_SIZE'), '5MB'))
          return
        }

        const formData = new FormData()
        formData.append('file', file)
        http.request(this.pageId, 'DTS_AAG_00010', {
          data: formData,
        }).then(res => {
          for (let i = 0; i < res.data.length; i += 1) {
            this.oxQuizGrid.dataSource.addRow(res.data[i])
          }
        })
      }
    },
  },
}
</script>
<style scoped>
</style>
