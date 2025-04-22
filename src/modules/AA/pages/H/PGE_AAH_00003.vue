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
        <!-- 다운로드 사유 -->
        <ur-form-item
          :label="$t('MSG_TXT_DOWN_RSN')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            ref="actPurpose"
            v-model="actPurpose"
            value=""
            maxlength="1000"
            fixed-message
            style="width: 100%;"
          />
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
              @click="popupView('PGE_AAH_00003', item.partcpSeq, item.fileSeq, item.fileMetaValue, index)"
            >
              <img
                v-if="item.fileMetaValue !== 'mp4'"
                :src="getVideoEventSource('PGE_AAH_00003', item.partcpSeq, item.fileSeq)"
                alt=""
                style="width: 200px; height: 120px"
              >
              <video
                v-else
                :id="`video${index}`"
                :src="getVideoEventSource('PGE_AAH_00003', item.partcpSeq, item.fileSeq)"
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
          class="flex_wrap"
          :label="$t('MSG_TXT_TEXT_SEND')"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="textSendstatusValue"
            :items="codes.COD_IA_TEXT_SEND_STATUS"
            style="width: 30%;"
            no-select
            :msg-no-select="$t('MSG_TXT_SEL')"
            @input="refuseStatusShow"
          />
          <ur-dropdown
            v-show="refuseShow"
            v-model="refuseStatusValue"
            :items="codes.COD_IA_REFUSE_STATUS"
            style="width: 30%;"
          />
          <ur-button
            v-permission:update="this.$options.name"
            color="violet"
            @click="saveMessageStatus"
          >
            {{ $t("MSG_TXT_TEXT_SEND_STATUS_CHG") }}
          </ur-button>
        </ur-form-item>
        <!-- 현재상태 -->
        <ur-form-item
          :label="$t('MSG_TXT_CURRENT_STATUS')"
          class="flex_wrap"
          label-align="right"
          style="width: 100%; height: auto;"
        >
          <span class="subscript_txt">
            {{ $t("MSG_TXT_UND_REVIEW") }}
          </span>
          <span
            class="subscript_txt"
            style="padding-left: 10px;"
            v-text="'→'"
          />
          <ur-dropdown
            v-model="statusValue"
            :items="codes.COD_VIDEO_LIST_VIEW_STATUS"
            style="width: 50%; padding-left: 10px"
          />
          <ur-button
            v-permission:update="this.$options.name"
            color="violet"
            @click="saveStatus"
          >
            {{ $t("MSG_TXT_STATUS_CHG") }}
          </ur-button>
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
              {{ $t("MSG_BTN_LIST") }}
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button
              v-permission:delete="this.$options.name"
              @click="remove"
            >
              {{ $t("MSG_BTN_DEL") }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import CommonUtils from '@/modules/AA/js/common-utils'
import VideoEventMixin from '~aa/pages/H/mixins/VideoEventMixin'
export default {
  name: 'PGE_AAH_00003', // eslint-disable-line vue/name-property-casing
  components: {
  },
  mixins: [VideoEventMixin],
  data() {
    return {
      codeKeys: [
        'COD_VIDEO_LIST_VIEW_STATUS',
        'COD_IA_TEXT_SEND_STATUS',
        'COD_IA_REFUSE_STATUS',
      ],
      codes: {
        COD_VIDEO_LIST_VIEW_STATUS: [],
        COD_IA_TEXT_SEND_STATUS: [],
        COD_IA_REFUSE_STATUS: [],
      },

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
      actPurpose: '',
      test: '',
      textSendstatusValue: '',
      refuseStatusValue: '',
      mediaPreviewList: [],
      refuseShow: false,
      memberShip: '',

      // 테이블 옵션
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      columns: null,
    }
  },
  created() {
    const params = utils.getParameter(this, 'params')
    if (utils.isEmpty(params.partcpSeq)) {
      this.onClickList()
    } else {
      this.partcpSeq = params.partcpSeq

      http.mergeCodeList(this.$options.name, this.codeKeys, this.codes)

      const that = this
      // 미디어정보 테이블
      this.columns = [
        { value: 'fileMetaValue', text: 'FileMeta' },
        { value: 'fileSizeValue', text: 'FileSize' },
        { value: 'widthValue', text: 'Width' },
        { value: 'heightValue', text: 'Height' },
        { value: 'playCnt', text: 'Playtime' },
        {
          value: 'saveFileUrl',
          text: 'FileName',
          component: {
            props: ['row', 'value'],
            template: `
              <div>
                <ur-button
                  v-permission:download="this.optionName"
                  color="violet"
                  @click="saveDownRsn(row.partcpSeq, row.fileSeq)" 
                >
                  <ur-icon
                    spacing
                    size="small"
                    icon="download"
                    icon-type="line"
                  />
                  다운로드
                </ur-button>
              </div>`,
            computed: {
              optionName() {
                return that.$options.name
              },
            },
            methods: {
              saveDownRsn(partcpSeq, fileSeq) {
                if (_.isEmpty(that.actPurpose)) {
                  utils.messageBox('warning', that.$t('MSG_ALT_DOWNRSN_INPUT'))
                  return
                }

                if (that.actPurpose.length < 5) {
                  utils.messageBox('warning', that.$t('MSG_ALT_DOWNRSN_INPUT_NUM'))
                  return
                }

                const param = {
                  partcpSeq,
                  fileSeq,
                  actPurpose: that.actPurpose,
                }

                http.request(that.$options.name, 'DTS_AAH_00005', {
                  query: param,
                }).then(() => {
                  that.download('PGE_AAH_00003', partcpSeq, fileSeq)
                  utils.messageBox('success', that.$t('MSG_ALT_FILE_DOWN'))
                }).catch(error => {
                  console.log(error)
                })
              },
            },
          },
        },
      ]
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
      this.statusValue = res.data.statusValueCode
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
      this.textSendstatusValue = res.data.textSendstatusValue
      this.refuseStatusValue = res.data.refuseStatusValue
      this.refuseStatusShow(this.textSendstatusValue)

      if (this.textSendstatusValue === null) {
        this.textSendstatusValue = ''
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
    refuseStatusShow(v) {
      if (v === '3') {
        this.refuseShow = true
        this.refuseStatusValue = '1'
      } else {
        this.refuseShow = false
      }
    },
    onClickList() {
      utils.goPage('PGE_AAH_00001', {})
    },
    saveMessageStatus() {
      if (this.textSendstatusValue === '') {
        utils.messageBox('warning', this.$t('MSG_ALT_TEXT_SEND_NOT_SEL'))
        return
      }

      if (this.textSendstatusValue !== '3') {
        this.refuseStatusValue = ''
      }

      const param = {
        partcpSeq: this.partcpSeq,
        textSendstatusValue: this.textSendstatusValue,
        refuseStatusValue: this.refuseStatusValue,
        memshpUid: this.memberShip.split('/')[1],
        subject: this.subject,
        slotDay: this.slotDay,
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_TEXT_SEND_MSG'), null, () => {
        http.request(this.$options.name, 'DTS_AAH_00006', {
          query: param,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_TEXT_SEND_FIN'))
        }).catch(error => {
          console.log(error)
        })
      })
    },
    saveStatus() {
      const param = {
        partcpSeq: this.partcpSeq,
        statusValue: this.statusValue,
      }

      // eslint-disable-next-line max-len
      const statusChangeText = CommonUtils.getCodeText(this.codes.COD_VIDEO_LIST_VIEW_STATUS, this.statusValue)

      utils.messageBox('confirm', statusChangeText + this.$t('MSG_ALT_STATUS_CHANGE_MSG'), null, () => {
        http.request(this.$options.name, 'DTS_AAH_00007', {
          query: param,
        }).then(() => {
          utils.messageBox('success', this.$t('MSG_ALT_STATUS_CHG_FI'))
        }).catch(error => {
          console.log(error)
        })
      })
    },
    remove() {
      const param = {
        partcpSeq: this.partcpSeq,
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
        http.request(this.$options.name, 'DTS_AAH_00008', {
          query: param,
        }).then(res => {
          if (res.data.count > 0) {
            utils.messageBox('success', this.$t('MSG_ALT_DELETED'))
            utils.goPage('PGE_AAH_00001', {})
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
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
          utils.messageBox('warning', that.$t('MSG_ALT_NOT_MEDIA'))
        }

        img.src = that.getVideoEventSource(id, partcpSeq, fileSeq)
      }
    },

    download(pageId, partcpSeq, fileSeq) {
      this.downloadVideoEventFile(pageId, partcpSeq, fileSeq)
    },
  },
}

</script>
<style scoped>
</style>
