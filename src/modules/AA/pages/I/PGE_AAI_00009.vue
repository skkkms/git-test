<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <!-- 요청시간 -->
        <ur-form-item
          :label="$t('MSG_TXT_REQ_DT')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
          required
        >
          <ur-range-picker
            v-model="searchParams.crtDate"
            input-type="YYYY-MM-DD"
            model-type="YYYYMMDD"
            :confirm-label="$t('MSG_BTN_SELT')"
          />
        </ur-form-item>
        <!-- 인터페이스 URL -->
        <ur-form-item
          :label="$t('MSG_TXT_INTF_URL')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="searchParams.ifUrlDesc"
            style="width: 100%;"
            maxlength="150"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>

        <!-- 요청시스템 -->
        <ur-form-item
          :label="$t('MSG_TXT_REQ_SYSTEM')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="searchParams.requOrgCd"
            :items="codes.COD_DSS_SYSTEM_LIST"
            no-select="no-select"
            :msg-no-select="$t('MSG_TIT_TOT')"
          />
        </ur-form-item>
        <!-- 응답시스템 -->
        <ur-form-item
          :label="$t('MSG_TXT_RES_SYSTEM')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="searchParams.respnsOrgCd"
            :items="codes.COD_DSS_SYSTEM_LIST"
            no-select="no-select"
            :msg-no-select="$t('MSG_TIT_TOT')"
          />
        </ur-form-item>

        <!-- 처리결과 -->
        <ur-form-item
          :label="$t('MSG_TXT_RESULT')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="searchParams.respnsStatusCd"
            :items="codes.COD_KONG_INTF_RESPNS_CD"
            no-select="no-select"
            :msg-no-select="$t('MSG_TIT_TOT')"
          />
        </ur-form-item>

        <!-- 트렌젝션ID -->
        <ur-form-item
          :label="$t('MSG_TXT_TRANSACTION_ID')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="searchParams.transactionId"
            style="width: 100%;"
            maxlength="150"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
      </ur-form-box>

      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="onClickReset">
            {{ $t('MSG_BTN_INTL' ) }} <!-- 초기화 -->
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
        class="custom_grid_type1 mt35"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :data-set-options="{id: 'id'}"
        :item-size="listSize"
        @grid:paging="onPaging"
      />
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_AAI_00009', // eslint-disable-line vue/name-property-casing
  data() {
    return {
      CODE_KEYS: ['COD_DSS_SYSTEM_LIST', 'COD_KONG_INTF_RESPNS_CD'],
      codes: {
        COD_DSS_SYSTEM_LIST: [],
        COD_KONG_INTF_RESPNS_CD: [],
      },
      listSize: 0,
      list: new this.$ur.grid.DataSet(),
      page: 1,
      searchParams: {
        crtDate: [moment().format('YYYYMMDD'), moment().format('YYYYMMDD')],
        ifUrlDesc: '',
        requOrgCd: '',
        respnsOrgCd: '',
        respnsStatusCd: '',
        transactionId: '',
        rowsPerPage: 10,
      },
      initSearchParam: {
        crtDate: [moment().format('YYYYMMDD'), moment().format('YYYYMMDD')],
        ifUrlDesc: '',
        requOrgCd: '',
        respnsOrgCd: '',
        respnsStatusCd: '',
        transactionId: '',
        rowsPerPage: 10,
      },
      // 테이블
      opts: { // 토탈o
        height: 520,
        pagination: true,
        noInfo: false,
        selectCheckOnly: true,
        defaultPageSize: 10,
        resizableColumn: true,
        msgEmptyData: this.$t('MSG_TXT_NO_DATA_FOUND'), // 데이터가 없습니다.
      },
    }
  },
  computed: {
    columns() {
      const openTextAreaPopup = (title, value) => {
        if (!utils.isEmpty(value)) {
          let parsedValue = null
          try {
            parsedValue = JSON.stringify(JSON.parse(value), null, 4)
          } catch (e) {
            parsedValue = value
          }

          utils.openTextAreaEditor(null, {
            title,
            size: 'lg',
            pageInitialData: {
              value: parsedValue,
              maxlength: 4000,
              readonly: true,
              positiveButtonText: this.$t('MSG_BTN_CLOSE'),
            },
          })
        }
      }
      const columns = [
        {
          text: this.$t('MSG_TXT_REQ_DT'), // 요청시간
          width: 150,
          minWidth: 150,
          customValue: (v, r) => {
            const date = moment(r.crtDate + r.requTime, 'YYYYMMDDHHmmss', true)
            return date.isValid() ? date.format('YYYY-MM-DD HH:mm:ss') : '-'
          },
        },
        {
          text: this.$t('MSG_TXT_RES_DT'), // 응답시간
          width: 150,
          minWidth: 150,
          customValue: (v, r) => {
            const date = moment(r.crtDate + r.respnsTime, 'YYYYMMDDHHmmss', true)
            return date.isValid() ? date.format('YYYY-MM-DD HH:mm:ss') : '-'
          },
        },
        {
          text: this.$t('MSG_TXT_REQ_SYSTEM'), // 요청시스템
          value: 'requOrgCd',
          type: 'code',
          domain: this.codes.COD_DSS_SYSTEM_LIST,
          width: 100,
          minWidth: 100,
        },
        {
          text: this.$t('MSG_TXT_RES_SYSTEM'), // 응답시스템
          value: 'respnsOrgCd',
          type: 'code',
          domain: this.codes.COD_DSS_SYSTEM_LIST,
          width: 100,
          minWidth: 100,
        },
        {
          text: this.$t('MSG_TXT_INTF_URL'), // 인터페이스 URL
          value: 'ifUrlDesc',
          width: 400,
        },
        {
          text: this.$t('MSG_TXT_RES_CD'), // 응답상태코드
          value: 'respnsStatusCd',
          width: 100,
          minWidth: 100,
        },
        {
          text: this.$t('MSG_TXT_RES_MSG'), // 응답메세지
          value: 'respnsMsgDesc',
          width: 250,
        },
        {
          text: this.$t('MSG_TXT_REQ_BODY'), // 요청전문내용
          value: 'requTlgrmDesc',
          width: 200,
          minWidth: 200,
          customStyle: () => ({ 'text-decoration': 'underline' }),
          click: v => openTextAreaPopup(this.$t('MSG_TXT_REQ_BODY'), v),
        },
        {
          text: this.$t('MSG_TXT_RES_BODY'), // 응답전문내용
          value: 'respnsTlgrmDesc',
          width: 200,
          minWidth: 200,
          customStyle: () => ({ 'text-decoration': 'underline' }),
          click: v => openTextAreaPopup(this.$t('MSG_TXT_RES_BODY'), v),
        },
        {
          text: this.$t('MSG_TXT_TRANSACTION_ID'), // 트랜잭션 ID
          value: 'transactionId',
          width: 250,
          minWidth: 250,
        },
      ]
      return columns
    },
  },
  created() {
    const params = utils.getParameter(this, 'params')
    if (params) {
      this.searchParams = params
    }
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
    this.selecKongIntfList()
  },
  methods: {
    getSearchParam() {
      const params = {
        crtStartDate: this.searchParams.crtDate[0],
        crtEndDate: this.searchParams.crtDate[1],
        ifUrlDesc: encodeURI(this.searchParams.ifUrlDesc),
        requOrgCd: this.searchParams.requOrgCd,
        respnsOrgCd: this.searchParams.respnsOrgCd,
        respnsStatusCd: this.searchParams.respnsStatusCd,
        transactionId: encodeURI(this.searchParams.transactionId),
        rowsPerPage: this.searchParams.rowsPerPage,
        offset: (this.page - 1) * this.searchParams.rowsPerPage,
      }
      return params
    },
    onClickReset() {
      this.searchParams = JSON.parse(JSON.stringify(this.initSearchParam))
    },
    onClickSearch() {
      this.$refs.grid.setScrollLeft(0)
      this.listSize = 0
      this.list = new this.$ur.grid.DataSet()
      this.selecKongIntfList()
    },
    selecKongIntfList() {
      const squery = this.getSearchParam()
      http.request(this.$options.name, 'DTS_AAI_00038', {
        query: squery,
      }).then(res => {
        if (res.data) {
          this.list.setData(res.data.list)
          this.listSize = res.data.cnt
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onPaging(pager) {
      this.page = pager.currentPage
      this.searchParams.rowsPerPage = pager.rowsPerPage
      this.selecKongIntfList()
    },
    onScrollBottom() {
      this.selecKongIntfList()
    },
  },
}
</script>
