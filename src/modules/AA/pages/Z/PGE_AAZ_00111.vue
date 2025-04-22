<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          label="공통코드 구분"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            style="width: 100%; height: auto;"
            value=""
          />
        </ur-form-item>
        <ur-form-item
          label="공통코드 구분명"
          :label-align="'right'"
          style="width: 50%; height: auto;"
        >
          <ur-text-field
            style="width: 100%; height: auto;"
            value=""
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
        :headers="columnsT1"
        :data-source="listT1"
        :options="opts"
        :data-set-options="{id: 'id'}"
      />
      <div class="bt1 mt10" />
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
  name: 'PGE_AAZ_00111', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 라디오 버튼
      R1: 'Radio 01',
      R2: null,

      // 테이블
      opts: { // 토탈o
        height: 450,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
      },

      columnsT1: [
        {
          text: '공통코드 구분', value: 'value1', required: true, width: 200,
        },
        {
          text: '공통코드 구분명',
          value: 'value2',
          width: 200,
          required: true,
          component: {
            template: '<div><ur-button shape="hyperlink">존구분(CB)</ur-button></div>',
          },
        },
        { text: '사용여부', value: 'value3', width: 150 },
        { text: '코드설명', value: 'value4' },
      ],
      listT1: [
        {
          value1: 'M0016', value2: '존구분(CB)', value3: '사용', value4: '-',
        },
        {
          value1: 'M1011', value2: 'EP 발생구분', value3: '사용', value4: 'EP의 발생 구분',
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
