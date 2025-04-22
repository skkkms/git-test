<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 할인혜택 관리 탭 메뉴-->
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="search.parkKindCd"
            :items="codes.COD_RS_PARK_KIND_SIMPLE"
            no-select
            :msg-no-select="$t('MSG_TXT_ALL')"
            @input="inputParkKindCd"
          />
        </ur-form-item>

        <ur-form-item
          :label="$t('MSG_TXT_BNTF_CLASS')"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-if="search.parkKindCd=='02'"
            v-model="search.bnftClassCd"
            :items="COD_IA_BENEFIT_CLASS_CB"
            no-select
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
          <ur-dropdown
            v-else
            v-model="search.bnftClassCd"
            :items="codes.COD_IA_BENEFIT_CLASS"
            no-select
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>

        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
        >
          <ur-checkbox-wrapper
            v-model="search.exposrYn"
            :items="useYn"
            sm
          />
        </ur-form-item>

        <ur-form-item
          :label="$t('MSG_TXT_APP_EXPOSR_PERIOD')"
          :label-align="'right'"
          style="width: 50%; height:auto;"
          class="flex_wrap"
        >
          <ur-range-picker
            v-model="search.appExposrPeriodDtm"
            :confirm-label="$t('MSG_TXT_SELT')"
            input-type="YYYY-MM-DD"
            init="month-1"
          />
        </ur-form-item>

        <ur-form-item
          :label="$t('MSG_TXT_TITLE')"
          :label-align="'right'"
          style="width:100%; height:auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="search.publctSubject"
            style="width:100%; height:auto;"
            maxlength="300"
            @enter="onClickSearchBtn"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- 초기화 -->
          <ur-button
            v-permission:read="this.$options.name"
            @click="onClickReset()"
          >
            {{ $t('MSG_BTN_RESET') }}
          </ur-button>

          <!-- 검색 -->
          <ur-button
            v-permission:read="this.$options.name"
            color="violet"
            @click="onClickSearchBtn()"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </ur-button>
        </div>
      </div>
      <!-- E :: 시설 정보 탭 메뉴-->

      <!-- S :: 세부 예약 현황 테이블-->
      <template>
        <ur-data-grid
          ref="grid"
          class="custom_grid_pgeNav_None mt45"
          :headers="columns"
          :data-source="dataList"
          :options="opts"
          :item-size="search.totalCount"
          :data-set-options="{id: 'id'}"
          @grid:scroll-bottom="onBottom"
        >
          <template #left-info>
            <cmp-ur-data-grid-left-info
              :total-count="search.totalCount"
              :page-size="search.rowsPerPage"
              @changePageSize="onChangePageSize"
            />
          </template>
        </ur-data-grid>
      </template>
      <!-- E :: 세부 예약 현황 테이블-->


      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="right_box">
            <!-- 삭제 -->
            <ur-button
              v-permission:delete="this.$options.name"
              @click="onClickDelete()"
            >
              {{ $t("MSG_BTN_DEL") }}
            </ur-button>

            <!--신규 등록 -->
            <ur-button
              v-permission:create="this.$options.name"
              color="violet"
              @click="onClickRegist"
            >
              {{ $t("MSG_BTN_RGST_NEW") }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

import moment from "moment";

export default {
  name: 'PGE_AAD_00011', // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // 공통코드
      codeKeys: [
        'COD_RS_PARK_KIND_SIMPLE',
        'COD_IA_BENEFIT_CLASS',
      ],
      codes: {
        COD_RS_PARK_KIND_SIMPLE: [],
        COD_IA_BENEFIT_CLASS: [],
      },
      COD_IA_BENEFIT_CLASS_CB: [],

      // 검색조건
      search: {
        parkKindCd: '',
        bnftClassCd: '',
        exposrYn: ['Y', 'N'],
        publctSubject: '',
        appExposrPeriodDtm: [],
        appExposrPeriodStartDtm: '',
        appExposrPeriodEndDtm: '',
        currRows: 0, // 가지고 온 데이터 수
        totalCount: 0,
        rowsPerPage: 10,
      },
      // 검색 시 실제 넘기는 searchParam
      searchParam: {},

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

      useYn: [{ value: 'Y', text: 'Y' }, { value: 'N', text: 'N' }],
      dataList: new this.$ur.grid.DataSet(),
    }
  },
  computed: {
    columns() {
      const that = this
      const columns = [
        {
          value: 'parkKindCd', text: this.$t('MSG_TXT_PUBLCT_KIND'), width: 150, align: 'center ', type: 'code', domain: this.codes.COD_RS_PARK_KIND_SIMPLE,
        },
        {
          value: 'bnftClassCd', text: this.$t('MSG_TXT_BNTF_CLASS'), width: 150, type: 'code', domain: this.codes.COD_IA_BENEFIT_CLASS,
        },
        {
          value: 'publctSubject',
          text: this.$t('MSG_TXT_TITLE'),
          width: 400,
          component: {
            props: ['row', 'value'],
            template: '<div><ur-button style="padding-left:0;" shape="hyperlink" @click.stop="clickCheck(row)">{{row.publctSubject}}</ur-button></div>',
            methods: {
              clickCheck(row) {
                that.fnGridRowClick(row)
              },
            },
          },
        },
        { value: 'exposrYn', text: this.$t('MSG_TXT_EXPOSR_YN'), width: 80 },
        {
          value: 'exposrOrder', text: this.$t('MSG_TXT_EXPOSR_ORDER'), width: 80, customValue: v => utils.numberFormat(v),
        },
        {
          text: this.$t('MSG_TXT_PUBLCT_ID'),
          value: 'publctId',
          width: 320,
          click: v => prompt(this.$t('MSG_TXT_COPY_CLIPBOARD_WITH_CTRL_C'), v), // Ctrl+C를 눌러 클립보드로 복사하세요.
        },
        {
          value: 'appExposrPeriodDtm',
          text: this.$t('MSG_TXT_APP_EXPOSR_PERIOD'),
          width: 300,
          customValue(val, row) {
            const start = utils.toStringByFormat(row.appExposrPeriodStartDtm, 'YYYY-MM-DD HH:mm')
            const end = utils.toStringByFormat(row.appExposrPeriodEndDtm, 'YYYY-MM-DD HH:mm')
            return `${start} ~ ${end}`
          },
        },
        {
          text: this.$t('MSG_TXT_RGST_DTM'),
          value: 'fstRgstDtm',
          width: 150,
          customValue(value) {
            return utils.dateformatToClient(value)
          },
        },
        { text: this.$t('MSG_TXT_RGST_USR'), value: 'fstRgstUsrId', width: 100 },
        {
          text: this.$t('MSG_TXT_MDFC_DTM'),
          value: 'fnlMdfcDtm',
          width: 150,
          customValue(value) {
            return utils.dateformatToClient(value)
          },
        },
        { text: this.$t('MSG_TXT_MDFC_USR'), value: 'fnlMdfcUsrId', width: 100 },
      ]
      return columns
    },
  },
  created() {
    const params = utils.getParameter(this, 'params')

    // 공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeys, this.codes).then(() => {
      this.COD_IA_BENEFIT_CLASS_CB = this.codes.COD_IA_BENEFIT_CLASS.slice(0, 3)
      if (params) {
        this.search.parkKindCd = params.parkKindCd
        this.search.bnftClassCd = params.bnftClassCd
        this.search.exposrYn = params.exposrYn
        this.search.publctSubject = params.publctSubject
        this.search.appExposrPeriodDtm = params.appExposrPeriodDtm
        this.search.appExposrPeriodStartDtm = params.appExposrPeriodStartDtm
        this.search.appExposrPeriodEndDtm = params.appExposrPeriodEndDtm
        this.search.currRows = 0
        this.search.totalCount = 0
        this.search.rowsPerPage = params.rowsPerPage
      } else {
        this.onClickReset()
      }
      this.onClickSearchBtn()
    }).catch(() => {})
  },
  methods: {
    // 게시구분 선택시
    inputParkKindCd() {
      this.search.bnftClassCd = ''
    },

    // 검색버튼
    onClickSearchBtn() {
      if (this.checkSearchValidataion()) {
        this.dataList = new this.$ur.grid.DataSet()
        this.search.currRows = 0 // 가지고 온 데이터 초기화
        this.search.totalCount = 0
        this.setSearchParam() // serachParam 셋팅
        this.onClickSearch()
      }
    },
    // serachParam 셋팅
    setSearchParam() {
      this.searchParam = {
        parkKindCd: this.search.parkKindCd,
        bnftClassCd: this.search.bnftClassCd,
        exposrYnList: this.search.exposrYn.join(','),
        publctSubject: encodeURI(this.search.publctSubject),
        appExposrPeriodStartDtm: utils.dateformatToServer(this.search.appExposrPeriodDtm[0], 'S'),
        appExposrPeriodEndDtm: utils.dateformatToServer(this.search.appExposrPeriodDtm[1], 'S'),
        currRows: this.search.currRows, // 현재 가지고 온 데이터 수
        rowsPerPage: this.search.rowsPerPage, // 가지고 올 데이터 수
      }
    },
    // 검색조건 유효성체크
    checkSearchValidataion() {
      if (_.isEmpty(this.search.exposrYn)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_EXPOSR_YN'))) // {노출여부}(을)를 선택하세요.
        return false
      }

      if (_.isEmpty(this.search.appExposrPeriodDtm[0])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD'))) // {앱노출기간} 을(를) 입력하세요.
        return false
      }

      if (_.isEmpty(this.search.appExposrPeriodDtm[1])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD'))) // {앱노출기간} 을(를) 입력하세요.
        return false
      }
      return true
    },
    /** *************************************
     * 검색
     *************************************** */
    onClickSearch() {
      if (!this.checkSearchValidataion()) { return }

      // 검색조건
      this.searchParam.currRows = this.search.currRows
      http.request(this.$options.name, 'DTS_AAD_00026', {
        query: this.searchParam,
      }).then(res => {
        this.dataList.appendData(res.data.list)
        this.search.currRows = this.dataList.totalSize
        this.search.totalCount = res.data.totalCount
      }).catch(error => {
        console.log(error)
      })
    },
    /** *************************************
    * 상세조회
    **************************************** */
    fnGridRowClick(row) {
      const params = {
        ...this.search,
        publctId: row.publctId,
      }
      utils.goPage('PGE_AAD_00013', { params })
    },
    /** *************************************
     * 신규등록
     *************************************** */
    onClickRegist() {
      const params = {
        ...this.search,
      }
      utils.goPage('PGE_AAD_00012', { params })
    },
    /** *************************************
     * 삭제
     *************************************** */
    onClickDelete() {
      const rows = this.$refs.grid.getSelected()
      if (rows.length < 1) {
        utils.messageBox('alert', this.$t('MSG_ALT_DEL_NO_DATA')) // 삭제할 데이터를 선택하세요.
        return
      }
      // 삭제 하시겠습니까?
      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
        const queryParams = rows
        http.request(this.$options.name, 'DTS_AAD_00027', {
          data: queryParams,
        }).then(() => {
          utils.messageBox('alert', this.$t('MSG_ALT_DELETED')) // 삭제 되었습니다.
          this.onClickSearchBtn() // 재검색
        }).catch(error => {
          console.log(error)
        })
      })
    },
    // 초기화
    onClickReset() {
      this.search.parkKindCd = ''
      this.search.bnftClassCd = ''
      this.search.exposrYn = ['Y', 'N']
      this.search.publctSubject = ''

      const dToday = utils.now('YYYY-MM-DD')
      this.search.appExposrPeriodDtm = [moment(utils.now('YYYY-MM-DD')).format('YYYY-MM-DD'), moment(utils.now('YYYY-MM-DD')).add(14, 'days').format('YYYY-MM-DD')]
      this.search.rowsPerPage = 30
    },
    // 그리드 맨 마지막
    onBottom() {
      // 가지고 온 데이터 수와 totalSize 가 같지 않을 경우만 재조회
      if (this.search.currRows !== this.search.totalCount) {
        this.onClickSearch()
      }
    },
    onChangePageSize(pageSize) {
      this.search.rowsPerPage = pageSize
    },
  },
}
</script>
