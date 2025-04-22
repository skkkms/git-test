<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        일별 큐레이션 일괄 생성
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
        <ur-form-box toggleable>
          <ur-form-item
            label="기준일자"
            :label-align="'right'"
            required
            style="width: 100%; height: auto;"
          >
            <ur-date-picker
              auto-confirm
              input-type="YYYY-MM-DD"
              init="day+30"
            />
          </ur-form-item>
          <ur-form-item
            label="퍼소나 유형"
            :label-align="'right'"
            required
            style="width: 100%; height: auto;"
            class="flex_wrap"
          >
            <ur-text-field
              value=""
              style="width: 50%;"
            />
            <ur-icon-button
              icon="search"
              icon-type="line"
              color="primary"
              @click="openModalP01"
            />
            <!-- S:: 퍼소나 유형 MODAL -->
            <ur-modal
              ref="modal"
              class="modal-b1c6"
              large
              title="퍼소나 유형"
              @closed="closed"
            >
              <P01 />
            </ur-modal>
            <!-- E:: 퍼소나 유형 MODAL -->
          </ur-form-item>
          <ur-form-item
            label="생성일자"
            :label-align="'right'"
            required
            style="width: 100%; height: auto;"
          >
            <ur-range-picker
              auto-confirm
              input-type="YYYY-MM-DD"
              init="day+30"
            />
          </ur-form-item>
        </ur-form-box>
        <span class="subscript_txt">*기준일자에 적용되어 있는 큐레이션 정보가 선택한 생성일자로 동일하게 생성됩니다.</span>
        <!-- ::E 콘텐츠1 -->
      </div>
    </template>
    <template>
      <div class="comm_btn_wrap">
        <div class="right_box">
          <ur-button @click="closeModal">
            닫기
          </ur-button>
          <ur-button color="violet">
            저장
          </ur-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import P01 from './PGE_AAZ_00021_P01.vue'


export default {
  name: 'PGE_AAZ_00029_P01', // eslint-disable-line vue/name-property-casing
  components: {
    P01,
  },
  data() {
    return {
      // 코스팝업드랍다운
      valueT1D1: '1',
      options: { // 토탈 X
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },
      // 팝업라디오버튼
      P1R1: null,
      P1R2: null,

      // 코스팝업테이블
      columnsP1T1: [
        { text: 'No.', value: 'value1', width: 40 },
        {
          text: '분류',
          value: 'value2',
          required: true,
          component: {
            template: '<div><ur-dropdown v-model="valueT1D1" :items="itemsT1D1"/></div>',
          },
        },
        {
          text: '항목',
          value: 'value3',
          required: true,
          component: {
            template: '<div><ur-dropdown v-model="valueT1D1" :items="itemsT1D1"/></div>',
          },
        },
        {
          text: '조건',
          value: 'value4',
          required: true,
          component: {
            template: '<div><ur-dropdown v-model="valueT1D1" :items="itemsT1D1"/></div>',
          },
        },
        {
          text: '입력 값',
          value: 'value5',
          required: true,
          component: {
            template: '<div><ur-text-field value="" style="width: 100%;"/></div>',
          },
        },
      ],

      listP1T1: [
        {
          value1: '1', value2: '어린이날 코스 1', value3: '123456', value4: '1~4세', value5: '여유와 힐링', value6: '롤링 엑스 트레인, T 익스프레스, Cafe 정글 캠프,...',
        },

      ],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 코스팝업 드랍다운 1
    itemsP1D1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '1~4세' })
      rtn.push({ value: '3', text: '유치원' })
      rtn.push({ value: '4', text: '초등저' })
      rtn.push({ value: '5', text: '초등고' })
      rtn.push({ value: '6', text: '중등이상' })
      rtn.push({ value: '7', text: '이성친구 포함' })
      rtn.push({ value: '8', text: '동성친구' })
      rtn.push({ value: '9', text: '연인(부부)' })
      return rtn
    },
    // 코스팝업 드랍다운 2
    itemsP1D2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '다양하게 풀코스' })
      rtn.push({ value: '3', text: '기다리는게 제일 싫어' })
      rtn.push({ value: '4', text: '놀이기구 홀릭' })
      rtn.push({ value: '5', text: '여유와 힐링' })
      rtn.push({ value: '6', text: '놀면서 배우자' })
      rtn.push({ value: '7', text: '새로운게 좋아' })
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
  },
}
</script>
<style scoped>
</style>
