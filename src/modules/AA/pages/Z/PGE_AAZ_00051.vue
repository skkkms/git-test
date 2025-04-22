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
          label="방문 상태"
          :label-align="'right'"
          style="width: 50%; height: auto; border: 0;"
          class="flex_wrap"
        >
          <ur-checkbox-wrapper
            v-model="valueC1"
            :items="itemsC1"
            sm
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="언어 구분"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox-wrapper
            v-model="valueC2"
            :items="itemsC2"
            sm
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="노출 여부"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-checkbox-wrapper
            v-model="valueC3"
            :items="itemsC3"
            sm
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="노출 기간"
          :label-align="'right'"
          style="width:50%; height:auto;"
        >
          <ur-range-picker
            v-model="dateValue2"
            auto-confirm
            input-type="YYYY-MM-DD"
            init="today"
          />
        </ur-form-item>
        <ur-form-item
          class="flex_wrap"
          label="노출 문구"
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
              신규등록
            </ur-button>
          </div>
        </div>
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00051', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 드롭다운
      valueD1: '1',
      valueD2: '1',

      // 체크박스
      valueC1: '',
      valueC2: '',
      valueC3: '',

      // 체크박스 Wrapper 아이템
      // itemsC1: [
      //   { text: '방문 전', valueC1: 1 },
      //   { text: '방문 중', valueC1: 2 },
      //   { text: '방문 후', valueC1: 3 },
      // ],

      // 테이블
      opts: { // 토탈o
        pagination: true,
        noInfo: false,
        selectCheck: true,
      },

      columns: [
        { text: '게시 구분', value: 'value1' },
        { text: '방문 상태', value: 'value2' },
        { text: '언어 구분', value: 'value3' },
        {
          text: '노출 문구',
          value: 'value4',
          width: 200,
          component: {
            template: '<div><ur-button hyperlink small style="padding: 0;" >T4등급만을 위한 전용 주자창을</ur-button></div>',
          },
        },
        { text: '노출 여부', value: 'value5' },
        { text: '노출 순서', value: 'value6' },
        { text: '노출 기간', value: 'value7', width: 250 },
        { text: '등록일시', value: 'value8', width: 150 },
        { text: '등록자', value: 'value9' },
        { text: '수정일시', value: 'value10', width: 150 },
        { text: '수정자', value: 'value11' },
      ],
      list: [
        {
          value1: '에버랜드', value2: '방문 전', value3: '국문', value4: '', value5: 'Y', value6: '3', value7: '2022-10-13 10:00 ~ 2022-11-13 22:00', value8: '2022-10-13 15:35:35', value9: 'BJ123', value10: '2022-10-13 15:35:35', value11: 'BJ123',
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

    // 체크박스 Wrapper 아이템 test
    itemsC1() {
      const rtn = []
      rtn.push({ value: '1', text: '방문 전' })
      rtn.push({ value: '2', text: '방문 중' })
      rtn.push({ value: '3', text: '방문 후' })
      return rtn
    },
    itemsC2() {
      const rtn = []
      rtn.push({ value: '1', text: '국문' })
      rtn.push({ value: '2', text: '영문' })
      return rtn
    },
    itemsC3() {
      const rtn = []
      rtn.push({ value: '1', text: 'Y' })
      rtn.push({ value: '2', text: 'N' })
      return rtn
    },
  },
  watch: {
    // data 변경시 특정 함수를 호출 해야 하는 경우(async 등)
  },
  created() {
    this.value.push(1)
  },
  mounted() {
  },
  methods: {
  },
}
</script>
<style scoped>
</style>
