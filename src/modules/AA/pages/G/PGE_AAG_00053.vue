<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <!-- 블리스 등급 관리 상세 -->
    <sui-page-contents>
      <!-- S :: 노출 정보 -->
      <div class="comm_title_wrap">
        <h4>
          {{ $t('MSG_TXT_EXPOSR_INFO') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_BLISS_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          {{ blissData.blissName }}
        </ur-form-item>

        <ur-form-item
          :label="$t('MSG_TXT_EVENT_PERIOD')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          {{ blissData.eventStartDtm }} ~ {{ blissData.eventEndDtm }}
        </ur-form-item>
      </ur-form-box>

      <div class="comm_title_wrap mt45">
        <h4>
          {{ $t('MSG_TXT_BLISS_GRD_INFO') }}
        </h4>
      </div>

      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None"
        :headers="columns"
        :data-source="blissGrdData"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />

      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <!-- 목록 -->
            <ur-button
              v-permission:read="this.$options.name"
              @click="onClickList"
            >
              {{ $t("MSG_BTN_LIST") }}
            </ur-button>
          </div>

          <!-- 수정 -->
          <div class="right_box">
            <ur-button
              v-permission:update="this.$options.name"
              color="violet"
              @click="onClickMdfc"
            >
              {{ $t("MSG_BTN_MDFC") }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_AAG_00053', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 공통코드
      codeKeyList: ['COD_IA_BLISS_GRD_BASE'],
      codes: { COD_IA_BLISS_GRD_BASE: [] },
      blissId: '',
      blissData: {
        blissId: '',
        blissName: '',
        eventStartDtm: '',
        eventEndDtm: '',
      },
      blissGrdData: {
        blissGrdSeq: '',
        blissGrdNo: '',
        blissGrdName: '',
        blissGrdImagUrl: '',
        blissGrdCd: '',
        blissGrdBaseScnt: '',
        blissGrdBaseCd: '',
      },
      // 테이블 옵션
      opts: {
        noInfo: true,
        pagination: true,
      },
    }
  },
  computed: {
    columns() {
      const that = this
      const columns = [
        {
          text: this.$t('MSG_TXT_GRD'),
          value: 'blissGrdNo',
        },
        {
          text: this.$t('MSG_TXT_BLISS_GRD_NAME'),
          value: 'blissGrdName',
        },
        {
          text: this.$t('MSG_TXT_BLISS_GRD_IMAG'),
          value: 'blissGrdImagUrl',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><cmp-single-file-uploader mode="SELECT" v-model="row.blissGrdImagUrl" :page-id="pageId"/></div>',
            computed: {
              pageId() {
                return that.$options.name
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_GRD_DCNT'),
          value: 'blissGrdBaseCd',
          customValue(val, row) {
            const code = that.codes.COD_IA_BLISS_GRD_BASE.find(v => v.codeId === val)
            return row.blissGrdBaseScnt + code.codeName
          },
        },
      ]
      return columns
    },
  },
  watch: {
  },
  created() {
    const params = utils.getParameter(this, 'params')
    this.blissId = params.blissId

    // 공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {
      // 상세조회
      this.fnSelectDetail()
    }).catch(() => {})
  },
  mounted() {
  },
  methods: {
    /**
     * 상세조회
     */
    fnSelectDetail() {
      http.request(this.$options.name, 'DTS_AAG_00053', {
        path: {
          'bliss-id': this.blissId,
        },
      }).then(res => {
        this.blissData = res.data
        this.blissData.eventStartDtm = utils.toStringByFormat(this.blissData.eventStartDtm, 'YYYY-MM-DD HH:mm')
        this.blissData.eventEndDtm = utils.toStringByFormat(this.blissData.eventEndDtm, 'YYYY-MM-DD HH:mm')

        this.blissGrdData = res.data.blissGrdList
      }).catch(error => {
        console.log(error)
      })
    },

    // 블리스 등급 관리 목록으로 이동
    onClickList() {
      const params = utils.getParameter(this, 'params')
      delete params.blissId
      utils.goPage('PGE_AAG_00051', { params })
    },

    // 블리스 등급 관리 수정으로 이동
    onClickMdfc() {
      const params = utils.getParameter(this, 'params')
      utils.goPage('PGE_AAG_00052', { params })
    },
  },
}
</script>
<style scoped>
</style>
