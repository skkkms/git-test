<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          label="블리스 명"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="이벤트 기간"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-range-picker
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day-30"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
          <ur-button>초기화</ur-button>
          <ur-button color="violet">
            검색
          </ur-button>
        </div>
      </div>
      <ur-data-grid
        ref="grid"
        :headers="columnsT1"
        :data-source="listT1"
        :data-set-options="{id: 'id'}"
        :options="opts"
        class="custom_grid_pgeNav_None mt35"
      />
      <div class="bt1 mt45">
        <sui-page-footer class="comm_btn_wrap">
          <div class="btn_wrap">
            <div class="right_box">
              <ur-button>
                삭제
              </ur-button>
              <ur-button
                color="violet"
              >
                신규 등록
              </ur-button>
            </div>
          </div>
        </sui-page-footer>
      </div>
    </sui-page-contents>
  </sui-page>
</template>
<script>
export default {
  name: 'PGE_AAZ_00127', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      opts: {
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
      },
      columnsT1: [
        {
          text: '블리스 명',
          value: 'value1',
          component: {
            template: '<div><ur-button shape="hyperlink">2023블리스</ur-button></div>',
          },
        },
        { text: '이벤트 기간', value: 'value2', width: '300px' },
        { text: '등록일시', value: 'value3' },
        { text: '등록자', value: 'value4' },
        { text: '수정일시', value: 'value5' },
        { text: '수정자', value: 'value6' },
      ],
      listT1: [
        {
          value1: '2023 미션', value2: '2022-10-13 10:00 ~ 2022-11-13 22:00', value3: '2022-10-13 15:35:35', value4: 'BJ123', value5: '2022-10-13 15:35:35', value6: 'BJ123',
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
