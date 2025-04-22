<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 블리스 등급관리 목록조회-->
      <ur-form-box toggleable>
        <ur-form-item
          :label="$t('MSG_TXT_BLISS_NAME')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            v-model="search.blissName"
            style="width:100%; height:auto;"
            maxlength="100"
            @enter="onClickSearchBtn"
          />
        </ur-form-item>

        <ur-form-item
          :label="$t('MSG_TXT_EVENT_PERIOD')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-range-picker
            v-model="search.eventDtm"
            :confirm-label="$t('MSG_TXT_SELT')"
            input-type="YYYY-MM-DD"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <!-- 초기화 -->
          <ur-button
            v-permission:read="this.$options.name"
            @click="onClickReset()"
          >
            {{ $t('MSG_BTN_RESET') }}
          </ur-button>

          <!-- 검색 -->
          <ur-button
            v-permission:read="this.$options.name"
            color="violet"
            @click="onClickSearchBtn()"
          >
            {{ $t("MSG_BTN_SEARCH") }}
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
        @grid:scroll-bottom="onBottom"
      />
      <div class="bt1 mt45">
        <sui-page-footer class="comm_btn_wrap">
          <div class="btn_wrap">
            <div class="right_box">
              <!-- 삭제 -->
              <ur-button
                v-permission:delete="this.$options.name"
                @click="onClickDelete()"
              >
                {{ $t("MSG_BTN_DEL") }}
              </ur-button>

              <!--신규 등록 -->
              <ur-button
                v-permission:create="this.$options.name"
                color="violet"
                @click="onClickRegist"
              >
                {{ $t("MSG_BTN_RGST_NEW") }}
              </ur-button>
            </div>
          </div>
        </sui-page-footer>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_AAG_00051', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 검색조건
      search: {
        blissName: '',
        eventDtm: [],
        currRows: 0,
        totalCount: 0,
      },
      searchParam: {},
      opts: {
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        resizableColumn: true,
        infinityScroll: true,
        pagingList: [10, 15, 30],
      },

      dataList: new this.$ur.grid.DataSet(),
    }
  },
  computed: {
    columns() {
      const that = this
      const columns = [
        {
          text: this.$t('MSG_TXT_BLISS_NAME'),
          value: 'blissName',
          minWidth: 400,
          component: {
            props: ['row', 'value'],
            template: '<div><ur-button shape="hyperlink" @click.stop="clickCheck(row)">{{row.blissName}}</ur-button></div>',
            methods: {
              clickCheck(row) {
                that.fnGridRowClick(row)
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_EVENT_PERIOD'),
          value: 'eventDtm',
          width: 260,
          customValue(val, row) {
            const finish = utils.toStringByFormat(row.eventStartDtm, 'YYYY-MM-DD HH:mm')
            const end = utils.toStringByFormat(row.eventEndDtm, 'YYYY-MM-DD HH:mm')
            return `${finish} ~ ${end}`
          },
        },
        {
          text: this.$t('MSG_TXT_RGST_DTM'),
          value: 'fstRgstDtm',
          width: 150,
          customValue(value) {
            return utils.dateformatToClient(value)
          },
        },
        {
          text: this.$t('MSG_TXT_RGST_USR'),
          value: 'fstRgstUsrId',
          width: 100,
        },
        {
          text: this.$t('MSG_TXT_MDFC_DTM'),
          value: 'fnlMdfcDtm',
          width: 150,
          customValue(value) {
            return utils.dateformatToClient(value)
          },
        },
        {
          text: this.$t('MSG_TXT_MDFC_USR'),
          value: 'fnlMdfcUsrId',
          width: 100,
        },
      ]
      return columns
    },
  },
  created() {
    const params = utils.getParameter(this, 'params')
    if (params) {
      this.search = params
      this.search.currRows = 0
      this.search.totalCount = 0
    } else {
      this.onClickReset()
    }
  },
  mounted() {
    this.onClickSearchBtn()
  },
  methods: {
  // 검색버튼
    onClickSearchBtn() {
      this.dataList = new this.$ur.grid.DataSet()
      this.search.currRows = 0 // 가지고 온 데이터 초기화
      this.search.totalCount = 0
      this.setSearchParam()
      this.onClickSearch()
    },
    // serachParam 셋팅
    setSearchParam() {
      this.searchParam = {
        blissName: encodeURI(this.search.blissName),
        eventStartDtm: utils.dateformatToServer(this.search.eventDtm[0], 'S'),
        eventEndDtm: utils.dateformatToServer(this.search.eventDtm[1], 'S'),
        offset: this.search.currRows, // 현재 가지고 온 데이터 수
        rowsPerPage: this.$refs.grid.mx_pager.rowsPerPage, // 가지고 올 데이터 수
      }
    },
    /**
     * 검색
     */
    onClickSearch() {
      this.searchParam.offset = this.search.currRows
      http.request(this.$options.name, 'DTS_AAG_00051', {
        query: this.searchParam,
      }).then(res => {
        this.dataList.appendData(res.data.blissList)
        this.search.currRows = this.dataList.totalSize
        this.search.totalCount = res.data.totalCount
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 상세조회
     */
    fnGridRowClick(row) {
      const params = {
        ...this.search,
        blissId: row.blissId,
      }
      utils.goPage('PGE_AAG_00053', { params })
    },
    /**
     * 신규등록
     */
    onClickRegist() {
      const params = {
        ...this.search,
      }
      utils.goPage('PGE_AAG_00052', { params })
    },

    /**
     * 삭제
     */
    onClickDelete() {
      const rows = this.$refs.grid.getSelected()
      if (rows.length < 1) {
        utils.messageBox('alert', this.$t('MSG_ALT_DEL_NO_DATA')) // 삭제할 데이터를 선택하세요.
        return
      }
      // 삭제 하시겠습니까?
      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
        const queryParams = rows
        http.request(this.$options.name, 'DTS_AAG_00055', {
          data: queryParams,
        }).then(() => {
          utils.messageBox('alert', this.$t('MSG_ALT_DELETED')) // 삭제 되었습니다.
          this.onClickSearchBtn() // 재검색
        }).catch(error => {
          console.log(error)
        })
      })
    },

    // 초기화
    onClickReset() {
      this.search.blissName = ''

      const dToday = utils.now('YYYY-MM-DD')
      this.search.eventDtm = [utils.dateformatToClient(utils.addMonth(dToday, -1), 'S'), utils.dateformatToClient(dToday)]
    },

    // 그리드 맨 마지막
    onBottom() {
      // 가지고 온 데이터 수와 totalSize 가 같지 않을 경우만 재조회
      if (this.search.currRows !== this.search.totalCount) {
        this.onClickSearch()
      }
    },
  },
}
</script>
<style scoped>
</style>
