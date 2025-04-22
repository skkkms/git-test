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
        <ur-dropdown
          v-model="eventSubData.eventDetailClassCd"
          :items="codes.COD_IA_EVENT_DETAIL_CLASS"
          :placeholder="$t('MSG_TXT_SEL')"
          style="width: 180px !important"
          @input="onInputEventDetailClass"
        />
      </ur-form-item>
      <!-- 서브클럽 ID -->
      <ur-form-item
        v-if="showSubclubId"
        :label="$t('MSG_TXT_SUBCLUB_ID')"
        label-align="right"
        class="flex_wrap"
        style="width: 50%; height: auto;"
        required
      >
        <ur-text-field
          v-model="eventSubData.subclubId"
          style="width: 150px !important"
          maxlength="10"
          @keyup="eventSubData.subclubId = adjustSubclubId(eventSubData.subclubId)"
        />
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
        required
        label-align="right"
        class="flex_wrap"
        style="width: 100%; height: auto;"
      >
        <sui-web-editor ref="eventDesc" />
      </ur-form-item>
    </ur-form-box>
    <!-- E:: 기타이벤트 이벤트 상세 정보 -->
  </div>
</template>
<script>
export default {
  name: 'PGE_AAG_00012_S05', // eslint-disable-line vue/name-property-casing
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
        COD_IA_YN: [{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],
      },
      eventSubData: {
        // Single
        exposrCondCd: '01', // 노출조건코드(default: 전체('01'))
        thumbnailImagUrl: null, // 썸네일이미지URL
        thumbnailImagAltDesc: null, // 썸네일이미지ALT내용
        eventDetailClassCd: '001', // 이벤트상세분류코드(default: 일반 기타 이벤트('001'))
        subclubId: null, // 서브클럽ID
        eventDesc: null, // 이벤트내용
        // Multi
        eventPartcpCondList: { // 참여조건목록
          insert: [],
          update: [],
          delete: [],
        },
      },
      eventPartcpCondList: [], // 참여조건목록
      eventPartcpCondListDesc: null, // 참여조건목록설명
    }
  },
  computed: {
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
      if (this.eventId) {
        // UPDATE
        this.eventSubData = utils.assign(this.eventSubData, this.eventData)
        this.$refs.eventDesc.setHtml(this.eventSubData.eventDesc)
        this.selectEventPartcpCondList()
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
    onInputEventDetailClass(value) {
      if (value !== '002') {
        this.eventSubData.subclubId = null
      }
    },
    adjustSubclubId(value) {
      return value ? value.toUpperCase().replace(/[^A-Z0-9]/g, '') : null
    },
    isValid() {
      // 이벤트 이미지 정보
      if (utils.isEmpty(this.eventSubData.thumbnailImagUrl)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_THUMBNAIL_IMAG'))) // {썸네일 이미지}은(는) 필수 항목입니다.
        return false
      }

      // 이벤트 상세 분류
      if (this.eventSubData.eventDetailClassCd === '002' && utils.isEmpty(this.eventSubData.subclubId)) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_SUBCLUB_ID'))) // {서브클럽 ID}은(는) 필수 항목입니다.
        return false
      }

      // 이벤트 상세 정보
      if (this.$refs.eventDesc.getContentSize() === 0) {
        utils.messageBox('warning', utils.strFormat(this.$t('MSG_ALT_NCELL_REQUIRED_ITEM'), this.$t('MSG_TXT_DESC'))) // {내용}은(는) 필수 항목입니다.
        return false
      }

      this.eventSubData.eventDesc = this.$refs.eventDesc.getHtml()
      return true
    },
  },
}
</script>
