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
          :page-id="this.$options.name"
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
          :page-id="this.$options.name"
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
      <!-- 스탬프 배경 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_STMP_BKGRD_IMAG')"
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          ref="stmpBkgrdImag"
          v-model="eventSubData.eventStmp.stmpBkgrdImagUrl"
          upload-target="EVT001"
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
                  v-model="eventSubData.eventStmp.stmpBkgrdImagAltDesc"
                  style="width: 100%; height: auto;"
                  maxlength="100"
                  :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                />
              </div>
            </div>
          </template>
        </cmp-single-file-uploader>
      </ur-form-item>
      <!-- 스탬프 보상 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_STMP_REWRD_IMAG')"
        required
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          ref="stmpRewrdImag"
          v-model="eventSubData.eventStmp.stmpRewrdImagUrl"
          upload-target="EVT001"
          accepts="jpg,png,gif"
          pixels="192*192"
          preview-mode="BELOW"
          show-guidance
          :page-id="this.$options.name"
        >
          <template>
            <div class="col_img_wrap">
              <div class="col_item_img">
                <ur-text-field
                  v-model="eventSubData.eventStmp.stmpRewrdImagAltDesc"
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
          ref="bannerImag"
          v-model="eventSubData.eventStmp.stmpInactivImagUrl"
          upload-target="EVT001"
          accepts="jpg,png,gif"
          pixels="192*192"
          preview-mode="BELOW"
          show-guidance
          :page-id="this.$options.name"
        >
          <template>
            <div class="col_img_wrap">
              <div class="col_item_img">
                <ur-text-field
                  v-model="eventSubData.eventStmp.stmpInactivImagAltDesc"
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
          ref="bannerImag"
          v-model="eventSubData.eventStmp.stmpActivImagUrl"
          upload-target="EVT001"
          accepts="jpg,png,gif"
          pixels="192*192"
          preview-mode="BELOW"
          show-guidance
          :page-id="this.$options.name"
        >
          <template>
            <div class="col_img_wrap">
              <div class="col_item_img">
                <ur-text-field
                  v-model="eventSubData.eventStmp.stmpActivImagAltDesc"
                  style="width: 100%; height: auto;"
                  maxlength="100"
                  :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                />
              </div>
            </div>
          </template>
        </cmp-single-file-uploader>
      </ur-form-item>
      <!-- 스페셜 스탬프 이미지 -->
      <ur-form-item
        :label="$t('MSG_TXT_SPECIAL_STMP_IMAG')"
        required
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          ref="thumbnailImag"
          v-model="eventSubData.eventStmp.spcialStmpImagUrl"
          upload-target="EVT001"
          accepts="jpg,png,gif"
          pixels="192*192"
          preview-mode="BELOW"
          show-guidance
          :page-id="this.$options.name"
        >
          <template>
            <div class="col_img_wrap">
              <div class="col_item_img">
                <ur-text-field
                  v-model="eventSubData.eventStmp.spcialStmpImagAltDesc"
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
      <div class="left_box pl16">
        <ur-button
          color="violet"
          @click="onClickAddStmp"
        >
          {{ $t('MSG_BTN_ADD') }} <!-- 추가 -->
        </ur-button>
        <ur-button
          color="violet"
          @click="onClickDeleteStmp"
        >
          {{ $t('MSG_BTN_DEL') }}  <!-- 삭제 -->
        </ur-button>
        <ur-button
          color="violet"
          @click="onClickResetStmp"
        >
          {{ $t('MSG_BTN_INTL') }} <!-- 초기화 -->
        </ur-button>
      </div>
    </div>
    <ur-data-grid
      ref="stmpDetailGrid"
      :headers="stmpDetailGrid.headers"
      :data-source="stmpDetailGrid.dataSource"
      :options="stmpDetailGrid.options"
      :data-set-options="{id: 'id'}"
    />
    <!-- E:: 스탬프 이벤트 상세 정보 -->

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
import EventGridColumnMixin from '~aa/pages/G/mixins/EventGridColumnMixin'
import CouponMixin from '~aa/pages/X/mixins/CouponMixin'

export default {
  name: 'PGE_AAG_00012_S02', // eslint-disable-line vue/name-property-casing
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
        thumbnailImagUrl: null, // 썸네일이미지URL
        thumbnailImagAltDesc: null, // 썸네일이미지ALT내용
        bannerImagUrl: null, // 배너이미지URL
        bannerImagAltDesc: null, // 배너이미지ALT내용
        eventStmp: {
          stmpBkgrdImagUrl: null, // 스탬프배경이미지URL
          stmpBkgrdImagAltDesc: null, // 스탬프배경이미지ALT내용
          stmpRewrdImagUrl: null, // 스탬프보상이미지URL
          stmpRewrdImagAltDesc: null, // 스탬프보상이미지ALT내용
          stmpInactivImagUrl: null, // 스탬프비활성이미지URL
          stmpInactivImagAltDesc: null, // 스탬프비활성이미지ALT내용
          stmpActivImagUrl: null, // 스탬프활성이미지URL
          stmpActivImagAltDesc: null, // 스탬프활성이미지ALT내용
          spcialStmpImagUrl: null, // 특별스탬프이미지URL
          spcialStmpImagAltDesc: null, // 특별스탬프이미지ALT내용
        },
        // Multi
        eventPartcpCondList: { // 참여조건목록
          insert: [],
          update: [],
          delete: [],
        },
        eventStmpDetailList: { // 이벤트스탬프상세목록
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
      eventStmpDetailList: [], // 이벤트스탬프상세목록
      eventRewrdList: [], // 이벤트보상목록
      eventPartcpCondListDesc: null, // 참여조건목록설명
      stmpDetailGrid: {
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
          stmpSeq: null, // 스탬프순번
          stmpNo: null, // 스탬프번호
          spcialStmpYn: 'N', // 특별스탬프여부(default: 'N')
          stmpName: null, // 스탬프명
          attainCondName: null, // 달성조건명
          attainCondClassCd: null, // 달성조건분류코드
          attainCondItemCd1: null, // 달성조건항목코드1
          attainCondItemCd2: null, // 달성조건항목코드2
          attainCondBaseCd: null, // 달성조건기준코드
          attainCondValue: null, // 달성조건값
        },
      },
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
    http.mergeCodeList(this.pageId, this.codeKeys, this.codes).then(() => {
      // 스탬프 보상 구분에서는 꽝을 사용하지 않음
      this.codes.COD_IA_EVENT_REWARD_KIND = this.codes.COD_IA_EVENT_REWARD_KIND.filter(item => item.value !== '99')
      this.initializeHeaders(this)
      this.initializeParams()
    })
  },
  methods: {
    initializeHeaders(that) {
      this.stmpDetailGrid.headers = [
        {
          text: this.$t('MSG_TXT_NUMBER_ROW'), // No.
          customValue: (v, r) => r.__idx + 1, // eslint-disable-line no-underscore-dangle
          width: 50,
        },
        { hide: true, value: 'eventId' },
        { hide: true, value: 'stmpSeq' },
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
            watch: {
              // (row.__idx + 1)를 (stmpNo)로 설정하는 부분
              'row.__idx': {
                immediate: true,
                deep: true,
                handler(value) {
                  const stmpNo = value + 1
                  if (stmpNo && this.row.stmpNo !== stmpNo) {
                    that.stmpDetailGrid.dataSource.setRowValue(this.row, 'stmpNo', stmpNo)
                  }
                },
              },
            },
            methods: {
              onInputSpcialStmpYn(value) {
                that.stmpDetailGrid.dataSource.setRowValue(this.row, 'spcialStmpYn', value)
              },
            },
          },
          width: 150,
        },
        {
          text: this.$t('MSG_TXT_ITEM_NAME'), // 항목 명
          required: true,
          value: 'stmpName',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-text-field
                  class="pr10"
                  v-model="row.stmpName"
                  style="width: 100%"
                  @input="onInputStmpName"
                />
              </div>`,
            methods: {
              onInputStmpName(value) {
                that.stmpDetailGrid.dataSource.setRowValue(this.row, 'stmpName', value)
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_ATTAIN_COND'), // 달성 조건
          value: 'value',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-text-field
                  v-model="row.attainCondName"
                  readonly
                  style="width: 100%"
                />
                <ur-icon-button
                  icon="search"
                  icon-type="line"
                  color="primary"
                  style="margin-left: 10px"
                  @click="onClickAttainCondSearch"
                />
              </div>`,
            methods: {
              onClickAttainCondSearch() {
                utils.openLayerPopup('PGE_AAG_00016', this.onCloseAttainCondPopup, {
                  pageInitialData: {
                    data: {
                      attainCondClassCd: this.row.attainCondClassCd,
                      attainCondItemCd1: this.row.attainCondItemCd1,
                      attainCondItemCd2: this.row.attainCondItemCd2,
                      attainCondBaseCd: this.row.attainCondBaseCd,
                      attainCondValue: this.row.attainCondValue,
                    },
                  },
                  size: 'xlg',
                })
              },
              onCloseAttainCondPopup(data = null) {
                if (data) {
                  that.stmpDetailGrid.dataSource.setRowValue(this.row, 'attainCondName', data.attainCondName)
                  that.stmpDetailGrid.dataSource.setRowValue(this.row, 'attainCondClassCd', data.attainCondClassCd)
                  that.stmpDetailGrid.dataSource.setRowValue(this.row, 'attainCondItemCd1', data.attainCondItemCd1)
                  that.stmpDetailGrid.dataSource.setRowValue(this.row, 'attainCondItemCd2', data.attainCondItemCd2)
                  that.stmpDetailGrid.dataSource.setRowValue(this.row, 'attainCondBaseCd', data.attainCondBaseCd)
                  that.stmpDetailGrid.dataSource.setRowValue(this.row, 'attainCondValue', data.attainCondValue)
                }
              },
            },
          },
        },
        { hide: true, value: 'attainCondItemCd1' },
        { hide: true, value: 'attainCondItemCd2' },
        { hide: true, value: 'attainCondBaseCd' },
        { hide: true, value: 'attainCondValue' },
      ]

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
        {
          text: this.$t('MSG_TXT_REWRD_COND'), // 보상 조건
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div
                style="align-items: center"
              >
                <ur-text-field
                  v-model="row.rewrdCondValue"
                  style="width: 100px"
                  mask="number"
                  maxlength="2"
                  @keyup="row.rewrdCondValue = parseInt(row.rewrdCondValue, 10)"
                  @input="onInputRewrdCondValue"
                /> <span style="margin-left: 5px">{{ $t('MSG_TXT_NUMBER_OF_ATTAIN_COUNT') }}</span> <!-- 개 달성 -->
              </div>`,
            methods: {
              onInputRewrdCondValue(value) {
                that.rewrdGrid.dataSource.setRowValue(this.row, 'rewrdCondValue', value)
              },
            },
          },
          width: 180,
        },
      ]
    },
    initializeParams() {
      if (utils.isEmpty(this.eventId)) {
        // INSERT
        this.onClickAddStmp()
        this.onClickAddRewrd()
      } else {
        // UPDATE
        this.eventSubData = utils.assign(this.eventSubData, this.eventData)
        this.selectEventPartcpCondList()
        this.selectEventStmpDetailList()
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
    selectEventStmpDetailList() {
      http.request(this.pageId, 'DTS_AAG_00009', {
        path: {
          'event-id': this.eventId,
        },
      }).then(res => {
        this.eventStmpDetailList = res.data
        this.$refs.stmpDetailGrid.setData(this.eventStmpDetailList)
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
    onClickAddStmp() {
      const stmpDetailList = this.$refs.stmpDetailGrid.getData()
      const stmpDetailCount = parseInt(stmpDetailList.length, 10) || 0
      if (stmpDetailCount >= 12) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_PSBL_MAX_CNT_DATA'), this.$t('MSG_TXT_STMP_EVENT_DETAIL_INFO'), '12')) // {스탬프 이벤트 상세 정보}은(는) {12}개까지 가능합니다.
        return
      }

      const addCount = Math.min(3, (12 - stmpDetailCount))
      for (let i = 0; i < addCount; i += 1) {
        this.stmpDetailGrid.dataSource.addRow(this.stmpDetailGrid.defaultRowData)
      }
    },
    onClickDeleteStmp() {
      const rows = this.$refs.stmpDetailGrid.getSelected()
      if (rows.length % 3 !== 0) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_TXT_STAMP_DEL_REGULATION'), '3')) // 스탬프 삭제는 {3}개 단위로 가능합니다.
        return
      }

      rows.forEach(row => {
        this.$refs.stmpDetailGrid.removeRow(row, false)
      })
    },
    onClickResetStmp() {
      const rows = this.$refs.stmpDetailGrid.getData()
      rows.forEach(row => {
        this.$refs.stmpDetailGrid.removeRow(row, false)
      })
      this.onClickAddStmp()
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
      if (!(this.isValidImagInfo()
         && this.isValidDetailInfo()
         && this.isValidRewrdInfo())) {
        return false
      }
      this.adjustEventStmpDetailList()
      this.adjustEventRewrdList()
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
      if (utils.isEmpty(this.eventSubData.eventStmp.stmpRewrdImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_STMP_REWRD_IMAG'))) // {스탬프 보상 이미지}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.eventSubData.eventStmp.stmpInactivImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_STMP_INACTIVATED_IMAG'))) // {스탬프 비활성화 이미지}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.eventSubData.eventStmp.stmpActivImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_STMP_ACTIVATED_IMAG'))) // {스탬프 활성화 이미지}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.eventSubData.eventStmp.spcialStmpImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_SPECIAL_STMP_IMAG'))) // {스페셜 스탬프 이미지}은(는) 필수 항목입니다.
        return false
      }
      return true
    },
    isValidDetailInfo() {
      // 이벤트 상세 정보
      const stmpDetailList = this.stmpDetailGrid.dataSource.data
      for (let i = 0; i < stmpDetailList.length; i += 1) {
        if (utils.isEmpty(stmpDetailList[i].spcialStmpYn)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_SPECIAL_STMP_YN'))) // {스페셜 스탬프 여부}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(stmpDetailList[i].stmpName)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_ITEM_NAME'))) // {항목 명}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(stmpDetailList[i].attainCondName)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_ATTAIN_COND'))) // {달성 조건}은(는) 필수 항목입니다.
          return false
        }
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
        if (utils.isEmpty(rewrdList[i].rewrdCondValue)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_REWRD_COND'))) // {보상 조건}은(는) 필수 항목입니다.
          return false
        }
      }
      return true
    },
    adjustEventStmpDetailList() {
      if (utils.isEmpty(this.eventId)) {
        // INSERT
        this.eventSubData.eventStmpDetailList.insert = this.stmpDetailGrid.dataSource.data
      } else {
        // UPDATE
        const { data } = this.stmpDetailGrid.dataSource
        const { updated, removed } = this.stmpDetailGrid.dataSource.getChanged()

        const insertList = data.filter(item => utils.isEmpty(item.eventId))
        const deleteList = removed.filter(item => !utils.isEmpty(item.eventId))
        const updateList = updated.filter(item => {
          const map = deleteList.map(d => d.stmpSeq)
          return !map.includes(item.stmpSeq)
        })

        this.eventSubData.eventStmpDetailList = {
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
<style scoped>
</style>
