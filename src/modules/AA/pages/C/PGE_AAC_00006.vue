<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 운영실적 지표조회 탭-->
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_USE_DT')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-picker
            v-model="fstRgstDtm"
            :confirm-label="$t('MSG_TXT_SEL')"
            style="height: auto;"
            :max-date="maxEventStartDate"
            modelType="YYYYMMDD"
            inputType="YYYY-MM-DD"
            :today-label="$t('MSG_BTN_TODAY')"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
            v-permission:read="this.$options.name"
            @click="init"
          >
            {{ $t('MSG_BTN_INTL') }}
          </ur-button>
          <ur-button
            v-permission:read="this.$options.name"
            color="violet"
            @click="onClickSearchButton"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </ur-button>
        </div>
      </div>
      <!-- E :: 운영실적 지표조회 탭-->

      <ur-data-grid
        ref="grid"
        class="mt35"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :data-set-options="{id: 'id'}"
        @grid:paging="pagingChange"
      />
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAC_00006', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 이용일 date-picker
      fstRgstDtm: utils.now('YYYYMMDD'),
      yesterday: '',
      list: new this.$ur.grid.DataSet(),
      // 테이블
      opts: { // 토탈o
        height: 450,
        pagination: false,
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
        selectCheckOnly: true,
        resizableColumn: true,
      },

      maxEventStartDate: '',
      listSize: 0,
      page: 1,
      rowsPerPage: 30,

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    columns() {
      const that = this
      return [
        {
          text: 'No.', value: 'rowNum', width: 100, align: 'center',
        },
        {
          text: this.$t('MSG_TXT_TITL'),
          value: 'title',
          minwidth: 500,
        },
        {
          text: `${this.$t('MSG_TXT_PAST_CNT')} (${that.yesterday})`,
          value: 'cnt',
          minwidth: 350,
        },
        {
          text: `${this.$t('MSG_TXT_NOW_CNT')} (${utils.toStringByFormat(that.fstRgstDtm, 'YYYY.MM.DD')})`,
          value: 'cnt2',
        },
      ]
    },

  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    this.maxEventStartDate = utils.now('YYYY-MM-DD');
  },
  mounted() {
    this.search();
  },
  methods: {
    init() {
      this.fstRgstDtm = utils.now('YYYYMMDD')
    },

    dateSetting() {
      this.yesterday = utils.toStringByFormat( utils.addDay(this.fstRgstDtm,-1), 'YYYY.MM.DD')
    },

    onClickSearchButton() {
      // this.page = 1;
      this.rowsPerPage = this.$refs.grid.mx_pager.rowsPerPage
      this.search()
    },

    getSearchParam() {
      const params = {
        page: this.page,
        rowsPerPage: this.$refs.grid.mx_pager.rowsPerPage,
      }
      return params
    },

    search() {
      const param = this.getSearchParam()
      param.page = this.page
      param.rowsPerPage = this.rowsPerPage
      param.fstRgstDtm = this.fstRgstDtm

      if (_.isEmpty(param.fstRgstDtm)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_USE_DT')))
        return
      }

      http.request(this.$options.name, 'DTS_AAF_00018', {
        query: param,
      }).then(res => {
        this.list.setData(res.data.list)
        // this.listSize = res.data.totalCount;
      }).catch(error => {
        console.log(error)
      })

      this.dateSetting()
    },

    pagingChange(paging) {
      if (this.page !== paging.currentPage) {
        this.page = paging.currentPage
        this.rowsPerPage = paging.rowsPerPage
        this.search()
      }
    },

  },
}
</script>
<style scoped>
</style>
