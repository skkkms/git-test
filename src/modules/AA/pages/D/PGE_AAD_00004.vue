<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 노출 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          {{ $t('MSG_TXT_EXPOSR_INFO') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          :label-align="'right'"
          style="width: 100%; height: auto; border: 0;"
        >
          <CodeSelect
            :code-list="codes.COD_IA_PUBLCT_TYPE"
            :code-value="detail.publctTypeCd"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_PUBCT_TARGET')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          {{ exposrTarget }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_APP_EXPOSR_PERIOD')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          {{ publctDtm }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <code-select
            :code-list="codes.COD_IA_EXPOSR_YN"
            :code-value="detail.exposrYn"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_PERIOD_DISP_INPO')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          {{ periodDtm }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_ORDER')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{ detail.exposrOrder }}
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 노출 정보 -->

      <!-- S :: MSG_TXT_NOTI_DETAIL_INFO -->
      <div class="comm_title_wrap mt20">
        <h4>
          {{ $t('MSG_TXT_NOTI_DETAIL_INFO') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          v-if="showNotiTypeYn"
          :label="$t('MSG_TXT_IA_NOTI_TYPE')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <code-select
            :code-list="codes.COD_IA_PUBLCT_NOTI_TYPE"
            :code-value="detail.notiTypeCd"
          />
        </ur-form-item>
        <ur-form-item
          v-if="showLangYN"
          :label="$t('MSG_TXT_LANG_DIV')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <code-select
            :code-list="codes.COD_RS_LANG"
            :code-value="detail.langTypeCd"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_SUBJT')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          {{ detail.publctSubject }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_DESC')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          v-show="notiTypeCd"
        >
          <sui-web-editor
              ref="publctDescrt"
              :is-viewer="true"
          />
        </ur-form-item>
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
              mode="SELECT"
              :page-id="this.$options.name"
          >
          </cmp-single-file-uploader>
        </ur-form-item>
      </ur-form-box>
      <!-- E :: MSG_TXT_NOTI_DETAIL_INFO -->

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button @click="goToList">
              {{$t('MSG_BTN_LIST')}}
            </ur-button>
          </div>
          <div class="right_box">
            <ur-button
              v-permission:update="$options.name"
              color="violet"
              @click="goToModify"
            >
              {{$t('MSG_BTN_MDFC')}}
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
  name: 'PGE_AAD_00004', // eslint-disable-line vue/name-property-casing
  components: {
    CodeSelect,
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
        publctId: '',
        publctTypeCd: '',
        appPublctYn: '',
        pcPublctYn: '',
        mobilePublctYn: '',
        appExposrPeriodStartDtm: '',
        appExposrPeriodEndDtm: '',
        periodDispInfoStartDate: '',
        periodDispInfoEndDate: '',
        exposrYn: '',
        exposrOrder: '',
        notiTypeCd: '',
        langTypeCd: '',
        publctSubject: '',
        publctDescrt: '',
        thumbImagUrl: '',
        thumbImagAltDesc: '',
      },
    }
  },
  computed: {
    exposrTarget() {
      const target = []
      if (this.detail.appPublctYn === 'Y') {
        target.push('APP')
      }
      if (this.detail.mobilePublctYn === 'Y') {
        target.push(this.$t('MSG_TXT_IA_MOBILEWEB'))
      }
      if (this.detail.pcPublctYn === 'Y') {
        target.push('PC')
      }
      return target.join(', ')
    },
    publctDtm() {
      // eslint-disable-next-line max-len
      const startDtm = utils.dateformatToClient(this.detail.appExposrPeriodStartDtm).substring(0, 16)
      const endDtm = utils.dateformatToClient(this.detail.appExposrPeriodEndDtm).substring(0, 16)
      return `${startDtm} ~ ${endDtm}`
    },
    periodDtm() {
      // eslint-disable-next-line max-len
      const startDtm = utils.dateformatToClient(this.detail.periodDispInfoStartDate).substring(0, 16)
      const endDtm = utils.dateformatToClient(this.detail.periodDispInfoEndDate).substring(0, 16)
      return `${startDtm} ~ ${endDtm}`
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
  created() {
    const params = utils.getParameter(this, 'params')
    this.publctId = params.publctId
    if (this.publctId === undefined || this.publctId === null) {
      this.goToList()
    }
    this.selectCode()
    this.selectDetail()
  },
  mounted() {
  },
  methods: {
    goToList() {
      const params = utils.getParameter(this, 'params')
      delete params.publctId
      utils.goPage('PGE_AAD_00003', { params })
    },
    selectCode() {
      http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
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
          this.detail.appPublctYn = res.data.appPublctYn
          this.detail.pcPublctYn = res.data.pcPublctYn
          this.detail.mobilePublctYn = res.data.mobilePublctYn
          this.detail.appExposrPeriodStartDtm = res.data.appExposrPeriodStartDtm
          this.detail.appExposrPeriodEndDtm = res.data.appExposrPeriodEndDtm
          this.detail.periodDispInfoStartDate = res.data.periodDispInfoStartDate
          this.detail.periodDispInfoEndDate = res.data.periodDispInfoEndDate
          this.detail.exposrYn = res.data.exposrYn
          this.detail.exposrOrder = res.data.exposrOrder
          this.detail.notiTypeCd = res.data.notiTypeCd
          this.detail.langTypeCd = res.data.langTypeCd
          this.detail.publctSubject = res.data.publctSubject
          this.detail.publctDescrt = res.data.publctDescrt
          this.detail.thumbImagUrl = res.data.thumbImagUrl
          this.detail.thumbImagAltDesc = res.data.thumbImagAltDesc
          this.$nextTick(() => {
            this.$refs.publctDescrt.setHtml(this.detail.publctDescrt)
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    goToModify() {
      let params = utils.getParameter(this, 'params')
      if (!params) {
        params = {}
      }
      params.publctId = this.publctId
      utils.goPage('PGE_AAD_00005', { params })
    },
  },
}
</script>
<style scoped>
</style>
