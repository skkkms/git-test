<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_PARK_KIND')"
          :label-align="'right'"
          style="width: 50%; height: auto; border: 0;"
        >
          <ur-dropdown
            v-model="parkKindCd"
            :items="parkKindCodes.COD_IAA_PARK_KIND"
            no-select
            :msg-no-select="$t('MSG_TXT_ALL')"
            @input="onInputParkKind"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_FACILT_CATE')"
          :label-align="'right'"
          style="width: 50%; height: auto; border: 0;"
        >
          <ur-dropdown
            v-model="faciltCateKindCd"
            :items="faciltCateAllCodes.COD_IA_FACILT_CATE_ALL"
            no-select
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_PIC')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="picUsrNm"
            value=""
            style="width: 100%;"
            maxlength="50"
            @keyup.enter="onClickSearch"
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
            @click="onClickSearch"
          >
            {{ $t("MSG_BTN_SEARCH") }}
          </ur-button>
        </div>
      </div>
      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None mt35"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :item-size="totalCount"
        :data-set-options="{id: 'id'}"
        @grid:scroll-bottom="scrollBottom"
      >
        <template #right-info>
          <ur-button @click="onClickExcelDownload">
            <ur-icon
              icon="download"
              icon-type="line"
            />
            {{ $t("MSG_BTN_EXCEL_DOWNLOAD") }}
          </ur-button>
        </template>
        <template #empty-view>
          <div class="custom_grid_type1">
            <div class="empty_box">
              {{ $t("MSG_TXT_EMPTY_DATA") }}
            </div>
          </div>
        </template>
      </ur-data-grid>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="onClickDelete">
            {{ $t("MSG_BTN_DEL") }}
          </ur-button>
          <ur-button
            color="violet"
            @click="onClickNewPic"
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
import CommonUtils from '~aa/js/common-utils'
export default {
  name: 'PGE_AAE_00002', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      list: new this.$ur.grid.DataSet(),
      dsExcel: new this.$ur.grid.DataSet(),
      // 드롭다운
      parkKindCd: '',
      faciltCateKindCd: '',
      picUsrId: '',
      picUsrNm: '',
      parkKindCodeList: ['COD_IAA_PARK_KIND'],
      parkKindCodes: { COD_IAA_PARK_KIND: [] },
      faciltCateAllCodeList: ['COD_IA_FACILT_CATE_ALL'],
      faciltCateAllCodes: { COD_IA_FACILT_CATE_ALL: [] },
      faciltCateCbCodeList: ['COD_IA_CB_FACILT_CATE_KIND'],
      faciltCateCbCodes: { COD_IA_CB_FACILT_CATE_KIND: [] },
      faciltCateElCodeList: ['COD_IA_EL_FACILT_CATE_KIND'],
      faciltCateElCodes: { COD_IA_EL_FACILT_CATE_KIND: [] },
      opts: { // 토탈o
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        resizableColumn: true,
      },
      currRows: 0,
      totalCount: 0,
      rowsPerPage: 10,
    }
  },
  computed: {
    columns() {
      const that = this
      return [
        {
          text: this.$t('MSG_TXT_EMPL_NM'),
          value: 'picUsrNm',
          component: {
            props: ['row', 'value'],
            template: '<div><ur-button shape="hyperlink" @click="view(row.picUsrId, row.faciltCateKindCd, row.parkKindCd)">{{row.picUsrNm}}</ur-button></div>',
            methods: {

              view(picUsrId, faciltCateKindCd, parkKindCdView) {
                utils.goPage('PGE_AAE_00004', {
                  picUsrId,
                  faciltCateKindCd,
                  parkKindCdView,
                  parkKindCd: that.parkKindCd,
                  faciltCateKindCdSearch: that.faciltCateKindCd,
                  picUsrNm: that.picUsrNm,
                })
              },
            },
          },
          minWidth: 120,
        },
        { text: this.$t('MSG_TXT_PARK_KIND'), minWidth: 100, value: 'parkKindCdNm' },
        { text: this.$t('MSG_TXT_PIC_FACILT'), minWidth: 100, value: 'faciltCateKindCdNm' },
        { text: this.$t('MSG_TXT_RGST_USR'), minWidth: 100, value: 'fstRgstUsrId' },
        {
          text: this.$t('MSG_TXT_RGST_DTM'),
          minWidth: 140,
          value: 'fstRgstDtm',
          type: 'date',
          customValue(v) {
            const customValue = utils.dateformatToClient(v)
            return customValue || '-'
          },
        },
        { text: this.$t('MSG_TXT_MDFC_USR'), minWidth: 100, value: 'fnlMdfcUsrId' },
        {
          text: this.$t('MSG_TXT_MDFC_DTM'),
          minWidth: 140,
          value: 'fnlMdfcDtm',
          type: 'date',
          customValue(v) {
            const customValue = utils.dateformatToClient(v)
            return customValue || '-'
          },
        },
      ]
    },
  },
  created() {
    http.mergeCodeList(this.$options.name, this.parkKindCodeList, this.parkKindCodes)
    http.mergeCodeList(this.$options.name, this.faciltCateAllCodeList, this.faciltCateAllCodes)
    http.mergeCodeList(this.$options.name, this.faciltCateCbCodeList, this.faciltCateCbCodes)
    http.mergeCodeList(this.$options.name, this.faciltCateElCodeList, this.faciltCateElCodes)
    this.selectPicList()
  },
  mounted() {
    setTimeout(() => {
      this.onInputParkKind()
    }, 500)
  },
  methods: {
    init() {
      this.picUsrId = ''
      this.picUsrNm = ''
      this.parkKindCd = ''
      this.faciltCateKindCd = ''
    },
    onClickSearch() {
      this.list = new this.$ur.grid.DataSet()
      this.currRows = 0
      this.totalCount = 0
      this.selectPicList()
    },
    selectPicList() {
      if (this.$refs.grid !== undefined) {
        this.rowsPerPage = this.$refs.grid.mx_pager.rowsPerPage
      }

      const param = {
        parkKindCd: this.parkKindCd,
        faciltCateKindCd: this.faciltCateKindCd,
        picUsrNm: encodeURI(this.picUsrNm),
        currRows: this.currRows, // 현재 가지고 온 데이터 수
        rowsPerPage: this.rowsPerPage, // 가지고 올 데이터 수
      }

      if (this.$route.params.parkKindCd) {
        param.parkKindCd = this.$route.params.parkKindCd
        this.parkKindCd = this.$route.params.parkKindCd
        this.$route.params.parkKindCd = ''
      }

      if (this.$route.params.faciltCateKindCd) {
        param.faciltCateKindCd = this.$route.params.faciltCateKindCd
        this.faciltCateKindCd = this.$route.params.faciltCateKindCd
        this.$route.params.faciltCateKindCd = ''
      }

      if (this.$route.params.picUsrNm) {
        param.picUsrNm = this.$route.params.picUsrNm
        this.picUsrNm = this.$route.params.picUsrNm
        this.$route.params.picUsrNm = ''
      }

      http.request(this.$options.name, 'DTS_AAE_00001', {
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
        this.selectPicList()
      }
    },
    onClickNewPic() {
      utils.goPage('PGE_AAE_00003', { parkKindCd: this.parkKindCd, faciltCateKindCd: this.faciltCateKindCd, picUsrNm: this.picUsrNm })
    },
    onClickExcelDownload() {
      const param = {
        parkKindCd: this.parkKindCd,
        faciltCateKindCd: this.faciltCateKindCd,
        picUsrNm: encodeURI(this.picUsrNm),
        currRows: this.currRows, // 현재 가지고 온 데이터 수
        rowsPerPage: this.rowsPerPage, // 가지고 올 데이터 수
        excelYn: 'Y',
      }

      http.request(this.$options.name, 'DTS_AAE_00001', {
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
    onClickDelete() {
      if (this.list.getSelected().length < 1) {
        utils.messageBox('warning', this.$t('MSG_ALT_DEL_NO_DATA'))
        return
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
        http.request(this.$options.name, 'DTS_AAE_00005', {
          data: this.list.getSelected(),
        }).then(res => {
          if (res.data.count > 0) {
            utils.messageBox('success', this.$t('MSG_ALT_DELETED'))
            this.onClickSearch()
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    onInputParkKind() {
      if (_.isEmpty(this.parkKindCd)) {
        this.faciltCateAllCodes.COD_IA_FACILT_CATE_ALL = []
        this.faciltCateKindCd = ''
      } else if (this.parkKindCd === '01') {
        // eslint-disable-next-line max-len
        this.faciltCateAllCodes.COD_IA_FACILT_CATE_ALL = this.faciltCateElCodes.COD_IA_EL_FACILT_CATE_KIND
        this.faciltCateKindCd = ''
      } else if (this.parkKindCd === '02') {
        // eslint-disable-next-line max-len
        this.faciltCateAllCodes.COD_IA_FACILT_CATE_ALL = this.faciltCateCbCodes.COD_IA_CB_FACILT_CATE_KIND
        this.faciltCateKindCd = ''
      }
    },
  },
}
</script>
