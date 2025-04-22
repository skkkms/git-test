<template>
  <sui-page class="custom_page">
    <!-- Page Header -->
    <sui-page-header
      :page-id="this.$options.name"
    />
    <!-- Page Contents -->
    <sui-page-contents>
      <!-- <div class="mrB30" /> -->
      <!-- S::QnA 자세히 보기  -->
      <div class="comm_title_wrap">
        <h4>{{ $t('MSG_TXT_QNA_DETAIL') }}</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="this.$t('MSG_TXT_INQURY_TYPE')+'1'"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <CodeSelect
            :code-list="codes.COD_IA_VOC_QUEST_KIND"
            :code-value="data.voc.questTypeCd"
          />
        </ur-form-item>
        <ur-form-item
          :label="this.$t('MSG_TXT_INQURY_TYPE')+'2'"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <CodeSelect
            :code-list="codes.COD_IA_VOC_SVC_CD_ALL"
            :code-value="data.voc.svcCd"
          />
        </ur-form-item>
        <ur-form-item
          :label="this.$t('MSG_TXT_ANSWER_TYPE')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <CodeSelect
            :code-list="codes.COD_IA_VOC_PROC_STATUS"
            :code-value="data.voc.procStatusCd"
          />
        </ur-form-item>
        <ur-form-item
          :label="this.$t('MSG_TXT_MEMBERSHIP_NO')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{ data.voc.memshpUid }}
        </ur-form-item>
        <ur-form-item
          :label="this.$t('MSG_TXT_ID')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{ data.voc.questPersnUsrId }}
        </ur-form-item>
        <ur-form-item
          :label="this.$t('MSG_TXT_INQUIRER_NM')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{ data.questPersn.questPersnUsrNm }}
        </ur-form-item>
        <ur-form-item
          :label="this.$t('MSG_TXT_EMAIL')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{ data.questPersn.questPersnEmail }}
        </ur-form-item>
        <ur-form-item
          :label="this.$t('MSG_TXT_MOBILE_NO')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{ cellphone }}
        </ur-form-item>
        <ur-form-item
          :label="this.$t('MSG_TIT_DRAT_DT')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{ data.voc.questDtm | dateFormat }}
        </ur-form-item>
        <ur-form-item
          :label="this.$t('MSG_TXT_SUBJT')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{ data.voc.questTitle }}
        </ur-form-item>
        <ur-form-item
          :label="this.$t('MSG_TXT_CNTN')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <div v-html="questDesc" />
        </ur-form-item>
        <ur-form-item
          :label="this.$t('MSG_TXT_VISIT_DT')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{ data.voc.visitDate | dateFormat }}
        </ur-form-item>
        <ur-form-item
          :label="this.$t('MSG_TXT_ATTH_FILE')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-button
            v-for="file in data.attach"
            :key="file.attachSeqNo"
            v-permission:create="$options.name"
            hyperlink
            small
            style="padding: 0;"
            @click="openFile(file.attachSeqNo, file.fileName)"
          >
            {{ file.fileName }}
          </ur-button>
        </ur-form-item>
      </ur-form-box>
      <!-- E:: QnA 자세히 보기 -->

      <!-- S:: 내역변경 -->
      <div class="comm_title_wrap mt45">
        <h4>{{ $t('MSG_TXT_CHNG_TYPE' ) }}</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="this.$t('MSG_TXT_INQURY_TYPE')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-dropdown
            ref="questTypeCd"
            v-model="questTypeCd"
            :items="this.codes.COD_IA_VOC_QUEST_KIND"
            @input="changeQuestTypeCd"
          />
        </ur-form-item>
        <ur-form-item
          :label="this.$t('MSG_TXT_INQURY_TYPE')+'2'"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-dropdown
            ref="svcCd"
            v-model="svcCd"
            :items="this.svcCdList"
          />
        </ur-form-item>
        <ur-form-item
          :label="this.$t('MSG_TXT_PRCS_STT')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <div style="width: 100%">
            <ur-dropdown
              ref="procStatus"
              v-model="procStatusCd"
              :items="this.codes.COD_IA_VOC_PROC_STATUS"
            />

            <div
              v-for="memo in data.memo"
              :key="memo.memoSeqNo"
            >
              <textarea
                class="ml0"
                style="width: 100%;"
                readonly
                :rows="textAreaRow(memo)"
                v-text="formatMemo(memo)"
              />
            </div>
            <ur-text-area
              ref="txtMemo"
              v-model="memoDescrt"
              max-byte="600"
              rows="4"
              class="ml0"
              style="width: 100%"
            />
          </div>
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
            v-permission:create="this.$options.name"
            color="violet"
            @click="updateVocStatus"
          >
            {{ $t('MSG_BTN_SVE') }}
          </ur-button>
        </div>
      </div>
      <!-- S:: 답변하기 -->
      <div class="comm_title_wrap mt35">
        <h4>{{ $t('MSG_TXT_REPLY') }}</h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_REPLY_TEMP')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="answr.comReplyTempCd"
            :items="replyTemp"
            :placeholder="$t('MSG_TXT_SEL')"
            @input="onReplyTempChange"
          />
        </ur-form-item>

        <ur-form-item
          :label="$t('MSG_TXT_SUBJT')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            ref="txtReplyTitle"
            v-model="answr.answrTitle"
            maxlength="300"
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_CNTN')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <sui-web-editor
            ref="webEditor"
            :is-viewer="false"
          />
        </ur-form-item>
        <!-- S::답변 및 내역 변경이 있는경우 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_VOC_MYPAGE_PUBLISH')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="mypagePublctYn"
            :items="this.codes.COD_IA_VOC_MYPAGE_PUBLISH"
            sm
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_VOC_EMAIL_SEND')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="emailSndgYn"
            :items="this.codes.COD_IA_VOC_EMAIL_SNDG_YN"
            sm
          />
        </ur-form-item>
      </ur-form-box>

      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
            color="violet"
            @click="insertVocAnswr"
          >
            {{ $t('MSG_BTN_SVE') }}
          </ur-button>
        </div>
      </div>

      <!-- E:: 답변하기 -->
      <!-- S:: 이전답변 -->
      <div
        v-for="answr in data.answr"
        :key="answr.answrSeqNo"
        class="comm_view_wrap mb45"
      >
        <div class="comm_title_wrap mt45">
          <h4>{{ $t('MSG_TXT_PREV_RPLY') }}</h4>
        </div>

        <ur-form-box toggleable>
          <ur-form-item
            :label="$t('MSG_TXT_ANSWERER_NM')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            {{ answr.answrCreatPersnId }}
          </ur-form-item>
          <ur-form-item
            :label="$t('MSG_TIT_PROC_DTM')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            {{ answr.answrCreatDtm | dateFormat }}
          </ur-form-item>
          <ur-form-item
            :label="$t('MSG_TXT_SUBJT')"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            {{ answr.answrTitle }}
          </ur-form-item>
          <ur-form-item
            :label="$t('MSG_TXT_CNTN')"
            :label-align="'right'"
            style="width: 100%; height: auto;"
          >
            <div
              v-html="answr.answrDesc"
            />
          </ur-form-item>
        </ur-form-box>
      </div>
      <!-- E:: 답변완료 -->

      <!-- <div class="mrB30" /> -->
      <div class="bt1" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button @click="goToList">
              {{ $t('MSG_BTN_LIST') }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

import CodeSelect from '@/modules/AA/components/CodeSelect.vue'

export default {
  name: 'PGE_AAA_00002', // eslint-disable-line vue/name-property-casing
  components: { CodeSelect },
  // eslint-disable-line vue/name-property-casing
  filters: {
    dateFormat(date) {
      if (!date) return ''
      return utils.dateformatToClient(date, (date.length === 8 ? 'S' : ''))
      // alert('dsaf')
      // return ''
    },
  }, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      CODE_KEYS: ['COD_IA_VOC_PROC_STATUS', 'COD_IA_VOC_QUEST_KIND', 'COD_IA_VOC_SVC_CD', 'COD_IA_VOC_SVC_CD_CS', 'COD_IA_VOC_MYPAGE_PUBLISH', 'COD_IA_VOC_EMAIL_SNDG_YN'],
      codes: {
        COD_IA_VOC_PROC_STATUS: [],
        COD_IA_VOC_QUEST_KIND: [],
        COD_IA_VOC_SVC_CD: [],
        COD_IA_VOC_SVC_CD_CS: [],
        COD_IA_VOC_SVC_CD_ALL: [],
        COD_IA_VOC_MYPAGE_PUBLISH: [],
        COD_IA_VOC_EMAIL_SNDG_YN: [],
      },
      vocId: '',
      data: {
        questPersn: {
          questPersnUserId: '',
          questPersnUserNm: '',
          questPersnUserEmail: '',
          questPersnUserCellphone: '',
        },
        voc: {
          questTypeCd: '',
          procStatusCd: '',
          svcCd: '',
          questDtm: '',
          questTitle: '',
          questDesc: '',
          visitDate: '',
          mypagePublctYn: '',
          email_sndg_yn: '',
        },
        attach: [],
        memo: [],
        answr: [],
        replyTemp: [],
      },
      questTypeCd: '',
      svcCd: '',
      procStatusCd: '',
      svcCdList: [],
      replyTemp: [],
      replyTempSelect: '',
      memoDescrt: '',
      defaultAnserDesc: '<p>안녕하십니까? 에버랜드입니다. <br>손님께서 보내주신 문의 글은 잘 받아보았습니다.<br><br><br><br>홈페이지 및 모바일 어플리케이션을 통해서도 다양한 정보를 확인 하실 수 있습니다.<br>고맙습니다.<br></p>',
      answr: {
        answrTitle: '',
        answrDesc: '',
      },
      mypagePublctYn: 'N',
      emailSndgYn: 'N',
    }
  },
  computed: {
    cellphone() {
      if (!this.data.questPersn.questPersnCellphone) {
        return ''
      }
      const oldCellPhone = this.data.questPersn.questPersnCellphone
      let cellPhone = oldCellPhone.substring(0, 3)
      cellPhone += '-'
      cellPhone += oldCellPhone.substring(3, 7)
      cellPhone += '-'
      cellPhone += oldCellPhone.substring(7)

      return cellPhone
    },
    questDesc() {
      const ret = this.data.voc.questDesc.replaceAll('\r\n', '<br/>')
      return ret
    },
  },
  watch: {},
  created() {
    this.selectCode()
  },
  mounted() {
    const params = utils.getParameter(this, 'params')
    this.vocId = params.vocId

    if (this.vocId === undefined || this.vocId === null) {
      this.goToList()
      return
    }
    this.selectVoc()
  },
  methods: {
    async selectCode() {
      await http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
      this.codes.COD_IA_VOC_SVC_CD_ALL = [...this.codes.COD_IA_VOC_SVC_CD,
        ...this.codes.COD_IA_VOC_SVC_CD_CS]
    },
    selectVoc() {
      http.request(this.$options.name, 'DTS_AAA_00002', {
        path: {
          'voc-id': this.vocId,
        },
      }).then(res => {
        if (res.data) {
          this.data = res.data
          this.questTypeCd = this.data.voc.questTypeCd
          this.svcCd = this.data.voc.svcCd
          this.procStatusCd = this.data.voc.procStatusCd
          // this.replyTemp = res.data.replyTemp
          this.replyTemp = []

          this.replyTemp.push({ text: this.$t('MSG_TXT_SEL'), value: '', desc: this.defaultAnserDesc })
          res.data.replyTemp.forEach(it => {
            const obj = {}
            obj.text = it.codeName
            obj.value = it.codeValue
            obj.desc = it.contentDesc
            this.replyTemp.push(obj)
          })
          // this.mypagePublctYn = this.data.voc.mypagePublctYn
          // this.emailSndgYn = this.data.voc.emailSndgYn
          this.answr.answrTitle = `RE: ${this.data.voc.questTitle}`
          this.mypagePublctYn = 'N'
          this.emailSndgYn = 'N'
          this.$refs.webEditor.setHtml(this.defaultAnserDesc)
          this.changeQuestTypeCd()
        }
      }).catch(error => {
        console.log(error)
      })
    },

    confirmNormalQuest() {
      /*
        일반 문의가 아닌경우 통합CS에서 처리하기 때문에 admin에서 변경을 못하게 한다.
       */
      return this.data.voc.questTypeCd === 'CODE0000012702'
    },
    goToList() {
      const params = utils.getParameter(this, 'params')
      delete params.vocId
      utils.goPage('PGE_AAA_00001', { params })
    },
    onReplyTempChange() {
      const than = this
      const replykey = this.answr.comReplyTempCd
      this.replyTemp.forEach(it => {
        if (replykey === it.value) {
          this.replyTempSelect = it.desc
        }
      })
      if (this.answr.answrDesc === '') {
        this.$refs.webEditor.setHtml(this.replyTempSelect)
      } else {
        utils.messageBox('confirm', 'Main message', null,
          function () {
            this.$refs.webEditor.setHtml(this.replyTempSelect)
          },
          () => { })
      }
    },
    openFile(seq, fileName) {
      http.request(this.$options.name, 'DTS_AAA_00008', {
        path: {
          'voc-id': this.vocId,
          'attach-seq-no': seq,
        },
        responseType: 'arraybuffer',
      }).then(res => {
        utils.downloadBlob(res, fileName)
      })
    },
    changeQuestTypeCd() {
      this.$nextTick(() => {
        this.svcCdList = []
        if (this.questTypeCd === 'CODE0000012702') {
          // 일반 문의일 경우
          this.svcCdList = this.codes.COD_IA_VOC_SVC_CD
        } else {
          this.svcCdList = this.codes.COD_IA_VOC_SVC_CD_CS
        }

        if (this.svcCd === null || this.svcCd === '') {
          this.svcCd = this.svcCdList[0].value
        }

        let matched = false
        for (let i = 0; i < this.svcCdList.length; i++) {
          if (this.svcCdList[i].value === this.svcCd) {
            matched = true
          }
        }
        if (!matched) {
          this.svcCd = this.svcCdList[0].value
        }
      })
    },
    // eslint-disable-next-line -return
    updateVocStatus() {
      if (!this.confirmNormalQuest()) {
        utils.messageBox('alert', '', this.$t('MSG_TXT_VOC_CS_QUESTION_STATUS_ERROR'))
        return
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
        const param = {
          questTypeCd: this.questTypeCd,
          svcCd: this.svcCd,
          procStatusCd: this.procStatusCd,
          memoDescrt: this.memoDescrt,
        }
        http.request(this.$options.name, 'DTS_AAA_00003', {
          path: {
            'voc-id': this.vocId,
          },
          data: param,
        }).then(res => {
          if (res.data) {
            if (res.data === 1) {
              this.data.voc.questTypeCd = this.questTypeCd
              this.data.voc.svcCd = this.svcCd
              this.data.voc.procStatusCd = this.procStatusCd
              utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
              this.selectVoc()
              this.memoDescrt = ''
            }
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    // updateVocProcStatus() {
    //   utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
    //     const param = {
    //       procStatusCd: this.procStatusCd,
    //     }
    //     http.request(this.$options.name, 'DTS_AAA_00003', {
    //       path: {
    //         'voc-id': this.vocId,
    //       },
    //       data: param,
    //     }).then(res => {
    //       if (res.data) {
    //         if (res.data === 1) {
    //           this.data.voc.procStatusCd = this.procStatusCd
    //           utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
    //           this.selectVoc()
    //         }
    //       }
    //     }).catch(error => {
    //       console.log(error)
    //     })
    //   })
    // },
    insertVocAnswr() {
      if (!this.confirmNormalQuest()) {
        utils.messageBox('alert', '', this.$t('MSG_TXT_VOC_CS_QUESTION_REPLY_ERROR'))
        return
      }

      if (_.isEmpty(this.answr.answrTitle)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_SUBJECT_INPUT')))
        return
      }
      if (_.isEmpty(this.$refs.webEditor.getHtml())) { // this.answr.answrDesc
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_ROW_INPUT_CONTENT')))
        return
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
        const params = {
          answrTitle: this.answr.answrTitle,
          answrDesc: this.$refs.webEditor.getHtml(), // this.answr.answrDesc,
          mypagePublctYn: this.mypagePublctYn,
          emailSndgYn: this.emailSndgYn,
        }

        http.request(this.$options.name, 'DTS_AAA_00004', {
          path: {
            'voc-id': this.vocId,
          },
          data: params,
        }).then(res => {
          if (res.data) {
            this.data = res.data
            console.log(this.data)
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
            this.selectVoc()
            this.questTypeCd = ''
            this.answr.comReplyTempCd = ''
            // this.answr.answrTitle = 'RE:'+this.data.voc.questTitle
            this.$refs.webEditor.setHtml(this.defaultAnserDesc) // this.answr.answrDesc = ''
            this.mypagePublctYn = 'N'
            this.emailSndgYn = 'N'
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    insertVocMemo() {
      if (!this.$rules.validate(this.$refs.txtMemo)) {
        return
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
        const param = {
          memoDescrt: this.memoDescrt,
        }
        http.request(this.$options.name, 'DTS_AAA_00005', {
          path: {
            'voc-id': this.vocId,
          },
          data: param,
        }).then(res => {
          if (res.data) {
            this.data = res.data
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
            this.selectVoc()
            this.memoDescrt = ''
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    formatMemo(row) {
      return `${row.memoCreatPersnId}|${utils.dateformatToClient(row.memoCreatDtm)}\n${row.memoDescrt}`
    },
    textAreaRow(row) {
      return row.memoDescrt.split('\n').length + 1
    },
  },
}
</script>
<style lang="scss" scoped>

</style>
