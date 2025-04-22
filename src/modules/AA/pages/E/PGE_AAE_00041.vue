<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>
          {{ $t('MSG_TXT_LOVGRP_NOTI_INFO') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_LOVGRP_KIND_CD')"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="detail.lovgrpKindCd"
            :items="codes.COD_IA_LOVGRP_KIND"
            @input="selectLovgrpKindCd"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_MEM_SHP')"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="detail.memshpClsCd"
            :items="codes.COD_IA_LOVGRP_MEMSHP_CD"
            no-select
            :msg-no-select="$t('MSG_TIT_TOT')"
            @input="selectMemshpClsCd"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_LEVEL')"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            ref="dropDownLvlCd"
            v-model="detail.lvlCd"
            :items="codes.COD_IA_LOVGRP_LV_CD"
            :no-select="noSelect"
            :msg-no-select="msgNoSelect"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          class="flex_wrap"
          required
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="detail.exposrYn"
            :items="codes.COD_IA_EXPOSR_YN"
            sm
          />
        </ur-form-item>
        <ur-form-item
            :label="$t('MSG_TXT_APP_EXPOSR_PERIOD')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
            class="flex_wrap"
            :required="true"
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
            :label="$t('MSG_TXT_PERIOD_DISP_INPO')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
            class="flex_wrap"
            :required="true"
        >
          <ur-range-picker
              v-model="detail.periodDispInfoDate"
              input-type="YYYY-MM-DD"
              :min-date="minEventStartDate"
              :confirm-label="$t('MSG_TXT_SELT')"
          />
        </ur-form-item>
      </ur-form-box>

      <!-- S :: MSG_TXT_NOTI_DETAIL_INFO -->
      <div class="comm_title_wrap mt20">
        <h4>
          {{ $t('MSG_TXT_NOTI_DETAIL_INFO') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
            :label="$t('MSG_TXT_SUBJT')"
            :label-align="'right'"
            :required="true"
            style="width: 100%; height: auto;"
            class="flex_wrap"
        >
          <ur-text-field
              v-model="detail.publctSubject"
              style="width:100%; height:auto;"
              ref="txtPublctSubject"
              maxlength="100"
          />
        </ur-form-item>
        <ur-form-item
            :label="$t('MSG_TXT_DESC')"
            :label-align="'right'"
            :required="true"
            style="width: 100%; height: auto;"
        >
          <sui-web-editor
              ref="publctDescrt"
          />
        </ur-form-item>
      </ur-form-box>

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
  name: 'PGE_AAE_00041', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      noSelect: true,
      msgNoSelect: this.$t('MSG_TIT_TOT'),
      CODE_KEYS: ['COD_IA_LOVGRP_KIND', 'COD_IA_EXPOSR_YN'],
      codes: {
        COD_IA_LOVGRP_KIND: [],
        COD_IA_LOVGRP_MEMSHP_CD: [],
        COD_IA_LOVGRP_LV_CD: [],
        COD_IA_EXPOSR_YN: [],
      },
      publctId: '',
      detail: {
        lovgrpKindCd: '',
        memshpClsCd: '',
        lvlCd: '',
        appExposrPeriodDtm: [],
        periodDispInfoDate: [],
        exposrYn: '',
        publctSubject: '',
      },
      newdetail: {
        lovgrpKindCd: '',
        memshpClsCd: '',
        lvlCd: '',
        appExposrPeriodDtm: [`${utils.now('YYYY-MM-DD')} 09:00`, ''],
        periodDispInfoDate: [utils.now('YYYY-MM-DD'), ''],
        exposrYn: 'Y',
        publctSubject: '',
      },
      minEventStartDate: '',
    }
  },
  computed: {
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    this.selectCode()
    const params = utils.getParameter(this, 'params')
    if (!params) {
      this.goToList()
    } else if (params.publctId) {
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
    },
    goToList() {
      const params = utils.getParameter(this, 'params')
      if (params.publctId) {
        delete params.publctId
      }
      utils.goPage('PGE_AAE_00039', { params })
    },
    selectLovgrpKindCd(data) {
      this.detail.memshpClsCd = ''
      this.detail.lvlCd = ''
      this.noSelect = true
      this.codes.COD_IA_LOVGRP_LV_CD = []
      const promise = http.loadChildCode(this.pageId, 'COD_IA_LOVGRP_MEMSHP_CD', data)
      promise.then(res => {
        this.codes.COD_IA_LOVGRP_MEMSHP_CD = res.data
      })
    },
    selectMemshpClsCd(data) {
      this.detail.lvlCd = ''
      if (!_.isEmpty(data)) {
        const promise = http.loadChildCode(this.pageId, 'COD_IA_LOVGRP_LV_CD', data)
        promise.then(res => {
          this.codes.COD_IA_LOVGRP_LV_CD = res.data
          if (res.data.length === 1) {
            this.noSelect = false
            this.detail.lvlCd = this.codes.COD_IA_LOVGRP_LV_CD[0].codeId
          }
          else {
            this.noSelect = true
          }
        })
      } else {
        this.codes.COD_IA_LOVGRP_LV_CD = []
      }
    },
    selectDetail() {
      http.request(this.$options.name, 'DTS_AAE_00008', {
        path: {
          'publct-id': this.publctId,
        },
      }).then(res => {
        if (res.data) {
          this.detail.publctId = res.data.publctId
          this.detail.lovgrpKindCd = res.data.lovgrpKindCd
          this.selectLovgrpKindCd(this.detail.lovgrpKindCd)
          if (res.data.memshpClsCd === '000') {
            this.detail.memshpClsCd = ''
          } else {
            this.detail.memshpClsCd = res.data.memshpClsCd
            this.selectMemshpClsCd(this.detail.memshpClsCd)
          }
          if (res.data.lvlCd === '000') {
            this.detail.lvlCd = ''
          } else {
            this.detail.lvlCd = res.data.lvlCd
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
          this.detail.publctSubject = res.data.publctSubject
          this.detail.publctDescrt = res.data.publctDescrt
          this.$nextTick(() => {
            this.$refs.publctDescrt.setHtml(this.detail.publctDescrt)
          })
          this.minEventStartDate = CommonUtils.getMinDateWithToday(this.detail.periodDispInfoDate[0], 'YYYY-MM-DD')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    save() {
      if (!this.validate()) {
        return
      }
      const param = {
        lovgrpKindCd: this.detail.lovgrpKindCd,
        memshpClsCd: this.detail.memshpClsCd === '' ? '000' : this.detail.memshpClsCd,
        lvlCd: this.detail.lvlCd === '' ? '000' : this.detail.lvlCd,
        appExposrPeriodStartDtm: `${this.detail.appExposrPeriodDtm[0].replaceAll('-', '').replaceAll(':', '').replaceAll(' ', '')}00`,
        appExposrPeriodEndDtm: `${this.detail.appExposrPeriodDtm[1].replaceAll('-', '').replaceAll(':', '').replaceAll(' ', '')}59`,
        periodDispInfoStartDate: `${this.detail.periodDispInfoDate[0].replaceAll('-', '')}`,
        periodDispInfoEndDate: `${this.detail.periodDispInfoDate[1].replaceAll('-', '')}`,
        exposrYn: this.detail.exposrYn,
        publctSubject: this.detail.publctSubject,
        publctDescrt: this.$refs.publctDescrt.getHtml(),
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
    validate() {
      if (_.isEmpty(this.detail.lovgrpKindCd)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_LOVGRP_KIND_CD')))
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
      if (!this.publctId) {
        if (moment(this.detail.appExposrPeriodDtm[0]).isBefore(utils.now())) {
          utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_TXT_IA_NO_PAST_DT'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD')))
          return false
        }
        if (moment(this.detail.appExposrPeriodDtm[1]).isBefore(utils.now())) {
          utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_TXT_IA_NO_PAST_DT'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD')))
          return false
        }
      }
      // eslint-disable-next-line max-len
      if (moment(this.detail.appExposrPeriodDtm[1]).isAfter(moment(this.detail.appExposrPeriodDtm[1]))) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_TXT_IA_DATE_START_END_ORDER'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD')))
        return false
      }
      if (_.isEmpty(this.detail.periodDispInfoDate[0])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PERIOD_DISP_INPO')))
        return false
      }
      // if (_.isEmpty(this.detail.periodDispInfoDate[1])) {
      //   utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_PERIOD_DISP_INPO')))
      //   return false
      // }
      if (!this.publctId) {
        if (moment(this.detail.periodDispInfoDate[0]).isBefore(utils.now())) {
          utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_TXT_IA_NO_PAST_DT'), this.$t('MSG_TXT_PERIOD_DISP_INPO')))
          return false
        }
        if (!_.isEmpty(this.detail.periodDispInfoDate[1])) {
          if (moment(this.detail.periodDispInfoDate[1]).isBefore(utils.now())) {
            utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_TXT_IA_NO_PAST_DT'), this.$t('MSG_TXT_PERIOD_DISP_INPO')))
            return false
          }
        }
      }
      // eslint-disable-next-line max-len
      if (moment(this.detail.periodDispInfoDate[1]).isAfter(moment(this.detail.periodDispInfoDate[1]))) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_TXT_IA_DATE_START_END_ORDER'), this.$t('MSG_TXT_PERIOD_DISP_INPO')))
        return false
      }

      if (_.isEmpty(this.detail.exposrYn)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_EXPOSR_YN')))
        return false
      }
      if (_.isEmpty(this.detail.publctSubject)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TIT_TTL')))
        return false
      }
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
      return true
    },
    insert(param) {
      http.request(this.$options.name, 'DTS_AAE_00009', {
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
      http.request(this.$options.name, 'DTS_AAE_00010', {
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
    onInputAppExposrPeriodDtm(value) {
      // 종료일시의 시분(HHmm)이 0000일 경우 2359로 대체한다.
      if (value.at(1) && value.at(1).slice(-5) === '00:00') {
        this.detail.appExposrPeriodDtm = [value.at(0), value.at(1).substring(0, 11).concat('23:59')]
        return
      }
    },
  },
}
</script>
<style scoped>
</style>
