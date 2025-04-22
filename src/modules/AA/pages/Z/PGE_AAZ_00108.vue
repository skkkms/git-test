<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          label="OS 구분"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-checkbox
            v-model="valueC1"
            sm
          /><span
            class="check_label"
          >Android</span>
          <ur-checkbox
            v-model="valueC2"
            sm
          /><span
            class="check_label"
          >iOS</span>
        </ur-form-item>
      </ur-form-box>
      <div class="btn_wrap mt10">
        <div class="right_box">
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
      >
        <template #right-info>
          <ur-button>
            <ur-icon
              spacing
              size="small"
              icon="download"
              icon-type="line"
            />
            엑셀다운로드
          </ur-button>
        </template>
      </ur-data-grid>
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
  name: 'PGE_AAZ_00108', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      // 체크박스
      valueC1: ['Android'],
      valueC2: ['iOS'],

      // 테이블
      opts: { // 토탈o
        height: 300,
        pagination: true,
        noInfo: false,
        multiSelect: false,
        selectCheck: true,
      },

      columnsT1: [
        { text: 'OS 구분', value: 'value1' },
        {
          text: '버전',
          value: 'value2',
          component: {
            template: '<div><ur-button style="padding: 0;" shape="hyperlink">4.5.10</ur-button></div>',
          },
        },
        { text: '강제 업데이트 여부', value: 'value3' },
        { text: '비고', value: 'value4' },
        { text: '등록일시', value: 'value5' },
        { text: '등록자', value: 'value6' },
        { text: '수정일시', value: 'value7' },
        { text: '수정자', value: 'value8' },
      ],
      listT1: [
        {
          value1: 'iOS', value2: '', value3: 'Y', value4: 'test', value5: '2022-10-13 10:16:45', value6: 'BJ268', value7: '2022-10-13 10:16:45', value8: 'BJ268',
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
