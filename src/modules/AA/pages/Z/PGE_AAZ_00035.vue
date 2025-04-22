<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <!-- S :: 할인혜택 관리 탭 메뉴-->
      <ur-form-box toggleable>
        <ur-form-item
          label="게시 구분"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
          />
        </ur-form-item>
        <ur-form-item
          label="혜택 분류"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          <ur-dropdown
            v-model="valueD2"
            :items="itemsD2"
          />
        </ur-form-item>
        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          style="width:50%; height:auto;"
          class="flex_wrap"
        >
          <ur-checkbox
            v-model="valueC4"
            sm
          />
          <span class="check_label">Y</span>
          <ur-checkbox
            v-model="valueC5"
            sm
          />
          <span class="check_label">N</span>
        </ur-form-item>
        <ur-form-item
          label="앱 노출 기간"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-range-picker
            v-model="dateValue1"
            auto-confirm
            input-type="YYYY-MM-DD"
            init="day-30"
          />
        </ur-form-item>
        <ur-form-item
          label="제목"
          :label-align="'right'"
          style="width:100%; height:auto;"
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
          <ur-button color="violet">
            검색
          </ur-button>
        </div>
      </div>
      <!-- E :: 시설 정보 탭 메뉴-->

      <!-- S :: 세부 예약 현황 테이블-->
      <template>
        <ur-data-grid
          ref="grid"
          :headers="columns01"
          :data-source="list01"
          :data-set-options="{id: 'id'}"
          :options="opts"
          class="custom_grid_pgeNav_None mt45"
        />
      </template>
      <!-- E :: 세부 예약 현황 테이블-->


      <div class="bt1 mt45" />
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
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00018', // eslint-disable-line vue/name-property-casing
  components: {

  },
  data() {
    return {
      valueD1: '1',
      valueD2: '1',

      valueC4: ['Y'],
      valueC5: ['N'],

      dataSet: new this.$ur.grid.DataSet(),
      opts: {
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
      },

      columns01: [
        {
          value: 'value1', text: '게시 구분', width: 150, align: 'center',
        },
        {
          value: 'value2',
          text: '혜택 분류',
          width: 200,
        },
        {
          value: 'value3',
          text: '제목',
          width: 400,
          component: {
            template: '<div><ur-button style="padding-left:0;" shape="hyperlink">KT 멤버십 본인 50%</ur-button></div>',
          },
        },
        { value: 'value4', text: '노출 여부', width: 120 },
        {
          value: 'value5',
          text: '노출 순서',
          width: 120,
        },
        {
          value: 'value6',
          text: '앱 노출 기간',
          width: 300,
        },
        {
          value: 'value7', text: '등록일시', width: 150,
        },
        {
          value: 'value8', text: '등록자', width: 100,
        },
        {
          value: 'value9', text: '수정일시', width: 150,
        },
        {
          value: 'value10', text: '수정자', width: 100,
        },
      ],

      list01: [
        {
          value1: '에버랜드', value2: '할인정보', value3: '', value4: 'N', value5: '1', value6: '2022-10-13 10:00 ~ 2022-11-13 22:00', value7: '2022-10-13 15:31:31', value8: 'BJ123', value9: '2022-10-13 15:31:31', value10: 'BJ123',
        },
      ],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // 게시 구분 드랍다운 데이터
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '에버랜드' })
      rtn.push({ value: '3', text: '캐리비안베이' })
      return rtn
    },

    // 혜택 분류 드랍다운 데이터
    itemsD2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '할인정보' })
      rtn.push({ value: '3', text: '제휴카드' })
      rtn.push({ value: '4', text: '스페셜 패키지' })
      rtn.push({ value: '5', text: '정기권 제휴 혜택' })
      rtn.push({ value: '6', text: '드림투어' })
      rtn.push({ value: '7', text: '체험프로그램' })
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
