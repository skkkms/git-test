<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 게임 마스터 관리 탭-->
      <ur-form-box toggleable>
        <ur-form-item
          label="게임코드"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            style="width:100%; height:auto"
            value=""
          />
        </ur-form-item>
        <ur-form-item
          label="이벤트 명"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            style="width:100%; height:auto"
            value=""
          />
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          class="flex_wrap"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox
            v-model="valueC1"
            sm
          /><span
            class="check_label"
          >Y</span><ur-checkbox
            v-model="valueC2"
            sm
          /><span
            class="check_label"
          >N</span>
        </ur-form-item>
        <ur-form-item
          label="게시 기간"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-range-picker
            v-model="dateValue1"
            auto-confirm
            input-type="YYYY-MM-DD"
            style="height:auto"
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
      <!-- E :: 게임 마스터 관리 탭-->

      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None mt35"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />
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
  name: 'PGE_AAZ_00088', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {

      // 체크박스
      valueC1: ['Y'],
      valueC2: ['N'],

      // 게시 기간 date-picker
      dateValue1: ['2022-10-13', '2022-11-13'],

      // 테이블
      opts: { // 토탈o
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
      },

      columns: [
        { text: '게시 구분', value: 'value1', width: 100 },
        {
          text: '게임 코드',
          value: 'value2',
          width: 100,
        },
        {
          text: '이벤트 명',
          value: 'value3',
          width: 150,
          component: {
            template: '<div><ur-button text="미니게임1" style="padding-left:0;" shape="hyperlink"></ur-button></div>',
          },
        },
        { text: '노출 여부', value: 'value4', width: 120 },
        { text: '게시 기간', value: 'value5', width: 300 },
        { text: '등록일시', value: 'value6', width: 200 },
        { text: '등록자', value: 'value7', width: 100 },
        { text: '수정일시', value: 'value8', width: 200 },
        { text: '수정자', value: 'value9' },
      ],
      list: [
        {
          value1: '공통', value2: 'GAME123', value3: '', value4: 'Y', value5: '2020-10-13 10:00 ~ 2022-11-13 22:00', value6: '2022-10-13 15:35:35', value7: 'BJ123', value8: '2022-10-13 15:35:35', value9: 'BJ123',
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
