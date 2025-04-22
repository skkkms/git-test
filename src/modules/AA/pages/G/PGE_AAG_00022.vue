<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S:: 노출 정보 -->
      <div class="comm_title_wrap">
        <h4>
          {{ $t('MSG_TXT_EXPOSR_INFO') }} <!-- 노출 정보 -->
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
            v-model="missionData.eventName"
            style="width: 100%;"
            maxlength="150"
          />
        </ur-form-item>
        <!-- 이벤트 기간 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_PERIOD')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
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
          style="width: 100%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="missionData.exposrYn"
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
        <!-- 미션 상세 배너 이미지 -->
        <ur-form-item
          :label="$t('MSG_TXT_MISSION_DETAIL_BANNER_IMAG')"
          required
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            ref="bannerImagUrl"
            v-model="missionData.bannerImagUrl"
            upload-target="EVT002"
            accepts="jpg,png,gif"
            pixels="624*224"
            preview-mode="BELOW"
            show-guidance
            :page-id="this.$options.name"
          >
            <template>
              <div class="col_img_wrap">
                <div class="col_item_img">
                  <ur-text-field
                    v-model="missionData.bannerImagAltDesc"
                    style="width: 100%; height: auto;"
                    maxlength="100"
                    :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                  />
                </div>
              </div>
            </template>
          </cmp-single-file-uploader>
        </ur-form-item>
        <!-- 뱃지 상세 배너 이미지 -->
        <ur-form-item
          :label="$t('MSG_TXT_BADGE_DETAIL_BANNER_IMAG')"
          required
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            ref="badgeBannerImagUrl"
            v-model="missionData.badgeBannerImagUrl"
            upload-target="EVT002"
            accepts="jpg,png,gif"
            pixels="624*224"
            preview-mode="BELOW"
            show-guidance
            :page-id="this.$options.name"
          >
            <template>
              <div class="col_img_wrap">
                <div class="col_item_img">
                  <ur-text-field
                    v-model="missionData.badgeBannerImagAltDesc"
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
      <!-- E:: 노출 정보 -->

      <!-- S:: 미션 정보 -->
      <!-- S:: 타이틀 버튼 양쪽 -->
      <div class="comm_btn_wrap">
        <div class="comm_title_wrap">
          <h4>
            {{ $t('MSG_TXT_MISSION_INFO') }} <!-- 미션 정보 -->
          </h4>
        </div>
        <div class="left_box pl16">
          <ur-button
            color="violet"
            @click="onClickAddDetail"
          >
            {{ $t('MSG_BTN_ADD') }} <!-- 추가 -->
          </ur-button>
          <ur-button
            color="violet"
            @click="onClickDeleteDetail"
          >
            {{ $t('MSG_BTN_DEL') }}  <!-- 삭제 -->
          </ur-button>
          <ur-button
            color="violet"
            @click="onClickResetDetail"
          >
            {{ $t('MSG_BTN_INTL') }} <!-- 초기화 -->
          </ur-button>
        </div>
        <div class="right_box">
          <span
            v-permission:create="this.$options.name"
            class="guid_txt mr16"
          >
            {{ excelUploadSizeLimitDesc }}
          </span>
          <ur-button
            v-permission:excel="this.$options.name"
            @click="onClickDetailExcelFormDownload"
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
            v-permission:create="this.$options.name"
            @click="onClickDetailExcelUpload"
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
        ref="detailGrid"
        :headers="detailGrid.headers"
        :data-source="detailGrid.dataSource"
        :options="detailGrid.options"
        :data-set-options="{id: 'id'}"
      />
      <!-- E:: 미션 정보 -->

      <!-- S:: 보상 정보(배지) -->
      <div class="comm_btn_wrap">
        <div class="comm_title_wrap">
          <h4>
            {{ $t('MSG_TXT_REWRD_INFO') }} <!-- 보상 정보 -->
          </h4>
        </div>
        <div class="left_box pl16">
          <ur-button
            color="violet"
            @click="onClickAddBadgeRewrd"
          >
            {{ $t('MSG_BTN_ADD') }} <!-- 추가 -->
          </ur-button>
          <ur-button
            color="violet"
            @click="onClickDeleteBadgeRewrd"
          >
            {{ $t('MSG_BTN_DEL') }}  <!-- 삭제 -->
          </ur-button>
          <ur-button
            color="violet"
            @click="onClickResetBadgeRewrd"
          >
            {{ $t('MSG_BTN_INTL') }} <!-- 초기화 -->
          </ur-button>
          <span class="guid_txt">
            {{ badgeImagUploadGuideDesc }}
          </span>
        </div>
        <div class="right_box">
          <span
            v-permission:create="this.$options.name"
            class="guid_txt mr16"
          >
            {{ excelUploadSizeLimitDesc }}
          </span>
          <ur-button
            v-permission:excel="this.$options.name"
            @click="onClickBadgeRewrdExcelFormDownload"
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
            v-permission:create="this.$options.name"
            @click="onClickBadgeRewrdExcelUpload"
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
      <ur-data-grid
        ref="badgeRewrdGrid"
        :headers="badgeRewrdGrid.headers"
        :data-source="badgeRewrdGrid.dataSource"
        :options="badgeRewrdGrid.options"
        :data-set-options="{id: 'id'}"
      />
      <!-- E:: 보상 정보(배지) -->

      <!-- S:: Invisible -->
      <input
        v-show="false"
        ref="detailFile"
        type="file"
        accept=".xlsx"
        @change="onChangeDetailFile"
      >
      <input
        v-show="false"
        ref="badgeRewrdFile"
        type="file"
        accept=".xlsx"
        @change="onChangeBadgeRewrdFile"
      >
      <!-- E:: Invisible -->

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

export default {
  name: 'PGE_AAG_00022', // eslint-disable-line vue/name-property-casing
  data() {
    return {
      codeKeys: [
        'COD_IA_MISSION_CLASS_1', // 미션분류1
        'COD_IA_MISSION_CLASS_2', // 미션분류2
        'COD_IA_MISSION_BADGE_CLASS', // 미션배지분류
      ],
      codes: {
        COD_IA_MISSION_CLASS_1: [], // 미션분류1
        COD_IA_MISSION_CLASS_2: [], // 미션분류2
        COD_IA_MISSION_BADGE_CLASS: [], // 미션배지분류
        COD_IA_YN: [{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],
      },
      missionData: {
        // Single
        eventId: null, // 이벤트ID
        eventName: null, // 이벤트명
        eventStartDtm: null, // 이벤트시작일시
        eventEndDtm: null, // 이벤트종료일시
        exposrYn: null, // 노출여부
        bannerImagUrl: null, // 배너이미지URL
        badgeBannerImagUrl: null, // 배지배너이미지URL
        // Multi
        missionDetailList: { // 미션상세목록
          insert: [],
          update: [],
          delete: [],
        },
        missionBadgeRewrdList: { // 미션배지보상목록
          insert: [],
          update: [],
          delete: [],
        },
      },
      eventPeriods: [], // 이벤트기간
      minEventStartDate: null,
      missionDetailList: [], // 미션상세목록
      missionBadgeRewrdList: [], // 미션배지보상목록
      detailGrid: {
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
          missionSeq: null, // 미션순번
          missionNo: null, // 미션번호
          missionClassCd1: null, // 미션분류코드1
          missionClassCd2: null, // 미션분류코드2
          missionName: null, // 미션명
          attainCondCd: null, // 달성조건코드
          attainCondName: null, // 달성조건명
          useYn: null, // 사용여부
        },
      },
      badgeRewrdGrid: {
        headers: [],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        options: {
          noInfo: true,
          selectCheck: true,
          selectCheckOnly: true,
          multiSelect: true,
          msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
          rowHeight: 'auto',
        },
        defaultRowData: {
          eventId: null, // 이벤트ID
          badgeSeq: null, // 배지순번
          missionNo: null, // 미션번호
          badgeClassCd: null, // 배지분류코드
          badgeName: null, // 배지명
          badgeDesc: null, // 배지설명
          badgeInactivImagUrl: null, // 배지비활성이미지URL
          badgeInactivImagAltDesc: null, // 배지비활성이미지ALT내용
          badgeActivImagUrl: null, // 배지활성이미지URL
          badgeActivImagAltDesc: null, // 배지활성이미지ALT내용
        },
      },
    }
  },
  computed: {
    excelUploadSizeLimitDesc() {
      return utils.strFormat(this.$t('MSG_TXT_FILE_SIZE_UNDER_A'), '5MB') // *파일 용량 : {5MB} 미만
    },
    badgeImagUploadGuideDesc() {
      // * 이미지 : {176} x {176} / 파일 규격 : {15MB} 미만 {jpg, png, gif}
      return utils.strFormat(this.$t('MSG_TXT_UPLOAD_GUIDANCE'), '176', '176', '15MB', 'jpg, png, gif')
    },
  },
  created() {
    this.initializeCodes()
    this.initializeParams()
  },
  methods: {
    initializeHeaders(that) {
      this.detailGrid.headers = [
        {
          text: this.$t('MSG_TXT_NUMBER_ROW'), // No.
          customValue: (v, r) => r.__idx + 1, // eslint-disable-line no-underscore-dangle
          width: 60,
        },
        { hide: true, value: 'eventId' }, // 이벤트ID
        { hide: true, value: 'missionSeq' }, // 미션순번
        {
          text: this.$t('MSG_TXT_MISSION_CLASS_1'), // 미션 분류 (1)
          value: 'missionClassCd1',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-dropdown
                  v-model="row.missionClassCd1"
                  :items="codes.COD_IA_MISSION_CLASS_1"
                  :placeholder="$t('MSG_TXT_SEL')"
                  @input="onInputMissionClassCd1"
                />
              </div>`,
            computed: {
              codes() {
                return that.codes
              },
            },
            watch: {
              value: {
                immediate: true,
                handler(value) {
                  this.row.oldMissionClassCd1 = value
                },
              },
              // (row.__idx + 1)를 (missionNo)로 설정하는 부분
              'row.__idx': {
                immediate: true,
                deep: true,
                handler(value) {
                  const missionNo = value + 1
                  if (missionNo && this.row.missionNo !== missionNo) {
                    that.detailGrid.dataSource.setRowValue(this.row, 'missionNo', missionNo)
                  }
                },
              },
            },
            methods: {
              onInputMissionClassCd1(value) {
                if (value !== this.row.oldMissionClassCd1) {
                  that.detailGrid.dataSource.setRowValue(this.row, 'missionClassCd2', null)
                }
                that.detailGrid.dataSource.setRowValue(this.row, 'missionClassCd1', value)
              },
            },
          },
          width: 180,
        },
        {
          text: this.$t('MSG_TXT_MISSION_CLASS_2'), // 미션 분류 (2)
          value: 'missionClassCd2',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            data() {
              return {
                items: [],
              }
            },
            template: `
              <div>
                <ur-dropdown
                  v-model="row.missionClassCd2"
                  :items="items"
                  itemText="codeName"
                  itemValue="codeId"
                  :placeholder="$t('MSG_TXT_SEL')"
                  @input="onInputMissionClassCd2" />
              </div>`,
            computed: {
              codes() {
                return that.codes
              },
            },
            watch: {
              'row.missionClassCd1': {
                handler(value) {
                  this.setItems(value)
                },
              },
            },
            mounted() {
              this.setItems(this.row.missionClassCd1)
            },
            methods: {
              setItems(missionClassCd1) {
                if (!utils.isEmpty(missionClassCd1)) {
                  this.items = this.codes.COD_IA_MISSION_CLASS_2.filter(
                    item => item.parentsCodeValidityValue === missionClassCd1,
                  )
                }
              },
              onInputMissionClassCd2(value) {
                that.detailGrid.dataSource.setRowValue(this.row, 'missionClassCd2', value)
              },
            },
          },
          width: 180,
        },
        {
          text: this.$t('MSG_TXT_MISSION_NAME'), // 미션 명
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-text-field
                  v-model="row.missionName"
                  style="width: 100%"
                  maxlength="50"
                  @input="onInputMissionName" />
              </div>`,
            methods: {
              onInputMissionName(value) {
                that.detailGrid.dataSource.setRowValue(this.row, 'missionName', value)
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_ATTAIN_COND'), // 달성 조건
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
                <div>
                  <ur-text-field
                    v-model="row.attainCondName"
                    readonly
                    style="width: 100%" />
                  <ur-icon-button
                    icon="search"
                    icon-type="line"
                    color="primary"
                    style="margin-left: 10px"
                    @click="onClickCouponSearch" />
                </div>`,
            methods: {
              onClickCouponSearch() {
                utils.openLayerPopup('PGE_AAG_00025', this.onCloseAttainCondPopup, { size: 'lg' })
              },
              onCloseAttainCondPopup(data = null) {
                if (data) {
                  that.detailGrid.dataSource.setRowValue(this.row, 'attainCondCd', data.attainCondCd)
                  that.detailGrid.dataSource.setRowValue(this.row, 'attainCondName', data.attainCondName)
                }
              },
            },
          },
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
                that.detailGrid.dataSource.setRowValue(this.row, 'useYn', value)
              },
            },
          },
          width: 150,
        },
      ]

      this.badgeRewrdGrid.headers = [
        { hide: true, value: 'eventId' },
        { hide: true, value: 'badgeSeq' },
        {
          text: this.$t('MSG_TXT_NUMBER_ROW'), // No.
          value: 'missionNo',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-text-field
                  v-model="row.missionNo"
                  width="45"
                  mask="number"
                  maxlength="4"
                  style="min-width: 45px"
                  @keyup="row.missionNo = parseInt(row.missionNo, 10)"
                  @input="onInputMissionNo"
                />
              </div>`,
            methods: {
              onInputMissionNo(value) {
                that.badgeRewrdGrid.dataSource.setRowValue(this.row, 'missionNo', value)
              },
            },
          },
          width: 60,
        },
        {
          text: this.$t('MSG_TXT_BADGE_CLASS'), // 뱃지 분류
          value: 'badgeClassCd',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-dropdown
                  v-model="row.badgeClassCd"
                  :items="codes.COD_IA_MISSION_BADGE_CLASS"
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
                that.badgeRewrdGrid.dataSource.setRowValue(this.row, 'badgeClassCd', value)
              },
            },
          },
          width: 180,
        },
        {
          text: this.$t('MSG_TXT_BADGE_NAME'), // 뱃지 명
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-text-field
                  v-model="row.badgeName"
                  style="width: 100%"
                  maxlength="50"
                  @input="onInputBadgeName"
                />
              </div>`,
            methods: {
              onInputBadgeName(value) {
                that.badgeRewrdGrid.dataSource.setRowValue(this.row, 'badgeName', value)
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_BADGE_DESC'), // 뱃지 설명
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <ur-text-field
                  v-model="row.badgeDesc"
                  style="width: 100%"
                  maxlength="50"
                  @input="onInputBadgeDesc"
                />
              </div>`,
            methods: {
              onInputBadgeDesc(value) {
                that.badgeRewrdGrid.dataSource.setRowValue(this.row, 'badgeDesc', value)
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_BADGE_INACTIVATED_IMAG'), // 뱃지 비활성화 이미지
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            data() {
              return {
                badgeDesc: null,
              }
            },
            template: `
              <div class="pdCol10" style="flex-direction: column;">
                <div style="display: flex; flex-direction: row; align-items: center;">
                  <cmp-single-file-uploader
                    v-model="row.badgeInactivImagUrl"
                    upload-target="EVT002"
                    :page-id="pageId"
                    text-field-width="calc(100% - 96px)"
                    accepts="jpg,png,gif"
                    pixels="176*176"
                    preview-mode="BELOW"
                    @input="onInputBadgeInactivImagUrl"
                  >
                    <template>
                      <ur-text-field
                        v-model="row.badgeInactivImagAltDesc"
                        style="width: 100%; height: auto;"
                        maxlength="100"
                        :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                        @input="onInputBadgeInactivImagAltDesc"
                      />
                    </template>
                  </cmp-single-file-uploader>
                </div>
              </div>`,
            computed: {
              pageId() {
                return that.$options.name
              },
            },
            methods: {
              onInputBadgeInactivImagUrl(value) {
                that.badgeRewrdGrid.dataSource.setRowValue(this.row, 'badgeInactivImagUrl', value)
              },
              onInputBadgeInactivImagAltDesc(value) {
                that.badgeRewrdGrid.dataSource.setRowValue(this.row, 'badgeInactivImagAltDesc', value)
              },
            },
          },
          width: 300,
        },
        {
          text: this.$t('MSG_TXT_BADGE_ACTIVATED_IMAG'), // 뱃지 활성화 이미지
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            data() {
              return {
                badgeDesc: null,
              }
            },
            template: `
              <div class="pdCol10" style="flex-direction: column;">
                <div style="display: flex; flex-direction: row; align-items: center;">
                  <cmp-single-file-uploader
                    v-model="row.badgeActivImagUrl"
                    upload-target="EVT002"
                    :page-id="pageId"
                    text-field-width="calc(100% - 96px)"
                    accepts="jpg,png,gif"
                    pixels="176*176"
                    preview-mode="BELOW"
                    @input="onInputBadgeActivImagUrl"
                  >
                    <template>
                      <ur-text-field
                        v-model="row.badgeActivImagAltDesc"
                        style="width: 100%; height: auto;"
                        maxlength="100"
                        :placeholder="$t('MSG_TXT_INPUT_ALT_TAG')"
                        @input="onInputBadgeActivImagAltDesc"
                      />
                    </template>
                  </cmp-single-file-uploader>
                </div>
              </div>`,
            computed: {
              pageId() {
                return that.$options.name
              },
            },
            methods: {
              onInputBadgeActivImagUrl(value) {
                that.badgeRewrdGrid.dataSource.setRowValue(this.row, 'badgeActivImagUrl', value)
              },
              onInputBadgeActivImagAltDesc(value) {
                that.badgeRewrdGrid.dataSource.setRowValue(this.row, 'badgeActivImagAltDesc', value)
              },
            },
          },
          width: 300,
        },
      ]
    },
    initializeCodes() {
      http.mergeCodeList(this.$options.name, this.codeKeys, this.codes).then(() => {
        this.initializeHeaders(this)
      })
    },
    initializeParams() {
      const params = utils.getParameter(this, 'params')
      if (utils.isEmpty(params.eventId)) {
        // INSERT
        this.missionData.eventStartDtm = utils.now('YYYYMMDD0000')
        this.eventPeriods = [this.missionData.eventStartDtm, this.missionData.eventEndDtm]
        this.minEventStartDate = utils.now('YYYY-MM-DD')
        this.onClickAddDetail()
        this.onClickAddBadgeRewrd()
      } else {
        // UPDATE
        this.missionData.eventId = params.eventId
        this.selectMission()
        this.selectMissionDetailList()
        this.selectMissionBadgeRewrdList()
      }
    },
    selectMission() {
      http.request(this.$options.name, 'DTS_AAG_00023', {
        path: {
          'event-id': this.missionData.eventId,
        },
      }).then(res => {
        this.missionData = res.data
        const eventStartDtm = moment(this.missionData.eventStartDtm, 'YYYYMMDDHHmmss').format('YYYYMMDDHHmm')
        const eventEndDtm = moment(this.missionData.eventEndDtm, 'YYYYMMDDHHmmss').format('YYYYMMDDHHmm')
        this.eventPeriods = [eventStartDtm, eventEndDtm]

        this.minEventStartDate = CommonUtils.getMinDateWithToday(this.missionData.eventStartDtm, 'YYYYMMDDHHmmss')
      })
    },
    selectMissionDetailList() {
      http.request(this.$options.name, 'DTS_AAG_00026', {
        path: {
          'event-id': this.missionData.eventId,
        },
      }).then(res => {
        this.missionDetailList = res.data
        this.$refs.detailGrid.setData(this.missionDetailList)
      })
    },
    selectMissionBadgeRewrdList() {
      http.request(this.$options.name, 'DTS_AAG_00027', {
        path: {
          'event-id': this.missionData.eventId,
        },
      }).then(res => {
        this.missionBadgeRewrdList = res.data
        this.$refs.badgeRewrdGrid.setData(this.missionBadgeRewrdList)
      })
    },
    onInputEventPeriods(value) {
      // 종료일시의 시분(HHmm)이 0000일 경우 2359로 대체한다.
      if (value.at(1) && value.at(1).slice(-4) === '0000') {
        this.eventPeriods = [value.at(0), value.at(1).substring(0, 8).concat('2359')]
        return // [this.eventPeriods]값 변경으로 [onInputEventPeriods]가 다시 호출되므로 현재 호출은 return한다.
      }
      this.missionData.eventStartDtm = value.at(0) ? value.at(0).concat('00') : null
      this.missionData.eventEndDtm = value.at(1) ? value.at(1).concat('59') : null
    },
    onClickAddDetail() {
      this.detailGrid.dataSource.addRow(this.detailGrid.defaultRowData)
    },
    onClickDeleteDetail() {
      const rows = this.$refs.detailGrid.getSelected()
      rows.forEach(row => {
        this.$refs.detailGrid.removeRow(row, false)
      })
    },
    onClickResetDetail() {
      const rows = this.$refs.detailGrid.getData()
      rows.forEach(row => {
        this.$refs.detailGrid.removeRow(row, false)
      })
      this.onClickAddDetail()
    },
    onClickDetailExcelFormDownload() {
      const pageMeta = this.$store.getters.getPageMeta(this.$options.name)
      const pageName = this.$t(pageMeta.pageInfo.pageTitleMessageResourceId)
      const sToday = utils.now('YYYYMMDDHHmmss')

      const { pageId } = this
      const columns = [
        {
          text: this.$t('MSG_TXT_MISSION_CLASS_1'), // 미션 분류 (1)
          type: 'code',
          domain: this.codes.COD_IA_MISSION_CLASS_1,
          memo: {
            text: this.$t('MSG_TXT_SELT'),
          },
          width: 15,
        },

        {
          text: this.$t('MSG_TXT_MISSION_CLASS_2'), // 미션 분류 (2)
          type: 'code',
          domain: this.codes.COD_IA_MISSION_CLASS_2,
          memo: {
            text: this.$t('MSG_TXT_MISSION_CLASS_2_UPLOAD_GUIDANCE'),
            wSize: 6,
            hSize: 4,
          },
          width: 15,
        },
        {
          text: this.$t('MSG_TXT_MISSION_NAME'), // 미션 명
          type: 'text',
          width: 15,
        },
        {
          text: this.$t('MSG_TXT_ATTAIN_COND'), // 달성 조건
          type: 'text',
          memo: {
            text: '캠페인 달성 조건 번호 입력',
            wSize: 3,
            hSize: 2,
          },
          width: 15,
        },
        {
          text: this.$t('MSG_TXT_USE_YN'), // 사용 여부
          type: 'code',
          domain: this.codes.COD_IA_YN,
          memo: {
            text: this.$t('MSG_TXT_SELT'),
          },
          width: 12,
        },
      ]
      const excelFileName = `${pageName}_${sToday}.xlsx`
      CommonUtils.downloadExcelForm(pageId, columns, excelFileName)
    },
    onClickDetailExcelUpload() {
      this.$refs.detailFile.value = null
      this.$refs.detailFile.click()
    },
    onClickAddBadgeRewrd() {
      this.badgeRewrdGrid.dataSource.addRow(this.badgeRewrdGrid.defaultRowData)
    },
    onClickDeleteBadgeRewrd() {
      const rows = this.$refs.badgeRewrdGrid.getSelected()
      rows.forEach(row => {
        this.$refs.badgeRewrdGrid.removeRow(row, false)
      })
    },
    onClickResetBadgeRewrd() {
      const rows = this.$refs.badgeRewrdGrid.getData()
      rows.forEach(row => {
        this.$refs.badgeRewrdGrid.removeRow(row, false)
      })
      this.onClickAddBadgeRewrd()
    },
    onClickBadgeRewrdExcelFormDownload() {
      const pageMeta = this.$store.getters.getPageMeta(this.$options.name)
      const pageName = this.$t(pageMeta.pageInfo.pageTitleMessageResourceId)
      const sToday = utils.now('YYYYMMDDHHmmss')

      const { pageId } = this
      const columns = [
        {
          text: this.$t('MSG_TXT_NUMBER_ROW'), // No.
          type: 'text',
          memo: {
            text: this.$t('MSG_TXT_MISSION_NO_UPLOAD_GUIDANCE'),
          },
          width: 15,
        },
        {
          text: this.$t('MSG_TXT_BADGE_CLASS'), // 뱃지 분류 코드
          type: 'code',
          domain: this.codes.COD_IA_MISSION_BADGE_CLASS,
          memo: {
            text: this.$t('MSG_BTN_SELT'),
          },
          width: 15,
        },
        {
          text: this.$t('MSG_TXT_BADGE_NAME'), // 뱃지 명
          type: 'text',
          width: 30,
        },
        {
          text: this.$t('MSG_TXT_BADGE_DESC'), // 뱃지 설명
          type: 'text',
          width: 50,
        },
      ]
      const excelFileName = `${pageName}_${sToday}.xlsx`
      CommonUtils.downloadExcelForm(pageId, columns, excelFileName)
    },
    onClickBadgeRewrdExcelUpload() {
      this.$refs.badgeRewrdFile.value = null
      this.$refs.badgeRewrdFile.click()
    },
    onClickList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAG_00021', { params })
    },
    onClickSave() {
      if (this.isValid()) {
        utils.messageBox(
          'confirm',
          this.$t('MSG_ALT_WANT_SAVE'), // 저장 하시겠습니까?
          null, () => {
            const { eventId } = this.missionData
            this.adjustMissionDetailList()
            this.adjustMissionBadgeRewrdList()
            if (utils.isEmpty(eventId)) {
              this.insertMission()
            } else {
              this.updateMission()
            }
          },
        )
      }
    },
    insertMission() {
      const { missionData } = this
      http.request(this.$options.name, 'DTS_AAG_00022', {
        data: missionData,
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
    updateMission() {
      const { missionData } = this
      http.request(this.$options.name, 'DTS_AAG_00024', {
        data: missionData,
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
      if (!(this.isValidExposrInfo()
         && this.isValidMissionInfo()
         && this.isValidBadgeRewrdInfo())) {
        return false
      }
      return true
    },
    isValidExposrInfo() {
      // 노출 정보
      if (utils.isEmpty(this.missionData.eventName)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EVENT_NAME'))) // {이벤트 명}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.missionData.eventStartDtm)
          || utils.isEmpty(this.missionData.eventEndDtm)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EVENT_PERIOD'))) // {이벤트 기간}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.missionData.exposrYn)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_EXPOSR_YN'))) // {노출 여부}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.missionData.bannerImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_MISSION_DETAIL_BANNER_IMAG'))) // {미션 상세 배너 이미지}은(는) 필수 항목입니다.
        return false
      }
      if (utils.isEmpty(this.missionData.badgeBannerImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_BADGE_DETAIL_BANNER_IMAG'))) // {뱃지 상세 배너 이미지}은(는) 필수 항목입니다.
        return false
      }
      return true
    },
    isValidMissionInfo() {
      // 미션 정보
      const missionDetailList = this.detailGrid.dataSource.data
      for (let i = 0; i < missionDetailList.length; i += 1) {
        if (utils.isEmpty(missionDetailList[i].missionClassCd1)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_MISSION_CLASS_1'))) // {미션 분류 (1)}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(missionDetailList[i].missionClassCd2)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_MISSION_CLASS_2'))) // {미션 분류 (2)}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(missionDetailList[i].missionName)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_MISSION_NAME'))) // {미션 명}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(missionDetailList[i].attainCondCd)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_ATTAIN_COND'))) // {달성 조건}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(missionDetailList[i].useYn)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_USE_YN'))) // {사용 여부}은(는) 필수 항목입니다.
          return false
        }
      }
      return true
    },
    isValidBadgeRewrdInfo() {
      // 보상 정보(배지)
      const badgeRewrdList = this.badgeRewrdGrid.dataSource.data
      for (let i = 0; i < badgeRewrdList.length; i += 1) {
        if (utils.isEmpty(badgeRewrdList[i].missionNo)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_NUMBER_ROW'))) // {No.}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(badgeRewrdList[i].badgeClassCd)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_BADGE_CLASS'))) // {뱃지 분류}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(badgeRewrdList[i].badgeName)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_BADGE_NAME'))) // {뱃지 명}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(badgeRewrdList[i].badgeDesc)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_BADGE_DESC'))) // {뱃지 설명}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(badgeRewrdList[i].badgeInactivImagUrl)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_BADGE_INACTIVATED_IMAG'))) // {뱃지 비활성화 이미지}은(는) 필수 항목입니다.
          return false
        }
        if (utils.isEmpty(badgeRewrdList[i].badgeActivImagUrl)) {
          utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_BADGE_ACTIVATED_IMAG'))) // {뱃지 활성화 이미지}은(는) 필수 항목입니다.
          return false
        }
      }

      // 보상 정보(배지) 미션 번호 중복 확인
      const badgeMissionNos = badgeRewrdList.map(item => item.missionNo)
      const entries = Object.entries(
        badgeMissionNos.reduce((acc, cur) => ({ ...acc, [cur]: (acc[cur] || 0) + 1 }), {}),
      )
      const dups = []
      if (!utils.isEmpty(entries)) {
        entries.forEach(entry => {
          if (entry[1] > 1) {
            dups.push(entry[0])
          }
        })
      }
      if (!utils.isEmpty(dups)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_MISSION_REWRD_IS_DUPLICATED'), dups.join(', '))) // {0} 미션에 보상이 중복 입력되었습니다. 다시 확인해주세요.
        return false
      }
      return true
    },
    adjustMissionDetailList() {
      if (utils.isEmpty(this.missionData.eventId)) {
        // INSERT
        this.missionData.missionDetailList = {
          insert: this.detailGrid.dataSource.data,
        }
      } else {
        // UPDATE
        const { data } = this.detailGrid.dataSource
        const { updated, removed } = this.detailGrid.dataSource.getChanged()

        const insertList = data.filter(item => utils.isEmpty(item.eventId))
        const deleteList = removed.filter(item => !utils.isEmpty(item.eventId))
        const updateList = updated.filter(item => {
          const map = deleteList.map(d => d.missionSeq)
          return !map.includes(item.missionSeq)
        })

        this.missionData.missionDetailList = {
          insert: insertList,
          update: updateList,
          delete: deleteList,
        }
      }
    },
    adjustMissionBadgeRewrdList() {
      if (utils.isEmpty(this.missionData.eventId)) {
        // INSERT
        this.missionData.missionBadgeRewrdList = {
          insert: this.badgeRewrdGrid.dataSource.data,
        }
      } else {
        // UPDATE
        const { data } = this.badgeRewrdGrid.dataSource
        const { updated, removed } = this.badgeRewrdGrid.dataSource.getChanged()

        const insertList = data.filter(item => utils.isEmpty(item.eventId))
        const deleteList = removed.filter(item => !utils.isEmpty(item.eventId))
        const updateList = updated.filter(item => {
          const map = deleteList.map(d => d.badgeSeq)
          return !map.includes(item.badgeSeq)
        })

        this.missionData.missionBadgeRewrdList = {
          insert: insertList,
          update: updateList,
          delete: deleteList,
        }
      }
    },
    onChangeDetailFile(event) {
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
        http.request(this.$options.name, 'DTS_AAG_00028', {
          data: formData,
        }).then(res => {
          for (let i = 0; i < res.data.length; i += 1) {
            this.detailGrid.dataSource.addRow(res.data[i])
          }
        })
      }
    },
    onChangeBadgeRewrdFile(event) {
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
        http.request(this.$options.name, 'DTS_AAG_00029', {
          data: formData,
        }).then(res => {
          for (let i = 0; i < res.data.length; i += 1) {
            this.badgeRewrdGrid.dataSource.addRow(res.data[i])
          }
        })
      }
    },
  },
}
</script>
