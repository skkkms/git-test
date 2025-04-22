<template>
  <sui-page class="custom_page">
    <sui-page-header :page-id="this.$options.name" />
    <sui-page-contents>
      <ur-form-box toggleable>
        <ur-form-item
          label="스케줄명"
          :label-align="'right'"
          style="width: 100%; height: auto;"
          class="flex_wrap"
        >
          <ur-text-field
            style="width: 100%;"
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
      <sui-page-footer>
        <div class="comm_btn_wrap bt1" />
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
  name: 'PGE_AAZ_00138', // eslint-disable-line vue/name-property-casing
  components: {
  },
  data() {
    return {
      opts: { // 토탈o
        pagination: true,
        noInfo: false,
        selectCheck: true,
      },

      columnsT1: [
        {
          value: 'value1',
          text: '스케줄명',
          component: {
            template: '<<div><ur-button shape="hyperlink">[ MM ] 자동 ASN 처리 L130</ur-button></div>',
          },
        },
        {
          text: 'Cron Exp',
          value: 'value2',
        },
        { text: '사용여부', value: 'value3' },
        { text: '설명', value: 'value4' },
        { text: '등록일시', value: 'value5' },
        { text: '등록자', value: 'value6' },
        { text: '수정일시', value: 'value7' },
        { text: '수정자', value: 'value8' },
      ],
      listT1: [
        {
          value1: '', value2: '0 10 0 10', value3: 'Y', value4: '지정 업체 자동 ASN 처리기능', value5: '2022-10-13 15:35:35', value6: 'BJ123', value7: '2022-10-13 15:35:35', value8: 'BJ123',
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
