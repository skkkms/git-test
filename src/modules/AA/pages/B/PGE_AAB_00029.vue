<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <!-- 게시 구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          :label-align="'right'"
          style="width: 50%; height: auto; border: 0;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="search.parkKindCd"
            :items="codes.COD_RS_PARK_KIND"
            no-select
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>

        <!-- 방문 상태 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_VST_STTS')"
          :label-align="'right'"
          style="width: 50%; height: auto; border: 0;"
        >
          <ur-checkbox-wrapper
            v-model="search.visitStatusCd"
            :items="codes.COD_IA_VISIT_STATUS"
            sm
          />
        </ur-form-item>

        <!-- 언어 구분 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_LANG_DIV')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox-wrapper
            v-model="search.langKindCd"
            :items="codes.COD_RS_LANG"
            sm
          />
        </ur-form-item>

        <!-- 노출 여부 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_EXPOSR_YN')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox
            v-model="search.exposrYn"
            value="Y"
            sm
          >
            Y
          </ur-checkbox>
          <ur-checkbox
            v-model="search.exposrYn"
            value="N"
            sm
          >
            N
          </ur-checkbox>
        </ur-form-item>

        <!-- 노출 기간 -->
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_EXPOSR_PERIOD')"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          <ur-range-picker
            v-model="search.exposrPriod"
            input-type="YYYY-MM-DD"
            init="month-1"
            :confirm-label="$t('MSG_TXT_SELT')"
          />
        </ur-form-item>

        <!-- 노출 문구(150자)-->
        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_TXT')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="search.exposrDescrt"
            style="width: 100%;"
            maxlength="150"
            @keyup.enter="onClickSearchBtn()"
          />
        </ur-form-item>
      </ur-form-box>

      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
            v-permission:read="this.$options.name"
            @click="onClickReset()"
          >
            {{ $t('MSG_BTN_RESET') }} <!-- 초기화 -->
          </ur-button>
          <ur-button
            v-permission:read="this.$options.name"
            color="violet"
            @click="onClickSearchBtn()"
          >
            {{ $t("MSG_BTN_SEARCH") }} <!-- 검색 -->
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
          <ur-button
            v-permission:delete="this.$options.name"
            @click="onClickDelete()"
          >
            {{ $t("MSG_BTN_DEL") }} <!-- 삭제 -->
          </ur-button>
          <ur-button
            v-permission:create="this.$options.name"
            color="violet"
            @click="onClickRegist()"
          >
            {{ $t("MSG_BTN_RGST_NEW") }} <!--신규 등록 -->
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

import moment from "moment/moment";

export default {
  name: 'PGE_AAB_00029', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 공통코드
      codeKeys: [
        'COD_RS_PARK_KIND',
        'COD_IA_VISIT_STATUS',
        'COD_RS_LANG',
        'COD_RS_USE',
      ],
      codes: {
        COD_RS_PARK_KIND: [],
        COD_IA_VISIT_STATUS: [],
        COD_RS_LANG: [],
        COD_RS_USE: [],
      },

      // 검색조건
      search: {
        parkKindCd: '',
        visitStatusCd: [],
        langKindCd: [],
        exposrYn: [],
        exposrPriod: [],
        exposrDescrt: '',
        currRows: 0, // 가지고 온 데이터 수
        totalCount: 0,
        rowsPerPage: 30,
      },
      // 검색 시 실제 넘기는 searchParam
      searchParam: {},

      // 그리드 옵션
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

      dataList: new this.$ur.grid.DataSet(),
    }
  },
  computed: {
    columns() {
      return [
        // 게시 구분
        { text: this.$t('MSG_TXT_PUBLCT_KIND'), value: 'parkKindNm' },
        // 방문 상태
        { text: this.$t('MSG_TXT_VST_STTS'), value: 'visitStatusNm' },
        // 언어 구분
        { text: this.$t('MSG_TXT_LANG_DIV'), value: 'langKindNm' },
        // 노출 문구
        {
          text: this.$t('MSG_TXT_EXPOSR_TXT'),
          value: 'exposrDescrt',
          width: 200,
          component: {
            props: ['row', 'value'],
            template: '<div><ur-button hyperlink small style="padding: 0;" >{{row.exposrDescrt}}</ur-button></div>',
          },
          customValue: v => v || '-',
        },
        // 노출 여부
        { text: this.$t('MSG_TXT_EXPOSR_YN'), value: 'exposrYn' },
        // 노출 기간
        {
          text: this.$t('MSG_TXT_EXPOSR_PERIOD'),
          value: 'exposrPeriodStartDtm',
          width: 250,
          customValue(val, row) {
            const finish = utils.toStringByFormat(row.exposrPeriodStartDtm, 'YYYY-MM-DD HH:mm')
            const end = utils.toStringByFormat(row.exposrPeriodEndDtm, 'YYYY-MM-DD HH:mm')
            return `${finish} ~ ${end}`
          },
        },
        {
          text: this.$t('MSG_TXT_RGST_DTM'),
          value: 'fstRgstDtm',
          type: 'date',
          width: 150,
          customValue(value) {
            return utils.dateformatToClient(value)
          },
        },
        { text: this.$t('MSG_TXT_RGST_USR'), value: 'fstRgstUsrId' },
        {
          text: this.$t('MSG_TXT_MDFC_DTM'),
          value: 'fnlMdfcDtm',
          type: 'date',
          width: 150,
          customValue(value) {
            return utils.dateformatToClient(value)
          },
        },
        { text: this.$t('MSG_TXT_MDFC_USR'), value: 'fnlMdfcUsrId' },
      ]
    },
  },
  created() {
    const params = utils.getParameter(this, 'params')

    // 공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeys, this.codes).then(() => {
      this.codes.COD_RS_PARK_KIND.splice(-1, 1)
      this.$nextTick(() => {
        // 초기검색값 셋팅
        if (utils.isEmpty(params)) {
          this.onClickReset()
        } else {
          this.search = utils.assign(this.search, params)
        }
        this.onClickSearchBtn()
      })
    })
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
      this.searchParam = {
        parkKindCd: this.search.parkKindCd,
        visitStatusCdList: this.search.visitStatusCd.join(','),
        langKindCdList: this.search.langKindCd.join(','),
        exposrYnList: this.search.exposrYn.join(','),
        exposrDescrt: encodeURI(this.search.exposrDescrt),
        exposrPeriodStartDtm: utils.dateformatToServer(this.search.exposrPriod[0], 'S'),
        exposrPeriodEndDtm: utils.dateformatToServer(this.search.exposrPriod[1], 'S'),
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
    // 상세 조회
    fnGridRowClick(v, d, f) {
      if (f.value === 'exposrDescrt') {
        const params = {
          publctId: d.publctId,
          parkKindCd: this.search.parkKindCd,
          visitStatusCd: this.search.visitStatusCd,
          langKindCd: this.search.langKindCd,
          exposrYn: this.search.exposrYn,
          exposrDescrt: this.search.exposrDescrt,
          exposrPriod: this.search.exposrPriod,
          rowsPerPage: this.search.rowsPerPage,
        }
        utils.goPage('PGE_AAB_00039', { params })
      }
    },
    // 초기화
    onClickReset() {
      this.search.parkKindCd = ''
      this.search.exposrDescrt = ''

      const dToday = utils.now('YYYY-MM-DD')
      this.search.exposrPriod = [moment(utils.now('YYYY-MM-DD')).format('YYYY-MM-DD'), moment(utils.now('YYYY-MM-DD')).add(14, 'days').format('YYYY-MM-DD')]

      let temp = []
      this.codes.COD_IA_VISIT_STATUS.forEach(code => {
        temp.push(code.value)
      })
      this.search.visitStatusCd = temp

      temp = []
      this.codes.COD_RS_LANG.forEach(code => {
        temp.push(code.value)
      })
      this.search.langKindCd = temp

      temp = []
      this.codes.COD_RS_USE.forEach(code => {
        temp.push(code.value)
      })
      this.search.exposrYn = temp
      this.search.rowsPerPage = 30
    },
    // 검색조건 유효성체크
    checkSearchValidataion() {
      if (_.isEmpty(this.search.visitStatusCd)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_VST_STTS'))) // {방문상태}(을)를 선택하세요.
        return false
      }
      if (_.isEmpty(this.search.langKindCd)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_LANG_DIV'))) // {언어구분}(을)를 선택하세요.
        return false
      }
      if (_.isEmpty(this.search.exposrYn)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_EXPOSR_YN'))) // {노출여부}(을)를 선택하세요.
        return false
      }

      if (_.isEmpty(this.search.exposrPriod) || _.isEmpty(this.search.exposrPriod[0])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_EXPOSR_PERIOD'))) // {노출기간} 을(를) 입력하세요.
        return false
      }

      if (_.isEmpty(this.search.exposrPriod[1])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_EXPOSR_PERIOD')))// {노출기간} 을(를) 입력하세요.
        return false
      }
      return true
    },
    // 검색
    onClickSearch() {
      if (!this.checkSearchValidataion()) {
        return
      }

      this.searchParam.currRows = this.search.currRows
      http.request(this.$options.name, 'DTS_AAD_00001', {
        query: this.searchParam,
      }).then(res => {
        this.dataList.appendData(res.data.list)
        this.search.currRows = this.dataList.totalSize
        this.search.totalCount = res.data.totalCount
      }).catch(error => {
        console.log(error)
      })
    },
    // 삭제
    onClickDelete() {
      const rows = this.$refs.grid.getSelected()
      if (rows.length < 1) {
        utils.messageBox('alert', this.$t('MSG_ALT_DEL_NO_DATA')) // 삭제할 데이터를 선택하세요.
        return
      }
      // 삭제 하시겠습니까?
      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
        const queryParams = rows
        http.request(this.$options.name, 'DTS_AAD_00002', {
          data: queryParams,
        }).then(() => {
          utils.messageBox('alert', this.$t('MSG_ALT_DELETED')) // 삭제 되었습니다.
          this.onClickSearchBtn() // 재검색
        }).catch(error => {
          console.log(error)
        })
      })
    },
    // 신규 등록
    onClickRegist() {
      const params = {
        parkKindCd: this.search.parkKindCd,
        visitStatusCd: this.search.visitStatusCd,
        langKindCd: this.search.langKindCd,
        exposrYn: this.search.exposrYn,
        exposrDescrt: this.search.exposrDescrt,
        exposrPriod: this.search.exposrPriod,
        rowsPerPage: this.search.rowsPerPage,
      }
      utils.goPage('PGE_AAB_00038', { params })
    },
    onChangePageSize(pageSize) {
      this.search.rowsPerPage = pageSize
    },
  },
}
</script>
