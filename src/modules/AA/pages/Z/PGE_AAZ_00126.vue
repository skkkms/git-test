<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-tab-box
        default-idx="1"
        class="mt35"
      >
        <ur-tab-content
          idx="1"
          label="에버랜드"
        >
          <ur-form-box toggleable>
            <ur-form-item
              label="시설 카테고리"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex-wrap"
            >
              <ur-dropdown
                v-model="valueD1"
                :items="itemsD1"
              />
            </ur-form-item>
            <ur-form-item
              label="시설명"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex-wrap"
            >
              <ur-text-field
                style="width:100%; height:auto;"
                value=""
              />
            </ur-form-item>
          </ur-form-box>
          <div class="btn_wrap mt10">
            <div class="right_box">
              <ur-button>초기화</ur-button>
              <ur-button color="violet">
                검색
              </ur-button>
            </div>
          </div>
          <ur-data-grid
            ref="grid"
            :headers="columnsT1"
            :data-source="listT1"
            :data-set-options="{id: 'id'}"
            :options="opts"
            class="custom_grid_pgeNav_None mt35"
          />
          <div class="bt1 mt45" />
          <sui-page-footer class="comm_btn_wrap">
            <div class="btn_wrap">
              <div class="right_box">
                <ur-button color="violet">
                  저장
                </ur-button>
              </div>
            </div>
          </sui-page-footer>
        </ur-tab-content>
        <ur-tab-content
          idx="2"
          label="캐리비안베이"
        >
          <h4>캐리비안베이</h4>
        </ur-tab-content>
      </ur-tab-box>
    </sui-page-contents>
  </sui-page>
</template>
<script>


export default {
  name: 'PGE_AAZ_00126', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      opts: {
        pagination: true,
        multiSelect: false,
        selectCheck: false,
      },
      // 드롭다운
      valueD1: '1',
      // 에버랜드 테이블
      columnsT1: [
        { value: 'value1', text: '시설명' },
        { value: 'value2', text: '시설 카테고리' },
        { value: 'value9', text: '가상대기 여부' },
        {
          text: '사용 여부',
          value: 'value3',
          required: true,
          component: {
            template: '<div><ur-radio v-model="P1R1" value="Radio01" sm>Y</ur-radio><ur-radio v-model="P1R1" value="Radio02" sm>N</ur-radio></div>',
          },
        },
        {
          text: '게이트 ID',
          value: 'value4',
          required: true,
          component: {
            template: '<div><ur-text-field value="" /></div>',
          },
        },
        { value: 'value5', text: '등록일시' },
        { value: 'value6', text: '등록자' },
        { value: 'value7', text: '수정일시' },
        { value: 'value8', text: '수정자' },
      ],
      listT1: [
        {
          value1: 'T익스프레스', value2: '어트렉션', value3: '', value4: '', value5: '2022-10-13 15:35:35', value6: 'BJ123', value7: '2022-10-13 15:35:35', value8: 'BJ123', value9: '일반형 ',
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
      rtn.push({ value: '2', text: '어트렉션' })
      rtn.push({ value: '3', text: '공연' })
      rtn.push({ value: '4', text: '주토피아' })
      rtn.push({ value: '5', text: '레스토랑' })
      rtn.push({ value: '6', text: '편의시설' })
      rtn.push({ value: '7', text: '기프트샵' })
      rtn.push({ value: '8', text: '포토존' })
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
