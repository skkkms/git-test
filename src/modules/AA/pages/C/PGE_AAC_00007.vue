<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 개인티켓 오류등록 현황 탭-->
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_FST_RGST_DT')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-picker
            v-model="fstRgstDtm"
            :confirm-label="$t('MSG_TXT_SEL')"
            style="height: auto;"
            :max-date="maxTryDate"
            :today-label="$t('MSG_BTN_TODAY')"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_BLOCK_YN')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="blockYn"
            :items="codes.COD_IA_BLOCK_YN"
            no-select="no-select"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_MEMBER_UID')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="memshpUid"
            style="width:100%; height:auto;"
            maxlength="10"
            :placeholder="$t('MSG_TXT_MEMBER_UID_INPUT')"
            @keyup.enter="searchBtn"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_HOMEPAGE_ID')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="usrId"
            style="width:100%; height:auto;"
            maxlength="50"
            :placeholder="$t('MSG_TXT_HOMEPAGE_ID_INPUT')"
            @keyup.enter="searchBtn"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="init">
            {{ $t('MSG_BTN_INTL') }}
          </ur-button>
          <ur-button
            color="violet"
            @click="searchBtn"
          >
            {{ $t('MSG_BTN_SEARCH') }}
          </ur-button>
        </div>
      </div>
      <!-- E :: 개인티켓 오류등록 현황 탭-->

      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None mt45"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :data-set-options="{id: 'id'}"
        :item-size="totalCount"
        @grid:scroll-bottom="scrollBottom"
      >
        <template #right-info>
          <ur-button @click="excelDownload">
            <ur-icon
              icon="download"
              icon-type="line"
              size="small"
              spacing
            />
            {{ $t('MSG_BTN_EXCEL_DOWNLOAD') }}
          </ur-button>
        </template>
      </ur-data-grid>
      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="right_box">
            <ur-button
              color="violet"
              @click="save"
            >
              {{ $t('MSG_BTN_SAVE') }}
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import CommonUtils from '@/modules/AA/js/common-utils'
export default {
  name: 'PGE_AAC_00007', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      codeKeys: ['COD_IA_BLOCK_YN'],
      codes: { COD_IA_BLOCK_YN: [] },

      // 등록일자 date-picker
      fstRgstDtm: utils.now('YYYY-MM-DD'),
      blockYn: '',

      // 테이블
      opts: { // 토탈o
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: true,
        selectCheckOnly: true,
        resizableColumn: true,
        defaultPageSize: 30,
      },

      list: new this.$ur.grid.DataSet(),
      dsExcel: new this.$ur.grid.DataSet(),
      memshpUid: '',
      usrId: '',
      currRows: 0,
      totalCount: 0,
      rowsPerPage: 30,
      maxTryDate: '',
      searchParams: {},
    }
  },
  computed: {

    // 계산된 속성, date pickproperty로 사용가능
    columns() {
      const that = this
      return [
        {
          text: 'No.',
          value: 'rowNum',
          width: 100,
          align: 'center',
        },
        {
          text: this.$t('MSG_TXT_FST_RGST_DT'),
          value: 'fstRgstDtm',
          minwidth: 150,
        },
        {
          text: this.$t('MSG_TXT_MEMBER_UID'),
          value: 'memshpUid',
          minwidth: 200,
          component: {
            props: ['row', 'value'],
            template: '<div><ur-button style="padding-left:0;" shape="hyperlink" @click="view(row.tryDate, row.memshpUid, row.blockYn)">{{row.memshpUid}}</ur-button></div>',
            methods: {
              view(tryDate, memshpUid, blockYn) {
                const params = { tryDate, memshpUid, blockYn }
                params[`${that.$options.name}`] = that.searchParams // 검색조건
                utils.goPage('PGE_AAC_00008', { params })
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_HOMEPAGE_ID'),
          value: 'usrId',
          minwidth: 200,
        },
        {
          text: this.$t('MSG_TXT_FAIL_CNT'),
          value: 'failCnt',
          minwidth: 150,
        },
        {
          required: true,
          text: this.$t('MSG_TXT_BLOCK_YN'),
          value: 'blockYn',
          component: {
            props: ['row', 'value', 'text', 'me'], // provided by grid
            template: `<div>
              <ur-radio sm v-model="value" value="N" @input="onInput">N</ur-radio>
              <ur-radio sm v-model="value" value="Y" @input="onInput">Y</ur-radio>
            </div>`,
            methods: {
              onInput(v) {
                that.list.setRowValue(this.row, 'blockYn', v)
              },
            },
          },
          minwidth: 10,
        },
        {
          text: this.$t('MSG_TXT_LAST_UPDATE_DATE'),
          value: 'fnlMdfcDtm',
          minwidth: 120,
          type: 'date',
          customValue(value) { return utils.dateformatToClient(value) },
        },
      ]
    },

  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    const searchParams = utils.getParameter(this, 'params')[`${this.$options.name}`]
    if (!utils.isEmpty(searchParams)) {
      this.fstRgstDtm = searchParams.fstRgstDtm
      this.blockYn = searchParams.blockYn
      this.memshpUid = searchParams.memshpUid
      this.usrId = searchParams.usrId
    }
    this.maxTryDate = utils.now('YYYY-MM-DD')
    http.mergeCodeList(this.$options.name, this.codeKeys, this.codes)
  },
  mounted() {
    this.search()
  },
  methods: {
    checkDate() {
      if (this.dateFormat(new Date()) < this.fstRgstDtm.replaceAll('-', '')) {
        utils.messageBox('alert', this.$t('MSG_ALT_DATE_CHECK'))
        this.fstRgstDtm = ''
      }
    },

    dateFormat(date) {
      let month = date.getMonth() + 1
      let day = date.getDate()

      month = month >= 10 ? month : `0${month}`
      day = day >= 10 ? day : `0${day}`

      return date.getFullYear() + month + day
    },

    init() {
      this.fstRgstDtm = utils.now('YYYY-MM-DD')
      this.blockYn = ''
      this.memshpUid = ''
      this.usrId = ''
    },

    searchBtn() {
      this.list = new this.$ur.grid.DataSet()
      this.currRows = 0
      this.totalCount = 0
      this.search()
    },

    // 검색
    search() {
      if (this.$refs.grid !== undefined) {
        this.rowsPerPage = this.$refs.grid.mx_pager.rowsPerPage
      }

      const param = {
        fstRgstDtm: this.fstRgstDtm,
        memshpUid: encodeURI(this.memshpUid),
        usrId: encodeURI(this.usrId),
        blockYn: this.blockYn,
        currRows: this.currRows, // 현재 가지고 온 데이터 수
        rowsPerPage: this.rowsPerPage, // 가지고 올 데이터 수
      }

      this.searchParams = param

      http.request(this.$options.name, 'DTS_AAF_00001', {
        query: param,
      }).then(res => {
        this.list.appendData(res.data.list)
        this.currRows = this.list.totalSize
        this.totalCount = res.data.totalCount
      }).catch(error => {
        console.log(error)
      })
    },

    scrollBottom() {
      if (this.currRows !== this.totalCount && this.currRows < this.totalCount) {
        this.search()
      }
    },

    save() {
      if (this.list.getChanged().updated.length < 1) {
        utils.messageBox('alert', this.$t('MSG_ALT_NOT_CHANGE'))
      }

      http.request(this.$options.name, 'DTS_AAF_00002', {
        data: this.list.getChanged().updated,
      }).then(() => {
        utils.messageBox('success', this.$t('MSG_ALT_SAVE_DATA'))
        this.searchBtn()
      }).catch(error => {
        console.log(error)
      })
    },

    excelDownload() {
      const param = {
        fstRgstDtm: this.fstRgstDtm,
        memshpUid: encodeURI(this.memshpUid),
        usrId: encodeURI(this.usrId),
        currRows: this.currRows, // 현재 가지고 온 데이터 수
        rowsPerPage: this.rowsPerPage, // 가지고 올 데이터 수
        excelYn: 'Y',
      }

      http.request(this.$options.name, 'DTS_AAF_00001', {
        query: param,
      }).then(res => {
        const list = CommonUtils.mapCode(res.data.list, this.columns)

        this.dsExcel.setData(list) // 데이터 셋에 데이터를 넣는 함수

        const metaObj = {
          headerFontSize: 11,
          headerFontColor: 1,
          headerForegroundColor: 22,
          defaultFontSize: 10,
        }

        const sPageId = this.$options.name
        const objGridColumns = this.columns
        const objGridDataset = this.dsExcel

        const sToday = utils.now('YYYYMMDDHHmmss')
        const meta = this.$store.getters.getPageMeta(this.$options.name)
        const pageTitle = utils.startsWith(meta.pageInfo.pageTitleMessageResourceId, 'MSG_', 0) ? this.$t(meta.pageInfo.pageTitleMessageResourceId) : meta.pageInfo.pageTitleMessageResourceId
        const sExcelName = `${pageTitle}_${sToday}.xlsx`

        utils.downloadGridToExcel(sPageId, objGridColumns, objGridDataset, sExcelName, metaObj)
      }).catch(error => {
        console.log(error)
      })
    },

  },
}
</script>
<style scoped>
</style>
