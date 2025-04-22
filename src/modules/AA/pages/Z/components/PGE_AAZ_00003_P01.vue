<template>
  <div>
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
          <ur-button>
            닫기
          </ur-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'PGE_AAZ_00003_P01', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      opts: {
        height: 300,
        noInfo: true,
      },
      columns:
          [
            { value: 'value1', text: 'No.' },
            { value: 'value2', text: '시설코드' },
            { value: 'value3', text: '시설명', width: 150 },
            { value: 'value4', text: '가상대기 그룹' },
            { value: 'value5', text: '페이지' },
            { value: 'value6', text: '스캔코드' },
            // width:num, type:'number','code'
          ],
      list:
          [
            {
              value1: '1', value2: 'H100V05003', value3: 'VR 어드벤처', value4: 'A', value5: 3, value6: 2,
            },
            {
              value1: '2', value2: 'H100V05005', value3: 'T익스프레스', value4: 'B', value5: 1, value6: 1,
            },
            {
              value1: '3', value2: 'H100V05001', value3: '더블 락스핀', value4: 'C', value5: 3, value6: 3,
            },
            {
              value1: '4', value2: 'H100V05002', value3: '레니의 대모험(1회)', value4: 'E', value5: 2, value6: 5,
            },
            {
              value1: '5', value2: 'H100V05007', value3: '사파리월드', value4: 'A', value5: 1, value6: 1,
            },
            {
              value1: '6', value2: 'H100V05002', value3: '레니의 대모험(1회)', value4: 'E', value5: 2, value6: 5,
            },
            {
              value1: '7', value2: 'H100V05002', value3: '레니의 대모험(2회)', value4: 'E', value5: 2, value6: 5,
            },
            {
              value1: '8', value2: 'H100V05007', value3: '로스트밸리', value4: 'A', value5: 1, value6: 1,
            },
            {
              value1: '9', value2: 'H100V05002', value3: '매직 쿠키 하우스', value4: 'E', value5: 2, value6: 5,
            },
            {
              value1: '10', value2: 'H100V05007', value3: '사파리 월드', value4: 'A', value5: 1, value6: 1,
            },
          ],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
  },
  mounted() {
  },
  methods: {
    closeModal() { this.modal.close() },
    closed() {},
  },
}
</script>
<style scoped>
</style>
