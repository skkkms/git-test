<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          class="flex_wrap"
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
          label="이벤트 구분"
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
          label="이벤트 분류"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-dropdown
            v-model="valueD3"
            :items="itemsD3"
          />
        </ur-form-item>
        <ur-form-item
          label="이벤트 명"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            value=""
            style="width: 100%;"
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
          label="이벤트 기간"
          :label-align="'right'"
          style="width: 50%; height: auto;"
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
  name: 'PGE_AAZ_00076', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 드롭다운
      valueD1: '1',
      valueD2: '1',
      valueD3: '1',

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
        { text: '게시 구분', value: 'value1' },
        { text: '이벤트 구분', value: 'value2' },
        { text: '이벤트 분류', value: 'value3' },
        {
          text: '이벤트 명',
          value: 'value4',
          component: {
            template: '<div><ur-button shape="hyperlink">1월OX퀴즈</ur-button></div>',
          },
        },
        { text: '노출 여부', value: 'value5' },
        { text: '노출 순서', value: 'value6' },
        { text: '이벤트 기간', value: 'value7' },
        { text: '등록일시', value: 'value8' },
        { text: '등록자', value: 'value9' },
        { text: '수정일시', value: 'value10' },
        { text: '수정자', value: 'value11' },
      ],
      list: [
        {
          value1: '에버랜드', value2: '온라인 이벤트', value3: 'OX 퀴즈', value4: '', value5: 'Y', value6: '1', value7: '2022-10-13 10:00 ~ 2022-11-13 22:00', value8: '2022-10-13 15:35:35', value9: 'BJ123 ', value10: '2022-10-13 15:35:35', value11: 'BJ123',
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
      rtn.push({ value: '2', text: '에버랜드' })
      rtn.push({ value: '3', text: '캐리비안베이' })
      rtn.push({ value: '4', text: '공통' })
      return rtn
    },
    itemsD2() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '온라인 이벤트' })
      rtn.push({ value: '3', text: '파크 이벤트' })
      rtn.push({ value: '4', text: '정기회원 이벤트' })
      return rtn
    },
    itemsD3() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: 'OX 퀴즈' })
      rtn.push({ value: '3', text: '스탬프' })
      rtn.push({ value: '4', text: '룰렛' })
      rtn.push({ value: '5', text: '응모 이벤트' })
      rtn.push({ value: '6', text: '기타 이벤트' })
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
