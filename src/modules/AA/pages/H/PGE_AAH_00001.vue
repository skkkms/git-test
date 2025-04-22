<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>
          {{ $t('MSG_TXT_MEDIA_CHECK') }} <!-- 미디어 확인 -->
        </h4>
      </div>
      <ur-form-box>
        <!-- 슬롯구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_SLOT_KIND')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="slotValue"
            :items="slotItems"
            no-select
            :msg-no-select="$t('MSG_TXT_ALL')"
            style="width: 1000px !important"
            @input="slotListChange"
          />
        </ur-form-item>
        <!-- 시간대별 -->
        <ur-form-item
          :label="$t('MSG_TXT_TIME_ZONE')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="timeValue"
            :items="timeItems"
            no-select
            style="width: 1000px !important"
            :msg-no-select="$t('MSG_TXT_ALL')"
          />
        </ur-form-item>
        <!-- 날짜검색 -->
        <ur-form-item
          :label="$t('MSG_TXT_SEARCH_DATE')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-date-picker
            v-model="searchDate"
            input-type="YYYY-MM-DD"
            :confirm-label="$t('MSG_TXT_SEL')"
            :today-label="$t('MSG_BTN_TODAY')"
            style="width: 1000px !important"
          />
        </ur-form-item>
        <!-- 현재상태 -->
        <ur-form-item
          :label="$t('MSG_TXT_CURRENT_STATUS')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="status"
            :items="codes.COD_IA_VIDEO_LIST_STATUS"
            no-select
            :msg-no-select="$t('MSG_TXT_ALL')"
            style="width: 1000px !important"
          />
        </ur-form-item>
        <!-- 검색구분 -->
        <ur-form-item
          :label="$t('MSG_TXT_SEARCH_KIND')"
          label-align="right"
          class="flex_wrap"
          style="width: 100%; height: auto;"
        >
          <ur-dropdown
            v-model="searchKind"
            :items="codes.COD_IA_VIDEO_LIST_SRCH_KIND"
            style="width: 495px !important"
          />
          <ur-text-field
            v-model="searchText"
            value=""
            maxlength="50"
            style="width: 495px; margin-left: 10px; !important"
            @keyup.enter="onClickSearchButton"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
            v-permission:read="this.$options.name"
            @click="init"
          >
            {{ $t('MSG_BTN_INTL') }} <!-- 초기화 -->
          </ur-button>
          <ur-button
            v-permission:read="this.$options.name"
            color="violet"
            @click="onClickSearchButton"
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
        :item-size="totalCount"
        @grid:scroll-bottom="scrollBottom"
      />
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button
            v-permission:delete="this.$options.name"
            @click="remove"
          >
            {{ $t('MSG_BTN_DEL') }} <!-- 삭제 -->
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
  name: 'PGE_AAH_00001', // eslint-disable-line vue/name-property-casing
  data() {
    return {
      codeKeys: [
        'COD_IA_VIDEO_LIST_STATUS',
        'COD_IA_VIDEO_LIST_SRCH_KIND',
      ],
      codes: {
        COD_IA_VIDEO_LIST_STATUS: [],
        COD_IA_VIDEO_LIST_SRCH_KIND: [],
      },

      list: new this.$ur.grid.DataSet(),
      searchKind: '1',
      searchText: '',
      status: '',
      // 드롭다운
      slotValue: '',
      timeValue: '',
      searchDate: '',
      valueD3: 1,
      valueD4: 1,
      listSize: 0,
      page: 1,
      rowsPerPage: 10,
      slotItems: [],
      timeItems: [],

      // 테이블 옵션
      opts: { // 토탈 O
        height: 450,
        noInfo: false,
        pagination: true,
        multiSelect: true,
        selectCheck: true,
        selectCheckOnly: true,
        resizableColumn: true,
        rowHeight: 70,
      },

      currRows: 0,
      totalCount: 0,
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 테이블
    columns() {
      return [
        {
          text: this.$t('MSG_TXT_NUMBER_ROW'), value: 'no', width: 50, minWidth: 50,
        },
        {
          text: this.$t('MSG_TXT_CODE'), value: 'eventCode', width: 150, minWidth: 150,
        },
        {
          text: this.$t('MSG_TXT_DAY_TIME'),
          value: 'subject2',
          minWidth: 250,
          component: {
            props: ['row', 'value'],
            template: `
              <div>
                <ur-button shape="hyperlink" style="height: auto; text-align: left;" @click="view(row.partcpSeq)">
                  {{row.subject2}}<br>{{row.slotDay}}<br>{{row.timeVal}}
                </ur-button>
              </div>`,
            methods: {
              view(partcpSeq) {
                const params = {}
                params.partcpSeq = partcpSeq
                utils.goPage('PGE_AAH_00002', { params })
              },
            },
          },
        },
        {
          text: this.$t('MSG_TXT_TTL'),
          value: 'subject',
          minWidth: 170,
          component: {
            props: ['row', 'value'],
            template: `
              <div>
                <span class="badge-sample-span">{{row.subject}}</span>
                <div v-show=row.saveFileUrl>
                  <ur-badge class="badge-sample-badge pl16" color="default" text="이미지" shape="status" />
                </div>
              </div>`,
          },
        },
        {
          text: this.$t('MSG_TXT_APPL_USER'), value: 'partcpPersnId', width: 100, minWidth: 100,
        },
        {
          text: this.$t('MSG_TXT_DRAT_DT'), value: 'fstRgstDtm', width: 150, minWidth: 150, customValue: v => utils.dateformatToClient(v),
        },
        {
          text: this.$t('MSG_TXT_CURRENT_STATUS'), value: 'statusValue', width: 120, minWidth: 120,
        },
      ]
    },
  },
  created() {
    http.mergeCodeList(this.$options.name, this.codeKeys, this.codes)

    const param = {}
    http.request(this.$options.name, 'DTS_AAH_00022', {
      query: param,
    }).then(res => {
      for (let i = 0; i < res.data.videoSlotList.length; i += 1) {
        this.slotItems.push({ value: res.data.videoSlotList[i].slotSeq, text: `[${res.data.videoSlotList[i].slotStartDay} ~ ${res.data.videoSlotList[i].slotEndDay}] ${res.data.videoSlotList[i].subject}` })
      }
    }).catch(error => {
      console.log(error)
    })
  },
  mounted() {
    this.search()
  },
  methods: {

    init() {
      this.slotValue = ''
      this.timeValue = ''
      this.timeItems = []
      this.searchDate = ''
      this.searchKind = '1'
      this.status = ''
      this.searchText = ''
    },

    onClickSearchButton() {
      this.list = new this.$ur.grid.DataSet()
      this.currRows = 0
      this.totalCount = 0
      this.search()
    },

    getSearchParam() {
      const params = {
        page: this.page,
        rowsPerPage: this.$refs.grid.mx_pager.rowsPerPage,
      }
      return params
    },

    // 검색
    search() {
      const param = this.getSearchParam()
      // param.page = this.page;
      // param.rowsPerPage = this.rowsPerPage;
      if (this.$refs.grid !== undefined) {
        this.rowsPerPage = this.$refs.grid.mx_pager.rowsPerPage
      }

      if (this.slotValue === '') {
        param.slotSeq = 0
      } else {
        param.slotSeq = this.slotValue
      }

      if (this.timeValue === '') {
        param.timeSeq = 0
      } else {
        param.timeSeq = this.timeValue
      }

      param.fstRgstDtm = this.searchDate
      param.statusValue = this.status
      param.searchKind = this.searchKind
      param.searchText = encodeURI(this.searchText)
      param.currRows = this.currRows // 현재 가지고 온 데이터 수
      param.rowsPerPage = this.rowsPerPage // 가지고 올 데이터 수

      http.request(this.$options.name, 'DTS_AAH_00001', {
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
    /*
    pagingChange(paging) {
      if (this.page !== paging.currentPage) {
        this.page = paging.currentPage
        this.rowsPerPage = paging.rowsPerPage;
        this.search();
      }
    },
    */
    remove() {
      if (this.list.getSelected().length < 1) {
        utils.messageBox('alert', this.$t('MSG_ALT_DEL_NO_DATA'))
        return
      }

      utils.messageBox('confirm', this.$t('MSG_ALT_DO_DELETE'), null, () => {
        http.request(this.$options.name, 'DTS_AAH_00004', {
          data: this.list.getSelected(),
        }).then(res => {
          if (res.data.count > 0) {
            utils.messageBox('alert', this.$t('MSG_ALT_DELETED'))
            this.onClickSearchButton()
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },

    slotListChange() {
      this.timeItems = []

      const slotValue = (this.slotValue !== '') ? this.slotValue : 0

      const param = {
        slotSeq: slotValue,
      }
      http.request(this.$options.name, 'DTS_AAH_00021', {
        query: param,
      }).then(res => {
        for (let i = 0; i < res.data.length; i += 1) {
          this.timeItems.push({ value: res.data[i].timeSeq, text: res.data[i].timeSettngValue })
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },
}
</script>
