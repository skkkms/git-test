<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_PUBLCT_KIND')"
          :label-align="'right'"
          style="width: 50%; height: auto; border: 0;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="searchParams.publctTypeCd"
            :items="codes.COD_IA_PUBLCT_TYPE"
            no-select="no-select"
            :msg-no-select="$t('MSG_TIT_TOT')"
            @input="changePublctTypeCd"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_IA_NOTI_TYPE')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox-wrapper
            v-model="searchParams.notiTypeCd"
            :disabled="disableNotiTypeCd"
            :items="codes.COD_IA_PUBLCT_NOTI_TYPE"
            sm
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          :label="$t('MSG_TXT_LANG_DIV')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox-wrapper
            v-model="searchParams.langTypeCd"
            :items="codes.COD_RS_LANG"
            sm
          />
        </ur-form-item>

        <ur-form-item
          :label="$t('MSG_TXT_EXPOSR_YN')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-checkbox-wrapper
            v-model="searchParams.exposrYn"
            :items="codes.COD_IA_EXPOSR_YN"
            sm
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_PUBCT_TARGET')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-checkbox-wrapper
            v-model="searchParams.exposrTarget"
            :items="codes.COD_IA_EXPORSR_TARGET"
            sm
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_APP_EXPOSR_PERIOD')"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-range-picker
            v-model="searchParams.appExposrPeriodDtm"
            input-type="YYYY-MM-DD"
            :confirm-label="$t('MSG_TXT_SELT')"
          />
        </ur-form-item>
        <ur-form-item
          :label="$t('MSG_TXT_SUBJT')"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            v-model="searchParams.publctSubject"
            style="width: 100%;"
            maxlength="150"
            @keyup.enter.prevent="onClickSearch"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button @click="init">
            {{ $t('MSG_BTN_INTL' ) }}
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
        class="custom_grid_pgeNav_None mt35"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :data-set-options="{id: 'id'}"
        :item-size="listSize"
        @grid:paging="pagingChange"
        @grid:scroll-bottom="onBottom"
      >
        <template #left-info>
          <cmp-ur-data-grid-left-info
            :total-count="listSize"
            :page-size="searchParams.rowsPerPage"
            @changePageSize="onChangePageSize"
          />
        </template>
      </ur-data-grid>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
            v-permission:delete="$options.name"
            @click="deleteSelected"
          >
            {{ $t('MSG_TXT_DEL') }}
          </ur-button>
          <ur-button
            v-permission:create="$options.name"
            color="violet"
            @click="createNew"
          >
            {{ $t('MSG_BTN_RGST_NEW') }}
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

import moment from 'moment'

export default {
  name: 'PGE_AAD_00003', // eslint-disable-line vue/name-property-casing
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
      CODE_KEYS: ['COD_IA_PUBLCT_TYPE', 'COD_IA_PUBLCT_NOTI_TYPE', 'COD_IA_EXPORSR_TARGET',
        'COD_IA_EXPOSR_YN', 'COD_RS_LANG'],
      codes: {
        COD_IA_PUBLCT_TYPE: [],
        COD_IA_PUBLCT_NOTI_TYPE: [],
        COD_IA_EXPORSR_TARGET: [],
        COD_IA_EXPOSR_YN: [],
        COD_RS_LANG: [],
      },
      listSize: 0,
      list: new this.$ur.grid.DataSet(),
      searchParams: {
        publctTypeCd: '',
        notiTypeCd: ['01', '02', '03'],
        langTypeCd: ['KO', 'EN'],
        exposrYn: ['Y', 'N'],
        exposrTarget: ['APP', 'MOBILE', 'PC'],
        appExposrPeriodDtm: [moment(utils.now('YYYY-MM-DD')).format('YYYY-MM-DD'), moment(utils.now('YYYY-MM-DD')).add(14, 'days').format('YYYY-MM-DD')],
        publctSubject: '',
        offset: 0,
        rowsPerPage: 30,
      },
      initSearchParam: {
        publctTypeCd: '',
        notiTypeCd: ['01', '02', '03'],
        langTypeCd: ['KO', 'EN'],
        exposrYn: ['Y', 'N'],
        exposrTarget: ['APP', 'MOBILE', 'PC'],
        appExposrPeriodDtm: [moment(utils.now('YYYY-MM-DD')).format('YYYY-MM-DD'), moment(utils.now('YYYY-MM-DD')).add(14, 'days').format('YYYY-MM-DD')],
        publctSubject: '',
        offset: 0,
        rowsPerPage: 30,
      },
      // 테이블
      opts: {
        infinityScroll: true,
        pagination: false,
        height: 520,
        noInfo: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        defaultPageSize: 10,
        resizableColumn: true,
      },
      disableNotiTypeCd: false,
      squery: {},
    }
  },
  computed: {
    columns() {
      const that = this
      const columns = [
        {
          text: this.$t('MSG_TXT_PUBLCT_KIND'), value: 'publctTypeCd', width: 100, type: 'code', domain: this.codes.COD_IA_PUBLCT_TYPE,
        },
        {
          text: this.$t('MSG_TXT_IA_NOTI_TYPE'),
          value: 'notiTypeCd',
          width: 80,
          type: 'code',
          domain: this.codes.COD_IA_PUBLCT_NOTI_TYPE,
        },
        {
          text: this.$t('MSG_TXT_LANG_DIV'),
          value: 'langTypeCd',
          width: 80,
          type: 'code',
          domain: this.codes.COD_RS_LANG,
        },
        {
          text: this.$t('MSG_TXT_SUBJT'),
          width: 400,
          value: 'publctSubject',
          component: {
            props: ['row', 'value', 'text'],
            template: '<div ><ur-button shape="hyperlink" @click.stop="clickCheck(row)">{{text}}</ur-button></div>',
            methods: {
              clickCheck(row) {
                that.onRowClickEvent(row)
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_EXPOSR_YN'),
          value: 'exposrYn',
          width: 80,
          type: 'code',
          domain: this.codes.COD_IA_EXPOSR_YN,
        },
        {
          text: this.$t('MSG_TXT_EXPOSR_ORDER'), value: 'exposrOrder', width: 70, customValue: v => utils.numberFormat(v),
        },
        {
          text: this.$t('MSG_TXT_PUBLCT_ID'),
          value: 'publctId',
          width: 320,
          click: v => prompt(this.$t('MSG_TXT_COPY_CLIPBOARD_WITH_CTRL_C'), v), // Ctrl+C를 눌러 클립보드로 복사하세요.
        },
        {
          text: this.$t('MSG_TXT_APP_EXPOSR_PERIOD'),
          width: 260,
          component: {
            props: ['row', 'value', 'text'],
            template: '<div>{{publctTarget}}</div>',
            computed: {
              publctTarget() {
                const startDtm = utils.dateformatToClient(this.row.appExposrPeriodStartDtm).substring(0, 16) // eslint-disable-line max-len
                const endDtm = utils.dateformatToClient(this.row.appExposrPeriodEndDtm).substring(0, 16) // eslint-disable-line max-len

                return `${startDtm} ~ ${endDtm}`
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_PUBCT_TARGET'),
          width: 150,
          component: {
            props: ['row', 'value', 'text'],
            template: '<div>{{publctTarget}}</div>',
            computed: {
              publctTarget() {
                const target = []
                if (this.row.appPublctYn === 'Y') {
                  target.push('APP')
                }
                if (this.row.pcPublctYn === 'Y') {
                  target.push('PC')
                }
                if (this.row.mobilePublctYn === 'Y') {
                  target.push(this.$t('MSG_TXT_IA_MOBILEWEB'))
                }
                return target.join(', ')
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_FST_RGST_DTM'),
          width: 150,
          component: {
            props: ['row', 'value', 'text'],
            template: '<div>{{fstRgstDtm}}</div>',
            computed: {
              fstRgstDtm() {
                return utils.dateformatToClient(this.row.fstRgstDtm)
              },
            },
          },
        },
        { text: this.$t('MSG_TXT_FST_RGST_USR'), value: 'fstRgstUsrId', width: 100 },
        {
          text: this.$t('MSG_TXT_MDFC_DTM'),
          width: 150,
          component: {
            props: ['row', 'value', 'text'],
            template: '<div>{{fnlMdfcDtm}}</div>',
            computed: {
              fnlMdfcDtm() {
                return utils.dateformatToClient(this.row.fnlMdfcDtm)
              },
            },
          },
        },
        {
          text: this.$t('MSG_TIT_MDFC_USR'), value: 'fnlMdfcUsrId', width: 100,
        },
      ]
      return columns
    },
  },
  watch: {
  },
  created() {
    this.selectCode()
    const params = utils.getParameter(this, 'params')
    if (params) {
      this.searchParams = params
    }
  },
  mounted() {
    this.onClickSearch()
  },
  methods: {
    async selectCode() {
      await http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
      this.codes.COD_IA_PUBLCT_NOTI_TYPE = this.codes.COD_IA_PUBLCT_NOTI_TYPE.reverse()
    },
    init() {
      this.searchParams = JSON.parse(JSON.stringify(this.initSearchParam))
      this.disableNotiTypeCd = false
    },
    getSearchParam() {
      const params = {
        publctTypeCd: this.searchParams.publctTypeCd,
        notiTypeCd: this.searchParams.notiTypeCd.join(','),
        langTypeCd: this.searchParams.langTypeCd.join(','),
        exposrYn: this.searchParams.exposrYn.join(','),
        exposrTarget: this.searchParams.exposrTarget.join(','),
        appExposrPeriodStartDtm: this.searchParams.appExposrPeriodDtm[0],
        appExposrPeriodEndDtm: this.searchParams.appExposrPeriodDtm[1],
        publctSubject: encodeURI(this.searchParams.publctSubject),
        rowsPerPage: this.searchParams.rowsPerPage,
        offset: this.list.totalSize,
      }
      return params
    },
    onClickSearch() {
      this.$refs.grid.setScrollLeft(0)
      if (['03', '04', '05', '06'].includes(this.searchParams.publctTypeCd)) {
        if (this.searchParams.notiTypeCd.indexOf('03') < 0) {
          this.searchParams.notiTypeCd.push('03')
        }
      }

      if (_.isEmpty(this.searchParams.notiTypeCd)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_IA_NOTI_TYPE')))
        return
      }

      if (_.isEmpty(this.searchParams.langTypeCd)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_LANG_DIV')))
        return
      }
      if (_.isEmpty(this.searchParams.exposrYn)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_EXPOSR_YN')))
        return
      }
      if (_.isEmpty(this.searchParams.exposrTarget)) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_ID'), this.$t('MSG_TXT_PUBCT_TARGET')))
        return
      }
      if (_.isEmpty(this.searchParams.appExposrPeriodDtm[0])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD')))
        return
      }
      if (_.isEmpty(this.searchParams.appExposrPeriodDtm[1])) {
        utils.messageBox('alert', null, utils.strFormat(this.$t('MSG_ALT_CHK_NCSR'), this.$t('MSG_TXT_APP_EXPOSR_PERIOD')))
        return
      }
      this.listSize = 0
      this.list = new this.$ur.grid.DataSet()
      this.squery = this.getSearchParam()
      this.search()
    },
    search() {
      http.request(this.$options.name, 'DTS_AAD_00009', {
        query: this.squery,
      }).then(res => {
        if (res.data) {
          this.list.appendData(res.data.list)
          this.listSize = res.data.count
        }
      }).catch(error => {
        console.log(error)
      })
    },
    deleteSelected() {
      const rows = this.$refs.grid.getSelected()
      if (!rows || rows.length < 1) {
        utils.messageBox('alert', this.$t('MSG_ALT_DEL_NO_DATA')) // 삭제할 데이터를 선택하세요.
        return
      }
      const pathData = []
      _.forEach(rows, row => {
        pathData.push(row.publctId)
      })

      // 삭제 하시겠습니까?
      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
        http.request(this.$options.name, 'DTS_AAD_00013', {
          path: {
            'publct-id': pathData.join(','),
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
    createNew() {
      const params = {
        ...this.searchParams,
      }
      utils.goPage('PGE_AAD_00005', { params })
    },
    onRowClickEvent(row) {
      const params = {
        ...this.searchParams,
        publctId: row.publctId,
      }
      utils.goPage('PGE_AAD_00004', { params })
    },
    onBottom() {
      this.squery.offset = this.list.totalSize

      const totalSize = this.listSize
      const currentSize = this.list.totalSize
      if (totalSize > currentSize) {
        this.search()
      }
    },
    onChangePageSize(pageSize) {
      this.searchParams.rowsPerPage = pageSize
    },
    changePublctTypeCd(data) {
      // 홈브리지 or 스피드웨이 or 채용 or 정기권일 경우 공지구분 비활성화
      switch (data) {
      case '03':
      case '04':
      case '05':
      case '06':
        this.disableNotiTypeCd = true
        break
      default:
        this.disableNotiTypeCd = false
      }
    },
    pagingChange(paging) {
      this.searchParams.rowsPerPage = paging.rowsPerPage
    },
  },
}
</script>
<style scoped>
</style>
