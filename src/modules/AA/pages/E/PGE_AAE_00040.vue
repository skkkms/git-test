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
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <CodeSelect
            :code-list="codes.COD_IA_LOVGRP_KIND"
            :code-value="detail.lovgrpKindCd"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_MEM_SHP')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <CodeSelect
            :code-list="codes.COD_IA_LOVGRP_MEMSHP_CD"
            :code-value="detail.memshpClsCd"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_LEVEL')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <CodeSelect
            :code-list="codes.COD_IA_LOVGRP_LV_CD"
            :code-value="detail.lvlCd"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          class="flex_wrap"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <CodeSelect
            :code-list="codes.COD_IA_EXPOSR_YN"
            :code-value="detail.exposrYn"
          />
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
            :label="$t('MSG_TXT_PERIOD_DISP_INPO')"
            :label-align="'right'"
            style="width: 50%; height: auto;"
            class="flex_wrap"
        >
          {{ periodDtm }}
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
        >
          <sui-web-editor
              ref="publctDescrt"
              :is-viewer="true"
          />
        </ur-form-item>
      </ur-form-box>
      <!-- E :: MSG_TXT_NOTI_DETAIL_INFO -->

      <div class="bt1 mt10" />
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
                v-permission:update="$options.name"
                color="violet"
                @click="goToModify"
            >
              {{ $t('MSG_BTN_MDFC') }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

import CodeSelect from '@/modules/AA/components/CodeSelect.vue'
import CmpSingleFileUploader from '@/modules/AA/components/CMP_AAX_00001/CMP_AAX_00001.vue'

export default {
  name: 'PGE_AAE_00040', // eslint-disable-line vue/name-property-casing
  components: {
    CmpSingleFileUploader,
    CodeSelect,
  },
  data() {
    return {
      CODE_KEYS: ['COD_IA_LOVGRP_KIND', 'COD_IA_LOVGRP_MEMSHP_CD', 'COD_IA_LOVGRP_LV_CD', 'COD_IA_EXPOSR_YN'],
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
        appExposrPeriodStartDtm: '',
        appExposrPeriodEndDtm: '',
        periodDispInfoStartDate: '',
        periodDispInfoEndDate: '',
        exposrYn: '',
        publctSubject: '',
        publctDescrt: '',
      },
      newdetail: {
        lovgrpKindCd: '',
        memshpClsCd: '',
        lvlCd: '',
        appExposrPeriodStartDtm: '',
        appExposrPeriodEndDtm: '',
        periodDispInfoStartDate: '',
        periodDispInfoEndDate: '',
        exposrYn: '',
        publctSubject: '',
        publctDescrt: '',
      },
    }
  },
  computed: {
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
      this.goToList()
    }
    this.selectDetail()
  },
  mounted() {
  },
  methods: {
    async selectCode() {
      await http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
      this.codes.COD_IA_LOVGRP_MEMSHP_CD.push({
        codeId: '000',
        codeName: this.$t('MSG_TXT_ALL'),
        value: '000',
        text: this.$t('MSG_TXT_ALL'),
        key: '000',
        label: this.$t('MSG_TXT_ALL'),
      })
      this.codes.COD_IA_LOVGRP_LV_CD.push({
        codeId: '000',
        codeName: this.$t('MSG_TXT_ALL'),
        value: '000',
        text: this.$t('MSG_TXT_ALL'),
        key: '000',
        label: this.$t('MSG_TXT_ALL'),
      })
    },
    goToList() {
      const params = utils.getParameter(this, 'params')
      if (params.publctId) {
        delete params.publctId
      }
      utils.goPage('PGE_AAE_00039', { params })
    },
    goToModify() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAE_00041', { params })
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
          this.detail.memshpClsCd = res.data.memshpClsCd
          this.detail.lvlCd = res.data.lvlCd
          this.detail.appExposrPeriodStartDtm = res.data.appExposrPeriodStartDtm
          this.detail.appExposrPeriodEndDtm = res.data.appExposrPeriodEndDtm
          this.detail.periodDispInfoStartDate = res.data.periodDispInfoStartDate
          this.detail.periodDispInfoEndDate = res.data.periodDispInfoEndDate
          this.detail.exposrYn = res.data.exposrYn
          this.detail.publctSubject = res.data.publctSubject
          this.detail.publctDescrt = res.data.publctDescrt
          this.$refs.publctDescrt.setHtml(this.detail.publctDescrt)
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },
}
</script>
<style scoped>
</style>
