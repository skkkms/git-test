<!-- eslint-disable max-len -->
<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>
          {{ $t('MSG_TIT_APPL_HIST') }} <!-- 신청내역 -->
        </h4>
      </div>
      <ur-form-box>
        <!-- 슬롯 -->
        <ur-form-item
          :label="$t('MSG_TXT_SLOT')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ subject2+' ('+slotDay+')' }}
        </ur-form-item>
        <!-- 타임슬롯 -->
        <ur-form-item
          :label="$t('MSG_TXT_TIME_SLOT')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ timeVal }}
        </ur-form-item>
        <!-- 제목 -->
        <ur-form-item
          :label="$t('MSG_TXT_TTL')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ subject }}
        </ur-form-item>
        <!-- 작성자 -->
        <ur-form-item
          :label="$t('MSG_TXT_DRAT_NM')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ memberShip }}
        </ur-form-item>
        <!-- 일자 -->
        <ur-form-item
          :label="$t('MSG_TXT_DT')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ fstRgstDtm }}
        </ur-form-item>
        <!-- 내용 -->
        <ur-form-item
          :label="$t('MSG_TXT_CNTN')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ desc }}
        </ur-form-item>
        <!-- 미디어 정보 -->
        <ur-form-item
          :label="$t('MSG_TXT_MEDIA_INFO')"
          label-align="right"
          style="width: 100%; height: auto;"
          class="item_grid"
        >
          <ur-data-grid
            ref="grid"
            style="width: 100%;"
            :headers="columns"
            :data-source="dataList"
            :options="options"
            :data-set-options="{id: 'id'}"
          />
        </ur-form-item>
        <!-- 미디어 미리보기 -->
        <ur-form-item
          :label="$t('MSG_TXT_MEDIA_PREV')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          <template v-for="(item, index) in mediaPreviewList">
            <a
              :key="index"
              href="#"
              @click="popupView('PGE_AAH_00002', item.partcpSeq, item.fileSeq, item.fileMetaValue, index)"
            >
              <img
                v-if="item.fileMetaValue !== 'mp4'"
                :src="getVideoEventSource('PGE_AAH_00002', item.partcpSeq, item.fileSeq)"
                alt=""
                style="width: 200px; height: 120px"
              >
              <video
                v-else
                :id="`video${index}`"
                :src="getVideoEventSource('PGE_AAH_00002', item.partcpSeq, item.fileSeq)"
                controls
                style="width: 200px; height: 120px"
              />
            </a>
          </template>
        </ur-form-item>
      </ur-form-box>

      <div class="comm_title_wrap mt35">
        <h4>
          {{ $t('MSG_TIT_PROCESS') }} <!-- 처리하기 -->
        </h4>
      </div>
      <ur-form-box>
        <!-- 문자발송 -->
        <ur-form-item
          :label="$t('MSG_TXT_TEXT_SEND')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ smsSendStatusValue }}
        </ur-form-item>
        <!-- 현재상태 -->
        <ur-form-item
          :label="$t('MSG_TXT_CURRENT_STATUS')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          {{ statusValue }}
        </ur-form-item>
      </ur-form-box>
      <!-- E:: 처리하기 -->


      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button
              v-permission:read="this.$options.name"
              @click="onClickList"
            >
              {{ $t('MSG_BTN_LIST') }}
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button
              v-permission:update="this.$options.name"
              color="violet"
              @click="modifyForm"
            >
              {{ $t('MSG_BTN_MOD') }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import VideoEventMixin from '~aa/pages/H/mixins/VideoEventMixin'
export default {
  name: 'PGE_AAH_00002', // eslint-disable-line vue/name-property-casing
  components: {
  },
  mixins: [VideoEventMixin],
  data() {
    return {
      dataList: new this.$ur.grid.DataSet(),
      partcpSeq: '',
      partcpPersnId: '',
      subject: '',
      subject2: '',
      slotDay: '',
      timeVal: '',
      desc: '',
      statusValue: '',
      smsSndgYn: '',
      smsSndgTime: '',
      slotSeq: '',
      timeSeq: '',
      partcpTypeValue: '',
      fstRgstDtm: '',
      mediaPreviewList: [],
      memberShip: '',
      textSendstatusValue: '',
      refuseStatusValue: '',
      smsSendStatusValue: '',

      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    columns() {
      return [
        { value: 'fileMetaValue', text: 'FileMeta' },
        { value: 'fileSizeValue', text: 'FileSize' },
        { value: 'widthValue', text: 'Width' },
        { value: 'heightValue', text: 'Height' },
        { value: 'playCnt', text: 'Playtime' },
        { value: 'fileName', text: 'FileName' },
      ]
    },
  },
  created() {
    const params = utils.getParameter(this, 'params')
    if (utils.isEmpty(params.partcpSeq)) {
      this.onClickList()
    } else {
      this.partcpSeq = params.partcpSeq
    }
  },
  mounted() {
    if (utils.isEmpty(this.partcpSeq)) return

    const queryParams = {
      partcpSeq: this.partcpSeq,
    }

    // 상세
    http.request(this.$options.name, 'DTS_AAH_00002', {
      query: queryParams,
    }).then(res => {
      this.partcpSeq = res.data.partcpSeq
      this.partcpPersnId = res.data.partcpPersnId
      this.subject = res.data.subject
      this.desc = res.data.desc
      this.statusValue = res.data.statusValue
      this.smsSndgYn = res.data.smsSndgYn
      this.smsSndgTime = res.data.smsSndgTime
      this.slotSeq = res.data.slotSeq
      this.timeSeq = res.data.timeSeq
      this.partcpTypeValue = res.data.partcpTypeValue
      this.fstRgstDtm = utils.dateformatToClient(res.data.fstRgstDtm)
      this.subject2 = res.data.subject2
      this.slotDay = res.data.slotDay
      this.timeVal = res.data.timeVal
      this.memberShip = res.data.memberShip
      this.textSendstatusValue = res.data.textSendstatusValueNm
      this.refuseStatusValue = res.data.refuseStatusValueNm

      if (this.refuseStatusValue === null) {
        this.smsSendStatusValue = this.textSendstatusValue
      } else {
        this.smsSendStatusValue = `${this.textSendstatusValue} -> ${this.refuseStatusValue}`
      }
    }).catch(error => {
      console.log('error : ', error)
    })

    http.request(this.$options.name, 'DTS_AAH_00009', {
      query: queryParams,
    }).then(res => {
      this.dataList.setData(res.data)
      this.mediaPreviewList = res.data
    }).catch(error => {
      console.log('error : ', error)
    })
  },
  methods: {
    popupView(id, partcpSeq, fileSeq, fileMetaValue, idx) {
      const that = this

      if (fileMetaValue === 'mp4') {
        const nWidth = '800'
        const nHeight = '600'
        const xPos = (document.body.clientWidth / 2) - (nWidth / 2)
        const yPos = (window.screen.availHeight / 2) - (nHeight / 2)

        const video = document.getElementById(`video${idx}`)
        video.addEventListener('play', () => {
          window.open(that.getVideoEventSource(id, partcpSeq, fileSeq), 'imagePopup', `width=${nWidth},height=${nHeight}, left=${xPos}, top=${yPos}`)
        }, false)
      } else {
        const img = new Image()
        img.onload = () => {
          const nWidth = '800'
          const nHeight = '600'
          const xPos = (document.body.clientWidth / 2) - (nWidth / 2)
          const yPos = (window.screen.availHeight / 2) - (nHeight / 2)

          window.open(that.getVideoEventSource(id, partcpSeq, fileSeq), 'imagePopup', `width=${nWidth},height=${nHeight}, left=${xPos}, top=${yPos}`)
          return false
        }
        img.onerror = () => {
          utils.messageBox('alert', that.$t('MSG_ALT_NOT_MEDIA'))
        }

        img.src = that.getVideoEventSource(id, partcpSeq, fileSeq)
      }
    },

    onClickList() {
      utils.goPage('PGE_AAH_00001', {})
    },
    modifyForm() {
      const params = {}
      params.partcpSeq = this.partcpSeq
      utils.goPage('PGE_AAH_00003', { params })
    },

  },
}

</script>
<style scoped>
</style>
