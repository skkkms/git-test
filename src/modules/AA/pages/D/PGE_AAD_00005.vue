<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 노출정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          {{ $t('MSG_TXT_EXPOSR_YN') }}
        </h4>
      </div>
      <ur-form-box
        ref="urForm"
        toggleable
      >
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          label-align="right"
          style="width: 100%; height: auto; border: 0;"
          class="flex_wrap"
          required
        >
          <ur-dropdown
            v-model="detail.publctTypeCd"
            :items="codes.COD_IA_PUBLCT_TYPE"
            style="width:40%"
            no-select
            :msg-no-select="$t('MSG_TXT_SELT')"
            @input="initDetail"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_PUBCT_TARGET')"
          label-align="right"
          style="width: 50%; height: auto;"
          class="flex_wrap"
          required
        >
          <ur-checkbox-wrapper
            v-model="detail.exposrTarget"
            :items="codes.COD_IA_EXPORSR_TARGET"
            sm
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_APP_EXPOSR_PERIOD')"
          label-align="right"
          style="width: 50%; height: auto;"
          class="flex_wrap"
          required
        >
          <ur-date-time-range-picker
            v-model="detail.appExposrPeriodDtm"
            input-type="YYYY-MM-DD HH:mm"
            :confirm-label="$t('MSG_TXT_SELT')"
            :clear-label="$t('MSG_BTN_INTL')"
            @input="onInputAppExposrPeriodDtm"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          style="width: 50%; height: auto;"
          required
        >
          <ur-radio-wrapper
            v-model="detail.exposrYn"
            :items="codes.COD_IA_EXPOSR_YN"
            sm
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_PERIOD_DISP_INPO')"
          label-align="right"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-range-picker
            v-model="detail.periodDispInfoDate"
            input-type="YYYY-MM-DD"
            :confirm-label="$t('MSG_TXT_SELT')"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_ORDER')"
          label-align="right"
          style="width: 100%; height: auto;"
          class="flex_wrap"
          required
        >
          <ur-text-field
            ref="txtExposrOrder"
            v-model="detail.exposrOrder"
            style="width:100%; height:auto; text-align: left"
            mask="number"
            maxlength="4"
            @keyup="detail.exposrOrder = parseInt(detail.exposrOrder, 10)"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E :: MSG_TXT_EXPOSR_YN -->

      <template v-if="showDetailYn">
        <!-- S :: MSG_TXT_NOTI_DETAIL_INFO -->
        <div class="comm_title_wrap mt20">
          <h4>
            {{ $t('MSG_TXT_NOTI_DETAIL_INFO') }}
          </h4>
        </div>
        <ur-form-box toggleable>
          <ur-form-item
            v-show="showNotiTypeYn"
            :label="$t('MSG_TXT_IA_NOTI_TYPE')"
            label-align="right"
            style="width: 100%; height: auto;"
            required
          >
            <ur-radio-wrapper
              v-model="detail.notiTypeCd"
              :items="codes.COD_IA_PUBLCT_NOTI_TYPE"
              sm
            />
          </ur-form-item>
          <ur-form-item
            v-show="showLangYN"
            :label="$t('MSG_TXT_LANG_DIV')"
            label-align="right"
            style="width: 100%; height: auto;"
            required
          >
            <ur-radio-wrapper
              v-model="detail.langTypeCd"
              :items="codes.COD_RS_LANG"
              sm
            />
          </ur-form-item>
          <ur-form-item
            :label="$t('MSG_TXT_SUBJT')"
            label-align="right"
            style="width: 100%; height: auto;"
            class="flex_wrap"
            required
          >
            <ur-text-field
              ref="txtPublctSubject"
              v-model="detail.publctSubject"
              style="width:100%; height:auto;"
              maxlength="100"
            />
          </ur-form-item>
          <ur-form-item
            v-show="notiTypeCd"
            :label="$t('MSG_TXT_DESC')"
            label-align="right"
            style="width: 100%; height: auto;"
            required
          >
            <sui-web-editor
              ref="publctDescrt"
            />
          </ur-form-item>
          <!-- 썸네일 이미지 -->
          <ur-form-item
              v-if="showThumbImag"
              :label="$t('MSG_TXT_THUMBNAIL_IMAG')"
              label-align="right"
              class="flex_wrap"
              style="width: 100%; height: auto;"
          >
            <cmp-single-file-uploader
                ref="thumbnailImag"
                v-model="detail.thumbImagUrl"
                upload-target="EVT001"
                accepts="jpg,png,gif"
                pixels="192*192"
                preview-mode="BELOW"
                show-guidance
                :page-id="this.$options.name"
            >
              <template>
                <div class="col_img_wrap">
                  <div class="col_item_img">
                    <ur-text-field
                        v-model="detail.thumbImagAltDesc"
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
      </template>
      <!-- E :: MSG_TXT_NOTI_DETAIL_INFO -->

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button
              color="violet"
              @click="goToList"
            >
              {{ $t('MSG_BTN_LIST') }}
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button
              v-permission:create="$options.name"
              color="violet"
              @click="save"
            >
              {{ $t('MSG_BTN_SAVE') }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

import CommonUtils from '~aa/js/common-utils'

export default {
  name: 'PGE_AAD_00005', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      CODE_KEYS: ['COD_IA_PUBLCT_TYPE', 'COD_IA_PUBLCT_NOTI_TYPE', 'COD_IA_EXPORSR_TARGET',
        'COD_IA_EXPOSR_YN', 'COD_RS_LANG'],
      codes: {
        COD_IA_PUBLCT_TYPE: [],
        COD_IA_PUBLCT_NOTI_TYPE: [],
        COD_IA_EXPORSR_TARGET: [],
        COD_IA_EXPOSR_YN: [],
        COD_RS_LANG: [],
      },
      publctId: '',
      detail: {
        publctTypeCd: '',
        exposrTarget: [],
        appExposrPeriodDtm: [],
        exposrYn: '',
        periodDispInfoDate: [],
        exposrOrder: '',
        notiTypeCd: '',
        langTypeCd: '',
        publctSubject: '',
        publctDescrt: '',
        thumbImagUrl: '',
        thumbImagAltDesc: '',
      },
      newdetail: {
        publctTypeCd: '', // test
        exposrTarget: ['APP', 'MOBILE', 'PC'],
        appExposrPeriodDtm: [`${utils.now('YYYY-MM-DD')} 09:00`, ''],
        exposrYn: 'Y',
        periodDispInfoDate: [utils.now('YYYY-MM-DD'), ''],
        exposrOrder: '',
        notiTypeCd: '03',
        langTypeCd: 'KO',
        publctSubject: '',
        publctDescrt: '',
        thumbImagUrl: '',
        thumbImagAltDesc: '',
      },
      minEventStartDate: '',
    }
  },
  computed: {
    showDetailYn() {
      if (this.detail.publctTypeCd) {
        return true
      }
      return false
    },
    showNotiTypeYn() {
      // MSG_TXT_IA_NOTI_TYPE은 에버랜드, 캐리비안베이만 보여준다.
      switch (this.detail.publctTypeCd) {
      case '01':
      case '02':
        return true
      default:
        return false
      }
    },
    showLangYN() {
      // 채용인 경우 MSG_TXT_LANG_DIV을 표시하지 않는다.
      if (this.detail.publctTypeCd === '05') {
        return false
      }
      return true
    },
    notiTypeCd() {
      if (this.detail.notiTypeCd === '01') {
        return false
      }
      return true
    },
    showThumbImag() {
      if (this.showNotiTypeYn) {
        if (this.detail.notiTypeCd === '02') {
          return true
        }
      }
      return false
    },
  },
  watch: {
  },
  created() {
    this.selectCode()
    const params = utils.getParameter(this, 'params')
    if (params.publctId) {
      this.publctId = params.publctId
      this.selectDetail()
    } else {
      this.detail = JSON.parse(JSON.stringify(this.newdetail))
      this.minEventStartDate = utils.now('YYYY-MM-DD')
    }
  },
  mounted() {
  },
  methods: {
    async selectCode() {
      await http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
      this.codes.COD_IA_PUBLCT_NOTI_TYPE = this.codes.COD_IA_PUBLCT_NOTI_TYPE.reverse()
    },
    goToList() {
      const params = utils.getParameter(this, 'params')
      if (params.publctId) {
        delete params.publctId
      }
      utils.goPage('PGE_AAD_00003', { params })
    },
    save() {
      if (!this.validate()) {
        return
      }
      const param = {
        publctTypeCd: this.detail.publctTypeCd,
        exposrTarget: this.detail.exposrTarget.join(','),
        appExposrPeriodStartDtm: `${this.detail.appExposrPeriodDtm[0].replaceAll('-', '').replaceAll(':', '').replaceAll(' ', '')}00`,
        appExposrPeriodEndDtm: `${this.detail.appExposrPeriodDtm[1].replaceAll('-', '').replaceAll(':', '').replaceAll(' ', '')}59`,
        periodDispInfoStartDate: `${this.detail.periodDispInfoDate[0].replaceAll('-', '')}`,
        periodDispInfoEndDate: `${this.detail.periodDispInfoDate[1].replaceAll('-', '')}`,
        exposrYn: this.detail.exposrYn,
        exposrOrder: this.detail.exposrOrder,
        notiTypeCd: this.detail.notiTypeCd,
        langTypeCd: this.detail.langTypeCd,
        publctSubject: this.detail.publctSubject,
        publctDescrt: this.$refs.publctDescrt.getHtml(),
        thumbImagUrl: this.detail.thumbImagUrl,
        thumbImagAltDesc: this.detail.thumbImagAltDesc,
      }
      if (!this.showThumbImag) {
        param.thumbImagUrl = ''
        param.thumbImagAltDesc = ''
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_WANT_SAVE'), null, () => { // 저장하시겠습니까?
        if (this.publctId) {
          param.publctId = this.publctId
          this.update(param)
        } else {
          this.insert(param)
        }
      })
    },
    insert(param) {
      http.request(this.$options.name, 'DTS_AAD_00011', {
        data: param,
      }).then(res => {
        if (res.data) {
          if (res.data === 1) {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
            this.goToList()
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    update(param) {
      http.request(this.$options.name, 'DTS_AAD_00012', {
        data: param,
      }).then(res => {
        if (res.data) {
          if (res.data === 1) {
            utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
            this.goToList()
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    validate() {
      if (!this.validateBasic()) {
        return false
      }
      if (!this.validateDetail()) {
        return false
      }
      return true
    },
    validateBasic() {
      if (_.isEmpty(this.detail.publctTypeCd)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_PUBLCT_KIND')))
        return false
      }
      if (_.isEmpty(this.detail.exposrTarget)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_PUBCT_TARGET')))
        return false
      }
      if (_.isEmpty(this.detail.appExposrPeriodDtm[0])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD')))
        return false
      }
      if (_.isEmpty(this.detail.appExposrPeriodDtm[1])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD')))
        return false
      }
      // eslint-disable-next-line max-len
      if (moment(this.detail.appExposrPeriodDtm[1]).isAfter(moment(this.detail.appExposrPeriodDtm[1]))) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_TXT_IA_DATE_START_END_ORDER'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD')))
        return false
      }
      if (_.isEmpty(this.detail.exposrYn)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_EXPOSR_YN')))
        return false
      }
      // 기간 표시 정보 항목은 시작일자만 필수값으로 체크한다.
      if (_.isEmpty(this.detail.periodDispInfoDate[0])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PERIOD_DISP_INPO')))
        return false
      }
      // eslint-disable-next-line max-len
      if (moment(this.detail.periodDispInfoDate[1]).isAfter(moment(this.detail.periodDispInfoDate[1]))) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_TXT_IA_DATE_START_END_ORDER'), this.$t('MSG_TXT_PERIOD_DISP_INPO')))
        return false
      }

      if (_.isEmpty(this.detail.exposrOrder)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_EXPOSR_ORDER')))
        this.$refs.txtExposrOrder.focus()
        return false
      }
      return true
    },
    validateDetail() {
      // 에버랜드, 캐리비안베이인 경우 MSG_TXT_IA_NOTI_TYPE을 확인.
      if (this.detail.publctTypeCd === '01'
          || this.detail.publctTypeCd === '02') {
        if (_.isEmpty(this.detail.notiTypeCd)) {
          utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_IA_NOTI_TYPE')))
          return false
        }
      } else {
        this.detail.notiTypeCd = '03'
      }
      // 채용인 경우 MSG_TXT_LANG_DIV 없음.
      if (this.detail.publctTypeCd !== '05') {
        if (_.isEmpty(this.detail.langTypeCd)) {
          utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_LANG_DIV')))
          return false
        }
      } else {
        this.detail.langTypeCd = 'KO'
      }
      if (_.isEmpty(this.detail.publctSubject)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_SUBJT')))
        this.$refs.txtPublctSubject.focus()
        return false
      }

      if (this.notiTypeCd) {
        this.detail.publctDescrt = this.$refs.publctDescrt.getText()
        if (this.$refs.publctDescrt.getContentSize() === 0) {
          utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_DESC')))
          this.$refs.publctDescrt.focus()
          return false
        }
        if (!this.$refs.publctDescrt.checkIframeSrc()) {
          utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_IAA_IFRAME_CHK')))
          this.$refs.publctDescrt.focus()
          return false
        }
      }
      return true
    },
    initDetail() {
      this.detail.notiTypeCd = '03'
      this.detail.langTypeCd = 'KO'
      this.detail.publctSubject = ''
      this.detail.publctDescrt = ''
      this.$nextTick(() => {
        if (this.$refs.publctDescrt) {
          this.$refs.publctDescrt.setHtml(this.detail.publctDescrt)
        }
      })
    },
    selectDetail() {
      http.request(this.$options.name, 'DTS_AAD_00010', {
        path: {
          'publct-id': this.publctId,
        },
      }).then(res => {
        if (res.data) {
          this.detail.publctId = res.data.publctId
          this.detail.publctTypeCd = res.data.publctTypeCd

          this.detail.exposrTarget = []
          if (res.data.appPublctYn === 'Y') {
            this.detail.exposrTarget.push('APP')
          }
          if (res.data.pcPublctYn === 'Y') {
            this.detail.exposrTarget.push('PC')
          }
          if (res.data.mobilePublctYn === 'Y') {
            this.detail.exposrTarget.push('MOBILE')
          }
          this.detail.appExposrPeriodDtm = [
            utils.dateformatToClient(res.data.appExposrPeriodStartDtm).substring(0, 16),
            utils.dateformatToClient(res.data.appExposrPeriodEndDtm).substring(0, 16),
          ]
          this.detail.periodDispInfoDate = [
            utils.dateformatToClient(res.data.periodDispInfoStartDate, 'S'),
            utils.dateformatToClient(res.data.periodDispInfoEndDate, 'S'),
          ]
          this.detail.exposrYn = res.data.exposrYn
          this.detail.exposrOrder = res.data.exposrOrder + '' // eslint-disable-line
          this.detail.notiTypeCd = res.data.notiTypeCd
          this.detail.langTypeCd = res.data.langTypeCd
          this.detail.publctSubject = res.data.publctSubject
          this.detail.publctDescrt = res.data.publctDescrt
          this.detail.thumbImagUrl = res.data.thumbImagUrl
          this.detail.thumbImagAltDesc = res.data.thumbImagAltDesc

          this.$nextTick(() => {
            this.$refs.publctDescrt.setHtml(this.detail.publctDescrt)
          })
          this.minEventStartDate = CommonUtils.getMinDateWithToday(this.detail.periodDispInfoDate[0], 'YYYY-MM-DD')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onInputAppExposrPeriodDtm(value) {
      // 종료일시의 시분(HHmm)이 0000일 경우 2359로 대체한다.
      if (value.at(1) && value.at(1).slice(-5) === '00:00') {
        this.detail.appExposrPeriodDtm = [value.at(0), value.at(1).substring(0, 11).concat('23:59')]
      }
    },
  },
}
</script>
<style scoped>
</style>
