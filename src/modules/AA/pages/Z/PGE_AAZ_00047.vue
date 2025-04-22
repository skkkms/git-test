<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          label="배너 구분"
          :label-align="'right'"
          style="width: 50%; height: auto; border: 0;"
        >
          <ur-dropdown
            v-model="valueD1"
            :items="itemsD1"
          />
        </ur-form-item>
        <ur-form-item
          label="게시 구분"
          :label-align="'right'"
          style="width: 50%; height: auto; border: 0;"
        >
          <ur-dropdown
            v-model="valueD2"
            :items="itemsD2"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="언어 구분"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox
            v-model="valueC1"
            sm
          /><span
            class="check_label"
          >국문</span>
          <ur-checkbox
            v-model="valueC2"
            sm
          /><span
            class="check_label"
          >영문</span>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="노출 여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox
            v-model="valueC3"
            sm
          /><span
            class="check_label"
          >Y</span>
          <ur-checkbox
            v-model="valueC4"
            sm
          /><span
            class="check_label"
          >N</span>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="게시 위치"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox
            v-model="valueC5"
            sm
          /><span
            class="check_label"
          >App</span>
          <ur-checkbox
            v-model="valueC6"
            sm
          /><span
            class="check_label"
          >모바일웹</span>
          <ur-checkbox
            v-model="valueC7"
            sm
          /><span
            class="check_label"
          >PC</span>
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="게시 기간"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-range-picker
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
  name: 'PGE_AAZ_00047', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 드롭다운
      valueD1: '1',
      valueD2: '1',

      // 체크박스
      valueC1: ['국문'],
      valueC2: ['영문'],
      valueC3: ['Y'],
      valueC4: ['N'],
      valueC5: ['App'],
      valueC6: ['모바일웹'],
      valueC7: ['PC'],

      // 테이블
      opts: { // 토탈o
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
      },

      columns: [
        { text: '배너 구분', value: 'value1' },
        { text: '게시 구분', value: 'value2' },
        { text: '배너 코드', value: 'value3' },
        { text: '언어 구분', value: 'value4' },
        {
          text: '제목',
          value: 'value5',
          component: {
            template: '<div><ur-button shape="hyperlink">메인출석체크배너</ur-button></div>',
          },
        },
        { text: '노출 여부', value: 'value6' },
        { text: '노출 순서', value: 'value7' },
        { text: '게시 기간', value: 'value8' },
        { text: '게시 위치', value: 'value9' },
        { text: '등록일시', value: 'value10' },
        { text: '등록자', value: 'value11' },
        { text: '수정일시', value: 'value12' },
        { text: '수정자', value: 'value13' },
      ],
      list: [
        {
          value1: '메인 배너', value2: '에버랜드', value3: '이벤트 배너', value4: '국문', value5: '', value6: 'Y', value7: '3', value8: '2022-10-13 10:00 ~ 2022-11-13 22:00', value9: 'App, PC ', value10: '2022-10-13 15:35:35', value11: 'BJ123', value12: '2022-10-13 15:35:35', value13: 'BJ123',
        },
      ],
    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능
    // 드랍다운
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '메인 배너' })
      rtn.push({ value: '3', text: '메인 팝업' })
      rtn.push({ value: '4', text: '기타 배너' })
      return rtn
    },
    itemsD2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '에버랜드' })
      rtn.push({ value: '3', text: '캐리비안베이' })
      rtn.push({ value: '4', text: '홈브리지' })
      rtn.push({ value: '5', text: '스피드웨이' })
      rtn.push({ value: '6', text: '기타' })
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
