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
      <div class="comm_view_wrap mb45">
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_INQURY_TYPE') }}
          </div>
          <div class="col-xs-11">
            <CodeSelect
              :code-list="codes.COD_IA_VOC_QUEST_KIND"
              :code-value="data.voc.questTypeCd"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_ANSWER_TYPE') }}
          </div>
          <div class="col-xs-11">
            <CodeSelect
              :code-list="codes.COD_IA_VOC_PROC_STATUS"
              :code-value="data.voc.procStatusCd"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_ID') }}
          </div>
          <div class="col-xs-11">
            {{ data.questPersn.questPersnUsrId }}
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_INQUIRER_NM') }}
          </div>
          <div class="col-xs-11">
            {{ data.questPersn.questPersnUsrNm }}
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_EMAIL') }}
          </div>
          <div class="col-xs-11">
            {{ data.questPersn.questPersnEmail }}
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_MOBILE_NO') }}
          </div>
          <div class="col-xs-11">
            {{ data.questPersn.questPersnCellphone }}
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TIT_DRAT_DT') }}
          </div>
          <div class="col-xs-11">
            {{ data.voc.questDtm }}
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_SUBJT') }}
          </div>
          <div class="col-xs-11">
            {{ data.voc.questTitle }}
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_CNTN') }}
          </div>
          <div class="col-xs-11">
            {{ data.voc.questDesc }}
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_VISIT_DT') }}
          </div>
          <div class="col-xs-11">
            {{ data.voc.visitDate }}
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_ATTH_FILE') }}
          </div>
          <div class="col-xs-11">
            <template v-for="file in data.attach">
              <ur-button
                :key="file.attachSeqNo"
                hyperlink
                small
                style="padding: 0;"
                @click="openFile(file.fileUrl)"
                v-permission:download="this.$options.name"
              >
                {{ file.fileName }}
              </ur-button>
            </template>
          </div>
        </div>
      </div>
      <!-- E:: QnA 자세히 보기 -->


      <!-- S:: 내역변경 -->
      <div class="comm_title_wrap">
        <h4>{{ $t('MSG_TXT_CHNG_TYPE' ) }}</h4>
      </div>
      <div class="comm_view_wrap mb45">
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_INQURY_TYPE') }}
          </div>
          <div
            class="col-xs-11"
          >
            <ur-dropdown
              ref="questTypeCd"
              v-model="questTypeCd"
              :items="this.codes.COD_IA_VOC_QUEST_KIND"
              :rules="$rules.getRules('not_empty')"
              @input="changeQuestTypeCd"
            />
            <ur-dropdown
              ref="svcCd"
              v-model="svcCd"
              :items="this.svcCdList"
              :rules="$rules.getRules('not_empty')"
            />
            <ur-button
              color="violet"
              @click="updateVocStatus"
              v-permission:update="this.$options.name"
            >
              {{ $t('MSG_BTN_CHANGE') }}
            </ur-button>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_PRCS_STT') }}
          </div>
          <div class="col-xs-11">
            <ur-dropdown
                ref="procStatus"
                v-model="procStatusCd"
                :items="this.codes.COD_IA_VOC_PROC_STATUS"
            />
            <ur-button
                color="violet"
                @click="updateVocProcStatus"
                v-permission:update="this.$options.name"
            >
              {{ $t('MSG_BTN_CHANGE') }}
            </ur-button>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_CNTN') }}
          </div>
          <div class="col-xs-11">
            <ur-text-area
              v-model="memoDescrt"
              max-byte="600"
              rows="4"
              style="width: 100%"
              :rules="$rules.getRules('not_empty')"
              ref="txtMemo"
            />
            <ur-button
              color="violet"
              @click="insertVocMemo"
              v-permission:update="this.$options.name"
            >
              {{ $t('MSG_BTN_SVE') }}
            </ur-button>
          </div>
        </div>
      </div>
      <!-- E:: 내역변경 -->

      <!-- S:: 답변하기 -->
      <div class="comm_title_wrap">
        <h4>{{ $t('MSG_TXT_REPLY') }}</h4>
      </div>
      <div class="comm_view_wrap mb45">
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_VOC_MYPAGE_PUBLISH') }}
          </div>
          <div
              class="col-xs-11"
          >
            <ur-dropdown
                :items="this.codes.COD_IA_VOC_MYPAGE_PUBLISH"
                v-model="mypagePublctYn"
                :rules="$rules.getRules('not_empty')"
                @input="changeQuestTypeCd"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_VOC_EMAIL_SEND') }}
          </div>
          <div
              class="col-xs-11"
          >
            <ur-dropdown
                v-model="emailSndgYn"
                :items="this.codes.COD_IA_VOC_EMAIL_SNDG_YN"
                :rules="$rules.getRules('not_empty')"
                @input="changeQuestTypeCd"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_SUBJT') }}
          </div>
          <div class="col-xs-11">
            <ur-text-field
                v-model="answr.answrTitle"
                maxlength="300"
                style="width: 100%;"
                :rules="$rules.getRules('not_empty')"
                ref="txtReplyTitle"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_CNTN') }}
          </div>
          <div class="col-xs-11">
            <ur-text-area
                v-model="answr.answrDesc"
                max-byte="600"
                rows="4"
                class="text-focus-color"
                style="width: 100%;"
                :rules="$rules.getRules('not_empty')"
                ref="txtReplyCtnt"
            />
          </div>
        </div>
      </div>
      <!-- E:: 답변하기 -->

      <!-- S:: 메모 -->
      <div class="comm_title_wrap">
        <h4>{{ $t('MSG_TXT_MEMO') }}</h4>
      </div>

      <div
        v-for="memo in data.memo"
        :key="memo"
        class="comm_view_wrap mb45"
      >
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TIT_DOC_CRTR') }}
          </div>
          <div class="col-xs-5">
            {{ memo.memoCreatPersnId }}
          </div>
          <div class="col-xs-1">
            {{ $t('MSG_TIT_DRAT_DT') }}
          </div>
          <div class="col-xs-5">
            {{ memo.memoCreatDtm | dateFormat}}
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_CNTN') }}
          </div>
          <div class="col-xs-11" v-html="memo.memoDescrt">
          </div>
        </div>
      </div>
      <!-- E:: 메모 -->

      <!-- S:: 이전답변 -->
      <div class="comm_title_wrap">
        <h4>{{ $t('MSG_TXT_PREV_RPLY') }}</h4>
      </div>

      <div
        v-for="answr in data.answr"
        class="comm_view_wrap mb45"
        :key="answr.answrSeqNo"
      >
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_ANSWERER_NM') }}
          </div>
          <div class="col-xs-5">
            {{ answr.answrCreatPersnId }}
          </div>
          <div class="col-xs-1">
            {{ $t('MSG_TIT_PROC_DTM') }}
          </div>
          <div class="col-xs-5">
            {{ answr.answrCreatDtm | dateFormat }}
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_SUBJT') }}
          </div>
          <div class="col-xs-11">
            {{ answr.answrTitle }}
          </div>
        </div>
        <div class="row">
          <div class="col-xs-1">
            {{ $t('MSG_TXT_CNTN') }}
          </div>
          <div class="col-xs-11" v-html="answr.answrDesc">
          </div>
        </div>
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
          <div class="right_box">
            <ur-button
              color="violet"
              @click="insertVocAnswr"
              v-permission:update="this.$options.name"
            >
              {{ $t('MSG_BTN_SVE') }}
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
      return utils.dateformatToClient(date)
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
      },
      questTypeCd: '',
      svcCd: '',
      procStatusCd: '',
      svcCdList: [],
      memoDescrt: '',
      answr: {
        answrTitle: '',
        answrDesc: '',
      },
      mypagePublctYn: 'N',
      emailSndgYn: 'N',
    }
  },
  computed: {
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
    selectCode() {
      http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
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
          this.mypagePublctYn = this.data.voc.mypagePublctYn
          this.emailSndgYn = this.data.voc.emailSndgYn

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
    openFile(url) {
      const element = document.createElement('a')
      element.setAttribute('href', url)
      element.click()
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

        let matched = false;
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

      if (!this.$rules.validate(this.$refs.questTypeCd)) {
        return
      }
      if (!this.$rules.validate(this.$refs.svcCd)) {
        return
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
        const param = {
          questTypeCd: this.questTypeCd,
          svcCd: this.svcCd,
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
              utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
              this.selectVoc()
            }
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    updateVocProcStatus() {
      if (!this.confirmNormalQuest()) {
        utils.messageBox('alert', '', this.$t('MSG_TXT_VOC_CS_QUESTION_STATUS_ERROR'))
        return
      }
      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
        const param = {
          procStatusCd: this.procStatusCd,
        }
        http.request(this.$options.name, 'DTS_AAA_00003', {
          path: {
            'voc-id': this.vocId,
          },
          data: param,
        }).then(res => {
          if (res.data) {
            if (res.data === 1) {
              this.data.voc.procStatusCd = this.procStatusCd
              utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
              this.selectVoc()
            }
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    insertVocAnswr() {
      if (!this.confirmNormalQuest()) {
        utils.messageBox('alert', '', this.$t('MSG_TXT_VOC_CS_QUESTION_REPLY_ERROR'))
        return
      }
      if (!this.$rules.validate(this.$refs.txtReplyTitle)) {
        return
      }
      if (!this.$rules.validate(this.$refs.txtReplyCtnt)) {
        return
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
        const params = {
          answrTitle: this.answr.answrTitle,
          answrDesc: this.answr.answrDesc,
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
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    focusout() {
      alert('')
    },
  },
}
</script>
<style lang="scss" scoped>

</style>
