<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          label="게시 구분"
          :label-align="'right'"
          style="width: 50%; height: auto; border: 0;"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="공지 구분"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox
            v-model="valueC1"
            sm
          /><span
            class="check_label"
          >일반 공지</span>
          <ur-checkbox
            v-model="valueC2"
            sm
          /><span
            class="check_label"
          >주요 공지</span>
          <ur-checkbox
            v-model="valueC3"
            sm
          /><span
            class="check_label"
          >긴급 공지</span>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="언어 구분"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox
            v-model="valueC4"
            sm
          /><span
            class="check_label"
          >국문</span>
          <ur-checkbox
            v-model="valueC5"
            sm
          /><span
            class="check_label"
          >영문</span>
        </ur-form-item>

        <ur-form-item
          label="노출 여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-checkbox
            v-model="valueC6"
            sm
          /><span
            class="check_label"
          >Y</span>
          <ur-checkbox
            v-model="valueC7"
            sm
          /><span
            class="check_label"
          >N</span>
        </ur-form-item>
        <ur-form-item
          label="게시 위치"
          :label-align="'right'"
          style="width: 50%; height: auto;"
          class="flex_wrap"
        >
          <ur-checkbox
            v-model="valueC8"
            sm
          /><span
            class="check_label"
          >App</span>
          <ur-checkbox
            v-model="valueC9"
            sm
          /><span
            class="check_label"
          >모바일웹</span>
          <ur-checkbox
            v-model="valueC10"
            sm
          /><span
            class="check_label"
          >PC</span>
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
            init="day+30"
          />
        </ur-form-item>
        <ur-form-item
          label="제목"
          :label-align="'right'"
          style="width: 100%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%;"
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
  name: 'PGE_AAZ_00031', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 드롭다운 (게시 구분)
      valueD1: '1',

      // 체크박스
      valueC1: ['일반 공지'],
      valueC2: ['주요 공지'],
      valueC3: ['주요 공지'],
      valueC4: ['주요 공지'],
      valueC5: ['주요 공지'],
      valueC6: ['주요 공지'],
      valueC7: ['주요 공지'],
      valueC8: ['주요 공지'],
      valueC9: ['주요 공지'],
      valueC10: ['주요 공지'],

      // 날짜 범위(date-picker) : 앱 노출 기간
      dateValue1: ['', ''],

      // 테이블
      opts: { // 토탈o
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
      },

      columns: [
        { text: '게시 구분', value: 'value1', width: 120 },
        {
          text: '공지 구분',
          value: 'value2',
          width: 100,
        },
        { text: '언어 구분', value: 'value3', width: 100 },
        {
          text: '제목',
          value: 'value4',
          width: 200,
          component: {
            template: '<div><ur-button text="운영 안내" style="padding-left:0" shape="hyperlink"></ur-button></div>',
          },
        },
        { text: '노출 여부', value: 'value5', width: 100 },
        { text: '노출 순서', value: 'value6', width: 100 },
        { text: '앱 노출 기간', value: 'value7', width: 280 },
        { text: '게시 위치', value: 'value8', width: 150 },
        { text: '등록일시', value: 'value9', width: 200 },
        { text: '등록자', value: 'value10', width: 100 },
        { text: '수정일시', value: 'value11', width: 200 },
        { text: '수정자', value: 'value12' },
      ],
      list: [
        {
          value1: '에버랜드', value2: '일반 공지', value3: '국문', value4: '', value5: 'N', value6: '1', value7: '2022-10-13 15:35:35 ~ 2022-11-13 22:00', value8: 'PC', value9: '2022-10-13 15:35:35', value10: 'BJ123', value11: '2022-10-13 15:35:35', value12: 'BJ123',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // 드랍다운 (게시 구분)
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '에버랜드' })
      rtn.push({ value: '3', text: '캐리비안베이' })
      rtn.push({ value: '4', text: '홈브리지' })
      rtn.push({ value: '5', text: '스피드웨이' })
      rtn.push({ value: '6', text: '채용' })
      rtn.push({ value: '7', text: '정기권' })
      return rtn
    },
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
