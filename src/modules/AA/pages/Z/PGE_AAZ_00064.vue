<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 어트랙션 개별예약현황 탭-->
      <ur-form-box toggleable>
        <ur-form-item
          label="회원 ID"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width:100%; height:auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="이용권/레니Pass QR"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width:100%; height:auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="개인티켓 ID"
          class="flex_wrap"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width:100%; height:auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="이용일자"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-range-picker
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day+30"
          />
        </ur-form-item>
        <ur-form-item
          label="시설"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            value=""
            style="width:100%; height:auto;"
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
      <!-- E :: 어트랙션 개별예약현황 탭-->

      <ur-data-grid
        ref="grid"
        class="mt35"
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
        <template #header>
          <ur-data-grid-header-row>
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell
              colspan="3"
              text="Slot 정보"
              align="center"
            />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
          </ur-data-grid-header-row>
          <ur-data-grid-header-row>
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell :expand-resizer="2" />
            <ur-data-grid-header-cell :expand-resizer="2" />
          </ur-data-grid-header-row>
        </template>
      </ur-data-grid>
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
          text: '이용일자',
          value: 'value2',
          width: 100,
        },
        {
          text: '시설명',
          value: 'value3',
          width: 150,
          component: {
            template: '<div><ur-button text="크레이지 좀비 헌트2" style="padding-left:0;" shape="hyperlink"></ur-button></div>',
          },
        },
        { text: '홈페이지 시설코드', value: 'value4', width: 170 },
        { text: '시설 카테고리', value: 'value5', width: 200 },
        { text: 'Zone 구분', value: 'value6', width: 200 },
        { text: '회원 ID', value: 'value7', width: 150 },
        { text: '이용권 QR', value: 'value8', width: 100 },
        { text: '레나 Pass QR', value: 'value9', width: 180 },
        { text: '개인티켓 ID', value: 'value10', width: 100 },
        {
          text: '번호', value: 'value11', width: 150, align: 'center',
        },
        {
          text: '시작시간', value: 'value12', width: 150, align: 'center',
        },
        {
          text: '종료시간', value: 'value13', width: 150, align: 'center',
        },
      ],
      list: [
        {
          value1: '9999', value2: '2022-11-14', value3: '', value4: '3022', value5: '어트랙션, 엔터테인먼트', value6: '유러피언 어드벤처', value7: 'testid123 (회원)', value8: '2022153261', value9: '2211141127481540001', value10: '2022153261', value11: '3', value12: '11:00', value13: '12:00',
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
