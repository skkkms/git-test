<template>
  <ur-modal
    ref="modalKiosk"
    xlarge
    title="가상대기 키오스크 정보 조회"
    draggable
    @opened="opened"
  >
    <template slot="title">
      <div class="modal-title mb45">
        가상대기 키오스크 정보 조회
      </div>
    </template>
    <template>
      <div class="modal-body">
        <ur-data-grid
          ref="grid"
          :headers="columns"
          :data-source="list"
          :data-set-options="{id: 'id'}"
          :options="opts"
        />
      </div>
    </template>
    <template>
      <div class="comm_btn_wrap bt1">
        <div class="right_box mt10">
          <ur-button
            color="violet"
            @click="close"
          >
            닫기
          </ur-button>
        </div>
      </div>
    </template>
  </ur-modal>
</template>

<script>

export default {
  name: 'PGE_AAB_00001_P02', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      CODE_KEYS: ['COD_IA_VLINE_WAIT_GRP'],
      codes: {
        COD_IA_VLINE_WAIT_GRP: [],
      },
      opts: {
        height: 300,
        noInfo: true,
        resizableColumn: true,
      },
      columns:
          [
            {
              value: '__idx', text: 'No.', width: 50, customValue: v => v + 1,
            },
            {
              value: 'faciltId', text: '시설코드', width: 85, customValue: v => v ? v:'-',
            },
            {
              value: 'faciltName', text: '시설명', customValue: v => v ? v : '-',
            },
            //{ value: 'vlineWaitGrpCd', text: '가상대기 그룹', width: 100 },
            {
              value: 'vlineWaitGrpNm',
              text: '가상대기 그룹',
              width: 95,
              customValue: (value, row) => {
                const codeId = row.vlineWaitGrpCd
                const code = this.codes.COD_IA_VLINE_WAIT_GRP.find(v => v.codeId === codeId)
                const codeName = code ? code.codeName : ''
                return utils.isEmpty(codeName) ? '-' : codeName
              },
            },
            {
              value: 'kioskPageNo', text: '페이지', width: 65, customValue: v => v ? v:'-',
            },
            {
              value: 'kioskScanCode', text: '스캔코드', width: 65, customValue: v => v ? v:'-',
            },
          ],
      list: [],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    modal() {
      return this.$refs.modalKiosk
    },
    contextPageId() {
      return this.$attrs['page-id']
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
  },
  methods: {
    open() {
      this.modal.open()
    },
    close() {
      this.modal.close()
    },
    opened() {
      this.onSearch()
    },
    closed() {},
    onSearch() {
      const serviceName = 'DTS_AAB_00007' // 가상대기 키오스크 정보 조회
      http.request(this.contextPageId, serviceName, {
        query: {
          parkKindCd: '01',
        },
        path: {},
        data: {},
      }).then(res => {
        console.log('RES', res.data)
        this.list = res.data
      }).catch(error => {
        console.log(error)
      })
    },
  },
}
</script>
<style scoped>
</style>
