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
      <ur-form-box>
        <!-- 이벤트 명 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          {{ missionData.eventName }}
        </ur-form-item>
        <!-- 이벤트 기간 -->
        <ur-form-item
          :label="$t('MSG_TXT_EVENT_PERIOD')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          {{ eventPeriod }}
        </ur-form-item>
        <!-- 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ missionData.exposrYn }}
        </ur-form-item>
        <!-- 미션 상세 배너 이미지 -->
        <ur-form-item
          :label="$t('MSG_TXT_MISSION_DETAIL_BANNER_IMAG')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            v-model="missionData.bannerImagUrl"
            mode="SELECT"
            :page-id="this.$options.name"
          />
        </ur-form-item>
        <!-- 뱃지 상세 배너 이미지 -->
        <ur-form-item
          :label="$t('MSG_TXT_BADGE_DETAIL_BANNER_IMAG')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <cmp-single-file-uploader
            v-model="missionData.badgeBannerImagUrl"
            mode="SELECT"
            :page-id="this.$options.name"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 노출 정보 -->

      <!-- S:: 미션 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          {{ $t('MSG_TXT_MISSION_INFO') }} <!-- 미션 정보 -->
        </h4>
      </div>
      <ur-data-grid
        ref="detailGrid"
        :headers="detailGrid.headers"
        :data-source="detailGrid.dataSource"
        :options="detailGrid.options"
        :data-set-options="{id: 'id'}"
      />
      <!-- E:: 미션 정보 -->

      <!-- S:: 보상 정보(배지) -->
      <div class="comm_title_wrap mt20">
        <h4>
          {{ $t('MSG_TXT_REWRD_INFO') }} <!-- 보상 정보 -->
        </h4>
      </div>
      <ur-data-grid
        ref="badgeRewrdGrid"
        :headers="badgeRewrdGrid.headers"
        :data-source="badgeRewrdGrid.dataSource"
        :options="badgeRewrdGrid.options"
        :data-set-options="{id: 'id'}"
      />
      <!-- E:: 보상 정보(배지) -->

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
              v-permission:update="this.$options.name"
              color="violet"
              @click="onClickModify"
            >
              {{ $t('MSG_BTN_MOD') }} <!-- 수정 -->
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import { urDataSet } from 'uidev-component'

export default {
  name: 'PGE_AAG_00023', // eslint-disable-line vue/name-property-casing
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
      },
      missionData: {
        eventId: null, // 이벤트ID
        eventName: null, // 이벤트명
        eventStartDtm: null, // 이벤트시작일시
        eventEndDtm: null, // 이벤트종료일시
        exposrYn: null, // 노출여부
      },
      missionDetailList: [], // 미션상세목록
      missionBadgeRewrdList: [], // 미션배지보상목록
      detailGrid: {
        headers: [],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        options: {
          noInfo: true,
          selectCheckOnly: true,
          msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
        },
      },
      badgeRewrdGrid: {
        headers: [],
        dataSource: new urDataSet(), // eslint-disable-line new-cap
        options: {
          noInfo: true,
          selectCheckOnly: true,
          msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
        },
      },
    }
  },
  computed: {
    eventPeriod() {
      let eventPeriod = null
      const { eventStartDtm, eventEndDtm } = this.missionData
      if (!utils.isEmpty(eventStartDtm) && !utils.isEmpty(eventEndDtm)) {
        const start = moment(eventStartDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm')
        const end = moment(eventEndDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm')
        eventPeriod = start.concat(' ~ ').concat(end)
      }
      return eventPeriod
    },
  },
  created() {
    const params = utils.getParameter(this, 'params')
    if (utils.isEmpty(params.eventId)) {
      this.onClickList()
    } else {
      this.initializeCodes()
      this.initializeHeaders(this)
      this.initializeParams()
    }
  },
  methods: {
    initializeCodes() {
      http.mergeCodeList(this.$options.name, this.codeKeys, this.codes)
    },
    initializeHeaders(that) {
      this.detailGrid.headers = [
        {
          text: this.$t('MSG_TXT_NUMBER_ROW'), // No.
          value: 'missionNo',
          width: 50,
        },
        {
          text: this.$t('MSG_TXT_MISSION_CLASS_1'), // 미션 분류 (1)
          type: 'code',
          value: 'missionClassCd1',
          domain: this.codes.COD_IA_MISSION_CLASS_1,
          width: 180,
        },
        {
          text: this.$t('MSG_TXT_MISSION_CLASS_2'), // 미션 분류 (1)
          type: 'code',
          value: 'missionClassCd2',
          domain: this.codes.COD_IA_MISSION_CLASS_2,
          width: 180,
        },
        {
          text: this.$t('MSG_TXT_MISSION_NAME'), // 미션 명
          value: 'missionName',
        },
        {
          text: this.$t('MSG_TXT_ATTAIN_COND'), // 달성 조건
          value: 'attainCondName',
        },
        {
          text: this.$t('MSG_TXT_USE_YN'), // 사용 여부
          value: 'useYn',
          width: 120,
        },
      ]

      this.badgeRewrdGrid.headers = [
        {
          text: this.$t('MSG_TXT_NUMBER_ROW'), // No.
          value: 'missionNo',
          width: 50,
        },
        {
          text: this.$t('MSG_TXT_BADGE_CLASS'), // 뱃지 분류
          type: 'code',
          value: 'badgeClassCd',
          domain: this.codes.COD_IA_MISSION_BADGE_CLASS,
          width: 180,
        },
        {
          text: this.$t('MSG_TXT_BADGE_NAME'), // 뱃지 명
          value: 'badgeName',
        },
        {
          text: this.$t('MSG_TXT_BADGE_DESC'), // 뱃지 설명
          value: 'badgeDesc',
        },
        {
          text: this.$t('MSG_TXT_BADGE_INACTIVATED_IMAG'), // 뱃지 비활성화 이미지
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <cmp-single-file-uploader
                  v-model="row.badgeInactivImagUrl"
                  mode="SELECT"
                  :page-id="pageId"
                />
              </div>`,
            computed: {
              pageId() {
                return that.$options.name
              },
            },
          },
          width: 250,
        },
        {
          text: this.$t('MSG_TXT_BADGE_ACTIVATED_IMAG'), // 뱃지 활성화 이미지
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `
              <div>
                <cmp-single-file-uploader
                  v-model="row.badgeActivImagUrl"
                  mode="SELECT"
                  :page-id="pageId"
                />
              </div>`,
            computed: {
              pageId() {
                return that.$options.name
              },
            },
          },
          width: 250,
        },
      ]
    },
    initializeParams() {
      const params = utils.getParameter(this, 'params')
      if (!utils.isEmpty(params.eventId)) {
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
    onClickList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAG_00021', { params })
    },
    onClickModify() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAG_00022', { params })
    },
  },
}
</script>
