<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          label="게시판 분류"
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
          label="앱 노출 기간"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-range-picker
            v-model="dateValue1"
            auto-confirm
          />
        </ur-form-item>

        <ur-form-item
          label="제목"
          :label-align="'right'"
          style="width: 50%; height: auto;"
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
  name: 'PGE_AAZ_00039', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 드롭다운
      valueD1: '1',

      // 날짜 범위(date-picker)
      dateValue1: ['2022-10-13', '2022-11-13'],

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
        { text: '게시판 분류', value: 'value1', width: 150 },
        {
          text: '제목',
          value: 'value2',
          width: 300,
          component: {
            template: '<div><ur-button text="2022 크리스마스 판타지" style="padding-left:0" shape="hyperlink"></ur-button></div>',
          },
        },
        { text: '노출 여부', value: 'value3', width: 100 },
        { text: '노출 순서', value: 'value4', width: 100 },
        { text: '앱 노출 기간', value: 'value5', width: 280 },
        { text: '등록일시', value: 'value6', width: 200 },
        { text: '등록자', value: 'value7', width: 100 },
        { text: '수정일시', value: 'value8', width: 200 },
        { text: '수정자', value: 'value9' },
      ],
      list: [
        {
          value1: "Editor's Pick", value2: '2022 크리스마스 판타지', value3: 'Y', value4: '3', value5: '2022-10-13 10:00 ~ 2022-11-13 22:00', value6: '2022-10-13 15:35:35', value7: 'BJ123', value8: '2022-10-13 15:35:35', value9: 'BJ123',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // 드랍다운 (게시판 분류)
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: "Editor's Pick" })
      rtn.push({ value: '3', text: 'FAQ' })
      rtn.push({ value: '4', text: '개인정보 처리방침' })
      rtn.push({ value: '5', text: '영상정보 처리기기' })
      rtn.push({ value: '6', text: '방침 개정 안내' })
      rtn.push({ value: '7', text: '이용약관' })
      rtn.push({ value: '8', text: '입찰공고' })
      rtn.push({ value: '9', text: '에버랜드 테마뮤직' })
      rtn.push({ value: '9', text: 'EVER-UNIVERSE' })
      rtn.push({ value: '9', text: '기타' })
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
