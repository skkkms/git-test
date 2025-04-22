<template>
  <div>
    <!-- ::S 미션 보상정보 -->
    <ur-form-box toggleable>
      <!-- 구분 -->
      <ur-form-item
        :label="$t('MSG_TXT_DIV')"
        label-align="right"
        class="flex_wrap"
        style="width:50%; height: auto;"
        required
      >
        <ur-dropdown
          v-model="searchType"
          :items="codes.COD_IA_MISSION_SEARCH_TYPE"
          style="width: 100%; height: auto;"
          no-select
          :msg-no-select="$t('MSG_TXT_ALL')"
          @input="() => searchText = ''"
        />
      </ur-form-item>
      <!-- 항목 명 -->
      <ur-form-item
        :label="$t('MSG_TXT_ITEM_NAME')"
        label-align="right"
        class="flex_wrap"
        style="width:50%; height: auto;"
        required
      >
        <ur-dropdown
          v-if="searchType === '001'"
          v-model="searchText"
          :items="codes.COD_IA_MISSION_CLASS_1"
          style="width: 100%; height: auto;"
          no-select
          :msg-no-select="$t('MSG_BTN_SELT')"
        />
        <ur-dropdown
          v-else-if="searchType === '002'"
          v-model="searchText"
          :items="codes.COD_IA_MISSION_CLASS_2"
          style="width: 100%; height: auto;"
          no-select
          :msg-no-select="$t('MSG_BTN_SELT')"
        />
        <ur-dropdown
          v-else-if="searchType === '003'"
          v-model="searchText"
          :items="missionNameList"
          style="width: 100%; height: auto;"
          no-select
          :msg-no-select="$t('MSG_BTN_SELT')"
        />
        <ur-dropdown
          v-else-if="searchType === '004'"
          v-model="searchText"
          :items="codes.COD_IA_MISSION_REWRD_TYPE"
          style="width: 100%; height: auto;"
          no-select
          :msg-no-select="$t('MSG_BTN_SELT')"
        />
        <ur-dropdown
          v-else-if="searchType === '005'"
          v-model="searchText"
          :items="badgeNameList"
          style="width: 100%; height: auto;"
          no-select
          :msg-no-select="$t('MSG_BTN_SELT')"
        />
        <ur-text-field
          v-else
          v-model="searchText"
          style="width: 100%; height: auto;"
          @keydown.enter.prevent="onClickSearch"
        />
      </ur-form-item>
    </ur-form-box>

    <div class="btn_wrap mt10">
      <div class="right_box">
        <ur-button
          @click="onClickReset"
        >
          {{ $t('MSG_BTN_INTL') }} <!-- 초기화 -->
        </ur-button>
        <ur-button
          v-permission:read="pageId"
          color="violet"
          @click="onClickSearch"
        >
          {{ $t('MSG_BTN_SEARCH') }} <!-- 검색 -->
        </ur-button>
      </div>
    </div>
    <ur-data-grid
      ref="grid"
      :headers="rewrdColumnHeader"
      :data-source="rewrdData"
      :options="opts"
      :data-set-options="{id: 'id'}"
    />
  </div>
</template>
<script>

export default {
  name: 'PGE_AAG_00002_S02', // eslint-disable-line vue/name-property-casing
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
  },
  data() {
    return {
      codeKeys: [
        'COD_IA_MISSION_CLASS_1', 'COD_IA_MISSION_CLASS_2', 'COD_IA_MISSION_SEARCH_TYPE', 'COD_IA_MISSION_REWRD_TYPE',
      ],
      codes: {
        COD_IA_MISSION_CLASS_1: [],
        COD_IA_MISSION_CLASS_2: [],
        COD_IA_MISSION_SEARCH_TYPE: [],
        COD_IA_MISSION_REWRD_TYPE: [],
      },
      rewrdData: [],
      opts: { // 토탈o
        infinityScroll: true,
        noInfo: false,
        defaultPageSize: 10,
        resizableColumn: true,
      },
      eventClassCd: '',
      searchType: '',
      searchText: '',
      missionNameList: [],
      badgeNameList: [],
    }
  },
  computed: {
    rewrdColumnHeader() {
      const columns = [
        { text: this.$t('MSG_TXT_NUMBER_ABBR'), value: 'no', width: 150 },
        {
          text: this.$t('MSG_TXT_MISSION_CLASS_1'),
          value: 'missionClassCd1',
          width: 250,
          type: 'code',
          domain: this.codes.COD_IA_MISSION_CLASS_1,
        },
        {
          text: this.$t('MSG_TXT_MISSION_CLASS_2'),
          value: 'missionClassCd2',
          width: 250,
          type: 'code',
          domain: this.codes.COD_IA_MISSION_CLASS_2,
        },
        { text: this.$t('MSG_TXT_MISSION_NAME'), value: 'missionName' },
        {
          text: this.$t('MSG_TXT_REWRD_CLASS'),
          width: 250,
          customValue: (v, r) => ((r.rewrdSeq === null) ? this.$t('MSG_TXT_REWRD_NO_REWRD') : this.$t('MSG_TXT_REWRD_BADGE')),
        },
        {
          text: this.$t('MSG_TXT_REWRD_BADGE_NAME'),
          value: 'rewrdName',
          width: 150,
          customValue: v => (_.isEmpty(v) ? '-' : v),
        },
        // {
        //   text: this.$t('MSG_TXT_PAYMNT_COUPON_QTY'),
        //   value: 'rewrdPayQty',
        //   width: 150,
        //   customValue: v => utils.numberFormat(v).concat(this.$t('MSG_TXT_NUMBER_OF_COUNT')),
        // },
        {
          text: this.$t('MSG_TXT_DTST_USE_YN'),
          value: 'useYn',
          width: 150,
        },
      ]
      return columns
    },
  },
  watch: {

  },
  mounted() {
    this.initializeCodes()
  },
  methods: {
    initializeCodes() {
      http.mergeCodeList(this.$options.name, this.codeKeys, this.codes)
    },
    setRewrdData(eventClassCd, rewrdData) {
      this.eventClassCd = eventClassCd
      this.rewrdData = rewrdData

      _.forEach(this.rewrdData, eachData => {
        const mission = { value: eachData.missionSeq, text: eachData.missionName }
        this.missionNameList.push(mission)
        if (eachData.rewrdSeq !== null) {
          const badge = { value: eachData.rewrdSeq, text: eachData.rewrdName }
          this.badgeNameList.push(badge)
        }
      })
    },
    onClickReset() {
      this.searchType = ''
      this.searchText = ''
    },
    onClickSearch() {
      if (this.searchType !== '' && this.searchText === '') {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_ITEM_NAME')))
        return
      }
      http.request(this.pageId, 'DTS_AAG_00059', {
        path: {
          'event-id': this.eventId,
        },
        query: {
          searchType: this.searchType,
          searchText: this.searchText,
        },
      }).then(res => {
        this.rewrdData = res.data
      })
    },
  },
}
</script>
<style scoped>
</style>
