<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 시설 정보 탭 메뉴-->
      <div class="comm_title_wrap">
        <h4>
          시설 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="영업일자"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
        >
          2022-10-13
        </ur-form-item>
        <ur-form-item
          label="시설명"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          랩터레인저
        </ur-form-item>
        <ur-form-item
          label="시설 카테고리"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          어트랙션, 엔터테이먼트
        </ur-form-item>
        <ur-form-item
          label="Zone 구분"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          유러피언 어드벤처
        </ur-form-item>
        <ur-form-item
          label="가상대기 여부"
          :label-align="'right'"
          style="width:100%; height:auto;"
        >
          일반형
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 시설 정보 탭 메뉴-->

      <!-- S :: 시설 Capa 정보 테이블-->
      <div class="comm_title_wrap mt20">
        <h4>
          시설 Capa 정보
        </h4>
      </div>
      <template>
        <ur-data-grid
          ref="grid"
          :headers="columns"
          :data-source="list"
          :data-set-options="{id: 'id'}"
          :options="opts"
          class="custom_grid_pgeNav_None"
        >
          <template #header>
            <ur-data-grid-header-row>
              <ur-data-grid-header-cell rowspan="2" />
              <ur-data-grid-header-cell
                colspan="2"
                text="Slot 시간"
                align="center"
              />
              <ur-data-grid-header-cell
                colspan="2"
                text="예약 시간"
                align="center"
              />
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
            </ur-data-grid-header-row>
          </template>
        </ur-data-grid>
      </template>
      <!-- E :: 시설 Capa 정보 테이블-->


      <div class="bt1 mt45" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="right_box">
            <ur-button
              color="violet"
            >
              수정
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00016', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      dataSet: new this.$ur.grid.DataSet(),
      opts: {
        height: 450,
        pagination: false,
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
      },

      columns: [
        {
          value: 'value1', text: 'Slot Seq', width: 100, align: 'center',
        },
        {
          value: 'value2',
          text: '시작',
          width: 70,
        },
        { value: 'value3', text: '종료', width: 70 },
        { value: 'value4', text: '시작', width: 70 },
        {
          value: 'value5',
          text: '종료',
          width: 70,
        },
        {
          value: 'value6',
          text: '예약 인원',
          width: 100,
        },
        {
          value: 'value7',
          text: '최소인원(전체)',
          width: 100,
        },
        {
          value: 'value8',
          text: '최소인원(확정)',
          width: 100,
        },
        {
          value: 'value9',
          text: '전체 Capa',
          width: 100,
        },
        {
          value: 'value10',
          text: '사전예약 건수',
          width: 100,
        },
        {
          value: 'value11',
          text: '당일 Capa',
          width: 100,
        },
        {
          value: 'value12', text: '운영 상태', width: 100,
        },
        {
          value: 'value17', text: '추첨결과발표시간', width: 130,
        },
        {
          value: 'value13', text: '등록일시', width: 150,
        },
        {
          value: 'value14', text: '등록자', width: 100,
        },
        {
          value: 'value15', text: '수정일시', width: 150,
        },
        {
          value: 'value16', text: '수정자', width: 100,
        },
      ],

      list: [
        {
          value1: '1', value2: '10:00', value3: '10:15', value4: '09:30', value5: '10:15', value6: '10', value7: '0', value8: '0', value9: '10', value10: '0', value11: '10', value12: '종료', value13: '2022-10-13 15:31:31', value14: 'BJ123', value15: '2022-10-13 15:31:31', value16: 'BJ123', value17: '11:00',
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
  mounted() { },
  methods: {

  },
}
</script>
<style scoped>
</style>
