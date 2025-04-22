<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <!-- :: 할인혜택 관리 상세 -->
    <sui-page-contents>
      <!-- S :: 노출 정보 -->
      <div class="comm_title_wrap">
        <h4>
          {{ $t('MSG_TXT_EXPOSR_INFO') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          label-align="right"
          style="width:50%; height:auto;"
        >
          {{ detailData.parkKindCdNm }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_BNTF_CLASS')"
          label-align="right"
          style="width:50%; height:auto;"
        >
          {{ detailData.bnftClassCdNm }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          style="width:50%; height:auto;"
        >
          {{ detailData.exposrYn }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_ORDER')"
          label-align="right"
          class="flex_wrap"
          style="width:50%; height:auto;"
        >
          {{ detailData.exposrOrder | numberFormat }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_APP_EXPOSR_PERIOD')"
          label-align="right"
          class="flex_wrap"
          :style="chgStyle"
        >
          {{ detailData.appExposrPeriodStartDtm }} ~ {{ detailData.appExposrPeriodEndDtm }}
        </ur-form-item>
        <ur-form-item
          v-show="compShow != '02'"
          :label="$t('MSG_TXT_PERIOD_DISP_INPO')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          {{ detailData.periodDispInfoStartDate }} ~ {{ detailData.periodDispInfoEndDate }}
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 노출 정보 탭 메뉴-->

      <!-- S :: 혜택 상세 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          {{ $t('MSG_TXT_BNTF_DETAIL_INFO') }}
        </h4>
      </div>

      <div>
        <!-- 할인 정보 -->
        <C01
          v-show="compShow === '01'"
          ref="C01"
          :input-data="detailData"
          input-type="detail"
        />
        <!-- 제휴 카드 -->
        <C02
          v-show="compShow === '02'"
          ref="C02"
          :input-data="detailData"
          input-type="detail"
        />
        <!-- 스페셜 패키지 -->
        <C03
          v-show="compShow === '03'"
          ref="C03"
          :input-data="detailData"
          input-type="detail"
        />
        <!-- 정기권 제휴 혜택, 드림투어 -->
        <C04
          v-show="compShow === '04'|| compShow == '05' "
          ref="C04"
          :input-data="detailData"
          input-type="detail"
        />
        <!-- 체험프로그램 -->
        <C06
          v-show="compShow === '06'"
          ref="C06"
          :input-data="detailData"
          input-type="detail"
        />
      </div>

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <!-- 목록 -->
            <ur-button
              v-permission:read="this.$options.name"
              @click="onClickList"
            >
              {{ $t("MSG_BTN_LIST") }} <!-- 목록 -->
            </ur-button>
          </div>

          <!-- 수정 -->
          <div class="right_box">
            <ur-button
              v-permission:update="this.$options.name"
              color="violet"
              @click="onClickMdfc"
            >
              {{ $t("MSG_BTN_MDFC") }} <!-- 수정 -->
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

import C01 from './components/PGE_AAD_00012_C01.vue' // 할인 정보
import C02 from './components/PGE_AAD_00012_C02.vue' // 제휴 카드
import C03 from './components/PGE_AAD_00012_C03.vue' // 스페셜 패키지
import C04 from './components/PGE_AAD_00012_C04.vue' // 정기권 제휴 혜택, 드림투어
import C06 from './components/PGE_AAD_00012_C06.vue' // 체험프로그램

export default {
  name: 'PGE_AAD_00013', // eslint-disable-line vue/name-property-casing
  components: {
    C01,
    C02,
    C03,
    C04,
    C06,
  },
  filters: {
    numberFormat(value) {
      return value ? utils.numberFormat(value) : null
    },
  },
  data() {
    return {
      // 상세조회 데이터
      detailData: {
        publctId: '',
        parkKindCd: '',
        parkKindCdOld: '',
        bnftClassCd: '',
        bnftKindCd: '',
        appExposrPeriodDtm: [`${utils.now('YYYY-MM-DD')} 09:00`, ''],
        appExposrPeriodStartDtm: '',
        appExposrPeriodEndDtm: '',
        periodDispInfoDate: [utils.now('YYYY-MM-DD'), ''],
        periodDispInfoStartDate: '',
        periodDispInfoEndDate: '',
        exposrYn: 'Y',
        exposrOrder: '',
        packgeKindCd: '',
        targetDescrt: '',
        publctSubject: '',
        publctDescrt: '',
        thumbImagUrl: '',
        thumbImagAltDesc: '',
        publctSmallSubject: '',
      },
    }
  },
  computed: {
    compShow() {
      return this.detailData.bnftClassCd
    },
    chgStyle() {
      if (this.compShow === '02') {
        return 'width:100%; height:auto;'
      }
      return 'width:50%; height:auto;'
    },
  },
  watch: {
  },
  created() {
    const params = utils.getParameter(this, 'params')
    this.publctId = params.publctId
    if (!utils.isEmpty(this.publctId)) {
      // 상세조회
      this.fnSelectDetail()
    } else {
      // 파람이 없을 경우 목록으로 이동
      this.onClickList()
    }
  },
  mounted() { },
  methods: {
    // 조회
    fnSelectDetail() {
      const queryParams = {
        publctId: this.publctId,
        currRows: 0,
        rowsPerPage: 1,
      }

      http.request(this.$options.name, 'DTS_AAD_00026', {
        query: queryParams,
      }).then(res => {
        this.detailData = res.data.list.at(0)
        this.setParam()
      }).catch(error => {
        console.log(error)
      })
    },

    // editor 및 날짜 값 셋팅
    setParam() {
      this.detailData.appExposrPeriodStartDtm = utils.toStringByFormat(this.detailData.appExposrPeriodStartDtm, 'YYYY-MM-DD HH:mm')
      this.detailData.appExposrPeriodEndDtm = utils.toStringByFormat(this.detailData.appExposrPeriodEndDtm, 'YYYY-MM-DD HH:mm')
      this.detailData.periodDispInfoStartDate = utils.toStringByFormat(this.detailData.periodDispInfoStartDate, 'YYYY-MM-DD')
      this.detailData.periodDispInfoEndDate = utils.toStringByFormat(this.detailData.periodDispInfoEndDate, 'YYYY-MM-DD')

      const { bnftClassCd } = this.detailData
      const contentDesc = this.detailData.publctDescrt
      if (bnftClassCd === '01') {
        this.$refs.C01.$refs.C01Editor.setHtml(contentDesc)
      } else if (bnftClassCd === '02') {
        this.$refs.C02.$refs.C02Editor.setHtml(contentDesc)
      } else if (bnftClassCd === '03') {
        if (!Array.isArray(this.detailData.packgeKindCd)) {
          const tmpRow = this.detailData.packgeKindCd.split(',')
          this.$refs.C03.packgeKindCdList = tmpRow
        }
        this.$refs.C03.$refs.C03Editor.setHtml(contentDesc)
      } else if (bnftClassCd === '04' || bnftClassCd === '05') {
        this.$refs.C04.$refs.C04Editor.setHtml(contentDesc)
      } else if (bnftClassCd === '06') {
        this.$refs.C06.$refs.C06Editor.setHtml(contentDesc)
      }
    },
    // 할인 혜택 관리 목록으로 이동
    onClickList() {
      const params = utils.getParameter(this, 'params')
      delete params.publctId
      utils.goPage('PGE_AAD_00011', { params })
    },
    // 할인 혜택 수정으로 이동
    onClickMdfc() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAD_00012', { params })
    },
  },
}
</script>
<style scoped>
</style>
