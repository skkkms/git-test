<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 이용권 현황 탭-->
      <ur-form-box toggleable>
        <ur-form-item
          label="회원 ID"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width:100%; height:auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="QR 코드"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width:100%; height:auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="조회구분"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-radio
            v-model="R1"
            value="Radio 01"
            sm
          >
            당일
          </ur-radio>
          <ur-radio
            v-model="R1"
            value="Radio 02"
            sm
          >
            이력
          </ur-radio>
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
      <!-- E :: 이용권 현황 탭-->

      <ur-data-grid
        ref="grid"
        class="mt35"
        :headers="columns"
        :data-source="list"
        :options="opts"
        :data-set-options="{id: 'id'}"
      >
        <template #header>
          <ur-data-grid-header-row>
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell
              colspan="2"
              text="유효기간"
              align="center"
            />
            <ur-data-grid-header-cell
              colspan="4"
              text="사용정보"
              align="center"
            />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell
              colspan="2"
              text="연간회원정보"
              align="center"
            />
            <ur-data-grid-header-cell
              colspan="3"
              text="입장정보"
              align="center"
            />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
            <ur-data-grid-header-cell rowspan="2" />
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
      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="right_box">
          <ur-button>
            삭제
          </ur-button>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00066', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 라디오 (조회 구분)
      R1: 'Radio 01',

      // 테이블
      opts: { // 토탈o
        height: 400,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
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
          text: '개인티켓 ID',
          value: 'value3',
          width: 150,

        },
        {
          text: 'QR 코드',
          value: 'value4',
          width: 120,
          component: {
            template: '<div><ur-button text="2022073624" style="padding-left:0;" shape="hyperlink"></ur-button></div>',
          },
        },
        { text: '회원 ID', value: 'value5', width: 100 },
        {
          text: '시작일자', value: 'value6', width: 100, align: 'center',
        },
        {
          text: '종료일자', value: 'value7', width: 100, align: 'center',
        },
        {
          text: '사용구분', value: 'value8', width: 120, align: 'center',
        },
        {
          text: '연속 사용일수', value: 'value9', width: 120, align: 'center',
        },
        {
          text: '연령구분', value: 'value10', width: 120, align: 'center',
        },
        {
          text: '입장시간', value: 'value11', width: 120, align: 'center',
        },
        {
          text: '판매금액', value: 'value12', width: 130,
        },
        {
          text: '티켓EP여부', value: 'value13', width: 130,
        },
        {
          text: '회원유무', value: 'value14', width: 100, align: 'center',
        },
        {
          text: '회원명', value: 'value15', width: 100, align: 'center',
        },
        {
          text: '입장여부', value: 'value16', width: 120, align: 'center',
        },
        {
          text: '입장일자', value: 'value17', width: 120, align: 'center',
        },
        {
          text: '입장시간', value: 'value18', width: 120, align: 'center',
        },
        {
          text: '푸시전송일자', value: 'value19', width: 150,
        },
        {
          text: '이관 가능 여부', value: 'value20', width: 150,
        },
        {
          text: '등록일시', value: 'value21', width: 150,
        },
        {
          text: '등록자', value: 'value22', width: 150,
        },
        {
          text: '수정일시', value: 'value23', width: 150,
        },
        {
          text: '수정자', value: 'value24', width: 150,
        },
      ],
      list: [
        {
          value1: '10', value2: '2022-11-27', value3: '2020073624', value4: '', value5: 'ara0350', value6: '-', value7: '2022-11-26', value8: '이용권', value9: '0', value10: '대인', value11: '종일', value12: '0', value13: 'Y', value14: 'Y', value15: '조아라', value16: 'N', value17: '-', value18: '-', value19: '-', value20: 'N', value21: '2022-03-08 14:03:24', value22: 'EVER30009968126', value23: '2022-10-07 14:03:24', value24: 'Applyeodpticketlist',
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
