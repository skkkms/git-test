<template>
  <div>
    <!-- 위치 관리 -->
    <div class="comm_btn_wrap mt35" style="margin-bottom: 10px;">
      <div class="left_box">
        <div class="comm_title_wrap">
          <h4 class="pr10">
            위치 관리
          </h4>
        </div>
      </div>
      <div class="right_box">
        <span class="subscript_txt">
          * 실내 시설의 경우 ‘위/경도’는 길찾기, ‘X/Y좌표’는 지도 위치 표기에 사용됩니다.
        </span>
      </div>
    </div>
    <!-- GRID -->
    <ur-data-grid
      ref="grid"
      :headers="columns"
      :data-source="list"
      :options="opts"
      height="300"
    />
    <!-- 위치보기 팝업업 -->
    <P01 ref="positionPopup" />
    <!-- 모달 : Alert -->
    <ALERT ref="alert" />
  </div>
</template>
<script>
import ALERT from './PGE_AAB_00001_P01.vue' // ALERT 팝업
import P01 from './PGE_AAB_00002_P03.vue'
export default {
  name: 'PGE_AAB_00003_C13', // eslint-disable-line vue/name-property-casing
  components: {
    ALERT,
    P01,
  },
  props: {
    list: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      CODE_KEYS: [
        'COD_IA_INSIDE_YN',
        'COD_IA_INSIDE_FLOOR',
        'COD_IA_COORDINATE_TYPE',
      ],
      codes: {
        COD_IA_INSIDE_YN: [],
        COD_IA_INSIDE_FLOOR: [],
        COD_IA_COORDINATE_TYPE: [],
      },
      // 그리드
      opts: {
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      columns: [],
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
    http.mergeCodeList(this.$options.name, this.CODE_KEYS, this.codes)
  },
  mounted() {
    const that = this
    this.columns = [
      {
        value: '__idx', text: 'No.', width: 100, customValue: v => v + 1,
      },
      {
        value: 'insideYn',
        text: '실내/외 구분',
        customValue: (value, row) => {
          const code = this.codes.COD_IA_INSIDE_YN.find(v => v.codeId === value)
          const val = code ? code.codeName : ''
          return val ? val : '-'
        },
      },
      {
        value: 'insideFloor', text: '실내층수', customValue: this.value ? this.value : '-',
      },
      {
        value: 'latud', text: '위도', customValue: (v) => v ? v : '-'
      },
      {
        value: 'lgtud', text: '경도', customValue: (v) => v ? v : '-'
      },
      {
        value: 'xCoordinate', text: 'X좌표', customValue: (v) => v ? v : '-'
      },
      {
        value: 'yCoordinate', text: 'Y좌표', customValue: (v) => v ? v : '-'
      },
      {
        value: 'memoDescrt', text: '비고', customValue: (v) => v ? v : '-'
      },
      /*
      {
        value: 'dummy',
        text: '',
        component: {
          props: ['row', 'value', 'text', 'me'], // provided by grid
          template: '<div><ur-button color="violet" @click="onOpenPositionPopup">위치보기</ur-button></div>',
          methods: {
            onOpenPositionPopup(ev) {
              if (utils.isEmpty(this.row.insideYn)) {
                that.alert('실내외 구분이 지정되지 않아 지도를 확인 할 수 없습니다.')
                return
              }
              if (this.row.insideYn === 'Y' && utils.isEmpty(this.row.insideFloor)) {
                that.alert('실내층수가 지정되지 않아 지도를 확인 할 수 없습니다.')
                return
              }
              if (utils.isEmpty(this.row.latud) || utils.isEmpty(this.row.lgtud)) {
                that.alert('위도 또는 경도가 입력되지 않아 지도를 확인 할 수 없습니다.')
                return
              }
              that.$refs.positionPopup.open({ caller: this.row })
            },
          },
        },
      },
      */
    ]
  },
  methods: {
    alert(msg) {
      this.$refs.alert.open(msg)
    },
  },
}
</script>
<style scoped>
</style>
