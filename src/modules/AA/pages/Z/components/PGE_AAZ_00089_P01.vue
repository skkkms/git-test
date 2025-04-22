<template>
  <div>
    <template slot="title">
      <div class="modal-title">
        참여 조건 정보 설정
      </div>
    </template>
    <template>
      <div class="modal-body">
        <ur-form-box toggleable>
          <ur-form-item
            label="설정 분류"
            :label-align="'right'"
            required
            style="width:100%;"
          >
            <ur-radio
              v-model="P1R1"
              value="Radio01"
              sm
            >
              조건 설정
            </ur-radio>
          </ur-form-item>
          <ur-form-item
            label="조건 구분"
            :label-align="'right'"
            required
            style="width: 100%; height: auto;"
          >
            <ur-radio
              v-model="P1R2"
              value="Radio01"
              sm
            >
              AND
            </ur-radio>
            <ur-radio
              v-model="P1R2"
              value="Radio02"
              sm
            >
              OR
            </ur-radio>
          </ur-form-item>
        </ur-form-box>
        <div class="comm_title_wrap">
          <h4 class="pr16">
            조건 정보
          </h4>
          <div class="title_compo">
            <ur-button color="violet">
              추가
            </ur-button>
            <ur-button color="violet">
              삭제
            </ur-button>
            <ur-button color="violet">
              초기화
            </ur-button>
          </div>
        </div>

        <ur-data-grid
          ref="grid"
          :headers="columnsP1T1"
          :options="opts1"
          :data-source="listP1T1"
          :data-set-options="{id: 'id'}"
        />
      </div>
    </template>
    <template>
      <div class="btn_wrap">
        <div class="right_box">
          <ur-button
            color="violet"
            @click="closeModalP01"
          >
            닫기
          </ur-button>
          <ur-button
            color="violet"
            solid
          >
            저장
          </ur-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'PGE_AAZ_00052_P01', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      itemsP1D1: [
        { value: '1', text: '선택1' },
        { value: '2', text: '선택2' },
        { value: '3', text: '선택3' },
        { value: '4', text: '선택4' },
      ],
      itemsP1D2: [
        { value: '1', text: '선택1' },
        { value: '2', text: '선택2' },
        { value: '3', text: '선택3' },
        { value: '4', text: '선택4' },
      ],
      itemsP1D3: [
        { value: '1', text: '선택1' },
        { value: '2', text: '선택2' },
        { value: '3', text: '선택3' },
        { value: '4', text: '선택4' },
      ],


      P1R1: null,
      P1R2: null,

      // 테이블 옵션
      opts1: { // 토탈 x 전체선택X 셀선택 o
        noInfo: true,
        multiSelect: false,
      },

      // 조건 정보 테이블
      columnsP1T1: [
        {
          text: 'No.', value: 'value1', width: 80,
        },
        {
          required: true,
          text: '분류',
          value: 'value2',
          width: 130,
          type: 'code',
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code1" :items="me.itemsP1D1"/></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '항목',
          value: 'value3',
          width: 200,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code2" :items="me.itemsP1D2"/></div>',
            data() {
              return {
                code2: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '조건',
          value: 'value4',
          width: 160,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div><ur-dropdown v-model="code3" :items="me.itemsP1D3"/></div>',
            data() {
              return {
                code3: this.value,
              }
            },
          },
        },
        {
          required: true,
          text: '입력 값',
          value: 'value5',
          width: 310,
          component: {
            props: ['row', 'value', 'text'],
            template: '<div><ur-text-field v-model="text1" style="width:90%" /></div>',
            data() {
              return {
                text1: this.value,
              }
            },
          },
        },
      ],
      listP1T1: [
        {
          value1: 1,
          value2: '1',
          value3: '1',
          value4: '1',
          value5: 'First Line',
        },
        {
          value1: 2,
          value2: '1',
          value3: '1',
          value4: '1',
          value5: 'Second Line',
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
    closeModalP01() {},

    onToggle(isShown) {
      if (!isShown) {
        console.log(this.$refs.dropdown.getSelectedItem())
      }
    },
  },
}
</script>
<style scoped>
</style>
