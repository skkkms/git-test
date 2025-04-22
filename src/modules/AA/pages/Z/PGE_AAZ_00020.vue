<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-tab-box
        default-idx="2"
        class="mt35"
      >
        <ur-tab-content
          idx="1"
          label="에버랜드"
        >
          <h4>에버랜드</h4>
        </ur-tab-content>
        <ur-tab-content
          idx="2"
          label="캐리비안베이"
        >
          <ur-form-box toggleable>
            <ur-form-item
              label="리뷰 일자"
              :label-align="'right'"
              style="width:100%; height:auto;"
              class="flex-wrap"
            >
              <ur-range-picker
                auto-confirm
                input-type="YYYY-MM-DD"
                init="day-30"
              />
            </ur-form-item>
            <ur-form-item
              label="시설 카테고리"
              :label-align="'right'"
              style="width:50%; height:auto;"
            >
              <ur-dropdown
                v-model="valueD1"
                :items="itemsD1"
              />
            </ur-form-item>
            <ur-form-item
              label="시설 명"
              :label-align="'right'"
              style="width:50%; height:auto;"
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
          <template>
            <ur-data-grid
              ref="grid"
              :headers="columns01"
              :data-source="list01"
              :data-set-options="{id: 'id'}"
              :options="opts"
              class="custom_grid_pgeNav_None mt35"
            />
          </template>
        </ur-tab-content>
      </ur-tab-box>
      <sui-page-footer>
        <div class="comm_btn_wrap" />
      </sui-page-footer>
    </sui-page-contents>
  </sui-page>
</template>
<script>

export default {
  name: 'PGE_AAZ_00019', // eslint-disable-line vue/name-property-casing
  components: {

  },
  data() {
    return {

      // 시설 카테고리 드랍다운
      valueD1: '1',

      dataSet: new this.$ur.grid.DataSet(),
      opts: {
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },
      columns01: [
        { text: '리뷰 일시', value: 'value1', width: 200 },
        { text: '시설 카테고리', value: 'value2', width: 300 },
        { text: '시설명', value: 'value3', width: 300 },
        { text: '리뷰 내용', value: 'value4', width: 400 },
        { text: '리뷰 개수', value: 'value5' },
      ],

      list01: [
        {
          value1: '2022-10-13 03:22:38', value2: '어트랙션', value3: '메가스톰', value4: '즐거웠어요', value5: '117',
        },

      ],

    }
  },
  computed: {
    // 계산된 속성, date pickproperty로 사용가능

    // 시설 카테고리 드랍다운 데이터
    itemsD1() {
      const rtn = []
      rtn.push({ value: '1', text: '전체' })
      rtn.push({ value: '2', text: '어트렉션' })
      rtn.push({ value: '3', text: '레스토랑' })
      rtn.push({ value: '4', text: '빌리지' })
      rtn.push({ value: '5', text: '비치체어' })
      rtn.push({ value: '6', text: '렌탈/편의시설' })
      rtn.push({ value: '7', text: '기프트샵' })
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
