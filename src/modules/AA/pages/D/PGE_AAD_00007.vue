<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_CLASS')"
          :label-align="'right'"
          style="width: 50%; height: auto; border: 0;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="search.publctKindCd"
            :items="codes.COD_IA_OTHR_CONTENT_CLASS"
            no-select
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>

        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_EXPOSR_YN')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox-wrapper
            v-model="search.exposrYn"
            :items="useYn"
            sm
          />
        </ur-form-item>

        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_APP_EXPOSR_PERIOD')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-range-picker
            v-model="search.appExposrPeriod"
            :confirm-label="$t('MSG_TXT_SELT')"
            input-type="YYYY-MM-DD"
          />
        </ur-form-item>

        <ur-form-item
          :label="$t('MSG_TXT_TTL')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="search.subject"
            style="width: 100%;"
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

      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None mt35"
        :headers="columns"
        :data-source="dataList"
        :options="opts"
        :item-size="search.totalCount"
        :data-set-options="{id: 'id'}"
        @grid:click="fnGridRowClick"
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
      <div class="btn_wrap mt10">
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

      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAD_00007', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 공통코드
      codeKeys: [
        'COD_IA_OTHR_CONTENT_CLASS',
        'COD_IA_OTHR_CONTENT_KIND',
      ],
      codes: {
        COD_IA_OTHR_CONTENT_CLASS: [],
        COD_IA_OTHR_CONTENT_KIND: [],
      },

      // 검색조건
      search: {
        publctKindCd: '',
        exposrYn: ['Y', 'N'],
        appExposrPeriod: [],
        appExposrPeriodStartDate: '',
        appExposrPeriodEndDate: '',
        subject: '',
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

      useYn: [
        { value: 'Y', text: 'Y' },
        { value: 'N', text: 'N' },
      ],
      dataList: new this.$ur.grid.DataSet(),
    }
  },
  computed: {
    columns() {
      return [
        {
          text: this.$t('MSG_TXT_PUBLCT_CLASS'),
          value: 'publctKindCd',
          width: 150,
          type: 'code',
          domain: this.codes.COD_IA_OTHR_CONTENT_CLASS,
        },
        {
          text: this.$t('MSG_TXT_TTL'),
          value: 'subject',
          width: 400,
          component: {
            props: ['row', 'value'],
            template: '<div><ur-button style="padding-left:0" shape="hyperlink">{{row.subject}}</ur-button></div>',
          },
        },
        { text: this.$t('MSG_TXT_EXPOSR_YN'), value: 'exposrYn', width: 80 },
        {
          text: this.$t('MSG_TXT_EXPOSR_ORDER'),
          value: 'exposrOrder',
          width: 80,
          customValue(v, r) {
            if (r.publctKindCd === '10') {
              return '-'
            }
            return utils.numberFormat(v)
          },
        },
        {
          text: this.$t('MSG_TXT_PUBLCT_ID'),
          value: 'publctId',
          width: 320,
          click: v => prompt(this.$t('MSG_TXT_COPY_CLIPBOARD_WITH_CTRL_C'), v), // Ctrl+C를 눌러 클립보드로 복사하세요.
        },
        {
          text: this.$t('MSG_TXT_APP_EXPOSR_PERIOD'),
          value: 'appExposrPeriod',
          width: 260,
          customValue: (val, row) => {
            if (row.publctKindCd === '10') {
              return '-'
            }

            const finish = utils.toStringByFormat(row.appExposrPeriodStartDtm, 'YYYY-MM-DD HH:mm')
            const end = utils.toStringByFormat(row.appExposrPeriodEndDtm, 'YYYY-MM-DD HH:mm')
            return `${finish} ~ ${end}`
          },
        },
        {
          text: this.$t('MSG_TXT_RGST_DTM'),
          value: 'fstRgstDtm',
          width: 150,
          customValue: v => utils.dateformatToClient(v),
        },
        {
          text: this.$t('MSG_TXT_RGST_USR'),
          value: 'fstRgstUsrId',
          width: 100,
        },
        {
          text: this.$t('MSG_TXT_MDFC_DTM'),
          value: 'fnlMdfcDtm',
          width: 150,
          customValue: v => utils.dateformatToClient(v),
        },
        { text: this.$t('MSG_TXT_MDFC_USR'), value: 'fnlMdfcUsrId', width: 100 },
      ]
    },
  },
  created() {
    http.mergeCodeList(this.$options.name, this.codeKeys, this.codes)
  },
  mounted() {
    const params = utils.getParameter(this, 'params')
    if (params) {
      this.search.publctKindCd = params.publctKindCd
      this.search.exposrYn = params.exposrYn
      this.search.appExposrPeriod = params.appExposrPeriod
      this.search.subject = params.subject
      this.search.currRows = 0
      this.search.totalCount = 0
      this.search.rowsPerPage = params.rowsPerPage
    } else {
      this.onClickReset()
    }
    this.onClickSearchBtn()
  },
  methods: {
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
      // 검색조건
      this.searchParam = {
        publctKindCd: this.search.publctKindCd,
        exposrYnList: this.search.exposrYn.join(','),
        appExposrPeriodStartDtm: utils.dateformatToServer(this.search.appExposrPeriod[0], 'S'),
        appExposrPeriodEndDtm: utils.dateformatToServer(this.search.appExposrPeriod[1], 'S'),
        subject: encodeURI(this.search.subject),
        currRows: this.search.currRows, // 현재 가지고 온 데이터 수
        rowsPerPage: this.search.rowsPerPage, // 가지고 올 데이터 수
      }
    },

    // 그리드 맨 마지막
    onBottom() {
      // 가지고 온 데이터 수와 totalSize 가 같지 않을 경우만 재조회
      if (this.search.currRows !== this.search.totalCount) {
        this.onClickSearch()
      }
    },

    /** *************************************
    * 상세조회
    * Arguments
    *  : Value of cell
    *  : Data object of clicked row
    *  : Field information
    *  : Native click event
    **************************************** */
    fnGridRowClick(v, d, f) {
      if (f.value === 'subject') {
        const params = {
          publctId: d.publctId,
          publctKindCd: this.search.publctKindCd,
          exposrYn: this.search.exposrYn,
          appExposrPeriod: this.search.appExposrPeriod,
          subject: this.search.subject,
          rowsPerPage: this.search.rowsPerPage,
        }
        utils.goPage('PGE_AAD_00009', { params })
      }
    },

    /** *************************************
     * 신규등록
     *************************************** */
    onClickRegist() {
      const params = {
        publctKindCd: this.search.publctKindCd,
        exposrYn: this.search.exposrYn,
        appExposrPeriod: this.search.appExposrPeriod,
        subject: this.search.subject,
        rowsPerPage: this.search.rowsPerPage,
      }
      utils.goPage('PGE_AAD_00008', { params })
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
        http.request(this.$options.name, 'DTS_AAD_00016', {
          data: queryParams,
        }).then(() => {
          utils.messageBox('alert', this.$t('MSG_ALT_DELETED')) // 삭제 되었습니다.
          this.onClickSearchBtn() // 재검색
        }).catch(error => {
          console.log(error)
        })
      })
    },

    // 검색조건 유효성체크
    checkSearchValidataion() {
      if (_.isEmpty(this.search.exposrYn)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_EXPOSR_YN'))) // {노출여부}(을)를 선택하세요.
        return false
      }

      if (_.isEmpty(this.search.appExposrPeriod[0])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD'))) // {앱노출기간} 을(를) 입력하세요.
        return false
      }

      if (_.isEmpty(this.search.appExposrPeriod[1])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD'))) // {앱노출기간} 을(를) 입력하세요.
        return false
      }
      return true
    },

    /** *************************************
     * 검색
     *************************************** */
    onClickSearch() {
      if (!this.checkSearchValidataion()) {
        return
      }

      this.searchParam.currRows = this.search.currRows
      http.request(this.$options.name, 'DTS_AAD_00015', {
        query: this.searchParam,
      }).then(res => {
        this.dataList.appendData(res.data.list)
        this.search.currRows = this.dataList.totalSize
        this.search.totalCount = res.data.totalCount
      }).catch(error => {
        console.log(error)
      })
    },

    // 초기화
    onClickReset() {
      this.search.publctKindCd = ''
      this.search.exposrYn = ['Y', 'N']
      this.search.subject = ''

      this.search.appExposrPeriod = [
        moment().format('YYYY-MM-DD'),
        moment().add('14', 'days').format('YYYY-MM-DD'),
      ]
      this.search.rowsPerPage = 30
    },
    onChangePageSize(pageSize) {
      this.search.rowsPerPage = pageSize
    },
  },
}
</script>
<style scoped>
</style>
