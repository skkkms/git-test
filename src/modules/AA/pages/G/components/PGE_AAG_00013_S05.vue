<template>
  <div>
    <!-- S:: 조건 정보 -->
    <div class="comm_title_wrap mt20">
      <h4>
        {{ $t('MSG_TXT_COND_INFO') }} <!-- 조건 정보 -->
      </h4>
    </div>
    <ur-form-box>
      <!-- 참여 조건 -->
      <ur-form-item
        :label="$t('MSG_TXT_PARTCP_COND')"
        label-align="right"
        class="flex_wrap"
        style="width: 50%; height: auto;"
      >
        {{ eventPartcpCondListDesc }}
      </ur-form-item>
      <!-- 노출 조건 -->
      <ur-form-item
        :label="$t('MSG_TXT_EXPOSR_COND')"
        label-align="right"
        class="flex_wrap"
        style="width: 50%; height: auto;"
      >
        {{ exposrCondName }}
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
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <cmp-single-file-uploader
          v-model="eventSubData.thumbnailImagUrl"
          mode="SELECT"
          :page-id="pageId"
        />
      </ur-form-item>
    </ur-form-box>
    <!-- E:: 이벤트 이미지 정보 -->

    <!-- S:: 이벤트 상세 분류 -->
    <div class="comm_title_wrap mt20">
      <h4>
        {{ $t('MSG_TXT_EVENT_DETAIL_CLASS') }} <!-- 이벤트 상세 분류 -->
      </h4>
    </div>
    <ur-form-box>
      <!-- 이벤트 상세 분류 -->
      <ur-form-item
        :label="$t('MSG_TXT_EVENT_DETAIL_CLASS')"
        label-align="right"
        class="flex_wrap"
        style="width: 50%; height: auto;"
      >
        {{ eventDetailClassName }}
      </ur-form-item>
      <!-- 서브클럽 ID -->
      <ur-form-item
        v-if="showSubclubId"
        :label="$t('MSG_TXT_SUBCLUB_ID')"
        label-align="right"
        class="flex_wrap"
        style="width: 50%; height: auto;"
      >
        {{ eventSubData.subclubId }}
      </ur-form-item>
    </ur-form-box>
    <!-- E:: 이벤트 상세 분류 -->

    <!-- S:: 기타이벤트 이벤트 상세 정보 -->
    <div class="comm_title_wrap mt20">
      <h4>
        {{ $t('MSG_TXT_EVENT_DETAIL_INFO') }} <!-- 이벤트 상세 정보 -->
      </h4>
    </div>
    <ur-form-box>
      <!-- 내용 -->
      <ur-form-item
        :label="$t('MSG_TXT_DESC')"
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <sui-web-editor
          ref="eventDesc"
          :is-viewer="true"
        />
      </ur-form-item>
    </ur-form-box>
    <!-- E:: 기타이벤트 이벤트 상세 정보 -->
  </div>
</template>
<script>
import CommonUtils from '~aa/js/common-utils'

export default {
  name: 'PGE_AAG_00013_S05', // eslint-disable-line vue/name-property-casing
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
        'COD_IA_EVENT_DETAIL_CLASS', // 이벤트상세분류
      ],
      codes: {
        COD_IA_EVENT_EXPOSR_COND: [], // 이벤트노출조건
        COD_IA_EVENT_DETAIL_CLASS: [], // 이벤트상세분류
      },
      eventSubData: {
        // Single
        exposrCondCd: null, // 노출조건코드
        thumbnailImagUrl: null, // 썸네일이미지URL
        eventDetailClassCd: null, // 이벤트상세분류코드
        subclubId: null, // 서브클럽ID
        eventDesc: null, // 이벤트내용
      },
      eventPartcpCondList: [], // 참여조건목록
      eventPartcpCondListDesc: null, // 참여조건목록설명
    }
  },
  computed: {
    exposrCondName() {
      return CommonUtils.getCodeText(
        this.codes.COD_IA_EVENT_EXPOSR_COND,
        this.eventSubData.exposrCondCd,
      )
    },
    eventDetailClassName() {
      return CommonUtils.getCodeText(
        this.codes.COD_IA_EVENT_DETAIL_CLASS,
        this.eventSubData.eventDetailClassCd,
      )
    },
    showSubclubId() {
      // 이벤트상세분류: 클럽 가입 이벤트('002')
      return this.eventSubData.eventDetailClassCd === '002'
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
      this.initializeParams()
    })
  },
  methods: {
    initializeParams() {
      this.eventSubData = utils.assign(this.eventSubData, this.eventData)
      this.$refs.eventDesc.setHtml(this.eventSubData.eventDesc)
      this.selectEventPartcpCondList()
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
  },
}
</script>
