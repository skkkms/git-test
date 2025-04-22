<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 개인티켓 오류등록 현황 탭-->
      <div class="comm_title_wrap mt20">
        <h4>
          {{ $t('MSG_TXT_INSERT_INFO') }}
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_FST_RGST_DT')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          {{ tryDate }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_MEMBER_UID')"
          label-align="right"
          class="flex_wrap"
          style="width: 50%; height: auto;"
        >
          {{ memshpUid }}
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_BLOCK_YN')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          {{ blockYn }}
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 개인티켓 오류등록 현황 탭-->

      <ur-data-grid
        ref="grid"
        class="mt45"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :data-set-options="{id: 'id'}"
        :item-size="listSize"
        @grid:paging="pagingChange"
      >
        <template #left-info>
          <div class="comm_title_wrap mb0">
            <h4>
              {{ $t('MSG_TIT_DETAIL') }}
            </h4>
          </div>
        </template>
      </ur-data-grid>

      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button @click="onClickList">
              {{ $t('MSG_BTN_LIST') }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAC_00008', // eslint-disable-line vue/name-property-casing
  data() {
    return {
      // 테이블
      opts: { // 토탈o
        height: 540,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },
      page: 1,
      rowsPerPage: 10,
      listSize: 0,
      list: new this.$ur.grid.DataSet(),
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    columns() {
      return [
        {
          text: 'No.',
          value: 'rowNum',
          align: 'center',
          width: 100,
        },
        {
          text: this.$t('MSG_TXT_FST_RGST_DT'),
          value: 'tryDate',

        },
        {
          text: this.$t('MSG_TXT_QR_CODE'),
          value: 'qrCd',

        },
        {
          text: this.$t('MSG_TXT_SUCCESS_YN'),
          value: 'rgstYn',
        },
      ]
    },
  },
  created() {
    const params = utils.getParameter(this, 'params')
    if (utils.isEmpty(params.tryDate)
     || utils.isEmpty(params.memshpUid)
     || utils.isEmpty(params.blockYn)) {
      this.onClickList()
    } else {
      this.tryDate = params.tryDate
      this.memshpUid = params.memshpUid
      this.blockYn = params.blockYn
      this.search()
    }
  },
  methods: {
    // 검색
    search() {
      const param = {
        page: this.page,
        rowsPerPage: this.rowsPerPage,
        tryDate: this.tryDate,
        memshpUid: this.memshpUid,
      }

      http.request(this.$options.name, 'DTS_AAF_00003', {
        query: param,
      }).then(res => {
        this.list.setData(res.data.list)
        this.listSize = res.data.totalCount
      }).catch(error => {
        console.log(error)
      })
    },
    pagingChange(paging) {
      if (this.page !== paging.currentPage) {
        this.page = paging.currentPage
        this.rowsPerPage = paging.rowsPerPage
        this.search()
      }
    },
    onClickList() {
      utils.goPage('PGE_AAC_00007', this.$route.params)
    },
  },
}
</script>
