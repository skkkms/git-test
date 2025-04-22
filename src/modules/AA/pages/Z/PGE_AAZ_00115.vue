<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 호출명-->
      <ur-form-box toggleable>
        <ur-form-item
          label="호출명"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            style="width:100%; height:auto"
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
      <!-- E :: 호출명-->

      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None mt35"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :data-set-options="{id: 'id'}"
      >
        <template #right-info>
          <ur-button>
            <ur-icon
              icon="download"
              icon-type="line"
              size="small"
              spacing
            />
            엑셀다운로드
          </ur-button>
        </template>
      </ur-data-grid>
      <div class="btn_wrap mt10">
        <div class="right_box">
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
  name: 'PGE_AAZ_00115', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 테이블
      opts: { // 토탈o
        height: 450,
        pagination: true,
        noInfo: false,
      },

      columns: [
        { text: '호출구분', value: 'value1', width: 100 },
        {
          text: '호출명',
          value: 'value2',
          width: 150,
          component: {
            template: '<div><ur-button text="시설동기화(전체)" style="padding-left:0;" shape="hyperlink"></ur-button></div>',
          },
        },
        { text: '호출설명', value: 'value3', width: 300 },
        { text: '사용여부', value: 'value4', width: 100 },
        { text: '등록일시', value: 'value5', width: 150 },
        { text: '등록자', value: 'value6', width: 100 },
        { text: '수정일시', value: 'value7', width: 150 },
        { text: '수정자', value: 'value8' },
      ],
      list: [
        {
          value1: '1', value2: '', value3: 'EMS-시설마스터조회에서 홈페이지 시설 동기화 버튼을 통해 호출되', value4: '사용', value5: '2019-01-01 00:00:00', value6: 'BIXBY', value7: '2019-01-01 00:00:00', value8: 'BIXBY',
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
