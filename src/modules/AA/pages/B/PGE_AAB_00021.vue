<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <!-- 배너 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_BANNER_KIND')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto; border: 0;"
        >
          <ur-dropdown
            v-model="searchParams.bannerKindCd"
            :items="codes.COD_IA_BANNER_KIND"
            no-select
            :msg-no-select="$t('MSG_TXT_ALL')"
            @input="onInputBannerKind"
          />
        </ur-form-item>
        <!-- 게시 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto; border: 0;"
        >
          <ur-dropdown
            v-model="searchParams.parkKindCd"
            :items="parkKindItems"
            no-select
            :msg-no-select="$t('MSG_TXT_ALL')"
            @input="onInputParkKind"
          />
        </ur-form-item>
        <!-- 언어 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_LANG_DIV')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox
            v-model="searchParams.langKor"
            value="01"
            sm
          /><span class="check_label">{{ $t('MSG_TXT_KO') }}</span> <!-- 국문 -->
          <ur-checkbox
            v-model="searchParams.langEng"
            value="02"
            sm
          /><span class="check_label">{{ $t('MSG_TXT_EN') }}</span> <!-- 영문 -->
        </ur-form-item>
        <!-- 노출 여부 -->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox
            v-model="searchParams.exposrYn1Chk"
            value="Y"
            sm
          /><span class="check_label">Y</span> <!-- Y -->
          <ur-checkbox
            v-model="searchParams.exposrYn2Chk"
            value="N"
            sm
          /><span class="check_label">N</span> <!-- N -->
        </ur-form-item>
        <!-- 게시 위치 -->
        <ur-form-item
          :label="$t('MSG_TXT_PUBCT_TARGET')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox
            v-model="searchParams.appPublctYnChk"
            value="Y"
            sm
          /><span class="check_label">{{ $t('MSG_TXT_APP_EN') }}</span> <!-- App -->
          <ur-checkbox
            v-model="searchParams.mobilePublctYnChk"
            value="Y"
            sm
          /><span class="check_label">{{ $t('MSG_TXT_IA_MOBILEWEB') }}</span> <!-- 모바일웹 -->
          <ur-checkbox
            v-model="searchParams.pcPublctYnChk"
            value="Y"
            sm
          /><span class="check_label">{{ $t('MSG_TXT_PC') }}</span> <!-- PC -->
        </ur-form-item>
        <!-- 게시 기간 -->
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_DT')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-range-picker
            v-model="searchParams.publctPeriods"
            input-type="YYYY-MM-DD"
            model-type="YYYYMMDD"
            :confirm-label="$t('MSG_TXT_SEL')"
          />
        </ur-form-item>
        <!-- 제목 -->
        <ur-form-item
          :label="$t('MSG_TXT_TTL')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="searchParams.bannerSubject"
            maxlength="150"
            style="width: 100%;"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
        <!-- 배너 코드 -->
        <ur-form-item
          :label="$t('MSG_TXT_BANNER_CD')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="searchParams.bannerCode"
            :items="bannerCdItems"
            no-select
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="onClickReset">
            {{ $t('MSG_BTN_INTL') }} <!-- 초기화 -->
          </ur-button>
          <ur-button
            color="violet"
            @click="onClickSearch"
          >
            {{ $t('MSG_BTN_SEARCH') }} <!-- 검색 -->
          </ur-button>
        </div>
      </div>

      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None mt35"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :data-set-options="{id: 'id'}"
        :item-size="totalCount"
        @grid:scroll-bottom="onScrollBottom"
      >
        <template #left-info>
          <cmp-ur-data-grid-left-info
            :total-count="totalCount"
            :page-size="searchParams.rowsPerPage"
            @changePageSize="onChangePageSize"
          />
        </template>
      </ur-data-grid>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="onClickDelete">
            {{ $t('MSG_BTN_DEL') }} <!-- 삭제 -->
          </ur-button>
          <ur-button
            color="violet"
            @click="onClickNewBanner"
          >
            {{ $t('MSG_BTN_RGST_NEW') }} <!-- 신규 등록 -->
          </ur-button>
        </div>
      </div>

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_AAB_00021', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      codeKeys: [
        'COD_IA_BANNER_KIND', // 배너구분
        'COD_IA_RS_PARK_KIND', // 게시파크구분
        'COD_IA_BANNER_CODE', // 배너코드
      ],
      codes: {
        COD_IA_BANNER_KIND: [],
        COD_IA_RS_PARK_KIND: [],
        COD_IA_BANNER_CODE: [],
      },
      params: {},
      searchParams: {},

      parkKindItems: [],
      bannerCdItems: [],

      // 테이블
      opts: {
        infinityScroll: true,
        pagination: false,
        height: 450,
        noInfo: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        resizableColumn: true,
      },
      list: new this.$ur.grid.DataSet(),
      currRows: 0,
      totalCount: 0,
      rowsPerPage: 30,
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    columns() {
      return [
        {
          text: this.$t('MSG_TXT_BANNER_KIND'), // 배너 구분
          value: 'bannerKindCd',
          minWidth: 100,
        },
        {
          text: this.$t('MSG_TXT_PUBLCT_KIND'), // 게시 구분
          value: 'parkKindCd',
          minWidth: 100,
        },
        {
          text: this.$t('MSG_TXT_BANNER_CD'), // 배너 코드
          value: 'bannerCode',
          minWidth: 100,
        },
        {
          text: this.$t('MSG_TXT_LANG_DIV'), // 언어 구분
          value: 'langKindCd',
          minWidth: 100,
        },
        {
          text: this.$t('MSG_TXT_TTL'), // 제목
          value: 'bannerSubject',
          minWidth: 200,
          customStyle: () => ({ 'text-decoration': 'underline' }),
          click: (value, row) => {
            const params = {}
            params[`${this.$options.name}`] = this.params // 검색조건
            params.publctId = row.publctId
            utils.goPage('PGE_AAB_00023', { params })
          },
        },
        {
          text: this.$t('MSG_TXT_EXPOSR_YN'), // 노출여부
          value: 'exposrYn',
          minWidth: 70,
        },
        {
          text: this.$t('MSG_TXT_EXPOSR_ORDER'), // 노출 순서
          value: 'exposrOrder',
          minWidth: 66,
          customValue: v => utils.numberFormat(v),
        },
        {
          text: this.$t('MSG_TXT_PUBLCT_DT'), // 게시 기간
          value: 'publctDtm',
          minWidth: 250,
          customValue: (v, r) => {
            const startDtm = moment(r.publctStartDtm, 'YYYYMMDDHHmm').format('YYYY-MM-DD HH:mm')
            const endDtm = moment(r.publctEndDtm, 'YYYYMMDDHHmm').format('YYYY-MM-DD HH:mm')
            let customValue = startDtm
            customValue = customValue.concat(' ~ ')
            customValue = customValue.concat(endDtm)
            return customValue
          },
        },
        {
          text: this.$t('MSG_TXT_PUBCT_TARGET'), // 게시 위치
          value: 'publctLocation',
          minWidth: 130,
        },
        {
          text: this.$t('MSG_TXT_RGST_DTM'), // 등록일시
          value: 'fstRgstDtm',
          minWidth: 150,
          customValue: v => utils.dateformatToClient(v),
        },
        {
          text: this.$t('MSG_TXT_RGST_USR'), // 등록자
          value: 'fstRgstUsrId',
          minWidth: 100,
        },
        {
          text: this.$t('MSG_TXT_MDFC_DTM'), // 수정일시
          value: 'fnlMdfcDtm',
          minWidth: 150,
          customValue: v => utils.dateformatToClient(v),
        },
        {
          text: this.$t('MSG_TXT_MDFC_USR'),
          value: 'fnlMdfcUsrId',
          minWidth: 100,
        }, // 수정자
      ]
    },
  },
  created() {
    http.mergeCodeList(this.$options.name, this.codeKeys, this.codes).then(() => {
      this.parkKindItems = this.codes.COD_IA_RS_PARK_KIND
      this.bannerCdItems = this.codes.COD_IA_BANNER_CODE
    })
  },
  mounted() {
    this.initializeSearchParams()
    this.onClickSearch()
  },
  methods: {
    initializeSearchParams() {
      const searchParams = utils.getParameter(this, 'params')[`${this.$options.name}`]
      if (!utils.isEmpty(searchParams)) {
        this.searchParams = searchParams
        this.$refs.grid.mx_pager.rowsPerPage = this.searchParams.rowsPerPage
      } else {
        this.onClickReset()
      }
    },
    onClickReset() {
      this.searchParams = {
        bannerKindCd: '',
        parkKindCd: '',
        langKor: '01',
        langEng: '02',
        exposrYn1Chk: 'Y',
        exposrYn2Chk: 'N',
        appPublctYnChk: 'Y',
        mobilePublctYnChk: 'Y',
        pcPublctYnChk: 'Y',
        publctPeriods: [
          moment().format('YYYYMMDD'),
          moment().add('14', 'days').format('YYYYMMDD'),
        ],
        bannerSubject: '',
        bannerCode: '',
        rowsPerPage: 30,
      }
      this.$refs.grid.mx_pager.rowsPerPage = this.searchParams.rowsPerPage

      this.onInputBannerKind(this.searchParams.bannerKindCd)
      this.onInputParkKind(this.searchParams.parkKindCd)
    },
    onClickSearch() {
      if (!this.searchParams.langKor && !this.searchParams.langEng) {
        utils.messageBox('alert', this.$t('MSG_ALT_LANG_SELECT'))
        return
      }

      if (!this.searchParams.exposrYn1Chk && !this.searchParams.exposrYn2Chk) {
        utils.messageBox('alert', this.$t('MSG_ALT_EXPOSR_SELECT'))
        return
      }

      // eslint-disable-next-line max-len
      if (!this.searchParams.appPublctYnChk && !this.searchParams.mobilePublctYnChk && !this.searchParams.pcPublctYnChk) {
        utils.messageBox('alert', this.$t('MSG_ALT_PUBLCT_SELECT'))
        return
      }

      const publctStartDtm = this.searchParams.publctPeriods.at(0)
      const publctEndDtm = this.searchParams.publctPeriods.at(1)
      if (utils.isEmpty(publctStartDtm) || utils.isEmpty(publctEndDtm)) {
        utils.messageBox('alert', this.$t('MSG_ALT_PUBLCT_DT_INPUT'))
        return
      }

      this.list = new this.$ur.grid.DataSet()
      this.currRows = 0
      this.totalCount = 0

      this.params = utils.cloneDeep(this.searchParams)
      this.selectBannerList()
    },

    // 검색
    selectBannerList() {
      if (this.$refs.grid !== undefined) {
        this.rowsPerPage = this.$refs.grid.mx_pager.rowsPerPage
      }

      http.request(this.$options.name, 'DTS_AAD_00008', {
        query: {
          bannerKindCd: this.params.bannerKindCd,
          parkKindCd: this.params.parkKindCd,
          langTypeKor: this.params.langKor,
          langTypeEng: this.params.langEng,
          exposrYnY: this.params.exposrYn1Chk,
          exposrYnN: this.params.exposrYn2Chk,
          appPublctYn: this.params.appPublctYnChk,
          mobilePublctYn: this.params.mobilePublctYnChk,
          pcPublctYn: this.params.pcPublctYnChk,
          publctStartDtm: this.params.publctPeriods.at(0),
          publctEndDtm: this.params.publctPeriods.at(1),
          bannerSubject: encodeURI(this.params.bannerSubject),
          bannerCode: this.params.bannerCode,
          rowsPerPage: this.params.rowsPerPage,

          currRows: this.currRows,
        },
      }).then(res => {
        this.list.appendData(res.data.list)
        this.currRows = this.list.totalSize
        this.totalCount = res.data.totalCount
      }).catch(error => {
        console.log(error)
      })
    },
    onChangePageSize(pageSize) {
      this.searchParams.rowsPerPage = pageSize
    },
    onScrollBottom() {
      if (this.totalCount > this.currRows) {
        this.selectBannerList()
      }
    },
    onClickNewBanner() {
      const params = {}
      params[`${this.$options.name}`] = this.params
      utils.goPage('PGE_AAB_00022', { params })
    },
    onClickDelete() {
      if (this.list.getSelected().length < 1) {
        utils.messageBox('alert', this.$t('MSG_ALT_DEL_NO_DATA'))
        return
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
        http.request(this.$options.name, 'DTS_AAD_00014', {
          data: this.list.getSelected(),
        }).then(res => {
          if (res.data.count > 0) {
            utils.messageBox('alert', this.$t('MSG_ALT_DELETED'))
            this.onClickSearch()
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },

    /**
     * @function onInputBannerKind
     * @description
     * 1. 배너 구분: 메인 배너(01)
     *   - 게시 구분: 전체, 에버랜드(01), 캐리비안베이(02)
     *   - 배너 코드: 전체, 상단 배너(01), 마케팅 배너(02), Editor's Clip(03), 공지사항(06)
     * 2. 배너 구분: 메인 팝업(02)
     *   - 게시 구분: 전체, 에버랜드(01), 캐리비안베이(02), 홈브리지(03), 스피드웨이(04)
     *   - 배너 코드: 전체
     * 3. 배너 구분: 기타 배너(03)
     *   - 게시 구분: 전체, 에버랜드(01), 캐리비안베이(02), 기타(05)
     *   - 배너 코드: 전체, 출석체크(04), 전자영수증(05)
     */
    onInputBannerKind(value) {
      if (value === '') {
        this.parkKindItems = this.codes.COD_IA_RS_PARK_KIND
        this.bannerCdItems = this.codes.COD_IA_BANNER_CODE
      } else if (value === '01') {
        this.parkKindItems = this.codes.COD_IA_RS_PARK_KIND.filter(item => ['01', '02'].includes(item.value))
        this.bannerCdItems = this.codes.COD_IA_BANNER_CODE.filter(item => ['01', '02', '03', '06'].includes(item.value))

        this.searchParams.bannerCode = ''
      } else if (value === '02') {
        this.parkKindItems = this.codes.COD_IA_RS_PARK_KIND.filter(item => ['01', '02', '03', '04'].includes(item.value))
        this.bannerCdItems = []

        this.searchParams.bannerCode = ''
      } else if (value === '03') {
        this.parkKindItems = this.codes.COD_IA_RS_PARK_KIND.filter(item => ['01', '02', '05'].includes(item.value))
        this.bannerCdItems = this.codes.COD_IA_BANNER_CODE.filter(item => ['04', '05'].includes(item.value))

        this.searchParams.bannerCode = ''
      }
      this.searchParams.parkKindCd = ''
    },

    /**
     * @function onInputParkKind
     * @description
     * 1. 배너 구분: 메인 팝업(02)
     *   - 배너 코드: 전체
     * 2. 배너 구분: 기타 배너(03)
     *   2-1. 게시 구분: 전체, 기타(05)
     *     - 배너 코드: 전체, 출석체크(04), 전자영수증(05)
     *   2-2. ELSE
     *     - 배너 코드: 전체
     */
    onInputParkKind(value) {
      if (this.searchParams.bannerKindCd === '02') {
        this.bannerCdItems = []
      } else if (this.searchParams.bannerKindCd === '03') {
        if (value === '' || value === '05') { // 전체, 기타(05)
          this.bannerCdItems = this.codes.COD_IA_BANNER_CODE.filter(item => ['04', '05'].includes(item.value))
        } else {
          this.bannerCdItems = []
        }
      }
    },
  },
}
</script>
<style scoped>
</style>
