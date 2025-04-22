<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <!-- 스케줄명 -->
        <ur-form-item
          :label="$t('MSG_TXT_IA_SCHEDULE_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="searchParams.scheduleName"
            style="width: 100%;"
            maxlength="150"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
        <!-- 설명 -->
        <ur-form-item
          :label="$t('MSG_TXT_DTST_COL_CNTN')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            v-model="searchParams.descrtValue"
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
        class="custom_grid_pgeNav_None mt35"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :data-set-options="{id: 'id'}"
        :item-size="listSize"
        @grid:paging="onPaging"
        @grid:scroll-bottom="onScrollBottom"
      />
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
            @click="onClickDelete"
          >
            {{ $t('MSG_TXT_DEL') }} <!-- 삭제 -->
          </ur-button>
          <ur-button
            color="violet"
            @click="onClickNewBatch"
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
  name: 'PGE_AAI_00001', // eslint-disable-line vue/name-property-casing
  components: {
  },
  filters: {
    dateFormat(date) {
      if (!date) return ''
      alert(date)
      return utils.dateformatToClient(date)
    },
  }, // eslint-disable-line vue/name-property-casing
  data() {
    return {
      listSize: 0,
      list: new this.$ur.grid.DataSet(),
      searchParams: {
        scheduleName: '',
        descrtValue: '',
        offset: 0,
        rowsPerPage: 10,
      },
      initSearchParam: {
        scheduleName: '',
        descrtValue: '',
        offset: 0,
        rowsPerPage: 10,
      },
      // 테이블
      opts: { // 토탈o
        height: 520,
        infinityScroll: true,
        pagination: true,
        noInfo: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        defaultPageSize: 10,
        resizableColumn: true,
      },
    }
  },
  computed: {
    columns() {
      const that = this
      const columns = [
        {
          text: this.$t('MSG_TXT_IA_SCHEDULE_NAME'), // 스케줄명
          width: 300,
          value: 'scheduleName',
          customStyle: () => ({ 'text-decoration': 'underline' }),
          click: (value, row) => {
            that.onClickScheduleName(row)
          },
        },
        { text: this.$t('MSG_TXT_IAA_CRON_EXP'), value: 'cronExpressionValue', width: 100 }, // Cron Exp
        { text: this.$t('MSG_TXT_USE_YN'), value: 'useYn', width: 100 }, // 사용 여부
        { text: this.$t('MSG_TXT_DTST_COL_CNTN'), value: 'descrtValue' }, // 설명
        {
          text: this.$t('MSG_TXT_FST_RGST_DTM'), // 등록일시
          width: 150,
          customValue: (v, r) => moment(r.fstRgstDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss'),
        },
        { text: this.$t('MSG_TXT_FST_RGST_USR'), value: 'fstRgstUsrId', width: 100 }, // 등록자
        {
          text: this.$t('MSG_TXT_MDFC_DTM'), // 수정일시
          width: 150,
          customValue: (v, r) => moment(r.fnlMdfcDtm, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss'),
        },
        { text: this.$t('MSG_TIT_MDFC_USR'), value: 'fnlMdfcUsrId', width: 100 }, // 수정자
      ]
      return columns
    },
  },
  created() {
    const params = utils.getParameter(this, 'params')
    if (params) {
      this.searchParams = params
    }
    this.selectBatchList()
  },
  methods: {
    getSearchParam() {
      const params = {
        scheduleName: encodeURI(this.searchParams.scheduleName),
        descrtValue: encodeURI(this.searchParams.descrtValue),
        rowsPerPage: this.searchParams.rowsPerPage,
        offset: this.list.totalSize,
      }
      return params
    },
    onClickReset() {
      this.searchParams = JSON.parse(JSON.stringify(this.initSearchParam))
    },
    onClickSearch() {
      this.listSize = 0
      this.list = new this.$ur.grid.DataSet()
      this.selectBatchList()
    },
    selectBatchList() {
      const squery = this.getSearchParam()
      http.request(this.$options.name, 'DTS_AAI_00025', {
        query: squery,
      }).then(res => {
        if (res.data) {
          this.list.appendData(res.data.list)
          this.listSize = res.data.count
        }
      }).catch(error => {
        console.log(error)
      })
    },
    onClickDelete() {
      const rows = this.$refs.grid.getSelected()
      if (!rows || rows.length < 1) {
        utils.messageBox('alert', this.$t('MSG_ALT_DEL_NO_DATA')) // 삭제할 데이터를 선택하세요.
        return
      }
      const pathData = []
      _.forEach(rows, row => {
        pathData.push(row.batchCd)
      })

      // 삭제 하시겠습니까?
      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
        http.request(this.$options.name, 'DTS_AAI_00029', {
          path: {
            'batch-cd': pathData.join(','),
          },
        }).then(res => {
          if (res.data) {
            utils.messageBox('alert', this.$t('MSG_ALT_DELETED')) // 삭제 되었습니다.
            this.onClickSearch()
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    onClickNewBatch() {
      const params = {
        ...this.searchParams,
      }
      utils.goPage('PGE_AAI_00002', { params })
    },
    onClickScheduleName(row) {
      const params = {
        ...this.searchParams,
        batchCd: row.batchCd,
      }
      utils.goPage('PGE_AAI_00002', { params })
    },
    onPaging(pager) {
      this.searchParams.rowsPerPage = pager.rowsPerPage
    },
    onScrollBottom() {
      const totalSize = this.listSize
      const currentSize = this.list.totalSize
      if (totalSize > currentSize) {
        this.selectBatchList()
      }
    },
  },
}
</script>
<style scoped>
</style>
