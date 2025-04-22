<template>
  <div>
    <template slot="title">
      <div class="modal-title mb45">
        콘텐츠관리-스마트예약
      </div>
    </template>
    <template>
      <div class="modal-body">
        <!-- ::S 콘텐츠1 -->
        <ur-form-box toggleable>
          <ur-form-item
            label="파크구분"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-dropdown
              v-model="valueP3D2"
              :items="itemsP3D2"
            />
          </ur-form-item>
          <ur-form-item
            label="상품 유형"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-dropdown
              v-model="valueP3D1"
              :items="itemsP3D1"
            />
          </ur-form-item>
          <ur-form-item
            label="기간"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-range-picker
              auto-confirm
              input-type="YYYY-MM-DD"
              init="day+30"
            />
          </ur-form-item>
          <ur-form-item
            label="상품 명"
            :label-align="'right'"
            style="width: 50%; height: auto;"
          >
            <ur-text-field
              value=""
              style="width: 100%;"
            />
          </ur-form-item>
        </ur-form-box>
        <div class="btn_wrap mt10">
          <div class="right_box">
            <ur-button>
              초기화
            </ur-button>
            <ur-button color="violet">
              검색
            </ur-button>
          </div>
        </div>
        <!-- ::E 콘텐츠1 -->

        <!-- ::S 콘텐츠2 -->
        <ur-data-grid
          ref="grid"
          :headers="columnsP3T1"
          :data-source="listP3T1"
          :options="opts"
          :data-set-options="{id: 'id'}"
        />
        <!-- ::E 콘텐츠2 -->
      </div>
    </template>
    <template>
      <div class="comm_btn_wrap bt1">
        <div class="right_box mt10">
          <ur-button @click="closeModalP03">
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
export default {
  name: 'PGE_AAZ_00022_P03', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 스마트예약팝업드랍다운
      valueP3D1: '1',
      opts: { // 토탈 O
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },
      // 스마트예약팝업테이블
      columnsP3T1: [
        { text: 'No.', value: 'value1', width: 40 },
        { text: '상품 유형', value: 'value2', width: 100 },
        { text: '상품 명', value: 'value3' },
        { text: '기간', value: 'value4' },
      ],

      listP3T1: [
        {
          value1: '1', value2: '입장하기', value3: '키즈패키지 2인권 스마트예약/현장매표소 (~12월)', value4: '2022.06.01~2022.12.31',
        },
        {
          value1: '2', value2: '입장하기', value3: '에버랜드 2/3/4인 세트권 스마트예약 한정 (~12월)', value4: '2022.06.01~2022.12.31',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 스마트예약팝업 드랍다운 1
    itemsP3D1() {
      const rtn = []
      rtn.push({ value: '1', text: '' })
      rtn.push({ value: '2', text: '' })
      rtn.push({ value: '3', text: '' })
      rtn.push({ value: '4', text: '' })
      return rtn
    },
    itemsP3D2() {
      const rtn = []
      rtn.push({ value: '1', text: '' })
      rtn.push({ value: '2', text: '' })
      rtn.push({ value: '3', text: '' })
      rtn.push({ value: '4', text: '' })
      rtn.push({ value: '5', text: '' })
      return rtn
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
    closeModalP03() { },
  },
}
</script>
<style scoped>
</style>
