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
          추첨형
        </ur-form-item>
      </ur-form-box>
      <!-- E :: 시설 정보 탭 메뉴-->

      <!-- S :: 시설 Capa 정보 테이블-->
      <!-- S:: 타이틀 버튼 양쪽 -->
      <div class="comm_btn_wrap">
        <div class="comm_title_wrap">
          <h4>
            시설 Capa 정보
          </h4>
        </div>
        <div class="left_box pl16">
          <ur-button color="violet">
            추가
          </ur-button>
          <ur-button color="violet">
            삭제
          </ur-button>
          <ur-button color="violet">
            초기화
          </ur-button>
        </div>
        <div class="right_box">
          <ur-button color="violet">
            강제매진
          </ur-button>
        </div>
      </div>
      <!-- E:: 타이틀 버튼 양쪽 -->

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
          </ur-data-grid-header-row>
        </template>
      </ur-data-grid>
      <!-- E :: 시설 Capa 정보 테이블-->


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
  name: 'PGE_AAZ_00016', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {

      // 드랍다운
      valueT1D1: null,

      dataSet: new this.$ur.grid.DataSet(),

      opts: {
        noInfo: true,
        multiSelect: false,
        selectCheck: false,
        noBaseInfo: true,
      },

      columns: [
        {
          value: 'value1',
          text: '마지막 슬롯 구분',
          width: 150,
          align: 'center',
          component: {
            template: '<div><ur-radio style="display: block;" sm/></div>',
          },
        },
        {
          value: 'value2',
          text: 'Slot Seq',
          width: 110,
          component: {
            template: '<div><ur-text-field style="width:100%; height:auto;" value="8" /></div>',
          },
        },
        {
          value: 'value3',
          text: '시작',
          required: true,
          width: 110,
          component: {
            template: '<div><ur-text-field disabled mask="time" style="width:100%; height:auto;" value="" /></div>',
          },
        },
        {
          value: 'value4',
          text: '종료',
          required: true,
          width: 110,
          component: {
            template: '<div><ur-text-field mask="time" style="width:100%; height:auto;" value="" /></div>',
          },
        },
        {
          value: 'value5',
          text: '시작',
          required: true,
          width: 110,
          component: {
            template: '<div><ur-text-field mask="time" style="width:100%; height:auto;" value="" /></div>',
          },
        },
        {
          value: 'value6',
          text: '종료',
          required: true,
          width: 110,
          component: {
            template: '<div><ur-text-field disabled mask="time" style="width:100%; height:auto;" value="" /></div>',
          },
        },
        {
          value: 'value7',
          text: '예약 인원',
          width: 110,
        },
        {
          value: 'value8',
          text: '최소인원(전체)',
          width: 110,
        },
        {
          value: 'value9',
          text: '최소인원(확정)',
          width: 110,
        },
        {
          value: 'value10',
          text: '전체 Capa',
          width: 110,
        },
        {
          value: 'value11',
          text: '사전예약 건수',
          width: 110,
        },
        {
          value: 'value12',
          text: '당일 Capa',
          required: true,
          width: 110,
          component: {
            template: '<div><ur-text-field style="width:100%; height:auto;" value="10" /></div>',
          },
        },
        {
          value: 'value13',
          text: '운영 상태',
          component: {
            template: '<div><ur-dropdown v-model="valueT1D1" :items="itemsT1D1" style="width:100%;"/></div>',
          },
        },
        {
          value: 'value14',
          text: '추첨결과발표시간',
          width: 130,
          component: {
            template: '<div><ur-text-field style="width:100%; height:auto;" value="11:00" /></div>',
          },
        },
      ],

      list: [
        {
          value1: '', value2: '', value3: '', value4: '', value5: '', value6: '', value7: '-', value8: '-', value9: '-', value10: '10', value11: '-', value12: '10', value13: '', value14: '',
        },
      ],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // 하위 공통코드 정보 드랍다운 테이블 데이터
    itemsT1D1() {
      const rtn = []
      rtn.push({ value: '1', text: '정상(대기중/예약가능)' })
      return rtn
    },


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
