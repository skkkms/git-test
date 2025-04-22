<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 개인티켓 오류등록 현황 탭-->
      <ur-form-box toggleable>
        <ur-form-item
          label="등록일자"
          :label-align="'right'"
          style="width: 60%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-picker
            v-model="dateValue1"
            auto-confirm
            style="height: auto;"
            init="today"
          />
        </ur-form-item>
        <ur-form-item
          label="회원 UID"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            style="width:100%; height:auto;"
            value=""
          />
        </ur-form-item>
        <ur-form-item
          label="홈페이지 ID"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            style="width:100%; height:auto;"
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
      <!-- E :: 개인티켓 오류등록 현황 탭-->


      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None mt45"
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
      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="right_box">
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

export default {
  name: 'PGE_AAZ_00069', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 등록일자 date-picker
      dateValue1: ['', ''],

      // 테이블
      opts: { // 토탈o
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
          text: '등록일자',
          value: 'value2',
          width: 150,
        },
        {
          text: '회원UID',
          value: 'value3',
          width: 200,
          component: {
            template: '<div><ur-button text="EVER30008220811" style="padding-left:0;" shape="hyperlink"></ur-button></div>',
          },
        },
        {
          text: '홈페이지 ID',
          value: 'value4',
          width: 200,
        },
        {
          text: '실패횟수',
          value: 'value5',
          width: 150,
        },
        {
          required: true,
          text: '분류',
          value: 'value6',
          component: {
            template: '<div><ur-radio sm v-model="T1R1" value="Radio 01">Y</ur-radio><ur-radio sm v-model="T1R1" value="Radio 02">N</ur-radio></div>',
          },
        },
        {
          text: '최종 수정일시',
          value: 'value7',
        },
      ],
      list: [
        {
          value1: '10', value2: '2022-11-18', value3: '', value4: 'testestest2', value5: '10', value6: '', value7: '2022-11-18 09:13:57',
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
