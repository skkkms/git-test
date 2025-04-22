<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 운영실적 지표조회 탭-->
      <ur-form-box toggleable>
        <ur-form-item
          label="이용일"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-picker
            v-model="dateValue1"
            auto-confirm
            style="height: auto;"
            init="today"
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
      <!-- E :: 운영실적 지표조회 탭-->

      <ur-data-grid
        ref="grid"
        class="mt35"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00068', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {


      // 이용일 date-picker
      dateValue1: ['', ''],

      // 테이블
      opts: { // 토탈o
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },

      columns: [
        {
          text: 'No.', value: 'value1', width: 100, align: 'center',
        },
        {
          text: 'TITLE',
          value: 'value2',
          width: 500,
        },
        {
          text: '지난 건수 (2022.11.30)',
          value: 'value3',
          width: 350,
        },
        {
          text: '당일 건수 (2022.12.01)',
          value: 'value4',
        },
      ],
      list: [
        {
          value1: '10', value2: '05.홈페이지 회원 中 APP 등록 회원 수', value3: '36537', value4: '36537',
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
  },
}
</script>
<style scoped>
</style>
