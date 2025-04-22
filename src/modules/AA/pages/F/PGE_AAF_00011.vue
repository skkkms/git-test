<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_MEM_NUM')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="searchParams.memshpUid"
            style="width:100%; height:auto;"
            maxlength="10"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_IAM_ID')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="searchParams.usrId"
            style="width:100%; height:auto;"
            maxlength="16"
            @keyup.enter="onClickSearch"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
            @click="onReset"
          >
            {{ $t('MSG_BTN_RESET') }}
          </ur-button>
          <ur-button
            v-permission:read="$options.name"
            color="violet"
            @click="onClickSearch"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </ur-button>
        </div>
      </div>
      <ur-data-grid
        ref="grid"
        class="mt35"
        :headers="columns"
        :data-source="dataSet"
        :item-size="dataTotalCount"
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
  name: 'PGE_AAF_00011', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      CODE_KEYS: ['COD_IA_EXPORSR_TARGET'],
      codes: {
        COD_IA_EXPORSR_TARGET: [],
      },
      dataSet: new this.$ur.grid.DataSet(),
      dataSetRawData: [],
      dataSetChangedData: [],
      dataTotalCount: 0,
      paging: {
        currentPage: '1',
        rowsPerPage: '30',
      },
      searchParams: {
        memshpUid: '',
        usrId: '',
      },
      // 테이블
      opts: { // 토탈o
        noInfo: false,
        styleBordered: false,
        resizableColumn: true,
        headerHeight: 36,
        multiSelect: true,
        resizeFullWidth: false,
        height: 570,
        pagination: true,
        defaultPageSize: 30,
        selectCheckOnly: true,
      },
    }
  },
  computed: {
    columns() {
      return [
        {
          text: this.$t('MSG_TXT_MEM_NUM'), value: 'memshpUid', align: 'center',
        },
        {
          text: this.$t('MSG_TXT_IAM_ID'), value: 'usrId', align: 'center',
        },
        {
          text: this.$t('MSG_TXT_LOGIN_DTM'),
          value: 'loginDtm',
          align: 'center',
          customValue(v) {
            return utils.dateformatToClient(v)
          },
        },
        {
          text: this.$t('MSG_TXT_IAA_LOGIN_CHANNEL'), value: 'loginChnCd', align: 'center', type: 'code', domain: this.codes.COD_IA_EXPORSR_TARGET,
        },
        {
          text: this.$t('MSG_TXT_LOGIN_IP'), value: 'loginIp', align: 'center',
        },
      ]
    },
  },
  watch: {
  },
  created() {
  },
  mounted() {
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
  },
  methods: {
    pagingChange(paging) {
      this.paging = paging
      this.search()
    },
    onClickSearch() {
      this.$refs.grid.setCurrentPage(1)
    },
    search() {
      if (utils.isEmpty(this.searchParams.memshpUid) && utils.isEmpty(this.searchParams.usrId)) {
        utils.messageBox('warning', this.$t('MSG_TXT_IAA_USRID_OR_MEMBSHPUID_MANDATORY'))
        return
      }

      const query = Object.assign({}, this.searchParams, this.paging)

      http.request(this.$options.name, 'DTS_AAF_00023', {
        query,
      }).then(res => {
        this.dataTotalCount = res.data.totalCount
        this.dataSet.setData(res.data.list)
      })
    },
    onReset() {
      this.searchParams.memshpUid = ''
      this.searchParams.usrId = ''
    },
  },
}
</script>
<style scoped>
</style>
