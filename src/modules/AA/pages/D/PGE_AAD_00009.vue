<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <!-- :: 기타 게시판 상세 -->
    <sui-page-contents>
      <!-- S :: 노출 정보 -->
      <div class="comm_title_wrap mt45">
        <h4>
          {{ $t('MSG_TXT_EXPOSR_INFO') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <!-- 게시판 분류 -->
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_CLASS')"
          label-align="right"
          style="width: 100%; height: auto; border: 0;"
        >
          {{ detailData.publctKindNm }}
        </ur-form-item>

        <!-- 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          :style="styleExposrYn"
        >
          {{ detailData.exposrYn }}
        </ur-form-item>

        <!-- 노출 순서 -->
        <ur-form-item
          v-show="compShow != '10'"
          :label="$t('MSG_TXT_EXPOSR_ORDER')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          {{ detailData.exposrOrder | numberFormat }}
        </ur-form-item>

        <!-- 앱 노출 기간 -->
        <ur-form-item
          v-show="exposrPeriodShowYn"
          :label="$t('MSG_TXT_APP_EXPOSR_PERIOD')"
          label-align="right"
          class="flex_wrap"
          :style="styleExposrPeriod"
        >
          {{ detailData.appExposrPeriodStartDtm }} ~ {{ detailData.appExposrPeriodEndDtm }}
        </ur-form-item>

        <!-- 기간 표시 정보 -->
        <ur-form-item
          v-show="periodDispInfoShowYn"
          :label="$t('MSG_TXT_PERIOD_DISP_INPO')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          {{ detailData.periodDispInfoStartDate }} ~ {{ detailData.periodDispInfoEndDate }}
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 노출 정보 -->

      <!-- S :: 게시 상세 정보 -->
      <div class="comm_title_wrap mt20">
        <h4>
          {{ $t('MSG_TXT_PUBLCT_DETAIL_INFO') }}
        </h4>
      </div>

      <div>
        <!-- Editor's Pick -->
        <C01
          v-show="compShow == '01'"
          ref="C01"
          :input-data="detailData"
          input-type="detail"
        />
        <!-- FAQ -->
        <C02
          v-show="compShow == '02'"
          ref="C02"
          :input-data="detailData"
          input-type="detail"
        />
        <!-- 개인정보 처리방침 -->
        <C03
          v-show="compShow == '03'"
          ref="C03"
          :input-data="detailData"
          input-type="detail"
        />
        <!-- 영상정보 처리기기 -->
        <C04
          v-show="compShow == '04'"
          ref="C04"
          :input-data="detailData"
          input-type="detail"
        />
        <!-- 방침 개정 안내 -->
        <C05
          v-show="compShow == '05'"
          ref="C05"
          :input-data="detailData"
          input-type="detail"
        />
        <!-- 이용약관 -->
        <C06
          v-show="compShow == '06'"
          ref="C06"
          :input-data="detailData"
          input-type="detail"
        />
        <!-- 입찰공고 -->
        <C07
          v-show="compShow == '07'"
          ref="C07"
          :input-data="detailData"
          input-type="detail"
        />
        <!-- 에버랜드 테마뮤직 -->
        <C08
          v-show="compShow == '08'"
          ref="C08"
          :input-data="detailData"
          input-type="detail"
        />
        <!-- 기타 -->
        <C10
          v-show="compShow == '10'"
          ref="C10"
          :input-data="detailData"
          input-type="detail"
        />
        <!-- 콜센터 VOC -->
        <C11
          v-show="compShow == '11'"
          ref="C11"
          :input-data="detailData"
          input-type="detail"
        />
        <!-- 도슨트와 함께 산책 (가제) -->
        <C12
          v-show="compShow == '12'"
          ref="C12"
          :input-data="detailData"
          input-type="detail"
        />
      </div>
      <!-- E :: 게시 상세 정보 -->


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

import C01 from './components/PGE_AAD_00008_C01.vue' // Editor's Pick
import C02 from './components/PGE_AAD_00008_C02.vue' // FAQ
import C03 from './components/PGE_AAD_00008_C03.vue' // 개인정보 처리방침
import C04 from './components/PGE_AAD_00008_C04.vue' // 영상정보 처리기기
import C05 from './components/PGE_AAD_00008_C05.vue' // 방침 개정 안내
import C06 from './components/PGE_AAD_00008_C06.vue' // 이용약관
import C07 from './components/PGE_AAD_00008_C07.vue' // 입찰공고
import C08 from './components/PGE_AAD_00008_C08.vue' // 에버랜드 테마뮤직
import C10 from './components/PGE_AAD_00008_C10.vue' // 기타
import C11 from './components/PGE_AAD_00008_C11.vue' // 콜센터 VOC 답변
import C12 from './components/PGE_AAD_00008_C12.vue' // 도슨트와 함께 산책 (가제)

export default {
  name: 'PGE_AAD_00009', // eslint-disable-line vue/name-property-casing
  components: {
    C01,
    C02,
    C03,
    C04,
    C05,
    C06,
    C07,
    C08,
    C10,
    C11,
    C12,
  },
  filters: {
    numberFormat(value) {
      return value ? utils.numberFormat(value) : null
    },
  },
  data() {
    return {
      publctId: '',
      // 상세조회 데이터
      detailData: {
        publctKindCd: '',
        publctKindCdOld: '',
        exposrYn: 'Y',
        exposrOrder: '',
        exposrPeriod: [],
        appExposrPeriodStartDtm: '',
        appExposrPeriodEndDtm: '',
        periodDispInfo: [],
        periodDispInfoStartDate: '',
        periodDispInfoEndDate: '',
        contntKind: '',
        subject: '',
        contentDesc: '',
        fileId: '',
        url: '',
      },
    }
  },
  computed: {
    compShow() {
      return this.detailData.publctKindCd
    },
    exposrPeriodShowYn() {
      if (this.detailData.publctKindCd === '10') {
        return false
      }
      return true
    },
    periodDispInfoShowYn() {
      const componentsShow = this.detailData.publctKindCd
      if (componentsShow === '02' || componentsShow === '03' || componentsShow === '04'
      || componentsShow === '06' || componentsShow === '08' || componentsShow === '10' || componentsShow === '12') {
        return false
      }
      return true
    },
    styleExposrPeriod() {
      if (this.compShow === '02' || this.compShow === '03' || this.compShow === '04'
      || this.compShow === '06' || this.compShow === '08' || this.compShow === '10' || this.compShow === '12') {
        return 'width:100%;height: auto;'
      }
      return 'width:50%; height: auto;'
    },
    styleExposrYn() {
      if (this.compShow === '10') {
        return 'width:100%;height: auto;'
      }
      return 'width:50%; height: auto;'
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
  mounted() {
  },
  methods: {
    // 조회
    fnSelectDetail() {
      const queryParams = {
        publctId: this.publctId,
        currRows: 0,
        rowsPerPage: 1,
      }

      http.request(this.$options.name, 'DTS_AAD_00015', {
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

      const { publctKindCd } = this.detailData
      const { contentDesc } = this.detailData
      if (publctKindCd === '01') {
        this.$refs.C01.$refs.C01Editor.setHtml(contentDesc)
      } else if (publctKindCd === '03') {
        this.$refs.C03.$refs.C03Editor.setHtml(contentDesc)
      } else if (publctKindCd === '04') {
        this.$refs.C04.$refs.C04Editor.setHtml(contentDesc)
      } else if (publctKindCd === '05') {
        this.$refs.C05.$refs.C05Editor.setHtml(contentDesc)
      } else if (publctKindCd === '06') {
        this.$refs.C06.$refs.C06Editor.setHtml(contentDesc)
      } else if (publctKindCd === '07') {
        this.$refs.C07.$refs.C07Editor.setHtml(contentDesc)
      } else if (publctKindCd === '10') {
        this.$refs.C10.$refs.C10Editor.setHtml(contentDesc)
      } else if (publctKindCd === '11') {
        this.$refs.C11.$refs.C11Editor.setHtml(contentDesc)
      }
    },
    // 기타 게시판 관리 목록으로 이동
    onClickList() {
      const params = utils.getParameter(this, 'params')
      delete params.publctId
      utils.goPage('PGE_AAD_00007', { params })
    },
    // 기타 게시판 수정으로 이동
    onClickMdfc() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAD_00008', { params })
    },
  },
}
</script>
<style scoped>
</style>
