<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <div class="comm_title_wrap">
        <h4>
          노출 정보
        </h4>
      </div>
      <ur-form-box toggleable>
        <ur-form-item
          label="블리스 명"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            value=""
            style="width: 100%; height: auto;"
          />
        </ur-form-item>
        <ur-form-item
          label="이벤트 기간"
          required
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-date-time-range-picker
            v-model="dateValue1"
            init="today"
          />
        </ur-form-item>
      </ur-form-box>
      <div class="comm_btn_wrap mt35">
        <div class="comm_title_wrap">
          <h4>
            블리스 정보 (등급)
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
          <span class="guid_txt">
            * 이미지 : 224 x 224 / 파일 규격 : 15MB 미만 jpg, png, gif
          </span>
        </div>
      </div>
      <ur-data-grid
        ref="grid"
        class="custom_grid_pgeNav_None"
        :headers="columnsT1"
        :data-source="listT1"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />
      <div class="bt1 mt10" />
      <sui-page-footer class="comm_btn_wrap">
        <div class="btn_wrap">
          <div class="left_box">
            <ur-button>
              목록
            </ur-button>
          </div>
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
  name: 'PGE_AAZ_00128', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 테이블 옵션
      opts: { // 토탈 O
        noInfo: true,
        pagination: true,
        multiSelect: false,
        selectCheck: true,
        rowHeight: 'auto',
      },
      itemsT1D2: [
        { value: '1', text: '선택' },
        { value: '2', text: '점 이상' },
        { value: '3', text: '상위 % 이내' },
        { value: '4', text: '등 이내' },
      ],

      columnsT1: [
        {
          text: '등급',
          value: 'value1',
          required: true,
          component: {
            template: '<div><ur-text-field value="" style="width: 100%;"/></div>',
          },
        },
        {
          text: '블리스 등급 명',
          value: 'value2',
          required: true,
          component: {
            template: '<div><ur-text-field value="" style="width: 100%;"/></div>',
          },
        },
        {
          text: '블리스 등급 이미지',
          value: 'value3',
          required: true,
          component: {
            template: '<div class="pdCol10" style="flex-direction: column;"><div style="display: flex; flex-direction: row; align-items: center;"><ur-text-field class="pr10"/><ur-button color="violet">파일 찾기</ur-button></div><img class="pdCol10" src="images/food/food_0.png" style="width: fit-content; height: 150px;"><ur-text-field value="ALT 태그를 입력하세요"/></div>',
          },
        },
        {
          text: '등급 점수',
          value: 'value4',
          required: true,
          component: {
            props: ['row', 'value', 'text', 'me'],
            template: '<div style="align-items: center;"><ur-text-field class="pr10" value="" style="width: 100%;"/><ur-dropdown v-model="code1" :items="me.itemsT1D2"/></div>',
            data() {
              return {
                code1: this.value,
              }
            },
          },
        },
      ],
      listT1: [
        {
          value1: '', value2: '', value3: '', value4: '',
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
  mounted() {
  },
  methods: {
  },
}
</script>
<style scoped>
</style>
