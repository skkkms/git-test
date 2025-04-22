<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          label="맵핑코드"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            style="width: 100%;"
            value=""
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>
            초기화
          </ur-button>
          <ur-button
            color="violet"
          >
            검색
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
      />
      <sui-page-footer>
        <div class="comm_btn_wrap" />
        <div class="btn_wrap mt10">
          <div class="right_box">
            <ur-button>
              삭제
            </ur-button>
            <ur-button
              color="violet"
            >
              신규등록
            </ur-button>
            <ur-button
              color="violet"
            >
              저장
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>
import P01 from './components/PGE_AAZ_00021_P01.vue'

export default {
  name: 'PGE_AAZ_00137', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
  },
  data() {
    return {
      // 드롭다운
      valueD1: '1',


      // 체크박스
      valueC1: ['Y'],
      valueC2: ['N'],
      valueC3: ['방문 전'],
      valueC4: ['방문 중'],
      valueC5: ['방문 후'],
      valuePC1: ['첫방문'],
      valuePC2: ['재방문'],


      opts: { // 토탈o
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
      },


      columns: [
        {
          value: 'value1',
          required: true,
          text: '맵핑코드',
          component: {
            template: '<div><ur-text-field mark="time" value="" style="width:100%; height:auto;"/></div>',
          },
        },
        {
          required: true,
          text: '가상대기 그룹',
          value: 'value2',

          component: {
            template: '<div><ur-checkbox v-model="valueT1C1" sm/><span class="check_label" >A</span><ur-checkbox v-model="valueT1C1" sm/><span class="check_label" >B</span><ur-checkbox v-model="valueT1C3" sm/><span class="check_label" >C</span><ur-checkbox v-model="valueT1C4" sm/><span class="check_label" >D</span><ur-checkbox v-model="valueT1C5" sm/><span class="check_label" >E</span></div>',
          },
        },
        { text: '등록일시', value: 'value3', width: 150 },
        { text: '등록자', value: 'value4', width: 100 },
        { text: '수정일시', value: 'value5', width: 150 },
        { text: '수정자', value: 'value6', width: 100 },
      ],
      list: [
        {
          value1: '', value2: '', value3: '2022-10-13 15:35:35', value4: 'BJ123', value5: '2022-10-13 15:35:35', value6: 'BJ123',
        },
      ],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 드롭다운
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '추천코스' })
      rtn.push({ value: '3', text: '기본 상품' })
      rtn.push({ value: '4', text: '이용권 상품' })
      rtn.push({ value: '5', text: '체험 상품' })
      rtn.push({ value: '6', text: '편의 상품' })
      rtn.push({ value: '7', text: '이용 꿀팁' })
      rtn.push({ value: '8', text: '이달의 혜택' })
      rtn.push({ value: '9', text: '시설' })
      return rtn
    },

    // modalpopup
    modalP01() {
      return this.$refs.modal
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
    openModalP01() { this.modalP01.open() },
    closeModal() { this.modalP01.close() },
    closed() {},
  },
}
</script>
<style scoped>
</style>
