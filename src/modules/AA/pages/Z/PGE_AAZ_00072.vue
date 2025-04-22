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
              label="코스 명"
              :label-align="'right'"
              style="width:50%; height:auto;"
            >
              <ur-text-field
                value=""
                style="width: 100%;"
              />
            </ur-form-item>
            <ur-form-item
              label="코스 ID"
              :label-align="'right'"
              style="width:50%; height:auto;"
            >
              <ur-text-field
                value=""
                style="width: 100%;"
              />
            </ur-form-item>
            <ur-form-item
              label="등록일자"
              :label-align="'right'"
              style="width:50%; height:auto;"
            >
              <ur-date-picker
                auto-confirm
                input-type="YYYY-MM-DD"
                init="today"
              />
            </ur-form-item>
            <ur-form-item
              label="노출 여부"
              :label-align="'right'"
              style="width:50%; height:auto;"
              class="flex_wrap"
            >
              <ur-checkbox
                v-model="valueC1"
                sm
              />
              <span class="check_label">Y</span>

              <ur-checkbox
                v-model="valueC2"
                sm
              />
              <span class="check_label">N</span>
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
          <ur-data-grid
            ref="grid"
            :headers="columns"
            :data-source="list"
            :data-set-options="{id: 'id'}"
            :options="opts"
            class="custom_grid_pgeNav_None mt35"
          />
        </ur-tab-content>
        <ur-tab-content
          idx="2"
          label="캐리비안베이"
        >
          <h4>캐리비안베이</h4>
        </ur-tab-content>
      </ur-tab-box>
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
  name: 'PGE_AAZ_00072', // eslint-disable-line vue/name-property-casing
  components: {

  },
  data() {
    return {

      // 체크 박스
      valueC1: ['Y'],
      valueC2: ['N'],

      // 등록일자 날짜 데이터
      dateValue1: '',

      // 테이블 내 라디오
      T1R1: 'Radio 01',

      // 테이블
      opts: {
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: false,
      },


      columns: [
        {
          text: 'No.', value: 'value1', width: 100, align: 'center',
        },
        {
          text: '코스 명',
          value: 'value2',
          width: 250,
        },
        {
          text: '코스 ID',
          value: 'value3',
          width: 150,
        },
        {
          text: '좋아요 수',
          value: 'value4',
          width: 150,
        },
        {
          text: '등록일시',
          value: 'value5',
          width: 200,
        },
        {
          text: '등록자',
          value: 'value6',
          width: 150,
        },
        {
          text: '노출 여부',
          value: 'value7',
          component: {
            template: '<div><ur-radio sm v-model="T1R1" value="Radio 01">Y</ur-radio><ur-radio sm v-model="T1R1" value="Radio 02">N</ur-radio></div>',
          },
        },
      ],
      list: [
        {
          value1: '10', value2: '어트랙션 도장깨기', value3: '123123', value4: '323', value5: '2022-10-13 10:00', value6: '김희진', value7: '',
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
