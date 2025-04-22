<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- 이용권 현황 -->
      <ur-form-box toggleable>
        <!-- 회원 ID -->
        <ur-form-item
          :label="$t('MSG_TXT_ID_OR_MEMUID')"
          label-align="right"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="search.memshpUid"
            :placeholder="placeholderId"
            style="width:100%; height:auto;"
            maxlength="16"
            @enter="onClickSearchBtn()"
          />
        </ur-form-item>

        <!-- QR 코드 -->
        <ur-form-item
          :label="$t('MSG_TXT_QR_CODE')"
          label-align="right"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="search.qrCd"
            :placeholder="placeholderQr"
            style="width:100%; height:auto;"
            maxlength="30"
            @enter="onClickSearchBtn()"
          />
        </ur-form-item>

        <!-- 조회구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_VIEW_KIND')"
          label-align="right"
          style="width: 50%; height: auto;"
        >
          <ur-radio-wrapper
            v-model="search.viewKind"
            :items="codes.COD_IAA_TODAY_HISTORY_CLASS"
            sm
          />
        </ur-form-item>

        <!-- 이용일자 -->
        <ur-form-item
          :label="$t('MSG_TXT_HIST_CRT_DT')"
          label-align="right"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-range-picker
            v-model="search.salesDate"
            :disabled="search.viewKind=='000'"
            :confirm-label="$t('MSG_TXT_SELT')"
            input-type="YYYY-MM-DD"
            model-type="YYYYMMDD"
            :max-date="maxDate"
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
        class="mt35"
        :headers="columns"
        :data-source="dataList"
        :options="opts"
        :data-set-options="{id: 'id'}"
        :item-size="search.totalCount"
        @grid:paging="pagingChange"
      >
        <!-- 엑셀다운로드 -->
        <template #right-info>
          <ur-button @click="onExcelDnLoad()">
            <ur-icon
              icon="download"
              icon-type="line"
              size="small"
              spacing
            />
            {{ $t('MSG_TXT_EXCEL_DOWNLOAD') }}
          </ur-button>
        </template>
        <template #header>
          <ur-data-grid-header-row>
            <ur-data-grid-header-cell rowspan="2" />  <!--No.-->
            <ur-data-grid-header-cell rowspan="2" />  <!--이용일자-->
            <ur-data-grid-header-cell rowspan="2" />  <!--개인티켓ID-->
            <ur-data-grid-header-cell rowspan="2" />  <!--파크구분-->
            <ur-data-grid-header-cell rowspan="2" />  <!--QR코드-->
            <ur-data-grid-header-cell rowspan="2" />  <!--회원ID-->
            <!-- 유효기간 -->
            <ur-data-grid-header-cell
              colspan="2"
              align="center"
              :text="$t('MSG_TXT_VALID_PERIOD')"
            />
            <!-- 사용정보 -->
            <ur-data-grid-header-cell
              colspan="4"
              align="center"
              :text="$t('MSG_TXT_USE_INFO')"
            />
            <ur-data-grid-header-cell rowspan="2" />  <!--판매금액-->
            <ur-data-grid-header-cell rowspan="2" />  <!--티켓EP여부-->
            <!-- 연간회원정보 -->
            <ur-data-grid-header-cell
              colspan="2"
              align="center"
              :text="$t('MSG_TXT_ANNUL_USE_INFO')"
            />
            <!-- 입장정보 -->
            <ur-data-grid-header-cell
              colspan="3"
              align="center"
              :text="$t('MSG_TXT_ENTR_INFO')"
            />
            <!-- 퇴장정보 -->
            <ur-data-grid-header-cell
              colspan="3"
              align="center"
              :text="$t('MSG_TXT_LEAVE_INFO')"
            />
            <ur-data-grid-header-cell rowspan="2" />  <!--푸시전송일자-->
            <ur-data-grid-header-cell rowspan="2" />  <!--이관가능여부-->
            <ur-data-grid-header-cell rowspan="2" />  <!--등록일시-->
            <ur-data-grid-header-cell rowspan="2" />  <!--등록자-->
            <ur-data-grid-header-cell rowspan="2" />  <!--수정일시-->
            <ur-data-grid-header-cell rowspan="2" />  <!--수정자-->
          </ur-data-grid-header-row>
          <ur-data-grid-header-row>
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell />
            <ur-data-grid-header-cell :expand-resizer="2" />
          </ur-data-grid-header-row>
        </template>
      </ur-data-grid>

      <P01
        ref="popup"
        :codes="this.codes"
        :page-id="this.$options.name"
        @onExcelDnLoadReason="this.onExcelDnLoadReason"
      />

      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="right_box">
          <ur-button
            v-permission:delete="this.$options.name"
            @click="onClickDelete()"
          >
            {{ $t("MSG_BTN_DEL") }} <!-- 삭제 -->
          </ur-button>
          <ur-button
            v-permission:update="this.$options.name"
            @click="onClickUpdate()"
          >
            {{ $t("MSG_BTN_SAVE") }} <!-- 저장 -->
          </ur-button>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

import CommonUtils from '@/modules/AA/js/common-utils'
import P01 from './components/PGE_AAF_00009_P01.vue'

export default {
  name: 'PGE_AAF_00009', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
  },
  data() {
    return {
      // 공통코드
      codeKeyList: [
        'COD_IAA_TODAY_HISTORY_CLASS',
        'COD_AM_AGE_KIND_CD',
        'COD_IA_ENTER_TIME',
        'COD_IA_EXPOSR_YN',
        'COD_POPS_P038',
      ],
      codes: {
        COD_IAA_TODAY_HISTORY_CLASS: [],
        COD_AM_AGE_KIND_CD: [],
        COD_IA_ENTER_TIME: [],
        COD_IA_EXPOSR_YN: [],
        COD_POPS_P038: [],
      },

      // 검색조건
      search: {
        memshpUid: '',
        qrCd: '',
        viewKind: '000',
        salesDate: [utils.toStringByFormat(utils.addDay(utils.now('YYYY-MM-DD'), -7), 'YYYYMMDD'), utils.toStringByFormat(utils.addDay(utils.now('YYYY-MM-DD'), -1), 'YYYYMMDD')],
        totalCount: 0,
        rowsPerPage: 30,
        page: 1,
      },

      maxDate: utils.dateformatToClient(utils.addDay(utils.now('YYYY-MM-DD'), -1), 'S'),

      placeholderId: utils.strFormat(this.$t('MSG_ALT_CHK_INPUT'), this.$t('MSG_TXT_ID_OR_MEMUID')), // {회원 ID}(을)를 입력해 주세요
      placeholderQr: utils.strFormat(this.$t('MSG_ALT_CHK_INPUT'), this.$t('MSG_TXT_QR_CODE')), // {QR 코드}(을)를 입력해 주세요

      // 테이블
      opts: {
        height: 400,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
        selectCheckOnly: true,
        resizableColumn: true,
        defaultPageSize: 30,
      },
      dataList: new this.$ur.grid.DataSet(),
      dsExcel: new this.$ur.grid.DataSet(),

      searchViewParam: '',
    }
  },
  computed: {
    modal() {
      return this.$refs.popup
    },
    columns() {
      const that = this
      return [
        {
          text: 'No.', value: 'rnum', width: 100, align: 'center',
        },
        // 이용일자
        {
          text: this.$t('MSG_TXT_HIST_CRT_DT'), value: 'salesDate', width: 100, customValue(v, row) { return _.isEmpty(v) ? '-' : utils.toStringByFormat(row.salesDate, 'YYYY-MM-DD') },
        },
        // 개인티켓 ID
        {
          text: this.$t('MSG_TXT_PTICKET_ID'), value: 'pticketId', width: 170, customValue: v => v || '-',
        },
        // 파크구분
        {
          text: this.$t('MSG_TXT_PARK_KIND'), value: 'enterParkKind', width: 80, customValue: v => v || '-',
        },
        // QR 코드
        {
          text: this.$t('MSG_TXT_QR_CODE'),
          value: 'qrCd',
          width: 150,
          component: {
            props: ['row', 'value'],
            template: '<div><ur-button style="padding-left:0;" @click.stop="clickCheck(row)" shape="hyperlink">{{row.qrCd}}</ur-button></div>',
            methods: {
              clickCheck(row) {
                that.fnGridRowClick(row)
              },
            },
          },
          customValue: v => v || '-',
        },
        // 회원 ID
        {
          text: this.$t('MSG_TXT_MEMBER_UID'),
          value: 'memshpUid',
          width: 100,
          customValue: v => v || '-',
          click: v => prompt(this.$t('MSG_TXT_COPY_CLIPBOARD_WITH_CTRL_C'), v), // Ctrl+C를 눌러 클립보드로 복사하세요.
        },
        // 시작일자
        {
          text: this.$t('MSG_TXT_START_DATE_1'), value: 'validStartDate', width: 100, align: 'center', customValue(v, row) { return _.isEmpty(v) ? '-' : utils.toStringByFormat(row.validStartDate, 'YYYY-MM-DD') },
        },
        // 종료일자
        {
          text: this.$t('MSG_TXT_END_DATE_1'), value: 'validEndDate', width: 100, align: 'center', customValue(v, row) { return _.isEmpty(v) ? '-' : utils.toStringByFormat(row.validEndDate, 'YYYY-MM-DD') },
        },
        // 사용구분
        {
          text: this.$t('MSG_TXT_USE_KIND'), value: 'useKindCd', width: 120, align: 'center', type: 'code', domain: this.codes.COD_POPS_P038,
        },
        // 연속 사용일수
        {
          text: this.$t('MSG_TXT_CONTIU_USE_DCNT'), value: 'contiuUseDcnt', width: 120, align: 'center', customValue: v => v || '-',
        },
        // 연령구분
        {
          text: this.$t('MSG_TXT_AGE_KIND'), value: 'ageKindCd', width: 120, align: 'center', type: 'code', domain: this.codes.COD_AM_AGE_KIND_CD,
        },
        // 입장시간
        {
          text: this.$t('MSG_TXT_ENTR_TIME'), value: 'enterTimeCd', width: 120, align: 'center', type: 'code', domain: this.codes.COD_IA_ENTER_TIME,
        },
        // 판매금액
        {
          text: this.$t('MSG_TXT_SALE_AMT'), value: 'salesAmt', width: 130, customValue: v => (v ? utils.numberFormat(v) : '-'),
        },
        // 티켓EP여부
        {
          text: this.$t('MSG_TXT_TICKET_EP_YN'), value: 'ticketEpYn', width: 130, customValue: v => v || '-',
        },
        // 회원유무
        {
          text: this.$t('MSG_TXT_MEMBER_YN'), value: 'seasonMemberYn', width: 100, align: 'center', customValue: v => v || '-',
        },
        // 회원명
        {
          text: this.$t('MSG_TXT_MEMBER_NM'), value: 'seasonMemberName', width: 100, align: 'center', customValue: v => v || '-',
        },
        // 입장여부
        {
          text: this.$t('MSG_TXT_ENTR_YN'), value: 'enterYn', width: 120, align: 'center', customValue: v => v || '-',
        },
        // 입장일자
        {
          text: this.$t('MSG_TXT_ENTR_D'), value: 'enterDate', width: 120, align: 'center', customValue(v, row) { return _.isEmpty(v) ? '-' : utils.toStringByFormat(row.enterDate, 'YYYY-MM-DD') },
        },
        // 입장시간
        {
          text: this.$t('MSG_TXT_ENTR_T'), value: 'enterTime', width: 120, align: 'center', customValue(v) { return _.isEmpty(v) ? '-' : `${v.substr(0, 2)}:${v.substr(2, 2)}:${v.substr(4, 2)}` },
        },
        // 퇴장여부
        {
          text: this.$t('MSG_TXT_LEAVE_YN'),
          value: 'leaveYn',
          width: 120,
          align: 'center',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: `<div v-if="editable==true"><ur-dropdown ref="cateKindCd" v-model="row.leaveYn" :items="COD_IA_EXPOSR_YN" @input="isSelect" /></div>
                                    <div v-else>{{row.leaveYn}}</div>`,
            computed: {
              COD_IA_EXPOSR_YN() {
                return that.codes.COD_IA_EXPOSR_YN
              },
              editable() {
                return true
              },
            },
            methods: {
              isSelect(v) {
                that.dataList.setRowValue(this.row, 'leaveYn', v)
              },
            },
          },
        },
        // 퇴장일자
        {
          text: this.$t('MSG_TXT_LEAVE_D'), value: 'leaveDate', width: 120, align: 'center', customValue(v, row) { return _.isEmpty(v) ? '-' : utils.toStringByFormat(row.leaveDate, 'YYYY-MM-DD') },
        },
        // 퇴장시간
        {
          text: this.$t('MSG_TXT_LEAVE_T'), value: 'leaveTime', width: 120, align: 'center', customValue(v) { return _.isEmpty(v) ? '-' : `${v.substr(0, 2)}:${v.substr(2, 2)}:${v.substr(4, 2)}` },
        },
        // 푸시전송일자
        {
          text: this.$t('MSG_TXT_PUSH_DATE'), value: 'pushSndgDtm', width: 150, customValue(v, row) { return _.isEmpty(v) ? '-' : utils.toStringByFormat(row.pushSndgDtm, 'YYYY-MM-DD') },
        },
        // 이관 가능 여부
        {
          text: this.$t('MSG_TXT_TRANS_YN'), value: 'transAvailYn', width: 150, customValue: v => v || '-',
        },
        {
          text: this.$t('MSG_TXT_RGST_DTM'),
          value: 'firstRegistrationDTM',
          width: 150,
          customValue(value) {
            return utils.dateformatToClient(value)
          },
        },
        {
          text: this.$t('MSG_TXT_RGST_USR'), value: 'firstRegistrationUserId', width: 150, customValue: v => v || '-',
          click: v => prompt(this.$t('MSG_TXT_COPY_CLIPBOARD_WITH_CTRL_C'), v), // Ctrl+C를 눌러 클립보드로 복사하세요.
        },
        {
          text: this.$t('MSG_TXT_MDFC_DTM'),
          value: 'finalModificationDTM',
          width: 150,
          customValue(value) {
            return utils.dateformatToClient(value)
          },
        },
        {
          text: this.$t('MSG_TXT_MDFC_USR'), value: 'finalModificationUserId', width: 150, customValue: v => v || '-',
          click: v => prompt(this.$t('MSG_TXT_COPY_CLIPBOARD_WITH_CTRL_C'), v), // Ctrl+C를 눌러 클립보드로 복사하세요.
        },
      ]
    },
  },
  watch: {
  },
  created() {
    // 공통코드 셋팅 및 초기화
    http.mergeCodeList(this.$options.name, this.codeKeyList, this.codes).then(() => {
    }).catch(() => {})
  },
  methods: {
    // 페이징처리
    pagingChange(paging) {
      this.search.rowsPerPage = paging.rowsPerPage
      this.search.page = paging.currentPage
      this.onSearch()
    },

    // 초기화
    onClickReset() {
      this.search.memshpUid = ''
      this.search.qrCd = ''
      this.search.viewKind = '000'
      const dToday = utils.now('YYYY-MM-DD')
      this.search.salesDate = [utils.toStringByFormat(utils.addDay(dToday, -7), 'YYYYMMDD'), utils.toStringByFormat(utils.addDay(dToday, -1), 'YYYYMMDD')]
    },

    // 검색버튼
    onClickSearchBtn() {
      if (!this.checkSearchValidataion()) { return }

      this.$refs.grid.setScrollLeft(0)
      this.dataList = new this.$ur.grid.DataSet()
      this.onSearch()
    },

    // 검색조건 유효성검사
    checkSearchValidataion() {
      if (_.isEmpty(this.search.memshpUid) && _.isEmpty(this.search.qrCd)) {
        const msg = utils.strFormat(this.$t('MSG_ALT_ONE_MORE_SEARCH_COND'), this.$t('MSG_TXT_ID_OR_MEMUID'), this.$t('MSG_TXT_QR_CODE')) // 한개 이상의 검색조건을 입력하세요.[{0},{1}]
        utils.messageBox('alert', null, msg)
        return false
      }

      if (this.search.viewKind === '001' && (_.isEmpty(this.search.salesDate[0]) || _.isEmpty(this.search.salesDate[1]))) {
        const msg = utils.strFormat(this.$t('MSG_ALT_CHK_SELECT'), this.$t('MSG_TXT_HIST_CRT_DT')) // {이용일자} 을(를) 선택하세요.
        utils.messageBox('alert', null, msg)
        return false
      }
      if (this.search.viewKind === '001' && !_.isEmpty(this.search.salesDate[0]) && !_.isEmpty(this.search.salesDate[1])) {
        if (utils.getDayOffset(this.search.salesDate[0], this.search.salesDate[1]) < -7) {
          const msg = utils.strFormat(this.$t('MSG_ALT_SEARCH_UNDER_DY'), 7) // 조회기간은 최대 {7}일 입니다.
          utils.messageBox('alert', null, msg)
          return false
        }
      }

      return true
    },

    // 검색조건
    getParam() {
      let salesStartDate = ''
      let salesEndDate = ''
      // 당일이 아닌 경우 이력일자 셋팅
      if (this.search.viewKind !== '000') {
        if (this.search.salesDate.length > 0) {
          salesStartDate = this.search.salesDate[0] // eslint-disable-line prefer-destructuring
          salesEndDate = this.search.salesDate[1] // eslint-disable-line prefer-destructuring
        }
      }
      // 검색조건
      const queryParams = {
        memshpUid: encodeURI(this.search.memshpUid),
        qrCd: encodeURI(this.search.qrCd),
        viewKind: this.search.viewKind,
        salesStartDate: salesStartDate, // eslint-disable-line object-shorthand
        salesEndDate: salesEndDate, // eslint-disable-line object-shorthand
        currentPage: this.search.page,
        rowsPerPage: this.$refs.grid.mx_pager.rowsPerPage, // 가지고 올 데이터 수
      }
      return queryParams
    },
    // 검색
    onSearch() {
      http.request(this.$options.name, 'DTS_AAF_00007', {
        query: this.getParam(),
      }).then(res => {
        this.search.totalCount = res.data.totalCount
        this.dataList.setData(res.data.list)
      })
      this.searchViewParam = this.getParam().viewKind
    },
    // 상세조회
    fnGridRowClick(row) {
      const params = {
        ...this.search,
        qrCd: row.qrCd,
      }
      utils.goPage('PGE_AAF_00010', { params })
    },
    // 삭제
    onClickDelete() {
      const rows = this.$refs.grid.getSelected()
      if (rows.length < 1) {
        utils.messageBox('alert', this.$t('MSG_ALT_DEL_NO_DATA')) // 삭제할 데이터를 선택하세요.
        return
      }
      if (this.searchViewParam !== '000') {
        utils.messageBox('alert', this.$t('MSG_TXT_IAA_CANT_DELETE_HISTORY')) // 이력은 삭제할 수 없습니다.
        return
      }

      let msg = ''
      if (rows.twoParkYn === 'Y') {
        // 2Park 티켓인 경우 {0} 티켓 등록을 삭제하면
        // {1} 티켓 등록분도 같이 삭제됩니다.
        const parentParkKind = rows.enterParkKind
        const childParkKind = this.getChildParkKind(parentParkKind)
        msg = `${utils.strFormat(this.$t('MSG_TXT_TWO_PARK_DELETE_WARNING'), parentParkKind, childParkKind)}\n`
      }
      msg += this.$t('MSG_ALT_DO_DELETE')

      // 삭제 하시겠습니까?
      utils.messageBox('confirm', msg, null, () => {
        const queryParams = [rows]
        http.request(this.$options.name, 'DTS_AAF_00019', {
          data: queryParams,
        }).then(() => {
          utils.messageBox('alert', this.$t('MSG_ALT_DELETED')) // 삭제 되었습니다.
          this.onClickSearchBtn() // 재검색
        }).catch(error => {
          console.log(error)
        })
      })
    },
    // 수정
    onClickUpdate() {
      const rows = this.dataList.getChanged().updated
      if (rows.length === 0) {
        utils.messageBox('alert', this.$t('MSG_ALT_SAV_NO_DATA')) // 저장할 데이터가 없습니다.
        return
      }

      // 수정 하시겠습니까?
      utils.messageBox('confirm', this.$t('MSG_ALT_MDFC'), null, () => {
        const queryParams = rows
        http.request(this.$options.name, 'DTS_AAF_00022', {
          data: queryParams,
        }).then(() => {
          utils.messageBox('alert', this.$t('MSG_ALT_SAVE_DATA')) // 수정 되었습니다.
          this.onClickSearchBtn() // 재검색
        }).catch(error => {
          console.log(error)
        })
      })
    },
    // 엑셀다운로드
    onExcelDnLoad() {
      if (!this.checkSearchValidataion()) { return }
      this.modal.open()
    },
    onExcelDnLoadReason(reason) {
      const excelParams = this.getParam()
      excelParams.excelYn = 'Y'
      excelParams.downRsn = reason

      http.request(this.$options.name, 'DTS_AAF_00007', {
        query: excelParams,
      }).then(res => {
        const list = CommonUtils.mapCode(res.data.list, this.columns)
        this.dsExcel.setData(list) // 데이터 셋에 데이터를 넣는 함수

        const metaObj = {
          headerFontSize: 11,
          headerFontColor: 1,
          headerForegroundColor: 22,
          defaultFontSize: 10,
        }

        const sToday = utils.now('YYYYMMDDHHmmss')
        const meta = this.$store.getters.getPageMeta(this.$options.name)
        const pageTitle = utils.startsWith(meta.pageInfo.pageTitleMessageResourceId, 'MSG_', 0) ? this.$t(meta.pageInfo.pageTitleMessageResourceId) : meta.pageInfo.pageTitleMessageResourceId
        const sExcelName = `${pageTitle}_${sToday}.xlsx`
        utils.downloadGridToExcel(
          this.$options.name,
          this.columns,
          this.dsExcel,
          sExcelName, metaObj,
        )
      }).catch(error => {
        console.log(error)
      })
    },

    getChildParkKind(parentParkKind) {
      let childParkKind = 'XX'
      if (parentParkKind === 'EL') childParkKind = 'CB'
      if (parentParkKind === 'CB') childParkKind = 'EL'
      return childParkKind
    },
  },
}
</script>
<style scoped>
</style>
