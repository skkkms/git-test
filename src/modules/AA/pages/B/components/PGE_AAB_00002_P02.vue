<template>
  <ur-modal
    ref="modal"
    xlarge
    title="시설명/코드 조회"
    draggable
    @opened="opened"
  >
    <template slot="title">
      <div class="modal-title">
        시설명/코드 조회
      </div>
    </template>
    <template>
      <div class="modal-body">
        <ur-form-box toggleable>
          <ur-form-item
            label="시설코드"
            :label-align="'right'"
            style="width: 50%; height: auto;"
            class="flex_wrap"
          >
            <ur-text-field
              v-model="params.facilCd"
              maxlength="10"
              style="width: 100%; height: auto;"
              @keydown.enter="onSearch"
            />
          </ur-form-item>
          <ur-form-item
            label="시설명"
            :label-align="'right'"
            style="width: 50%; height: auto; border-top: 0;"
            class="flex_wrap"
          >
            <ur-text-field
              v-model="params.facilNm"
              maxlength="100"
              style="width: 100%; height: auto;"
              @keydown.enter="onSearch"
            />
          </ur-form-item>
        </ur-form-box>
        <div class="btn_wrap mt10">
          <div class="right_box">
            <ur-button @click="onReset">
              초기화
            </ur-button>
            <ur-button
              v-permission:read="contextPageId"
              color="violet"
              @click="onSearch"
            >
              검색
            </ur-button>
          </div>
        </div>

        <!-- 데이타그리드 "custom_grid_pgeNav_None mt35" "custom_grid_type1 mt35" -->
        <ur-data-grid
          ref="grid"
          :headers="columns"
          :options="opts"
          :data-source="dataSet"
          :item-size="dataTotalCount"
          @grid:row-dbl-click="onDblClicked"
          @grid:paging="pagingChange"
          @grid:scroll-bottom="scrollBottom"
        />
      </div>
    </template>
    <template>
      <div class="comm_btn_wrap bt1">
        <div class="right_box mt10">
          <ur-button @click="close">
            닫기
          </ur-button>
          <ur-button
            color="violet"
            @click="onSelect"
          >
            선택
          </ur-button>
        </div>
      </div>
    </template>
    <!-- 모달 : Alert -->
    <ALERT
      ref="alert"
    />
  </ur-modal>
</template>

<script>
import ALERT from './PGE_AAB_00001_P01.vue' // ALERT 팝업

export default {
  name: 'PGE_AAB_00002_P02', // eslint-disable-line vue/name-property-casing
  components: {
    ALERT,
  },
  props: {
  },
  data() {
    return {
      opts: {
        multiSelect: false,
        selectCheck: false,
        height: 360,
        noInfo: false,
        pagination: false,
        infinityScroll: true,
      },
      paging: {
        currentPage: '1',
        rowsPerPage: '10',
      },
      caller: '',
      params: {
        facilCd: '',
        facilNm: '',
      },
      columns: [
        {
          text: 'No.', value: '__idx', width: 100, customValue: (v) => v+1
        },
        { text: '시설코드', value: 'facilCd' },
        { text: '시설명', value: 'facilNm' },
        { text: '대표 시설코드', value: 'facilCd2' },
        { text: '대표 시설명', value: 'facilNm2' },
      ],
      // [페이징 or 인피니티 스크롤]
      dataTotalCount: 0,
      dataSet: new this.$ur.grid.DataSet(),
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    contextPageId() {
      return this.$attrs['page-id']
    },
    modal() {
      return this.$refs.modal
    },
    grid() {
      return this.$refs.grid
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
  },
  methods: {
    open(params) {
      this.caller = params.caller
      this.modal.open()
    },
    close() {
      this.modal.close()
      this.onReset()
      this.dataSet.setData([])
    },
    opened() {
      this.onReset()
      this.dataSet.setData([])
    },
    onReset() {
      this.params = {}
    },
    pagingChange(paging) {
      /**
       * [ Grid Pagination ]
       *  currentPage
       *  firstIndex
       *  oldPerPage
       *  rowsPerPage
       *  totalItems
       *  totalPages
       */
      this.paging = paging
    },
    onSelect() {
      const selected = this.grid.getSelected()
      if (utils.isEmpty(selected)) {
        this.alert('선택 된 항목이 없습니다.')
        return
      }
      this.doSelect(selected)
    },
    onDblClicked(row) {
      this.doSelect(row)
    },
    doSelect(selected) {
      const data = {
        caller: this.caller,
        facilCd: selected.facilCd,
        facilNm: selected.facilNm,
        facilCd2: selected.facilCd2,
        facilNm2: selected.facilNm2,
      }
      this.$emit('update', data)
      this.close()
    },
    onSearch() {
      this.dataSet.setData([])
      this.$nextTick(() => {
        this.search()
      })
    },
    scrollBottom() {
      this.search()
    },
    search() {
      if (!utils.isEmpty(this.params.facilCd) && this.params.facilCd.length < 3) {
        this.alert('시설코드 검색은 3자리 이상 입력해야 합니다.')
        // utils.messageBox('alert', this.$t('시설코드 검색은 3자리 이상 입력해야 합니다.'))
        return
      }

      const query = Object.assign({}, this.params, this.paging, {
        infinityOffset: this.dataSet.getViewData().length,
      })
      console.log('REQ', query)
      const serviceName = 'DTS_AAB_00005'
      http.request(this.contextPageId, serviceName, {
        query,
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        if (!utils.isEmpty(res.data.list) && res.data.list.length > 0) {
          this.dataSet.appendData(res.data.list)
        }
        this.dataTotalCount = res.data.totalCount
      }).catch(error => {
        console.log(error)
      })
    },
    alert(msg) {
      this.$refs.alert.open(msg)
    },
  },
}
</script>
<style scoped>
</style>
