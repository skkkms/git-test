<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          label="이벤트 명"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%;"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="노출 여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox
            v-model="valueC1"
            sm
          /><span
            class="check_label"
          >Y</span>
          <ur-checkbox
            v-model="valueC2"
            sm
          /><span
            class="check_label"
          >N</span>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="이벤트 기간"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-range-picker
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day+30"
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
  name: 'PGE_AAZ_00076', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 드롭다운
      valueD1: '1',
      valueD2: '1',
      valueD3: '1',

      // 체크박스
      valueC1: ['Y'],
      valueC2: ['N'],

      // 테이블
      opts: { // 토탈o
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
      },

      columns: [
        {
          text: '이벤트 명',
          value: 'value1',
          component: {
            template: '<div><ur-button shape="hyperlink">1월OX퀴즈</ur-button></div>',
          },
        },
        { text: '노출 여부', value: 'value2' },
        { text: '이벤트 기간', value: 'value3', width: '300px' },
        { text: '등록일시', value: 'value4' },
        { text: '등록자', value: 'value5' },
        { text: '수정일시', value: 'value6' },
        { text: '수정자', value: 'value7' },
      ],
      list: [
        {
          value1: '2023 미션', value2: 'Y', value3: '2022-10-13 10:00 ~ 2022-11-13 22:00', value4: '2022-10-13 15:35:35', value5: 'BJ123', value6: '2022-10-13 15:35:35', value7: 'BJ123',
        },
      ],
    }
  },
  computed: {

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
