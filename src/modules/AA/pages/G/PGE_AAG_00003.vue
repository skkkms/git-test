<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>
          {{ this.$t('MSG_TIT_USER_INFO') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_MEM_NUM')"
          label-align="right"
          style="width:50%; height:auto;"
          class="flex-wrap"
        >
          {{ memshpUid }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_IAM_ID')"
          label-align="right"
          style="width:50%; height:auto;"
        >
          {{ detail.id }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_NAME')"
          label-align="right"
          style="width:50%; height:auto;"
        >
          {{ detail.name }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_PHONE_NUM')"
          label-align="right"
          style="width:50%; height:auto;"
        >
          {{ mobileTel }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_IAA_MEMBER_GRADE')"
          label-align="right"
          style="width:50%; height:auto;"
        >
          {{ detail.grdCd }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_REG_DATE')"
          label-align="right"
          style="width:50%; height:auto;"
        >
          {{ joinDate }}
        </ur-form-item>
      </ur-form-box>
      <ur-tab-box
        default-idx="1"
        class="mt35"
        @tab-change="chagneTab"
      >
        <ur-tab-content
          idx="1"
          :label="$t('MSG_TXT_IAA_OX_QUIZ')"
        >
          <T01
            v-if="tabIndex==='1'"
            :page-id="this.$options.name"
            :memshp-uid="this.memshpUid"
            :opts="this.opts"
            :codes="this.codes"
          />
        </ur-tab-content>
        <ur-tab-content
          idx="2"
          :label="$t('MSG_TXT_STMP')"
        >
          <T02
            v-if="tabIndex==='2'"
            :page-id="this.$options.name"
            :memshp-uid="this.memshpUid"
            :opts="this.opts"
            :codes="this.codes"
          />
        </ur-tab-content>
        <ur-tab-content
          idx="3"
          :label="$t('MSG_TXT_ROULETTE')"
        >
          <T03
            v-if="tabIndex==='3'"
            :page-id="this.$options.name"
            :opts="this.opts"
            :memshp-uid="this.memshpUid"
            :codes="this.codes"
          />
        </ur-tab-content>
        <ur-tab-content
          idx="4"
          :label="$t('MSG_TXT_APP_EVT')"
        >
          <T04
            v-if="tabIndex==='4'"
            :page-id="this.$options.name"
            :opts="this.opts"
            :memshp-uid="this.memshpUid"
            :codes="this.codes"
          />
        </ur-tab-content>
        <ur-tab-content
          idx="5"
          :label="$t('MSG_TXT_ATTEND_CHK')"
        >
          <T05
            v-if="tabIndex==='5'"
            :page-id="this.$options.name"
            :opts="this.opts"
            :memshp-uid="this.memshpUid"
            :codes="this.codes"
          />
        </ur-tab-content>
        <ur-tab-content
          idx="6"
          :label="$t('MSG_TXT_MISSION')"
        >
          <T06
            v-if="tabIndex==='6'"
            :page-id="this.$options.name"
            :opts="this.opts"
            :memshp-uid="this.memshpUid"
            :codes="this.codes"
          />
        </ur-tab-content>
        <ur-tab-content
          idx="7"
          :label="$t('MSG_TXT_IAM_MINI_GAME')"
        >
          <T07
            v-if="tabIndex==='7'"
            :page-id="this.$options.name"
            :opts="this.opts"
            :memshp-uid="this.memshpUid"
            :codes="this.codes"
          />
        </ur-tab-content>
      </ur-tab-box>
      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button @click="onClickList">
              {{ $t('MSG_BTN_LIST') }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import T01 from './components/PGE_AAG_00003_T01.vue'
import T02 from './components/PGE_AAG_00003_T02.vue'

import T03 from './components/PGE_AAG_00003_T03.vue'
import T04 from './components/PGE_AAG_00003_T04.vue'
import T05 from './components/PGE_AAG_00003_T05.vue'
import T06 from './components/PGE_AAG_00003_T06.vue'
import T07 from './components/PGE_AAG_00003_T07.vue'

export default {
  name: 'PGE_AAG_00003', // eslint-disable-line vue/name-property-casing
  components: {
    T01,
    T02,
    T03,
    T04,
    T05,
    T06,
    T07,
  },
  data() {
    return {
      codeKeys: [
        'COD_IA_EVENT_PUBLCT_KIND', // 이벤트게시구분
        'COD_IA_EVENT_KIND', // 이벤트구분
        'COD_IA_EVENT_CLASS', // 이벤트분류
        'COD_IA_EXPOSR_YN', // 노출여부
        'COD_IAA_ATTAIN_REWRD_TYPE',
        'COD_IA_EVENT_REWARD_KIND',
        'COD_IA_GAME_REWARD_UNIT',
      ],
      codes: {
        COD_IA_EVENT_PUBLCT_KIND: [],
        COD_IA_EVENT_KIND: [],
        COD_IA_EVENT_CLASS: [],
        COD_IA_EXPOSR_YN: [],
        COD_IAA_ATTAIN_REWRD_TYPE: [],
        COD_IA_EVENT_REWARD_KIND: [],
        COD_IA_GAME_REWARD_UNIT: [],
      },
      opts: {
        height: 474,
        resizableColumn: true,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      memshpUid: '',
      detail: {
        id: '',
        name: '',
        mobileTel: '',
        grdCd: '',
        grdName: '',
        joinDate: '',
      },
      tabIndex: '1',
    }
  },
  computed: {
    joinDate() {
      return utils.dateformatToClient(this.detail.joinDate)
    },
    mobileTel() {
      return this.detail.mobileTel
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    const params = utils.getParameter(this, 'params')
    this.memshpUid = params.memshpUid
    if (_.isEmpty(this.memshpUid)) {
      this.onClickList()
    }
    this.initializeCodes()
    this.selectMemberDetail()
  },
  mounted() {
  },
  methods: {
    initializeCodes() {
      http.mergeCodeList(this.$options.name, this.codeKeys, this.codes)
    },
    onClickList() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAG_00001', { params })
    },
    selectMemberDetail() {
      http.request(this.$options.name, 'DTS_AAG_00062', {
        path: {
          'memshp-uid': this.memshpUid,
        },
      }).then(res => {
        this.detail = res.data.detail
      })
    },
    chagneTab(idx) {
      this.tabIndex = idx
    },
  },
}
</script>
<style scoped>
</style>
